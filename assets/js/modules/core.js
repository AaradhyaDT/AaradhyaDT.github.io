/* ============================================================
   MODULE: core.js — aaradhyadt.github.io (v54.5)
   Theme, navigation, layout, scroll, parallax, and date helpers.
   ============================================================ */

/* Note: SITE, SOCIAL_ICONS, QUICK_NAV_PAGES, CMDK_TYPE_LABEL, CMDK_ICONS
   are loaded ahead of core.js via assets/js/modules/constants.js */

/* ── Navbar injection ─────────────────────────────────────── */
function renderSiteNav() {
  const el = document.getElementById('siteNav');
  if (!el) return;
  const navLinks = SITE.navLinks
    .map(link => `<li><a href="${link.href}" title="Press ${link.key}">${link.label}</a></li>`)
    .join('');
  const drawerLinks = SITE.navLinks
    .map(link => `<a href="${link.href}">${link.label}</a>`)
    .join('') + `<a href="/contact.html" class="nav-cta">Connect</a>`;
  el.innerHTML = `
    <nav id="nav" aria-label="Primary navigation">
      <a href="/index.html" class="nav-logo" id="nav-logo">ADT<span>.</span></a>
      <ul class="nav-links" id="nav-links">
        ${navLinks}
      </ul>
      <div class="nav-right">
        <a href="/contact.html" class="nav-cta" aria-label="Connect with Aaradhya">Connect</a>
        <button class="nav-access-btn" id="navAccessBtn" aria-label="Access Control" title="Access Control">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span id="navAccessLabel">Access</span>
        </button>
        <button class="nav-search-btn" id="navSearchBtn" aria-label="Search (press / or Ctrl+K)" title="Search (press / or Ctrl+K)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>
        <button class="nav-hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false" aria-controls="navDrawer">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <div class="nav-drawer" id="navDrawer" role="navigation" aria-label="Mobile navigation">
      ${drawerLinks}
      <button class="nav-access-btn" id="drawerAccessBtn" style="margin: 0 0 1rem; width: calc(100% - 2rem); justify-content: center;" aria-label="Access Control">
        Access Control / Login
      </button>
    </div>`;

  const navAccessBtn = document.getElementById('navAccessBtn');
  if (navAccessBtn) {
    navAccessBtn.addEventListener('click', handleAccessBtnClick);
  }
  const drawerAccessBtn = document.getElementById('drawerAccessBtn');
  if (drawerAccessBtn) {
    drawerAccessBtn.addEventListener('click', handleAccessBtnClick);
  }
}

function handleAccessBtnClick() {
  const actTier = ACCESS_CONTROL.getActualTier();
  if (actTier > ACCESS_CONTROL.TIER_PUBLIC) {
    openLogoutModal();
    return;
  }
  openAccessModal();
}

function openLogoutModal() {
  if (document.getElementById('logoutModalOverlay')) return;

  const actTier = ACCESS_CONTROL.getActualTier();
  const session = ACCESS_CONTROL.getSessionData();
  const label = actTier === ACCESS_CONTROL.TIER_MASTER ? 'Master Level' : 'Higher Tier (VIP)';
  const emailLine = session?.user?.email ? `<div style="margin-top:0.4rem;font-family:var(--mono);font-size:0.72rem;color:var(--muted);">${session.user.email}</div>` : '';

  const overlay = document.createElement('div');
  overlay.id = 'logoutModalOverlay';
  overlay.className = 'access-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Confirm Log Out');

  overlay.innerHTML = `
    <div class="access-modal-card" id="logoutModalCard">
      <div class="access-modal-header">
        <div class="access-modal-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>Log Out</span>
        </div>
        <button type="button" class="access-modal-close" id="logoutModalClose" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div style="padding:0.25rem 0 1.2rem;text-align:center;">
        <div>You're signed in with <strong>${label}</strong> access.</div>
        ${emailLine}
        <div style="margin-top:0.6rem;font-size:0.85rem;color:var(--muted);">You'll need to sign in again to regain access.</div>
      </div>
      <div class="access-actions">
        <button type="button" class="access-btn-submit" id="logoutCancelBtn">Cancel</button>
        <button type="button" class="access-btn-logout" id="logoutConfirmBtn" style="flex:1;">Log Out</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const closeBtn = document.getElementById('logoutModalClose');
  const cancelBtn = document.getElementById('logoutCancelBtn');
  const confirmBtn = document.getElementById('logoutConfirmBtn');

  closeBtn.addEventListener('click', closeLogoutModal);
  cancelBtn.addEventListener('click', closeLogoutModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLogoutModal(); });

  confirmBtn.addEventListener('click', () => {
    ACCESS_CONTROL.logout();
    closeLogoutModal();
    showToast('Logged out. Reverted to public guest access.');
  });

  requestAnimationFrame(() => overlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function closeLogoutModal() {
  const overlay = document.getElementById('logoutModalOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => overlay.remove(), 250);
}



/* ── Footer injection ─────────────────────────────────────── */
function renderSiteFooter() {
  const el = document.getElementById('siteFooter');
  if (!el) return;
  const socialsHtml = SITE.socials
    .map(s => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}">${SOCIAL_ICONS[s.label] || s.label}</a>`)
    .join('');
  const currentRelVersion = (window.SITE_RELEASES && window.SITE_RELEASES[0] && window.SITE_RELEASES[0].version)
    || (typeof SITE_RELEASES !== 'undefined' && SITE_RELEASES[0] && SITE_RELEASES[0].version)
    || '';
  const wnLabel = currentRelVersion ? `What's New (${currentRelVersion})` : "What's New";
  el.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-logo">ADT<span>.</span></span>
        <span class="footer-tagline">Electronics &amp; AI/ML Engineer</span>
      </div>
      <div class="footer-socials">${socialsHtml}</div>
    </div>
    <div class="footer-rule"></div>
    <div class="footer-copy">${SITE.footerCopy} · <a href="/privacy.html">Privacy Policy</a> · <a href="/terms.html">Terms of Service</a> · <button id="wnFooterBtn" type="button" class="footer-wn-btn">${wnLabel}</button></div>`;

  const btn = document.getElementById('wnFooterBtn');
  if (btn) btn.addEventListener('click', openWhatsNewModal);
}



function getCurrentPageFile() {
  const raw = location.pathname.split('/').pop() || 'index.html';
  if (!raw || raw === '/' || raw === '') return 'index.html';
  return raw.endsWith('.html') ? raw : (raw + '.html');
}

/* ── Explore ("quick-nav") grid injection ─────────────────────
   Renders every QUICK_NAV_PAGES entry that's eligible for the
   current page (always-shown pages, plus any showOn-gated page
   whose list includes this file) into #quickNavGrid. The current
   page renders as a disabled --current card instead of a link;
   every other card gets a dist-N/direction arrow based on its
   position relative to the current page in the canonical order. */
function renderQuickNav() {
  const el = document.getElementById('quickNavGrid');
  if (!el) return;
  const page = getCurrentPageFile();
  const currentIndex = QUICK_NAV_PAGES.findIndex(p => p.file === page);
  const eligible = QUICK_NAV_PAGES.filter(p => !p.showOn || p.showOn.includes(page));

  el.innerHTML = eligible.map(p => {
    const isCurrent = p.file === page;
    const idx = String(eligible.indexOf(p) + 1).padStart(2, '0');
    if (isCurrent) {
      return `
        <div class="quick-nav-card quick-nav-card--current">
          <div class="quick-nav-index">P — ${idx}</div>
          <div class="quick-nav-title">${p.title}</div>
          <p class="quick-nav-desc">${p.desc}</p>
          <span class="quick-nav-cta">This is the current page</span>
        </div>`;
    }
    const targetIndex = QUICK_NAV_PAGES.findIndex(q => q.file === p.file);
    const dist = Math.min(5, Math.max(1, Math.abs(targetIndex - currentIndex)));
    const arrow = targetIndex < currentIndex ? '&laquo;' : '&raquo;';
    return `
        <a class="quick-nav-card" href="/${p.file}">
          <div class="quick-nav-index">P — ${idx} <span class="card-arrow dist-${dist}">${arrow}</span></div>
          <div class="quick-nav-title">${p.title}</div>
          <p class="quick-nav-desc">${p.desc}</p>
          <span class="quick-nav-cta">${p.cta} →</span>
        </a>`;
  }).join('');
}



/* ── Active nav link (page-level, not anchor) ─────────────── */
function setActiveNav() {
  // Match current page filename against each nav link's href
  const page = getCurrentPageFile();
  document.querySelectorAll('.nav-links a, .nav-drawer a, .nav-cta').forEach(a => {
    let linkPage = (a.getAttribute('href') || '').split('/').pop().split('#')[0] || 'index.html';
    if (!linkPage || linkPage === '/' || linkPage === '') linkPage = 'index.html';
    if (!linkPage.endsWith('.html')) linkPage += '.html';
    const isCurrent = linkPage === page;
    a.classList.toggle('active', isCurrent);
    if (isCurrent) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
}



/* ── Theme toggle ─────────────────────────────────────────── */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme(event) {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyTheme(next);
    localStorage.setItem('adt-theme', next);
    return;
  }

  const x = event?.clientX ?? window.innerWidth / 2;
  const y = event?.clientY ?? 0;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = document.startViewTransition(() => {
    applyTheme(next);
    localStorage.setItem('adt-theme', next);
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 400,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    );
  });
}

function initTheme() {
  const saved = localStorage.getItem('adt-theme') || 'dark';
  applyTheme(saved);
}

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    triggerHapticFeedback(12);
    toggleTheme(e);
  });
}



/* ── Accent Color Theme Management ───────────────────────── */
function applyAccent(accent) {
  const validAccents = ['gold', 'emerald', 'violet', 'cyan', 'ruby', 'prism'];
  const target = validAccents.includes(accent) ? accent : 'gold';
  if (target === 'gold') {
    document.documentElement.removeAttribute('data-accent');
  } else {
    document.documentElement.setAttribute('data-accent', target);
  }
  localStorage.setItem('adt-accent', target);

  document.querySelectorAll('[data-accent-swatch]').forEach(btn => {
    if (btn.dataset.accentSwatch === target) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function initAccent() {
  const savedAccent = localStorage.getItem('adt-accent') || 'gold';
  applyAccent(savedAccent);
}

function initAccentPicker() {
  const toggleBtn = document.getElementById('colorPickerToggle');
  const popover = document.getElementById('colorPickerPopover');

  const togglePopover = (show) => {
    if (!popover || !toggleBtn) return;
    const isExpanded = show !== undefined ? show : !popover.classList.contains('active');
    popover.classList.toggle('active', isExpanded);
    toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  };

  if (toggleBtn && popover) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerHapticFeedback(10);
      togglePopover();
    });
  }

  document.querySelectorAll('[data-accent-swatch]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerHapticFeedback(14);
      const chosen = btn.dataset.accentSwatch;
      applyAccent(chosen);
      togglePopover(false);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#colorPickerWrap')) {
      togglePopover(false);
    }
  });
}



/* ── Mobile hamburger & Bottom Sheet Navigation (v36) ─────── */
function initHamburger() {
  const hamburger = document.getElementById('navHamburger');
  const drawer = document.getElementById('navDrawer');
  if (!hamburger || !drawer) return;

  // Create drag handle if missing
  if (!drawer.querySelector('.nav-drawer-handle')) {
    const handle = document.createElement('div');
    handle.className = 'nav-drawer-handle';
    handle.setAttribute('aria-hidden', 'true');
    drawer.insertBefore(handle, drawer.firstChild);
  }

  // Create backdrop if missing
  let backdrop = document.getElementById('navDrawerBackdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'navDrawerBackdrop';
    backdrop.className = 'nav-drawer-backdrop';
    document.body.appendChild(backdrop);
  }

  const mainEl = document.getElementById('main-content') || document.querySelector('main');
  const footerEl = document.querySelector('footer');

  function setOpen(isOpen) {
    drawer.classList.toggle('open', isOpen);
    backdrop.classList.toggle('open', isOpen);
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (mainEl) mainEl.inert = isOpen;
    if (footerEl) footerEl.inert = isOpen;
  }

  hamburger.addEventListener('click', () => {
    setOpen(!drawer.classList.contains('open'));
  });

  backdrop.addEventListener('click', () => {
    setOpen(false);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      setOpen(false);
      hamburger.focus();
    }
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });
}



/* ── Scroll: nav elevation, progress bar, back-to-top ────── */
function initScroll() {
  const nav = document.getElementById('nav');
  const backTop = document.getElementById('backTop');
  const scrollPct = document.getElementById('scrollPct');
  const progressBar = document.getElementById('scrollProgress');
  const NEAR_BOTTOM_PX = 96;

  let scrollTicking = false;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const nearBottom = max > 0 && (max - y) < NEAR_BOTTOM_PX;
    if (nav) nav.classList.toggle('scrolled', y > 50);
    if (backTop) backTop.classList.toggle('visible', y > 400);
    if (scrollPct) scrollPct.classList.toggle('visible', y > 400 && !nearBottom);
    if (progressBar) {
      const pct = max > 0 ? y / max : 0;
      progressBar.style.transform = `scaleX(${pct})`;
      if (scrollPct) scrollPct.textContent = Math.round(pct * 100) + '%';
    }
    scrollTicking = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(onScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const isMinus = e.key === '-' || e.key === '_' || e.code === 'Minus';
    const isEqual = e.key === '=' || e.key === '+' || e.code === 'Equal';
    if (!isEqual && !isMinus) return;
    const tag = (document.activeElement || {}).tagName || '';
    if (/^(INPUT|TEXTAREA|SELECT)$/i.test(tag) || document.activeElement?.isContentEditable) return;
    e.preventDefault();
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (isEqual) {
      window.scrollTo({ top: e.shiftKey ? max * 0.25 : 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: e.shiftKey ? max * 0.75 : max, behavior: 'smooth' });
    }
  });
}



/* ── Reveal on scroll & Stagger (v35) ─────────────────────── */
function initReveal() {
  // Auto-assign staggered delays to card grid children
  document.querySelectorAll('.quick-nav-grid, .projects-grid, .achievements-grid, #quickNavGrid').forEach(grid => {
    const children = grid.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.classList.add(`reveal-stagger-${(i % 8) + 1}`);
    });
  });

  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.05 }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}



/* ── Custom cursor (pointer: fine only) ───────────────────── */
function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  let running = true;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
    } else {
      if (!running) {
        running = true;
        requestAnimationFrame(tick);
      }
    }
  });

  function tick() {
    if (!running) return;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}



/* ── Deferred GA4 load ────────────────────────────────────── */
function loadGA4() {
  if (window._ga4Loaded) return;
  window._ga4Loaded = true;
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.GA4_ID}`;
  s.onload = () => { gtag('js', new Date()); gtag('config', SITE.GA4_ID); };
  document.head.appendChild(s);
}

function scheduleGA4() {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => setTimeout(loadGA4, 1500), { timeout: 4000 });
  } else {
    setTimeout(loadGA4, 3000);
  }
  ['pointerdown', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
    window.addEventListener(evt, loadGA4, { once: true, passive: true });
  });
}



/* ── Live date computation ────────────────────────────────── */
// Computes current Fuse AI Fellowship week and BEI semester from today's date.
// Results exposed on window.LIVE — page-specific scripts read and apply them.
function computeLiveDates() {
  var now = new Date();

  // ── Fuse AI Fellowship week ──────────────────────────────
  // Anchor: Week 1 started Monday 4 May 2026 (Mon–Sun cadence).
  // Week flips every Monday 00:00 local time.
  var FUSE_WK1 = new Date(2026, 4, 4);  // May 4 2026, 00:00 local
  var FUSE_TOTAL = 24;                     // 6 months × 4 weeks
  var MS_WEEK = 7 * 24 * 60 * 60 * 1000;
  var elapsed = now - FUSE_WK1;
  var fuseWeek = elapsed >= 0 ? Math.floor(elapsed / MS_WEEK) + 1 : null;
  // Fellowship is complete once Wk24 ends (Mon Oct 19 2026 00:00 local)
  var FUSE_END = new Date(FUSE_WK1.getTime() + FUSE_TOTAL * MS_WEEK);
  var fuseComplete = fuseWeek !== null && now >= FUSE_END;

  var fuseLabel, fuseStatus;
  if (fuseWeek === null) {
    fuseLabel = 'Fuse AI Fellowship — not yet started';
    fuseStatus = 'upcoming';
  } else if (fuseComplete) {
    fuseLabel = 'Fuse AI Fellowship — Completed (May–Oct 2026, 24 wks)';
    fuseStatus = 'complete';
  } else {
    var currentWk = Math.min(fuseWeek, FUSE_TOTAL); // cap display at Wk24
    var wkStart = new Date(FUSE_WK1.getTime() + (currentWk - 1) * MS_WEEK);
    var wkEnd = new Date(wkStart.getTime() + 6 * 24 * 60 * 60 * 1000);
    var fmt = function (d) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    fuseLabel = 'Fuse AI Fellow — Wk ' + currentWk + '/' + FUSE_TOTAL
      + ' (' + fmt(wkStart) + '–' + fmt(wkEnd) + ') ongoing';
    fuseStatus = 'ongoing';
  }

  // ── BEI Semester ─────────────────────────────────────────
  // IV/I (7th sem) until KEC 8th sem officially begins Sep 1 2026.
  var SEM_SWITCH = new Date(2026, 8, 1); // Sep 1 2026 00:00 local
  var isIV2 = now >= SEM_SWITCH;

  var semLabel = isIV2 ? 'IV/II' : 'IV/I';
  var semFull = isIV2 ? 'Year IV / Part II — 8th Semester'
    : 'Year IV / Part I — 7th Semester';
  var semNote = isIV2
    ? '8th Semester · Expected graduation January 2027'
    : '7th Semester · Expected graduation January 2027';
  var heroTag = 'BEI ' + semLabel + ' · KEC, IOE · Tribhuvan University';

  var IV1_SUBJECTS = [
    'Wireless Communication', 'Artificial Intelligence',
    'Organization &amp; Management', 'Digital Signal Analysis &amp; Processing',
    'RF &amp; Microwave Engineering', 'Aeronautical Telecom', 'Project Part A'
  ];
  var IV2_SUBJECTS = [
    'Telecommunications', 'Professional Practice',
    'Energy, Environment &amp; Society', 'Information Systems',
    'Elective II (EX 765)', 'Elective III (EX 785)',
    'Project Part B — SPARK'
  ];

  window.LIVE = {
    fuseWeek: fuseWeek,
    fuseLabel: fuseLabel,
    fuseStatus: fuseStatus,
    semLabel: semLabel,
    semFull: semFull,
    semNote: semNote,
    heroTag: heroTag,
    subjects: isIV2 ? IV2_SUBJECTS : IV1_SUBJECTS,
    isIV2: isIV2,
  };
}

/* ── Apply live dates to elements (called per-page) ──────── */
// Pass a map of { elementId: fn(LIVE) | string }.
// String values used as-is; functions called with LIVE object.
function applyLiveDates(map) {
  if (!window.LIVE) computeLiveDates();
  var L = window.LIVE;
  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    var v = map[id];
    el.innerHTML = typeof v === 'function' ? v(L) : v;
  });
}

/* ── NPT hero date — Bikram Sambat / Gregorian toggle ──────── */
// Backtick (`) — or a click on the date itself — toggles the hero
// status-card date between B.S. and A.D. Calendar table covers BS
// 1975–2099 (~AD 1918–2043), ported from remotemerge/nepali-date-converter
// (MIT License) and cross-checked against ramropatro.com's live BS↔AD
// converter before embedding. No-ops on pages without #statusClockDate.
const BS_YEARS = [[31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366], [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366], [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366], [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366], [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366], [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365], [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366], [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365], [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365], [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365]];
const BS_EPOCH_UTC = Date.UTC(1918, 3, 13); // AD date of 1975-01-01 BS
const BS_MONTHS = ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
const AD_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let statusDateStrings = null; // { ad, bs } — computed once at boot

function kathmanduYMD(date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kathmandu', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const get = t => Number(parts.find(p => p.type === t).value);
  return { y: get('year'), m: get('month'), d: get('day') };
}

function adToBs(ymd) {
  const targetUTC = Date.UTC(ymd.y, ymd.m - 1, ymd.d);
  let remaining = Math.round((targetUTC - BS_EPOCH_UTC) / 86400000);
  if (remaining < 0) return null;
  for (let by = 1975; by <= 2099; by++) {
    const row = BS_YEARS[by - 1975];
    if (!row) return null;
    if (remaining >= row[12]) { remaining -= row[12]; continue; }
    for (let bm = 0; bm < 12; bm++) {
      if (remaining >= row[bm]) { remaining -= row[bm]; continue; }
      return { year: by, month: bm, date: remaining + 1 };
    }
  }
  return null;
}

function renderStatusDate() {
  const el = document.getElementById('statusClockDate');
  if (!el || !statusDateStrings) return;
  const mode = localStorage.getItem('adt-date-calendar') || 'ad';
  el.textContent = (mode === 'bs' && statusDateStrings.bs) ? statusDateStrings.bs : statusDateStrings.ad;
}

function toggleStatusDate() {
  if (!statusDateStrings) return;
  const current = localStorage.getItem('adt-date-calendar') || 'ad';
  localStorage.setItem('adt-date-calendar', current === 'bs' ? 'ad' : 'bs');
  renderStatusDate();
}

function initStatusDate() {
  const el = document.getElementById('statusClockDate');
  if (!el) return;

  const ymd = kathmanduYMD(new Date());
  const bs = adToBs(ymd);
  statusDateStrings = {
    ad: ymd.d + ' ' + AD_MONTHS[ymd.m - 1] + ' ' + ymd.y + ' AD',
    bs: bs ? (bs.date + ' ' + BS_MONTHS[bs.month] + ' ' + bs.year + ' BS') : null,
  };
  el.title = 'Click, or press ` — toggle B.S. / A.D.';
  el.addEventListener('click', toggleStatusDate);
  renderStatusDate();
}

/* ── Notification & Push Helpers ────────────────────────────── */
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    if (typeof showToast === 'function') showToast('Notifications not supported in this browser.');
    return 'unsupported';
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      if (typeof showToast === 'function') showToast('🔔 Notifications enabled for new releases & updates!');
      if (typeof playAudioCue === 'function') playAudioCue('chime');
    } else if (permission === 'denied') {
      if (typeof showToast === 'function') showToast('Notification permission denied.');
    }
    return permission;
  } catch (err) {
    console.warn('Notification permission request failed:', err);
    return 'error';
  }
}

async function subscribePushNotifications() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    if (typeof showToast === 'function') showToast('Push notifications not supported.');
    return null;
  }
  const permission = await requestNotificationPermission();
  if (permission !== 'granted') return null;

  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      console.info('Service Worker ready for push subscriptions.');
    }
    return sub;
  } catch (err) {
    console.warn('Push subscription failed:', err);
    return null;
  }
}

window.requestNotificationPermission = requestNotificationPermission;
window.subscribePushNotifications = subscribePushNotifications;