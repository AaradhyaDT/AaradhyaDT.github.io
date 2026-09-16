/* ============================================================
   MODULE: haptics.js — aaradhyadt.github.io (v54.5)
   Touch gesture recognition and haptic feedback.
   ============================================================ */

/* ── Haptic Feedback & Touch Gesture Micro-Interactions (v34) ── */
function triggerHapticFeedback(pattern = 10) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
  }
}

function initTouchGestures() {
  if (typeof window === 'undefined') return;

  const modals = ['cert-lightbox', 'cmdk', 'whatsNewModal', 'accessModalOverlay', 'tourOverlay'];
  modals.forEach(id => {
    const modal = document.getElementById(id);
    if (!modal) return;
    let startY = 0;
    let startX = 0;

    modal.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
      }
    }, { passive: true });

    modal.addEventListener('touchend', e => {
      if (e.changedTouches.length === 1 && modal.classList.contains('open')) {
        const deltaY = e.changedTouches[0].clientY - startY;
        const deltaX = Math.abs(e.changedTouches[0].clientX - startX);

        if (deltaY > 80 && deltaX < 60) {
          triggerHapticFeedback(15);
          if (id === 'cert-lightbox' && typeof closeLightbox === 'function') closeLightbox();
          else if (id === 'cmdk' && typeof closeCmdk === 'function') closeCmdk();
          else if (id === 'whatsNewModal' && typeof closeWhatsNewModal === 'function') closeWhatsNewModal();
          else if (id === 'accessModalOverlay' && typeof closeAccessModal === 'function') closeAccessModal();
          else if (id === 'tourOverlay') exitTour();
        }
      }
    }, { passive: true });
  });

  const drawer = document.getElementById('navDrawer');
  const hamburger = document.getElementById('navHamburger');
  if (drawer && hamburger) {
    let startX = 0;
    drawer.addEventListener('touchstart', e => {
      if (e.touches.length === 1) startX = e.touches[0].clientX;
    }, { passive: true });

    drawer.addEventListener('touchend', e => {
      if (e.changedTouches.length === 1 && drawer.classList.contains('open')) {
        const deltaX = e.changedTouches[0].clientX - startX;
        if (deltaX < -60) {
          triggerHapticFeedback(15);
          hamburger.click();
        }
      }
    }, { passive: true });
  }
}

/* ==========================================================================
   v36 Upgrade: Skill Bars Scroll-Triggered Animation
   ========================================================================== */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill[data-pct]');
  if (!fills.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    fills.forEach(fill => { fill.style.width = fill.dataset.pct; });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        requestAnimationFrame(() => {
          fill.style.width = fill.dataset.pct;
        });
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
}

/* ==========================================================================
   v36 Upgrade: Scroll-Linked Parallax Depth Effects
   ========================================================================== */
function initScrollParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on mobile for perf

  const heroGlow = document.querySelector('.hero-glow');
  const heroBgLines = document.querySelector('.hero-bg-lines');
  const sectionHeaders = document.querySelectorAll('.section-header');

  if (!heroGlow && !heroBgLines && !sectionHeaders.length) return;

  let parallaxTicking = false;
  function onParallaxScroll() {
    const y = window.scrollY;

    if (heroGlow) {
      heroGlow.style.transform = `translateY(${y * 0.3}px)`;
    }
    if (heroBgLines) {
      heroBgLines.style.transform = `translateY(${y * 0.15}px)`;
    }

    sectionHeaders.forEach(header => {
      const rect = header.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.top < viewH && rect.bottom > 0) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const shift = (progress - 0.5) * 20; // max ±10px
        header.style.transform = `translateY(${shift}px)`;
      }
    });

    parallaxTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(onParallaxScroll);
      parallaxTicking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   v36 Upgrade: Horizontal Swipe-to-Navigate Between Pages (Mobile)
   ========================================================================== */
function initSwipeNav() {
  if (!window.matchMedia('(pointer: coarse)').matches) return;
  if (typeof SITE === 'undefined' || !SITE.navLinks) return;

  const pages = SITE.navLinks.map(l => ({
    label: l.label,
    href: l.href
  }));
  // Add Contact at the end
  pages.push({ label: 'Contact', href: '/contact.html' });

  // Find current page index
  const currentPath = location.pathname.replace(/\/$/, '/index.html');
  let currentIdx = pages.findIndex(p =>
    currentPath.endsWith(p.href) || currentPath.endsWith(p.href.replace('/', ''))
  );
  if (currentIdx === -1) return;

  // Create swipe indicator elements
  let leftIndicator = document.querySelector('.swipe-indicator.left');
  let rightIndicator = document.querySelector('.swipe-indicator.right');

  if (!leftIndicator) {
    leftIndicator = document.createElement('div');
    leftIndicator.className = 'swipe-indicator left';
    document.body.appendChild(leftIndicator);
  }
  if (!rightIndicator) {
    rightIndicator = document.createElement('div');
    rightIndicator.className = 'swipe-indicator right';
    document.body.appendChild(rightIndicator);
  }

  let startX = 0, startY = 0, swiping = false;
  const THRESHOLD = 80;

  document.addEventListener('touchstart', e => {
    if (e.touches.length !== 1) return;
    // Don't swipe when interacting with terminal, modals, or drawer
    const el = e.target;
    if (el.closest('.terminal-card, .nav-drawer, #cmdk, #cert-lightbox, #whatsNewModal, .form-input, .form-textarea, input, textarea')) return;

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    swiping = true;
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (!swiping || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - startX;
    const dy = Math.abs(e.touches[0].clientY - startY);

    // Only track horizontal swipes
    if (dy > Math.abs(dx) * 0.6) {
      swiping = false;
      leftIndicator.classList.remove('visible');
      rightIndicator.classList.remove('visible');
      return;
    }

    if (dx > 40 && currentIdx > 0) {
      leftIndicator.textContent = `← ${pages[currentIdx - 1].label}`;
      leftIndicator.classList.add('visible');
      rightIndicator.classList.remove('visible');
    } else if (dx < -40 && currentIdx < pages.length - 1) {
      rightIndicator.textContent = `${pages[currentIdx + 1].label} →`;
      rightIndicator.classList.add('visible');
      leftIndicator.classList.remove('visible');
    } else {
      leftIndicator.classList.remove('visible');
      rightIndicator.classList.remove('visible');
    }
  }, { passive: true });

  document.addEventListener('touchend', e => {
    if (!swiping) return;
    swiping = false;

    const dx = e.changedTouches[0].clientX - startX;
    const dy = Math.abs(e.changedTouches[0].clientY - startY);

    leftIndicator.classList.remove('visible');
    rightIndicator.classList.remove('visible');

    if (Math.abs(dx) < THRESHOLD || dy > Math.abs(dx) * 0.6) return;

    if (dx > THRESHOLD && currentIdx > 0) {
      triggerHapticFeedback(15);
      location.href = pages[currentIdx - 1].href;
    } else if (dx < -THRESHOLD && currentIdx < pages.length - 1) {
      triggerHapticFeedback(15);
      location.href = pages[currentIdx + 1].href;
    }
  }, { passive: true });
}



