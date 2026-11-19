(function () {
  'use strict';
  const ecosystem = document.getElementById('ecosystem');
  const canvas = document.getElementById('constellation-canvas');
  const detail = document.getElementById('constellation-detail');
  const search = document.getElementById('constellation-search');
  const filter = document.getElementById('constellation-filter');
  const expand = document.getElementById('constellation-expand');
  const zoomValue = document.getElementById('constellation-zoom-value');
  const viewport = document.querySelector('.constellation-viewport');
  if (!ecosystem || !canvas || !detail || !search || !filter) return;

  let connections;
  try { connections = JSON.parse(ecosystem.dataset.connections || '[]'); }
  catch (error) { console.error('Could not load project connections', error); return; }
  connections = connections.map(edge => edge.from === 'p-040' && edge.to === 'p-023' ? { ...edge, from: 'p-023', to: 'p-040', label: 'Conversation workflow', description: 'Work directed through Claude Desktop can use Fleet Orchestrator. Fleet also documents a Claude Desktop adapter.' } : edge);
  connections.push({ from: 'antigravity', to: 'p-040', label: 'Fleet handoff', description: 'Antigravity can hand off tasks to Fleet Orchestrator through its MCP integration.' });
  const centralAgents = ['p-023', 'antigravity', 'codex'];
  const workflowTargets = [
    ['p-040', 'Delegate work', 'Hands off tasks to Fleet Orchestrator when additional execution capacity is needed.'],
    ['colab', 'Accelerate compute', 'Uses Colab for workloads requiring cloud compute.'],
    ['github-workflow', 'Repository workflow', 'Uses the GitHub workflow for issues, branches, verification, and delivery.'],
    ['p-031', 'Knowledge tools', 'Uses Super-NLM for notebook knowledge and synthesis.'],
    ['p-041', 'Shared agent context', 'Runs Agent-Customization-Sync from an agentic editor to synchronize skills, agent instructions, and other context across editors.'],
    ['google-oauth', 'Google services', 'Accesses authorized Google services through OAuth.'],
    ['brainstorm', 'Retain ideas', 'Keeps skills and ideas in the Brainstorm repository.'],
  ];
  centralAgents.forEach(from => workflowTargets.forEach(([to, label, description]) => {
    if (!connections.some(edge => edge.from === from && edge.to === to)) connections.push({ from, to, label, description, evidence: 'USER_DESCRIBED' });
  }));
  [
    ['colab', 'Cloud execution', 'Fleet includes Colab tooling for cloud compute workflows.'],
    ['github-workflow', 'Repository workflows', 'Fleet coordinates repository work and uses GitHub workflows for verification and delivery.'],
    ['brainstorm', 'Research workloads', 'Fleet documents task workflows targeting Brainstorm research and simulations.'],
  ].forEach(([to, label, description]) => connections.push({ from: 'p-040', to, label, description, evidence: 'DOCUMENTED_INTEGRATION' }));
  connections.push({ from: 'p-041', to: 'brainstorm', label: 'Shared source of truth', description: 'Maintains the shared source of truth locally and in Brainstorm while synchronizing agent context across editors.', evidence: 'USER_DESCRIBED' });
  [
    ['brainstorm', 'p-025', 'Planning and thinking log', 'Brainstorm is a gateway for planning and working on BiasAperture.'],
    ['brainstorm', 'p-018', 'Planning and thinking log', 'Brainstorm is a gateway for planning and working on SPARK.'],
    ['brainstorm', 'mcp-group', 'Planning and thinking log', 'Brainstorm is a gateway for planning and working on MCP tools.'],
    ['fellowship', 'p-025', 'Fellowship capstone', 'BiasAperture is linked to the Fusemachines AI fellowship.'],
    ['college', 'p-018', 'College project', 'SPARK is a college project.'],
    ['college', 'p-001', 'College project', 'GCSBR is a college project.'],
    ['p-001', 'p-007', 'Related work', 'GCSBR and Edge AI Stability Detection are linked projects.'],
    ['p-012', 'p-018', 'Deferred in favor of SPARK', 'PrakopNet was researched and reached proposal stage, but importing its radio transmitters was unfeasible; the idea was deferred in favor of SPARK.'],
  ].forEach(([from, to, label, description]) => connections.push({ from, to, label, description, evidence: 'USER_DESCRIBED' }));
  ['drive', 'calendar', 'classroom'].forEach(to => connections.push({ from: 'google-oauth', to, label: 'Authorized access', description: 'Google OAuth provides authorized access to this service.', evidence: 'USER_DESCRIBED' }));
  const services = {
    antigravity: ['Antigravity', 'A central conversation and development agent in my ecosystem.'],
    codex: ['Codex', 'A central conversation and coding agent in my ecosystem.'],
    colab: ['Colab', 'Cloud compute for training, batch processing, and workloads beyond local capacity.'],
    'github-workflow': ['GitHub workflow', 'Issue tracking, branches, verification, pull requests, and delivery across repositories.'],
    'google-oauth': ['Google OAuth', 'Authorized access to Drive, Calendar, Classroom, and other Google services.'],
    brainstorm: ['Brainstorm', 'A thinking log and planning gateway for newer projects, skills, and ideas.'],
    drive: ['Google Drive', 'Documents, notebooks, and shared artifacts accessed through authorized Google tools.'],
    calendar: ['Google Calendar', 'Scheduling and event context through authorized Google tools.'],
    classroom: ['Google Classroom', 'Coursework and academic context through authorized Google tools.'],
    fellowship: ['Fusemachines fellowship', 'A collection of AI fellowship projects and coursework, grouped together for exploration.'],
    'mcp-group': ['MCP tools', 'A group of Model Context Protocol tools, each available for individual exploration.'],
    college: ['College projects', 'SPARK and GCSBR are college projects, grouped for exploration.'],
  };
  const positions = {
    'p-023': [14, 32], antigravity: [14, 50], codex: [14, 68],
    'p-040': [47, 10], colab: [47, 30], 'github-workflow': [47, 50],
    'p-031': [47, 70], 'google-oauth': [80, 90], fellowship: [80, 50], 'mcp-group': [80, 70],
    'p-041': [47, 90], brainstorm: [80, 10], 'p-025': [72, 42], college: [80, 30], 'p-018': [72, 55],
    'p-012': [88, 68], 'p-001': [72, 81], 'p-007': [88, 81], 'p-026': [72, 94],
    drive: [88, 15], calendar: [88, 28], classroom: [88, 41],
  };
  const projects = Object.entries(positions).map(([id, position]) => {
    if (services[id]) return { id, position, name: services[id][0], category: id === 'fellowship' ? 'fellowship' : 'orchestration', description: services[id][1], search: services[id].join(' ') };
    const item = ecosystem.querySelector('[data-project="' + id + '"]');
    const card = document.getElementById(id);
    if (!item || !card) return null;
    return { id, position, name: item.querySelector('.ecosystem-node span').textContent.trim(),
      category: item.closest('[data-group]').dataset.group, active: /in progress|active research/i.test(card.querySelector('.project-status')?.textContent || '') || card.classList.contains('project-card--in-progress'),
      description: id === 'p-023' ? 'One of my primary interfaces for conversations and AI-assisted work, supported by multi-profile and service-provisioning tooling.' : id === 'p-041' ? 'Synchronizes skills, agent instructions, and shared context across agentic editors from a locally maintained source of truth and Brainstorm.' : id === 'p-012' ? 'Archived after substantial research and a completed proposal; radio transmitter imports were unfeasible, and the idea was deferred in favor of SPARK.' : (card.querySelector('.project-story p:nth-child(2)')?.textContent.replace(/^What I built\s*/, '').trim() || ''),
      search: item.dataset.search || '' };
  }).filter(Boolean);
  ecosystem.querySelectorAll('.ecosystem-branch').forEach(branch => {
    const option = document.createElement('option');
    option.value = branch.dataset.group;
    option.textContent = branch.querySelector('summary span').textContent.trim();
    filter.append(option);
    branch.querySelectorAll('[data-project]').forEach(item => {
      const id = item.dataset.project;
      const card = document.getElementById(id);
      if (!card || projects.some(project => project.id === id)) return;
      projects.push({ id, name: item.querySelector('.ecosystem-node span').textContent.trim(), category: branch.dataset.group, active: /in progress|active research/i.test(card.querySelector('.project-status')?.textContent || '') || card.classList.contains('project-card--in-progress'),
        description: card.querySelector('.project-story p:nth-child(2)')?.textContent.replace(/^What I built\s*/, '').trim() || 'Explore the project card for its work and context.', search: item.dataset.search || '' });
    });
  });
  const mcpIds = new Set(['p-029', 'p-033', 'p-035', 'p-036', 'p-037', 'p-038']);
  const collegeIds = new Set(['p-018', 'p-001']);
  const mcpOption = document.createElement('option'); mcpOption.value = 'mcp-tools'; mcpOption.textContent = 'MCP tools'; filter.append(mcpOption);
  const collegeOption = document.createElement('option'); collegeOption.value = 'college-projects'; collegeOption.textContent = 'College projects'; filter.append(collegeOption);
  let expanded = false;
  let zoom = 1;
  let fitOnRender = false;
  const featured = new Set([...centralAgents, 'p-040', 'colab', 'github-workflow', 'p-031', 'p-041', 'brainstorm', 'college', 'fellowship', 'mcp-group', 'google-oauth']);
  let selected = projects.find(project => project.id === 'p-023') || projects[0];
  if (!selected) return;

  // Unit-weight Dijkstra over visible, undirected relationships. Distance is
  // used for placement only; the original edge direction remains unchanged.
  function layoutByDistance(visible, bundleAgents) {
    const key = id => bundleAgents && centralAgents.includes(id) ? '__agents' : id;
    const keys = [...new Set(visible.map(project => key(project.id)))];
    const adjacency = new Map(keys.map(id => [id, new Set()]));
    connections.forEach(edge => {
      const a = key(edge.from), b = key(edge.to);
      if (a !== b && adjacency.has(a) && adjacency.has(b)) { adjacency.get(a).add(b); adjacency.get(b).add(a); }
    });
    const distance = new Map(keys.map(id => [id, Infinity]));
    // Keep the shared agent group as the visual anchor as selection changes.
    distance.set(bundleAgents ? '__agents' : key(selected.id), 0);
    const pending = new Set(keys);
    while (pending.size) {
      let current = null;
      for (const id of pending) if (current === null || distance.get(id) < distance.get(current)) current = id;
      if (distance.get(current) === Infinity) break;
      pending.delete(current);
      adjacency.get(current).forEach(next => { if (pending.has(next)) distance.set(next, Math.min(distance.get(next), distance.get(current) + 1)); });
    }
    const finite = [...distance.values()].filter(Number.isFinite);
    const unreachable = Math.max(0, ...finite) + 1;
    const layers = new Map();
    keys.forEach(id => { const level = Number.isFinite(distance.get(id)) ? distance.get(id) : unreachable; if (!layers.has(level)) layers.set(level, []); layers.get(level).push(id); });
    const levels = [...layers.keys()].sort((a, b) => a - b);
    const slots = list => list.reduce((sum, id) => sum + (id === '__agents' ? centralAgents.length : 1), 0);
    const height = Math.max(520, ...[...layers.values()].map(list => slots(list) * 80));
    const width = Math.max(760, 285 * Math.max(1, levels.length - 1) + 220);
    const locations = new Map();
    levels.forEach((level, column) => {
      const entries = layers.get(level); const total = slots(entries); let slot = 0;
      const x = levels.length === 1 ? 50 : 12 + 76 * column / (levels.length - 1);
      entries.forEach(id => {
        const members = id === '__agents' ? centralAgents.filter(agent => visible.some(project => project.id === agent)) : [id];
        members.forEach(member => { locations.set(member, [x, 100 * (++slot - .5) / total]); });
      });
    });
    return { locations, height, width };
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const showAll = expanded || !!query || filter.value !== 'all';
    const visible = projects.filter(project => (showAll || featured.has(project.id)) && (project.category !== 'fellowship' || project.id === 'fellowship' || project.id === 'p-026' || !!query || filter.value === 'fellowship') && (project.id !== 'p-026' || filter.value !== 'fellowship') && (!mcpIds.has(project.id) || !!query || filter.value === 'mcp-tools') && (!collegeIds.has(project.id) || !!query || filter.value === 'college-projects') && (filter.value === 'all' || project.category === filter.value || (filter.value === 'fellowship' && project.id === 'p-025') || (filter.value === 'mcp-tools' && (mcpIds.has(project.id) || project.id === 'mcp-group')) || (filter.value === 'college-projects' && (collegeIds.has(project.id) || project.id === 'college'))) && (project.name + ' ' + project.search).toLowerCase().includes(query));
    const timeline = filter.value === 'fellowship';
    const weekOf = project => project.id === 'fellowship' ? 0 : project.id === 'p-025' ? 19 : Number(project.name.match(/week\s*(\d+)/i)?.[1] || Infinity);
    if (timeline) visible.sort((a, b) => weekOf(a) - weekOf(b));
    if (visible.length && !visible.includes(selected)) selected = visible[0];
    const extended = showAll && (visible.length > 6 || visible.some(project => !project.position));
    const rows = Math.ceil(visible.length / 3);
    const bundleAgents = !timeline && centralAgents.every(id => visible.some(project => project.id === id));
    const layout = !timeline && visible.length ? layoutByDistance(visible, bundleAgents) : null;
    const height = layout ? layout.height : extended ? Math.max(620, rows * 125) : 620;
    const width = Math.max(viewport.clientWidth || 0, layout ? layout.width : 760);
    if (fitOnRender) {
      const maxHeight = parseFloat(getComputedStyle(viewport).maxHeight) || 620;
      zoom = Math.min(1, (viewport.clientWidth - 4) / width, (maxHeight - 4) / height);
      zoomValue.textContent = Math.round(zoom * 100) + '%';
      fitOnRender = false;
    }
    canvas.style.width = width + 'px';
    canvas.style.minWidth = '0';
    canvas.style.height = height + 'px';
    canvas.style.zoom = zoom;
    const locations = layout ? layout.locations : new Map(visible.map((project, index) => [project.id, extended ? [18 + (timeline && Math.floor(index / 3) % 2 ? 2 - index % 3 : index % 3) * 32, ((Math.floor(index / 3) + 0.5) / rows) * 100] : (project.position || [50, 50])]));
    document.querySelector('.constellation-note').textContent = timeline ? 'Lines show the weekly sequence, followed by the BiasAperture capstone.' : 'Arrows show conversation flow or documented integrations. Unconnected projects are shown without implied links. Scroll to explore the map.';
    if (visible.length) {
      if (!visible.includes(selected)) selected = visible[0];
      showDetail();
    } else {
      detail.textContent = 'No matching project selected.';
    }
    canvas.replaceChildren();
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('aria-hidden', 'true');
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    ['muted', 'active'].forEach(tone => {
      const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
      marker.setAttribute('id', 'constellation-arrow-' + tone); marker.setAttribute('viewBox', '0 0 10 10'); marker.setAttribute('refX', '5'); marker.setAttribute('refY', '5'); marker.setAttribute('markerWidth', '7'); marker.setAttribute('markerHeight', '7'); marker.setAttribute('orient', 'auto');
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path'); arrow.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z'); arrow.setAttribute('fill', tone === 'active' ? 'var(--accent)' : 'var(--muted)'); marker.append(arrow); defs.append(marker);
    });
    svg.append(defs);
    const bundledTargets = new Set();
    if (timeline) visible.forEach((project, index) => {
      if (!index || weekOf(project) !== weekOf(visible[index - 1]) + 1) return;
      const [x1, y1] = locations.get(visible[index - 1].id); const [x2, y2] = locations.get(project.id);
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const edge = 100 * 82.5 / width;
      const direction = Math.sign(x2 - x1);
      path.setAttribute('d', `M ${x1 + direction * edge} ${y1} L ${(x1 + x2) / 2} ${(y1 + y2) / 2} L ${x2 - direction * edge} ${y2}`); path.setAttribute('marker-mid', 'url(#constellation-arrow-active)'); path.classList.add('constellation-timeline'); svg.append(path);
    });
    if (bundleAgents) {
      const [agentX, firstY] = locations.get(centralAgents[0]);
      const lastY = locations.get(centralAgents[centralAgents.length - 1])[1];
      const middleY = (firstY + lastY) / 2;
      const spineX = agentX + 100 * 95 / width;
      const spine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const agentEdge = agentX + 100 * 82.5 / width;
      spine.setAttribute('d', `M ${agentEdge} ${firstY} H ${spineX} V ${lastY} H ${agentEdge} M ${agentEdge} ${middleY} H ${spineX}`);
      spine.classList.add('constellation-bundle'); svg.append(spine);
      const caption = document.createElement('span'); caption.className = 'constellation-stack-label'; caption.style.left = agentX + '%'; caption.style.top = `calc(${firstY}% - 45px)`; caption.textContent = 'Central agents'; canvas.append(caption);
    }
    connections.forEach(connection => {
      const from = visible.find(project => project.id === connection.from);
      const to = visible.find(project => project.id === connection.to);
      if (!from || !to) return;
      const bundled = bundleAgents && centralAgents.includes(from.id);
      if (bundled && bundledTargets.has(to.id)) return;
      if (bundled) bundledTargets.add(to.id);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      line.dataset.from = from.id; line.dataset.to = to.id; line.dataset.bundled = String(bundled);
      const [agentX, firstY] = bundleAgents ? locations.get(centralAgents[0]) : [0, 0];
      const [x1, y1] = bundled ? [agentX + 100 * 95 / width, (firstY + locations.get(centralAgents[centralAgents.length - 1])[1]) / 2] : locations.get(from.id); const [x2, y2] = locations.get(to.id);
      const midX = (x1 + x2) / 2; const midY = (y1 + y2) / 2;
      // Keep relationships between nodes in the same column outside the cards.
      // A center-to-center line would otherwise run through every intervening node.
      if (Math.abs(x1 - x2) < 1) {
        const laneX = x1 + 100 * (108 + Math.min(42, Math.abs(y2 - y1))) / width;
        const edge = 100 * 82.5 / width;
        line.setAttribute('d', `M ${x1 + edge} ${y1} Q ${laneX} ${y1} ${laneX} ${midY} T ${x2 + edge} ${y2}`);
      } else {
        const edge = 100 * 82.5 / width;
        const direction = Math.sign(x2 - x1);
        line.setAttribute('d', `M ${x1 + (bundled ? 0 : direction * edge)} ${y1} Q ${midX} ${y1} ${midX} ${midY} T ${x2 - direction * edge} ${y2}`);
      }
      const active = selected.id === from.id || selected.id === to.id || (bundled && centralAgents.includes(selected.id));
      line.setAttribute('marker-mid', active ? 'url(#constellation-arrow-active)' : 'url(#constellation-arrow-muted)');
      if (active) line.classList.add('is-active');
      const edgeLabel = document.createElement('span');
      edgeLabel.className = 'constellation-edge-label'; edgeLabel.textContent = connection.label || 'Connected';
      edgeLabel.style.left = midX + '%'; edgeLabel.style.top = midY + '%';
      edgeLabel.setAttribute('aria-hidden', 'true');
      line.edgeLabel = edgeLabel; canvas.append(edgeLabel);
      svg.append(line);
    });
    canvas.append(svg);
    function highlight(id, preview) {
      const neighbors = new Set([id]);
      connections.forEach(edge => {
        if (edge.from === id) neighbors.add(edge.to);
        if (edge.to === id) neighbors.add(edge.from);
      });
      svg.querySelectorAll('path[data-from]').forEach(line => {
        const bundledMatch = line.dataset.bundled === 'true' && connections.some(edge => centralAgents.includes(edge.from) && edge.to === line.dataset.to && (edge.from === id || edge.to === id));
        const active = line.dataset.bundled === 'true' ? bundledMatch : line.dataset.from === id || line.dataset.to === id;
        line.classList.toggle('is-active', active);
        const connectsSelection = id !== selected.id && connections.some(edge => (edge.from === selected.id && edge.to === id) || (edge.to === selected.id && edge.from === id));
        const selectedEdge = line.dataset.bundled === 'true'
          ? ((centralAgents.includes(selected.id) && line.dataset.to === id) || (centralAgents.includes(id) && line.dataset.to === selected.id))
          : ((line.dataset.from === selected.id && line.dataset.to === id) || (line.dataset.to === selected.id && line.dataset.from === id));
        if (line.edgeLabel) {
          const showLabel = preview && connectsSelection && selectedEdge;
          line.edgeLabel.classList.toggle('is-active', showLabel);
          if (showLabel && locations.has(id)) {
            const [x, y] = locations.get(id);
            line.edgeLabel.style.left = x + '%';
            line.edgeLabel.style.top = y < 12 ? `calc(${y}% + 40px)` : `calc(${y}% - 30px)`;
          }
        }
        line.setAttribute('marker-mid', active ? 'url(#constellation-arrow-active)' : 'url(#constellation-arrow-muted)');
      });
      canvas.querySelectorAll('.constellation-node').forEach(node => {
        node.classList.toggle('is-related', preview && neighbors.has(node.dataset.project));
        node.classList.toggle('is-dimmed', preview && !neighbors.has(node.dataset.project));
      });
    }
    visible.forEach(project => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'constellation-node';
      if (project.active) { button.classList.add('constellation-node--active'); button.setAttribute('aria-label', project.name + ' — active project'); }
      if (centralAgents.includes(project.id)) button.classList.add('constellation-node--center');
      button.dataset.category = project.category;
      button.dataset.project = project.id;
      const [x, y] = locations.get(project.id);
      button.style.left = x + '%'; button.style.top = y + '%';
      button.textContent = project.name; button.setAttribute('aria-pressed', String(project.id === selected.id));
      button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') highlight(project.id, true); });
      button.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') highlight(document.activeElement?.classList.contains('constellation-node') ? document.activeElement.dataset.project : selected.id, document.activeElement?.classList.contains('constellation-node')); });
      button.addEventListener('focus', () => highlight(project.id, true));
      button.addEventListener('blur', () => highlight(selected.id, false));
      button.addEventListener('click', () => { selected = project; render(); showDetail(); window.dispatchEvent(new CustomEvent('ecosystem-selection', { detail: { id: selected.id, source: 'graph' } })); canvas.querySelector('[aria-pressed="true"]')?.focus({ preventScroll: true }); centerSelected(); });
      canvas.append(button);
    });
    if (!visible.length) { const message = document.createElement('p'); message.className = 'constellation-empty'; message.textContent = 'No connected projects match this search.'; canvas.append(message); }
  }
  function showDetail() {
    detail.replaceChildren();
    const label = document.createElement('p'); label.className = 'constellation-eyebrow'; label.textContent = centralAgents.includes(selected.id) ? 'CENTRAL AGENT' : 'SELECTED CAPABILITY';
    const title = document.createElement('h3'); title.textContent = selected.name;
    const description = document.createElement('p'); description.textContent = selected.description;
    const heading = document.createElement('h4'); heading.textContent = 'Connections';
    const list = document.createElement('ul');
    connections.filter(edge => edge.from === selected.id || edge.to === selected.id).forEach(edge => {
      const other = projects.find(project => project.id === (edge.from === selected.id ? edge.to : edge.from));
      if (!other) return;
      const item = document.createElement('li'); const button = document.createElement('button');
      button.type = 'button'; button.textContent = other.name; button.addEventListener('click', () => {
        selected = other; search.value = '';
        filter.value = collegeIds.has(other.id) ? 'college-projects' : mcpIds.has(other.id) ? 'mcp-tools' : (other.category === 'fellowship' && other.id !== 'p-026' && other.id !== 'fellowship') ? 'fellowship' : 'all';
        if (filter.value === 'all' && !featured.has(other.id)) { expanded = true; expand.setAttribute('aria-pressed', 'true'); expand.textContent = 'Show connected map'; }
        render(); centerSelected();
      });
      const explanation = document.createElement('span'); explanation.textContent = edge.description + (edge.evidence === 'USER_DESCRIBED' ? ' (My workflow.)' : '');
      item.append(button, explanation);
      if (edge.source && edge.source_commit) {
        const source = document.createElement('a');
        const repo = edge.source.split(':')[0].split('/').slice(0, 2).join('/');
        source.href = 'https://github.com/' + repo + '/tree/' + edge.source_commit;
        source.target = '_blank'; source.rel = 'noopener noreferrer'; source.textContent = 'View source ↗'; item.append(source);
      }
      list.append(item);
    });
    if (!list.children.length && selected.id !== 'fellowship' && selected.id !== 'mcp-group') { const item = document.createElement('li'); item.textContent = 'No documented connections in this map yet.'; list.append(item); }
    const target = selected.target || selected.id;
    const link = document.createElement('a'); link.className = 'constellation-link'; link.href = '#' + target; link.textContent = selected.target ? 'Explore Fleet integration →' : 'Explore project →';
    link.addEventListener('click', () => { const card = document.getElementById(target); if (card) card.open = true; });
    detail.append(label, title, description, heading, list);
    if (selected.id === 'fellowship') {
      heading.textContent = 'Fellowship projects';
      const groupButton = document.createElement('button');
      groupButton.type = 'button'; groupButton.className = 'constellation-link'; groupButton.textContent = 'Explore fellowship projects →';
      groupButton.addEventListener('click', () => { filter.value = 'fellowship'; search.value = ''; render(); });
      detail.append(groupButton);
    }
    if (selected.id === 'mcp-group') {
      const groupButton = document.createElement('button'); groupButton.type = 'button'; groupButton.className = 'constellation-link'; groupButton.textContent = 'Explore MCP tools →';
      groupButton.addEventListener('click', () => { filter.value = 'mcp-tools'; search.value = ''; render(); }); detail.append(groupButton);
    }
    if (selected.id === 'college') {
      const groupButton = document.createElement('button'); groupButton.type = 'button'; groupButton.className = 'constellation-link'; groupButton.textContent = 'Explore college projects →';
      groupButton.addEventListener('click', () => { filter.value = 'college-projects'; search.value = ''; render(); }); detail.append(groupButton);
    }
    if (document.getElementById(target)) detail.append(link);
  }
  search.addEventListener('input', render); filter.addEventListener('change', render);
  function centerSelected() {
    const node = canvas.querySelector('.constellation-node[aria-pressed="true"]');
    if (!node || !viewport) return;
    const box = node.getBoundingClientRect(); const view = viewport.getBoundingClientRect();
    viewport.scrollTo({ left: viewport.scrollLeft + box.left - view.left + box.width / 2 - view.width / 2, top: viewport.scrollTop + box.top - view.top + box.height / 2 - view.height / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  let pan = null;
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button')) return;
    pan = { x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop, id: event.pointerId };
    viewport.setPointerCapture(event.pointerId); viewport.classList.add('is-panning');
  });
  viewport.addEventListener('pointermove', event => { if (pan && event.pointerId === pan.id) { viewport.scrollLeft = pan.left - (event.clientX - pan.x); viewport.scrollTop = pan.top - (event.clientY - pan.y); } });
  const endPan = event => { if (pan && event.pointerId === pan.id) { pan = null; viewport.classList.remove('is-panning'); } };
  viewport.addEventListener('pointerup', endPan); viewport.addEventListener('pointercancel', endPan); viewport.addEventListener('lostpointercapture', endPan);
  document.getElementById('constellation-reset').addEventListener('click', () => {
    search.value = ''; filter.value = 'all'; expanded = false; fitOnRender = true;
    expand.setAttribute('aria-pressed', 'false'); expand.textContent = 'Show all projects'; zoomValue.textContent = '100%';
    selected = projects.find(project => project.id === 'p-023') || projects[0]; render(); viewport.scrollTo({ left: 0, top: 0, behavior: 'instant' });
  });
  expand.addEventListener('click', () => { expanded = !expanded; expand.setAttribute('aria-pressed', String(expanded)); expand.textContent = expanded ? 'Show connected map' : 'Show all projects'; render(); });
  function changeZoom(delta) { zoom = Math.max(0.25, Math.min(1.5, Math.round((zoom + delta) * 100) / 100)); zoomValue.textContent = Math.round(zoom * 100) + '%'; render(); }
  document.getElementById('constellation-zoom-in').addEventListener('click', () => changeZoom(0.25));
  document.getElementById('constellation-zoom-out').addEventListener('click', () => changeZoom(-0.25));
  const viewSwitch = document.getElementById('ecosystem-view-switch');
  const graphSection = document.getElementById('constellation');
  if (viewSwitch && graphSection) {
    const buttons = viewSwitch.querySelectorAll('[data-ecosystem-view]');
    function setView(view) {
      const graphVisible = view === 'graph';
      graphSection.hidden = !graphVisible;
      ecosystem.hidden = graphVisible;
      buttons.forEach(button => { const active = button.dataset.ecosystemView === view; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
      if (!graphVisible) window.dispatchEvent(new CustomEvent('ecosystem-selection', { detail: { id: selected.id, source: 'graph' } }));
    }
    buttons.forEach(button => button.addEventListener('click', () => setView(button.dataset.ecosystemView)));
    window.addEventListener('ecosystem-selection', event => {
      if (event.detail?.source !== 'tree' || !graphSection.hidden) return;
      const project = projects.find(item => item.id === event.detail.id);
      if (!project) return;
      selected = project; search.value = ''; filter.value = collegeIds.has(project.id) ? 'college-projects' : mcpIds.has(project.id) ? 'mcp-tools' : project.category === 'fellowship' && project.id !== 'p-026' ? 'fellowship' : 'all';
      if (filter.value === 'all' && !featured.has(project.id)) { expanded = true; expand.setAttribute('aria-pressed', 'true'); expand.textContent = 'Show connected map'; }
      render();
    });
    viewSwitch.hidden = false;
    setView('graph');
  }
  render(); showDetail();
})();
