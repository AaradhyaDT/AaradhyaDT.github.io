# Architecture & Surface Map (Layer 1)

Compact routing index for `aaradhyadt.github.io`. Points to focused **Layer 2** docs in `docs/` and automated sources (`graphify-out/`, `dev-logs/`), without duplicating symbol graphs or release changelogs.

---

## Layer 2 Reference Docs

- [INTERACTIONS_AND_KEYMAP.md](INTERACTIONS_AND_KEYMAP.md) — Global & page-scoped keyboard shortcuts, DOM hooks, and modal priority rules.
- [VERIFICATION_AND_RELEASE.md](VERIFICATION_AND_RELEASE.md) — 26 `verify.py` gates, size budgets, `build_site.py` allowlist, VIP payloads, and `sync.ps1` versioning.
- [CONTENT_SYNC_MAP.md](CONTENT_SYNC_MAP.md) — `PROFILE.md` evidence-tier mapping, `data/*.json` provenance, and generated indexes.

## Automated & Canonical Sources

- **Code Symbol & Dependency Map**: [GRAPH_REPORT.md](../graphify-out/GRAPH_REPORT.md) + `graphify-out/graph.json` (queried via `/graphify-code-search`, auto-updated by `.\sync.ps1`).
- **Release & Milestone Log**: [PortfolioWebsite_TRACKER.md](../dev-logs/PortfolioWebsite_TRACKER.md) + [releases.js](../assets/js/data/releases.js) (managed by `scripts/site_automation.py`).
- **Master Engineering Profile**: [PROFILE.md](../PROFILE.md) (`PROF-001-ENGINEERING-PROFILE`, tiers E0–E5).
- **Agent Workflow Rules**: [AGENTS.md](../AGENTS.md), [GEMINI.md](../GEMINI.md), [CLAUDE.md](../CLAUDE.md).

---

## HTML Surface Matrix

| Page | Purpose | Page-Specific JS / Data | Page-Scoped Shortcuts |
| :--- | :--- | :--- | :--- |
| [index.html](../index.html) | Hero, live telemetry, terminal, Master Control | `home-widgets.js`, `terminal.js`, `bg-animations.js` | `` ` `` (hero date B.S./A.D.) |
| [projects.html](../projects.html) | 47 projects, constellation/tree ecosystem, VIP links | `constellation.js`, `ecosystem.js`, `ui.js` (`initProjectsPage`), `data/ecosystem.json`, `access.js` | `Shift+2` (Graph/Tree view), `Alt+2` (expand/collapse visible cards) |
| [experience.html](../experience.html) | Positions, leadership, education | Shared `core.js`, `ui.js` | Global only |
| [achievements.html](../achievements.html) | 39 credentials, Academic/ECA track switch, proof lightbox | `ui.js` (`initLightbox`) | `Shift+4` (Academic/ECA track), `Alt+4` (expand/collapse years) |
| [about.html](../about.html) | Engineering philosophy, biography, timeline | Shared `core.js`, `ui.js` | Global only |
| [journey.html](../journey.html) | 39 build-log milestones & site evolution | Shared `core.js`, `ui.js` | `Alt+6` (expand/collapse checkpoints) |
| [contact.html](../contact.html) | Contact form (with SW offline queue) & channels | `script.js`, `sw.js` | Global only |
| [privacy.html](../privacy.html) | Privacy & client-side data handling policy | Shared `core.js`, `ui.js` | Global only |
| [terms.html](../terms.html) | Terms of service | Shared `core.js`, `ui.js` | Global only |
| [404.html](../404.html) | Custom not-found page (`noindex`, excluded from sitemap) | Shared `core.js`, `ui.js` | Global only |

---

## Runtime Boot & Packaging Pipeline

1. **Tiered Module Loader** ([script.js](../assets/js/script.js)):
   - **Tier 0** (Data & constants): `releases.js`, `search-index.js`, `resume-data.js`, `graph-data.js`, `constants.js`.
   - **Tier 1** (Core runtime): `core.js`, `tour.js`, `cmdk.js`.
   - **Tier 2** (UI & features): `ui.js`, `shortcuts.js`, `access.js`, `audio.js`, `terminal.js`, `graph-modal.js`, `haptics.js`, `evidence.js`, `home-widgets.js`.
2. **Service Worker** ([sw.js](../sw.js)): Cache-first static assets, network-first HTML, offline contact queue.
3. **Deployment Allowlist** ([build_site.py](../scripts/build_site.py)): Copies only tracked root `*.html`, `assets/`, `PUBLIC_ROOT_FILES`, and `PUBLIC_DATA_FILES` into `.site-build/`. Development directories (`docs/`, `dev-logs/`, `scripts/`, `tests/`, `graphify-out/`) are excluded from public deployment.
