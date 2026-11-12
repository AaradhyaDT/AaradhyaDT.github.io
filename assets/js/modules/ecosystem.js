/* MODULE: ecosystem.js — aaradhyadt.github.io (v58.12)
   Progressively enhance the static, linked project tree. */
(function initEcosystem() {
  'use strict';

  const root = document.getElementById('ecosystem');
  if (!root) return;
  const tree = root.querySelector('#ecosystem-tree');
  const nodes = Array.from(tree.querySelectorAll('[data-project]'));
  const branches = Array.from(tree.querySelectorAll('.ecosystem-branch'));
  const connections = JSON.parse(root.dataset.connections || '[]');
  const panel = root.querySelector('.ecosystem-detail');
  const search = root.querySelector('#ecosystem-search');
  const expand = root.querySelector('#ecosystem-expand');
  const status = root.querySelector('#ecosystem-status');
  let selected = null;
  let announcementTimer;
  let branchState = null;

  const text = (selector, value) => { root.querySelector(selector).textContent = value; };
  const cardFor = (id) => document.getElementById(id);
  const titleFor = (id) => cardFor(id).querySelector('.project-title').textContent.trim();

  function announce(message) {
    clearTimeout(announcementTimer);
    announcementTimer = setTimeout(() => { status.textContent = message; }, 250);
  }

  function selectProject(id, focus = false) {
    const node = nodes.find(item => item.dataset.project === id);
    const card = cardFor(id);
    if (!node || !card) return;
    selected = id;
    nodes.forEach(item => {
      const link = item.querySelector('.ecosystem-node');
      if (item === node) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    const branch = node.closest('.ecosystem-branch');
    text('#ecosystem-detail-group', branch.querySelector('summary span').textContent);
    text('#ecosystem-detail-title', titleFor(id));
    text('#ecosystem-detail-description', card.querySelector('.project-desc li')?.textContent.trim()
      || card.querySelector('.project-card-body li')?.textContent.trim()
      || 'Explore the project card for its work, context, and available resources.');
    const tags = root.querySelector('#ecosystem-detail-tags');
    tags.replaceChildren();
    card.querySelectorAll('.tag').forEach(tag => {
      const item = document.createElement('li');
      item.textContent = tag.textContent;
      tags.appendChild(item);
    });
    root.querySelector('#ecosystem-project-link').setAttribute('href', '#' + id);

    // Forward to the original link so access.js remains the authority for gates.
    // Do not copy payload destinations or infer a repository from a project name.
    const repositories = root.querySelector('#ecosystem-repositories');
    repositories.replaceChildren();
    const links = card.querySelectorAll('a.project-link[data-payload-link-id], a.project-link[href^="https://github.com/"]');
    Array.from(links).filter(link => !['master', '2'].includes((link.dataset.payloadTier || '').toLowerCase())).forEach((link, index, all) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ecosystem-repository';
      button.textContent = all.length > 1 ? `Repository ${index + 1} · access via project` : 'Repository · access via project';
      button.addEventListener('click', async () => {
        if (window.__modulesLoadedPromise) await window.__modulesLoadedPromise;
        link.click();
      });
      repositories.appendChild(button);
    });
    if (!repositories.childElementCount) {
      repositories.textContent = 'Available resources are listed in the project card.';
    }

    const related = root.querySelector('#ecosystem-related');
    related.replaceChildren();
    connections.filter(edge => edge.from === id || edge.to === id).forEach(edge => {
      const other = edge.from === id ? edge.to : edge.from;
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ecosystem-connection';
      button.dataset.selectProject = other;
      const label = document.createElement('strong');
      label.textContent = nodes.find(node => node.dataset.project === other).querySelector('.ecosystem-node span').textContent;
      const relation = document.createElement('span');
      relation.textContent = edge.label;
      button.append(label, relation);
      const description = document.createElement('p');
      description.textContent = edge.description;
      item.append(button, description);
      related.appendChild(item);
    });
    if (!related.childElementCount) {
      const item = document.createElement('li');
      item.textContent = 'Explore this branch for other projects with a shared purpose.';
      related.appendChild(item);
    }
    panel.hidden = false;
    if (focus) {
      root.querySelector('#ecosystem-detail-title').focus({ preventScroll: true });
      if (window.matchMedia('(max-width: 760px)').matches) {
        panel.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      announce('Selected ' + titleFor(id) + '.');
    }
  }

  function syncExpandLabel() {
    const visible = branches.filter(branch => !branch.hidden);
    const allOpen = visible.every(branch => branch.querySelector('details').open);
    expand.textContent = allOpen ? 'Collapse branches' : 'Expand branches';
  }

  function filterProjects() {
    const query = search.value.trim().toLocaleLowerCase();
    if (query && !branchState) {
      branchState = branches.map(branch => branch.querySelector('details').open);
    }
    let count = 0;
    branches.forEach((branch, index) => {
      let matches = 0;
      branch.querySelectorAll('[data-project]').forEach(node => {
        node.hidden = !(`${node.dataset.search} ${branch.querySelector('summary span').textContent}`.toLocaleLowerCase().includes(query));
        if (!node.hidden) matches++;
      });
      branch.hidden = matches === 0;
      branch.querySelector('.ecosystem-count').textContent = matches;
      if (query) branch.querySelector('details').open = true;
      else if (branchState) branch.querySelector('details').open = branchState[index];
      count += matches;
    });
    if (!query) branchState = null;
    root.querySelector('.ecosystem-empty').hidden = count !== 0;
    if (!count) panel.hidden = true;
    else if (nodes.find(node => node.dataset.project === selected)?.hidden || panel.hidden) {
      selectProject(nodes.find(node => !node.hidden).dataset.project);
    }
    syncExpandLabel();
    announce(query ? `${count} of ${nodes.length} projects match your search.` : `${count} projects in the tree.`);
  }

  root.querySelector('.ecosystem-controls').hidden = false;
  root.querySelector('#ecosystem-detail-title').tabIndex = -1;
  root.classList.add('ecosystem--interactive');
  tree.addEventListener('click', event => {
    const link = event.target.closest('.ecosystem-node');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    selectProject(link.closest('[data-project]').dataset.project, true);
  });
  root.querySelector('#ecosystem-related').addEventListener('click', event => {
    const button = event.target.closest('[data-select-project]');
    if (!button) return;
    search.value = '';
    filterProjects();
    const node = nodes.find(item => item.dataset.project === button.dataset.selectProject);
    node.closest('details').open = true;
    selectProject(button.dataset.selectProject, true);
  });
  root.querySelector('#ecosystem-return').addEventListener('click', () => {
    search.value = '';
    filterProjects();
    const node = nodes.find(item => item.dataset.project === selected);
    node.closest('details').open = true;
    node.querySelector('a').focus();
  });
  root.querySelector('#ecosystem-project-link').addEventListener('click', () => {
    const card = cardFor(selected);
    // A project can be hidden by the existing domain filters or a month group.
    document.querySelector('#projectsFilterBar [data-filter="all"]')?.click();
    card.open = true;
    card.querySelector('summary').focus({ preventScroll: true });
  });
  search.addEventListener('input', filterProjects);
  search.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      search.value = '';
      filterProjects();
    }
  });
  expand.addEventListener('click', () => {
    const open = branches.some(branch => !branch.hidden && !branch.querySelector('details').open);
    branches.filter(branch => !branch.hidden).forEach(branch => { branch.querySelector('details').open = open; });
    syncExpandLabel();
  });
  branches.forEach(branch => branch.querySelector('details').addEventListener('toggle', syncExpandLabel));
  root.querySelector('#ecosystem-reset').addEventListener('click', () => {
    search.value = '';
    branchState = null;
    filterProjects();
    branches.forEach((branch, index) => { branch.querySelector('details').open = index === 0; });
    selectProject(nodes[0].dataset.project);
    syncExpandLabel();
    search.focus();
  });
  selectProject(nodes[0].dataset.project);
  syncExpandLabel();
})();
