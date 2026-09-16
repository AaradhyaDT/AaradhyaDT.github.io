/* ============================================================
   MODULE: cmdk.js — aaradhyadt.github.io (v54.5)
   Command palette (Cmd+K) search and quick navigation.
   ============================================================ */

/* ── Command palette data ─────────────────────────────────── */
const CMDK_ENTRIES = [
  // ── Main Pages ───────────────────────────────────────────
  { title: 'Home', type: 'page', meta: 'Main Page', href: '/index.html', text: 'home index start portfolio landing aaradhya dev tamrakar adt' },
  { title: 'Projects', type: 'page', meta: 'Main Page', href: '/projects.html', text: 'projects portfolio showcase spark robotics embedded ai ml hardware software' },
  { title: 'Experience', type: 'page', meta: 'Main Page', href: '/experience.html', text: 'experience work history career timeline roles fellowships ieee fusemachines nssr' },
  { title: 'Achievements', type: 'page', meta: 'Main Page', href: '/achievements.html', text: 'achievements awards certifications hackathons honors competitions credentials' },
  { title: 'About', type: 'page', meta: 'Main Page', href: '/about.html', text: 'about bio biography profile background story philosophy education skills' },
  { title: 'Journey', type: 'page', meta: 'Main Page', href: '/journey.html', text: 'journey milestones build log history timeline evolution engineering process' },
  { title: 'Contact', type: 'page', meta: 'Main Page', href: '/contact.html', text: 'contact get in touch message email connect social channels' },
  { title: 'Privacy Policy', type: 'page', meta: 'Legal', href: '/privacy.html', text: 'privacy policy data protection google auth client storage terms safety' },
  { title: 'Terms of Service', type: 'page', meta: 'Legal', href: '/terms.html', text: 'terms of service usage guidelines legal disclaimer copyright license' },

  // ── Page Locations / Sections ────────────────────────────
  // Home Page Locations
  { title: 'Explore: Where to look next', type: 'section', meta: 'Home · Section', href: '/index.html#quick-nav', text: 'explore where to look next quick nav navigation site directory cards overview explore the site' },
  { title: 'CLI: Interactive Dev Terminal', type: 'section', meta: 'Home · Section', href: '/index.html#terminal-section', text: 'cli terminal interactive dev terminal developer terminal adt-shell shell zsh bash console command prompt emulator commands' },
  { title: 'Keymap & Display Guide', type: 'section', meta: 'Home · Section', href: '/index.html#keymap', text: 'keymap key map keyboard shortcuts hotkeys reference display guide oled 400 nits navigation controls shortcuts key bindings' },
  { title: 'At a Glance: Stats & Metrics', type: 'section', meta: 'Home · Section', href: '/index.html#stats', text: 'stats statistics at a glance metrics impact 39 achievements 30 projects key numbers highlights' },
  { title: 'About Sign In with Google', type: 'section', meta: 'Home · Section', href: '/index.html#about-sign-in', text: 'access control sign in with google login level 1 authentication privacy client storage' },
  { title: 'VIP Exclusive: Research & Specs', type: 'section', meta: 'Home · Section', href: '/index.html#vip-exclusive', text: 'vip tier exclusive research specs notes gated content passcode vip2026' },
  { title: 'Master Level: System Diagnostics & Console', type: 'section', meta: 'Home · Section', href: '/index.html#master-exclusive', text: 'master tier system diagnostics master console admin controls diagnostics health' },

  // About Page Locations
  { title: 'RADAR: Domain Competency Radar', type: 'section', meta: 'About · Section', href: '/about.html#skill-radar', text: 'radar domain competency radar interactive skill radar 6-axis breakdown ai/ml embedded pcb web omics data science leadership competency' },
  { title: 'Education: Where I Learned This', type: 'section', meta: 'About · Section', href: '/about.html#education', text: 'education where i learned this kathmandu engineering college kec ioe tribhuvan university tu bachelor bei aeronautical telecommunication coursework degree' },
  { title: 'Skills & Technical Stack', type: 'section', meta: 'About · Section', href: '/about.html#skills', text: 'skills technical stack tech stack programming languages frameworks c++ python pytorch embedded hardware software' },
  { title: 'Biography & Overview', type: 'section', meta: 'About · Section', href: '/about.html#about-intro', text: 'biography bio overview about intro philosophy firmware applied ml engineering background' },
  { title: 'Workflow & Toolbox', type: 'section', meta: 'About · Section', href: '/about.html#tools', text: 'tools toolbox workflow git github vs code jupyter colab docker vivado ollama postgresql' },
  { title: 'Schedule & Itinerary', type: 'section', meta: 'About · Section', href: '/about.html#itinerary', text: 'schedule itinerary calendar google calendar public events timeline agenda' },
  { title: 'Frequently Asked Questions (FAQ)', type: 'section', meta: 'About · Section', href: '/about.html#faq', text: 'faq frequently asked questions who is adt spark project background contact fellowships questions answers' },

  // Projects & Experience & Journey Sections
  { title: 'Projects: Showcase Grid', type: 'section', meta: 'Projects · Section', href: '/projects.html#projects', text: 'projects grid filter search all projects spark robotics embedded ai ml hardware software' },
  { title: 'Experience Timeline', type: 'section', meta: 'Experience · Section', href: '/experience.html#experience', text: 'experience timeline fuse ai fellow fusemachines ieee student branch nssr datacamp epc makerspace work history' },
  { title: 'Achievements Timeline', type: 'section', meta: 'Achievements · Section', href: '/achievements.html#achievements', text: 'achievements timeline awards certifications hackathons ieeextreme honors academic extracurricular' },
  { title: 'Journey: Build Log & Milestones', type: 'section', meta: 'Journey · Section', href: '/journey.html#journey', text: 'journey build log milestones development history commits engineering progress' },
  { title: 'Contact Form & Direct Channels', type: 'section', meta: 'Contact · Section', href: '/contact.html#contact', text: 'contact form get in touch email aaradhyadevtmr@gmail.com social channels message' },

  // ── Actions & Interactive Tools ──────────────────────────
  { title: 'Share Portfolio / Profile (Web Share)', type: 'action', meta: 'Action', href: 'javascript:shareContent()', text: 'share portfolio profile link copy web share send' },
  { title: 'Keyboard Shortcuts Cheat Sheet (?)', type: 'action', meta: 'Shortcut: ?', href: 'javascript:openShortcutsModal()', text: 'keyboard shortcuts cheat sheet keymap hotkeys keys hud help modal bindings guide' },
  { title: 'Generate Tailored Resume (ATS & PDF)', type: 'action', meta: 'Action', href: 'javascript:openResumeGenerator()', text: 'generate resume tailored ats cv export pdf print resume builder' },
  { title: 'Interactive Skill Radar Visualizer', type: 'action', meta: 'Action', href: 'javascript:initSkillRadar()', text: 'interactive skill radar visualizer radar chart skills competency' },
  { title: '3D AST Knowledge Graph HUD (WebGL 2)', type: 'action', meta: 'Action', href: 'javascript:openGraphModal()', text: '3d ast knowledge graph hud webgl 2 topology code wiki graph explorer codewiki' },
  { title: 'Access Control & VIP Login', type: 'action', meta: 'Passcode: vip2026', href: 'javascript:openAccessModal(1)', text: 'access control login vip higher tier passcode password security' },
  { title: 'Guided Site Tour (Shift+T)', type: 'action', meta: 'Shortcut: Shift+T', href: 'javascript:startTour()', text: 'guided site tour walkthrough interactive tour help tutorial' },
  { title: 'Toggle Audio Micro-Sounds (Shift+A)', type: 'action', meta: 'Shortcut: Shift+A', href: 'javascript:toggleAudioCues()', text: 'toggle audio sound effects micro-sounds cues sfx mute unmute' },
  { title: "What's New (Release History)", type: 'action', meta: 'Action', href: 'javascript:openWhatsNewModal()', text: 'whats new changelog release history updates version notes' },
  { title: 'Accent Color: Amber Gold (Default 👑)', type: 'action', meta: 'Theme', href: "javascript:applyAccent('gold')", text: 'accent color amber gold default theme' },
  { title: 'Accent Color: Cyber Emerald (⚡)', type: 'action', meta: 'Theme', href: "javascript:applyAccent('emerald')", text: 'accent color cyber emerald green theme' },
  { title: 'Accent Color: Electric Violet (🔮)', type: 'action', meta: 'Theme', href: "javascript:applyAccent('violet')", text: 'accent color electric violet purple theme' },
  { title: 'Accent Color: Ocean Cyan (🌊)', type: 'action', meta: 'Theme', href: "javascript:applyAccent('cyan')", text: 'accent color ocean cyan blue theme' },
  { title: 'Accent Color: Ruby Flame (🔴)', type: 'action', meta: 'Theme', href: "javascript:applyAccent('ruby')", text: 'accent color ruby flame red theme' },
  { title: 'Accent Color: Midnight Prism (🌌)', type: 'action', meta: 'Theme', href: "javascript:applyAccent('prism')", text: 'accent color midnight prism rainbow theme' },
];

const CMDK_PAGES = CMDK_ENTRIES;

/* ── Global search / command palette ("/" to open, unified across pages) ── */
function buildSearchIndex() {
  const index = CMDK_ENTRIES.map(p => ({
    type: p.type || 'page',
    title: p.title,
    meta: p.meta || '',
    href: p.href,
    text: (p.text || (p.title + ' ' + (p.meta || ''))).toLowerCase(),
  }));

  // Start from the static snapshot (always present, every page).
  const byHref = new Map();
  SEARCH_STATIC_INDEX.achievement.forEach(item => byHref.set(item.href, item));
  SEARCH_STATIC_INDEX.project.forEach(item => byHref.set(item.href, item));

  // Live DOM scan overrides matching hrefs with current-page data (handles
  // same-session edits without needing a re-export of the static index).
  document.querySelectorAll('#achievementsList .achievement-item').forEach((el, i) => {
    el.id = el.id || `achv-${i}`;
    const org = el.querySelector('.achievement-org')?.textContent.trim() || '';
    const title = el.querySelector('.achievement-title')?.textContent.trim() || '';
    const desc = el.querySelector('.achievement-desc')?.textContent.trim() || '';
    const date = el.querySelector('.achievement-date')?.textContent.trim() || '';
    const href = `achievements.html#${el.id}`;
    byHref.set(href, {
      type: 'achievement',
      title,
      meta: [org, date].filter(Boolean).join(' · '),
      href,
      text: [org, title, desc, date].join(' ').toLowerCase(),
    });
  });

  document.querySelectorAll('#projectsGrid .project-card').forEach((el, i) => {
    el.id = el.id || `proj-${i}`;
    const title = el.querySelector('.project-title')?.textContent.trim() || '';
    // Cards use either a single .project-desc paragraph or a
    // .project-desc-list — check both, mirroring scripts/extract_index.py,
    // so the live scan and the static snapshot never disagree.
    const descEl = el.querySelector('.project-desc');
    const desc = descEl
      ? descEl.textContent.trim()
      : Array.from(el.querySelectorAll('.project-desc-list li')).map(li => li.textContent.trim()).join(' ');
    const status = el.querySelector('.project-status')?.textContent.trim() || '';
    const tags = Array.from(el.querySelectorAll('.tag')).map(t => t.textContent.trim());
    const href = `projects.html#${el.id}`;
    byHref.set(href, {
      type: 'project',
      title,
      meta: [status, tags.slice(0, 3).join(', ')].filter(Boolean).join(' · '),
      href,
      text: [title, desc, tags.join(' '), status].join(' ').toLowerCase(),
    });
  });

  return index.concat(Array.from(byHref.values()));
}

function renderCmdk() {
  if (document.getElementById('cmdk')) return;
  const el = document.createElement('div');
  el.id = 'cmdk';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', 'Search');
  el.innerHTML = `
    <div class="cmdk-inner">
      <div class="cmdk-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" id="cmdkInput" placeholder="Search pages, locations, projects, achievements…" aria-label="Search" autocomplete="off" />
        <kbd>Esc</kbd>
      </div>
      <div class="cmdk-tabs" id="cmdkTabs" role="tablist" aria-label="Filter by type">
        <button type="button" class="cmdk-tab active" data-type="" role="tab" aria-selected="true">All</button>
        <button type="button" class="cmdk-tab" data-type="page" role="tab" aria-selected="false">Pages</button>
        <button type="button" class="cmdk-tab" data-type="project" role="tab" aria-selected="false">Projects</button>
        <button type="button" class="cmdk-tab" data-type="achievement" role="tab" aria-selected="false">Achievements</button>
      </div>
      <div class="cmdk-results" id="cmdkResults" role="listbox" aria-label="Results"></div>
      <div class="cmdk-empty" id="cmdkEmpty" hidden>No matches.</div>
    </div>`;
  document.body.appendChild(el);
}

function revealSearchTarget() {
  if (!location.hash) return;
  const targetId = decodeURIComponent(location.hash.slice(1));
  if (!targetId) return;
  const target = document.getElementById(targetId);
  if (!target) return;

  // Achievements are split into an Academic / Extracurricular track toggle
  const itemTrack = target.dataset.track;
  if (itemTrack) {
    const btn = document.getElementById(
      itemTrack === 'eca' ? 'trackEcaBtn' : 'trackAcademicBtn'
    );
    if (btn && !btn.classList.contains('is-active')) btn.click();
  }

  const group = target.closest('details.year-group');
  if (group) group.open = true;

  const isSection = target.tagName.toLowerCase() === 'section' || target.offsetHeight > 350;
  requestAnimationFrame(() => {
    target.scrollIntoView({
      behavior: 'smooth',
      block: isSection ? 'start' : 'center'
    });
  });
  target.classList.add('search-highlight');
  setTimeout(() => target.classList.remove('search-highlight'), 1600);
}

function initGlobalSearch() {
  renderCmdk();
  const cmdk = document.getElementById('cmdk');
  const input = document.getElementById('cmdkInput');
  const tabsEl = document.getElementById('cmdkTabs');
  const resultsEl = document.getElementById('cmdkResults');
  const emptyEl = document.getElementById('cmdkEmpty');
  const navBtn = document.getElementById('navSearchBtn');
  if (!cmdk || !input || !resultsEl) return;

  const index = buildSearchIndex();
  let activeType = '';
  let activeIndex = -1;
  let lastFocus = null;

  function currentResults() {
    const query = input.value.trim().toLowerCase();
    let pool = index;
    if (activeType === 'page') {
      pool = index.filter(item => item.type === 'page' || item.type === 'section' || item.type === 'action');
    } else if (activeType) {
      pool = index.filter(item => item.type === activeType);
    }

    if (!query) {
      pool = activeType ? pool : pool.filter(item => item.type === 'page' || item.type === 'section' || item.type === 'action');
      return pool.slice(0, 50);
    }

    const tokens = query.split(/\s+/).filter(Boolean);
    const matches = pool.filter(item => tokens.every(tok => item.text.includes(tok)));

    // Sort matches for relevance
    matches.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const aExact = aTitle === query;
      const bExact = bTitle === query;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      const aStarts = aTitle.startsWith(query);
      const bStarts = bTitle.startsWith(query);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      const aTitleHas = tokens.every(tok => aTitle.includes(tok));
      const bTitleHas = tokens.every(tok => bTitle.includes(tok));
      if (aTitleHas && !bTitleHas) return -1;
      if (!aTitleHas && bTitleHas) return 1;

      return 0;
    });

    return matches.slice(0, 50);
  }

  function setActiveResult() {
    const rows = Array.from(resultsEl.querySelectorAll('.cmdk-item'));
    rows.forEach((row, i) => {
      const isActive = i === activeIndex;
      row.classList.toggle('is-active', isActive);
      row.setAttribute('aria-selected', String(isActive));
      if (isActive) row.scrollIntoView({ block: 'nearest' });
    });
  }

  function renderResults(items) {
    resultsEl.innerHTML = items.map((item, i) => `
      <a href="${item.href}" class="cmdk-item" role="option" data-i="${i}" aria-selected="false">
        <span class="cmdk-item-icon">${CMDK_ICONS[item.type] || CMDK_ICONS.page}</span>
        <span class="cmdk-item-body">
          <span class="cmdk-item-title">${item.title}</span>
          <span class="cmdk-item-meta">${[CMDK_TYPE_LABEL[item.type] || 'Location', item.meta].filter(Boolean).join(' · ')}</span>
        </span>
      </a>`).join('');
    activeIndex = items.length ? 0 : -1;
    setActiveResult();
    emptyEl.hidden = items.length !== 0;
  }

  function refresh() {
    renderResults(currentResults());
  }

  function setActiveTab(tab) {
    activeType = tab.dataset.type;
    tabsEl.querySelectorAll('.cmdk-tab').forEach(t => {
      const isActive = t === tab;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', String(isActive));
    });
  }

  function openCmdk() {
    lastFocus = document.activeElement;
    input.value = '';
    setActiveTab(tabsEl.querySelector('.cmdk-tab[data-type=""]'));
    refresh();
    cmdk.classList.add('open');
    document.body.style.overflow = 'hidden';
    input.focus();
    if (typeof playAudioCue === 'function') playAudioCue('open');
  }

  function closeCmdk() {
    cmdk.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
    if (typeof playAudioCue === 'function') playAudioCue('close');
  }

  if (navBtn) navBtn.addEventListener('click', openCmdk);

  document.addEventListener('keydown', e => {
    if (cmdk.classList.contains('open')) return;
    const isSlash = (e.key === '/') && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey;
    const isCmdK = (e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K');
    if (!isSlash && !isCmdK) return;

    const tag = (document.activeElement || {}).tagName || '';
    if (isSlash && (/^(INPUT|TEXTAREA|SELECT)$/i.test(tag) || document.activeElement?.isContentEditable)) return;

    e.preventDefault();
    openCmdk();
  });

  document.addEventListener('keydown', e => {
    if (!cmdk.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeCmdk();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const max = resultsEl.querySelectorAll('.cmdk-item').length;
      if (!max) return;
      activeIndex = e.key === 'ArrowDown'
        ? (activeIndex + 1) % max
        : (activeIndex - 1 + max) % max;
      setActiveResult();
      if (typeof playAudioCue === 'function') playAudioCue('tick');
      return;
    }
    if (e.key === 'Enter') {
      const row = resultsEl.querySelectorAll('.cmdk-item')[activeIndex];
      if (row) {
        e.preventDefault();
        row.click();
      }
    }
  });

  cmdk.addEventListener('click', e => { if (e.target === cmdk) closeCmdk(); });
  resultsEl.addEventListener('click', e => {
    const item = e.target.closest('.cmdk-item');
    if (!item) return;
    const href = item.getAttribute('href');
    closeCmdk();
    if (!href || href.startsWith('javascript:')) return;

    if (href.includes('#')) {
      const parts = href.split('#');
      const targetPage = parts[0].replace(/^\//, '');
      const targetHash = parts[1];
      const currentPath = window.location.pathname.replace(/^\//, '');
      const currentPage = currentPath || 'index.html';
      const isSamePage = !targetPage || targetPage === currentPage ||
        (currentPage === 'index.html' && targetPage === '') ||
        (currentPage === '' && targetPage === 'index.html') ||
        (currentPage === targetPage);

      if (isSamePage) {
        e.preventDefault();
        if (window.location.hash === '#' + targetHash) {
          revealSearchTarget();
        } else {
          window.location.hash = '#' + targetHash;
        }
      }
    }
  });

  input.addEventListener('input', refresh);
  tabsEl.querySelectorAll('.cmdk-tab').forEach(tab => {
    tab.addEventListener('click', () => { setActiveTab(tab); refresh(); });
  });

  window.addEventListener('hashchange', revealSearchTarget);
  revealSearchTarget();
}



