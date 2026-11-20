# Verification, Packaging & Release Reference (Layer 2)

Operational contract for [verify.py](../scripts/verify.py), [build_site.py](../scripts/build_site.py), [manage_payloads.py](../scripts/manage_payloads.py), and [site_automation.py](../scripts/site_automation.py).

---

## Verification Suite (`python scripts/verify.py`)

Runs **26 diagnostic categories** across the repository:

- **Integrity & Links**: `assets`, `links` (cross-page), `hrefs`, `ids`, `ids-global`, `tags`, `sitemap`, `robots`, `manifest`.
- **Code & Security**: `js-syntax` (Node syntax check), `js-safety`, `css-integrity`, `csp`, `modules`, `sw-assets`, `unit-tests` (`tests/unit/*.test.mjs`).
- **Data, SEO & Hygiene**: `html-a11y-seo`, `schema` (JSON-LD), `search-index`, `data-consistency`, `claim-provenance`, `version`, `release-shas`, `tracker-hygiene` (MD009/MD026 on `PortfolioWebsite_TRACKER.md`, `README.md`, `AGENTS.md`, `GEMINI.md`, and `docs/*.md`), `size`.

### File Size Budgets (`check_file_sizes`)

| Asset Class | Budget | Notes |
| :--- | :--- | :--- |
| Root HTML (`*.html`) | `200,000 B` | Keep page-specific scripts/styles modularized if approaching limit |
| `assets/js/script.js` | `60,000 B` | Bootloader and module orchestrator |
| `assets/js/modules/*.js` | `70,000 B` | Per-module ceiling |
| `assets/css/modules/components.css` | `65,000 B` | Shared UI components |
| Other `assets/css/modules/*.css` | `55,000 B` | Tokens, layout, feature stylesheets |

---

## Public Build Allowlist (`scripts/build_site.py`)

`build_site()` packages only tracked Git files matching `is_public()`:

- Root `*.html` files.
- `PUBLIC_ROOT_FILES`: `site.webmanifest`, `robots.txt`, `sitemap.xml`, `sw.js`, `llms.txt`, `llms-full.txt`.
- `PUBLIC_DATA_FILES`: `data/ecosystem.json`, `data/output-captures.json`, `data/project-narratives.json`, `data/quantitative-claims.json`.
- Everything under `assets/`.

All repository tooling (`scripts/`, `tests/`, `mcp-server/`), documentation (`docs/`, `dev-logs/`), and local graph artifacts (`graphify-out/`) are excluded from `.site-build/`.

---

## Encrypted Payloads & Sync Workflow

- **VIP Payloads (`access.js`)**: Always use `python scripts/manage_payloads.py` (`list`, `get`, `set`, `export`, `import`, `verify`) or the site MCP tools. Never edit ciphertext manually.
- **VCS Synchronization**: Never run raw `git add`, `git commit`, or `git push`. Always use `.\sync.ps1` (routine/minor) or `.\sync.ps1 -Major` (when any of the 5 Major-Release Pillars in [AGENTS.md](../AGENTS.md) apply).
- **Bot-Managed File**: Never manually edit or stage `assets/js/last-commit.json`.
