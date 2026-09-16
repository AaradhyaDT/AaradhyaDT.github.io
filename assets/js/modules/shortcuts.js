/* ============================================================
   MODULE: shortcuts.js — aaradhyadt.github.io (v54.5)
   Keyboard shortcuts cheat sheet HUD modal & navigation bindings.
   ============================================================ */

/* ── Keyboard Shortcuts Cheat Sheet HUD Modal ──────────────── */
function openShortcutsModal() {
  let modal = document.getElementById('shortcutsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'shortcutsModal';
    modal.className = 'access-modal-overlay shortcuts-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', "Keyboard Shortcuts Cheat Sheet HUD");
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="access-modal-card shortcuts-modal-card">
      <div class="shortcuts-header">
        <div class="shortcuts-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
            <path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M18 12h.001M7 16h10"/>
          </svg>
          <span>Keyboard Shortcuts HUD</span>
        </div>
        <button type="button" class="access-modal-close" id="shortcutsModalClose" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="shortcuts-modal-body">
        <div class="shortcuts-columns">
          
          <!-- Column 1: Global Actions & Controls -->
          <div class="shortcuts-col">
            <div class="shortcuts-col-title">
              <span class="shortcuts-tag">GLOBAL</span>
              <span>Actions &amp; Tools</span>
            </div>
            <div class="shortcuts-list">
              <div class="shortcut-row">
                <span class="shortcut-label">Command Palette</span>
                <div class="shortcut-keys"><kbd>/</kbd> <span class="shortcut-sep">or</span> <kbd>Ctrl</kbd><span class="shortcut-plus">+</span><kbd>K</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-label">Shortcuts Cheat Sheet</span>
                <div class="shortcut-keys"><kbd>?</kbd> <span class="shortcut-sep">or</span> <kbd>Shift</kbd><span class="shortcut-plus">+</span><kbd>/</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-label">Toggle Dark / Light Theme</span>
                <div class="shortcut-keys"><kbd>0</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-label">Toggle Date (B.S. / A.D.)</span>
                <div class="shortcut-keys"><kbd>\`</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-label">What's New Releases</span>
                <div class="shortcut-keys"><kbd>Shift</kbd><span class="shortcut-plus">+</span><kbd>N</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-label">Guided Site Tour</span>
                <div class="shortcut-keys"><kbd>Shift</kbd><span class="shortcut-plus">+</span><kbd>T</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-label">Audio Micro-Sounds</span>
                <div class="shortcut-keys"><kbd>Shift</kbd><span class="shortcut-plus">+</span><kbd>A</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-label">3D Knowledge Graph HUD</span>
                <div class="shortcut-keys"><kbd>Shift</kbd><span class="shortcut-plus">+</span><kbd>G</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-label">Universal Master Close</span>
                <div class="shortcut-keys"><kbd>Esc</kbd></div>
              </div>
            </div>
          </div>

          <!-- Column 2: Page Navigation & Scroll -->
          <div class="shortcuts-col">
            <div class="shortcuts-col-title">
              <span class="shortcuts-tag">NAV</span>
              <span>Jump to Page</span>
            </div>
            <div class="shortcuts-list">
              <a href="index.html" class="shortcut-row shortcut-link">
                <span class="shortcut-label">Home</span>
                <div class="shortcut-keys"><kbd>1</kbd></div>
              </a>
              <a href="projects.html" class="shortcut-row shortcut-link">
                <span class="shortcut-label">Projects</span>
                <div class="shortcut-keys"><kbd>2</kbd></div>
              </a>
              <a href="experience.html" class="shortcut-row shortcut-link">
                <span class="shortcut-label">Experience</span>
                <div class="shortcut-keys"><kbd>3</kbd></div>
              </a>
              <a href="achievements.html" class="shortcut-row shortcut-link">
                <span class="shortcut-label">Achievements</span>
                <div class="shortcut-keys"><kbd>4</kbd></div>
              </a>
              <a href="about.html" class="shortcut-row shortcut-link">
                <span class="shortcut-label">About</span>
                <div class="shortcut-keys"><kbd>5</kbd></div>
              </a>
              <a href="journey.html" class="shortcut-row shortcut-link">
                <span class="shortcut-label">Journey</span>
                <div class="shortcut-keys"><kbd>6</kbd></div>
              </a>
              <a href="contact.html" class="shortcut-row shortcut-link">
                <span class="shortcut-label">Contact</span>
                <div class="shortcut-keys"><kbd>7</kbd></div>
              </a>
              <div class="shortcut-row">
                <span class="shortcut-label">Scroll Top / Bottom</span>
                <div class="shortcut-keys"><kbd>=</kbd> <span class="shortcut-sep">/</span> <kbd>-</kbd></div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="shortcuts-modal-footer">
        <span class="shortcuts-footer-hint">Paused inside text inputs</span>
        <button type="button" class="shortcuts-dismiss-btn" id="shortcutsDismissBtn">
          <span>Dismiss</span>
          <kbd>Esc</kbd>
        </button>
      </div>
    </div>
  `;

  document.getElementById('shortcutsModalClose').addEventListener('click', closeShortcutsModal);
  const dismissBtn = document.getElementById('shortcutsDismissBtn');
  if (dismissBtn) dismissBtn.addEventListener('click', closeShortcutsModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeShortcutsModal(); });

  requestAnimationFrame(() => modal.classList.add('open'));
  document.body.style.overflow = 'hidden';
  if (typeof playAudioCue === 'function') playAudioCue('open');
}

function closeShortcutsModal() {
  const modal = document.getElementById('shortcutsModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (typeof playAudioCue === 'function') playAudioCue('close');
}

function toggleShortcutsModal() {
  const modal = document.getElementById('shortcutsModal');
  if (modal && modal.classList.contains('open')) {
    closeShortcutsModal();
  } else {
    openShortcutsModal();
  }
}

// Global and ESM exports
window.openShortcutsModal = openShortcutsModal;
window.closeShortcutsModal = closeShortcutsModal;
window.toggleShortcutsModal = toggleShortcutsModal;
