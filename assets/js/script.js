/* ============================================================
   SHARED SCRIPT — aaradhyadt.github.io (v54.6)
   Loaded on every page via <script src="assets/js/script.js">.
   Orchestrates core modules from assets/js/modules/
   ============================================================ */

/* ── Dynamic Module Loader (v54.6) — Tiered Parallel ─────────── */
window.__modulesLoadedPromise = (async function () {
  // Modules grouped by dependency tier — each group loads concurrently via
  // Promise.all, but tiers execute sequentially (tier N+1 waits for tier N).
  // Tier 0: data & constants have no dependencies; loading them in parallel
  // cuts the boot waterfall from 13 sequential round-trips to ~3.
  const GROUPS = [
    // Tier 0 — Data & constants (no inter-dependencies)
    [
      'assets/js/data/releases.js',
      'assets/js/data/search-index.js',
      'assets/js/data/resume-data.js',
      'assets/js/data/graph-data.js',
      'assets/js/modules/constants.js',
    ],
    // Tier 1 — Core runtime (depends on data/constants globals)
    [
      'assets/js/modules/core.js',
      'assets/js/modules/tour.js',
      'assets/js/modules/cmdk.js',
    ],
    // Tier 2 — UI & feature modules (depend on core globals)
    [
      'assets/js/modules/ui.js',
      'assets/js/modules/shortcuts.js',
      'assets/js/modules/access.js',
      'assets/js/modules/audio.js',
      'assets/js/modules/terminal.js',
      'assets/js/modules/graph-modal.js',
      'assets/js/modules/haptics.js',
      'assets/js/modules/evidence.js',
      'assets/js/modules/home-widgets.js',
    ],
  ];

  window.__failedModules = [];
  const allResults = [];

  function loadOne(src) {
    // Classic script tag injection: guarantees evaluation in the global window scope
    // so that module functions and declarations properly attach to window.
    return new Promise(function (resolve) {
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) return resolve({ src: src, ok: true, cached: true });

      var s = document.createElement('script');
      s.src = src;
      s.async = false;
      var timer = setTimeout(function () {
        console.warn('[Module Loader] Module load timed out after 5s:', src);
        window.__failedModules.push({ src: src, reason: 'timeout' });
        resolve({ src: src, ok: false, reason: 'timeout' });
      }, 5000);
      s.onload = function () {
        clearTimeout(timer);
        resolve({ src: src, ok: true, type: 'classic' });
      };
      s.onerror = function (err) {
        clearTimeout(timer);
        console.error('[Module Loader] Failed to load module:', src, err);
        window.__failedModules.push({ src: src, reason: 'error', error: err });
        resolve({ src: src, ok: false, reason: 'error' });
      };
      document.head.appendChild(s);
    });
  }

  // Load each tier concurrently; tiers are sequential (dependency order preserved)
  for (const group of GROUPS) {
    const tierResults = await Promise.all(group.map(loadOne));
    allResults.push(...tierResults);
  }

  const failed = allResults.filter(function (r) { return r && !r.ok; });
  if (failed.length > 0) {
    const CRITICAL = ['core.js', 'ui.js'];
    const criticalFailed = failed.filter(function (f) {
      return CRITICAL.some(function (c) { return f.src.includes(c); });
    });
    console.error('[Module Loader] ' + failed.length + ' module(s) failed to load:', failed.map(function (f) { return f.src; }).join(', '));
    if (typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
      window.dispatchEvent(new CustomEvent('moduleloadererror', { detail: { failed: failed } }));
    }
    // Show a user-visible banner if critical modules failed to load
    if (criticalFailed.length > 0) {
      var showBanner = function () {
        if (document.getElementById('adt-module-err-banner')) return;
        var banner = document.createElement('div');
        banner.id = 'adt-module-err-banner';
        banner.setAttribute('role', 'alert');
        banner.setAttribute('aria-live', 'assertive');
        banner.style.cssText = [
          'position:fixed;top:0;left:0;right:0;z-index:99999',
          'background:rgba(127,29,29,0.97)',
          'color:#fef2f2',
          'font-family:var(--mono,monospace)',
          'font-size:0.78rem',
          'padding:0.55rem 1.2rem',
          'text-align:center',
          'letter-spacing:0.03em',
          'display:flex;align-items:center;justify-content:center;gap:0.75rem',
        ].join(';');
        var msg = document.createElement('span');
        msg.textContent = 'Some site features could not load. Try refreshing the page — if the issue persists, check your connection.';
        var closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.setAttribute('aria-label', 'Dismiss notice');
        closeBtn.style.cssText = 'background:none;border:none;color:inherit;font-size:1.1rem;cursor:pointer;padding:0 0.2rem;flex-shrink:0;';
        closeBtn.onclick = function () { banner.remove(); };
        banner.appendChild(msg);
        banner.appendChild(closeBtn);
        if (document.body) {
          document.body.prepend(banner);
        } else {
          document.addEventListener('DOMContentLoaded', function () { document.body.prepend(banner); });
        }
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showBanner);
      } else {
        showBanner();
      }
    }
  }
  return allResults;
})();


/* -- Static site data -----------------------------------------
   SITE_RELEASES       -> assets/js/data/releases.js
   SEARCH_STATIC_INDEX -> assets/js/data/search-index.js
   Both load ahead of the core modules via the MODULES array
   above; the dynamic loader preserves insertion order (async=false).
   ------------------------------------------------------------- */



/* ── Boot ─────────────────────────────────────────────────── */
function bootSite() {
  if (typeof initTheme === 'function') initTheme();        // must run first — sets data-theme before paint
  if (typeof initAccent === 'function') initAccent();       // sets data-accent before paint
  if (typeof computeLiveDates === 'function') computeLiveDates(); // compute before any page script reads LIVE
  if (typeof renderSiteNav === 'function') renderSiteNav();
  if (typeof setActiveNav === 'function') setActiveNav();
  if (typeof renderQuickNav === 'function') renderQuickNav();
  if (typeof initThemeToggle === 'function') initThemeToggle();
  if (typeof initAccentPicker === 'function') initAccentPicker();
  if (typeof initKeyNav === 'function') initKeyNav();
  if (typeof initStatusDate === 'function') initStatusDate();
  if (typeof initHamburger === 'function') initHamburger();
  if (typeof initScroll === 'function') initScroll();
  if (typeof initReveal === 'function') initReveal();
  if (typeof initCountUp === 'function') initCountUp();
  if (typeof initTypedCaption === 'function') initTypedCaption();
  if (typeof initCursor === 'function') initCursor();
  if (typeof initLightbox === 'function') initLightbox();
  if (typeof initGlobalSearch === 'function') initGlobalSearch();
  if (typeof initAccessControl === 'function') initAccessControl();
  if (typeof renderSiteFooter === 'function') renderSiteFooter();
  if (typeof initServiceWorker === 'function') initServiceWorker();
  if (typeof initReadingProgressBar === 'function') initReadingProgressBar();
  if (typeof initNetworkStatusListeners === 'function') initNetworkStatusListeners();
  if (typeof initTour === 'function') initTour();
  if (typeof initTouchGestures === 'function') initTouchGestures();
  if (typeof initSkillBars === 'function') initSkillBars();
  if (typeof initScrollParallax === 'function') initScrollParallax();
  if (typeof initSwipeNav === 'function') initSwipeNav();
  if (typeof initAudioCues === 'function') initAudioCues();
  if (typeof initReadingMetrics === 'function') initReadingMetrics();
  if (typeof initFilterCountIndicators === 'function') initFilterCountIndicators();
  if (typeof initSkillRadar === 'function') initSkillRadar(false);
  if (typeof scheduleGA4 === 'function') scheduleGA4();
  else if (typeof loadGA4 === 'function') window.addEventListener('load', loadGA4);
}

if (window.__modulesLoadedPromise) {
  window.__modulesLoadedPromise.then(function () {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bootSite);
    } else {
      bootSite();
    }
  });
} else {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSite);
  } else {
    bootSite();
  }
}


function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.debug('ServiceWorker registration skipped or failed:', err);
      });
    });
  }
}

function initReadingProgressBar() {
  const bar = document.getElementById('readProgressBar');
  if (!bar) return;
  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  }
  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateProgress);
  }, { passive: true });
  updateProgress();
}

function initNetworkStatusListeners() {
  window.addEventListener('online', () => {
    showToast('Connection restored — back online');
    syncQueuedContactMessages();
  });
  window.addEventListener('offline', () => {
    showToast('You are currently offline');
  });
}

function syncQueuedContactMessages() {
  try {
    const raw = localStorage.getItem('adt_queued_contact_submissions');
    if (!raw) return;
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || !list.length) return;

    const pending = list.slice();
    localStorage.removeItem('adt_queued_contact_submissions');

    pending.forEach(async (formData) => {
      try {
        const FORMSPREE_ID = (typeof SITE !== 'undefined' && SITE.formspreeId) ? SITE.formspreeId : "xnnjkrrn";
        const res = await fetch("https://formspree.io/f/" + FORMSPREE_ID, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          showToast(`Queued message from ${formData.name} sent successfully!`);
          if (typeof playAudioCue === 'function') playAudioCue('chime');
        } else {
          queueOfflineContactMessage(formData);
        }
      } catch (err) {
        queueOfflineContactMessage(formData);
      }
    });
  } catch (e) {
    console.warn('Sync queued contact messages:', e);
  }
}

function queueOfflineContactMessage(formData) {
  try {
    const list = JSON.parse(localStorage.getItem('adt_queued_contact_submissions') || '[]');
    list.push(formData);
    localStorage.setItem('adt_queued_contact_submissions', JSON.stringify(list));
  } catch (e) {
    console.warn('Queue offline contact message:', e);
  }
}

window.queueOfflineContactMessage = queueOfflineContactMessage;
window.syncQueuedContactMessages = syncQueuedContactMessages;