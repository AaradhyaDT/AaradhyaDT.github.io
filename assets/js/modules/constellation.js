/* ============================================================
   MODULE: constellation.js — aaradhyadt.github.io (v59)
   Interactive Project Constellation & Camera Engine
   - Pixel-coordinate layered DAG + serpentine timeline engine
   - Transform-based camera (fit, drag-pan, Ctrl/Cmd+wheel zoom)
   - Roving tabindex + 2D bounding-rect spatial arrow navigation
   ============================================================ */
(function initConstellationModule(globalScope) {
  'use strict';

  const NODE_W = 168;
  const NODE_H = 46;
  const COL_GAP = 86;
  const ROW_GAP = 14;
  const PAD_X = 28;
  const PAD_Y = 18;
  const HEADER_H = 24;
  const RAIL_PAD = 44;
  const TIMELINE_COLS = 5;
  const TIMELINE_COL_GAP = 42;
  const TIMELINE_ROW_GAP = 36;
  const SPINE_OFFSET = 20;
  const MIN_ZOOM = 0.35;
  const MAX_ZOOM = 1.6;
  const ZOOM_STEP = 0.2;

  function buildMaps(data) {
    const nodeMap = new Map();
    (data.nodes || []).forEach(node => nodeMap.set(node.id, node));
    const clusterMap = new Map();
    (data.clusters || []).forEach(cluster => clusterMap.set(cluster.id, cluster));
    const groupMap = new Map();
    (data.groups || []).forEach(group => groupMap.set(group.id, group));
    return { nodeMap, clusterMap, groupMap };
  }

  function isDocumentedTier(tier) {
    return tier === 'DOCUMENTED_INTEGRATION' || tier === 'DOCUMENTED_WORKFLOW';
  }

  function compareNodes(a, b) {
    return (a.order ?? 1000) - (b.order ?? 1000) || a.label.localeCompare(b.label);
  }

  /**
   * Determine visible graph nodes, shelf nodes, mode, and active cluster
   * from static data + UI filter state. Pure and side-effect free.
   */
  function selectVisibleNodes(data, state) {
    const { nodeMap, clusterMap } = buildMaps(data);
    const query = (state.query || '').trim().toLowerCase();
    const filter = state.filter || 'all';
    const clusterId = state.clusterId || (clusterMap.has(filter) ? filter : null);
    const expanded = Boolean(state.expanded);
    const edges = data.edges || [];

    if (clusterId && clusterMap.has(clusterId)) {
      const cluster = clusterMap.get(clusterId);
      const memberIds = [cluster.id, ...cluster.members.filter(id => id !== cluster.id)];
      const allClusterNodes = memberIds
        .map(id => nodeMap.get(id))
        .filter(Boolean);
      const matching = query
        ? allClusterNodes.filter(node => (node.label + ' ' + node.search).toLowerCase().includes(query))
        : allClusterNodes;

      if (cluster.timeline && !query) {
        return {
          graphNodes: matching,
          shelfNodes: [],
          mode: 'timeline',
          cluster,
        };
      }
      if (cluster.timeline && query) {
        return {
          graphNodes: [],
          shelfNodes: matching,
          mode: 'layered',
          cluster,
        };
      }
      return {
        graphNodes: matching,
        shelfNodes: [],
        mode: 'cluster',
        cluster,
      };
    }

    const featuredSet = new Set(data.featured || []);
    const showAll = expanded || Boolean(query) || filter !== 'all';

    let candidates = (data.nodes || []).filter(node => {
      if (!showAll && !featuredSet.has(node.id)) return false;
      if (filter !== 'all' && node.group !== filter && !(filter === 'fellowship' && node.id === 'p-025')) {
        return false;
      }
      if (query && !(node.label + ' ' + node.search).toLowerCase().includes(query)) {
        return false;
      }
      return true;
    });

    // When showing all projects in top-level map, hide raw cluster-member leaf duplicates
    // only when filtering "all" without search? No: keep connected leaf projects (like p-029,
    // p-035, p-001, drive, calendar, classroom) in the graph when they have edges, and put
    // unconnected projects in the compact shelf so every project is discoverable without clutter.
    const candidateIds = new Set(candidates.map(node => node.id));
    const connectedIds = new Set();
    edges.forEach(edge => {
      if (candidateIds.has(edge.from) && candidateIds.has(edge.to)) {
        connectedIds.add(edge.from);
        connectedIds.add(edge.to);
      }
    });

    if (!showAll) {
      return {
        graphNodes: candidates,
        shelfNodes: [],
        mode: 'layered',
        cluster: null,
      };
    }

    const graphNodes = candidates.filter(node => connectedIds.has(node.id));
    const shelfNodes = candidates
      .filter(node => !connectedIds.has(node.id))
      .sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }));

    return {
      graphNodes,
      shelfNodes,
      mode: 'layered',
      cluster: null,
    };
  }

  /**
   * Compute deterministic pixel positions for every graph node.
   * Never reads selected node state, guaranteeing column stability on click.
   */
  function computeLayout(data, graphNodes, mode, cluster) {
    const rects = new Map();
    const agents = data.agents || [];
    const agentSet = new Set(agents);
    const columnHeaders = [];

    if (!graphNodes.length) {
      return {
        width: 680,
        height: 160,
        rects,
        columnHeaders,
        bundleAgents: false,
        timelineSequence: [],
      };
    }

    if (mode === 'timeline' && cluster) {
      const sequence = [...graphNodes];
      const cols = Math.min(TIMELINE_COLS, Math.max(1, sequence.length));
      const rows = Math.ceil(sequence.length / cols);
      const width = PAD_X * 2 + cols * NODE_W + Math.max(0, cols - 1) * TIMELINE_COL_GAP;
      const height = PAD_Y * 2 + HEADER_H + rows * NODE_H + Math.max(0, rows - 1) * TIMELINE_ROW_GAP;

      columnHeaders.push({
        id: cluster.id,
        label: cluster.label,
        x: PAD_X,
        cx: PAD_X + (width - PAD_X * 2) / 2,
        y: PAD_Y - 12,
      });

      sequence.forEach((node, index) => {
        const row = Math.floor(index / cols);
        const posInRow = index % cols;
        const col = row % 2 === 1 ? cols - 1 - posInRow : posInRow;
        const x = PAD_X + col * (NODE_W + TIMELINE_COL_GAP);
        const y = PAD_Y + HEADER_H + row * (NODE_H + TIMELINE_ROW_GAP);
        rects.set(node.id, {
          x,
          y,
          w: NODE_W,
          h: NODE_H,
          cx: x + NODE_W / 2,
          cy: y + NODE_H / 2,
          col,
          row,
        });
      });

      return {
        width,
        height,
        rects,
        columnHeaders,
        bundleAgents: false,
        timelineSequence: sequence.map(n => n.id),
      };
    }

    if (mode === 'cluster' && cluster) {
      const hub = graphNodes.find(n => n.id === cluster.id);
      const members = graphNodes.filter(n => n.id !== cluster.id).sort(compareNodes);
      const cols = hub && members.length ? 2 : 1;
      const rowsCol0 = hub ? [hub] : members;
      const rowsCol1 = hub ? members : [];
      const maxRows = Math.max(rowsCol0.length, rowsCol1.length, 1);
      const contentH = maxRows * NODE_H + Math.max(0, maxRows - 1) * ROW_GAP;
      const width = PAD_X * 2 + cols * NODE_W + (cols - 1) * COL_GAP;
      const height = PAD_Y * 2 + HEADER_H + RAIL_PAD + contentH;

      const columns = rowsCol1.length
        ? [{ label: 'Cluster hub', items: rowsCol0 }, { label: cluster.label, items: rowsCol1 }]
        : [{ label: cluster.label, items: rowsCol0 }];

      columns.forEach((colData, colIdx) => {
        const colH = colData.items.length * NODE_H + Math.max(0, colData.items.length - 1) * ROW_GAP;
        const startY = PAD_Y + HEADER_H + (contentH - colH) / 2;
        const x = PAD_X + colIdx * (NODE_W + COL_GAP);
        columnHeaders.push({
          id: `cluster-col-${colIdx}`,
          label: colData.label,
          x,
          cx: x + NODE_W / 2,
          y: PAD_Y,
        });
        colData.items.forEach((node, rowIdx) => {
          const y = startY + rowIdx * (NODE_H + ROW_GAP);
          rects.set(node.id, {
            x,
            y,
            w: NODE_W,
            h: NODE_H,
            cx: x + NODE_W / 2,
            cy: y + NODE_H / 2,
            col: colIdx,
            row: rowIdx,
          });
        });
      });

      return {
        width,
        height,
        rects,
        columnHeaders,
        bundleAgents: false,
        timelineSequence: [],
      };
    }

    // Layered semantic DAG
    const declaredCols = data.columns || [];
    const buckets = new Map();
    declaredCols.forEach((col, idx) => buckets.set(idx, []));
    graphNodes.forEach(node => {
      const cIdx = buckets.has(node.column) ? node.column : Math.max(0, declaredCols.length - 1);
      buckets.get(cIdx).push(node);
    });

    const activeCols = [];
    declaredCols.forEach((col, idx) => {
      const items = buckets.get(idx);
      if (items && items.length) {
        items.sort(compareNodes);
        activeCols.push({ id: col.id, label: col.label, origIdx: idx, items });
      }
    });

    const bundleAgents =
      activeCols.length > 0 &&
      activeCols[0].id === 'agents' &&
      agents.length >= 2 &&
      agents.every(id => graphNodes.some(n => n.id === id));

    if (bundleAgents) {
      const orderIdx = new Map(agents.map((id, i) => [id, i]));
      activeCols[0].items.sort((a, b) => (orderIdx.get(a.id) ?? 99) - (orderIdx.get(b.id) ?? 99));
    }

    const maxRows = Math.max(...activeCols.map(c => c.items.length), 1);
    const contentH = maxRows * NODE_H + Math.max(0, maxRows - 1) * ROW_GAP;
    const width = PAD_X * 2 + activeCols.length * NODE_W + Math.max(0, activeCols.length - 1) * COL_GAP;
    const height = PAD_Y + HEADER_H + RAIL_PAD + contentH + PAD_Y + RAIL_PAD;

    activeCols.forEach((col, colIdx) => {
      const colH = col.items.length * NODE_H + Math.max(0, col.items.length - 1) * ROW_GAP;
      const startY = PAD_Y + HEADER_H + RAIL_PAD + (contentH - colH) / 2;
      const x = PAD_X + colIdx * (NODE_W + COL_GAP);
      columnHeaders.push({
        id: col.id,
        label: col.label,
        x,
        cx: x + NODE_W / 2,
        y: PAD_Y,
      });
      col.items.forEach((node, rowIdx) => {
        const y = startY + rowIdx * (NODE_H + ROW_GAP);
        rects.set(node.id, {
          x,
          y,
          w: NODE_W,
          h: NODE_H,
          cx: x + NODE_W / 2,
          cy: y + NODE_H / 2,
          col: colIdx,
          row: rowIdx,
        });
      });
    });

    return {
      width,
      height,
      rects,
      columnHeaders,
      bundleAgents,
      timelineSequence: [],
      colNodeCounts: activeCols.map(c => c.items.length),
      colBands: activeCols.map(col => {
        const ys = col.items.map(n => rects.get(n.id));
        const minY = Math.min(...ys.map(r => r.y));
        const maxY = Math.max(...ys.map(r => r.y + r.h));
        return {
          x: ys[0].x,
          w: NODE_W,
          cx: ys[0].cx,
          minY,
          maxY,
          rects: ys,
        };
      }),
      agentSet,
    };
  }

  /**
   * Convert an orthogonal or polygonal point sequence into a smooth filleted SVG path.
   */
  function roundedPolyline(points, radius = 10) {
    const pts = [];
    for (const pt of points) {
      const prev = pts[pts.length - 1];
      if (!prev || Math.hypot(pt[0] - prev[0], pt[1] - prev[1]) >= 0.5) {
        pts.push(pt);
      }
    }
    if (!pts.length) return '';
    if (pts.length === 1) return `M ${pts[0][0]} ${pts[0][1]}`;
    if (pts.length === 2) return `M ${pts[0][0]} ${pts[0][1]} L ${pts[1][0]} ${pts[1][1]}`;

    const parts = [`M ${pts[0][0]} ${pts[0][1]}`];
    for (let i = 1; i < pts.length - 1; i++) {
      const p0 = pts[i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const dx1 = p1[0] - p0[0];
      const dy1 = p1[1] - p0[1];
      const dx2 = p2[0] - p1[0];
      const dy2 = p2[1] - p1[1];
      const len1 = Math.hypot(dx1, dy1);
      const len2 = Math.hypot(dx2, dy2);
      const r = Math.min(radius, len1 / 2, len2 / 2);
      if (r < 0.5) {
        parts.push(`L ${p1[0]} ${p1[1]}`);
        continue;
      }
      const inX = Math.round((p1[0] - (dx1 / len1) * r) * 100) / 100;
      const inY = Math.round((p1[1] - (dy1 / len1) * r) * 100) / 100;
      const outX = Math.round((p1[0] + (dx2 / len2) * r) * 100) / 100;
      const outY = Math.round((p1[1] + (dy2 / len2) * r) * 100) / 100;
      parts.push(`L ${inX} ${inY} Q ${p1[0]} ${p1[1]} ${outX} ${outY}`);
    }
    const last = pts[pts.length - 1];
    parts.push(`L ${last[0]} ${last[1]}`);
    return parts.join(' ');
  }

  /**
   * Compute calm, non-crossing SVG paths anchored strictly to card border ports.
   */
  function routeEdges(data, layout, visibleIds, mode) {
    const rects = layout.rects;
    const agents = data.agents || [];
    const agentSet = new Set(agents);
    const renderedEdges = [];
    let spine = null;
    let maxRightX = layout.width;

    if (mode === 'timeline') {
      const seq = layout.timelineSequence || [];
      for (let i = 1; i < seq.length; i++) {
        const fromId = seq[i - 1];
        const toId = seq[i];
        const r1 = rects.get(fromId);
        const r2 = rects.get(toId);
        if (!r1 || !r2) continue;

        let sx;
        let sy;
        let ex;
        let ey;
        let d;
        if (r1.row === r2.row) {
          const dir = r2.cx > r1.cx ? 1 : -1;
          sx = dir > 0 ? r1.x + r1.w : r1.x;
          sy = r1.cy;
          ex = dir > 0 ? r2.x : r2.x + r2.w;
          ey = r2.cy;
          d = `M ${sx} ${sy} L ${ex} ${ey}`;
        } else {
          // Serpentine row drop: exit bottom port, enter top port
          sx = r1.cx;
          sy = r1.y + r1.h;
          ex = r2.cx;
          ey = r2.y;
          d = `M ${sx} ${sy} L ${ex} ${ey}`;
        }

        renderedEdges.push({
          id: `tl-${fromId}-${toId}`,
          from: fromId,
          to: toId,
          tier: 'TIMELINE',
          label: 'Next week',
          description: 'Chronological coursework progression.',
          bundled: false,
          members: [fromId],
          sx,
          sy,
          ex,
          ey,
          mx: (sx + ex) / 2,
          my: (sy + ey) / 2,
          d,
        });
      }
      return { edges: renderedEdges, spine: null, width: layout.width, height: layout.height };
    }

    const visibleEdges = (data.edges || []).filter(
      edge => visibleIds.has(edge.from) && visibleIds.has(edge.to) && rects.has(edge.from) && rects.has(edge.to)
    );

    // Determine which WORKFLOW_CONTEXT agent edges should share the agent spine
    const workflowByTarget = new Map();
    if (layout.bundleAgents) {
      visibleEdges.forEach(edge => {
        if (!isDocumentedTier(edge.tier) && agentSet.has(edge.from)) {
          if (!workflowByTarget.has(edge.to)) workflowByTarget.set(edge.to, []);
          workflowByTarget.get(edge.to).push(edge);
        }
      });
    }

    const bundledTargets = new Map();
    workflowByTarget.forEach((list, targetId) => {
      if (list.length >= 2) {
        bundledTargets.set(targetId, list);
      }
    });

    if (layout.bundleAgents && bundledTargets.size > 0) {
      const agentRects = agents.map(id => rects.get(id)).filter(Boolean);
      const agentRight = agentRects[0].x + agentRects[0].w;
      const firstY = agentRects[0].cy;
      const lastY = agentRects[agentRects.length - 1].cy;
      const midY = (firstY + lastY) / 2;
      const spineX = agentRight + SPINE_OFFSET;
      const outerU = roundedPolyline(
        [
          [agentRight, firstY],
          [spineX, firstY],
          [spineX, lastY],
          [agentRight, lastY],
        ],
        8
      );
      const midTaps = agentRects
        .slice(1, -1)
        .map(r => `M ${agentRight} ${r.cy} H ${spineX}`)
        .join(' ');
      spine = {
        x: spineX,
        topY: firstY,
        bottomY: lastY,
        midY,
        d: midTaps ? `${outerU} ${midTaps}` : outerU,
        agents: [...agents],
      };
    }

    const emittedBundles = new Set();
    const edgeSet = new Set(visibleEdges.map(e => `${e.from}->${e.to}`));

    // Collect items to route (individual edges + bundled spine trunks)
    const routeItems = [];
    visibleEdges.forEach(edge => {
      if (bundledTargets.has(edge.to) && !isDocumentedTier(edge.tier) && agentSet.has(edge.from)) {
        if (!emittedBundles.has(edge.to)) {
          emittedBundles.add(edge.to);
          const group = bundledTargets.get(edge.to);
          routeItems.push({
            id: `bundle-${edge.to}`,
            from: agents[0],
            to: edge.to,
            tier: 'WORKFLOW_CONTEXT',
            label: group[0].label,
            description: group[0].description,
            bundled: true,
            members: group.map(e => e.from),
          });
        }
        return;
      }
      routeItems.push({
        id: `edge-${edge.from}-${edge.to}`,
        from: edge.from,
        to: edge.to,
        tier: edge.tier,
        label: edge.label,
        description: edge.description,
        source: edge.source,
        source_commit: edge.source_commit,
        bundled: false,
        members: [edge.from],
      });
    });

    // Classify unified left/right port buckets (out + in per node side) sorted by opposite Y
    const portBuckets = new Map();
    const sameColGroups = new Map();
    const pushPort = (nodeId, side, dir, item, otherY, otherId) => {
      const key = `${nodeId}:${side}`;
      if (!portBuckets.has(key)) portBuckets.set(key, []);
      portBuckets.get(key).push({ item, dir, otherY, otherId });
    };

    routeItems.forEach(item => {
      const rFrom = rects.get(item.from);
      const rTo = rects.get(item.to);
      if (!rFrom || !rTo) return;
      item.fromCol = item.bundled ? 0 : rFrom.col;
      item.toCol = rTo.col;
      item.sameCol = !item.bundled && item.fromCol === item.toCol;
      item.forward = item.fromCol < item.toCol;

      if (item.sameCol) {
        item.outSide = 'right';
        item.inSide = 'right';
        item.colSpan = Math.abs(rTo.cy - rFrom.cy);
        const dirDown = rTo.cy >= rFrom.cy;
        const outSortY = dirDown
          ? rFrom.cy + 1000 / (1 + item.colSpan)
          : rFrom.cy - 1000 / (1 + item.colSpan);
        pushPort(item.from, 'right', 'out', item, outSortY, item.to);
        pushPort(item.to, 'right', 'in', item, rFrom.cy, item.from);
        if (!sameColGroups.has(item.fromCol)) sameColGroups.set(item.fromCol, []);
        sameColGroups.get(item.fromCol).push(item);
      } else {
        if (item.bundled && spine) {
          const tNorm = Math.max(0, Math.min(1, (rTo.cy - spine.topY) / Math.max(1, spine.bottomY - spine.topY)));
          item.spineY = spine.topY + tNorm * (spine.bottomY - spine.topY);
          item.inSide = 'left';
          pushPort(item.to, 'left', 'in', item, item.spineY, item.from);
        } else {
          item.outSide = item.forward ? 'right' : 'left';
          item.inSide = item.forward ? 'left' : 'right';
          pushPort(item.from, item.outSide, 'out', item, rTo.cy, item.to);
          pushPort(item.to, item.inSide, 'in', item, rFrom.cy, item.from);
        }
      }
    });

    const outSlots = new Map();
    const inSlots = new Map();
    portBuckets.forEach((list, bucketKey) => {
      const [nodeId, side] = bucketKey.split(':');
      const rect = rects.get(nodeId);
      list.sort((a, b) => {
        if (Math.abs(a.otherY - b.otherY) > 0.5) return a.otherY - b.otherY;
        return a.otherId.localeCompare(b.otherId);
      });
      const n = list.length;
      const maxSpan = Math.min(12, (NODE_H - 18) / 2);
      const step = n > 1 ? Math.min(8, (2 * maxSpan) / (n - 1)) : 0;
      list.forEach((entry, idx) => {
        let offset = n > 1 ? (idx - (n - 1) / 2) * step : 0;
        if (layout.bundleAgents && agentSet.has(nodeId) && side === 'right' && Math.abs(offset) < 4) {
          offset = rect && rect.row === 0 ? -9 : 9;
        }
        offset = Math.max(-(NODE_H / 2 - 8), Math.min(NODE_H / 2 - 8, offset));
        if (entry.dir === 'out') outSlots.set(entry.item.id, offset);
        else inSlots.set(entry.item.id, offset);
      });
    });

    // Sort same-column brackets shortest-first so inner spans hug closer and never cross outer brackets
    const sameColLane = new Map();
    sameColGroups.forEach(list => {
      list.sort((a, b) => a.colSpan - b.colSpan || a.from.localeCompare(b.from));
      list.forEach((item, idx) => sameColLane.set(item.id, idx));
    });

    const colBands = layout.colBands || [];
    let topRailCount = 0;
    let bottomRailCount = 0;

    function findClearRail(minCol, maxCol, preferY) {
      const bands = [];
      for (let c = minCol + 1; c < maxCol; c++) {
        if (colBands[c]) bands.push(colBands[c]);
      }
      if (!bands.length) return null;

      const globalMinY = Math.min(...bands.map(b => b.minY));
      const globalMaxY = Math.max(...bands.map(b => b.maxY));
      const midBandY = (globalMinY + globalMaxY) / 2;

      let railY;
      let railIdx;
      if (preferY <= midBandY) {
        railIdx = topRailCount;
        railY = Math.max(HEADER_H + 14, globalMinY - 24 - railIdx * 12);
        topRailCount += 1;
      } else {
        railIdx = bottomRailCount;
        railY = globalMaxY + 24 + railIdx * 12;
        bottomRailCount += 1;
      }
      return { y: railY, idx: railIdx, bands };
    }

    // Ensure shorter long-span rails allocate inner slots before longer spans (nested non-crossing rails)
    const railMap = new Map();
    routeItems
      .filter(item => !item.sameCol && Math.abs(item.toCol - item.fromCol) >= 2)
      .sort((a, b) => Math.abs(a.toCol - a.fromCol) - Math.abs(b.toCol - b.fromCol))
      .forEach(item => {
        const rFrom = rects.get(item.from);
        const rTo = rects.get(item.to);
        if (!rFrom || !rTo) return;
        const minCol = Math.min(item.fromCol, item.toCol);
        const maxCol = Math.max(item.fromCol, item.toCol);
        const syEst = item.bundled && spine ? item.spineY : rFrom.cy + (outSlots.get(item.id) || 0);
        const eyEst = rTo.cy + (inSlots.get(item.id) || 0);
        railMap.set(item.id, findClearRail(minCol, maxCol, (syEst + eyEst) / 2));
      });

    routeItems.forEach(item => {
      const rFrom = rects.get(item.from);
      const rTo = rects.get(item.to);
      if (!rFrom || !rTo) return;

      let sx;
      let sy;
      let ex;
      let ey;
      let d;
      let mx;
      let my;

      if (item.sameCol) {
        const laneIdx = sameColLane.get(item.id) || 0;
        sx = rFrom.x + rFrom.w;
        sy = rFrom.cy + (outSlots.get(item.id) || 0);
        ex = rTo.x + rTo.w;
        ey = rTo.cy + (inSlots.get(item.id) || 0);
        const laneX = sx + 18 + laneIdx * 14;
        maxRightX = Math.max(maxRightX, laneX + PAD_X);
        d = roundedPolyline(
          [
            [sx, sy],
            [laneX, sy],
            [laneX, ey],
            [ex, ey],
          ],
          8
        );
        mx = laneX;
        my = (sy + ey) / 2;
      } else {
        const forward = item.forward;
        const reciprocal = !item.bundled && edgeSet.has(`${item.to}->${item.from}`);

        if (item.bundled && spine) {
          sx = spine.x;
          sy = item.spineY;
        } else {
          sx = forward ? rFrom.x + rFrom.w : rFrom.x;
          let outOff = outSlots.get(item.id) || 0;
          if (reciprocal && Math.abs(outOff) < 4) {
            outOff = forward ? -6 : 6;
          }
          sy = rFrom.cy + outOff;
        }

        ex = forward ? rTo.x : rTo.x + rTo.w;
        let inOff = inSlots.get(item.id) || 0;
        if (reciprocal && Math.abs(inOff) < 4) {
          inOff = forward ? -6 : 6;
        }
        ey = rTo.cy + inOff;

        const rail = railMap.get(item.id) || null;

        if (rail) {
          const railY = rail.y;
          const firstBand = rail.bands[0];
          const lastBand = rail.bands[rail.bands.length - 1];
          const turn1X = forward
            ? Math.max(sx + 18, firstBand.x - 24 - rail.idx * 22)
            : Math.min(sx - 18, lastBand.x + lastBand.w + 24 + rail.idx * 22);
          const turn2X = forward
            ? Math.min(ex - 18, lastBand.x + lastBand.w + 24 + rail.idx * 14)
            : Math.max(ex + 18, firstBand.x - 24 - rail.idx * 14);
          d = roundedPolyline(
            [
              [sx, sy],
              [turn1X, sy],
              [turn1X, railY],
              [turn2X, railY],
              [turn2X, ey],
              [ex, ey],
            ],
            10
          );
          mx = (turn1X + turn2X) / 2;
          my = railY;
        } else {
          const dx = ex - sx;
          const c1x = sx + dx * 0.48;
          const c2x = ex - dx * 0.48;
          d = `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ey}, ${ex} ${ey}`;
          mx = (sx + ex) / 2;
          my = (sy + ey) / 2;
        }
      }

      renderedEdges.push({
        ...item,
        sx,
        sy,
        ex,
        ey,
        mx,
        my,
        d,
      });
    });

    return {
      edges: renderedEdges,
      spine,
      width: Math.max(layout.width, maxRightX),
      height: layout.height,
    };
  }

  /**
   * Choose the nearest candidate element in the pressed arrow direction using
   * live DOMRect edge-filtering + perpendicular overlap priority.
   */
  function findSpatialCandidate(currentRect, candidateRects, direction) {
    const tol = 2;
    const axisMatch = rect => {
      if (direction === 'ArrowRight') return rect.left >= currentRect.right - tol;
      if (direction === 'ArrowLeft') return rect.right <= currentRect.left + tol;
      if (direction === 'ArrowDown') return rect.top >= currentRect.bottom - tol;
      if (direction === 'ArrowUp') return rect.bottom <= currentRect.top + tol;
      return false;
    };

    const curCx = (currentRect.left + currentRect.right) / 2;
    const curCy = (currentRect.top + currentRect.bottom) / 2;
    const horiz = direction === 'ArrowLeft' || direction === 'ArrowRight';

    let bestAligned = null;
    let bestFallback = null;

    candidateRects.forEach(item => {
      const r = item.rect;
      if (!axisMatch(r)) return;
      const rCx = (r.left + r.right) / 2;
      const rCy = (r.top + r.bottom) / 2;
      const gap = direction === 'ArrowRight'
        ? Math.max(0, r.left - currentRect.right)
        : direction === 'ArrowLeft'
          ? Math.max(0, currentRect.left - r.right)
          : direction === 'ArrowDown'
            ? Math.max(0, r.top - currentRect.bottom)
            : Math.max(0, currentRect.top - r.bottom);

      const overlap = horiz
        ? Math.min(currentRect.bottom, r.bottom) > Math.max(currentRect.top, r.top)
        : Math.min(currentRect.right, r.right) > Math.max(currentRect.left, r.left);
      const perpOffset = horiz ? Math.abs(rCy - curCy) : Math.abs(rCx - curCx);

      if (overlap) {
        const score = gap * 1000 + perpOffset;
        if (!bestAligned || score < bestAligned.score) {
          bestAligned = { item, score };
        }
      } else {
        const score = gap + 2.5 * perpOffset;
        if (!bestFallback || score < bestFallback.score) {
          bestFallback = { item, score };
        }
      }
    });

    return bestAligned ? bestAligned.item : bestFallback ? bestFallback.item : null;
  }

  const ConstellationEngine = {
    NODE_W,
    NODE_H,
    COL_GAP,
    ROW_GAP,
    PAD_X,
    PAD_Y,
    HEADER_H,
    isDocumentedTier,
    selectVisibleNodes,
    computeLayout,
    routeEdges,
    findSpatialCandidate,
  };

  globalScope.ConstellationEngine = ConstellationEngine;

  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  function bootConstellation() {
    const data = window.ECOSYSTEM_DATA;
    const ecosystem = document.getElementById('ecosystem');
    const section = document.getElementById('constellation');
    const breadcrumb = document.getElementById('constellation-breadcrumb');
    const viewport = section ? section.querySelector('.constellation-viewport') : null;
    const stage = document.getElementById('constellation-stage');
    const canvas = document.getElementById('constellation-canvas');
    const shelf = document.getElementById('constellation-shelf');
    const detail = document.getElementById('constellation-detail');
    const search = document.getElementById('constellation-search');
    const filter = document.getElementById('constellation-filter');
    const expand = document.getElementById('constellation-expand');
    const reset = document.getElementById('constellation-reset');
    const zoomOut = document.getElementById('constellation-zoom-out');
    const zoomIn = document.getElementById('constellation-zoom-in');
    const zoomFit = document.getElementById('constellation-zoom-fit');
    const zoomValue = document.getElementById('constellation-zoom-value');
    const note = section ? section.querySelector('.constellation-note') : null;
    const viewSwitch = document.getElementById('ecosystem-view-switch');

    if (!data || !ecosystem || !section || !viewport || !stage || !canvas || !detail || !search || !filter) {
      return;
    }

    const { nodeMap, clusterMap, groupMap } = buildMaps(data);
    const agentSet = new Set(data.agents || []);

    // Populate category filter once from SSOT groups + drill-down clusters
    (data.groups || []).forEach(group => {
      const option = document.createElement('option');
      option.value = group.id;
      option.textContent = group.label;
      filter.append(option);
    });
    (data.clusters || []).forEach(cluster => {
      if (cluster.id === 'fellowship') return;
      const option = document.createElement('option');
      option.value = cluster.id;
      option.textContent = cluster.label;
      filter.append(option);
    });

    const state = {
      query: '',
      filter: 'all',
      clusterId: null,
      expanded: false,
      selectedId: data.defaultSelection || 'p-023',
      userSelectedView: false,
      currentView: 'graph',
    };

    const camera = {
      x: 0,
      y: 0,
      scale: 1,
      userMoved: false,
      width: 680,
      height: 400,
    };

    let currentScene = {
      edges: [],
      spine: null,
      graphNodes: [],
      shelfNodes: [],
      mode: 'layered',
      cluster: null,
      layout: null,
    };

    const domNodes = new Map();
    const domShelfNodes = new Map();
    const domEdges = [];
    let svgEl = null;
    let spineEl = null;
    let activeEdgeLabel = null;
    let resizeRaf = 0;

    function prefersReducedMotion() {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function applyCamera(animate) {
      if (animate && !prefersReducedMotion()) {
        stage.classList.add('is-animating');
      } else {
        stage.classList.remove('is-animating');
      }
      stage.style.transform = `translate(${Math.round(camera.x * 100) / 100}px, ${Math.round(camera.y * 100) / 100}px) scale(${Math.round(camera.scale * 1000) / 1000})`;
      if (zoomValue) {
        zoomValue.textContent = Math.round(camera.scale * 100) + '%';
      }
    }

    function fitToViewport(animate = false) {
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      if (vw <= 0 || vh <= 0 || !camera.width || !camera.height) return;

      const pad = vw < 520 ? 16 : 28;
      const scale = Math.max(MIN_ZOOM, Math.min(1, (vw - pad) / camera.width, (vh - pad) / camera.height));
      camera.scale = scale;
      camera.x = Math.max(0, (vw - camera.width * scale) / 2);
      camera.y = Math.max(0, (vh - camera.height * scale) / 2);
      camera.userMoved = false;
      applyCamera(animate);
    }

    function clampCamera() {
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      if (vw <= 0 || vh <= 0) return;
      const sw = camera.width * camera.scale;
      const sh = camera.height * camera.scale;
      const margin = 72;
      const minX = Math.min(vw - sw - 16, margin - sw);
      const maxX = Math.max(16, vw - margin);
      const minY = Math.min(vh - sh - 16, margin - sh);
      const maxY = Math.max(16, vh - margin);
      camera.x = Math.max(minX, Math.min(maxX, camera.x));
      camera.y = Math.max(minY, Math.min(maxY, camera.y));
    }

    function zoomBy(delta, anchorX, anchorY) {
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      if (vw <= 0 || vh <= 0) return;
      const nextScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round((camera.scale + delta) * 100) / 100));
      if (nextScale === camera.scale) return;

      const ax = anchorX !== undefined ? anchorX : vw / 2;
      const ay = anchorY !== undefined ? anchorY : vh / 2;
      const worldX = (ax - camera.x) / camera.scale;
      const worldY = (ay - camera.y) / camera.scale;

      camera.scale = nextScale;
      camera.x = ax - worldX * nextScale;
      camera.y = ay - worldY * nextScale;
      camera.userMoved = true;
      clampCamera();
      applyCamera(false);
    }

    function ensureVisibleInViewport(nodeId) {
      const rect = currentScene.layout && currentScene.layout.rects.get(nodeId);
      if (!rect || viewport.clientWidth <= 0) return;
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      const left = camera.x + rect.x * camera.scale;
      const right = camera.x + (rect.x + rect.w) * camera.scale;
      const top = camera.y + rect.y * camera.scale;
      const bottom = camera.y + (rect.y + rect.h) * camera.scale;
      const pad = 20;
      let changed = false;
      if (left < pad) {
        camera.x += pad - left;
        changed = true;
      } else if (right > vw - pad) {
        camera.x -= right - (vw - pad);
        changed = true;
      }
      if (top < pad) {
        camera.y += pad - top;
        changed = true;
      } else if (bottom > vh - pad) {
        camera.y -= bottom - (vh - pad);
        changed = true;
      }
      if (changed) {
        camera.userMoved = true;
        applyCamera(true);
      }
    }

    function renderBreadcrumb() {
      if (!breadcrumb) return;
      breadcrumb.replaceChildren();
      if (!state.clusterId || !clusterMap.has(state.clusterId)) {
        breadcrumb.hidden = true;
        return;
      }
      const cluster = clusterMap.get(state.clusterId);
      breadcrumb.hidden = false;

      const backBtn = document.createElement('button');
      backBtn.type = 'button';
      backBtn.className = 'constellation-crumb-back';
      backBtn.textContent = '← All systems';
      backBtn.addEventListener('click', () => exitCluster());

      const sep = document.createElement('span');
      sep.className = 'constellation-crumb-sep';
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = '/';

      const current = document.createElement('span');
      current.className = 'constellation-crumb-current';
      current.textContent = cluster.label;

      breadcrumb.append(backBtn, sep, current);
    }

    function createSvgEl(tag, attrs = {}) {
      const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
      return el;
    }

    function updateHighlight(focusId, preview) {
      const targetId = focusId || state.selectedId;
      const neighbors = new Set([targetId]);
      const relatedEdges = new Set();

      currentScene.edges.forEach(edge => {
        if (edge.bundled) {
          const matchesMember = edge.members.includes(targetId);
          const matchesTarget = edge.to === targetId;
          if (matchesMember || matchesTarget) {
            relatedEdges.add(edge.id);
            edge.members.forEach(m => neighbors.add(m));
            neighbors.add(edge.to);
          }
        } else if (edge.from === targetId || edge.to === targetId) {
          relatedEdges.add(edge.id);
          neighbors.add(edge.from);
          neighbors.add(edge.to);
        }
      });

      let spineActive = false;
      domEdges.forEach(({ el, edge }) => {
        const active = relatedEdges.has(edge.id);
        el.classList.toggle('is-active', active);
        const markerTone = active ? 'active' : (isDocumentedTier(edge.tier) || edge.tier === 'TIMELINE') ? 'documented' : 'muted';
        el.setAttribute('marker-end', `url(#constellation-arrow-${markerTone})`);
        if (active && edge.bundled) spineActive = true;
      });

      if (spineEl) {
        spineEl.classList.toggle('is-active', spineActive || agentSet.has(targetId));
      }

      domNodes.forEach((btn, id) => {
        btn.classList.toggle('is-related', preview && neighbors.has(id) && id !== state.selectedId);
        btn.classList.toggle('is-dimmed', preview && !neighbors.has(id));
      });

      // Show single collision-safe midpoint pill for edge connecting selection <-> hovered/focused neighbor
      if (activeEdgeLabel) {
        let match = null;
        if (preview && focusId && focusId !== state.selectedId) {
          match = currentScene.edges.find(edge => {
            if (edge.bundled) {
              return (edge.members.includes(state.selectedId) && edge.to === focusId)
                || (edge.members.includes(focusId) && edge.to === state.selectedId);
            }
            return (edge.from === state.selectedId && edge.to === focusId)
              || (edge.to === state.selectedId && edge.from === focusId);
          }) || currentScene.edges.find(edge => edge.from === focusId || edge.to === focusId);
        }
        if (match && match.label) {
          const clampedX = Math.max(96, Math.min(camera.width - 96, match.mx));
          const clampedY = Math.max(28, Math.min(camera.height - 20, match.my - 8));
          activeEdgeLabel.textContent = match.label;
          activeEdgeLabel.style.left = clampedX + 'px';
          activeEdgeLabel.style.top = clampedY + 'px';
          activeEdgeLabel.classList.add('is-visible');
        } else {
          activeEdgeLabel.classList.remove('is-visible');
        }
      }
    }

    function updateDetail() {
      const node = nodeMap.get(state.selectedId);
      detail.replaceChildren();
      if (!node) {
        const empty = document.createElement('p');
        empty.textContent = 'No matching project selected.';
        detail.append(empty);
        return;
      }

      const eyebrow = document.createElement('p');
      eyebrow.className = 'constellation-eyebrow';
      const agentIdx = (data.agents || []).indexOf(node.id);
      if (agentIdx === 0) eyebrow.textContent = 'PRIMARY AGENT';
      else if (agentIdx === 1) eyebrow.textContent = 'SECONDARY AGENT';
      else if (agentIdx > 1) eyebrow.textContent = 'SUPPORTING AGENT';
      else if (node.kind === 'cluster') eyebrow.textContent = 'CLUSTER GROUP';
      else if (node.kind === 'service') eyebrow.textContent = 'SYSTEM / TOOL';
      else eyebrow.textContent = (groupMap.get(node.group)?.label || 'PROJECT').toUpperCase();

      const title = document.createElement('h3');
      title.textContent = node.label;

      const desc = document.createElement('p');
      desc.textContent = node.description;

      const heading = document.createElement('h4');
      heading.textContent = node.kind === 'cluster' ? 'Cluster & connections' : 'Connections';

      const list = document.createElement('ul');
      list.className = 'constellation-connections-list';

      const allEdges = (data.edges || []).filter(e => e.from === node.id || e.to === node.id);
      allEdges.forEach(edge => {
        const otherId = edge.from === node.id ? edge.to : edge.from;
        const other = nodeMap.get(otherId);
        if (!other) return;

        const item = document.createElement('li');
        const rowHead = document.createElement('div');
        rowHead.className = 'constellation-conn-head';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = `${edge.from === node.id ? '→ ' : '← '}${other.label}`;
        btn.addEventListener('click', () => jumpToNode(other.id));

        const badge = document.createElement('span');
        badge.className = isDocumentedTier(edge.tier)
          ? 'constellation-tier-badge constellation-tier-badge--verified'
          : 'constellation-tier-badge constellation-tier-badge--workflow';
        badge.textContent = isDocumentedTier(edge.tier) ? 'Verified repo' : 'Workflow';

        rowHead.append(btn, badge);

        const explanation = document.createElement('span');
        explanation.className = 'constellation-conn-desc';
        explanation.textContent = edge.description;

        item.append(rowHead, explanation);

        if (edge.source && edge.source_commit) {
          const source = document.createElement('a');
          const repo = edge.source.split(':')[0].split('/').slice(0, 2).join('/');
          source.href = 'https://github.com/' + repo + '/tree/' + edge.source_commit;
          source.target = '_blank';
          source.rel = 'noopener noreferrer';
          source.textContent = 'View source ↗';
          item.append(source);
        }
        list.append(item);
      });

      if (!list.children.length) {
        const item = document.createElement('li');
        item.textContent = 'No documented connections in this map yet.';
        list.append(item);
      }

      detail.append(eyebrow, title, desc, heading, list);

      if (node.kind === 'cluster' && clusterMap.has(node.id)) {
        const cluster = clusterMap.get(node.id);
        const drillBtn = document.createElement('button');
        drillBtn.type = 'button';
        drillBtn.className = 'constellation-link constellation-link--primary';
        drillBtn.textContent = `Open ${cluster.label.toLowerCase()} →`;
        drillBtn.addEventListener('click', () => enterCluster(cluster.id));
        detail.append(drillBtn);
      }

      const cardEl = document.getElementById(node.id);
      if (node.kind === 'project' && cardEl) {
        const link = document.createElement('a');
        link.className = 'constellation-link';
        link.href = '#' + node.id;
        link.textContent = 'Explore project →';
        link.addEventListener('click', () => {
          document.querySelector('#projectsFilterBar [data-filter="all"]')?.click();
          cardEl.open = true;
        });
        detail.append(link);
      }
    }

    function selectNode(id, opts = {}) {
      if (!nodeMap.has(id)) return;
      state.selectedId = id;

      domNodes.forEach((btn, nodeId) => {
        const isSel = nodeId === id;
        btn.setAttribute('aria-pressed', String(isSel));
        btn.setAttribute('tabindex', isSel ? '0' : '-1');
        btn.classList.toggle('is-selected', isSel);
      });
      domShelfNodes.forEach((btn, nodeId) => {
        const isSel = nodeId === id;
        btn.setAttribute('aria-pressed', String(isSel));
        btn.classList.toggle('is-selected', isSel);
      });

      updateHighlight(id, false);
      updateDetail();

      if (opts.focus && domNodes.has(id)) {
        domNodes.get(id).focus({ preventScroll: true });
        ensureVisibleInViewport(id);
      }
      if (opts.emit !== false) {
        window.dispatchEvent(new CustomEvent('ecosystem-selection', { detail: { id, source: 'graph' } }));
      }
    }

    function enterCluster(clusterId) {
      if (!clusterMap.has(clusterId)) return;
      state.clusterId = clusterId;
      state.query = '';
      search.value = '';
      filter.value = clusterMap.get(clusterId).id === 'fellowship' ? 'fellowship'
        : filter.querySelector(`option[value="${clusterId}"]`) ? clusterId : 'all';
      const cluster = clusterMap.get(clusterId);
      state.selectedId = cluster.members[0] || clusterId;
      rebuildStage(true);
    }

    function exitCluster() {
      const prevClusterId = state.clusterId;
      state.clusterId = null;
      filter.value = 'all';
      state.filter = 'all';
      if (prevClusterId && nodeMap.has(prevClusterId)) {
        state.selectedId = prevClusterId;
      }
      rebuildStage(true);
    }

    function jumpToNode(id, opts = {}) {
      if (!nodeMap.has(id)) return;
      if (domNodes.has(id) || domShelfNodes.has(id)) {
        selectNode(id, { focus: opts.focus ?? domNodes.has(id), emit: opts.emit });
        return;
      }
      // Locate cluster or expand top-level map cleanly
      const ownerCluster = (data.clusters || []).find(c => c.members.includes(id));
      if (state.clusterId && ownerCluster && ownerCluster.id === state.clusterId) {
        state.query = '';
        search.value = '';
        state.selectedId = id;
        rebuildStage(true);
        return;
      }
      if (ownerCluster && !(data.featured || []).includes(id) && !state.expanded) {
        enterCluster(ownerCluster.id);
        selectNode(id, { focus: opts.focus ?? domNodes.has(id), emit: opts.emit });
        return;
      }
      state.clusterId = null;
      state.filter = 'all';
      filter.value = 'all';
      state.query = '';
      search.value = '';
      state.expanded = true;
      if (expand) {
        expand.setAttribute('aria-pressed', 'true');
        expand.textContent = 'Show connected map';
      }
      state.selectedId = id;
      rebuildStage(true);
    }

    function rebuildStage(autoFit = false) {
      renderBreadcrumb();
      const sel = selectVisibleNodes(data, state);
      const layout = computeLayout(data, sel.graphNodes, sel.mode, sel.cluster);
      const visibleIds = new Set(sel.graphNodes.map(n => n.id));
      const routed = routeEdges(data, layout, visibleIds, sel.mode);

      currentScene = {
        ...sel,
        layout,
        edges: routed.edges,
        spine: routed.spine,
      };

      const allRenderIds = new Set([
        ...sel.graphNodes.map(n => n.id),
        ...sel.shelfNodes.map(n => n.id),
      ]);
      if (allRenderIds.size && !allRenderIds.has(state.selectedId)) {
        state.selectedId = sel.graphNodes[0]?.id || sel.shelfNodes[0]?.id;
      }

      camera.width = routed.width;
      camera.height = routed.height;

      if (note) {
        note.textContent = sel.mode === 'timeline'
          ? 'Lines follow the weekly coursework sequence to the BiasAperture capstone. Drag to pan or click any step.'
          : 'Solid lines show commit-verified integrations; dashed lines show workflow context. Click any cluster to drill down.';
      }

      viewport.classList.toggle('is-compact', sel.graphNodes.length === 0);

      canvas.replaceChildren();
      domNodes.clear();
      domEdges.length = 0;
      spineEl = null;

      canvas.style.width = routed.width + 'px';
      canvas.style.height = routed.height + 'px';
      stage.style.width = routed.width + 'px';
      stage.style.height = routed.height + 'px';

      if (!sel.graphNodes.length) {
        const empty = document.createElement('p');
        empty.className = 'constellation-empty';
        empty.textContent = sel.shelfNodes.length
          ? `No direct links in this view — ${sel.shelfNodes.length} matching project${sel.shelfNodes.length === 1 ? '' : 's'} shown below.`
          : 'No matching projects found for this search.';
        canvas.append(empty);
      } else {
        // 1. Pixel-coordinate SVG layer (NO preserveAspectRatio="none")
        svgEl = createSvgEl('svg', {
          viewBox: `0 0 ${routed.width} ${routed.height}`,
          width: routed.width,
          height: routed.height,
          'aria-hidden': 'true',
        });
        const defs = createSvgEl('defs');
        const markerSpecs = [
          ['muted', 'var(--muted)'],
          ['documented', 'var(--text)'],
          ['active', 'var(--accent)'],
        ];
        markerSpecs.forEach(([tone, color]) => {
          const marker = createSvgEl('marker', {
            id: `constellation-arrow-${tone}`,
            viewBox: '0 0 10 10',
            refX: '8.5',
            refY: '5',
            markerWidth: '8',
            markerHeight: '8',
            markerUnits: 'userSpaceOnUse',
            orient: 'auto',
          });
          const chevron = createSvgEl('path', {
            d: 'M 2 2 L 8 5 L 2 8',
            fill: 'none',
            stroke: color,
            'stroke-width': '1.6',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          });
          marker.append(chevron);
          defs.append(marker);
        });
        svgEl.append(defs);

        if (routed.spine) {
          spineEl = createSvgEl('path', {
            d: routed.spine.d,
            class: 'constellation-spine',
          });
          svgEl.append(spineEl);
        }

        routed.edges.forEach(edge => {
          const isDoc = isDocumentedTier(edge.tier);
          const isTl = edge.tier === 'TIMELINE';
          const cls = [
            'constellation-edge',
            isTl ? 'constellation-edge--timeline' : isDoc ? 'constellation-edge--documented' : 'constellation-edge--workflow',
          ].join(' ');
          const path = createSvgEl('path', {
            d: edge.d,
            class: cls,
            'data-edge-id': edge.id,
          });
          svgEl.append(path);
          domEdges.push({ el: path, edge });
        });
        canvas.append(svgEl);

        // 2. Column headers
        layout.columnHeaders.forEach(hdr => {
          const span = document.createElement('span');
          span.className = 'constellation-col-label';
          span.style.left = hdr.x + 'px';
          span.style.top = (hdr.y - 10) + 'px';
          span.textContent = hdr.label;
          canvas.append(span);
        });

        // 3. Collision-safe hover edge pill
        activeEdgeLabel = document.createElement('span');
        activeEdgeLabel.className = 'constellation-edge-label';
        activeEdgeLabel.setAttribute('aria-hidden', 'true');
        canvas.append(activeEdgeLabel);

        // 4. Pixel-positioned DOM node buttons
        sel.graphNodes.forEach((node, idx) => {
          const rect = layout.rects.get(node.id);
          if (!rect) return;
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'constellation-node';
          if (node.status === 'active') btn.classList.add('constellation-node--active');
          if (node.status === 'archived') btn.classList.add('constellation-node--archived');
          if (agentSet.has(node.id)) btn.classList.add('constellation-node--center');
          if (node.id === (data.agents || [])[0]) btn.classList.add('constellation-node--primary');
          if (node.kind === 'cluster') btn.classList.add('constellation-node--cluster');

          btn.dataset.category = node.group || 'orchestration';
          btn.dataset.project = node.id;
          btn.style.left = rect.x + 'px';
          btn.style.top = rect.y + 'px';

          const isSelected = node.id === state.selectedId || (!allRenderIds.has(state.selectedId) && idx === 0);
          btn.setAttribute('aria-pressed', String(isSelected));
          btn.setAttribute('tabindex', isSelected ? '0' : '-1');

          const dot = document.createElement('span');
          dot.className = 'constellation-node-dot';
          dot.setAttribute('aria-hidden', 'true');

          const labelSpan = document.createElement('span');
          labelSpan.className = 'constellation-node-label';
          labelSpan.textContent = node.label;

          btn.append(dot, labelSpan);

          if (node.id === (data.agents || [])[0]) {
            const leadBadge = document.createElement('span');
            leadBadge.className = 'constellation-node-badge';
            leadBadge.textContent = 'Main';
            btn.append(leadBadge);
          }

          if (node.kind === 'cluster') {
            const chev = document.createElement('span');
            chev.className = 'constellation-node-chevron';
            chev.setAttribute('aria-hidden', 'true');
            chev.textContent = '›';
            btn.append(chev);
            btn.setAttribute('aria-label', `${node.label} (cluster — double-click or open to drill down)`);
          } else if (node.status === 'active') {
            btn.setAttribute('aria-label', `${node.label} — active project`);
          }

          btn.addEventListener('pointerenter', ev => {
            if (ev.pointerType === 'mouse') updateHighlight(node.id, true);
          });
          btn.addEventListener('pointerleave', ev => {
            if (ev.pointerType === 'mouse') {
              const focused = document.activeElement?.classList?.contains('constellation-node')
                ? document.activeElement.dataset.project
                : null;
              updateHighlight(focused || state.selectedId, Boolean(focused));
            }
          });
          btn.addEventListener('focus', () => updateHighlight(node.id, true));
          btn.addEventListener('blur', () => updateHighlight(state.selectedId, false));
          btn.addEventListener('click', ev => {
            // In-place selection: zero DOM teardown! Double click (or second keyboard Enter) drills into cluster.
            const wasSelected = state.selectedId === node.id;
            selectNode(node.id, { focus: true });
            if (wasSelected && ev.detail === 0 && node.kind === 'cluster' && clusterMap.has(node.id)) {
              enterCluster(node.id);
            }
          });
          btn.addEventListener('dblclick', () => {
            if (node.kind === 'cluster' && clusterMap.has(node.id)) {
              enterCluster(node.id);
            }
          });

          domNodes.set(node.id, btn);
          canvas.append(btn);
        });
      }

      // 5. Unconnected projects shelf
      if (shelf) {
        shelf.replaceChildren();
        domShelfNodes.clear();
        if (sel.shelfNodes.length) {
          shelf.hidden = false;
          const hdr = document.createElement('div');
          hdr.className = 'constellation-shelf-header';
          const h3 = document.createElement('h3');
          h3.textContent = `Unconnected projects (${sel.shelfNodes.length})`;
          const sub = document.createElement('p');
          sub.textContent = 'Projects in this filter without cross-project edges in the current view.';
          hdr.append(h3, sub);

          const grid = document.createElement('div');
          grid.className = 'constellation-shelf-grid';
          sel.shelfNodes.forEach(node => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'constellation-shelf-card';
            if (node.status === 'active') btn.classList.add('constellation-node--active');
            btn.dataset.category = node.group || 'applications';
            btn.dataset.project = node.id;
            btn.setAttribute('aria-pressed', String(node.id === state.selectedId));
            btn.textContent = node.label;
            btn.addEventListener('click', () => selectNode(node.id));
            domShelfNodes.set(node.id, btn);
            grid.append(btn);
          });
          shelf.append(hdr, grid);
        } else {
          shelf.hidden = true;
        }
      }

      // Sync highlight + detail without destroying DOM
      updateHighlight(state.selectedId, false);
      updateDetail();

      if (autoFit) {
        fitToViewport(false);
      } else {
        clampCamera();
        applyCamera(false);
      }
    }

    // Spatial arrow-key navigation inside the graph container
    canvas.addEventListener('keydown', event => {
      const dirs = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (!dirs.includes(event.key)) {
        if (event.key === 'Escape' && state.clusterId) {
          event.preventDefault();
          exitCluster();
        }
        return;
      }
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.defaultPrevented) return;
      const focused = event.composedPath()[0];
      if (!focused || !focused.classList || !focused.classList.contains('constellation-node')) return;

      const curRect = focused.getBoundingClientRect();
      const candidates = [];
      domNodes.forEach(btn => {
        if (btn === focused) return;
        if (typeof btn.checkVisibility === 'function' && !btn.checkVisibility()) return;
        candidates.push({ btn, rect: btn.getBoundingClientRect() });
      });

      const next = findSpatialCandidate(curRect, candidates, event.key);
      if (!next) return; // Allow native browser scrolling at boundaries

      event.preventDefault();
      domNodes.forEach(btn => btn.setAttribute('tabindex', btn === next.btn ? '0' : '-1'));
      next.btn.focus({ preventScroll: true });
      ensureVisibleInViewport(next.btn.dataset.project);
    });

    // Drag-pan via Pointer Events (supports mouse + touch without hijacking node clicks)
    let pan = null;
    viewport.addEventListener('pointerdown', event => {
      if (event.button && event.button !== 0) return;
      if (event.target.closest('button')) return;
      pan = {
        id: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        origX: camera.x,
        origY: camera.y,
      };
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add('is-panning');
      stage.classList.remove('is-animating');
    });

    viewport.addEventListener('pointermove', event => {
      if (!pan || event.pointerId !== pan.id) return;
      camera.x = pan.origX + (event.clientX - pan.startX);
      camera.y = pan.origY + (event.clientY - pan.startY);
      camera.userMoved = true;
      clampCamera();
      applyCamera(false);
    });

    const endPan = event => {
      if (!pan || event.pointerId !== pan.id) return;
      pan = null;
      viewport.classList.remove('is-panning');
    };
    viewport.addEventListener('pointerup', endPan);
    viewport.addEventListener('pointercancel', endPan);
    viewport.addEventListener('lostpointercapture', endPan);

    // Ctrl/Cmd + Wheel zoom anchored at pointer; normal scrolling never intercepted
    viewport.addEventListener('wheel', event => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const box = viewport.getBoundingClientRect();
      const delta = event.deltaY < 0 ? ZOOM_STEP / 2 : -ZOOM_STEP / 2;
      zoomBy(delta, event.clientX - box.left, event.clientY - box.top);
    }, { passive: false });

    // Toolbar controls
    search.addEventListener('input', () => {
      state.query = search.value;
      rebuildStage(true);
    });

    filter.addEventListener('change', () => {
      const val = filter.value;
      state.query = '';
      search.value = '';
      if (clusterMap.has(val)) {
        enterCluster(val);
        return;
      }
      state.clusterId = null;
      state.filter = val;
      rebuildStage(true);
    });

    if (expand) {
      expand.addEventListener('click', () => {
        state.clusterId = null;
        state.expanded = !state.expanded;
        expand.setAttribute('aria-pressed', String(state.expanded));
        expand.textContent = state.expanded ? 'Show connected map' : 'Show all projects';
        rebuildStage(true);
      });
    }

    if (reset) {
      reset.addEventListener('click', () => {
        state.query = '';
        state.filter = 'all';
        state.clusterId = null;
        state.expanded = false;
        state.selectedId = data.defaultSelection || 'p-023';
        search.value = '';
        filter.value = 'all';
        if (expand) {
          expand.setAttribute('aria-pressed', 'false');
          expand.textContent = 'Show all projects';
        }
        rebuildStage(true);
      });
    }

    if (zoomIn) zoomIn.addEventListener('click', () => zoomBy(ZOOM_STEP));
    if (zoomOut) zoomOut.addEventListener('click', () => zoomBy(-ZOOM_STEP));
    if (zoomFit) zoomFit.addEventListener('click', () => fitToViewport(true));

    // Adaptive view switcher: desktop = Graph, mobile (<= 768px) = Tree unless user chose
    function setView(view, fromUser = false) {
      if (fromUser) state.userSelectedView = true;
      state.currentView = view;
      const graphVisible = view === 'graph';
      section.hidden = !graphVisible;
      ecosystem.hidden = graphVisible;
      if (viewSwitch) {
        viewSwitch.querySelectorAll('[data-ecosystem-view]').forEach(btn => {
          const active = btn.dataset.ecosystemView === view;
          btn.classList.toggle('active', active);
          btn.setAttribute('aria-pressed', String(active));
        });
      }
      if (graphVisible) {
        if (state.selectedId && !domNodes.has(state.selectedId) && !domShelfNodes.has(state.selectedId)) {
          jumpToNode(state.selectedId);
        }
        requestAnimationFrame(() => fitToViewport(false));
      } else {
        window.dispatchEvent(new CustomEvent('ecosystem-selection', { detail: { id: state.selectedId, source: 'graph' } }));
      }
    }

    if (viewSwitch) {
      const buttons = viewSwitch.querySelectorAll('[data-ecosystem-view]');
      buttons.forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.ecosystemView, true)));
      viewSwitch.hidden = false;

      const mobileMq = window.matchMedia('(max-width: 768px)');
      const syncResponsiveDefault = () => {
        if (!state.userSelectedView) {
          setView(mobileMq.matches ? 'tree' : 'graph', false);
        }
      };
      if (mobileMq.addEventListener) {
        mobileMq.addEventListener('change', syncResponsiveDefault);
      }

      window.addEventListener('ecosystem-selection', event => {
        if (event.detail?.source !== 'tree' || ecosystem.hidden) return;
        const targetId = event.detail.id;
        if (!nodeMap.has(targetId) || state.selectedId === targetId) return;
        state.selectedId = targetId;
        if (!section.hidden) {
          jumpToNode(targetId, { emit: false, focus: false });
        }
      });

      rebuildStage(true);
      setView(mobileMq.matches ? 'tree' : 'graph', false);
    } else {
      section.hidden = false;
      rebuildStage(true);
    }

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => {
        if (section.hidden || camera.userMoved) return;
        cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() => fitToViewport(false));
      });
      ro.observe(viewport);
    }

    const parentDisclosure = section.closest('details');
    if (parentDisclosure) {
      parentDisclosure.addEventListener('toggle', () => {
        if (parentDisclosure.open && !section.hidden) {
          requestAnimationFrame(() => fitToViewport(false));
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootConstellation);
  } else {
    bootConstellation();
  }
})(typeof globalThis !== 'undefined' ? globalThis : window);
