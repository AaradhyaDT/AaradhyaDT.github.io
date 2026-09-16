/* ============================================================
   MODULE: ui.js — aaradhyadt.github.io (v54.6)
   UI modals, count-up, skill radar, ATS resume, and overlays.
   ============================================================ */

/* ── What's New modal ───────────────────────────────────────── */
function openWhatsNewModal() {
  let modal = document.getElementById('whatsNewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'whatsNewModal';
    modal.className = 'access-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', "What's New — Major Releases");
    document.body.appendChild(modal);
  }

  const releasesHtml = SITE_RELEASES.map(rel => `
    <div class="wn-card">
      <div class="wn-card-header">
        <span class="wn-badge">${rel.version}</span>
        <span class="wn-title">${rel.title}</span>
        <div class="wn-meta">
          <span class="wn-date">${rel.date}</span> · 
          <a class="wn-sha" href="https://github.com/AaradhyaDT/AaradhyaDT.github.io/commit/${rel.sha}" target="_blank" rel="noopener">${rel.sha} ↗</a>
        </div>
      </div>
      <ul class="wn-highlights">
        ${rel.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  modal.innerHTML = `
    <div class="access-modal-card wn-modal-card">
      <div class="access-modal-header">
        <div class="access-modal-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <span>What's New — Major Releases</span>
        </div>
        <button type="button" class="access-modal-close" id="wnModalClose" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="wn-modal-body">
        ${releasesHtml}
      </div>
      <div class="wn-modal-footer">
        <span>Press <kbd>Shift+N</kbd> anytime to open What's New</span>
      </div>
    </div>
  `;

  document.getElementById('wnModalClose').addEventListener('click', closeWhatsNewModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeWhatsNewModal(); });

  localStorage.setItem('adt_last_seen_release', SITE_RELEASES[0].version);
  requestAnimationFrame(() => modal.classList.add('open'));
  document.body.style.overflow = 'hidden';
  if (typeof playAudioCue === 'function') playAudioCue('open');
}

function closeWhatsNewModal() {
  const modal = document.getElementById('whatsNewModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (typeof playAudioCue === 'function') playAudioCue('close');
}



/* ── Scroll-Triggered Count-Up Animation (v35) ─────────────── */
function initCountUp() {
  const statCells = document.querySelectorAll('.stat-cell');
  if (!statCells.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cell = entry.target;
        const numEl = cell.querySelector('.stat-num');
        if (numEl && !numEl.classList.contains('counted')) {
          numEl.classList.add('counted');
          animateNum(numEl);
        }
        observer.unobserve(cell);
      }
    });
  }, { threshold: 0.25 });

  statCells.forEach(cell => observer.observe(cell));

  function animateNum(el) {
    const rawText = el.getAttribute('data-count-target') || el.textContent.trim();
    const match = rawText.match(/^(\d+)(.*)$/);
    if (!match) return;

    const targetVal = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const spanSuffix = el.querySelector('span')?.outerHTML || (suffix ? `<span>${suffix}</span>` : '');
    const startTime = performance.now();
    const duration = 1200;

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const spring = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress) * Math.cos((progress * 10 - 0.75) * ((2 * Math.PI) / 3));
      const current = Math.min(targetVal, Math.floor(spring * targetVal));

      el.innerHTML = `${current}${spanSuffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.innerHTML = `${targetVal}${spanSuffix}`;
      }
    }

    requestAnimationFrame(step);
  }
}



/* ── Typed Hero Subtitle Animation (v35) ───────────────────── */
function initTypedCaption() {
  const el = document.getElementById('hero-caption');
  if (!el) return;

  const CAPTIONS = [
    'No subscriptions — just time, iteration, and a lot of debugging.',
    'Building at the convergence of embedded firmware & applied ML.',
    'Designing resilient systems from PCB traces to edge neural nets.',
    'Engineered for clarity, speed, and real-time responsiveness.',
    'Exploring robotics, wireless mesh networks, and IoT telemetry.',
    'Continuously benchmarking, testing, and shipping upgrades.'
  ];

  const caption = CAPTIONS[Math.floor(Math.random() * CAPTIONS.length)];
  el.textContent = '';
  el.style.opacity = '1';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = caption;
    return;
  }

  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  cursor.textContent = '|';

  function typeChar() {
    if (i < caption.length) {
      el.textContent = caption.substring(0, i + 1);
      el.appendChild(cursor);
      i++;
      setTimeout(typeChar, 25 + Math.random() * 20);
    } else {
      setTimeout(() => cursor.remove(), 2800);
    }
  }

  setTimeout(typeChar, 600);
}



/* ── Reading Time & Word Count Metrics (v38) ──────────────── */
function initReadingMetrics() {
  const main = document.getElementById('main-content');
  const header = document.getElementById('page-header') || document.querySelector('.hero-header');
  if (!main || !header || header.querySelector('.reading-time-badge')) return;

  const page = location.pathname.split('/').pop() || 'index.html';
  if (!['about.html', 'journey.html', 'experience.html', 'achievements.html', 'projects.html'].includes(page)) return;

  const textNodes = main.querySelectorAll('p, li, .achievement-desc, .project-desc, .journey-desc');
  let fullText = '';
  textNodes.forEach(node => { fullText += ' ' + node.textContent; });

  const words = fullText.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  if (wordCount < 50) return;

  const readMins = Math.max(1, Math.ceil(wordCount / 200));

  const badge = document.createElement('div');
  badge.className = 'reading-time-badge';
  badge.setAttribute('aria-label', `Estimated reading time: ${readMins} minute${readMins > 1 ? 's' : ''}`);
  badge.innerHTML = `
    <span class="reading-time-badge-icon">⏱️</span>
    <span>${readMins} min read</span>
    <span style="opacity:0.4;">·</span>
    <span style="opacity:0.75;">${wordCount.toLocaleString()} words</span>
  `;
  header.appendChild(badge);
}



/* ── Live Result Count & Filter Indicators (v38) ───────────── */
function initFilterCountIndicators() {
  const page = location.pathname.split('/').pop() || 'index.html';

  if (page === 'projects.html') {
    const header = document.getElementById('page-header');
    const grid = document.getElementById('projectsGrid');
    if (!header || !grid) return;

    let badge = header.querySelector('.filter-count-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'filter-count-badge';
      const title = header.querySelector('.page-title') || header;
      title.appendChild(badge);
    }

    function updateProjectCount() {
      const cards = grid.querySelectorAll('.project-card');
      const visible = Array.from(cards).filter(c => getComputedStyle(c).display !== 'none');
      badge.textContent = `${visible.length} of ${cards.length} projects`;
    }

    const observer = new MutationObserver(updateProjectCount);
    observer.observe(grid, { attributes: true, subtree: true, attributeFilter: ['style', 'class'] });
    updateProjectCount();

  } else if (page === 'achievements.html') {
    const legend = document.querySelector('.achv-legends') || document.getElementById('page-header');
    const list = document.getElementById('achievementsList');
    if (!legend || !list) return;

    let badge = legend.querySelector('.filter-count-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'filter-count-badge';
      legend.appendChild(badge);
    }

    function updateAchvCount() {
      const items = list.querySelectorAll('.achievement-item');
      const visible = Array.from(items).filter(item => getComputedStyle(item).display !== 'none');
      badge.textContent = `${visible.length} of ${items.length} achievements`;
    }

    const observer = new MutationObserver(updateAchvCount);
    observer.observe(list, { attributes: true, subtree: true, attributeFilter: ['style', 'class'] });
    updateAchvCount();
  }
}





/* ── Cert/CV lightbox (index, achievements, experience) ───── */
// Shared across the three pages that render #cert-lightbox markup.
// No-ops on pages without it. `.cert-btn` triggers via data-cert /
// data-label / data-type attributes; preventDefault() is required
// because index.html's cert-btn is an <a download>, and is a no-op
// on the <button> variants used elsewhere.
function initLightbox() {
  const lb = document.getElementById('cert-lightbox');
  if (!lb) return;

  const lbBody = document.getElementById('lb-body');
  const lbLabel = document.getElementById('lb-label');
  const lbDownload = document.getElementById('lb-download');
  const lbOpen = document.getElementById('lb-open');
  const lbClose = document.getElementById('lb-close');
  let lastFocus = null;

  function openLightbox(src, label, type, downloadSrc, verifyUrl) {
    lastFocus = document.activeElement;
    lbLabel.textContent = label;
    lbDownload.href = downloadSrc || src;
    lbOpen.href = src;
    lbBody.innerHTML = '';

    if (verifyUrl) {
      const lbVerify = document.getElementById('lb-verify');
      lbVerify.href = verifyUrl;
      lbVerify.hidden = false;
    }

    if (type === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = src + '#toolbar=1&view=FitH';
      iframe.title = label;
      lbBody.appendChild(iframe);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = label;
      lbBody.appendChild(img);
    }

    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
    if (typeof playAudioCue === 'function') playAudioCue('open');
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbBody.innerHTML = ''; }, 230);
    const lbVerify = document.getElementById('lb-verify');
    if (lbVerify) {
      lbVerify.hidden = true;
      lbVerify.href = '#';
    }
    if (lastFocus) lastFocus.focus();
    if (typeof playAudioCue === 'function') playAudioCue('close');
  }

  lb.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeLightbox();
      return;
    }
    if (e.key === 'Tab') {
      const focusables = lb.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const focusableArr = Array.prototype.slice.call(focusables).filter(el => !el.hidden && el.offsetParent !== null);
      if (focusableArr.length === 0) return;
      const first = focusableArr[0];
      const last = focusableArr[focusableArr.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  });

  document.addEventListener('click', event => {
    const btn = event.target.closest('.cert-btn');
    if (!btn) return;
    event.preventDefault();
    openLightbox(btn.dataset.cert, btn.dataset.label, btn.dataset.type, btn.dataset.download, btn.dataset.verify);
  });

  lbClose.addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox();
  });
}



/* ── Keyboard page navigation (1–7) ──────────────────────── */
// 1 → index.html  2 → projects.html  3 → experience.html
// 4 → achievements.html  5 → about.html  6 → journey.html
// 7 → contact.html
// 0 → toggle theme
// ` → toggle hero date B.S. / A.D. (index.html only; no-op elsewhere)
// Shift+4 → toggle Academic / Extracurricular track (achievements.html only; no-op elsewhere)
// Alt+2 → expand/collapse all project cards (projects.html only; no-op elsewhere)
// Alt+4 → expand/collapse all years (achievements.html only; no-op elsewhere)
// Alt+6 → expand/collapse all checkpoints (journey.html only; no-op elsewhere)
// Skipped when focus is inside an input, textarea, or select.
function initKeyNav() {
  const PAGE_MAP = {
    '1': 'index.html',
    '2': 'projects.html',
    '3': 'experience.html',
    '4': 'achievements.html',
    '5': 'about.html',
    '6': 'journey.html',
    '7': 'contact.html',
  };
  document.addEventListener('keydown', e => {
    const tag = (document.activeElement || {}).tagName || '';
    if (/^(INPUT|TEXTAREA|SELECT)$/i.test(tag) || document.activeElement?.isContentEditable) return;
    if (e.metaKey || e.ctrlKey) return;

    if (e.key === '?' || (e.shiftKey && (e.key === '/' || e.code === 'Slash'))) {
      e.preventDefault();
      toggleShortcutsModal();
      return;
    }

    if (e.altKey && e.key === '2') {
      const projectToggleAllBtn = document.getElementById('projectToggleAllBtn');
      if (projectToggleAllBtn) {
        projectToggleAllBtn.click();
      }
      return;
    }

    if (e.altKey && (e.key === '4' || e.key === '$')) {
      const toggleAllBtn = document.getElementById('toggleAllBtn');
      if (toggleAllBtn) {
        toggleAllBtn.click();
      }
      return;
    }

    if (e.altKey && (e.key === '6' || e.key === '^')) {
      const journeyToggleAllBtn = document.getElementById('journeyToggleAllBtn');
      if (journeyToggleAllBtn) {
        journeyToggleAllBtn.click();
      }
      return;
    }

    if (e.key === '0') {
      toggleTheme();
      return;
    }

    if (e.key === '`' || e.code === 'Backquote') {
      toggleStatusDate();
      return;
    }

    if (e.shiftKey && (e.key === 'N' || e.key === 'n')) {
      openWhatsNewModal();
      return;
    }

    if (e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      toggleAudioCues();
      return;
    }

    if (e.shiftKey && (e.key === 'T' || e.key === 't')) {
      startTour();
      return;
    }

    if (e.shiftKey && (e.key === 'G' || e.key === 'g')) {
      if (typeof openGraphModal === 'function') openGraphModal();
      return;
    }

    if (e.shiftKey && (e.key === '4' || e.key === '$')) {
      const academicBtn = document.getElementById('trackAcademicBtn');
      const ecaBtn = document.getElementById('trackEcaBtn');
      if (academicBtn && ecaBtn) {
        (academicBtn.classList.contains('is-active') ? ecaBtn : academicBtn).click();
      }
      return;
    }

    if (!PAGE_MAP[e.key]) return;
    window.location.href = PAGE_MAP[e.key];
  });
}



/* ── Hardware-Accelerated Cursor Light Trail (v33) ──────────── */
(function initCursorTrail() {
  if (typeof window === 'undefined') return;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let lastX = 0, lastY = 0;
  let ticking = false;

  document.addEventListener('mousemove', e => {
    lastX = e.clientX;
    lastY = e.clientY;
    if (!ticking) {
      requestAnimationFrame(() => {
        if (Math.random() < 0.22) {
          spawnParticle(lastX, lastY);
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  function spawnParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'cursor-trail-particle';
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    document.body.appendChild(p);

    setTimeout(() => p.remove(), 450);
  }
})();



/* ── Universal Master Escape Key Listener ────────────────────
   Guarantees that pressing the Escape key closes ANY overlay,
   modal, popup, drawer, lightbox, tour step, open details card,
   or active input focus anywhere across the site. */
(function initMasterEscapeHandler() {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;

    // 0. Tour Prompt Banner
    const tourPrompt = document.getElementById('tourPromptBanner');
    if (tourPrompt && tourPrompt.classList.contains('open')) {
      tourPrompt.classList.remove('open');
      setTimeout(() => tourPrompt.remove(), 400);
      return;
    }

    // 1. Guided Site Tour
    const tourOverlay = document.getElementById('tourOverlay');
    if (tourOverlay && tourOverlay.classList.contains('open')) {
      if (typeof exitTour === 'function') exitTour();
      return;
    }

    // 2. Certificate / CV Lightbox
    const certLb = document.getElementById('cert-lightbox') || document.getElementById('certLightbox');
    if (certLb && certLb.classList.contains('open')) {
      if (typeof closeLightbox === 'function') closeLightbox();
      return;
    }

    // 3. Global Search Palette (CMDK)
    const cmdk = document.getElementById('cmdk');
    if (cmdk && cmdk.classList.contains('open')) {
      if (typeof closeCmdk === 'function') closeCmdk();
      return;
    }

    // 3.5. Keyboard Shortcuts Cheat Sheet HUD (v51)
    const shortcutsModal = document.getElementById('shortcutsModal');
    if (shortcutsModal && shortcutsModal.classList.contains('open')) {
      if (typeof closeShortcutsModal === 'function') closeShortcutsModal();
      return;
    }

    // 4.5. ATS Resume Generator Modal (v43)
    const resumeModal = document.getElementById('resumeModalOverlay');
    if (resumeModal && resumeModal.classList.contains('open')) {
      if (typeof closeResumeGenerator === 'function') closeResumeGenerator();
      return;
    }

    // 4. What's New Modal
    const wnModal = document.getElementById('whatsNewModal');
    if (wnModal && wnModal.classList.contains('open')) {
      if (typeof closeWhatsNewModal === 'function') closeWhatsNewModal();
      return;
    }

    // 5. Access Control / VIP Modal
    const accessOverlay = document.getElementById('accessModalOverlay');
    if (accessOverlay && accessOverlay.classList.contains('open')) {
      if (typeof closeAccessModal === 'function') closeAccessModal();
      return;
    }

    // 6. Logout Confirmation Modal
    const logoutOverlay = document.getElementById('logoutModalOverlay');
    if (logoutOverlay && (logoutOverlay.classList.contains('open') || logoutOverlay.classList.contains('visible'))) {
      if (typeof closeLogoutModal === 'function') closeLogoutModal();
      else logoutOverlay.remove();
      return;
    }

    // 7. Mobile Navigation Drawer
    const drawer = document.getElementById('navDrawer');
    const backdrop = document.getElementById('navDrawerBackdrop');
    const hamburger = document.getElementById('navHamburger');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      if (hamburger) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
      }
      document.body.style.overflow = '';
      return;
    }

    // 8. Open <details> cards (close active/focused or open details elements)
    const active = document.activeElement;
    if (active && active.closest('details[open]')) {
      active.closest('details[open]').removeAttribute('open');
      return;
    }
    const openDetails = document.querySelectorAll('details[open]');
    if (openDetails.length > 0) {
      openDetails[openDetails.length - 1].removeAttribute('open');
      return;
    }

    // 9. Interactive Dev Terminal (blur input focus)
    if (active && active.closest('#adtTerminal')) {
      active.blur();
      return;
    }
  }, true);
})();

/* ── Interactive Skill Radar & Domain Competency Visualizer (v48) ── */
const SKILL_RADAR_DOMAINS = [
  { label: 'AI/ML & GenAI', score: 0.94, desc: 'Transformers, PyTorch, Agentic AI, RAG Pipelines, SHAP Explainability, Scikit-Learn', tags: ['PyTorch', 'Agentic RAG', 'Transformers', 'FastAPI'] },
  { label: 'Embedded C/C++', score: 0.90, desc: 'FreeRTOS multi-threading, ESP32, STM32, ARM Cortex-M, SPI/I2C/UART bus tuning', tags: ['FreeRTOS', 'ESP32', 'C++20', 'Micro-Controllers'] },
  { label: 'Electronics & PCB', score: 0.92, desc: 'KiCAD Multi-Layer PCB layout, Active analog signal filters, IMU MPU6050 calibration', tags: ['KiCAD', 'SPARK', 'Analog Circuits', 'PCB Design'] },
  { label: 'Full-Stack Web', score: 0.88, desc: 'Vanilla JS ES6+, PWA Offline Architecture, Node.js, WebSockets, Web Crypto, REST APIs', tags: ['JavaScript', 'PWA / Service Worker', 'WebSockets', 'Node.js'] },
  { label: 'Data Science & Omics', score: 0.89, desc: 'Pandas/NumPy, GCSBR Signal Telemetry, Genomic eQTL Analysis, Statistical Modeling', tags: ['Data Science', 'Genomics', 'Pandas', 'Telemetry'] },
  { label: 'Leadership & Applied Strategy', score: 0.91, desc: 'IEEE event ops & mentorship, security-first risk framing, agile delivery, cross-functional case studies', tags: ['IEEE Ops', 'Mentorship', 'Security Mindset', 'Agile'] }
];

function initRadarCanvas(canvasId, domainSelector) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const domains = SKILL_RADAR_DOMAINS;
  const numSides = domains.length;
  let activeIndex = 0;

  function renderRadar() {
    const container = canvas.parentElement;
    const containerWidth = container ? container.clientWidth : 280;
    const size = Math.min(300, Math.max(220, containerWidth > 0 ? containerWidth : 280));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== size * dpr || canvas.height !== size * dpr) {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = size + 'px';
      canvas.style.height = size + 'px';
      canvas.style.maxWidth = '100%';
    }

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.25;

    // Abbreviated labels for canvas (full names in domain cards)
    const shortLabels = domains.map(d => {
      if (d.label.length > 16) {
        // Shorten "Leadership & Applied Strategy" → "Leadership"
        // Shorten "Data Science & Omics" → "Data Sci & Omics"
        const parts = d.label.split(' & ');
        if (parts.length === 2 && d.label.length > 20) return parts[0];
        return d.label.length > 18 ? d.label.substring(0, 16) + '…' : d.label;
      }
      return d.label;
    });

    function getPointCoordinates(index, scale) {
      const angle = (Math.PI * 2 / numSides) * index - Math.PI / 2;
      return {
        x: centerX + Math.cos(angle) * (radius * scale),
        y: centerY + Math.sin(angle) * (radius * scale)
      };
    }

    // 1. Render Concentric Web Grids & Scale Tier Legends
    const levels = 4;
    for (let l = 1; l <= levels; l++) {
      const levelScale = l / levels;
      ctx.beginPath();
      for (let i = 0; i < numSides; i++) {
        const pt = getPointCoordinates(i, levelScale);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.strokeStyle = l === levels ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Tier percentage label on vertical axis
      ctx.font = '8px "DM Mono", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${l * 25}%`, centerX, centerY - (radius * levelScale) - 2);
    }

    // 2. Render Radial Spokes
    for (let i = 0; i < numSides; i++) {
      const pt = getPointCoordinates(i, 1);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(pt.x, pt.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
      ctx.stroke();
    }

    // 3. Draw Filled Data Polygon
    ctx.beginPath();
    for (let i = 0; i < numSides; i++) {
      const pt = getPointCoordinates(i, domains[i].score);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();

    const grad = ctx.createRadialGradient(centerX, centerY, 8, centerX, centerY, radius);
    grad.addColorStop(0, 'rgba(212, 168, 90, 0.45)');
    grad.addColorStop(1, 'rgba(109, 191, 170, 0.15)');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = '#d4a85a';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 4. Draw Data Point Nodes
    for (let i = 0; i < numSides; i++) {
      const pt = getPointCoordinates(i, domains[i].score);
      const isSelected = (i === activeIndex);

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, isSelected ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? '#ffffff' : '#d4a85a';
      ctx.fill();
      ctx.strokeStyle = isSelected ? '#d4a85a' : '#0d0e11';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 5. Render Outer Axis Vertex Labels & Scores
    const labelOffset = radius + 18;
    domains.forEach((dom, i) => {
      const isSelected = (i === activeIndex);
      const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      let lx = centerX + cosA * labelOffset;
      let ly = centerY + sinA * labelOffset;

      const titleFont = isSelected ? '600 9.5px "DM Mono", monospace' : '500 9px "Inter", sans-serif';
      const scoreFont = '600 8.5px "DM Mono", monospace';
      const scoreStr = `${Math.round(dom.score * 100)}%`;

      // Text alignment by position
      if (Math.abs(cosA) < 0.3) {
        ctx.textAlign = 'center';
        ctx.textBaseline = sinA < 0 ? 'bottom' : 'top';
      } else if (cosA > 0) {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
      } else {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
      }

      // Clamp to canvas bounds
      ctx.font = titleFont;
      const tw = ctx.measureText(shortLabels[i]).width;
      const pad = 4;

      if (ctx.textAlign === 'left' && lx + tw > size - pad) lx = size - pad - tw;
      if (ctx.textAlign === 'right' && lx - tw < pad) lx = pad + tw;
      if (ctx.textAlign === 'center') {
        if (lx - tw / 2 < pad) lx = pad + tw / 2;
        if (lx + tw / 2 > size - pad) lx = size - pad - tw / 2;
      }
      if (ly < pad + 10) ly = pad + 10;
      if (ly > size - pad - 10) ly = size - pad - 10;

      // Domain label
      ctx.font = titleFont;
      ctx.fillStyle = isSelected ? '#d4a85a' : 'rgba(255, 255, 255, 0.80)';
      ctx.fillText(shortLabels[i], lx, ly - 4);

      // Score
      ctx.font = scoreFont;
      ctx.fillStyle = isSelected ? '#ffffff' : 'rgba(212, 168, 90, 0.9)';
      ctx.fillText(scoreStr, lx, ly + 7);
    });

    ctx.restore();
  }

  renderRadar();

  // ResizeObserver for dynamic responsiveness
  if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
    if (canvas._radarResizeObs) {
      canvas._radarResizeObs.disconnect();
    }
    const ro = new ResizeObserver(() => {
      renderRadar();
    });
    ro.observe(canvas.parentElement);
    canvas._radarResizeObs = ro;
  }

  // Wire domain list hover & clicks
  const domainItems = typeof domainSelector === 'string' ? document.querySelectorAll(domainSelector) : domainSelector;
  if (domainItems && domainItems.length) {
    domainItems.forEach((item, idx) => {
      item.addEventListener('mouseenter', () => {
        activeIndex = idx;
        domainItems.forEach(d => d.classList.remove('active'));
        item.classList.add('active');
        renderRadar();
      });
      item.addEventListener('click', () => {
        activeIndex = idx;
        domainItems.forEach(d => d.classList.remove('active'));
        item.classList.add('active');
        renderRadar();
        if (typeof triggerHapticFeedback === 'function') triggerHapticFeedback('light');
      });
    });
  }
}

function openSkillRadarModal() {
  let modal = document.getElementById('skillRadarModalOverlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'skillRadarModalOverlay';
    modal.className = 'resume-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Interactive Skill Radar Visualizer');
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="resume-modal-card" style="max-width: 820px;">
      <div class="resume-modal-header">
        <div class="resume-modal-title">
          <span>5-Domain Skill Radar &amp; Competency Visualizer</span>
        </div>
        <button type="button" class="access-modal-close" id="skillRadarModalClose" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div style="padding: 1.25rem 1.5rem 1.75rem; overflow-y: auto; max-height: calc(85vh - 70px);">
        <div class="radar-layout-grid">
          <div class="radar-canvas-container">
            <canvas id="modalSkillRadarCanvas" class="radar-canvas" width="300" height="300"></canvas>
          </div>
          <div class="radar-domains-list" id="modalRadarDomainsList">
            ${SKILL_RADAR_DOMAINS.map((d, i) => `
              <div class="domain-item ${i === 0 ? 'active' : ''}" data-domain="${i}">
                <div class="domain-item-head">
                  <span>${d.label}</span>
                  <span class="domain-score">${Math.round(d.score * 100)}%</span>
                </div>
                <div class="domain-desc">${d.desc}</div>
                <div class="domain-tech-tags">
                  ${d.tags.map(t => `<span class="domain-tech-tag">${t}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('skillRadarModalClose').addEventListener('click', closeSkillRadarModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeSkillRadarModal(); });

  requestAnimationFrame(() => modal.classList.add('open'));
  document.body.style.overflow = 'hidden';
  if (typeof playAudioCue === 'function') playAudioCue('open');

  initRadarCanvas('modalSkillRadarCanvas', '#modalRadarDomainsList .domain-item');
}

function closeSkillRadarModal() {
  const modal = document.getElementById('skillRadarModalOverlay');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (typeof playAudioCue === 'function') playAudioCue('close');
}

function initSkillRadar(shouldScroll) {
  const inlineCanvas = document.getElementById('skillRadarCanvas');
  if (inlineCanvas) {
    initRadarCanvas('skillRadarCanvas', '.radar-domains-list .domain-item');
    if (shouldScroll) {
      const sec = document.getElementById('skill-radar');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (shouldScroll) {
    openSkillRadarModal();
  }
}

/* ── Tailored ATS Resume Generator & Exporter (v43) ── */
function getResumeContactHTML() {
  const raw = RESUME_DATA.contact || '';
  // Escape HTML then linkify known patterns; keep location plain
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  let html = esc(raw);
  html = html.replace(/aaradhyadevtmr@gmail\.com/g, '<a href="mailto:aaradhyadevtmr@gmail.com">aaradhyadevtmr@gmail.com</a>');
  html = html.replace(/\+977 9844602050/g, '<a href="tel:+9779844602050">+977 9844602050</a>');
  html = html.replace(/linkedin\.com\/in\/aaradhya-dev-tamrakar/g, '<a href="https://linkedin.com/in/aaradhya-dev-tamrakar" target="_blank" rel="noopener noreferrer">linkedin.com/in/aaradhya-dev-tamrakar</a>');
  html = html.replace(/github\.com\/AaradhyaDT/g, '<a href="https://github.com/AaradhyaDT" target="_blank" rel="noopener noreferrer">github.com/AaradhyaDT</a>');
  html = html.replace(/aaradhyadt\.github\.io/g, '<a href="https://aaradhyadt.github.io" target="_blank" rel="noopener noreferrer">aaradhyadt.github.io</a>');
  return html;
}
function getResumeContactMarkdown() {
  const raw = RESUME_DATA.contact || '';
  let md = raw;
  md = md.replace('aaradhyadevtmr@gmail.com', '[aaradhyadevtmr@gmail.com](mailto:aaradhyadevtmr@gmail.com)');
  md = md.replace('+977 9844602050', '[+977 9844602050](tel:+9779844602050)');
  md = md.replace('linkedin.com/in/aaradhya-dev-tamrakar', '[linkedin.com/in/aaradhya-dev-tamrakar](https://linkedin.com/in/aaradhya-dev-tamrakar)');
  md = md.replace('github.com/AaradhyaDT', '[github.com/AaradhyaDT](https://github.com/AaradhyaDT)');
  md = md.replace('aaradhyadt.github.io', '[aaradhyadt.github.io](https://aaradhyadt.github.io)');
  return md;
}
function generateResumePlainText(roleKey) {
  const roleData = RESUME_DATA.roles[roleKey] || RESUME_DATA.roles.all;
  let lines = [];
  lines.push(RESUME_DATA.name.toUpperCase());
  lines.push(roleData.title);
  lines.push(RESUME_DATA.contact);
  lines.push('');
  lines.push('PROFESSIONAL SUMMARY');
  lines.push('----------------------------------------');
  lines.push(RESUME_DATA.summary);
  lines.push('');

  roleData.sections.forEach(sec => {
    lines.push(sec.title.toUpperCase());
    lines.push('----------------------------------------');
    sec.items.forEach(item => {
      lines.push(item.header);
      if (item.sub) lines.push(item.sub);
      if (item.bullets && item.bullets.length) {
        item.bullets.forEach(b => lines.push(`• ${b}`));
      }
      lines.push('');
    });
  });

  return lines.join('\n').trim();
}

function generateResumeMarkdown(roleKey) {
  const roleData = RESUME_DATA.roles[roleKey] || RESUME_DATA.roles.all;
  let md = [];
  md.push(`# ${RESUME_DATA.name}`);
  md.push(`### ${roleData.title}`);
  md.push(`**Contact:** ${getResumeContactMarkdown()}`);
  md.push('');
  md.push(`## Professional Summary`);
  md.push(RESUME_DATA.summary);
  md.push('');

  roleData.sections.forEach(sec => {
    md.push(`## ${sec.title}`);
    sec.items.forEach(item => {
      md.push(`### ${item.header}`);
      if (item.sub) md.push(`*${item.sub}*`);
      md.push('');
      if (item.bullets && item.bullets.length) {
        item.bullets.forEach(b => md.push(`- ${b}`));
        md.push('');
      }
    });
  });

  return md.join('\n').trim();
}

function generateResumeJson(roleKey) {
  const roleData = RESUME_DATA.roles[roleKey] || RESUME_DATA.roles.all;
  return JSON.stringify({
    "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    "basics": {
      "name": RESUME_DATA.name,
      "label": roleData.title,
      "email": "aaradhyadevtmr@gmail.com",
      "phone": "+977 9844602050",
      "url": "https://aaradhyadt.github.io",
      "summary": RESUME_DATA.summary,
      "location": {
        "city": "Kathmandu",
        "countryCode": "NP"
      },
      "profiles": [
        {
          "network": "LinkedIn",
          "username": "aaradhya-dev-tamrakar",
          "url": "https://linkedin.com/in/aaradhya-dev-tamrakar"
        },
        {
          "network": "GitHub",
          "username": "AaradhyaDT",
          "url": "https://github.com/AaradhyaDT"
        }
      ]
    },
    "education": [
      {
        "institution": "Kathmandu Engineering College, IOE, Tribhuvan University",
        "area": "Electronics, Communication & Information Engineering",
        "studyType": "Bachelor of Engineering (BEI)",
        "startDate": "2022-11-01",
        "endDate": "2027-01-01"
      }
    ],
    "sections": roleData.sections.map(sec => ({
      "category": sec.title,
      "items": sec.items.map(item => ({
        "header": item.header,
        "subtitle": item.sub || "",
        "highlights": item.bullets || []
      }))
    }))
  }, null, 2);
}

function downloadResumeJson(roleKey) {
  const jsonStr = generateResumeJson(roleKey);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeTitle = (RESUME_DATA.roles[roleKey]?.title || 'Master_CV').replace(/[^a-zA-Z0-9]/g, '_');
  a.href = url;
  a.download = `Aaradhya_Dev_Tamrakar_Resume_${safeTitle}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('JSON Resume downloaded!');
  if (typeof playAudioCue === 'function') playAudioCue('click');
}

function downloadResumeMarkdown(roleKey) {
  const md = generateResumeMarkdown(roleKey);
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeTitle = (RESUME_DATA.roles[roleKey]?.title || 'Master_CV').replace(/[^a-zA-Z0-9]/g, '_');
  a.href = url;
  a.download = `Aaradhya_Dev_Tamrakar_Resume_${safeTitle}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Markdown Resume downloaded!');
  if (typeof playAudioCue === 'function') playAudioCue('click');
}

function copyResumePlainText(roleKey, btnEl) {
  const text = generateResumePlainText(roleKey);
  navigator.clipboard.writeText(text).then(() => {
    showToast('ATS Plain-Text Resume copied to clipboard!');
    if (typeof playAudioCue === 'function') playAudioCue('chime');
    if (btnEl) {
      const origHtml = btnEl.innerHTML;
      btnEl.classList.add('copied');
      btnEl.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span class="resume-copy-label">Copied!</span>
      `;
      setTimeout(() => {
        btnEl.classList.remove('copied');
        btnEl.innerHTML = origHtml;
      }, 2000);
    }
  }).catch(err => {
    console.error('Clipboard copy failed:', err);
    showToast('Failed to copy to clipboard.');
  });
}

function openResumeGenerator() {
  let modal = document.getElementById('resumeModalOverlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'resumeModalOverlay';
    modal.className = 'resume-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Tailored ATS Resume Generator');
    document.body.appendChild(modal);
  }

  let currentActiveRole = 'all';

  modal.innerHTML = `
    <div class="resume-modal-card">
      <div class="resume-modal-header">
        <div class="resume-modal-title">
          <span>Tailored ATS Resume Generator</span>
        </div>
        <button type="button" class="access-modal-close" id="resumeModalClose" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="resume-role-selector">
        <button type="button" class="resume-role-btn active" data-role="all">Master CV</button>
        <button type="button" class="resume-role-btn" data-role="aiml">AI / ML Engineer</button>
        <button type="button" class="resume-role-btn" data-role="hardware">Electronics & Embedded</button>
        <button type="button" class="resume-role-btn" data-role="fullstack">Software & Android</button>
      </div>
      <div class="resume-preview-body">
        <div class="resume-preview-sheet" id="resumeSheet"></div>
        <button type="button" class="resume-floating-copy-btn" id="resumeCopyTextBtn" title="Copy ATS plain text to clipboard" aria-label="Copy ATS plain text to clipboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span class="resume-copy-label">Copy ATS Text</span>
        </button>
      </div>
      <div class="resume-modal-footer">
        <span class="resume-footer-label">ATS-Optimized Formats</span>
        <div class="resume-btn-group">
          <button type="button" class="resume-action-btn" id="resumeDownloadMdBtn" title="Download resume in Markdown format">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Download .MD</span>
          </button>
          <button type="button" class="resume-action-btn" id="resumeDownloadJsonBtn" title="Download standard JSON Resume">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <span>Download .JSON</span>
          </button>
          <button type="button" class="resume-action-btn" id="resumeShareBtn" title="Share resume & portfolio link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            <span>Share</span>
          </button>
          <button type="button" class="resume-print-btn" id="resumePrintBtn" title="Print or Save as PDF">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('resumeModalClose').addEventListener('click', closeResumeGenerator);
  modal.addEventListener('click', e => { if (e.target === modal) closeResumeGenerator(); });
  document.getElementById('resumePrintBtn').addEventListener('click', () => {
    document.body.classList.add('printing-resume');
    window.print();
  });
  const copyBtn = document.getElementById('resumeCopyTextBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyResumePlainText(currentActiveRole, copyBtn);
    });
  }
  document.getElementById('resumeDownloadMdBtn').addEventListener('click', () => {
    downloadResumeMarkdown(currentActiveRole);
  });
  document.getElementById('resumeDownloadJsonBtn').addEventListener('click', () => {
    downloadResumeJson(currentActiveRole);
  });
  const shareBtn = document.getElementById('resumeShareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      shareContent({
        title: `Aaradhya Dev Tamrakar — ${RESUME_DATA.roles[currentActiveRole]?.title || 'Resume'}`,
        text: `Check out Aaradhya Dev Tamrakar's verified resume and engineering portfolio (${RESUME_DATA.roles[currentActiveRole]?.title || 'Master CV'}).`,
        url: window.location.origin + '/experience.html'
      });
    });
  }

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing-resume');
  });

  const roleBtns = modal.querySelectorAll('.resume-role-btn');
  roleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentActiveRole = btn.getAttribute('data-role') || 'all';
      renderTailoredResumePreview(currentActiveRole);
      if (typeof triggerHapticFeedback === 'function') triggerHapticFeedback('light');
    });
  });

  renderTailoredResumePreview('all');
  requestAnimationFrame(() => modal.classList.add('open'));
  document.body.style.overflow = 'hidden';
  if (typeof playAudioCue === 'function') playAudioCue('open');
}

function shareContent(opts = {}) {
  const shareData = {
    title: opts.title || 'Aaradhya Dev Tamrakar — Engineering Portfolio',
    text: opts.text || 'Explore the engineering portfolio, projects, and research of Aaradhya Dev Tamrakar.',
    url: opts.url || window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).then(() => {
      showToast('Shared successfully!');
      if (typeof playAudioCue === 'function') playAudioCue('chime');
    }).catch(err => {
      if (err.name !== 'AbortError') {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareData.url).then(() => {
            showToast('Link copied to clipboard!');
            if (typeof playAudioCue === 'function') playAudioCue('chime');
          });
        }
      }
    });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareData.url).then(() => {
      showToast('Portfolio link copied to clipboard!');
      if (typeof playAudioCue === 'function') playAudioCue('chime');
    }).catch(() => {
      showToast('Share URL: ' + shareData.url);
    });
  }
}

function closeResumeGenerator() {
  const modal = document.getElementById('resumeModalOverlay');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  document.body.classList.remove('printing-resume');
  if (typeof playAudioCue === 'function') playAudioCue('close');
}

function renderTailoredResumePreview(roleKey) {
  const sheet = document.getElementById('resumeSheet');
  if (!sheet) return;

  const roleData = RESUME_DATA.roles[roleKey] || RESUME_DATA.roles.all;

  let sectionsHtml = roleData.sections.map(sec => `
    <div class="resume-sheet-section">
      <div class="resume-sheet-sec-title">${sec.title}</div>
      ${sec.items.map(item => `
        <div class="resume-item-row">
          <div class="resume-item-header">
            <span>${item.header}</span>
          </div>
          ${item.sub ? `<div class="resume-item-sub">${item.sub}</div>` : ''}
          ${item.bullets ? `<ul class="resume-bullet-list">${item.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
        </div>
      `).join('')}
    </div>
  `).join('');

  sheet.innerHTML = `
    <div class="resume-sheet-head">
      <div class="resume-sheet-head-left">
        <div class="resume-sheet-name">${RESUME_DATA.name}</div>
        <div class="resume-sheet-subtitle">${roleData.title}</div>
        <div class="resume-sheet-contact">${getResumeContactHTML()}</div>
      </div>
      <img class="resume-sheet-photo" src="assets/images/photo.webp" alt="Aaradhya Dev Tamrakar" width="82" height="82" loading="lazy" onerror="this.onerror=null;this.src='assets/images/photo.png'" />
    </div>
    <div class="resume-sheet-section">
      <div class="resume-sheet-sec-title">Professional Summary</div>
      <p class="resume-sheet-summary-text">${RESUME_DATA.summary}</p>
    </div>
    ${sectionsHtml}
  `;
}

window.openResumeGenerator = openResumeGenerator;
window.closeResumeGenerator = closeResumeGenerator;
window.downloadResumeMarkdown = downloadResumeMarkdown;
window.downloadResumeJson = downloadResumeJson;
window.copyResumePlainText = copyResumePlainText;
window.shareContent = shareContent;
window.initSkillRadar = initSkillRadar;
window.openSkillRadarModal = openSkillRadarModal;
window.closeSkillRadarModal = closeSkillRadarModal;