#!/usr/bin/env node
/**
 * verify_constellation_geometry.mjs — Headless Chrome CDP Geometry & Visual Baseline Suite
 *
 * Verifies live rendered Constellation DOM/SVG geometry, port-to-edge alignment,
 * zero card overlap, zero horizontal overflow (320-1440px), in-place click selection,
 * keyboard spatial navigation, reduced-motion compliance, and Constellation visual baselines.
 *
 * Usage:
 *   node scripts/verify_constellation_geometry.mjs                   # Verify geometry + PNG baselines
 *   node scripts/verify_constellation_geometry.mjs --update-baselines # Update Constellation PNG baselines
 */

import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const BASELINES_DIR = path.join(ROOT, 'tests', 'visual', 'baselines');
const DIFFS_DIR = path.join(ROOT, 'tests', 'visual', 'diffs');
const UPDATE_BASELINES = process.argv.includes('--update-baselines');
const TOLERANCE = 0.005;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon',
};

function findBrowser() {
  if (process.env.BROWSER_PATH && fs.existsSync(process.env.BROWSER_PATH)) {
    return process.env.BROWSER_PATH;
  }
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];
  return candidates.find(p => p && fs.existsSync(p)) || null;
}

function findPython() {
  const venvPy = path.join(ROOT, '.venv', 'Scripts', 'python.exe');
  if (fs.existsSync(venvPy)) return venvPy;
  const venvUnix = path.join(ROOT, '.venv', 'bin', 'python');
  if (fs.existsSync(venvUnix)) return venvUnix;
  return process.platform === 'win32' ? 'python' : 'python3';
}

function startStaticServer() {
  const server = http.createServer((req, res) => {
    const cleanUrl = (req.url || '/').split('?')[0].split('#')[0];
    let relPath = decodeURIComponent(cleanUrl === '/' ? '/index.html' : cleanUrl).replace(/^\/+/, '');
    const fullPath = path.resolve(ROOT, relPath);
    if (!fullPath.startsWith(ROOT) || !fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(fullPath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(fullPath).pipe(res);
  });
  return new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${addr.port}` });
    });
  });
}

async function launchChrome(browserPath, userDataDir) {
  const args = [
    '--headless=new',
    '--remote-debugging-port=0',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    `--user-data-dir=${userDataDir}`,
    'about:blank',
  ];
  const proc = spawn(browserPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
  const wsEndpoint = await new Promise((resolve, reject) => {
    let stderr = '';
    const timer = setTimeout(() => reject(new Error(`Timed out waiting for Chrome DevTools:\n${stderr}`)), 15000);
    proc.stderr.on('data', chunk => {
      stderr += chunk.toString('utf8');
      const m = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (m) {
        clearTimeout(timer);
        resolve(m[1]);
      }
    });
    proc.on('exit', code => {
      clearTimeout(timer);
      reject(new Error(`Chrome exited early (${code}):\n${stderr}`));
    });
  });
  return { proc, wsEndpoint };
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.seq = 0;
    this.pending = new Map();
    this.events = [];
  }
  async connect() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });
    this.ws.addEventListener('message', ev => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(`${msg.error.message} (${msg.error.code})`));
        else resolve(msg.result);
      } else if (msg.method) {
        this.events.push(msg);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.seq;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (res.exceptionDetails) {
      throw new Error(`Page eval error: ${res.exceptionDetails.text || JSON.stringify(res.exceptionDetails)}`);
    }
    return res.result?.value;
  }
  close() {
    try { this.ws.close(); } catch {}
  }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function waitForPageLoad(cdp, url) {
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('DOM.enable');
  await cdp.send('Page.navigate', { url });
  for (let i = 0; i < 60; i++) {
    const ready = await cdp.eval(`(async () => {
      if (document.readyState !== 'complete') return false;
      if (!document.getElementById('constellation')) return false;
      if (!window.ECOSYSTEM_DATA || !window.ConstellationEngine) return false;
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      return true;
    })()`);
    if (ready) {
      await sleep(180);
      return;
    }
    await sleep(100);
  }
  throw new Error('Timed out waiting for projects.html Constellation boot');
}

async function setViewport(cdp, width, height) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width <= 768,
  });
  await sleep(140);
}

async function inspectLiveGeometry(cdp) {
  return cdp.eval(`(() => {
    const section = document.getElementById('constellation');
    const ecosystem = document.getElementById('ecosystem');
    const viewport = section.querySelector('.constellation-viewport');
    const stage = document.getElementById('constellation-stage');
    const svg = stage.querySelector('svg');
    const detailH3 = document.querySelector('#constellation-detail h3')?.textContent?.trim() || '';
    const breadcrumb = document.getElementById('constellation-breadcrumb');
    const shelf = document.getElementById('constellation-shelf');
    const nodes = [...stage.querySelectorAll('.constellation-node')].map(el => {
      const r = el.getBoundingClientRect();
      return {
        id: el.dataset.project,
        text: el.querySelector('.constellation-node-label')?.textContent?.trim() || el.textContent.trim(),
        tabindex: el.getAttribute('tabindex'),
        pressed: el.getAttribute('aria-pressed'),
        left: r.left,
        right: r.right,
        top: r.top,
        bottom: r.bottom,
        width: r.width,
        height: r.height,
      };
    });
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    const overlaps = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        if (a.left < b.right - 0.5 && a.right > b.left + 0.5 && a.top < b.bottom - 0.5 && a.bottom > b.top + 0.5) {
          overlaps.push([a.id, b.id]);
        }
      }
    }

    const edgeChecks = [];
    if (svg) {
      const ctm = svg.getScreenCTM();
      const paths = [...svg.querySelectorAll('path[data-edge-id]')];
      for (const p of paths) {
        const totalLen = p.getTotalLength();
        const pStart = p.getPointAtLength(0);
        const pEnd = p.getPointAtLength(totalLen);
        const sScreen = ctm ? { x: ctm.a * pStart.x + ctm.c * pStart.y + ctm.e, y: ctm.b * pStart.x + ctm.d * pStart.y + ctm.f } : null;
        const eScreen = ctm ? { x: ctm.a * pEnd.x + ctm.c * pEnd.y + ctm.e, y: ctm.b * pEnd.x + ctm.d * pEnd.y + ctm.f } : null;
        const edgeId = p.getAttribute('data-edge-id');
        let targetId = null;
        let sourceId = null;
        if (edgeId.startsWith('edge-')) {
          // match against visible ids
          for (const id of nodeMap.keys()) {
            if (edgeId.startsWith('edge-' + id + '-')) {
              sourceId = id;
              targetId = edgeId.slice(('edge-' + id + '-').length);
              break;
            }
          }
        } else if (edgeId.startsWith('tl-')) {
          for (const id of nodeMap.keys()) {
            if (edgeId.startsWith('tl-' + id + '-')) {
              sourceId = id;
              targetId = edgeId.slice(('tl-' + id + '-').length);
              break;
            }
          }
        } else if (edgeId.startsWith('bundle-')) {
          targetId = edgeId.slice('bundle-'.length);
        }
        const distToBorder = (pt, box) => {
          if (!pt || !box) return 0;
          const dx = Math.max(box.left - pt.x, 0, pt.x - box.right);
          const dy = Math.max(box.top - pt.y, 0, pt.y - box.bottom);
          if (dx > 0 || dy > 0) return Math.hypot(dx, dy);
          return Math.min(pt.x - box.left, box.right - pt.x, pt.y - box.top, box.bottom - pt.y);
        };
        edgeChecks.push({
          edgeId,
          startErr: sourceId && nodeMap.has(sourceId) ? distToBorder(sScreen, nodeMap.get(sourceId)) : 0,
          endErr: targetId && nodeMap.has(targetId) ? distToBorder(eScreen, nodeMap.get(targetId)) : 0,
        });
      }
    }

    const vpRect = viewport.getBoundingClientRect();
    const outOfBounds = nodes.filter(n =>
      n.left < vpRect.left - 2 || n.right > vpRect.right + 2 || n.top < vpRect.top - 2 || n.bottom > vpRect.bottom + 2
    ).map(n => n.id);

    return {
      graphHidden: section.hidden,
      treeHidden: ecosystem.hidden,
      detailH3,
      breadcrumbVisible: !breadcrumb.hidden,
      breadcrumbText: breadcrumb.textContent.trim(),
      shelfVisible: !shelf.hidden,
      shelfCount: shelf.querySelectorAll('.constellation-shelf-card').length,
      nodeCount: nodes.length,
      overlaps,
      outOfBounds,
      edgeChecks,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      activeId: document.activeElement?.dataset?.project || null,
      focusedTag: document.activeElement?.tagName || null,
    };
  })()`);
}

async function captureConstellationPng(cdp, outPath, scrollTarget = 'ecosystem-browser') {
  await cdp.eval(`(() => {
    const el = document.getElementById('${scrollTarget}') || document.querySelector('${scrollTarget}') || document.getElementById('ecosystem-browser');
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
    const top = el.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
    const cursor = document.getElementById('cursor');
    if (cursor) cursor.style.display = 'none';
  })()`);
  await sleep(180);
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
}

function compareWithBaseline(pythonBin, baselinePath, currentPath, diffPath) {
  const pyCode = [
    'import sys',
    'from pathlib import Path',
    'sys.path.insert(0, str(Path("scripts").resolve()))',
    'from test_visual_regression import calculate_image_diff',
    'ratio, identical = calculate_image_diff(Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3]))',
    'print(f"{ratio:.6f}")',
  ].join('\n');
  const res = spawnSync(pythonBin, ['-c', pyCode, baselinePath, currentPath, diffPath], {
    cwd: ROOT,
    encoding: 'utf-8',
  });
  if (res.status !== 0) {
    throw new Error(`Visual diff failed: ${res.stderr}`);
  }
  return parseFloat(res.stdout.trim());
}

async function main() {
  const browser = findBrowser();
  if (!browser) {
    console.error('Error: Chrome or Edge binary not found.');
    process.exit(1);
  }
  const pythonBin = findPython();
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'constellation-cdp-'));
  const tmpShotsDir = fs.mkdtempSync(path.join(os.tmpdir(), 'constellation-shots-'));
  const { server, baseUrl } = await startStaticServer();
  let chromeProc = null;
  let cdp = null;

  try {
    const launched = await launchChrome(browser, userDataDir);
    chromeProc = launched.proc;
    const targets = await (await fetch(`${launched.wsEndpoint.replace(/^ws:/, 'http:').split('/devtools')[0]}/json/list`)).json();
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    assert.ok(pageTarget && pageTarget.webSocketDebuggerUrl, 'No CDP page target available');

    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    const pageErrors = [];
    const externalWarnings = [];
    cdp.ws.addEventListener('message', ev => {
      const msg = JSON.parse(ev.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        const d = msg.params?.exceptionDetails || {};
        const url = d.url || d.stackTrace?.callFrames?.[0]?.url || '';
        const detail = `${d.exception?.description || d.text || 'Uncaught'} (${url || 'inline'}:${d.lineNumber ?? '?'})`;
        if (url && !url.startsWith(baseUrl)) {
          externalWarnings.push(detail);
        } else {
          pageErrors.push(detail);
        }
      }
    });

    await setViewport(cdp, 1280, 800);
    await waitForPageLoad(cdp, `${baseUrl}/projects.html`);

    // 1. Default Desktop Dark View
    const defDark = await inspectLiveGeometry(cdp);
    assert.equal(defDark.graphHidden, false, 'Desktop must default to Graph view');
    assert.equal(defDark.treeHidden, true, 'Desktop must hide Tree view initially');
    assert.equal(defDark.nodeCount, 15, 'Default featured view must render 15 nodes');
    assert.deepEqual(defDark.overlaps, [], 'Default dark view must have 0 node overlaps');
    assert.deepEqual(defDark.outOfBounds, [], 'Default dark view must fit within viewport');
    for (const ec of defDark.edgeChecks) {
      assert.ok(ec.startErr <= 1.5, `Default dark edge ${ec.edgeId} start error ${ec.startErr.toFixed(2)}px > 1.5px`);
      assert.ok(ec.endErr <= 1.5, `Default dark edge ${ec.edgeId} end error ${ec.endErr.toFixed(2)}px > 1.5px`);
    }

    assert.equal(defDark.detailH3, 'Antigravity', 'Default selection must be Antigravity');

    const capturedShots = {};
    const recordShot = async (name, scrollTargetId = 'ecosystem-browser') => {
      const targetPath = UPDATE_BASELINES
        ? path.join(BASELINES_DIR, `${name}.png`)
        : path.join(tmpShotsDir, `${name}.png`);
      await captureConstellationPng(cdp, targetPath, scrollTargetId);
      capturedShots[name] = targetPath;
    };

    await recordShot('constellation_default_dark');

    // 2. In-place click selection + zero DOM teardown + focus retention
    const inPlaceResult = await cdp.eval(`(() => {
      const beforeEl = document.querySelector('.constellation-node[data-project="p-040"]');
      beforeEl.click();
      const afterEl = document.querySelector('.constellation-node[data-project="p-040"]');
      return {
        sameElement: beforeEl === afterEl,
        activeId: document.activeElement?.dataset?.project || null,
        detailH3: document.querySelector('#constellation-detail h3')?.textContent?.trim() || '',
      };
    })()`);
    assert.equal(inPlaceResult.sameElement, true, 'Clicking a node must update in-place without DOM teardown');
    assert.equal(inPlaceResult.activeId, 'p-040', 'Focus must remain on clicked node');
    assert.equal(inPlaceResult.detailH3, 'Fleet Orchestrator');

    // 3. Keyboard spatial navigation (ArrowRight from p-040 -> col 2, ArrowDown)
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 });
    const afterArrow = await cdp.eval(`document.activeElement?.dataset?.project || null`);
    assert.ok(afterArrow && afterArrow !== 'p-040', 'ArrowRight must move spatial focus to a right-column neighbor');

    // Reset back to Antigravity before Light mode capture
    await cdp.eval(`document.getElementById('constellation-reset').click()`);
    await sleep(160);

    // 4. Desktop Light Theme
    await cdp.eval(`document.documentElement.setAttribute('data-theme', 'light')`);
    await sleep(120);
    const defLight = await inspectLiveGeometry(cdp);
    assert.equal(defLight.detailH3, 'Antigravity', 'Reset must restore Antigravity as default selection');
    assert.deepEqual(defLight.overlaps, [], 'Default light view must have 0 overlaps');
    await recordShot('constellation_default_light');
    await cdp.eval(`document.documentElement.setAttribute('data-theme', 'dark')`);
    await sleep(80);

    // 5. Fellowship Timeline Drill-Down & Breadcrumb Back
    await cdp.eval(`(() => {
      const f = document.getElementById('constellation-filter');
      f.value = 'fellowship';
      f.dispatchEvent(new Event('change', { bubbles: true }));
    })()`);
    await sleep(180);
    const tlState = await inspectLiveGeometry(cdp);
    assert.equal(tlState.breadcrumbVisible, true, 'Fellowship drill-down must show breadcrumb');
    assert.equal(tlState.nodeCount, 20, 'Fellowship timeline must show 20 nodes');
    assert.deepEqual(tlState.overlaps, [], 'Fellowship timeline must have 0 overlaps');
    assert.deepEqual(tlState.outOfBounds, [], 'Fellowship timeline must fit within viewport');
    for (const ec of tlState.edgeChecks) {
      assert.ok(ec.startErr <= 1.5 && ec.endErr <= 1.5, `Timeline edge ${ec.edgeId} port misaligned`);
    }
    await recordShot('constellation_fellowship_timeline');

    // Breadcrumb back + verify MCP/College/Google clusters
    await cdp.eval(`document.querySelector('#constellation-breadcrumb .constellation-crumb-back').click()`);
    await sleep(140);
    const afterBack = await inspectLiveGeometry(cdp);
    assert.equal(afterBack.breadcrumbVisible, false, 'Breadcrumb must hide after returning to All systems');
    assert.equal(afterBack.nodeCount, 15, 'Returning from cluster must restore 15 featured nodes');

    for (const cid of ['mcp-group', 'college', 'google-oauth']) {
      await cdp.eval(`(() => {
        const f = document.getElementById('constellation-filter');
        f.value = '${cid}';
        f.dispatchEvent(new Event('change', { bubbles: true }));
      })()`);
      await sleep(140);
      const clState = await inspectLiveGeometry(cdp);
      assert.equal(clState.breadcrumbVisible, true, `${cid} must show breadcrumb`);
      assert.deepEqual(clState.overlaps, [], `${cid} must have 0 overlaps`);
      assert.deepEqual(clState.outOfBounds, [], `${cid} must fit viewport`);
      for (const ec of clState.edgeChecks) {
        assert.ok(ec.startErr <= 1.5 && ec.endErr <= 1.5, `${cid} edge ${ec.edgeId} port misaligned`);
      }
    }

    // 6. Expanded "Show all projects" + Unconnected Shelf
    await cdp.eval(`document.getElementById('constellation-reset').click()`);
    await sleep(120);
    await cdp.eval(`document.getElementById('constellation-expand').click()`);
    await sleep(180);
    const expState = await inspectLiveGeometry(cdp);
    assert.deepEqual(expState.overlaps, [], 'Expanded view must have 0 overlaps');
    assert.equal(expState.shelfVisible, true, 'Expanded view must render unconnected shelf');
    assert.ok(expState.shelfCount >= 25, 'Expanded shelf must show unconnected projects');
    for (const ec of expState.edgeChecks) {
      assert.ok(ec.startErr <= 1.5 && ec.endErr <= 1.5, `Expanded edge ${ec.edgeId} misaligned`);
    }
    await recordShot('constellation_expanded_shelf', 'constellation-shelf');

    // 7. Reduced motion check
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await sleep(80);
    const rmCheck = await cdp.eval(`(() => {
      const stage = document.getElementById('constellation-stage');
      document.getElementById('constellation-zoom-fit').click();
      return {
        hasAnimatingClass: stage.classList.contains('is-animating'),
        durationSec: parseFloat(getComputedStyle(stage).transitionDuration) || 0,
      };
    })()`);
    assert.equal(rmCheck.hasAnimatingClass, false, 'Reduced motion must not apply is-animating class');
    assert.ok(rmCheck.durationSec <= 0.001, `Reduced motion transition duration too high: ${rmCheck.durationSec}s`);
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });

    // 8. Responsive overflow & adaptive default sweep (320, 375, 768, 1024, 1440)
    await cdp.eval(`document.getElementById('constellation-reset').click()`);
    await sleep(120);
    for (const [w, h] of [[1440, 900], [1024, 768], [768, 1024], [375, 667], [320, 640]]) {
      await setViewport(cdp, w, h);
      await waitForPageLoad(cdp, `${baseUrl}/projects.html`);
      const st = await inspectLiveGeometry(cdp);
      assert.ok(st.scrollWidth <= st.innerWidth + 1, `Horizontal overflow at ${w}x${h}: scrollWidth=${st.scrollWidth} > innerWidth=${st.innerWidth}`);
      if (w <= 768) {
        assert.equal(st.treeHidden, false, `Mobile ${w}px must default to Tree view`);
        assert.equal(st.graphHidden, true, `Mobile ${w}px must hide Graph view initially`);
      } else {
        assert.equal(st.graphHidden, false, `Desktop/tablet ${w}px must default to Graph view`);
      }
    }

    // 9. Mobile 375x667 opt-in Graph view + manual selection preserved across resize
    await setViewport(cdp, 375, 667);
    await waitForPageLoad(cdp, `${baseUrl}/projects.html`);
    await cdp.eval(`(() => {
      const disc = document.getElementById('ecosystem-browser').closest('details');
      if (disc) disc.open = true;
      document.querySelector('[data-ecosystem-view="graph"]').click();
    })()`);
    await sleep(240);
    const mobGraph = await inspectLiveGeometry(cdp);
    assert.equal(mobGraph.graphHidden, false, 'Mobile opt-in must display Graph view');
    assert.deepEqual(mobGraph.overlaps, [], 'Mobile Graph view must have 0 overlaps');
    assert.ok(mobGraph.scrollWidth <= mobGraph.innerWidth + 1, 'Mobile Graph view must have 0 horizontal overflow');
    await recordShot('constellation_mobile_graph', '.constellation-viewport');

    // Resize up then back to 375px and ensure manual Graph choice is preserved
    await setViewport(cdp, 1024, 768);
    await sleep(120);
    await setViewport(cdp, 375, 667);
    await sleep(120);
    const preserved = await inspectLiveGeometry(cdp);
    assert.equal(preserved.graphHidden, false, 'Manual Graph view choice must persist across resize');

    if (externalWarnings.length) {
      console.log(`  [INFO] External script warnings ignored: ${externalWarnings.length}`);
    }
    assert.deepEqual(pageErrors, [], `Same-origin JS errors detected:\n${pageErrors.join('\n')}`);

    // 10. Visual baseline verify if not updating
    if (!UPDATE_BASELINES) {
      for (const [name, currentPath] of Object.entries(capturedShots)) {
        const baselinePath = path.join(BASELINES_DIR, `${name}.png`);
        assert.ok(fs.existsSync(baselinePath), `Missing Constellation baseline: ${baselinePath}. Run with --update-baselines.`);
        const diffPath = path.join(DIFFS_DIR, `${name}_diff.png`);
        const ratio = compareWithBaseline(pythonBin, baselinePath, currentPath, diffPath);
        assert.ok(ratio <= TOLERANCE, `Visual regression in ${name}: ${(ratio * 100).toFixed(3)}% > ${(TOLERANCE * 100).toFixed(2)}%`);
        console.log(`  [PASS] visual ${name}: diff=${(ratio * 100).toFixed(3)}%`);
      }
    } else {
      console.log(`  [UPDATED] Recorded ${Object.keys(capturedShots).length} Constellation visual baselines.`);
    }

    console.log('Constellation live geometry, edge alignment, spatial nav, responsive, and visual checks PASSED.');
  } finally {
    if (cdp) {
      try { await cdp.send('Browser.close'); } catch {}
      cdp.close();
    }
    if (chromeProc) {
      await new Promise(resolve => {
        const t = setTimeout(() => {
          try { chromeProc.kill(); } catch {}
          resolve();
        }, 1000);
        chromeProc.once('exit', () => { clearTimeout(t); resolve(); });
        try { chromeProc.kill(); } catch { clearTimeout(t); resolve(); }
      });
    }
    server.close();
    for (const dir of [userDataDir, tmpShotsDir]) {
      try {
        fs.rmSync(dir, { recursive: true, force: true, maxRetries: 6, retryDelay: 120 });
      } catch {}
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
