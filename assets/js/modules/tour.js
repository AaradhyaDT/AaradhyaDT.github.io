/* ============================================================
   MODULE: tour.js — aaradhyadt.github.io (v54.5)
   Cross-page spotlight tour with keyboard navigation.
   ============================================================ */

/* ── Guided Site Tour data (v37) ─────────────────────────── */
const TOUR_STEPS = {
  'index.html': [
    { sel: '#hero', title: 'Welcome & Status', body: 'Welcome to ADT Portfolio — start here on any visit. Track real-time focus, role, and NPT clock in the live status widget.' },
    { sel: '#stats', title: 'Impact & Metrics', body: 'Stat counters tracking 15+ built engineering projects, 4th-year BEI student status, and fellowship milestones.' },
    { sel: '#quick-nav', title: 'Quick Navigation', body: 'Explore hub to jump straight into Projects, Experience, Achievements, Journey, and About.' },
    { sel: '#terminal-section', title: 'Dev Terminal', body: 'A live interactive command line — type "help" for a full command list, or try quick preset buttons like "skills", "projects", and "matrix".' },
    { sel: '#about-sign-in', title: 'Access Control', body: 'Optional browser-only Google Sign-In to unlock additional technical research notes and VIP specs.' },
    { sel: '#keymap', title: 'Keymap & Display Guide', body: 'Complete keyboard shortcuts (1-7, 0, Shift+N, Shift+T, /, Esc) and 400-nit OLED display calibration benchmarks.' },
  ],
  'projects.html': [
    { sel: '#page-header', title: 'Projects Portfolio', body: 'Explore 30 engineering projects across firmware, robotics, and ML with real-time tag search and count indicators.' },
    { sel: '#p-018', title: 'Featured Build (SPARK)', body: 'Deep-dive into SPARK — Intelligent Elderly Fall Detection Wearable with ESP32-S3, PyTorch, and TFLite Micro on-device inference.' },
  ],
  'experience.html': [
    { sel: '#page-header', title: 'Leadership & Experience', body: 'Chronological roles across Fusemachines, DataCamp, IEEE Student Branch, and EPC Club.' },
    { sel: '#experience', title: 'Role Details & Certs', body: 'Scope descriptions and verified credentials — click any cert badge to view or download the original PDF.' },
  ],
  'achievements.html': [
    { sel: '#page-header', title: 'Achievements & Credentials', body: '39 competition milestones and industry certifications. Filter by Academic or Extracurricular categories.' },
    { sel: '#achievementsList', title: 'Certificate Viewer', body: 'Interactive credentials grid with integrated lightbox viewer and direct PDF downloads.' },
  ],
  'about.html': [
    { sel: '#about-intro', title: 'About ADT', body: 'Engineering background, specialization, and design philosophy behind this site.' },
    { sel: '#skills', title: 'Technical Skillset', body: 'Skill matrix breakdown across Embedded & Firmware, AI/ML & Vision, and Web Systems.' },
    { sel: '#education', title: 'Academic Timeline', body: 'Degree timeline through Kathmandu Engineering College, IOE, Tribhuvan University.' },
    { sel: '#faq', title: 'Frequently Asked Questions', body: 'Interactive FAQ section covering core background, SPARK major project, and direct contact options.' },
  ],
  'journey.html': [
    { sel: '#page-header', title: 'Engineering Journey', body: 'A 36-node narrative timeline tracing site architecture, commit milestones, and engineering releases.' },
    { sel: '#journeyTrack .journey-card', title: 'Milestone Checkpoints', body: 'Expandable checkpoint nodes — press Alt+6 anytime to toggle all timeline nodes at once.' },
  ],
  'contact.html': [
    { sel: '#contact-intro', title: 'Contact Channels', body: 'Direct communication channels for research, collaborations, internships, and IEEE engagements.' },
    { sel: '#contactForm', title: 'Get In Touch', body: 'Send direct messages with real-time field validation — no account needed. Thanks for visiting!' },
  ],
};
const TOUR_PAGE_ORDER = ['index.html', 'projects.html', 'experience.html', 'achievements.html', 'about.html', 'journey.html', 'contact.html'];
// Flattened once from TOUR_STEPS/TOUR_PAGE_ORDER above — the engine walks
// this single ordered list by index; TOUR_STEPS stays the per-page authoring
// format, this is purely derived from it.
const TOUR_FLAT_STEPS = TOUR_PAGE_ORDER.flatMap(page => (TOUR_STEPS[page] || []).map(step => ({ ...step, page })));
const TOUR_LS_ACTIVE = 'adt_tour_active';
const TOUR_LS_INDEX = 'adt_tour_index';
let tourLastFocus = null;



/* ── Guided Site Tour (v37) ────────────────────────────────
   Cross-page spotlight walkthrough over TOUR_FLAT_STEPS (built
   above from TOUR_STEPS/TOUR_PAGE_ORDER). Progress is a single
   global index in localStorage (TOUR_LS_ACTIVE + TOUR_LS_INDEX);
   "Next" past a page's last step navigates to the next page and
   auto-resumes there. Reuses access-modal-overlay visual
   language, respects prefers-reduced-motion, moves focus into
   the card on open and restores it on close (same pattern as
   initLightbox/initGlobalSearch), and closes on Escape / overlay
   click / swipe-down (modals list in initTouchGestures — the
   overlay is created eagerly in initTour(), before
   initTouchGestures() runs, so that listener has a real node to
   attach to). Opened via Shift+T, the cmdk command palette, or the
   terminal `tour` command — no dedicated nav button (removed). */

function tourReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getTourPageUrl(pageName) {
  const path = location.pathname;
  const lastSlash = path.lastIndexOf('/');
  if (lastSlash === -1) return pageName;
  return path.substring(0, lastSlash + 1) + pageName;
}

function getTourCurrentPage() {
  let file = location.pathname.split('/').pop() || 'index.html';
  if (!file || file === '') file = 'index.html';
  return file;
}

function updateTourSpotlight(target) {
  const hole = document.getElementById('tourHoleRect');
  const frame = document.getElementById('tourSpotlightFrame');

  if (!target || target === document.body) {
    if (hole) {
      hole.setAttribute('x', '0');
      hole.setAttribute('y', '0');
      hole.setAttribute('width', '0');
      hole.setAttribute('height', '0');
    }
    if (frame) frame.style.display = 'none';
    return;
  }

  const r = target.getBoundingClientRect();
  const pad = 8;
  const x = Math.max(0, r.left - pad);
  const y = Math.max(0, r.top - pad);
  const w = Math.min(window.innerWidth, r.width + pad * 2);
  const h = Math.min(window.innerHeight, r.height + pad * 2);

  if (hole) {
    hole.setAttribute('x', String(x));
    hole.setAttribute('y', String(y));
    hole.setAttribute('width', String(w));
    hole.setAttribute('height', String(h));
    hole.setAttribute('rx', '10');
    hole.setAttribute('ry', '10');
  }

  if (frame) {
    frame.style.display = 'block';
    frame.style.left = x + 'px';
    frame.style.top = y + 'px';
    frame.style.width = w + 'px';
    frame.style.height = h + 'px';
  }
}

function ensureTourOverlay() {
  let overlay = document.getElementById('tourOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'tourOverlay';
    overlay.className = 'tour-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Site tour');
    overlay.innerHTML = `
      <div class="tour-scrim">
        <svg class="tour-mask-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="tourSpotlightMask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect id="tourHoleRect" x="0" y="0" width="0" height="0" rx="10" ry="10" fill="black" />
            </mask>
          </defs>
          <rect class="tour-mask-bg" x="0" y="0" width="100%" height="100%" fill="rgba(10, 10, 12, 0.55)" mask="url(#tourSpotlightMask)" />
        </svg>
        <div id="tourSpotlightFrame" class="tour-spotlight-frame"></div>
      </div>`;
    document.body.appendChild(overlay);
    const bg = overlay.querySelector('.tour-mask-bg');
    if (bg) bg.addEventListener('click', () => { exitTour(); });
  }
  return overlay;
}

function tourCurrentIndex() {
  return parseInt(localStorage.getItem(TOUR_LS_INDEX) || '0', 10);
}

function tourGoTo(idx) {
  localStorage.setItem(TOUR_LS_INDEX, String(idx));
  const entry = TOUR_FLAT_STEPS[idx];
  if (!entry) { exitTour(); return; }
  if (entry.page !== getTourCurrentPage()) {
    window.location.href = getTourPageUrl(entry.page);
    return;
  }
  renderTourStep(idx);
}

function startTour() {
  tourLastFocus = document.activeElement;
  localStorage.setItem(TOUR_LS_ACTIVE, '1');
  localStorage.setItem(TOUR_LS_INDEX, '0');
  const page = getTourCurrentPage();
  if (page !== TOUR_PAGE_ORDER[0]) {
    window.location.href = getTourPageUrl(TOUR_PAGE_ORDER[0]);
    return;
  }
  renderTourStep(0);
}

function exitTour() {
  localStorage.setItem('adt_tour_prompted', 'true');
  localStorage.removeItem(TOUR_LS_ACTIVE);
  localStorage.removeItem(TOUR_LS_INDEX);
  closeTourOverlay();
}

function tourAdvance() {
  const next = tourCurrentIndex() + 1;
  if (next >= TOUR_FLAT_STEPS.length) {
    exitTour();
    showToast('Tour complete.');
    if (typeof playAudioCue === 'function') playAudioCue('chime');
    return;
  }
  tourGoTo(next);
  if (typeof playAudioCue === 'function') playAudioCue('step');
}

function tourBack() {
  const prev = tourCurrentIndex() - 1;
  if (prev < 0) return;
  tourGoTo(prev);
}

function renderTourStep(idx) {
  const entry = TOUR_FLAT_STEPS[idx];
  if (!entry) { exitTour(); return; }

  let target = document.querySelector(entry.sel);
  if (!target) target = document.body;

  document.body.classList.add('tour-active');
  const overlay = ensureTourOverlay();

  const isFirst = idx === 0;
  const isLast = idx === TOUR_FLAT_STEPS.length - 1;

  // Card is a direct child of <body> so its z-index: 10012 is in the root
  // stacking context — always above the highlight frame (10011) and scrim (10010).
  let card = document.getElementById('tourCard');
  if (!card) {
    card = document.createElement('div');
    card.className = 'tour-card';
    card.id = 'tourCard';
    card.setAttribute('role', 'document');
    document.body.appendChild(card);
  }
  card.innerHTML = `
      <div class="tour-card-head">
        <span class="tour-progress">${idx + 1} / ${TOUR_FLAT_STEPS.length}</span>
        <button type="button" class="tour-close" id="tourCloseBtn" aria-label="End tour">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="tour-title">${entry.title}</div>
      <div class="tour-body">${entry.body}</div>
      <div class="tour-actions">
        <button type="button" class="tour-btn-secondary" id="tourBackBtn" ${isFirst ? 'disabled' : ''}>Back</button>
        <button type="button" class="tour-btn-primary" id="tourNextBtn">${isLast ? 'Finish' : 'Next'}</button>
      </div>`;

  document.getElementById('tourCloseBtn').addEventListener('click', () => { exitTour(); });
  document.getElementById('tourNextBtn').addEventListener('click', tourAdvance);
  document.getElementById('tourBackBtn').addEventListener('click', tourBack);

  document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
  if (target !== document.body) {
    target.classList.add('tour-highlight');
    target.scrollIntoView({ block: 'center', behavior: tourReducedMotion() ? 'auto' : 'smooth' });
  }

  // scrollIntoView with smooth behavior spans multiple frames — wait for two consecutive frames with an unchanged rect.
  const waitForScrollSettle = (cb) => {
    if (tourReducedMotion() || target === document.body) { cb(); return; }
    let last = null, stableFrames = 0, tries = 0;
    const check = () => {
      const r = target.getBoundingClientRect();
      const key = `${r.top}:${r.bottom}:${r.left}:${r.right}`;
      if (key === last) stableFrames++; else stableFrames = 0;
      last = key;
      tries++;
      if (stableFrames >= 2 || tries > 30) { cb(); return; }
      requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  };

  requestAnimationFrame(() => {
    overlay.classList.add('open');
    waitForScrollSettle(() => {
      updateTourSpotlight(target);
      positionTourCard(target);
      // Focus the primary action each render
      const nextBtn = document.getElementById('tourNextBtn');
      if (nextBtn) nextBtn.focus();
    });
  });
}

function positionTourCard(target) {
  const card = document.getElementById('tourCard');
  if (!card) return;

  // On narrow viewports, clear any previous inline positioning so the CSS
  // @media (max-width: 720px) rule pins the card to the bottom of the screen.
  if (window.innerWidth < 720) {
    card.style.cssText = '';
    return;
  }

  const rect = target && target !== document.body ? target.getBoundingClientRect() : null;
  const cardH = card.offsetHeight || 220;
  const cardW = card.offsetWidth || 340;
  // A target covering most of the viewport (e.g. #hero) leaves no side
  // with enough clearance to place the card without overlapping it —
  // fall back to the centered modal instead of computing a colliding spot.
  const targetTooLarge = rect && (rect.height > window.innerHeight * 0.75 || rect.width > window.innerWidth * 0.9);

  if (!rect || targetTooLarge) {
    // Dead-center can still land on top of large in-flow content the
    // target wraps (e.g. #hero contains .status-card on index.html) —
    // if the centered spot would overlap something like that, slide to
    // whichever side has more clear room instead of covering it.
    const obstacle = document.querySelector('.status-card');
    const obsRect = obstacle ? obstacle.getBoundingClientRect() : null;
    const centeredRect = obsRect ? {
      top: window.innerHeight / 2 - cardH / 2,
      bottom: window.innerHeight / 2 + cardH / 2,
      left: window.innerWidth / 2 - cardW / 2,
      right: window.innerWidth / 2 + cardW / 2,
    } : null;
    const overlaps = centeredRect && obsRect &&
      centeredRect.left < obsRect.right && centeredRect.right > obsRect.left &&
      centeredRect.top < obsRect.bottom && centeredRect.bottom > obsRect.top;

    card.style.position = 'fixed';
    if (overlaps) {
      const roomLeft = obsRect.left;
      const roomRight = window.innerWidth - obsRect.right;
      card.style.top = '50%';
      card.style.transform = 'translateY(-50%)';
      if (roomLeft >= cardW + 32) {
        card.style.left = '16px';
        card.style.right = 'auto';
      } else if (roomRight >= cardW + 32) {
        card.style.right = '16px';
        card.style.left = 'auto';
      } else {
        // Neither side has clearance (narrow viewport where the status
        // card also spans wide) — drop below it instead of overlapping.
        card.style.top = (obsRect.bottom + 16) + 'px';
        card.style.left = '50%';
        card.style.right = 'auto';
        card.style.transform = 'translateX(-50%)';
      }
    } else {
      card.style.top = '50%';
      card.style.left = '50%';
      card.style.right = 'auto';
      card.style.transform = 'translate(-50%, -50%)';
    }
    return;
  }

  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const spaceLeft = rect.left;
  const spaceRight = window.innerWidth - rect.right;

  // 1. Below target
  if (spaceBelow > cardH + 24) {
    let left = rect.left;
    left = Math.max(16, Math.min(left, window.innerWidth - cardW - 16));
    card.style.position = 'fixed';
    card.style.left = left + 'px';
    card.style.right = 'auto';
    card.style.top = (rect.bottom + 16) + 'px';
    card.style.transform = 'none';
    return;
  }

  // 2. Above target
  if (spaceAbove > cardH + 24) {
    let left = rect.left;
    left = Math.max(16, Math.min(left, window.innerWidth - cardW - 16));
    card.style.position = 'fixed';
    card.style.left = left + 'px';
    card.style.right = 'auto';
    card.style.top = (rect.top - cardH - 16) + 'px';
    card.style.transform = 'none';
    return;
  }

  // 3. Side placement (for 2-column layouts like contact.html where vertical space is constrained)
  if (spaceLeft >= cardW + 24) {
    let top = Math.max(16, Math.min(rect.top + (rect.height - cardH) / 2, window.innerHeight - cardH - 16));
    card.style.position = 'fixed';
    card.style.left = (rect.left - cardW - 20) + 'px';
    card.style.right = 'auto';
    card.style.top = top + 'px';
    card.style.transform = 'none';
    return;
  }

  if (spaceRight >= cardW + 24) {
    let top = Math.max(16, Math.min(rect.top + (rect.height - cardH) / 2, window.innerHeight - cardH - 16));
    card.style.position = 'fixed';
    card.style.left = (rect.right + 20) + 'px';
    card.style.right = 'auto';
    card.style.top = top + 'px';
    card.style.transform = 'none';
    return;
  }

  // 4. Centered fallback
  card.style.position = 'fixed';
  card.style.left = '50%';
  card.style.top = '50%';
  card.style.right = 'auto';
  card.style.transform = 'translate(-50%, -50%)';
}

function closeTourOverlay() {
  document.body.classList.remove('tour-active');
  const overlay = document.getElementById('tourOverlay');
  document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
  if (tourLastFocus) { tourLastFocus.focus(); tourLastFocus = null; }
  // Toggle .open off only
  if (overlay) overlay.classList.remove('open');
  const hole = document.getElementById('tourHoleRect');
  if (hole) {
    hole.setAttribute('x', '0');
    hole.setAttribute('y', '0');
    hole.setAttribute('width', '0');
    hole.setAttribute('height', '0');
  }
  const frame = document.getElementById('tourSpotlightFrame');
  if (frame) frame.style.display = 'none';
  // Card now lives outside the overlay — clean it up on close.
  const card = document.getElementById('tourCard');
  if (card) card.remove();
}

function initTour() {
  ensureTourOverlay();

  document.addEventListener('click', e => {
    const tourTrigger = e.target.closest('#navTourBtn, #drawerTourBtn, [data-action="start-tour"]');
    if (tourTrigger) {
      e.preventDefault();
      startTour();
    }
  });

  if (localStorage.getItem(TOUR_LS_ACTIVE) === '1') {
    tourLastFocus = document.activeElement;
    const idx = tourCurrentIndex();
    const entry = TOUR_FLAT_STEPS[idx];
    const currentPage = getTourCurrentPage();

    if (!entry || entry.page !== currentPage) {
      if (TOUR_PAGE_ORDER.includes(currentPage)) {
        const pageStepIdx = TOUR_FLAT_STEPS.findIndex(s => s.page === currentPage);
        if (pageStepIdx !== -1) {
          localStorage.setItem(TOUR_LS_INDEX, pageStepIdx);
          const resume = () => requestAnimationFrame(() => renderTourStep(pageStepIdx));
          if (document.readyState === 'complete') resume();
          else window.addEventListener('load', resume, { once: true });
        } else {
          exitTour();
        }
      } else {
        exitTour();
      }
    } else {
      const resume = () => requestAnimationFrame(() => renderTourStep(idx));
      if (document.readyState === 'complete') resume();
      else window.addEventListener('load', resume, { once: true });
    }
  }

  const updateActiveSpotlight = () => {
    const overlay = document.getElementById('tourOverlay');
    if (!overlay || !overlay.classList.contains('open')) return;
    const highlighted = document.querySelector('.tour-highlight');
    if (highlighted) {
      updateTourSpotlight(highlighted);
      positionTourCard(highlighted);
    }
  };

  window.addEventListener('resize', updateActiveSpotlight);
  window.addEventListener('scroll', updateActiveSpotlight, { passive: true });

  document.addEventListener('keydown', e => {
    const overlay = document.getElementById('tourOverlay');
    if (!overlay || !overlay.classList.contains('open')) return;
    if (e.key === 'Escape') { exitTour(); }
    else if (e.key === 'ArrowRight') { tourAdvance(); }
    else if (e.key === 'ArrowLeft') { tourBack(); }
  });

  // Auto-prompt visitor for guided site tour after 3.5s on first visit
  const PROMPT_LS_KEY = 'adt_tour_prompted';
  if (!localStorage.getItem(PROMPT_LS_KEY) && !localStorage.getItem(TOUR_LS_ACTIVE)) {
    setTimeout(() => {
      if (localStorage.getItem(PROMPT_LS_KEY) || localStorage.getItem(TOUR_LS_ACTIVE)) return;
      promptGuidedTour();
    }, 3500);
  }
}

function promptGuidedTour() {
  const PROMPT_LS_KEY = 'adt_tour_prompted';
  localStorage.setItem(PROMPT_LS_KEY, 'true');

  let banner = document.getElementById('tourPromptBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'tourPromptBanner';
    banner.className = 'tour-prompt-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Guided tour invitation');
    banner.innerHTML = `
      <div class="tour-prompt-content">
        <span class="tour-prompt-icon">🗺️</span>
        <div class="tour-prompt-text">
          <strong>New to ADT Portfolio?</strong>
          <span>Would you like a quick guided tour of the site?</span>
        </div>
      </div>
      <div class="tour-prompt-actions">
        <button type="button" id="tourPromptStartBtn" class="tour-prompt-btn primary">Start Tour</button>
        <button type="button" id="tourPromptDismissBtn" class="tour-prompt-btn secondary">No thanks</button>
      </div>
    `;
    document.body.appendChild(banner);

    const dismiss = () => {
      banner.classList.remove('open');
      setTimeout(() => banner.remove(), 450);
    };

    document.getElementById('tourPromptStartBtn').addEventListener('click', () => {
      dismiss();
      startTour();
    });

    document.getElementById('tourPromptDismissBtn').addEventListener('click', () => {
      dismiss();
    });
  }

  requestAnimationFrame(() => banner.classList.add('open'));
}