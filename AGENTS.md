# Agent Rules & Workflow Guidelines

## 1. Git Workflow & Automation (CRITICAL — STRICT ENFORCEMENT)

To avoid merge conflicts on `assets/js/last-commit.json` (bot-managed) and prevent wasteful multi-step Git commands, **NEVER run individual `git add`, `git commit`, `git push`, or `git pull` commands directly.**

**ALWAYS execute `.\sync.ps1` for repository synchronization and version control.**

### Commands

- **Routine / Minor Changes**:

  ```powershell
  .\sync.ps1
  ```

  _Automatically handles search index extraction, graph updates, pre-commit verification, tracker log timestamps, auto-commit message generation, push, and bot stamp sync._

- **Major Features / Architectural Changes**:
  1. Update `dev-logs/PortfolioWebsite_TRACKER.md` with release notes and verification details.
  2. Execute:

     ```powershell
     .\sync.ps1 -m "type(scope): detailed commit summary"
     ```

- **Fast Sync (Skip Knowledge Graph)**:

  ```powershell
  .\sync.ps1 -SkipGraphify
  ```

- **Safe Pull Only**:

  ```powershell
  .\sync.ps1 -PullOnly
  ```

---

## 2. Knowledge Graph & Codebase Navigation (Graphify)

- **Map First**: Read `docs/MAP.md` (Layer 1 surface/interaction/sync index) and `graphify-out/GRAPH_REPORT.md` (or `graphify-out/wiki/index.md` if present) before deep-diving into raw files.
- **Relationship Queries**: Prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over blind grep searches.
- **Graph Updates**: `.\sync.ps1` automatically executes `graphify update .`.

---

## 3. Operational Rules & Efficiency

- **Zero-Waste Execution**: Be concise and dive straight to work. Avoid conversational filler.
- **Single-Pass Sync**: Do not run manual separate commands for indexing, graphify, or staging — `.\sync.ps1` accomplishes all of this in one run.
- **Bot-Managed Files**: NEVER manually modify or stage `assets/js/last-commit.json`.
- **Notebooks**: Do NOT execute `.ipynb` files locally; run manually in Google Colab or external runtime.
- **Verification Gate**: Ensure changes adhere to standards checked by `python scripts/verify.py` (26 validation categories).
- **Web Standards**: Maintain Vanilla HTML/CSS/JS architecture, high-end aesthetics, semantic markup, and cross-site link/asset integrity across all pages.

### Git credentials in Copilot-hosted terminals

- Keep the global Git identity and Git Credential Manager account as **AaradhyaDT**.
- GitHub Copilot and VS Code may use a different GitHub account; do not change their authentication to alter Git pushes.
- `sync.ps1` must route network operations through the installed Git Credential Manager helper (`manager`) and clear any injected `credential.https://github.com.helper` override.
- Use `.\sync.ps1` for repository synchronization; do not work around this rule by manually embedding tokens or credentials in remotes, scripts, or configuration files.

---

## 4. Encrypted Payloads & VIP Sections (`access.js`)

To inspect, debug, or edit AES-256-GCM encrypted payloads without manual decryption overhead, **always use `scripts/manage_payloads.py` or MCP tools**:

- **List all payloads**: `python scripts/manage_payloads.py list`
- **Inspect payload**: `python scripts/manage_payloads.py get <key>`
- **Update payload**: `python scripts/manage_payloads.py set <key> --content "<text>"` (or `--file <path>`)
- **Export all to JSON**: `python scripts/manage_payloads.py export --out dev-logs/payloads_plaintext.json`
- **Import all from JSON**: `python scripts/manage_payloads.py import --file dev-logs/payloads_plaintext.json`
- **Verify all payloads**: `python scripts/manage_payloads.py verify`
- **MCP Tools**: `read_encrypted_payload`, `write_encrypted_payload`, `list_encrypted_payloads`, `verify_encrypted_payloads`, resource `site://payloads`

---

## 5. Versioning & Major Release Automation Architecture

The repository enforces a dual-tier versioning architecture managed through `scripts/site_automation.py` and `sync.ps1`:

### 1. Patch / Point Releases (`v51.1`, `v51.2`, ...)
- **Trigger**: Automatically computed by `.\sync.ps1` whenever uncommitted working tree changes exist.
- **Behavior**: Increments the patch integer (`v51.1` -> `v51.2`). Updates the current release block (`SITE_RELEASES[0]`) in `assets/js/data/releases.js` in-place.
- **Suppression**: Pass `.\sync.ps1 -NoBump` to commit without incrementing the point release.

### 2. Major Releases (`v51`, `v52`, ...)
- **Trigger**: Executed via `.\sync.ps1 -Major` (with optional `-Title "..."` and `-Highlights "..."`) or `python scripts/site_automation.py bump-major`.
- **Automation Pipeline**:
  1. **Major Integer Increment**: Reads current version from `assets/js/data/releases.js` (e.g. `v51` / `v51.28`), computes next clean integer (e.g. `v52`).
  2. **Release Block Prepended**: Prepends a brand-new release definition to `SITE_RELEASES` in `assets/js/data/releases.js` containing version, date, sha (dynamically resolved from `git rev-parse --short HEAD`), title, and highlights array.
  3. **Tracker Entry Formatted**: Automatically prepends a new MD009/MD026-compliant entry to `dev-logs/PortfolioWebsite_TRACKER.md` immediately following the `Last updated:` subtitle.
  4. **PWA Cache Invalidation**: Updates `CACHE_NAME = 'aaradhya-portfolio-v52'` in `sw.js` ensuring immediate client-side asset refresh on next visit.
  5. **Site-Wide Metadata Synchronization (12 Targets)**:
     - `sw.js`: Cache name and version header
     - `assets/js/script.js`: Script header and Dynamic Module Loader
     - `assets/js/modules/*.js`: All 10 JS module version headers
     - `scripts/verify.py`: Test suite version and header docstring
     - `scripts/site_automation.py`: Automation header docstring
     - `README.md`: Version comments and annotations
     - `.github/workflows/verify.yml`: CI workflow header
     - `VERSION`: Root single-source version file
     - `pyproject.toml`: Standard PEP 517/621 `version = "52.0.0"`
     - `sitemap.xml`: XML `<lastmod>` timestamps
     - `dev-logs/PortfolioWebsite_TRACKER.md`: Title header `# Portfolio Website Tracker — v52` and date

### 3. Explainable Conditions: When to Bump Minor vs Major

To eliminate ambiguity, release type selection follows an objective **5-Pillar Decision Matrix** evaluated by `python scripts/site_automation.py evaluate-bump` and reported by `.\sync.ps1`:

| Pillar | Condition / Trigger | Release Type | Rationale |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Infrastructure & Runtime** | New build engines (`uv`), packaging manifest (`pyproject.toml`), CI workflow rewrites (`.github/workflows/`), or sync engine overhaul (`sync.ps1`) | **Major** | Foundational change to developer and execution environment. |
| **Pillar 2: Client Lifecycle & Cache** | Modifying `sw.js` caching strategies, PWA manifest specs, or core bootloader (`script.js` / `core.js`) | **Major** | Requires global PWA cache invalidation (`aaradhya-portfolio-vX`) to prevent client-side stale asset drift. |
| **Pillar 3: Surface Addition / Removal** | Adding or deleting top-level HTML pages (`*.html`) or introducing major system-wide HUDs/modals | **Major** | Alters navigation topology, sitemap structure, and user discovery surface. |
| **Pillar 4: Structural Modularization** | Splitting monolithic modules, extracting data layers (`assets/js/data/`), or adding/retiring CSS/JS modules | **Major** | Changes architecture modularity contracts and dependency graph. |
| **Pillar 5: Cross-Domain Milestone** | Milestone delivery touching **4+ functional domains** (HTML, CSS, JS runtime, Tooling, CI, Docs) | **Major** | Represents a cohesive multi-system milestone rather than an isolated patch. |

#### When Changes Remain Minor / Point Releases (`v51.1`, `v51.2`, ...)
- **Content Updates**: Adding or updating project cards (`projects.html`), achievement credentials (`achievements.html`), or timeline milestones (`journey.html`).
- **Styling & Aesthetics**: Refining CSS tokens, micro-contrast adjustments, typography, layout margins.
- **Isolated Module Patches**: Fixing a bug or adding an alias to Dev Terminal (`terminal.js`), Command Palette (`cmdk.js`), or audio effects (`audio.js`).
- **SEO & Maintenance**: Updating meta descriptions, tracker notes, verification rules, or sitemap timestamps.
