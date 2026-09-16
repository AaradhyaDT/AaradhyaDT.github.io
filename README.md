# aaradhyadt.github.io

[![Deploy Pages](https://github.com/AaradhyaDT/AaradhyaDT.github.io/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/AaradhyaDT/AaradhyaDT.github.io/actions/workflows/deploy-pages.yml)
[![Verification Suite](https://github.com/AaradhyaDT/AaradhyaDT.github.io/actions/workflows/verify.yml/badge.svg)](https://github.com/AaradhyaDT/AaradhyaDT.github.io/actions/workflows/verify.yml)
[![Lighthouse Audit](https://github.com/AaradhyaDT/AaradhyaDT.github.io/actions/workflows/lighthouse-audit.yml/badge.svg)](https://github.com/AaradhyaDT/AaradhyaDT.github.io/actions/workflows/lighthouse-audit.yml)
[![Version](https://img.shields.io/badge/version-v54.5-blue.svg)](https://github.com/AaradhyaDT/AaradhyaDT.github.io)
[![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red.svg)](LICENSE)
[![Zero-Framework](https://img.shields.io/badge/framework-vanilla%20HTML%2FCSS%2FJS-orange.svg)](https://aaradhyadt.github.io)

Official personal portfolio website for **Aaradhya Dev Tamrakar** — Electronics Engineer & AI/ML Developer. Built as a high-performance, responsive static web app hosted on GitHub Pages, featuring zero-leak client-side AES-256-GCM encryption, Google OAuth 2.0 authentication, dynamic command-palette search, and an interactive milestone build log.

🌐 **Live Website**: [aaradhyadt.github.io](https://aaradhyadt.github.io)

---

## 📁 Repository Structure & Directory Map

```text
.
├── 📄 HTML Pages & Web App Manifest (Root Deployment)
│   ├── index.html              # Homepage, hero section, interactive dev terminal, stats & Master Control Panel
│   ├── about.html              # Personal background, engineering philosophy, timeline & biography
│   ├── projects.html           # Technical showcase with VIP-gated GitHub source code links
│   ├── experience.html         # Professional positions, leadership roles (IEEE KEC, EPC, Maker's Space) & education
│   ├── achievements.html       # Certifications, credentials, filterable badges & PDF verification links
│   ├── journey.html            # Development timeline & commit-linked evolution log of the website itself
│   ├── contact.html            # Interactive contact form, channels & direct connection links
│   ├── privacy.html            # Site privacy policy and data handling transparency
│   ├── terms.html              # Terms of service and usage terms
│   ├── 404.html                # Custom styled Not-Found page (excluded from sitemap, marked noindex)
│   ├── site.webmanifest        # Progressive Web App manifest metadata (standalone app, dark theme tokens)
│   ├── sw.js                   # PWA Service Worker (v54.5 cache-first static assets & network-first HTML)
│   └── google3e772e11a3eb8313.html # Google Search Console site ownership verification file
│
├── 🎨 Assets (`assets/`)
│   ├── certificates/          # PDF downloads and WebP image previews for linked credentials
│   ├── css/
│   │   └── modules/           # Modular CSS architecture (tokens, base, layout, components, cmdk, access, terminal, tour, print)
│   ├── docs/
│   │   ├── AARADHYA_DEV_TAMRAKAR_CV.pdf # Official downloadable Curriculum Vitae
│   │   └── ADT_LOGO.png        # Brand emblem and identity asset
│   ├── events/                # Event photos, posters & vector graphics for workshops, hackathons & campus activities
│   ├── images/
│   │   ├── photo.webp / .png   # Profile headshots
│   │   ├── og-image.jpg        # Open Graph social sharing preview card
│   │   └── logos/              # Institutional logos (IEEE KEC, Fusemachines, EPC Club, Maker's Space, NSSR)
│   ├── js/
│   │   ├── script.js           # Boot orchestrator: dynamic MODULES loader, bootSite() wiring, SW registration & offline contact queue
│   │   ├── bg-animations.js    # Standalone SignalWave and PCBTraces background canvas animations
│   │   ├── data/               # Static runtime data loaded via MODULES (releases, search index, resume)
│   │   ├── modules/            # Decoupled ES/IIFE JavaScript modules (core, ui, cmdk, access, tour, audio, terminal, haptics, home-widgets)
│   │   └── last-commit.json    # Commit metadata stamped on push via GitHub Actions for live commit status display
│   └── videos/                 # Project video demonstrations (e.g., GCSBR working demo) & poster stills
│
├── 🤖 MCP Server (`mcp-server/`)
│   ├── site_mcp.py             # Standard Model Context Protocol (MCP) server exposing site resources, telemetry & tools
│   └── mcp_config.json         # MCP server registration config for AI IDEs & desktop clients
├── 🛠️ Automation Scripts (`scripts/`)
│   ├── site_automation.py      # Hyper-automation engine: site telemetry, version syncing & tracker logging
│   ├── verify.py               # 25-category diagnostic suite: cross-page links, asset references, JS syntax, versions, JSON-LD, claim provenance, size budgets
│   ├── extract_index.py        # Python script to extract searchable items into the static command palette index
│   └── dev-serve.py            # Local HTTP dev testing server with project root resolution, CORS headers & MIME type handling
│
├── 🤖 GitHub Workflows (`.github/workflows/`)
│   ├── deploy-pages.yml        # Automated GitHub Pages deployment
│   ├── stamp-last-commit.yml   # CI bot stamping last commit hash, timestamp & message on every push (with retry loop)
│   ├── update-search-index.yml # CI bot auto-regenerating search index on HTML content changes
│   ├── verify.yml              # CI workflow running Node.js syntax checks & Python verification suite
│   └── lighthouse-audit.yml    # CI automated Lighthouse accessibility and performance audit
│
├── 📊 Dev Logs & Knowledge Graph (`dev-logs/` & `graphify-out/`)
│   ├── dev-logs/
│   │   ├── PortfolioWebsite_TRACKER.md # Comprehensive release tracker & build log
│   │   ├── og-image/           # Template & instructions for generating Open Graph social cards
│   │   └── secrets/            # Git-ignored local development credentials
│   └── graphify-out/           # Codebase knowledge graph analysis (community hubs, god nodes, AST report)
│
└── ⚙️ Configuration & Maintenance
    ├── sync.ps1                # PowerShell script for zero-conflict pulls, conventional commit generation & pushing
    ├── sitemap.xml             # XML sitemap for search engine crawlers (Google, Bing)
    ├── robots.txt              # Search engine crawler directives (including modern AI crawlers)
    ├── AGENTS.md               # Codebase rules, Graphify instructions & Git workflow directives
    ├── CLAUDE.md               # Context summary for AI pair programming
    ├── LICENSE                 # Repository license
    ├── .gitignore              # Excluded files (local secrets, bytecode, graph cache)
    ├── .gitattributes          # Git repository attribute definitions
    └── .hintrc                 # Webhint linter configuration
```

---

## 🔒 Multi-Tier Access Control & Security Model

> **Security Demonstration Notice:** This access-control system is an educational demonstration of client-side cryptography, authentication flows, and encrypted content gating on a static GitHub Pages application. It is intentionally client-side by design and is not intended to provide server-enforced authorization for genuinely confidential resources. It showcases Web Crypto API usage (AES-256-GCM, PBKDF2), Google Identity Services integration, and encrypted DOM lifecycle management as engineering concepts.

The site features an advanced **Zero-Leak Client-Side Access Control System** supporting 3 security tiers:

| Tier       | Role                | Access Level & Capabilities                                                                                                                                                                                                                                           |
| :--------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tier 0** | **Public Guest**    | Standard visitor view. Full portfolio, project descriptions, skills & certificates. GitHub source code links display as `🔒 GitHub Repo (VIP Access Required)`.                                                                                                       |
| **Tier 1** | **Higher Tier VIP** | Unlocked via passcode (`vip2026`) or Google Sign-In with an authorized email/domain. Grants direct access to all GitHub repository links, private project specs & extended metrics.                                                                                   |
| **Tier 2** | **Master Admin**    | Unlocked exclusively via Google Sign-In with Master email (`aaradhyadevtmr@gmail.com`). (Manual passcode authentication is disabled for Master Level). Grants Master Control Panel modal, live VIP allowlist manager, simulated tier switching & diagnostic controls. |

### 🔍 Technical Security Architecture

- **Zero Raw HTML Leakage**: Gated HTML content blocks are pre-encrypted into hex ciphertexts (`ACCESS_CONTROL_PAYLOADS`). Public HTML source contains no unencrypted text or hidden DOM nodes inspectable via Chrome DevTools (`F12`).
- **Web Crypto API Encryption**: Key derivation uses PBKDF2 with SHA-256 (100,000 iterations and salt `adt_salt_2026`) with in-memory key memoization (`KEY_CACHE`). Content is encrypted using **AES-256-GCM** and decrypted dynamically into browser memory only upon successful authentication.
- **In-Memory DOM Lifecycles**: Decrypted DOM fragments exist only while authenticated and are completely purged on logout or lock.
- **Fail-Closed Master Level Visibility**: Master Level controls and exclusive administrative panels (`#master-exclusive`) are styled with default `display: none` in CSS (failing closed) and unlocked exclusively upon signing in with the Master administrator Google account (`aaradhyadevtmr@gmail.com`).

---

## 🔑 Google OAuth 2.0 Integration

- Powered by the official **Google Identity Services SDK** (`https://accounts.google.com/gsi/client?hl=en`).
- **Client-Side Verification**: Decodes Google ID tokens (JWT) to extract email, full name, and avatar picture.
- **Automatic Tier Elevation**: Matches authenticated email against Master administrator account (`aaradhyadevtmr@gmail.com`) or the active VIP email allowlist to instantly elevate session privileges.
- **Custom VIP Allowlist Management**: Master Admin control panel features a live allowlist manager widget to add/remove custom VIP user emails dynamically (stored locally in `localStorage`).
- **User Navigation Avatar**: Displays the user's Google profile picture inside the navigation bar upon sign-in.

---

## 🔍 Site Search & Unified Command Palette

Press **`/`** (or click the **Search** button in the navigation bar) on any page to open the unified **Command Palette**.

### Key Features

- **Instant Cross-Page Search**: Searches across all 10 site pages, all 39 achievements, all 30 projects, and direct quick-navigation commands.
- **Dual Index Strategy**:
  1. `SEARCH_STATIC_INDEX`: Pre-compiled static snapshot bundled into `assets/js/script.js` and `assets/js/modules/cmdk.js` so search works immediately on non-list pages (`index.html`, `contact.html`, `about.html`, etc.).
  2. **Live DOM Scanning**: Real-time DOM fallback scanner on `achievements.html` and `projects.html` to instantly reflect any client-side content edits in search results.
- **Automated CI Re-Indexing**: On every push, GitHub Actions workflow `.github/workflows/update-search-index.yml` runs `scripts/extract_index.py` to regenerate the static index automatically.

---

## 💻 Interactive Developer Terminal Widget (`#adtTerminal`)

Located directly on the Home page (`index.html`), the **Interactive Dev Terminal** (`adt-shell`) allows visitors to explore Aaradhya's technical profile via a CLI-style interface.

### Terminal Commands

- `skills`: Overview of core firmware, AI/ML, robotics, and software toolstacks.
- `radar`: Opens the interactive 5-axis Skill Radar visualizer.
- `resume`: Opens the recruiter ATS Resume Generator & Multi-Format Exporter.
- `projects`: Summary of featured engineering projects (SPARK, GCSBR, Pulse Live, PrakopNet).
- `run [name]`: Runs interactive hardware telemetry simulations (`run spark`, `run gcsbr`, `run prakopnet`, `run pulselive`).
- `stats`: Structured site telemetry summary (projects, achievements, milestones, target hardware).
- `benchmark`: Client browser runtime performance, DOM elements, loaded scripts, and heap metrics.
- `glossary [term]`: Looks up technical engineering acronyms.
- `experience`: Engineering leadership roles (IEEE KEC Vice Chair, Fuse AI Fellow, NSSR Fellow).
- `achievements`: Overview of 39 verified certifications and competition awards.
- `contact`: Direct email, GitHub, and LinkedIn links.
- `shortcuts`: Opens the **Keyboard Shortcuts HUD** cheat sheet modal (`?`).
- `share`: Triggers native Web Share API dialog or copies portfolio URL.
- `history`: Inspects recent command execution history traversal.
- `whatsnew`: Triggers the **What's New** major releases modal (`Shift+N`).
- `healthcheck`: Runs **client-side site diagnostics** (modules, SW, version, timing, nav links).
- `theme`: Toggles site light/dark color scheme (`0`).
- `accent [theme]`: Easter egg color theme switcher (gold, emerald, violet, cyan, ruby, prism).
- `sound / audio`: Toggles UI micro-sound audio cues (`Shift+A`).
- `tour`: Launches the interactive guided spotlight tour across the site (`Shift+T`).
- `matrix`: Renders cybernetic digital rain animation stream.
- `goto [page]`: Direct terminal navigation to any site page (`home`, `projects`, `experience`, `achievements`, `about`, `journey`, `contact`).
- `cv`: Quick download/view official Curriculum Vitae (PDF).
- `email`: Direct mailto trigger.
- `filter [category]`: Filter projects by category (`aiml`, `robotics`, `hardware`, `web`).
- `clear`: Clears terminal screen.

### UX Features

- **Tab Autocompletion**: Press `Tab` to autoplete commands and subcommands with inline suggestions.
- **Cross-Session Command History**: Persistent `localStorage` history buffer navigated with `ArrowUp` / `ArrowDown`.
- **1-Click Quick Preset Pills**: Clickable command buttons (`help`, `skills`, `projects`, etc.) for instant command execution without typing.
- **HTML Output Formatting**: Color-coded text (`.term-green`, `.term-gold`, `.term-cyan`), prompt indicators (`visitor@adt:~$&nbsp;`), and clickable links.
- **Keyboard-Friendly**: Binds to `Enter` for execution and auto-scrolls to latest prompt output.

---

## ⌨️ Global Keyboard Navigation & Shortcuts HUD

Press **`?`** (or **`Shift+/`**) anywhere on the site to trigger the **Keyboard Shortcuts HUD Modal**:

- **`1` – `7`**: Instant direct page navigation (`Home`, `Projects`, `Experience`, `Achievements`, `About`, `Journey`, `Contact`).
- **`/`** or **`Ctrl+K`**: Global omnibar Command Palette search.
- **`0`**: Toggle dark / light theme mode.
- **`` ` ``**: Toggle Bikram Sambat (B.S.) / A.D. date formats.
- **`Shift+N`**: What's New release history & changelog.
- **`Shift+T`**: Interactive guided site tour.
- **`Shift+A`**: Toggle synthesized Web Audio micro-sounds.
- **`=` / `-`**: Fast depth page scroll jump (top / bottom).
- **`Esc`**: Universal master dismiss for active modals, drawers, and popovers.

---

## ⚡ Local Development & Git Workflow

### Verification & Diagnostic Suite

To run the complete 25-category diagnostic verification engine locally:

```bash
python scripts/verify.py            # Standard verification check
python scripts/verify.py --verbose  # Detailed check report with passes
python scripts/extract_index.py   # Regenerates static search index
python scripts/dev-serve.py        # Starts local server on http://127.0.0.1:5500
```

Quantitative claims are validated from the repository-local
`data/quantitative-claims.json` boundary. Published records require immutable
40-character source SHAs plus repository path, verification test, metric, and
scope references; records without a known SHA are machine-detectable
`needs_review` entries. See `data/README.md` for the optional, copy-in
brainstorm manifest boundary. CI runs immediate push/PR checks and repeats the
generated-index check after the search-index workflow completes.

Alternatively, open `index.html` directly in any web browser.

### Automated Git Workflow & Pre-Commit Gate (`sync.ps1`)

To prevent merge conflicts with GitHub Actions commit-back bots and ensure code quality:

- **Routine & Minor Updates** (Auto-runs index extraction, graphify knowledge update, `verify.py` pre-commit gate, conventional commit generation & push):

  ```powershell
  .\sync.ps1
  ```

- **Major Architectural & Feature Updates** (Passes descriptive commit summary):

  ```powershell
  # 1. Update dev-logs/PortfolioWebsite_TRACKER.md with release notes first
  # 2. Run sync script with detailed message:
  .\sync.ps1 -m "feat(scope): detailed architectural summary"
  ```

- **Version Bump & Metadata Sync** (Syncs `sw.js` cache name, `sitemap.xml`, and tracker):

  ```powershell
  .\sync.ps1 -v v50
  ```

- **Dry Run / Preview Mode** (Checks index, graph, verification, and previews auto-commit message without pushing):

  ```powershell
  .\sync.ps1 -WhatIf
  ```

- **Safe Remote Pull** (Safely pulls with `--autostash`):

  ```powershell
  .\sync.ps1 -PullOnly
  ```

- **Repository Diagnostics & Health**:

  ```powershell
  .\sync.ps1 -Status
  ```

- **Bypass Pre-Commit Gate (Urgent WIP / Hotfix)**:

  ```powershell
  .\sync.ps1 -SkipVerify  # or .\sync.ps1 -Force
  ```

---

## 📈 Codebase Knowledge Graph (`Graphify`)

This repository uses **Graphify** for local AST-level knowledge graph extraction, mapping code abstractions, script functions, HTML components, and cross-file dependencies.

> ℹ️ **Note**: `graphify-out/` is a local analysis directory; generated cache and dated snapshots are ignored.

- **Local Report**: View metrics & god nodes locally at `graphify-out/GRAPH_REPORT.md`.
- **Update Graph**: Regenerate the knowledge graph locally after modifying code:

  ```bash
  graphify update .
  ```

---

## 📬 Contact & Connect

- **Email**: `aaradhyadevtmr@gmail.com`
- **GitHub**: [github.com/aaradhyadt](https://github.com/aaradhyadt)
- **LinkedIn**: [Aaradhya Dev Tamrakar](https://www.linkedin.com/in/aaradhya-dev-tamrakar)
- **Portfolio Site**: [aaradhyadt.github.io](https://aaradhyadt.github.io)

---

## 📄 License

This project is proprietary software. All rights reserved © 2026 Aaradhya Dev Tamrakar. See the [LICENSE](LICENSE) file for details.
