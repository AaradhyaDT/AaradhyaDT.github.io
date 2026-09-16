/* ============================================================
   MODULE: graph-modal.js — aaradhyadt.github.io (v54.6)
   High-Performance ExplainGit-Style Knowledge Graph HUD
   Dual-pane architecture:
   - Left Pane: IDE-style file explorer tree with macOS controls.
   - Right Pane: Cosmic starburst canvas with file hub nodes,
     radiating child functions/classes, dual zoom sliders,
     live search, and camera glide navigation.
   ============================================================ */

(function initExplainGitGraphModule() {
  'use strict';

  let graphModal = null;
  let canvas = null;
  let ctx = null;
  let animationFrameId = null;
  let renderPending = false;
  let resizeObserver = null;
  let clockInterval = null;

  // Camera & view state
  const camera = {
    x: 0,
    y: 0,
    zoom: 1.0,
    targetX: 0,
    targetY: 0,
    targetZoom: 1.0,
    isAnimating: false,
  };

  // Interaction state
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let hoveredNode = null; // file or symbol
  let activeFileId = null; // focused file
  let isPhysicsRunning = true;
  let detailLevel = 3; // 1: Files only, 2: Files + Major, 3: Exhaustive

  // Graph data structures
  let files = [];
  let nodes = [];
  let edges = [];
  let fileEdges = [];
  let fileMap = new Map();
  let stars = [];

  // Audio helper safely mapped
  function triggerAudio(cue) {
    if (typeof window.playAudioCue === 'function') {
      window.playAudioCue(cue);
    }
  }

  /* ── Layout & Physics Initializer ──────────────────────────── */
  function setupGraphData() {
    if (typeof GRAPH_DATA === 'undefined') return;

    files = (GRAPH_DATA.files || []).map((f, idx) => ({
      ...f,
      idx,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: f.size || 18,
    }));

    fileMap = new Map();
    files.forEach((f) => fileMap.set(f.id, f));

    nodes = (GRAPH_DATA.nodes || []).map((n, idx) => ({
      ...n,
      idx,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: n.type === 'class' ? 5.5 : 4.0,
      parentFile: fileMap.get(n.file) || null,
    }));

    edges = GRAPH_DATA.edges || [];
    fileEdges = GRAPH_DATA.fileEdges || [];

    // Distribute Files in an aesthetic constellation (Golden Spiral Cluster)
    const fileCount = files.length;
    files.forEach((f, i) => {
      const angle = i * 2.3999632; // Golden angle
      const r = Math.sqrt(i + 1) * 62 + 20;
      f.x = r * Math.cos(angle);
      f.y = r * Math.sin(angle);
    });

    // Position child function/class nodes in orbital clusters around parent file
    const fileSymbols = new Map();
    nodes.forEach((n) => {
      if (n.parentFile) {
        if (!fileSymbols.has(n.parentFile.id)) {
          fileSymbols.set(n.parentFile.id, []);
        }
        fileSymbols.get(n.parentFile.id).push(n);
      }
    });

    fileSymbols.forEach((symList, fId) => {
      const parent = fileMap.get(fId);
      if (!parent) return;
      const count = symList.length;
      symList.forEach((sym, sIdx) => {
        const theta = (sIdx / count) * 2 * Math.PI + (sIdx % 2 ? 0.2 : -0.2);
        const ring = 32 + (sIdx % 3) * 16 + Math.sqrt(count) * 4.5;
        sym.x = parent.x + ring * Math.cos(theta);
        sym.y = parent.y + ring * Math.sin(theta);
      });
    });

    // Distant background starfield
    stars = [];
    for (let i = 0; i < 75; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2400,
        y: (Math.random() - 0.5) * 1600,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.55 + 0.2,
      });
    }

    // Run gentle initial physics relaxation
    relaxGraph(45);
  }

  /* ── Force Physics Relaxation ──────────────────────────────── */
  function relaxGraph(iterations) {
    for (let it = 0; it < iterations; it++) {
      // Repulsion between files
      for (let i = 0; i < files.length; i++) {
        for (let j = i + 1; j < files.length; j++) {
          const dx = files[j].x - files[i].x;
          const dy = files[j].y - files[i].y;
          const distSq = dx * dx + dy * dy || 1;
          const minDist = files[i].radius + files[j].radius + 70;
          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            const force = (minDist - dist) / dist * 0.18;
            files[i].x -= dx * force;
            files[i].y -= dy * force;
            files[j].x += dx * force;
            files[j].y += dy * force;
          }
        }
      }

      // Attract symbols to parent file
      nodes.forEach((n) => {
        if (n.parentFile) {
          const dx = n.parentFile.x - n.x;
          const dy = n.parentFile.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const ideal = 38 + (n.idx % 3) * 14;
          const force = (dist - ideal) * 0.04;
          n.x += (dx / dist) * force;
          n.y += (dy / dist) * force;
        }
      });
    }
  }

  /* ── Demand-Driven Render Loop ─────────────────────────────── */
  function requestRender() {
    if (!renderPending) {
      renderPending = true;
      animationFrameId = requestAnimationFrame(render);
    }
  }

  function render() {
    renderPending = false;
    if (!canvas || !ctx) return;

    // Handle smooth camera interpolation (lerp)
    if (camera.isAnimating) {
      const dx = camera.targetX - camera.x;
      const dy = camera.targetY - camera.y;
      const dz = camera.targetZoom - camera.zoom;

      camera.x += dx * 0.14;
      camera.y += dy * 0.14;
      camera.zoom += dz * 0.14;

      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2 && Math.abs(dz) < 0.002) {
        camera.x = camera.targetX;
        camera.y = camera.targetY;
        camera.zoom = camera.targetZoom;
        camera.isAnimating = false;
      } else {
        requestRender();
      }
      syncZoomControls();
    }

    // Subtle organic drift when physics is running and not dragging
    if (isPhysicsRunning && !isDragging && !camera.isAnimating) {
      const time = performance.now() * 0.0006;
      files.forEach((f, i) => {
        f.x += Math.sin(time + i * 1.7) * 0.07;
        f.y += Math.cos(time + i * 2.1) * 0.07;
      });
      requestRender();
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Apply Camera Transform
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(camera.x, camera.y);

    // 1. Draw Starfield Particles
    stars.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * 0.4})`;
      ctx.fill();
    });

    const activeFile = activeFileId ? fileMap.get(activeFileId) : null;

    // 2. Draw Hairline Constellation Edges (Inter-Symbol & File Links)
    if (detailLevel >= 2) {
      ctx.lineWidth = 0.65;
      for (let i = 0; i < edges.length; i++) {
        const [sIdx, tIdx] = edges[i];
        if (sIdx < nodes.length && tIdx < nodes.length) {
          const sNode = nodes[sIdx];
          const tNode = nodes[tIdx];
          const isRelated =
            activeFile &&
            (sNode.file === activeFile.id || tNode.file === activeFile.id);

          ctx.beginPath();
          ctx.moveTo(sNode.x, sNode.y);
          ctx.lineTo(tNode.x, tNode.y);

          if (activeFile) {
            if (isRelated) {
              ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
              ctx.lineWidth = 1.1;
              ctx.stroke();
            } else {
              ctx.strokeStyle = 'rgba(150, 180, 230, 0.025)';
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          } else {
            ctx.strokeStyle = 'rgba(175, 205, 255, 0.11)';
            ctx.stroke();
          }
        }
      }
    }

    // 3. Draw Radiating Rays to Child Functions (Screenshot 2 Signature Look)
    if (detailLevel >= 2) {
      files.forEach((f) => {
        const isActive = activeFile && f.id === activeFile.id;
        const syms = f.symbols || [];

        for (let j = 0; j < syms.length; j++) {
          const sNode = nodes[syms[j]];
          if (!sNode) continue;

          ctx.beginPath();
          ctx.moveTo(f.x, f.y);
          ctx.lineTo(sNode.x, sNode.y);

          if (isActive) {
            // Radiant Electric Cyan Rays
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.6;
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 9;
            ctx.stroke();
            ctx.shadowBlur = 0; // reset
          } else if (activeFile) {
            ctx.strokeStyle = 'rgba(120, 150, 200, 0.03)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          } else {
            ctx.strokeStyle = 'rgba(160, 190, 240, 0.12)';
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      });
    }

    // 4. Draw Child Function / Class Nodes
    if (detailLevel >= 2) {
      nodes.forEach((n) => {
        const isChildOfActive = activeFile && n.file === activeFile.id;

        ctx.beginPath();
        const r = isChildOfActive ? n.radius * 1.35 : n.radius;
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);

        if (isChildOfActive) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (activeFile) {
          ctx.fillStyle = 'rgba(200, 215, 240, 0.15)';
          ctx.fill();
        } else {
          ctx.fillStyle = n.type === 'class' ? '#f472b6' : 'rgba(230, 237, 243, 0.85)';
          ctx.fill();
        }
      });
    }

    // 5. Draw Primary File Hub Nodes
    files.forEach((f) => {
      const isActive = activeFile && f.id === activeFile.id;
      const isHovered = hoveredNode && hoveredNode.id === f.id;

      ctx.save();
      ctx.beginPath();
      const nodeRadius = isActive ? f.radius * 1.25 : isHovered ? f.radius * 1.15 : f.radius;
      ctx.arc(f.x, f.y, nodeRadius, 0, Math.PI * 2);

      if (isActive) {
        // Glowing cyan border on active node
        ctx.fillStyle = f.color;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 22;
        ctx.fill();
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      } else if (activeFile) {
        // Dim non-active files
        ctx.fillStyle = f.color;
        ctx.globalAlpha = 0.28;
        ctx.fill();
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
      } else {
        // Normal vibrant state
        ctx.fillStyle = f.color;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.stroke();
      }
      ctx.restore();

      // 6. Draw Crisp Floating File Labels (Screenshots 1 & 4)
      ctx.save();
      const label = f.name;
      ctx.font = '600 11px "JetBrains Mono", Consolas, -apple-system, monospace';

      if (isActive) {
        // Cyan Pill Badge (Screenshot 2 look)
        const textWidth = ctx.measureText(label).width;
        const pillW = textWidth + 16;
        const pillH = 22;
        const pillX = f.x - pillW / 2;
        const pillY = f.y - pillH / 2;

        ctx.fillStyle = 'rgba(10, 28, 42, 0.94)';
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.6;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 10;
        roundRect(ctx, pillX, pillY, pillW, pillH, 11);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#58a6ff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, f.x, f.y);
      } else {
        // Crisp floating label beside node
        const labelX = f.x + nodeRadius + 6;
        const labelY = f.y + 4;

        if (activeFile) {
          ctx.globalAlpha = 0.35;
        }

        // Dark halo for instant legibility over dense intersecting lines
        ctx.strokeStyle = '#06070a';
        ctx.lineWidth = 3.5;
        ctx.strokeText(label, labelX, labelY);

        ctx.fillStyle = '#f0f6fc';
        ctx.fillText(label, labelX, labelY);
      }
      ctx.restore();
    });

    ctx.restore(); // Restore camera transform
    ctx.restore(); // Restore dpr scale
  }

  function roundRect(context, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + w, y, x + w, y + h, r);
    context.arcTo(x + w, y + h, x, y + h, r);
    context.arcTo(x, y + h, x, y, r);
    context.arcTo(x, y, x + w, y, r);
    context.closePath();
  }

  /* ── Camera Navigation & Gliding ───────────────────────────── */
  function glideTo(worldX, worldY, targetZoom) {
    camera.targetX = -worldX;
    camera.targetY = -worldY;
    if (targetZoom !== undefined) {
      camera.targetZoom = targetZoom;
    }
    camera.isAnimating = true;
    requestRender();
  }

  function fitAll() {
    if (!files.length || !canvas) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    files.forEach((f) => {
      minX = Math.min(minX, f.x - f.radius);
      maxX = Math.max(maxX, f.x + f.radius);
      minY = Math.min(minY, f.y - f.radius);
      maxY = Math.max(maxY, f.y + f.radius);
    });

    const graphWidth = maxX - minX || 500;
    const graphHeight = maxY - minY || 500;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const pad = 120;
    const scaleX = (canvas.clientWidth - pad) / graphWidth;
    const scaleY = (canvas.clientHeight - pad) / graphHeight;
    const fitZoom = Math.max(0.35, Math.min(1.4, Math.min(scaleX, scaleY)));

    glideTo(centerX, centerY, fitZoom);
  }

  function selectFile(fileId) {
    if (activeFileId === fileId) {
      // Toggle off
      activeFileId = null;
      syncTreeActive(null);
      triggerAudio('click');
      requestRender();
      return;
    }

    activeFileId = fileId;
    const f = fileMap.get(fileId);
    if (f) {
      glideTo(f.x, f.y, 1.25);
    }
    syncTreeActive(fileId);
    triggerAudio('click');
    requestRender();
  }

  function syncTreeActive(fileId) {
    const items = document.querySelectorAll('.graph-tree-item');
    items.forEach((item) => {
      const itemPath = item.getAttribute('data-path');
      if (fileId && itemPath === fileId) {
        item.classList.add('is-active');
        // Ensure parent folders are opened
        let parentFolder = item.closest('.graph-tree-folder');
        while (parentFolder) {
          parentFolder.classList.add('is-open');
          parentFolder = parentFolder.parentElement.closest('.graph-tree-folder');
        }
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('is-active');
      }
    });
  }

  function syncZoomControls() {
    const pct = Math.round(camera.zoom * 100);
    const pctEl = document.getElementById('graphZoomPct');
    if (pctEl) pctEl.textContent = `${pct}%`;

    const hSlider = document.getElementById('graphHorizontalZoom');
    if (hSlider && !hSlider.matches(':active')) {
      hSlider.value = camera.zoom;
    }

    const vSlider = document.getElementById('graphVerticalZoom');
    if (vSlider && !vSlider.matches(':active')) {
      vSlider.value = camera.zoom;
    }
  }

  /* ── Interaction & Raycasting ──────────────────────────────── */
  function findHit(clientX, clientY) {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clickX = clientX - rect.left - canvas.clientWidth / 2;
    const clickY = clientY - rect.top - canvas.clientHeight / 2;

    // Convert screen coord to world coord
    const worldX = clickX / camera.zoom - camera.x;
    const worldY = clickY / camera.zoom - camera.y;

    // Check file nodes first (priority)
    for (let i = files.length - 1; i >= 0; i--) {
      const f = files[i];
      const dx = f.x - worldX;
      const dy = f.y - worldY;
      const hitRadius = (f.radius + 6) / camera.zoom;
      if (dx * dx + dy * dy <= hitRadius * hitRadius) {
        return { type: 'file', data: f };
      }
    }

    // Check symbol nodes
    if (detailLevel >= 2) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dx = n.x - worldX;
        const dy = n.y - worldY;
        const hitRadius = (n.radius + 4) / camera.zoom;
        if (dx * dx + dy * dy <= hitRadius * hitRadius) {
          return { type: 'symbol', data: n };
        }
      }
    }

    return null;
  }

  function updateTooltip(hit, clientX, clientY) {
    const tooltip = document.getElementById('graphNodeTooltip');
    const wrap = document.getElementById('graphCanvasWrap');
    if (!tooltip || !wrap) return;

    if (!hit) {
      tooltip.classList.remove('active');
      return;
    }

    const wrapRect = wrap.getBoundingClientRect();
    const cursorX = clientX - wrapRect.left;
    const cursorY = clientY - wrapRect.top;

    if (hit.type === 'file') {
      const f = hit.data;
      tooltip.innerHTML = `
        <div class="graph-tooltip-head">
          <span class="graph-tooltip-type" style="color: ${f.color}">FILE</span>
          <span class="graph-tooltip-comm">${f.symbolCount} Symbols</span>
        </div>
        <div class="graph-tooltip-title">${escapeHtml(f.name)}</div>
        <div class="graph-tooltip-file">${escapeHtml(f.path)}</div>
      `;
    } else {
      const n = hit.data;
      tooltip.innerHTML = `
        <div class="graph-tooltip-head">
          <span class="graph-tooltip-type">${escapeHtml(n.type)}</span>
          <span class="graph-tooltip-comm">${escapeHtml(n.comm_name || '')}</span>
        </div>
        <div class="graph-tooltip-title">${escapeHtml(n.label)}</div>
        <div class="graph-tooltip-file">${escapeHtml(n.file)} ${escapeHtml(n.line || '')}</div>
      `;
    }

    let posX = cursorX + 16;
    let posY = cursorY + 16;
    if (posX + 240 > wrapRect.width) posX = cursorX - 250;
    if (posY + 100 > wrapRect.height) posY = cursorY - 110;

    tooltip.style.left = `${Math.max(10, posX)}px`;
    tooltip.style.top = `${Math.max(10, posY)}px`;
    tooltip.classList.add('active');
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* ── Explorer Tree DOM Generator ───────────────────────────── */
  function renderTreeDOM(container, treeNodes) {
    if (!container || !treeNodes) return;
    container.innerHTML = '';

    function buildNode(item) {
      if (item.type === 'dir') {
        const folderDiv = document.createElement('div');
        folderDiv.className = 'graph-tree-folder is-open';

        const row = document.createElement('div');
        row.className = 'graph-tree-item';
        row.innerHTML = `
          <span class="graph-tree-label-wrap">
            <span class="graph-tree-arrow">▶</span>
            <span class="graph-tree-icon">📁</span>
            <span>${escapeHtml(item.name)}</span>
          </span>
        `;

        row.addEventListener('click', (e) => {
          e.stopPropagation();
          folderDiv.classList.toggle('is-open');
          triggerAudio('click');
        });

        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'graph-tree-folder-children';
        (item.children || []).forEach((c) => {
          childrenDiv.appendChild(buildNode(c));
        });

        folderDiv.appendChild(row);
        folderDiv.appendChild(childrenDiv);
        return folderDiv;
      } else {
        const row = document.createElement('div');
        row.className = 'graph-tree-item';
        row.setAttribute('data-path', item.path);

        const colorDot = item.color
          ? `<span class="graph-tree-dot" style="background: ${item.color}"></span>`
          : `<span class="graph-tree-dot" style="background: #8b949e"></span>`;

        row.innerHTML = `
          <span class="graph-tree-label-wrap">
            ${colorDot}
            <span>${escapeHtml(item.name)}</span>
          </span>
          <span class="graph-tree-external-icon">↗</span>
        `;

        row.addEventListener('click', (e) => {
          e.stopPropagation();
          selectFile(item.path);
        });

        return row;
      }
    }

    treeNodes.forEach((n) => {
      container.appendChild(buildNode(n));
    });
  }

  /* ── Live Kathmandu Clock ──────────────────────────────────── */
  function updateClock() {
    const el = document.getElementById('graphClock');
    if (!el) return;
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      el.textContent = timeStr;
    } catch {
      el.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  /* ── Modal Creation & Lifecycle ───────────────────────────── */
  function openGraphModal() {
    // Self-healing stylesheet injection if not already in document
    if (!document.querySelector('link[href*="graph-modal.css"]') && !document.querySelector('link[href*="graph-modal.min.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'assets/css/modules/graph-modal.css';
      document.head.appendChild(link);
    }

    if (typeof GRAPH_DATA === 'undefined') {
      const existing = document.querySelector('script[src*="graph-data.js"]');
      if (!existing) {
        const s = document.createElement('script');
        s.src = 'assets/js/data/graph-data.js';
        s.onload = () => openGraphModal();
        document.head.appendChild(s);
        return;
      }
      setTimeout(openGraphModal, 80);
      return;
    }

    if (!graphModal) {
      graphModal = document.createElement('div');
      graphModal.id = 'graphModalOverlay';
      graphModal.className = 'graph-modal-overlay';
      graphModal.setAttribute('role', 'dialog');
      graphModal.setAttribute('aria-modal', 'true');
      graphModal.setAttribute('aria-label', 'Interactive AST Knowledge Graph HUD');
      document.body.appendChild(graphModal);
    }

    const totalFiles = GRAPH_DATA.stats ? GRAPH_DATA.stats.files : (GRAPH_DATA.files || []).length;
    const totalNodes = GRAPH_DATA.stats ? GRAPH_DATA.stats.nodes : (GRAPH_DATA.nodes || []).length;
    const totalEdges = GRAPH_DATA.stats ? GRAPH_DATA.stats.edges : (GRAPH_DATA.edges || []).length;

    graphModal.innerHTML = `
      <div class="graph-modal-card" id="graphModalCard">
        <!-- Left Pane: File Explorer Sidebar -->
        <aside class="graph-explorer-sidebar" id="graphExplorerSidebar">
          <div class="graph-explorer-header">
            <div class="graph-mac-dots">
              <span class="graph-mac-dot graph-dot-red" id="graphDotClose" title="Close"></span>
              <span class="graph-mac-dot graph-dot-yellow" id="graphDotMin" title="Fit All Nodes"></span>
              <span class="graph-mac-dot graph-dot-green" id="graphDotMax" title="Toggle Fullscreen"></span>
            </div>
            <span class="graph-explorer-title">explorer</span>
          </div>
          <div class="graph-explorer-tree" id="graphExplorerTree"></div>
        </aside>

        <!-- Right Pane: Main Area & Canvas -->
        <main class="graph-main-area">
          <!-- Top Floating HUD -->
          <header class="graph-top-hud">
            <div class="graph-legend-group">
              <span class="graph-legend-pill">
                <span class="graph-legend-dot graph-legend-dot-file"></span> file
              </span>
              <span class="graph-legend-pill">
                <span class="graph-legend-dot graph-legend-dot-symbol"></span> function / class
              </span>
            </div>

            <div class="graph-search-wrap">
              <input
                type="text"
                class="graph-search-input"
                id="graphSearchInput"
                placeholder="Find a file..."
                autocomplete="off"
                spellcheck="false"
              />
              <div class="graph-search-dropdown" id="graphSearchDropdown"></div>
            </div>

            <div class="graph-top-actions">
              <button type="button" class="graph-icon-btn" id="graphBtnPhysics" title="Pause / Resume Drift Physics" aria-label="Toggle Physics">
                <span id="graphPhysicsIcon">⏸</span>
              </button>
              <button type="button" class="graph-icon-btn" id="graphBtnFitAll" title="Fit Entire Galaxy in View" aria-label="Fit View">
                <span>☁</span>
              </button>
              <button type="button" class="graph-icon-btn" id="graphBtnRecenter" title="Recenter Camera" aria-label="Recenter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
                </svg>
              </button>
              <button type="button" class="graph-icon-btn" id="graphBtnFullscreen" title="Toggle Fullscreen" aria-label="Toggle Fullscreen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
              </button>
              <button type="button" class="graph-icon-btn" id="graphBtnClose" title="Close" aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </header>

          <!-- Telemetry / Detail Banner (Screenshot 3 style) -->
          <div class="graph-telemetry-banner">
            <div class="graph-banner-left">
              <span class="graph-banner-dot">●</span>
              <span><strong>CODE MAP</strong></span>
              <span>· ${totalFiles} files · ${totalNodes} nodes · ${totalEdges} links · exhaustive</span>
            </div>
            <div class="graph-detail-slider-wrap">
              <span class="graph-detail-label">DETAIL</span>
              <input type="range" class="graph-detail-slider" id="graphDetailSlider" min="1" max="3" value="3" step="1" title="Adjust Detail Density" />
              <span class="graph-detail-label">MAX</span>
            </div>
          </div>

          <!-- Canvas Container (Completely unobstructed bottom) -->
          <div class="graph-canvas-container" id="graphCanvasWrap">
            <canvas id="graphCanvas2D"></canvas>
            
            <!-- Right-Side Vertical Zoom Slider (Screenshot 2) -->
            <div class="graph-vertical-slider-wrap">
              <input
                type="range"
                class="graph-vertical-slider"
                id="graphVerticalZoom"
                min="0.25"
                max="4.0"
                step="0.05"
                value="1.0"
                title="Zoom level"
              />
            </div>

            <!-- Node Inspector Tooltip -->
            <div class="graph-node-tooltip" id="graphNodeTooltip"></div>
          </div>
        </main>
      </div>
    `;

    canvas = document.getElementById('graphCanvas2D');
    if (canvas) {
      ctx = canvas.getContext('2d', { alpha: true });
    }

    setupGraphData();
    renderTreeDOM(document.getElementById('graphExplorerTree'), GRAPH_DATA.tree);
    bindEvents();

    // Initial View Fit
    setTimeout(fitAll, 40);

    requestAnimationFrame(() => graphModal.classList.add('open'));
    document.body.style.overflow = 'hidden';
    triggerAudio('open');

    // Progressive settling renders
    requestRender();
    setTimeout(requestRender, 80);
    setTimeout(requestRender, 200);
  }

  /* ── Event Binding ─────────────────────────────────────────── */
  function bindEvents() {
    if (!canvas) return;

    // Resize Observer for dynamic canvas resolution
    const wrap = document.getElementById('graphCanvasWrap');
    if (wrap && typeof ResizeObserver !== 'undefined') {
      if (resizeObserver) resizeObserver.disconnect();
      resizeObserver = new ResizeObserver(() => {
        requestRender();
      });
      resizeObserver.observe(wrap);
    }

    // Canvas Drag & Pan
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        camera.x += dx / camera.zoom;
        camera.y += dy / camera.zoom;
        camera.targetX = camera.x;
        camera.targetY = camera.y;
        camera.isAnimating = false;
        requestRender();
      } else if (graphModal && graphModal.classList.contains('open')) {
        const hit = findHit(e.clientX, e.clientY);
        const prevHover = hoveredNode;
        hoveredNode = hit ? hit.data : null;

        if (hoveredNode !== prevHover) {
          canvas.style.cursor = hit ? 'pointer' : 'grab';
          requestRender();
        }
        updateTooltip(hit, e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (isDragging) {
        const totalDist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
        isDragging = false;
        if (totalDist < 5) {
          // Click event on canvas
          const hit = findHit(e.clientX, e.clientY);
          if (hit) {
            if (hit.type === 'file') {
              selectFile(hit.data.id);
            } else if (hit.type === 'symbol') {
              selectFile(hit.data.file);
            }
          } else {
            // Clicked background: deselect
            if (activeFileId) {
              selectFile(activeFileId); // toggles off
            }
          }
        }
      }
    });

    // Zoom Towards Mouse Pointer via Wheel
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - canvas.clientWidth / 2;
      const mouseY = e.clientY - rect.top - canvas.clientHeight / 2;

      const zoomFactor = e.deltaY < 0 ? 1.14 : 0.88;
      const newZoom = Math.max(0.25, Math.min(4.0, camera.zoom * zoomFactor));

      // Adjust camera so mouse point stays fixed
      camera.x -= (mouseX / camera.zoom - mouseX / newZoom);
      camera.y -= (mouseY / camera.zoom - mouseY / newZoom);
      camera.zoom = newZoom;
      camera.targetZoom = newZoom;
      camera.targetX = camera.x;
      camera.targetY = camera.y;
      camera.isAnimating = false;

      syncZoomControls();
      requestRender();
    }, { passive: false });

    // Touch Support for Mobile
    let touchStartX = 0, touchStartY = 0;
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;

        camera.x += dx / camera.zoom;
        camera.y += dy / camera.zoom;
        camera.targetX = camera.x;
        camera.targetY = camera.y;
        requestRender();
      }
    }, { passive: true });

    // Right-Side Vertical Zoom Slider
    const vSlider = document.getElementById('graphVerticalZoom');
    if (vSlider) {
      vSlider.addEventListener('input', (e) => {
        camera.zoom = parseFloat(e.target.value);
        camera.targetZoom = camera.zoom;
        camera.isAnimating = false;
        syncZoomControls();
        requestRender();
      });
    }

    // Bottom Horizontal Zoom Slider
    const hSlider = document.getElementById('graphHorizontalZoom');
    if (hSlider) {
      hSlider.addEventListener('input', (e) => {
        camera.zoom = parseFloat(e.target.value);
        camera.targetZoom = camera.zoom;
        camera.isAnimating = false;
        syncZoomControls();
        requestRender();
      });
    }

    // Detail Slider
    const dSlider = document.getElementById('graphDetailSlider');
    if (dSlider) {
      dSlider.addEventListener('input', (e) => {
        detailLevel = parseInt(e.target.value, 10);
        triggerAudio('click');
        requestRender();
      });
    }

    // Search Input & Autocomplete
    const searchInput = document.getElementById('graphSearchInput');
    const searchDropdown = document.getElementById('graphSearchDropdown');
    if (searchInput && searchDropdown) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
          searchDropdown.classList.remove('active');
          return;
        }

        const matches = files.filter((f) =>
          f.name.toLowerCase().includes(query) || f.path.toLowerCase().includes(query)
        ).slice(0, 8);

        if (!matches.length) {
          searchDropdown.innerHTML = `<div class="graph-search-item" style="color: #7d8590">No files found</div>`;
        } else {
          searchDropdown.innerHTML = matches
            .map(
              (m) => `
              <div class="graph-search-item" data-id="${escapeHtml(m.id)}">
                <span class="graph-tree-dot" style="background: ${m.color}"></span>
                <span><strong>${escapeHtml(m.name)}</strong> · ${escapeHtml(m.path)}</span>
              </div>
            `
            )
            .join('');

          searchDropdown.querySelectorAll('.graph-search-item').forEach((item) => {
            item.addEventListener('click', () => {
              const fId = item.getAttribute('data-id');
              if (fId) {
                selectFile(fId);
                searchDropdown.classList.remove('active');
                searchInput.value = '';
              }
            });
          });
        }
        searchDropdown.classList.add('active');
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const first = searchDropdown.querySelector('.graph-search-item[data-id]');
          if (first) {
            const fId = first.getAttribute('data-id');
            selectFile(fId);
            searchDropdown.classList.remove('active');
            searchInput.value = '';
          }
        } else if (e.key === 'Escape') {
          searchDropdown.classList.remove('active');
        }
      });
    }

    // Close & Reset Buttons
    const closeBtn = document.getElementById('graphBtnClose');
    const dotClose = document.getElementById('graphDotClose');
    if (closeBtn) closeBtn.addEventListener('click', closeGraphModal);
    if (dotClose) dotClose.addEventListener('click', closeGraphModal);

    const fitBtn = document.getElementById('graphBtnFitAll');
    const dotMin = document.getElementById('graphDotMin');
    if (fitBtn) fitBtn.addEventListener('click', fitAll);
    if (dotMin) dotMin.addEventListener('click', fitAll);

    const resetBtn = document.getElementById('graphBtnReset');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      camera.targetX = 0;
      camera.targetY = 0;
      camera.targetZoom = 1.0;
      camera.isAnimating = true;
      activeFileId = null;
      syncTreeActive(null);
      requestRender();
    });

    const recenterBtn = document.getElementById('graphBtnRecenter');
    if (recenterBtn) recenterBtn.addEventListener('click', () => {
      if (activeFileId) {
        const f = fileMap.get(activeFileId);
        if (f) glideTo(f.x, f.y, camera.zoom);
      } else {
        glideTo(0, 0, camera.zoom);
      }
    });

    // Play / Pause Physics Drift
    const physBtn = document.getElementById('graphBtnPhysics');
    const physIcon = document.getElementById('graphPhysicsIcon');
    if (physBtn && physIcon) {
      physBtn.addEventListener('click', () => {
        isPhysicsRunning = !isPhysicsRunning;
        physIcon.textContent = isPhysicsRunning ? '⏸' : '▶';
        physBtn.classList.toggle('is-active', isPhysicsRunning);
        triggerAudio('click');
        if (isPhysicsRunning) requestRender();
      });
    }

    // Fullscreen Toggle
    const fullBtn = document.getElementById('graphBtnFullscreen');
    const dotMax = document.getElementById('graphDotMax');
    function toggleFullscreen() {
      const card = document.getElementById('graphModalCard');
      if (card) {
        card.classList.toggle('is-fullscreen');
        triggerAudio('click');
        setTimeout(() => {
          fitAll();
          requestRender();
        }, 150);
      }
    }
    if (fullBtn) fullBtn.addEventListener('click', toggleFullscreen);
    if (dotMax) dotMax.addEventListener('click', toggleFullscreen);

    // Overlay backdrop click to close
    graphModal.addEventListener('click', (e) => {
      if (e.target === graphModal) closeGraphModal();
    });
  }

  function closeGraphModal() {
    if (!graphModal) return;
    graphModal.classList.remove('open');
    document.body.style.overflow = '';
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
    if (clockInterval) {
      clearInterval(clockInterval);
      clockInterval = null;
    }
    const tooltip = document.getElementById('graphNodeTooltip');
    if (tooltip) tooltip.classList.remove('active');
    triggerAudio('close');
  }

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (graphModal && graphModal.classList.contains('open')) {
      if (e.key === 'Escape') {
        if (activeFileId) {
          selectFile(activeFileId); // deselect
        } else {
          closeGraphModal();
        }
      } else if (e.key === '+' || e.key === '=') {
        camera.zoom = Math.min(4.0, camera.zoom * 1.2);
        camera.targetZoom = camera.zoom;
        syncZoomControls();
        requestRender();
      } else if (e.key === '-' || e.key === '_') {
        camera.zoom = Math.max(0.25, camera.zoom * 0.83);
        camera.targetZoom = camera.zoom;
        syncZoomControls();
        requestRender();
      } else if (e.key === '0') {
        fitAll();
      }
    }
  });

  // Global exports
  window.openGraphModal = openGraphModal;
  window.closeGraphModal = closeGraphModal;
})();
