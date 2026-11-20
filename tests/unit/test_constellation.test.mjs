import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../../');

const dataSrc = fs.readFileSync(path.join(ROOT, 'assets/js/data/ecosystem-data.js'), 'utf-8');
const modSrc = fs.readFileSync(path.join(ROOT, 'assets/js/modules/constellation.js'), 'utf-8');

const sandbox = {
  globalThis: null,
  window: {},
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(dataSrc, sandbox);
vm.runInContext(modSrc, sandbox);

const ECOSYSTEM_DATA = sandbox.window.ECOSYSTEM_DATA;
const Engine = sandbox.ConstellationEngine;

function assertNoOverlaps(rects, label) {
  const entries = [...rects.entries()];
  for (let i = 0; i < entries.length; i++) {
    const [idA, a] = entries[i];
    for (let j = i + 1; j < entries.length; j++) {
      const [idB, b] = entries[j];
      const overlaps =
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y;
      assert.equal(overlaps, false, `${label}: nodes ${idA} and ${idB} overlap`);
    }
  }
}

function pointOnBorder(px, py, rect, tol = 1.0) {
  const onLeft = Math.abs(px - rect.x) <= tol && py >= rect.y - tol && py <= rect.y + rect.h + tol;
  const onRight = Math.abs(px - (rect.x + rect.w)) <= tol && py >= rect.y - tol && py <= rect.y + rect.h + tol;
  const onTop = Math.abs(py - rect.y) <= tol && px >= rect.x - tol && px <= rect.x + rect.w + tol;
  const onBottom = Math.abs(py - (rect.y + rect.h)) <= tol && px >= rect.x - tol && px <= rect.x + rect.w + tol;
  return onLeft || onRight || onTop || onBottom;
}

test('ConstellationEngine exports deterministic functions and SSOT data loads', () => {
  assert.ok(ECOSYSTEM_DATA, 'ECOSYSTEM_DATA must be defined');
  assert.ok(Array.isArray(ECOSYSTEM_DATA.nodes) && ECOSYSTEM_DATA.nodes.length >= 55);
  assert.ok(Engine && typeof Engine.computeLayout === 'function');
  assert.equal(Engine.NODE_W, 168);
  assert.equal(Engine.NODE_H, 46);
  assert.deepEqual([...ECOSYSTEM_DATA.agents], ['antigravity', 'codex', 'p-023']);
  assert.equal(ECOSYSTEM_DATA.defaultSelection, 'antigravity');
  for (const agentId of ['antigravity', 'codex']) {
    const targets = new Set(ECOSYSTEM_DATA.edges.filter(e => e.from === agentId).map(e => e.to));
    assert.ok(targets.has('mcp-group') && targets.has('p-029'), `${agentId} must connect to mcp-group and p-029`);
    assert.equal(targets.has('codex') || targets.has('p-023'), false, `${agentId} must not have controller edges to Codex or Claude Desktop`);
  }
});

test('Zero node overlaps and exact <=1px port alignment across all views', () => {
  const states = [
    { name: 'featured', state: { query: '', filter: 'all', clusterId: null, expanded: false } },
    { name: 'expanded', state: { query: '', filter: 'all', clusterId: null, expanded: true } },
    { name: 'fellowship', state: { query: '', filter: 'fellowship', clusterId: 'fellowship', expanded: false } },
    { name: 'mcp-group', state: { query: '', filter: 'mcp-group', clusterId: 'mcp-group', expanded: false } },
    { name: 'college', state: { query: '', filter: 'college', clusterId: 'college', expanded: false } },
    { name: 'google-oauth', state: { query: '', filter: 'google-oauth', clusterId: 'google-oauth', expanded: false } },
    { name: 'group-orchestration', state: { query: '', filter: 'orchestration', clusterId: null, expanded: false } },
    { name: 'group-knowledge', state: { query: '', filter: 'knowledge', clusterId: null, expanded: false } },
    { name: 'group-research', state: { query: '', filter: 'research', clusterId: null, expanded: false } },
    { name: 'group-applications', state: { query: '', filter: 'applications', clusterId: null, expanded: false } },
  ];

  for (const { name, state } of states) {
    const sel = Engine.selectVisibleNodes(ECOSYSTEM_DATA, state);
    const layout = Engine.computeLayout(ECOSYSTEM_DATA, sel.graphNodes, sel.mode, sel.cluster);
    const visibleIds = new Set(sel.graphNodes.map(n => n.id));
    const routed = Engine.routeEdges(ECOSYSTEM_DATA, layout, visibleIds, sel.mode);

    assertNoOverlaps(layout.rects, name);

    for (const [id, r] of layout.rects.entries()) {
      assert.ok(r.x >= 0 && r.y >= 0, `${name}: ${id} negative coords`);
      assert.ok(r.x + r.w <= routed.width, `${name}: ${id} exceeds width`);
      assert.ok(r.y + r.h <= routed.height, `${name}: ${id} exceeds height`);
    }

    for (const edge of routed.edges) {
      const rFrom = layout.rects.get(edge.from);
      const rTo = layout.rects.get(edge.to);
      assert.ok(rFrom && rTo, `${name}: edge endpoints missing rect`);
      assert.ok(pointOnBorder(edge.ex, edge.ey, rTo, 1.0), `${name}: edge ${edge.id} end not on target border`);
      if (edge.bundled && routed.spine) {
        assert.ok(Math.abs(edge.sx - routed.spine.x) <= 1.0, `${name}: bundled edge ${edge.id} start not on spine`);
        assert.ok(edge.sy >= routed.spine.topY - 1 && edge.sy <= routed.spine.bottomY + 1, `${name}: spine Y out of bounds`);
      } else {
        assert.ok(pointOnBorder(edge.sx, edge.sy, rFrom, 1.0), `${name}: edge ${edge.id} start not on source border`);
      }
    }
  }
});

test('Fellowship timeline serpentine row drops exit bottom and enter top cleanly', () => {
  const sel = Engine.selectVisibleNodes(ECOSYSTEM_DATA, {
    query: '', filter: 'fellowship', clusterId: 'fellowship', expanded: false,
  });
  assert.equal(sel.mode, 'timeline');
  assert.equal(sel.graphNodes.length, 20);
  const layout = Engine.computeLayout(ECOSYSTEM_DATA, sel.graphNodes, sel.mode, sel.cluster);
  const visibleIds = new Set(sel.graphNodes.map(n => n.id));
  const routed = Engine.routeEdges(ECOSYSTEM_DATA, layout, visibleIds, sel.mode);

  assert.equal(routed.edges.length, 19);
  const rowDrops = routed.edges.filter(edge => {
    const a = layout.rects.get(edge.from);
    const b = layout.rects.get(edge.to);
    return a.row !== b.row;
  });
  assert.equal(rowDrops.length, 3, '20 nodes across 5 columns must have 3 row drops');
  for (const drop of rowDrops) {
    const a = layout.rects.get(drop.from);
    const b = layout.rects.get(drop.to);
    assert.equal(a.col, b.col, 'serpentine drop must stay in the same column');
    assert.ok(Math.abs(drop.sx - a.cx) <= 1.0 && Math.abs(drop.sy - (a.y + a.h)) <= 1.0, 'drop must exit bottom port');
    assert.ok(Math.abs(drop.ex - b.cx) <= 1.0 && Math.abs(drop.ey - b.y) <= 1.0, 'drop must enter top port');
  }
});

test('Evidence honesty: documented edges are never bundled into workflow spine', () => {
  const sel = Engine.selectVisibleNodes(ECOSYSTEM_DATA, {
    query: '', filter: 'all', clusterId: null, expanded: true,
  });
  const layout = Engine.computeLayout(ECOSYSTEM_DATA, sel.graphNodes, sel.mode, sel.cluster);
  const visibleIds = new Set(sel.graphNodes.map(n => n.id));
  const routed = Engine.routeEdges(ECOSYSTEM_DATA, layout, visibleIds, sel.mode);

  const documented = routed.edges.filter(e => Engine.isDocumentedTier(e.tier));
  assert.equal(documented.length, 4, 'all 4 documented repo edges must be rendered individually in expanded view');
  for (const edge of documented) {
    assert.equal(edge.bundled, false, `documented edge ${edge.id} must never be bundled`);
  }
});

test('Expanded view separates unconnected projects cleanly into shelf', () => {
  const sel = Engine.selectVisibleNodes(ECOSYSTEM_DATA, {
    query: '', filter: 'all', clusterId: null, expanded: true,
  });
  const graphIds = new Set(sel.graphNodes.map(n => n.id));
  const shelfIds = new Set(sel.shelfNodes.map(n => n.id));
  assert.ok(shelfIds.size > 20, 'unconnected projects must populate shelf');
  assert.ok(shelfIds.has('p-048'), 'p-048 Headless LocalSend must appear in shelf');
  assert.ok(shelfIds.has('p-047'), 'p-047 Codon Stream must appear in shelf');
  for (const id of shelfIds) {
    assert.equal(graphIds.has(id), false, `${id} cannot appear in both graph and shelf`);
  }
  const labels = sel.shelfNodes.map(n => n.label);
  const w2 = labels.findIndex(l => l.startsWith('Week 2 '));
  const w10 = labels.findIndex(l => l.startsWith('Week 10 '));
  assert.ok(w2 !== -1 && w10 !== -1 && w2 < w10, 'Shelf must sort weeks in natural numeric order (Week 2 before Week 10)');
});

test('Spatial navigation finds aligned neighbor or returns null at boundary', () => {
  const cur = { left: 100, right: 276, top: 100, bottom: 156 };
  const candidates = [
    { id: 'far-diag', rect: { left: 420, right: 596, top: 300, bottom: 356 } },
    { id: 'right-aligned', rect: { left: 420, right: 596, top: 100, bottom: 156 } },
  ];
  const hit = Engine.findSpatialCandidate(cur, candidates, 'ArrowRight');
  assert.equal(hit.id, 'right-aligned');
  const boundary = Engine.findSpatialCandidate(cur, candidates, 'ArrowLeft');
  assert.equal(boundary, null);
});

test('Long-span rails maintain >= 16px vertical clearance from all intermediate column cards', () => {
  for (const expanded of [false, true]) {
    const sel = Engine.selectVisibleNodes(ECOSYSTEM_DATA, {
      query: '', filter: 'all', clusterId: null, expanded,
    });
    const layout = Engine.computeLayout(ECOSYSTEM_DATA, sel.graphNodes, sel.mode, sel.cluster);
    const visibleIds = new Set(sel.graphNodes.map(n => n.id));
    const routed = Engine.routeEdges(ECOSYSTEM_DATA, layout, visibleIds, sel.mode);

    for (const edge of routed.edges) {
      const rFrom = layout.rects.get(edge.from);
      const rTo = layout.rects.get(edge.to);
      const minCol = Math.min(rFrom.col, rTo.col);
      const maxCol = Math.max(rFrom.col, rTo.col);
      if (maxCol - minCol < 2) continue;

      for (const [, rMid] of layout.rects.entries()) {
        if (rMid.col <= minCol || rMid.col >= maxCol) continue;
        const clearAbove = rMid.y - edge.my >= 16;
        const clearBelow = edge.my - (rMid.y + rMid.h) >= 16;
        assert.ok(clearAbove || clearBelow, `expanded=${expanded}: rail ${edge.id} my=${edge.my} too close to ${rMid.y}..${rMid.y + rMid.h}`);
      }
    }
  }
});
