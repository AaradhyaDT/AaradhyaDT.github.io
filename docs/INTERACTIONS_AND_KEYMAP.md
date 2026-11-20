# Interactions & Keymap Reference (Layer 2)

Authoritative map of keyboard shortcuts, modal suppression rules, and key DOM hooks implemented in [ui.js](../assets/js/modules/ui.js), [cmdk.js](../assets/js/modules/cmdk.js), [shortcuts.js](../assets/js/modules/shortcuts.js), and [constellation.js](../assets/js/modules/constellation.js).

---

## Global Keyboard Shortcuts

Handled primarily by `initKeyNav()` in [ui.js](../assets/js/modules/ui.js) (suppressed inside `INPUT`, `TEXTAREA`, `SELECT`, `contentEditable`, or when `isAnyModalOpen()` is true):

| Keybind | Action | Handler / File |
| :--- | :--- | :--- |
| `1` – `7` | Navigate to Home, Work, Background, Credentials, About, Build Log, Connect | `initKeyNav()` (`ui.js`) |
| `0` | Toggle Dark / Light theme (250 ms debounce) | `initKeyNav()` → `toggleTheme()` |
| `Alt+0` | Cycle color theme accent (250 ms debounce) | `initKeyNav()` → `cycleAccent()` |
| `?` or `Shift+/` | Open / close Keyboard Shortcuts HUD (`#shortcutsModal`) | `toggleShortcutsModal()` (`shortcuts.js`) |
| `/` or `Ctrl+K` | Open Command Palette (`#cmdk`) | `cmdk.js` |
| `` ` `` | Toggle hero date B.S. / A.D. (`index.html` only) | `toggleStatusDate()` (`ui.js`) |
| `Shift+N` | Open What's New releases modal | `openWhatsNewModal()` (`ui.js`) |
| `Shift+A` | Toggle synthesized Web Audio cues | `toggleAudioCues()` (`audio.js` / `ui.js`) |
| `Shift+T` | Start guided site tour | `startTour()` (`tour.js`) |
| `Shift+G` | Open 3D Knowledge Graph HUD | `openGraphModal()` (`graph-modal.js`) |
| `=` / `-` | Smooth scroll top / bottom (`Shift` = 25% / 75%) | `core.js` |
| `Esc` | Universal master close for open modals / lightboxes | `ui.js`, `cmdk.js`, `access.js` |

---

## Page-Scoped Shortcuts & DOM Hooks

| Page | Keybind | Target Hook | Behavior |
| :--- | :--- | :--- | :--- |
| `projects.html` | `Shift+2` | `#ecosystem-view-switch` (`[data-ecosystem-view="graph"\|"tree"]`) | Toggles between Graph view (`#constellation`) and Tree view (`#ecosystem`) when `#ecosystem-view-switch` is visible |
| `projects.html` | `Alt+2` | `#projectToggleAllBtn` | Expands or collapses all visible `#projectsGrid details.project-card` elements |
| `achievements.html` | `Shift+4` | `#trackAcademicBtn` / `#trackEcaBtn` | Toggles between Academic and Extracurricular credential tracks |
| `achievements.html` | `Alt+4` | `#toggleAllBtn` | Expands or collapses all year groups |
| `journey.html` | `Alt+6` | `#journeyToggleAllBtn` | Expands or collapses all milestone checkpoints |

---

## Modal Suppression & Projects Page Hooks

- **`isAnyModalOpen()`** ([ui.js](../assets/js/modules/ui.js)): Blocks global/page shortcuts whenever any of `.access-modal-overlay.open`, `.shortcuts-modal-overlay.open`, `.resume-modal-overlay.open`, `.tour-overlay.open`, `#cert-lightbox.open`, `#cmdk.open`, or `#tourCard` is active.
- **`initProjectsPage()`** ([ui.js](../assets/js/modules/ui.js)): Owns `#projectsGrid` fluid card open/close animations (`CARD_ANIM_MS = 350`), `#projectsFilterBar` category filtering, `#projects-empty-state`, and `#section-fuseaif` latest-week highlight (`project-card--major`).
- **`setView(view, fromUser)`** ([constellation.js](../assets/js/modules/constellation.js)): Syncs `#constellation` and `#ecosystem` visibility, `aria-pressed` state on `[data-ecosystem-view]`, and `ecosystem-selection` custom events.
