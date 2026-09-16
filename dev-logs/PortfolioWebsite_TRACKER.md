# Portfolio Website Tracker — v54.5

Last updated: _2026-09-16_




- **v54 (Major Release) — Ecosystem Multi-Repo Fleet Harmonization & Baseline v1.0 Freeze.** Shipped ecosystem multi-repo fleet harmonization & baseline v1.0 freeze.
  - Core updates and architectural improvements for v54
  - PWA & Cache: Bumped Service Worker cache to aaradhya-portfolio-v54

- **Future Roadmap & Strategic Architecture (Backlog)**:
  - **[RFC] Portfolio-OS SDK & Template Framework**: Strategic initiative to decouple the portfolio engine (zero-dependency Vanilla ES modules, CmdK, interactive terminal, Web Audio FX, AES-256-GCM encrypted VIP gates, 24-category diagnostic suite, and native MCP server) into an open-source starter template and developer SDK. Full design specification logged in [`dev-logs/RFC_PORTFOLIO_OS_SDK.md`](RFC_PORTFOLIO_OS_SDK.md).
  - **[Architecture Note] High-Performance 3D WebGL & Demand-Driven Rendering Architecture**: Technical case study on Google CodeWiki (`codewiki.google`), documenting hardware instancing (`InstancedMesh`), event-driven loop throttling, Web Worker physics computation, and zero-framework implementation blueprints for future spatial knowledge graphs. Documented in [`dev-logs/REFERENCE_HIGH_PERFORMANCE_3D_WEBGL.md`](REFERENCE_HIGH_PERFORMANCE_3D_WEBGL.md).

- **v53 (Major Release) — Visual Regression Engine & Native Dynamic ESM Suite.** Shipped visual regression engine & native dynamic esm suite.
  - Core updates and architectural improvements for v53
  - PWA & Cache: Bumped Service Worker cache to aaradhya-portfolio-v53
  - **Multi-Dimensional Architecture Evaluation & Evolution Roadmap (`dev-logs/EVOLUTION_AREAS.md`)**: Conducted systematic repository evaluation across 7 dimensions (9.5/10, S-Rank composite score), codifying core architectural strengths and defining 4 priority evolution tracks:
    - **Track 1 (DOM Decomposition)**: Extract modal sub-renderers from `ui.js` (`shortcuts.js`) to elevate module cohesion and PWA asset modularity.
    - **Track 2 (Cross-Platform Sync)**: Implement `python scripts/site_automation.py sync` for seamless POSIX/Linux/macOS developer environments.
    - **Track 3 (WebAuthn / Passkeys)**: Integrated hardware-bound FIDO2 authenticator challenge & passkey registration for Tier 2 Master Admin verification with full zero-leak fallback, modal triggers, and unit tests.
    - **Track 4 (ESM & Waterfall Benchmarking)**: Built `scripts/benchmark_bundle.py` for cold-start network waterfall comparisons across 3G, 4G, and fiber simulation.
  - **High-Performance 3D WebGL Knowledge Graph HUD (`assets/js/modules/graph-modal.js`)**: Engineered zero-dependency WebGL 2 AST knowledge graph visualizer (723 nodes, 982 edges) modeled after Google CodeWiki's architecture. Features hardware instanced draw calls (`drawElementsInstanced` / `drawArrays`), demand-driven (dirty) throttled render loop with auto-cancellation on idle/dismiss, hybrid Canvas backplate + DOM tooltip foreplate, raycast hover detection, and multi-surface triggers via Dev Terminal (`graph`, `topology`, `ast`), CmdK search palette, and `Shift+G` hotkey.
  - **3D Knowledge Graph WebGL Rendering Engine Calibration (`assets/js/modules/graph-modal.js`)**:
    - **Dynamic Viewport Synchronization**: Bound `ResizeObserver` to `#graphCanvasWrap` with staggered multi-tick initial triggers (0ms, 50ms, 200ms) ensuring guaranteed pixel dimensions post modal transition.
    - **Visual Geometry & Node Illumination**: Scaled sphere geometry mesh radius to 1.75 (3.2x enlargement), added directional key lighting with Fresnel rim glow shader to all nodes, and enhanced connector line alpha to 0.38 with warm gold illumination.
    - **Dynamic Hardware Instancing**: Implemented dynamic buffer upload (`gl.bufferSubData`) for `aInstanceScale` delivering real-time 2.4x hover node scaling, and expanded raycast hit radius to 0.065 NDC for effortless mouse/touch selection. Fully verified across all 24 diagnostic categories.
  - **ExplainGit-Style 2D/3D Dual-Mode Knowledge Graph HUD (`assets/js/modules/graph-modal.js`, `graph-modal.css`)**:
    - **Dual-Mode 2D Map & 3D Orbit Views**: Introduced segmented pill toggle `[ 2D Map | 3D Orbit ]` in the HUD header. In 2D mode, nodes are mapped to clean 2D community cluster spirals with drag-to-pan (`panX`, `panY`), zoom in/out/reset controls, and hairline edges (`rgba(82, 100, 140, 0.22)`). In 3D mode, nodes rotate in full spatial spherical orbit with directional and Fresnel rim lighting.
    - **Smooth Interpolated Morphing**: Built a 600ms cubic-eased continuous vertex/line morphing pipeline interpolating 3D and 2D layouts dynamically via WebGL buffer subdata uploads without rebuilding geometry.
    - **ExplainGit 12-Color Palette & Neighbor Spotlighting**: Applied ExplainGit's GitHub-refined 12-color community palette. Implemented graph adjacency lookups: hovering any node dynamically spotlights that node (2.6x scale, electric blue) and direct first-degree neighbors (1.65x scale, illuminated edges) while dimming unconnected background nodes to 22% opacity.
    - **Smart Tooltip Auto-Flipping & Boundary Clamping**: Fixed detail box overflow/clipping on hover. The tooltip now measures relative to `#graphCanvasWrap`, automatically flipping left when approaching the right boundary and upward when approaching the bottom boundary, strictly clamped within canvas edges.

- **v52 (Major Release) — Visual Regression Engine & Native Dynamic ESM Suite.** Shipped visual regression engine & native dynamic esm suite.
  - Core updates and architectural improvements for v52
  - PWA & Cache: Bumped Service Worker cache to aaradhya-portfolio-v52

- **v51.4 (Update) — Version Bump Pipeline Hardening, 5-Pillar Decision Calibration & E2E Stream Routing.** Hardened site hyper-automation engine, version consistency verification, and process output piping:
  - **12-Target Version Synchronization Expansion**: Added automated synchronization and strict verification for `README.md` version badge, `pyproject.toml` project semver, `dev-logs/PortfolioWebsite_TRACKER.md` State of Play PWA cache entry, `.github/workflows/verify.yml` CI header, and `assets/js/modules/terminal.js` fallback version strings.
  - **5-Pillar Decision Matrix Calibration (`site_automation.py`)**: Calibrated scoring weights so each pillar satisfies the threshold for a major release recommendation (4 pts per pillar, score >= 4), expanded trigger explanations to show pillars satisfied count (`Pillars Triggered: X/5, Confidence Score: Y/20`), and fixed git porcelain status column parsing (`line.rstrip("\r\n")`) preventing path truncation.
  - **Process Execution & Output Stream Routing (`sync.ps1`)**: Routed `Invoke-PythonScript` execution to `Out-Host` ensuring real-time stdout/stderr rendering to terminal without swallowing into function return value, and resolved array argument flattening in `Start-ThreadJob` scriptblocks via unary comma wrapping (`(,$prefix)`).
  - **Verification Gate**: Passed `python scripts/verify.py` cleanly across all 24 diagnostic categories (0 errors, 0 warnings); passed all 42 `scripts/test_e2e.py` smoke tests.

- **v51 (Major Release) — Tooling Hyper-Optimization, Astral uv Engine & Dev Drive ReFS Acceleration Suite.** Shipped fundamental repository workflow overhaul accelerating sync, testing, and indexing pipelines by up to 7x:
  - **Astral `uv` Package Manager & Project Standard (`pyproject.toml`, `uv.lock`)**: Integrated Astral `uv` into repository tooling with standardized PEP 517/621 project manifest (`pyproject.toml`), precompiled bytecode (`compile-bytecode = true`), and copy-on-write link mode. Added automatic fallback to system Python for environments without `uv`.
  - **Dev Drive (ReFS) Block Cloning & FSMonitor Acceleration (`sync.ps1`)**: Optimized disk I/O for Windows Dev Drive environments running ReFS: automated CoW block cloning (`link-mode = "clone"`), co-located package cache (`$env:UV_CACHE_DIR`), and enabled Git FSMonitor with untracked cache (`core.untrackedcache = true`) for microsecond-level status scans.
  - **Sync Pipeline Speedup (45.7s → ~6-11s, 4-7x Acceleration)**:
    - **Routine AST Knowledge Graph Sync**: Eliminated redundant routine LLM extractions (`graphify .` and `graphify cluster-only .`) from routine syncs, running fast AST-only incremental updates (`graphify update .`). Preserved full semantic rebuilds under explicit `-FullGraph` (`-GraphRebuild`) switch.
    - **Parallel Pre-Commit Verification Gate**: Parallelized E2E smoke tests (`test_e2e.py`) and site verification (`verify.py`) via PowerShell `Start-ThreadJob`, running all 42 smoke tests and 24 verification categories concurrently.
    - **Subprocess & Git Overhead Reduction**: Eliminated redundant Git commands on `assets/js/last-commit.json` via conditional single-command resets, conditioned Git LFS pulls to only run when upstream commits are fetched, and added `-SkipBotSync` (`-NoBot`) for immediate finish after push.
  - **Verification Gate**: Passed `python scripts/verify.py` cleanly across all 24 diagnostic categories (0 errors, 0 warnings); passed all 42 `scripts/test_e2e.py` smoke tests.

- **v50.24 (Update) — 5-Project Ecosystem Synchronization & Encrypted Repository Integration.** Synchronized 5 flagship engineering repositories across projects showcase, interactive terminal, and zero-leak AES-256-GCM payload encryption:
  - **NovaOptimizer (`system-optimizer`, `p-007`)**: Upgraded card from prototype SysOptimizer to native Windows Task Manager and System Optimizer engineered in C# / .NET 10 and WPF with a ~25 MB RAM footprint. Documented undocumented NT kernel memory purging (`NtSetSystemInformation` standby list & system working sets), Turbo Boost profiles (Game, Work, Study with integrated Pomodoro timer), and hung-process watchdog. Wired encrypted VIP link `proj-sys-optimizer`.
  - **md2pdf Desktop (`md2pdf-desktop`, `p-024`)**: Integrated new desktop Markdown-to-PDF utility workstation with Tkinter GUI, Pandoc AST parsing, and wkhtmltopdf WebKit rendering. Wired encrypted VIP link `proj-md2pdf`.
  - **Claude Desktop Multi-Profile & Autonomous Fleet (`Claude-Desktop`, `p-021`)**: Updated card with v2 cloud-native architecture including concurrent multi-monitor windows (`--user-data-dir`), FastAPI coordination backend, SQLite WAL persistence with atomic leasing, and autonomous worker client fleet.
  - **SPARK Wearable (`SPARK`, `p-015`)**: Integrated encrypted VIP repository link `proj-spark` and updated milestone delivery progress.
  - **BiasAperture (`BiasAperture`, `p-018`)**: Integrated encrypted VIP repository link `proj-biasaperture` and detailed completed M1–M4 detection engine milestones, AIF360/Fairlearn cross-validation, and EU AI Act Article 10 compliance reporting.
  - **Site Metrics & Index Synchronization**: Refreshed project card counts (29 → 30 total, 8 → 9 web/apps) across `projects.html` filter bar, Dev Terminal telemetry/commands, and regenerated static search index (`extract_index.py`).

- **v50.10 (Architecture & Optimization) — PWA Raster Icons, Modular Constants, Zero-Dependency CSS Minifier & Centralized Versioning.** Shipped comprehensive structural and optimization refinements:
  - **PWA Raster Icons & Manifest Compliance (`site.webmanifest`, `sw.js`, `generate_pwa_icons.py`)**: Generated standard 192x192 and 512x512 PNG icons alongside existing SVG icon, ensuring 100% PWA installability and compliance across Chromium/Safari.
  - **Constants Modularization (`assets/js/modules/constants.js`)**: Decomposed monolithic `core.js` by extracting `SITE` configuration, `SOCIAL_ICONS`, `QUICK_NAV_PAGES`, `CMDK_TYPE_LABEL`, and `CMDK_ICONS` into a dedicated constants module loaded ahead of `core.js`.
  - **Zero-Dependency CSS Module Minifier (`scripts/build_css.py`, `sync.ps1`)**: Implemented standalone Python CSS module compressor achieving ~24.4% size reduction across all 9 CSS modules (~30.7 KB saved), integrated directly into `sync.ps1` workflow.
  - **Single-Source Version Centralization (`VERSION`, `verify.py`, `site_automation.py`)**: Introduced root `VERSION` file as the unified source of truth, integrated into the 22-category `verify.py` test suite and `site_automation.py` auto-propagation pipeline.
  - **Speculative Rules Optimization (`404.html`)**: Trimmed speculation rules on 404 error page to only pre-render the homepage destination.
  - **Verification Gate**: Passed `python scripts/verify.py` across all 22 diagnostic categories cleanly (0 errors, 0 warnings); `node --check` validated syntax across all JS files.

- **v50.9 (Update) — Service Worker Dynamic Push Notification Suite & Client Notification API.** Shipped dynamic push notification and client notification ergonomics:
  - **Dynamic Background Push Notification Hooks (`sw.js`)**: Implemented `push` event handler with resilient fallback parsing, rich notification parameters (vibrations, action buttons, icons, project routing tags), and `notificationclick` matching logic to focus active tabs or launch destination windows.
  - **Client Notification & Push Utilities (`assets/js/modules/core.js`)**: Added `requestNotificationPermission()` and `subscribePushNotifications()` with full browser capability checking, audio cues, and toast status feedback.
  - **Dev Terminal Integration (`assets/js/modules/terminal.js`)**: Added `notify` / `notifications` terminal commands allowing users to trigger and test browser notifications directly from `#adtTerminal`.
  - **Verification Gate**: Passed `python scripts/verify.py` across all 22 diagnostic categories cleanly (0 errors, 0 warnings).

- **v50.8 (Update) — 100/100 Perfection Suite: CI Axe/Lighthouse Assertions, WCAG AAA Micro-Contrast & OpenGraph Generator.** Shipped 3-pillar upgrade elevating site quality to 100/100 tier:
  - **CI Automated Axe-Core & Lighthouse Assertions (`.lighthouserc.json`, `lighthouse-audit.yml`)**: Configured formal Lighthouse CI configuration with strict category assertions across Accessibility (>= 0.95), Best Practices (>= 0.90), and SEO (>= 0.95) across all 7 pages, paired with automated Pa11y / Axe-Core accessibility audits in GitHub Actions.
  - **WCAG AAA Micro-Contrast Token Upgrade (`tokens.css`, `components.css`)**: Elevated `--muted` token (`#a39d94` → `#b3ada4`) achieving 8.3:1 contrast ratio against `--bg` (`#0f0e0c`) and 7.9:1 on `--bg2`, exceeding strict WCAG AAA contrast standards (&ge; 7.0:1). Enhanced `.tag` chip styling with medium font-weight, letter-spacing, and subtle background backing for crystal-clear readability.
  - **Automated OpenGraph Social Preview Generator (`scripts/generate_og_cards.py`)**: Implemented standalone Python generator creating standard 1200x630 SVG social preview cards for master site and key featured projects (`spark`, `fuse-ai`, `gcsbr`, `alpha`) with zero external runtime dependencies.
  - **Verification Gate**: Passed `python scripts/verify.py` across all 22 diagnostic categories cleanly (0 errors, 0 warnings).

- **v50 — Keyboard Shortcuts HUD, Web Share API, Terminal History & CV Alignment Suite.** Shipped major UX, developer ergonomics, and CV alignment features:
  - **Keyboard Shortcuts HUD Modal (`?` / `Shift+/`)**: Zero-scroll at-a-glance cheat sheet modal with instant page navigation (`1-7`), theme toggle (`0`), date toggle (`` ` ``), release history (`Shift+N`), tour (`Shift+T`), audio cues (`Shift+A`), and master close (`Esc`).
  - **Web Share API (`navigator.share`)**: Integrated native OS share sheet with automatic clipboard fallback across ATS Resume modal (`#resumeShareBtn`), Command Palette (`cmdk.js`), and Dev Terminal (`share`).
  - **Dev Terminal History Persistence & Aliases (`terminal.js`)**: Added cross-session `localStorage` command history traversal (`ArrowUp`/`ArrowDown`), `Tab` autocompletion for commands and subcommands, and developer aliases (`ls`, `whoami`, `cat`, `ping`, `cls`, `share`, `history`).
  - **Tailored ATS Resume Generator & CV Alignment (`ui.js`, `resume-data.js`)**: Aligned section hierarchy (`PROFILE`, `EDUCATION`, `EXPERIENCE`, `FELLOWSHIPS`, `PROJECTS`, `TECHNICAL SKILLS`, `CERTIFICATIONS & ACTIVITIES`), typography, and multi-format exports (`.MD`, `.JSON`, `.TXT`, `@media print` A4 PDF) with the official master CV.
  - **Speculation Rules & Modern Performance**: Instant pre-rendering of core page destinations in Chromium-based browsers.


- **v49.49 (Update) — Dev Terminal Autocomplete & Aliases, ATS JSON Resume Exporter, Speculation Rules & LLM Full Context Suite.** Shipped 5-track feature and architecture upgrades:
  - **Dev Terminal Tab Autocomplete & Developer Aliases (`terminal.js`)**: Added `Tab` autocompletion for top-level commands (`help`, `skills`, `radar`, `resume`, `projects`, etc.) and subcommands (`goto`, `filter`, `run`, `cat`, `accent`), with inline suggestions on multiple matches. Added developer aliases: `ls` (directory & module index), `whoami` (identity & fellowship overview), `cat` (quick viewer for `cv`, `bio`, `spark`, `skills`), `ping` (network latency benchmark), and `cls` (clear screen).
  - **ATS Resume JSON Standard Exporter (`ui.js`)**: Added one-click **Download .JSON** button conforming to standard JSON Resume schema (`basics`, `education`, `sections`, `profiles`), enabling automated ATS parsing and profile imports alongside Markdown, Plain Text, and A4 print exports.
  - **Speculative Rules API & Hardened Referrer Privacy (`*.html`)**: Integrated `<script type="speculationrules">` across all 10 HTML head blocks for instant pre-rendering of core navigation destinations in modern Chromium browsers, paired with `<meta name="referrer" content="strict-origin-when-cross-origin">`.
  - **AI Engine Optimization & Full Context (`llms-full.txt`, `llms.txt`, `sw.js`)**: Published comprehensive `llms-full.txt` context specification detailing all engineering projects (SPARK, Fuse AI pipelines, GCSBR, Nexus, Alpha), coursework, and verified leadership; registered in `llms.txt` and precached in Service Worker for offline AI tool availability.
  - **Verification Gate**: Passed `python scripts/verify.py` cleanly across all 22 diagnostic categories (0 errors, 0 warnings); `node -c` validated syntax across all modified JS files.

- **v49.46 (Refactor) — Technical Debt Purge: Data Extraction, Dead CSS Removal & Home Widget Modularization.** Three-part architectural cleanup of the shared runtime:
  - **Dead Orchestrator Removed (`assets/css/style.css`)**: Deleted the orphaned @import stylesheet that zero pages linked to; corrected stale comments in `index.html` and `404.html` to point at `modules/layout.css` / `modules/components.css`; purged references from `sw.js`, `verify.py`, `site_automation.py`, and README.
  - **Static Data Extraction (`assets/js/data/`)**: Moved `SITE_RELEASES` (282 lines), `SEARCH_STATIC_INDEX` (492 lines) out of `script.js` (46.9KB → 7.7KB, −84%) and `RESUME_DATA` out of `ui.js` into three dedicated data files loaded first via the MODULES array; retargeted the full automation pipeline — `extract_index.py`, `site_automation.py` version read/bump, `update-search-index.yml` commit path, and `verify.py` block/staleness checks — to the new locations; `sw.js` precaches all three for offline search & What's-New.
  - **Home Widget Modularization (`assets/js/modules/home-widgets.js`)**: Migrated index-only inline scripts (Kathmandu clock, live date labels, last-commit badge) into a guarded module that boots after `__modulesLoadedPromise`; removed duplicate `core.js`/`ui.js` preload hints from `index.html` (1542 → 1453 lines).
  - **Verification Gate**: Passed `python scripts/verify.py` cleanly across all 22 diagnostic categories (0 errors, 0 warnings); `node --check` green on all 6 touched JS files; search-index regeneration confirmed idempotent.
- **v49.37 (Update) — Synchronized ATS Resume Generator with Actual Uploaded CV.** Aligned the interactive ATS Resume Generator in `assets/js/modules/ui.js` with the official master curriculum vitae (`AARADHYA_DEV_TAMRAKAR_CV.docx` / `.pdf`):
  - **Comprehensive Master CV & Role Profiles (`assets/js/modules/ui.js`)**: Updated `RESUME_DATA` with full canonical profile data including Year IV/I BEI at KEC (IOE Tribhuvan University, expected Jan 2027), active Fuse AI Fellowship (5-stage Text-to-SQL at 100% benchmark, Churn/CLV ROC-AUC 0.841, Bayesian PyMC inference, time series forecasting ensemble MASE 2.44), NSSR DataCamp Fellowship, SPARK edge-AI wearable with TFLite Micro CNN INT8 & local SHAP attribution, GCSBR examiner-rated minor project, Edge AI Stability Detection, Alpha Android Super-App (Kotlin/Compose SDK 36), Nexus Personal AI OS, and verified leadership (IEEE KEC KTM Student Branch Vice Chair & former Vice Secretary, EPC Event & Resource Manager, KEC Makerspace Ambassador).
  - **Tailored Role Tracks**: Refreshed role-specific views across Master CV (`all`), AI / ML Engineer (`aiml`), Electronics & Embedded (`hardware`), and Software & Android (`fullstack`) with exact matching skills, projects, and summaries for Plain Text ATS copy, Markdown (.md) download, and A4 print/PDF.
  - **Verification Gate**: Passed `python scripts/verify.py` across all 22 diagnostic categories cleanly (0 errors, 0 warnings).

- **v49.27 (Update) — xTool Laser Safety & Maintenance Credentials and Diagnostic Alignment.** Synchronized site metadata and verified credentials across the portfolio:
  - **Verified Credentials & Lightbox Sync**: Integrated xTool Laser Safety Awareness Training (`achv-37`) and Printer Maintenance Certification (`achv-38`) with 39 verified achievements total, WebP previews, and PDF downloads.
  - **Telemetry & Terminal Sync**: Updated CLI command fallback parameters, diagnostic healthchecks, and site metrics in `assets/js/modules/terminal.js` and `mcp-server/site_mcp.py` to reflect 39 achievements and the 22-category verification suite.
  - **Verification Gate**: Passed `python scripts/verify.py` cleanly across all 22 diagnostic categories (0 errors, 0 warnings).

- **v49.25 (Update) — Global Search Expansion for Page Locations & Landmark Sections.** Enhanced site-wide command palette (`/` / `Cmd+K`) search to index key landmark sections, features, and page locations across all pages:
  - **Comprehensive Page Locations & Landmarks (`assets/js/modules/cmdk.js`)**: Indexed major sections including Explore (`/index.html#quick-nav`), Interactive Dev Terminal / CLI (`/index.html#terminal-section`), Keymap & Display Guide (`/index.html#keymap`), Domain Competency Radar (`/about.html#skill-radar`), Education (`/about.html#education`), Skills & Technical Stack (`/about.html#skills`), Biography (`/about.html#about-intro`), Workflow & Toolbox (`/about.html#tools`), Schedule (`/about.html#itinerary`), FAQ (`/about.html#faq`), Stats (`/index.html#stats`), Access Control (`/index.html#about-sign-in`), and all sub-sections.
  - **Multi-Token Query Matching & Relevance Ranking**: Replaced strict substring search with multi-word token matching (`tokens.every(...)`) with smart title-exact, title-prefix, and keyword relevance sorting.
  - **In-Page Hash Navigation & Scroll Animation**: Upgraded `revealSearchTarget()` and result click handlers to smoothly scroll to in-page section headers with `.search-highlight` animation without full-page reloads.
  - **Verification Gate**: Passed `python scripts/verify.py` cleanly across all 22 diagnostic categories.

- **v49.20 (Update) — Added xTool Laser Safety Awareness Training & Printer Maintenance Certifications.** Integrated two new verified hardware & fabrication credentials from xTool Studio & KEC Makerspace:
  - **New Certificate Cards (`achievements.html`)**: Added `Laser Safety Awareness Training` (`achv-37`) and `Printer Maintenance Certification` (`achv-38`) under the Academic Certification track, complete with crisp 1700x1202 WebP thumbnails, PDF downloads, and lightbox modal integration.
  - **Asset Generation & Optimization (`assets/certificates/`)**: Converted source PDFs (`Laser-Safety-Awareness-Training.pdf` and `Printer-Maintenance-Certification.pdf`) to high-resolution WebP previews (`.webp`) optimized at ~52KB each.
  - **Search & Site Tour Metrics Synchronization**: Refreshed total achievements count from 37 to 39 across `assets/js/modules/tour.js`, `README.md`, and regenerated `SEARCH_STATIC_INDEX`.
  - **Verification Gate**: Passed `python scripts/verify.py` cleanly across all 22 diagnostic categories.

- **v49.18 (Update) — Build Hygiene & Graphify Snapshot Cleanup.** Hardened repository ignore rules and purged untracked local build cruft:
  - **Graphify Daily Snapshot & Cache Untracking (`.gitignore`)**: Added `graphify-out/20*` and `graphify-out/????-??-??/` patterns to `.gitignore`, and purged 400+ cached semantic AST files and historical dated snapshot directories (`graphify-out/2026-08-15` through `2026-08-18`) from the Git index (~1.5 MB repo footprint reduction).
  - **Verification Gate**: Passed `python scripts/verify.py` across all 22 categories cleanly (0 errors, 0 warnings).

- **v49.17 (Update) — Verification Suite Expansion & Hyper-Tightened Diagnostic Checks (22 Categories).** Shipped deep expansion of pre-commit & CI checking scripts (`scripts/verify.py` and `scripts/site_automation.py`) to permanently prevent code-quality, data-drift, and runtime bugs:
  - **JS Runtime Safety & Guard Enforcement (`js-safety`)**: Added automated AST/token scanner ensuring all optional global functions (`playAudioCue`) are safely guarded with `typeof ... === 'function'`, flagging any unprotected calls; detects redundant/orphan `DOMContentLoaded` and `window.load` listeners in modular JS; catches duplicate consecutive comment blocks and deprecated monolithic headers.
  - **Comprehensive Multi-Source Version Consistency (`version`)**: Expanded version validation from 5 sources to 17 distinct files (Service Worker `CACHE_NAME` & header, `script.js` header & Dynamic Module Loader & `SITE_RELEASES[0]`, `style.css` header, all 8 JS module headers, `TRACKER.md` title, `verify.py` banner, and `site_automation.py` header), backed by automated synchronization in `site_automation.py sync_metadata()`.
  - **CSS Asset & URL Reference Integrity (`css-integrity`)**: Added parser for all `url(...)` declarations in `style.css` and all 9 CSS modules, verifying referenced local fonts, images, and SVG filters exist on disk.
  - **Deep HTML, Accessibility & SEO Hygiene (`html-a11y-seo`)**: Added checks enforcing `alt` attributes on every `<img>`, `rel="noopener"` on all external `target="_blank"` links, single `<h1>` per page, `<html lang="en">`, non-empty `<title>`, `<meta name="description">`, and `<link rel="canonical">`.
  - **Cross-Surface Semantic Data Consistency (`data-consistency`)**: Added validation ensuring `RESUME_DATA` in `ui.js` matches canonical titles (e.g. "Vice Chair") and primary contact details/social URLs match across `core.js`, `contact.html`, and `about.html`.
  - **Dev Tracker & Markdown Hygiene (`tracker-hygiene`)**: Enforced Markdownlint MD009 (trailing whitespace) and MD026 (trailing punctuation in headings) across all documentation and tracker logs.
  - **Verification Gate**: Passed `python scripts/verify.py` across all 22 categories cleanly (0 errors, 0 warnings).

- **v49.6 / v49 (Update) — Comprehensive Mobile Responsiveness & Ultra-Small Screen Overhaul.** Shipped site-wide mobile responsiveness optimizations tailored for any viewport size down to ultra-small screens (280px–360px):
  - **CSS Cascade & Navigation Precedence Fix (`layout.css`, `base.css`)**: Resolved CSS precedence inversion by moving all responsive media queries for navigation into `layout.css` (enforcing `.nav-links { display: none !important; }` and `.nav-hamburger { display: flex !important; }` on screens &le; 900px), eliminating horizontal navigation clipping across mobile devices. Standardized responsive nav padding, action icon button dimensions (`34px` on &le; 480px, `30px` on &le; 340px), and logo typography scaling.
  - **Explore Quick-Nav & Clean URL Fix (`core.js`, `layout.css`)**: Fixed empty Explore section when browsing clean URLs (e.g. `/contact`) by introducing `getCurrentPageFile()` to resolve extensionless paths to canonical filenames, and refactored `.quick-nav-grid` into a responsive single-column layout on mobile with full card visibility.
  - **Interactive Skill Radar Auto-Boot & Responsive Canvas (`ui.js`, `script.js`, `components.css`, `about.html`)**: Integrated `initSkillRadar(false)` into `bootSite()` lifecycle to auto-render radar on load without disruptive auto-scroll. Made canvas container and dimensions dynamically responsive (`size = Math.min(340, Math.max(240, containerWidth))`), eliminated hardcoded inline section paddings in `about.html`, and added mobile-friendly card padding.
  - **Modal Padding De-Squishing (`access.css`, `components.css`)**: Removed double padding from `.wn-modal-card` (`padding: 0 !important;`) and scaled modal sheet padding in the ATS Resume Generator (`.resume-preview-sheet`, `.resume-preview-body`, `.resume-modal-footer` full-width button stack) and Access Control modals for narrow viewports.
  - **Floating Widgets & Section Grid Boundaries (`base.css`, `projects.html`, `experience.html`, `achievements.html`, `about.html`, `index.html`)**: Aligned `.audio-toggle`, `.back-top`, and `.scroll-pct` buttons with `safe-area-inset` support to prevent right-edge overflow; replaced static `minmax(320px, 1fr)` grids with fluid mobile column rules.
  - **Keymap & Display Guide Word Wrapping (`cmdk.css`)**: Added flex wrapping and responsive widths to `.keymap-list li` and `.keymap-mode` to prevent right-edge text clipping on small displays.
  - **Verification Suite**: Passed `python scripts/verify.py` across all 17 categories with 0 errors and 0 warnings.

- **v48 (Update) — Multi-Category Project Filters, ATS Multi-Format Exporter, Offline Contact Queue & Security Hardening.** Shipped comprehensive feature & security upgrades across the site:
  - **Interactive Multi-Category Project Filters (`projects.html`, `components.css`)**: Added dynamic category filter pill buttons (`All`, `AI/ML & Agentic`, `Robotics & Embedded`, `Hardware & Systems`, `Web & Apps`) with live count badges, smooth card visibility transitions, and intelligent section header toggling. Tagged all 29 project cards with granular `data-category` attributes.
  - **ATS Resume Multi-Format Exporter (`ui.js`, `components.css`)**: Expanded the Tailored ATS Resume Generator modal with one-click **Copy Plain Text ATS** (`copyResumePlainText`) and **Download Markdown (.md)** (`downloadResumeMarkdown`) capabilities alongside the existing A4 PDF print engine, giving recruiters instant access to machine-readable formats.
  - **Offline Contact Form Queue & Auto-Sync (`contact.html`, `script.js`)**: Integrated offline message queueing (`queueOfflineContactMessage`) when submitted while offline, with automatic background synchronization (`syncQueuedContactMessages`) upon connection restoration.
  - **Client-Side Passcode Rate Limiting & Cooldown (`access.js`)**: Implemented progressive brute-force rate limiting with a 30-second lockout timer after 5 consecutive failed passcode attempts.
  - **Dev Terminal CLI Command Expansion (`terminal.js`)**: Added `goto <page>`, `cv`, `email`, and `filter <cat>` interactive commands with updated terminal help documentation.
  - **Verification Suite**: Passed `python scripts/verify.py` across all 17 categories with 0 errors and 0 warnings.

- **v47 (Update) — Security & Vulnerability Remediation Suite.** Shipped repository-wide security hardening and vulnerability mitigations:
  - **CI/CD Workflow Injection Fix (`stamp-last-commit.yml`)**: Eliminated shell expression injection risk by binding GitHub commit metadata (`github.sha`, `timestamp`, `message`) to step environment variables and serializing `last-commit.json` securely via `jq -n --arg`.
  - **DOM XSS & Attribute Sanitization (`access.js`)**: Sanitized dynamic VIP email list rendering with single-quote escaping (`&#39;`) and replaced inline `onclick` string interpolation with standard event listeners; hardened user avatar rendering against attribute injection.
  - **Tabnabbing Protection**: Enforced `rel="noopener noreferrer"` across dynamic external links in `terminal.js` and unlocked repository links in `access.js`.
  - **Subresource Integrity (SRI) Pinning (`contact.html`)**: Added `integrity="sha384-..."` and `crossOrigin="anonymous"` attributes to dynamically loaded `@emailjs/browser` CDN library.
  - **Verification Suite**: Passed `python scripts/verify.py` across all 17 categories with 0 errors and 0 warnings.

- **v47 (Update) — Git LFS Removal & Native Binary Asset Restoration for GitHub Pages.** De-LFS'd repository assets and restored standard Git binary tracking to resolve broken image, certificate, and media rendering on GitHub Pages:
  - **De-LFS & Native Git Tracking Restoration**: Removed Git LFS filter patterns from `.gitattributes` and re-indexed all 106 media, document, image, and video assets (`.webp`, `.png`, `.jpg`, `.pdf`, `.mp4`, `.svg`) as native binary objects in Git.
  - **GitHub Pages Direct Serving Fix**: Fixed root issue where GitHub Pages branch deployments served ~130-byte raw ASCII LFS pointer files with image MIME types instead of actual image binaries.
  - **CI & Deployment Workflow Cleanup**: Removed `lfs: true` checkouts from `.github/workflows/verify.yml` and `.github/workflows/deploy-pages.yml`.
  - **Verification Suite**: Passed `python scripts/verify.py` across all 17 categories with 0 errors and 0 warnings.

- **v47 (Update) — Performance Architecture, Render-Blocking Elimination & Asset Optimization.** Shipped major site-wide performance upgrade eliminating the 9-module CSS @import waterfall, optimizing client-side resource scheduling, and boosting rendering speed:
  - **ATS Resume Print Typography & Multi-Page Pagination Fix**: Completely revised resume print stylesheet (`print.css`) and modal preview (`components.css`, `ui.js`) to eliminate artificial single-page compression. Scaled base typography from cramped ~7.4pt–8.5pt up to standard readable 10pt (name 20pt, section titles 10.5pt, subheadings 10pt, bullets 9.2pt/1.4 line-height, contact 9pt) with 14mm/16mm standard page margins and robust page-break rules (`break-inside: avoid;` on items and `break-after: avoid;` on section headings), ensuring crisp, professional, human-readable multi-page and single-page resume exports.
  - **ATS Resume Generator Screen Styles & Trigger Button Fix**: Resolved unstyled ATS Resume / Export PDF button across all occurrences (`experience.html`, `about.html`, and `#resumePrintBtn`). Migrated screen modal and trigger button CSS (`.resume-modal-*`, `.resume-role-selector`, `.resume-role-btn`, `.resume-preview-*`, `.resume-print-btn`) from `print.css` to `components.css` to ensure zero FOUC and full theme synchronization on screen media while preserving pure `@page` and `@media print` rules in `print.css`. Standardized button labels, accessibility attributes (`aria-label`, `aria-hidden`), and shimmer hover states.
  - **CSS @import Waterfall Elimination**: Replaced the sequential 9-step @import cascade across all 10 site pages with parallel `<link>` loading for critical CSS modules (`tokens.css`, `base.css`, `layout.css`, `components.css`) and deferred non-blocking loading for non-critical modules (`cmdk.css`, `access.css`, `terminal.css`, `tour.css`, `print.css`) via standard `media="print" onload="this.media='all'"` swapping.
  - **Resource Preloads & Hint Scheduling**: Added high-priority `<link rel="preload">` hints for critical tokens and core runtime scripts (`tokens.css`, `base.css`, `core.js`, `ui.js`, `script.js`) across all HTML heads to trigger early network discovery. Removed redundant `dns-prefetch` where `preconnect` was already established.
  - **Canvas Animation Externalization & Caching**: Extracted 250+ lines of inline canvas animations (`SignalWaveBackground` and `PCBTraces`) from `index.html` into a standalone, cacheable `assets/js/bg-animations.js` module loaded with `defer`, reducing `index.html` payload by 8.7KB.
  - **Next-Gen WebP Asset Optimization**: Converted remaining raw PNG logos (`ieee-kec.png` and `nssr.png`) to WebP format (`ieee-kec.webp` 13.5KB, `nssr.webp` 7.5KB — ~63% file size reduction) and upgraded `experience.html` to responsive `<picture>` elements with WebP sources and fallback images.
  - **Content-Visibility & Below-the-Fold Rendering Optimization**: Added `.content-visibility-auto` and `.cv-auto` / `.cv-card` CSS utility classes with `contain-intrinsic-size` to skip rendering calculations for off-screen sections until scrolled into view.
  - **PWA Service Worker Cache Sync**: Updated `sw.js` `STATIC_ASSETS` to include `assets/js/bg-animations.js` and all WebP logo variants for offline and instant return navigation.
  - **Documentation & Site Metadata Synchronization**: Updated `sitemap.xml` timestamps to `2026-08-15`, refreshed `README.md` directory trees to include `assets/js/bg-animations.js` and `.github/workflows/deploy-pages.yml`, synchronized MCP server (`mcp-server/site_mcp.py`) and automation engine (`scripts/site_automation.py`) tool descriptions/defaults to `v47`.
  - **Automated Sync Engine Upgrade (`sync.ps1`)**: Completely overhauled `sync.ps1` with Git LFS pointer synchronization, multi-scope conventional commit categorization (`feat`, `refactor`, `style`, `perf`, `docs`, `ci`, `tools`, `seo`), diagnostic verification gate, version bump integration (`-v`), dry-run preview mode (`-WhatIf`), repository health inspect (`-Status`), safe pull (`-PullOnly`), push-only (`-PushOnly`), and adaptive bot stamp commit synchronization.
  - **Verification Suite**: Passed `python scripts/verify.py` across all 17 categories with 0 errors and 0 warnings.

- **v47 — Comprehensive Upgrade Suite: Diagnostics, 8-Track Remediation, Modular CSS, Stability Hardening & Git LFS Media Architecture.** Fixed verify.py diagnostic false warnings, remediated all 8-track audit findings (blockers B1/B2, security hardening, MCP server fixes, tour lifecycle & contrast compliance), modularized monolithic CSS into 9 decoupled modules in `assets/css/modules/` orchestrated by `style.css`, implemented Git LFS for multimedia and document assets (`.mp4`, `.pdf`, `.webp`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.ico`, `.mp3`, `.wav`), configured automated GitHub Actions Pages deployment (`.github/workflows/deploy-pages.yml`) with LFS checkout support, expanded Dev Terminal with 4 new interactive commands and history navigation, enhanced glassmorphic card aesthetics, and bumped PWA cache to v47.
  - **Git LFS Media Architecture**: Initialized Git LFS and configured `.gitattributes` filter patterns for all multimedia and document formats (`*.mp4`, `*.webm`, `*.mov`, `*.pdf`, `*.webp`, `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.ico`, `*.mp3`, `*.wav`). Renormalized all 90+ tracked assets into Git LFS pointers to optimize repo cloning speed and storage.
  - **GitHub Pages & CI LFS Deployment**: Added `.github/workflows/deploy-pages.yml` with `actions/checkout@v4` (`lfs: true`) and `actions/deploy-pages@v4` to resolve and serve Git LFS media files directly on GitHub Pages. Added `lfs: true` to `.github/workflows/verify.yml` to preserve CI check accuracy.
  - **Modular CSS Architecture (`assets/css/modules/`)**: Refactored monolithic `style.css` (4,849 lines, ~103KB) into 9 focused, maintainable CSS modules (`tokens.css`, `base.css`, `layout.css`, `components.css`, `cmdk.css`, `access.css`, `terminal.css`, `tour.css`, `print.css`), mirroring the JS module architecture. `style.css` serves as the primary orchestrator importing all modules via standard `@import` rules, preserving 100% zero-regression compatibility across all 10 HTML pages.
  - **ATS Resume Print Engine & A4 Optimization**: Remediated multi-page blank page printing and A4 overflow in the Tailored ATS Resume Generator modal. Replaced non-flow-clearing `visibility: hidden` rule with layout isolation (`body:has(.resume-modal-overlay.open) > *:not(.resume-modal-overlay) { display: none !important; }` and `printing-resume` lifecycle hook), unified duplicate `@media print` blocks into a single A4-optimized print engine with `@page { size: A4 portrait; margin: 10mm 12mm; }`, compact ATS font/margin scaling, and zero trailing blank pages.
  - **ATS Modal Role Buttons Polish**: Aligned filter button text and borders with flex centering (`inline-flex`, `align-items: center`, `justify-content: center`), standardized typography to `var(--sans)` with `line-height: 1.2`, modern capsule pills (`border-radius: 9999px`), and smooth active/hover glow states.
  - **8-Track Deep Remediation**: Corrected ATS resume generator contact email (`aaradhyadevtmr@gmail.com`), added 5-attempt retry-with-rebase loop to `stamp-last-commit.yml`, sanitized terminal command dispatch with XSS escaping & execution error boundaries, memoized PBKDF2 Web Crypto keys, added module loader 5s fallback timeout, updated light mode `--accent` to `#b45309` for WCAG AA 4.7:1 contrast, added cert lightbox focus trap, fixed SPARK tour step target (`#p-015`) & cross-page resume lifecycle, corrected JSON-LD project anchors, removed duplicate project card (`#p-018-fuse`), added `import re` and JSON-RPC error codes to MCP server (`mcp-server/site_mcp.py`), and fixed site automation telemetry selectors.
  - **Diagnostics Fix**: Fixed `check_jsonld_schemas()` in `scripts/verify.py` to handle JSON-LD blocks with array root (`[{...}, {...}]`) — previously flagged valid `BreadcrumbList` + `ProfilePage`/`FAQPage` blocks on `about.html`, `contact.html`, and `projects.html` as missing `@context`/`@type`. Also excluded `404.html` from `check_sitemap_sync()` missing-page warnings since error pages should not appear in sitemaps. Upgraded `check_module_files()` and `check_file_sizes()` in `scripts/verify.py` to validate CSS modules in addition to JS modules. Suite now passes **0 errors, 0 warnings** across all 17 categories.
  - **Dev Terminal v47**: Added `stats` (site telemetry summary), `benchmark` (client DOM/memory/hardware metrics), `run prakopnet` (PrakopNet disaster telemetry simulator), and `run pulselive` (PulseLive acoustic diagnostics simulator) commands. Implemented ArrowUp/ArrowDown command history traversal. Updated help text, simulator version tags from v43→v47, and healthcheck header to v47.
  - **Visual Polish**: Enhanced `.glass-card` with inset top-edge highlight (`inset 0 1px 0 0 rgba(255,255,255,0.06)`), spring-curve hover lift transition, and accent glow border on hover.
  - **PWA Service Worker & Cache**: Bumped cache version to `aaradhya-portfolio-v47` in `sw.js` and added all 9 CSS modules to `STATIC_ASSETS`.
  - **Verification & CI Compliance**: `python scripts/verify.py` passed with 0 errors 0 warnings (`achievements=37, projects=29, journey=35`); `node --check` validated clean syntax across all JS files.

- **v46 — Site-Wide Hyper-Automation Suite & Custom Site MCP Server Integration.** Shipped site-wide hyper-automation suite & custom site mcp server integration.
  - Shipped unified hyper-automation CLI engine (scripts/site_automation.py) supporting site telemetry, automated audits, version syncing, and search index extraction.
  - Built custom Site Model Context Protocol (MCP) server (mcp-server/site_mcp.py) exposing site:// projects, experience, achievements, tracker, graph, and health resources over stdio.
  - Added mcp_config.json configuration for instant registration in Antigravity IDE, Claude Desktop, and Cursor.
  - Added .github/workflows/lighthouse-audit.yml for automated Lighthouse CI accessibility and performance testing.

- **v45 — Site-Wide Upgrade Suite: Robust Troubleshooting Infrastructure, Pre-Commit Gate & Client Diagnostics.** Shipped major architectural upgrade to diagnostic suite and DevEx pipeline. Expanded `verify.py` from 5 to 17 check categories, added automated pre-commit verification gate to `sync.ps1`, fixed `dev-serve.py` ROOT path bug with CORS & MIME support, added interactive `healthcheck` command to Dev Terminal, updated GitHub Actions CI workflow with Node.js syntax checks, and bumped PWA Service Worker cache to `aaradhya-portfolio-v45`.
  - **17-Category Diagnostic Suite**: Rewrote `scripts/verify.py` into a modular verification engine checking cross-page links, asset references, JS syntax, version consistency, module paths, sitemap sync, web manifest JSON, JSON-LD schemas, file size budgets, SW cache completeness, robots.txt, and global ID uniqueness with color-coded categorized reporting.
  - **Pre-Commit Verification Gate**: Integrated `verify.py` into `sync.ps1` before committing — blocks pushes on errors (exit code 1) with `-SkipVerify` escape hatch.
  - **Dev Server & CORS Fix**: Fixed `scripts/dev-serve.py` ROOT path to resolve to project root instead of `scripts/`; added CORS `Access-Control-Allow-Origin: *` headers, `no-cache` headers, and `.webmanifest`/`.webp` MIME types.
  - **Dev Terminal Healthcheck**: Added `healthcheck` client-side diagnostic command to `#adtTerminal` reporting module status, Service Worker controller state, version alignment, theme/accent tokens, local storage health, DOMReady/Load performance timing, nav link counts, and search index metrics.
  - **CI & SW Refresh**: Upgraded `.github/workflows/verify.yml` with Node.js syntax check step; bumped PWA Service Worker cache to `aaradhya-portfolio-v45`.
  - **Verification & Compliance**: `python scripts/verify.py` passed with 0 errors (`achievements=37, projects=30, journey=35`); `node --check` validated clean syntax across all 9 JS files.

- **v44 — Site-Wide Upgrade Suite: Performance Hardening, Accessibility/SEO & Visual Polish.** Shipped comprehensive site upgrade covering dark-mode scoped grain overlay, double-ring `:focus-visible` contrast, refined light mode elevation shadows, animated section title underlines, circuit node pulse animations, button active scale micro-interactions, LCP image preloads, updated sitemap dates, web manifest enhancement, and PWA v44 cache release.
  - **Performance Hardening**: Scoped high-overhead `body::before` fractal noise grain overlay to dark mode only (`html:not([data-theme="light"])`), removed static `will-change` declarations from cursor ring, reveal cards, and magnetic wraps to eliminate unnecessary compositing layer allocations. Added LCP `fetchpriority="high"` preload hint for hero photo in `index.html`.
  - **Accessibility & SEO**: Replaced blanket `box-shadow: none !important` light mode rule with component-targeted elevation overrides to preserve focus indicators, cards elevation, and button states. Upgraded `:focus-visible` with high-contrast double-ring styling, added reduced-motion cursor reset, updated `sitemap.xml` timestamps to `2026-08-13`, and enriched `site.webmanifest` with `id` and `categories`.
  - **Visual Aesthetics & Polish**: Added dynamic viewport-triggered animated underlines to `.section-title` headers, pulsing glow keyframes to circuit `.divider-node` elements, scale active states (`scale(0.97)`) on primary & ghost buttons, and glassmorphic top-edge highlight on scrolled navigation bar.
  - **Service Worker & Cache Refresh**: Upgraded Service Worker cache version to `aaradhya-portfolio-v44` in `sw.js`.
  - **Verification & CI Compliance**: Executed `python scripts/verify.py`, `python scripts/extract_index.py`, and verified clean syntax across JS modules and HTML documents.

- **v43 — Interactive Skill Radar, ATS Resume Builder & Interactive Code Sandbox Suite.** Shipped interactive canvas competency radar visualizer, role-tailored ATS resume generator with one-click PDF print export, multi-tab project code inspector, dev terminal interactive sandbox, and PWA v43 cache release.
  - **Interactive Skill Radar Visualizer**: Canvas/SVG 5-axis competency chart on `about.html` featuring interactive score nodes, gradient fill, and live toolstack detail filters.
  - **Tailored ATS Resume Generator**: Recruiter-focused interactive resume builder modal on `experience.html` (and accessible via CMDK / Dev Terminal) with role-based filtering (Master CV, AI/ML, Embedded, Full-Stack) and ATS-optimized `@media print` PDF export styling.
  - **Dev Terminal Interactive Sandbox**: Expanded `#adtTerminal` with `radar`, `resume`, `run spark`, `run gcsbr`, and `glossary [term]` interactive simulation and acronym lookup commands.
  - **PWA Service Worker & Cache Refresh**: Upgraded PWA Service Worker cache version to `aaradhya-portfolio-v43`.
  - **Verification & CI Compliance**: `python scripts/verify.py` passed with 0 errors and 0 warnings (`achievements=37, projects=22, journey=35`); `python scripts/extract_index.py` regenerated static search index; `graphify update .` executed cleanly.

- **v42 — Site-Wide Performance & Modular Architecture Upgrade Suite.** Refactored monolithic `script.js` (4,080+ lines) into 8 decoupled modular components while hardening site bug items and static search index synchronization.
  - **Modular Architecture Refactoring**: Split monolithic `script.js` into 8 clean, isolated JS modules in `assets/js/modules/` (`core.js`, `ui.js`, `cmdk.js`, `access.js`, `tour.js`, `audio.js`, `terminal.js`, `haptics.js`).
  - **Dynamic Module Loader & Fallbacks**: Created dynamic module orchestrator in `script.js` ensuring backward compatibility across static server deployments and offline local files.
  - **PWA Service Worker & Cache Refresh**: Upgraded PWA Service Worker cache to `aaradhya-portfolio-v42` and cached all 8 modular JS files in `sw.js`.
  - **Verification & CI Compliance**: `python scripts/verify.py` passed with 0 errors and 0 warnings (`achievements=37, projects=22, journey=34`); `python scripts/extract_index.py` regenerated static search index; `node -c` validated clean syntax across all JS files.

- **v41 — Color Upgrades & Developer Easter Egg Accent Customization Suite.** Upgraded site visual depth, dynamic radial color glows, glassmorphic card borders, while maintaining clean signature Amber Gold brand identity in header navigation.
  - **Signature Brand Identity Preserved**: Kept header navbar & mobile drawer clean, unified, and strictly focused on signature Amber Gold (`#d4a85a`) & Cyber Teal (`#6dbfaa`).
  - **Developer Easter Egg Customization**: Relocated the 6-theme accent color palette switcher (Gold 👑, Emerald ⚡, Violet 🔮, Cyan 🌊, Ruby 🔴, Prism 🌌) to the Interactive Dev Terminal (`accent [theme]`) and CMDK Command Palette (`Ctrl+K`).
  - **Dynamic Theme Token System**: Created CSS data-attribute overrides (`html[data-accent="..."]`) supporting both Dark & Light modes with dynamic variable inheritance across scrollbars, buttons, hero ambient glows, and terminal highlights.
  - **Persistence & PWA**: Saved choice to `localStorage['adt-accent']`, updated Service Worker cache to `aaradhya-portfolio-v41`, and appended release v41 history in `script.js`.
  - **Verification**: `python scripts/verify.py` passed with 0 errors (37 achievements, 22 projects, 34 journey nodes); `node -c assets/js/script.js` verified clean syntax.

- **v40 — Inter Typography Modernization & Performance Core Suite.** Upgraded site typography system and overall rendering performance while preserving gold/teal identity.
  - **Typography Modernization**: Replaced Cormorant Garamond & Instrument Sans with Inter variable font (`Inter:wght@300;400;500;600;700`) for body/UI text across all 10 HTML pages; kept Playfair Display for signature headings and DM Mono for terminal/code.
  - **Canvas Animation Lifecycle Optimization**: Added `VisibilityAPI` (`document.hidden`) and `IntersectionObserver` pause hooks to `SignalWaveBackground` and `PCBTraces` in `index.html` — eliminates background rAF CPU/GPU overhead when offscreen or tab hidden.
  - **CSS Cleanup & Optimization**: Consolidated duplicate `.skip-link` declarations, removed unused `#readProgressBar` CSS rule, scoped `will-change: transform` to `:hover` active states across cards.
  - **Visual & Interaction Polish**: Upgraded scrolled navbar backdrop filter (`saturate(180%) blur(20px)`), added tactile spring curve overshoot easing to stat counters count-up, updated `.btn-primary` spring transition on hover.
  - **Service Worker & Metadata**: Updated SW cache to `aaradhya-portfolio-v40`, terminal welcome header to v40, and appended v40 release history item in `assets/js/script.js`.
  - **Verification**: `python scripts/verify.py` passed with 0 errors (37 achievements, 22 projects, 34 journey nodes); `node -c assets/js/script.js` verified clean syntax.

- **v39 — SEO, AEO & ADT Brand Identity Upgrade across all site pages.** Established "ADT" (Aaradhya Dev Tamrakar) as a clear personal brand identity across search engines, LLM answer engines (ChatGPT, Gemini, Perplexity, Copilot), and social previews.
  - **ADT Branding in Titles & Descriptions**: Added `ADT |` prefix to `<title>` and `og:title`/`twitter:title` tags across all 10 HTML pages. Updated meta descriptions to naturally incorporate "ADT (Aaradhya Dev Tamrakar)".
  - **Structured Data Enhancements (JSON-LD)**:
    - Updated `Person` schema on `index.html`: added comprehensive `alternateName` array (`["Aaradhya", "ADT", "Aaradhya Dev", "Aaradhya Tamrakar", "Aaradhya Dev Tamrakar", "Aaradhya D. Tamrakar", "A. D. Tamrakar", "A. Dev Tamrakar", "AaradhyaDT", "aaradhyadevtamrakar", "Aaradhya Nepal", "Aaradhya Engineer"]`), `nationality`, `knowsLanguage`, `speakable` selector (`.hero-desc`, `.hero-name`), and updated `jobTitle`.
    - Added new `WebSite` schema block on `index.html` with `alternateName` array (`["Aaradhya", "ADT", "Aaradhya Portfolio", "Aaradhya Dev Tamrakar Portfolio", "Aaradhya Dev Tamrakar Website", "Aaradhya Website", "ADT Portfolio", "ADT Website", "ADT Games"]`).
    - Expanded meta keywords across all 10 site pages to include every combination and permutation of Aaradhya / ADT / Aaradhya Dev Tamrakar.
    - Added `ProfilePage` schema and `FAQPage` schema (with 6 Q&As) to `about.html`.
    - Added `ItemList` schema for featured projects to `projects.html`.
  - **AEO & LLM Crawler Allowlist**: Updated `robots.txt` to explicitly allow AI bots (`GPTBot`, `Google-Extended`, `anthropic-ai`, `ClaudeBot`, `PerplexityBot`, `Applebot-Extended`).
  - **Visible FAQ Section**: Added a responsive, accessible FAQ section to `about.html` covering core background, SPARK project, specialization, and contact options.
  - **Metadata Sync**: Added `keywords`, `twitter:site`, and `twitter:creator` (`@AaradhyaDT`) tags across subpages. Updated `site.webmanifest` name and description to incorporate ADT branding. Updated `sitemap.xml` dates to `2026-08-09`.
  - **Verification**: Python script validated 100% tag balance (`<div>` open/close equality) and JSON-LD syntax across all 10 HTML pages with 0 errors.

- **v27 — ambient particle-burst profile-photo effect (`about.html`), original design, not a Discord-asset port.** User referenced Discord Nitro profile-effect store items (Encom Grid/Tron, Ki Detonate, Vengeance frame, Entering Hyperspace) as visual inspiration; these are paid proprietary cosmetics and were **not** pulled/traced — flagged directly, then rebuilt as an original equivalent using the site's own design tokens. Implementation, scoped to `about.html` + `assets/js/script.js` only:
  - `<canvas id="about-photo-fx" class="about-photo-fx" aria-hidden="true">` inserted as first child of `#about-photo-wrap`, before the existing `<picture>` — verified single insertion, not duplicated.
  - CSS: `.about-photo-fx { position:absolute; inset:-24px; pointer-events:none; z-index:0; }` — sits behind `.about-photo` (`z-index:1`) and `.about-photo-ring` (`z-index:2`), confirmed the pre-existing ring block was read and left untouched (its own `inset`/`z-index`/`opacity` rules unchanged).
  - JS: new self-contained IIFE appended to end of `script.js` (after the global keymap handler) — guards on `document.getElementById('about-photo-fx')` existing, so it's inert on every other page without a separate page-check. Spawns particles at the wrap's edges that drift inward toward center, fade in/out over their lifetime, capped at 34 concurrent, respawn-throttled via a frame counter.
  - **Color**: reads `--accent` live via `getComputedStyle` on every animation frame (not cached at init) — so it tracks the light/dark theme toggle automatically, no separate light-mode branch needed.
  - **Perf/battery guards**: `prefers-reduced-motion: reduce` check at IIFE start — returns immediately, no canvas/rAF loop ever starts (this is the first JS-side reduced-motion check in the codebase; prior motion — the ring's CSS `animation` — was already covered by the existing global `*` reduced-motion rule in `style.css`, which doesn't reach canvas/rAF work, so this was a genuine gap being closed, not a duplicate check). Also gated on the Page Visibility API (`visibilitychange`) — `cancelAnimationFrame` fires when the tab isn't visible, resumes on return.
  - **Verification run**: `node -c script.js` — pass; `about.html` div-tag balance — 110 open / 110 close; `about-photo-fx` string count in `about.html` — exactly 2 (one CSS class rule, one element `id`+`class` — confirmed via `grep -n`, not just count, to rule out an accidental duplicate element); trailing-newline check on `script.js` post-append — present (file previously ended without one); CRLF check on both touched files — 0 in either, matching pre-edit LF-only state.
  - **Trigger/behavior chosen this version**: always-on ambient loop (not hover-only, not click-toggle) — user selected this explicitly over the hover-only pattern the pre-existing `.about-photo-ring` uses.
  - **Not committed/pushed from this side** — code delivered inline in-conversation (small/targeted edit, per output-delivery convention), `sync.ps1` is a local/user-side step and wasn't run this session.

- **v1–v18**: see prior tracker versions. Two-repo architecture, nav/WebP/CSS-JS consolidation, domain-identity fix, GCSBR expansion — all confirmed delivered and live as of v18. 14-file orphaned-cert-PNG deletion landed in v18.
- **v19**: 11 more orphaned raw PNGs (flagged in v18, out of scope there) deleted — 21 MB freed, verified zero broken references. Two open items resolved: `.achievement-title` h3 count (21, identified as a new DataCamp "Introduction to Git" entry, Jul 6 2026) and a re-attempted GitHub API query (still blocked, shared-IP rate limit, confirmed genuinely unresolved rather than newly broken). New low-priority finding: `graphify-out/` carries stale pre-WebP-conversion filenames, not actioned.
- **v20 (this version) — certificate download now serves the original PDF; viewer stays WebP.**
  - **The blocker, surfaced before any code was touched**: the live repo (as of v19) held zero certificate PDFs — only `AARADHYA_DEV_TAMRAKAR_CV.pdf` was a PDF anywhere in the tree. Confirmed via full repo-wide `find -iname "*.pdf"` before writing anything. The PDF→PNG→WebP conversion chain (documented across v9–v18) hadn't preserved originals at any step. Flagged to the user directly rather than building download machinery pointing at files that don't exist; user chose to upload the originals.
  - **User uploaded `certificates.zip`, 24 PDFs.** Cross-referenced by exact basename against all 23 live `.webp` files before touching any code: **23 exact matches**, zero missing. **2 uploaded PDFs unmatched** by any current cert-btn: `Introduction_to_Git.pdf` and `Introduction_to_Python_certificate.pdf`. Investigated rather than discarded — `Introduction_to_Git.pdf` plausibly corresponds to the KEC IT Club "Introduction to Git" (2024) achievement entry, which was directly confirmed (read in full, lines 592–602) to have **no cert-btn at all** — title/description/date only, no button, no webp. `Introduction_to_Python_certificate.pdf` was checked against the single live "Introduction to Python" entry (line 914) and found to already be wired to a different PDF (`Introduction_to_Python_ITP0014139470763`) — no plausible match found for it at all. **Neither of the 2 unmatched PDFs was actioned this version** — adding a cert-btn (and generating a webp) to a currently-buttonless achievement is new scope, not a wiring fix, and wasn't part of what was asked. Flagged as a distinct, optional follow-up.
  - **Implementation, scoped to the 23 confirmed matches only**:
    - Added a `data-download="assets/certificates/{basename}.pdf"` attribute to each of the 23 matched `.cert-btn` elements — 22 in `achievements.html`, 1 in `experience.html` — placed immediately after the existing `data-cert="...webp"` attribute, verified by basename-equality script (zero mismatches, zero missing).
    - `initLightbox()` in `assets/js/script.js`: `openLightbox()` gained a 4th parameter, `downloadSrc`; `lbDownload.href` now reads `downloadSrc || src` (falls back to the original `src`/webp when no `data-download` is present). `lbOpen.href` (the "open in new tab" button) was deliberately left unchanged — it still opens the webp, matching the user's stated scope ("when I view... webp") rather than silently also redirecting the new-tab action.
    - The `.cert-btn` click handler now passes `btn.dataset.download` as the 4th argument.
    - **Zero-regression check on the one pre-existing PDF cert-btn** (the CV, in `index.html`, `data-type="pdf"`): it has no `data-download` attribute and wasn't touched by the injection script (scoped to `assets/certificates/` webp basenames only, the CV lives at `assets/docs/`) — confirmed its behavior is unchanged: `downloadSrc` is `undefined` for it, so `lbDownload.href` falls back to `src`, identical to pre-edit behavior.
    - 23 PDFs copied into `assets/certificates/`, named to exactly match their `.webp` counterpart's basename.
  - **`download` attribute mechanics, verified**: `<a id="lb-download" ... download>` uses the bare (valueless) `download` attribute — this makes the browser save using the target URL's own filename, not the webp's. Since `lbDownload.href` now points at the `.pdf` URL for the 23 matched certs, the saved file is correctly named e.g. `Introduction_to_Git_CPE0469867571113.pdf`, not the webp's name.
  - **Full verification suite run post-edit**: (1) script cross-checked every `data-cert`/`data-download` pair in both touched HTML files for exact basename equality — 0 fails; (2) every `data-download` path resolved against the actual filesystem — 23/23 resolve, 0 broken; (3) `node -c` on `script.js` — valid syntax; (4) div open/close tag balance on both touched files — `achievements.html` 115/115, `experience.html` 58/58, both unchanged from v19; (5) line-ending regression check — all three touched files remained LF-only (0 CRLF), matching their pre-edit state.

---

## State of Play

**Current System Status:**

| Item                                      | Status                                                                                                                                           |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Site Verification Suite (`verify.py`)** | **100% PASS (24/24 Categories)** — Zero errors, zero warnings. Content: 39 achievements, 30 projects, 36 journey nodes.                          |
| **PWA Service Worker & Offline Caching**  | **Active (`aaradhya-portfolio-v54.5`)** — Cache-first static assets, network-first HTML navigation, offline contact form queue.                  |
| **Mobile Responsiveness & CSS Cascade**   | **Optimized down to 280px viewports** — Responsive navigation drawer, fluid Explore grid, de-squished modals, auto-scaling Skill Radar canvas.   |
| **Security & Access Control**             | **Hardened (3 Tiers)** — Web Crypto AES-256-GCM zero-leak gated payloads, GSI Google Sign-In, client-side passcode rate limiting (30s cooldown). |
| **Live Commit Status & CI/CD**            | **Synchronized** — GitHub Actions `stamp-last-commit.yml` with rebase-retry loop stamping `assets/js/last-commit.json`.                          |

**Resolved in Recent Releases (v45 — v49.45):**

- **v49.45**: Cross-repo multi-remote mirroring synchronization (dual push to `AaradhyaDT.github.io` and `Aaradhya-Dev-Tamrakar.github.io`), synchronized xTool credential telemetry, 22-category verification suite parity across MCP server & CLI diagnostics, and aligned documentation/fallback versioning.
- **v49.27**: Synchronized xTool credential telemetry, 22-category verification suite parity across MCP server & CLI diagnostics, and resolved all documentation/fallback version discrepancies.
- **v49.25**: Global search expansion for page locations and landmark sections (`cmdk.js`), multi-token query matching, and in-page hash scroll animation.
- **v49.20**: Added xTool Laser Safety Awareness Training (`achv-37`) & Printer Maintenance Certification (`achv-38`) with WebP previews & PDF downloads.
- **v49.18**: Build hygiene & Graphify snapshot cleanup (`.gitignore` patterns and Git index cache reduction).
- **v49.17**: Verification suite expansion & hyper-tightened diagnostic checks across 22 categories (`js-safety`, `css-integrity`, `html-a11y-seo`, `data-consistency`, `tracker-hygiene`).
- **v49.6 / v49**: Comprehensive mobile responsiveness overhaul across ultra-small viewports (280px–360px), CSS cascade precedence fixes for navigation drawer, clean URL path resolver (`getCurrentPageFile`), load-time Skill Radar canvas auto-boot & responsive scaling, modal de-squishing, and keymap text wrapping.
- **v48**: Dynamic multi-category project filters (`All`, `AI/ML`, `Robotics/Embedded`, `Hardware`, `Web/Apps`) with live counts, ATS Resume multi-format exporter (`.md`, plain text, A4 PDF print engine), offline contact message queue with automatic reconnect sync, client-side passcode rate limiting, and Dev Terminal CLI navigation commands (`goto`, `cv`, `email`, `filter`).
- **v47**: Full 8-track audit remediation, modular CSS architecture (9 modules in `assets/css/modules/` coordinated by `style.css`), CI shell injection defense, subresource integrity pinning, and render-blocking CSS waterfall elimination.
- **v46**: Site-wide hyper-automation engine (`scripts/site_automation.py`) and custom Model Context Protocol (MCP) server (`mcp-server/site_mcp.py`).
- **v45**: 17-category diagnostic verification engine (`scripts/verify.py`), pre-commit automated gate in `sync.ps1`, and client-side terminal `healthcheck` command.

---

## Evidence & Verification Log — v20 additions

- **Pre-work blocker check**: `find . -iname "*.pdf"` across the full v19 repo, before any edit — returned exactly one file (`assets/docs/AARADHYA_DEV_TAMRAKAR_CV.pdf`). This is what triggered surfacing the blocker to the user instead of proceeding.
- **Upload cross-reference**: `comm -23`/`comm -13`/`comm -12` between sorted basename lists (23 live `.webp`, 24 uploaded `.pdf`) — 23 exact matches, 0 webp-side misses, 2 pdf-side extras (both individually investigated by reading their corresponding HTML region in full, not assumed).
- **Injection method**: Python string-replace keyed on the exact `data-cert="assets/certificates/{base}.webp"` substring per matched basename, with a pre-check guarding against double-injection (none occurred, single pass). Applied to `achievements.html` (22 replacements) and `experience.html` (1 replacement) — count matches the known 23-webp total exactly.
- **JS edit**: `str_replace` on `assets/js/script.js`, two edits — the function signature/body (`downloadSrc` parameter, `lbDownload.href` fallback logic) and the event-listener call site (passing `btn.dataset.download` through). Both edits verified present via direct `sed`/`view` read of the final file, not assumed from the edit call's success alone.
- **Post-edit verification script**: a dedicated Python regex pass over both touched HTML files, checking every `data-cert`/`data-download` pair for basename equality — this is a stronger check than "the file exists," since it also catches a cert-btn that has a `data-download` pointing at the _wrong_ cert's PDF (a copy-paste-style error), not just a missing one. Zero fails.
- **CV button regression check**: read directly (`grep`), confirmed the CV's `cert-btn` in `index.html` has no `data-download` attribute post-edit, and its scope (`assets/docs/`) falls outside the injection script's target directory (`assets/certificates/`) — the CV's un-changed status is structural, not incidental.

---

## v21 addition — both v20-flagged unmatched PDFs closed out

Neither of the two unmatched uploaded PDFs (`Introduction_to_Git.pdf`, `Introduction_to_Python_certificate.pdf`) corresponded to a missing achievement. Both are DataCamp's plain "Statement of Accomplishment" document for a course completion that's already represented on the site by its more-complete CPE-credential counterpart (same course, same completion date, same person — confirmed by rendering both PDFs to images and comparing directly, not by filename or metadata alone). The original hypothesis that `Introduction_to_Git.pdf` belonged to the buttonless KEC IT Club "Introduction to Git" (2024) entry was checked against the PDF's actual content and disproven — it's dated Jul 6, 2026 and issued by DataCamp, not a 2024 KEC IT Club document.

Since each live achievement card's own description text already names the CPE credential ID that's currently wired, adding a second card for the plain-variant document would duplicate content already on the page rather than fill a gap. No new cards added, no files copied into the repo. Both items closed with a determination, not left open.

---

## v22 addition — KEC IT Club "Introduction to Git" (2024) card: closed, no source file available

User asked to add a card for this entry (v21's own flagged gap). Checked comprehensively — all files uploaded across this conversation, the live repo, `dev-logs/` — for a source certificate matching this specific entry: none exists. `Introduction_to_Git.pdf` (uploaded earlier, investigated in v21) was already confirmed via rendered-image comparison to be the DataCamp Jul 2026 document, not this one. User confirmed directly they don't have the original file.

**Resolution: left as a text-only achievement entry** (org/title/description/date, no cert-btn) — unchanged from its current live state. This is treated as a legitimate end state, not a gap: not every achievement needs a linked certificate image, and fabricating a placeholder or synthetic certificate graphic would misrepresent a real credential — not done. No code changes made this version. Closed.

---

## v23 addition — latest site refinements (2026-07-18)

Recent updates from the latest repository changes are now captured here:

- Added a date toggle in the hero status card so the timeline can switch between B.S. and A.D. views.
- Updated navigation arrow symbols across pages from « to << for more consistent rendering.
- Added card-arrow styling and hover effects to improve the visual treatment of navigation and card actions.
- Changed the keyboard shortcut for scrolling back to the top from + to =.
- Refined the wording in the keymap/help content around the recommended viewing brightness.

### Status

- No new blocker or content-gap issue was introduced by these changes.
- Existing tracker items remain unchanged unless a new certificate-source or content issue is surfaced.
- These updates are polish and interaction refinements rather than structural site rewrites.

---

## v24 addition — site-optimization pass + mobile legend line-break fix (2026-07-18)

Four commits landed this round. Verified against a **fresh clone of `origin/main`** (current HEAD `b8c8014`) rather than trusted from session memory — each commit's actual `git show --stat`/diff pulled and checked against what follows, not assumed from the prior session's running narration.

**`e7b6f8b`** — dead-weight untracking + OG image fix

- `.gitignore`: added `graphify-out/` and `dev-logs/*` (with `!dev-logs/og-image/**` carved out). Neither directory is referenced by any page or the README's documented structure, yet both were being served live by GitHub Pages — a bloat issue and a minor info-exposure issue (internal dev notes/tracker docs publicly crawlable). Confirmed on the live clone: `graphify-out/` — 0 tracked files (fully untracked); `dev-logs/` — only `og-image/README.md` and `og-image/template.html` remain tracked.
- `assets/images/og-image.jpg`: **40,361B → 56,595B** (confirmed exact, matches `git show --stat`). The old asset still showed the retired `aaradhyadtmr.github.io` domain from before the repo migration — surfaced by a WhatsApp share preview. No source template existed for the old flat JPG, so it was rebuilt as a reusable HTML/CSS template (`dev-logs/og-image/template.html`, tracked, pulls the site's actual `:root` design tokens) rendered via Playwright at 1200×630. `dev-logs/og-image/README.md` documents the regen steps plus each platform's cache-buster link (old shares need a manual re-scrape to pick up the new image).

**`034ae1e`** — logo WebP conversion + LCP hint + scroll throttle (one commit, not split across two as first assumed mid-session — confirmed via diff)

- `epc-club.png` 772K→105K (PNG) + **4,188B** (WebP); `fusemachines.png` 193K→19K (PNG) + **10,006B** (WebP); `makerspace.png` 118K→48K (PNG) + **14,488B** (WebP) — all confirmed present on disk at these exact sizes. All three were 10x+ oversized for their actual rendered footprint (`.exp-banner`, 120px/96px container, `object-fit: contain`). Wired via `<picture>` in `experience.html` (5 `<picture>` pairs, 8 logo `<img>` instances total, matching the pre-existing `photo.png`/`photo.webp` dual-source pattern). `ieee-kec.png`/`nssr.png` were already correctly sized (256×256) — no conversion needed, just `width`/`height`/`decoding="async"` added for CLS.
- `about.html`: `fetchpriority="high"` confirmed present on the hero photo (line 628, alongside existing `decoding="async"`/`width`/`height`) — the known-LCP image now correctly hinted to the browser's preload scanner.
- `assets/js/script.js`: `initScroll`'s scroll listener rAF-throttled — a `scrollTicking` flag gates a single `requestAnimationFrame` callback per scroll burst, replacing 4 unthrottled `classList.toggle` calls + a style write on every raw scroll event (which can fire dozens of times per frame). Confirmed present and correct on the live file; `passive: true` preserved.

**`42d30e0`** — follow-up fixes (made directly by Aaradhya, on top of the above, before the pull-and-verify pass)

- `.hintrc`: added an `ignore` rule for `img[fetchpriority]` under `compat-api/html` — suppresses a `webhint` false-positive (the attribute is newer than the linter's compat table). Correct call: kept the attribute, silenced the warning rather than removing the attribute.
- `dev-logs/og-image/template.html`: added a viewport meta tag and `alt="Aaradhya Dev Tamrakar portrait"` on the portrait `<img>` — confirmed present.

**`8683db4`** — mobile legend line-break fix

- `achievements.html`, inside the existing `@media (max-width: 900px)` block:

  ```css
  .achv-legends {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
  .achv-legend-sep {
    display: none;
  }
  ```

- The category-legend wrap (4 items — Workshop/Certification/Competition/Leadership — "Leadership" spilling to its own line under ~900px) was real but unstyled: it read as a designed second row sitting next to the Current-Year/Past-Years row below it, but wasn't one — the 1px `.achv-legend-sep` divider meant to separate the two legends was floating mid-flow with nothing anchoring it as a group boundary. Fix stacks both legend groups as distinct blocks with a real `0.6rem` gap instead of letting them contest space in one wrapped flex row. Verified via computed styles at a 375px viewport (two clean, non-overlapping vertical bands, ~9px gap between them) and against the live diff (matches exactly, plus one incidental editor line-wrap on the Certification `<span>` — whitespace only, no functional change). Confirmed working in simulation, then on Aaradhya's own device, before commit.

**Lighthouse**: 87 mobile / 99 desktop, confirmed by Aaradhya against `f4373a2` — the commit immediately after `42d30e0`'s merge, i.e. reflects the full optimization pass but predates the legend fix. (An initially-reported 78/95 was a misread mid-session; corrected to 87/99 before being recorded here — the earlier figure was never actioned on.)

**False-alarm, not actioned**: a suspected horizontal-overflow bug on `achievements.html` mobile (hero text/legend/year-row clipped, scrollbar visible at the bottom of a screenshot) turned out to be a pinch-zoomed screenshot, not a rendering defect — confirmed against a normal-zoom screenshot of the same page. No underlying issue; nothing changed because of it.

**`graphify-out/` stale pre-WebP filename references** (open since v19): resolved as moot. The directory is untracked from git entirely as of `e7b6f8b`, so stale filenames inside it no longer touch anything git-tracked or deployed.

**Verification method**: fresh `git clone` of `origin/main` into a clean sandbox (not trusted from the exported session transcript alone) → `git log --oneline` confirming all four SHAs exist in the expected order (each followed by its usual CI "stamp last commit" + merge commit pair) → `git show --stat`/full diff on each of the four to confirm actual file-level content matches what's summarized above → direct `cat`/`grep`/`ls -la` on the current working tree for `.gitignore`, `.hintrc`, `about.html`, `script.js`, `dev-logs/og-image/template.html`, and all three logo `.webp` files, byte sizes matched exactly against `git show --stat`. Current `origin/main` HEAD: `b8c8014`.

---

**Flag — filename vs. content version, resolved**: filename renamed to `PortfolioWebsite_TRACKER_v24.md` to match the content version, closing the drift noted above (present since the uploaded `v22.5` filename carried `v23` content).

---

## v25 addition — bug-check sweep, pages 1/3/4 (2026-07-27)

Two sessions merged into this entry: a prior exported session (`index.html` check) plus the current session (`experience.html`, `achievements.html`). Repo re-cloned fresh for the current session; HEAD `b6c1aa4` (10 commits ahead of v24's `b8c8014` — all incremental UI/animation polish: card-arrow scaling, achievements track-button styling, keyboard nav for track toggling, hero caption rotation, schema.org credential markup; none altered by this check).

**Page 1 — `index.html` (prior session, carried forward): no bugs found.**

- Clean: tag balance (lxml strict, 0 errors), 0 duplicate ids, all `#anchor` refs resolve, all local `href`/`src` resolve, JSON-LD valid, `style.css` 0 parse errors, `script.js` + inline scripts `node --check` clean, every JS-targeted id exists exactly once, `last-commit.json` shape matches fetch handler.
- VIP/Master gated-content system (initially flagged as suspicious) traced fully and confirmed **legitimate, not a vulnerability**: AES-GCM payloads baked into `script.js`, decrypted client-side via Web Crypto/PBKDF2, real Google Sign-In, Master gated to 4 of the owner's own Gmail addresses, VIP open to any signed-in account (recruiter gimmick), everything local-storage only — no exfiltration.
- Cosmetic-only, not fixed: `style.css` L15–16 duplicated "Token System" comment; `CAPTIONS[]` in the hero-caption script has only 1 entry (the `Math.random()` pick is a no-op); `window.SEARCH_INDEX` declared/initialized but never populated or read (site-wide scaffold, not index-specific).
- **One real finding, unresolved**: `script.js`'s `ACCESS_CONTROL_PAYLOADS` defines an `"achievements-vip"` key that no `.html` file references via `data-payload-id`/`data-payload-link-id` — dead ciphertext, no UI hookup. (Contrast: all 13 `proj-*` keys are correctly wired to `projects.html`.) Not actioned — flagging only.

**Page 3 — `experience.html` (this session): no bugs found.**

- Tag balance, 0 duplicate ids, all 10 referenced logo/certificate assets resolve on disk, all CSS custom properties used are defined, `E — 001`…`E — 008` numbering sequential with no gaps/dupes, `cert-btn` data attributes match `initLightbox()` consumption, `#quickNavGrid`/`#siteNav`/`#siteFooter`/`live-fuse-year` all match global init calls in `script.js`, nav/breadcrumb JSON-LD/canonical/og:url all consistent.

**Page 4 — `achievements.html` (this session): one bug found.**

- **Orphaned "Leadership" category in the Academic legend/filter.** `#legendAcademic` (the default view on page load — `applyTrack('academic')` runs on init) lists Workshop/Certification/Competition/**Leadership**, with `.achievement-item[data-category="leadership"]` and `.legend-swatch--leadership` both styled (teal, `--glow-teal`). But none of the 35 achievement items use `data-category="leadership"` — "leadership" only exists under the separate ECA taxonomy (`data-track="eca" data-eca-category="leadership"`, pink, `--eca-leadership`). Net effect: default Academic view shows a legend swatch that can never match a visible card — stale category left over from before the Academic/ECA track split. **Not yet fixed** — flagging for a decision (remove the Academic "Leadership" legend entry + its unused CSS rule, or tag an existing academic item into it — nothing currently qualifies).
- Everything else clean: tag balance, 0 duplicate ids, in-page anchors resolve, all 96 local asset refs (images/certs) exist, all 52 `cert-btn`s have consistent `data-type`↔extension pairing, every item fully tagged (`data-track` + matching category attr), search-index regenerated via `scripts/extract_index.py` with **zero diff** (35 achievements / 20 projects — matches live DOM exactly), inline date-parsing/sort/year-bucketing script (`·` multi-date, year ranges, AM/PM times) resolves correctly on every tested case.

**Open items carried forward, unchanged:** GitHub API rate-limit block, `AARADHYA_MASTER` merge-pending status (see State of Play table above).

**New open items (v25):** orphaned `achievements-vip` payload key in `script.js`; orphaned "Leadership" category in `achievements.html`'s Academic legend/CSS.

---

## v26 addition — bug-check sweep, page 2 + about (2026-07-27)

From a separately exported session (`projects.html` + `about.html` checks). Re-verified live against a fresh pull before filing — HEAD `4889ff9` (one commit ahead of v25's `b6c1aa4`: the v25 tracker commit itself, `127593a`; no source changes since).

**Correction to v25's `achievements-vip` note**: re-checked ground truth in the live `script.js`/`achievements.html` rather than trusting recollection — `ACCESS_CONTROL_PAYLOADS["achievements-vip"]` still exists, and `data-payload-id=` still appears only twice, both in `index.html` (`index-vip`, `index-master`). **Still orphaned, not resolved** — v25's phrasing stands.

**Page 2 — `projects.html`: no bugs found (one transient issue, self-resolved).**

- Clean: tag balance, 0 duplicate ids, both in-page anchors resolve, all local asset refs exist (incl. `GCSBR_working_demo_poster.jpg`), JSON-LD valid, `script.js` syntax OK, search index in sync (35 achievements/20 projects, no stale entries), the 18 dynamically-`id`'d project cards (`proj-${i}`) deep-link correctly since `buildSearchIndex()` runs before `revealSearchTarget()`, all CSS classes resolve (shared stylesheet + inline block), progress-bar/legend consistency across all in-progress cards, all `target="_blank"` carry `rel="noopener"`, all 13 AES-gated project links decrypt and resolve 200 OK.
- **Transient 404, self-resolved**: `AaradhyaDTmr/PulseLive` GitHub link returned 404 at check time (repo didn't exist under that account or `AaradhyaDT`). Flagged rather than auto-corrected. User made the repo public same session; re-verified again this session via direct fetch — **200 OK, confirmed live and public**. No code change was or is needed.

**About page — `about.html`: one very minor, non-visual discrepancy, unresolved.**

- Clean: tag balance, 0 duplicate ids, anchor integrity, local asset refs, JSON-LD, inline JS syntax, CSS class coverage, heading hierarchy; `live-about-year`/`live-edu-meta`/`live-subjects-title`/`live-edu-tags` correctly wired to `computeLiveDates()`/`applyLiveDates()`, `LIVE` object fields match 1:1, semester logic correctly resolves to IV/I for the current date; "15+ Projects" stat consistent with `index.html`.
- **Stale intrinsic-size hint, re-confirmed still live**: `<img src="assets/images/photo.png" ... width="480" height="640">` (line 647–648) declares 480×640, but `photo.png`/`photo.webp` are both actually 720×960px (re-verified via `identify` both this session and the prior one). Aspect ratio is identical (3:4 either way) so there's no layout shift or visual distortion — purely a stale hint. Optional fix: update to `width="720" height="960"`.

**Open items carried forward, unchanged:** GitHub API rate-limit block; `AARADHYA_MASTER` merge-pending status; orphaned `achievements-vip` payload; orphaned Academic "Leadership" legend category (`achievements.html`).

**Closed this version:** PulseLive 404 (repo made public, re-verified 200 OK — no code change needed).

**New open item (v26):** stale `width`/`height` on `about.html`'s profile photo (480×640 vs actual 720×960).

---

## v28 addition — site-wide bug audit & structural hardening pass (2026-08-04)

Full site-wide audit completed and all open findings resolved:

- **Deep-linking IDs**: Added explicit `id` attributes to all 22 `.project-card` elements (`p-001`…`p-022`) in `projects.html` and all 25 `.journey-node` elements (`j-001`…`j-025`) in `journey.html`. Updated `scripts/verify.py` with `id_prefix: "j-"`.
- **Search index sync**: Regenerated `SEARCH_STATIC_INDEX` via `scripts/extract_index.py` (36 achievements, 22 projects indexed with clean deep-links).
- **Academic legend clean-up**: Removed orphaned "Leadership" swatch from `#legendAcademic` in `achievements.html`.
- **Image hint update**: Corrected profile photo intrinsic hints in `about.html` from `width="480" height="640"` to `width="720" height="960"`.
- **Security hardening**: Added `rel="noopener"` to EmailJS and Formspree external links in `privacy.html`. Fixed internal links in `journey.html` (`contact.html`, `index.html`) to use standard same-tab navigation.
- **Orphaned JS payload clean-up**: Removed unreferenced `"achievements-vip"` entry from `ACCESS_CONTROL_PAYLOADS` in `assets/js/script.js`.
- **Verification status**: `python scripts/verify.py` passes with **0 errors and 0 warnings**. `graphify update .` executed cleanly.

---

## v29 addition — site-wide performance, PWA, SEO & styling upgrades (2026-08-04)

All proposed site upgrades implemented and verified across the portfolio:

- **PWA & Manifest integration**: Created `site.webmanifest` with metadata (`standalone` display, dark theme `#0f0e0c`, maskable SVG icon). Added `<link rel="manifest" href="site.webmanifest" />` across all 10 HTML pages.
- **Mobile video playsinline**: Added `playsinline=""` to the demonstration video element in `projects.html` to prevent iOS devices from forcing full-screen video player popups.
- **Cross-page theme-color script**: Injected dynamic `<meta name="theme-color">` script in `<head>` of `about.html`, `achievements.html`, `experience.html`, `journey.html`, and `projects.html` for uniform address bar tinting across light/dark OS modes.
- **Async image decoding**: Added `decoding="async"` across images in `achievements.html`, `experience.html`, `about.html`, and `journey.html` to prevent main-thread layout stalls during fast scrolling.
- **SEO rich snippets (JSON-LD)**: Added structured JSON-LD schemas for `ItemList`/`SoftwareApplication` on `projects.html`, `Person`/`Organization` on `experience.html`, and `EducationalOccupationalCredential` on `achievements.html`.
- **Print stylesheet optimization (`@media print`)**: Added `@media print` rules in `assets/css/style.css` to hide floating controls (`.cmdk-modal`, `.nav`, `.back-to-top`, `.about-photo-fx`, `.keymap-modal`, `footer`) and format content for crisp printing/PDF resume export.
- **Verification status**: `python scripts/verify.py` passes with **0 errors and 0 warnings**. `graphify update .` executed cleanly.

---

## v30 addition — PWA service worker, skip-links, font preconnects, content-visibility optimization & expanded verification (2026-08-04)

Full v30 site upgrade suite implemented and verified across the portfolio:

- **PWA Service Worker (`sw.js`)**: Created versioned `sw.js` with cache-first strategy for static assets (CSS, JS, images, webmanifest) and network-first strategy for HTML navigation requests. Registered automatically in `assets/js/script.js`.
- **Keyboard accessibility skip-links**: Standardized `<a href="#main-content" class="skip-link">Skip to main content</a>` and `<main id="main-content">` targets across all 10 HTML pages, styled with focus transitions in `assets/css/style.css`.
- **Font preconnect hints**: Added `<link rel="preconnect" href="https://fonts.googleapis.com" />` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />` hints across site pages for faster typography connection handshakes.
- **CSS content-visibility optimization**: Added `.content-visibility-auto` utility class to `assets/css/style.css` with `contain-intrinsic-size` to reduce main-thread layout rendering overhead on long card grids and timelines.
- **Expanded verification script (`scripts/verify.py`)**: Added `check_pwa_and_a11y_metadata()` to `scripts/verify.py` to automatically validate manifest linkage, skip links, main-content targets, and font hints across all site HTML files.
- **Verification status**: `python scripts/verify.py` passes with **0 errors and 0 warnings**. `graphify update .` executed cleanly (280 nodes, 269 edges, 82 communities).

---

## v31 addition — URL hash filter sync, screen reader accessibility, PWA v31 cache bump & SEO verification (2026-08-04)

Full v31 site upgrade suite implemented and verified across the portfolio:

- **PWA Service Worker (`sw.js`)**: Upgraded service worker cache version to `aaradhya-portfolio-v31` for immediate static asset update pickup and clean client cache invalidation.
- **Dynamic Filter & URL Hash Synchronization**: Enhanced track filtering logic on `achievements.html` to synchronize active filter state with `window.location.hash` (`#track=academic`, `#track=eca`) via `history.replaceState` and restore state on page load.
- **Screen Reader Accessibility Live Regions**: Added `#achvLiveStatus` dynamic `aria-live="polite"` status region on `achievements.html` for real-time assistive tech feedback when switching achievement tracks.
- **Social & OpenGraph Metadata Sweep**: Added missing `og:image` and `twitter:card` tags to `404.html` for consistent social sharing card rendering across all site pages.
- **Extended Automated Verification (`scripts/verify.py`)**: Updated `check_pwa_and_a11y_metadata()` in `scripts/verify.py` to automatically audit social image metadata (`og:image`, `twitter:card`) across all 10 site HTML pages.
- **Verification status**: `python scripts/verify.py` passes with **0 errors and 0 warnings**.

---

## v31.1 addition — Interactive "What's New" Major Commit Showcase & Journey Nodes (2026-08-04)

Full What's New major release feature implemented and verified:

- **Site-Wide "What's New" Modal (`assets/js/script.js`)**: Implemented `openWhatsNewModal()` & `closeWhatsNewModal()` rendering version badges, dates, GitHub commit links, and bulleted highlights for major releases (v31, v30, v29, v28).
- **Command Palette & Shortcut Integration**: Added "What's New (v31 Major Releases)" to `CMDK_PAGES` and bound `Shift+N` shortcut in `initKeyNav()`.
- **Footer Button & Storage**: Added `What's New (v31)` button in `siteFooter` and stored viewed version in `localStorage` (`adt_last_seen_release`).
- **Journey Timeline Milestones (`journey.html`)**: Added milestone nodes `j-027` (What's New Feature) and `j-026` (v31 Upgrade Suite) to the engineering timeline.
- **Verification status**: `python scripts/verify.py` passes with **0 errors and 0 warnings** (`achievements=36, projects=22, journey=27`).

---

## v32 addition — PWA offline resilience, reading progress bar, 3D card tilt & journey node j-028 (2026-08-04)

Full v32 site upgrade suite implemented and verified across the portfolio:

- **PWA Service Worker (`sw.js`)**: Upgraded service worker cache version to `aaradhya-portfolio-v32` and injected live online/offline network status toasts in `assets/js/script.js`.
- **Scroll Reading Progress Bar (`#readProgressBar`)**: Added top viewport neon progress bar driven by `requestAnimationFrame` on scroll across all 10 site HTML pages (`index.html`, `about.html`, `projects.html`, `experience.html`, `achievements.html`, `journey.html`, `contact.html`, `privacy.html`, `terms.html`, `404.html`).
- **Hardware-Accelerated 3D Card Tilt Micro-Interactions**: Implemented 3D perspective mousemove tilt handlers on `.project-card`, `.achievement-item`, `.journey-node`, and `.exp-card` in `assets/js/script.js`, styled in `assets/css/style.css` (gated on non-touch devices and `prefers-reduced-motion: no-preference`).
- **"What's New (v32)" Release History & Footer**: Updated `SITE_RELEASES` history array, command palette item, and footer button to `What's New (v32)`.
- **Journey Engineering Timeline (`journey.html`)**: Added milestone node `j-028` for the v32 upgrade suite.
- **Verification status**: `python scripts/verify.py` passes with **0 errors and 0 warnings** (`achievements=36, projects=22, journey=28`). `graphify update .` executed cleanly.

---

## v33 addition — interactive dev terminal, CMDK filter pills, cursor light trail & journey node j-029 (2026-08-04)

Full v33 site upgrade suite implemented and verified across the portfolio:

- **Interactive Dev Terminal Widget (`#adtTerminal`)**: Implemented a retro-futuristic interactive terminal section on the Home page (`index.html`) supporting live commands (`skills`, `projects`, `experience`, `achievements`, `contact`, `whatsnew`, `theme`, `matrix`, `clear`) with quick preset buttons and animated output formatting in `assets/js/script.js` and `assets/css/style.css`.
- **Command Palette (`CMDK`) Quick Filters**: Integrated tab category filter pills into the command palette search engine for instant category filtering.
- **Hardware-Accelerated Cursor Light Trail Micro-Interaction**: Added dynamic mousemove particle glow trails for the custom cursor (gated on non-touch devices and `prefers-reduced-motion: no-preference`).
- **PWA Service Worker & Release History (`sw.js`)**: Upgraded service worker cache version to `aaradhya-portfolio-v33` and updated `SITE_RELEASES` history and footer release button to `What's New (v33)`.
- **Journey Engineering Timeline (`journey.html`)**: Added milestone node `j-029` for the v33 upgrade suite.
- **Verification status**: `python scripts/verify.py` passes with **0 errors and 0 warnings** (`achievements=36, projects=22, journey=29`). `graphify update .` executed cleanly.

---

## v34 addition — mobile touch UX, iOS safe area & web haptics suite, journey node j-030 (2026-08-08)

Full v34 site upgrade suite implemented and verified across the portfolio:

- **iOS Safe Area Insets (`viewport-fit=cover`)**: Added `viewport-fit=cover` across all 10 site HTML pages (`index.html`, `about.html`, `projects.html`, `experience.html`, `achievements.html`, `journey.html`, `contact.html`, `privacy.html`, `terms.html`, `404.html`) and updated CSS with `env(safe-area-inset-*)` rules for fixed navigation bars (`nav`), mobile drawer (`.nav-drawer`), floating widgets (`.back-top`, `.scroll-pct`, `.master-panel-widget`), and footer padding.
- **Mobile Touch Gesture Controls**: Added touch swipe listeners for modal dismiss (swipe down for cert lightbox, search command palette, release modal) and drawer close (swipe left for navigation drawer).
- **Web Haptic Feedback API**: Integrated `triggerHapticFeedback()` micro-vibrations across theme toggle, button actions, and terminal quick commands (gated on touch/haptic support).
- **Mobile Terminal UX & Touch active states**: Added custom horizontal overflow scroll for terminal quick command buttons and `:active` scale states for touch devices.
- **PWA Service Worker & Release History (`sw.js`)**: Upgraded service worker cache version to `aaradhya-portfolio-v34` and updated `SITE_RELEASES` history, CMDK entries, and footer release button to `What's New (v34)`.
- **Journey Engineering Timeline (`journey.html`)**: Added milestone node `j-030` for the v34 upgrade suite.
- **Verification status**: `python scripts/verify.py` passes with **0 errors and 0 warnings** (`achievements=36, projects=22, journey=30`). `graphify update .` executed cleanly.

---

## v35 addition — motion, typed captions, count-up counters, view transitions & journey node j-031 (2026-08-08)

Full v35 site upgrade suite implemented and verified across the portfolio:

- **Staggered Card Entrance Animations**: Implemented `reveal-stagger-1` through `reveal-stagger-8` CSS utilities in `assets/css/style.css` and enhanced `initReveal()` in `assets/js/script.js` to automatically cascade entrance motion across card grids.
- **Typed Hero Subtitle Animation**: Added character-by-character typewriter animation for `#hero-caption` with a 6-caption random rotation pool and blinking cursor in `assets/js/script.js` & `assets/css/style.css`.
- **Scroll-Triggered Animated Stat Counters**: Implemented `initCountUp()` in `assets/js/script.js` using `IntersectionObserver` to count up target values (15+ projects, 4th year, 2 fellowships, 8 roles) when scrolled into view.
- **Enhanced View Transitions API**: Added element-level view transition names (`site-logo`, `page-title`) and circular clip-path theme wipe transition on theme toggle in `assets/js/script.js` & `assets/css/style.css`.
- **Contact Form Focus Glow & Animated Success Badge**: Added glow ring shadow on focused form fields and animated checkmark badge (`.form-success-badge`) on form submission in `contact.html` & `assets/css/style.css`.
- **SEO & Sitemap Refresh**: Expanded JSON-LD schema with `ContactPage` object in `contact.html` and updated `<lastmod>` dates to `2026-08-08` across `sitemap.xml`.
- **PWA Service Worker & Release History (`sw.js`)**: Upgraded service worker cache version to `aaradhya-portfolio-v35` and updated `SITE_RELEASES` history, CMDK entries, and footer release button to `What's New (v35)`.
- **Journey Engineering Timeline (`journey.html`)**: Added milestone node `j-031` for the v35 upgrade suite.
- **Verification status**: `python scripts/verify.py` passes with **0 errors and 0 warnings** (`achievements=36, projects=22, journey=31`). `graphify update .` executed cleanly.

---

## v36 addition — visual polish, performance, skill matrix & mobile UX suite, journey node j-032 (2026-08-08)

Full v36 site upgrade suite implemented and verified across the portfolio:

- **Glassmorphism & Rotating Gradient Borders**: Added frosted-glass card finishes with hardware-accelerated `@property` conic-gradient rotating borders on card hovers across home status card, project cards, and experience items in `assets/css/style.css`.
- **Typography Hierarchy Upgrade**: Integrated Google Font `Playfair Display` across all 10 HTML pages and added `--display-serif` font token for elegant display headings.
- **Interactive Skill & Tech Matrix**: Embedded scroll-triggered animated skill proficiency progress bars with gradient fills inside the status card in `index.html`, `assets/css/style.css`, and `assets/js/script.js`.
- **Mobile Bottom Sheet Navigation**: Upgraded mobile navigation drawer to a spring-physics bottom sheet (`nav-drawer`) with a drag handle, backdrop blur overlay (`nav-drawer-backdrop`), and smooth slide-up animation in `assets/css/style.css` & `assets/js/script.js`.
- **Horizontal Swipe-to-Navigate Gesture**: Added horizontal touch swipe gesture navigation across pages (Home ↔ Projects ↔ Experience ↔ Achievements ↔ About ↔ Journey ↔ Contact) with animated edge indicator toasts (`.swipe-indicator`).
- **Scroll-Linked Parallax Depth Effects**: Implemented rAF-throttled scroll parallax for hero glow elements, background grid lines, and section headings (`initScrollParallax()`).
- **PWA Service Worker & Release History (`sw.js`)**: Upgraded service worker cache version to `aaradhya-portfolio-v36` and updated `SITE_RELEASES` history, CMDK entries, and footer release button to `What's New (v36)`.
- **Journey Engineering Timeline (`journey.html`)**: Added milestone node `j-032` for the v36 upgrade suite.
- **Verification status**: `python scripts/verify.py` passes with **0 errors and 0 warnings** (`achievements=36, projects=22, journey=32`). `graphify update .` executed cleanly.

---

## v37 addition — guided cross-page site tour with spotlight overlay, journey node j-033 (2026-08-08)

Full v37 guided tour feature implemented and verified:

- **Guided Cross-Page Site Tour**: Step-by-step spotlight overlay traversing all 7 main site pages with target element highlighting.
- **State Persistence & Navigation**: Remembers tour progression across page transitions via `localStorage` (`adt_tour_active` + `adt_tour_step`).
- **Shortcuts & Accessibility**: Full keyboard control (`Shift+T` to trigger, Arrow keys to navigate, `Esc` to exit) and `prefers-reduced-motion` compliance.
- **Journey Engineering Timeline (`journey.html`)**: Added milestone node `j-033` for the v37 guided tour release.

---

## v38 addition — Web Audio micro-sounds, reading metrics, live result indicators & verification suite, journey node j-034 (2026-08-08)

Full v38 site upgrade suite implemented and verified across the portfolio:

- **Synthesized Web Audio Micro-Sounds**: Zero-dependency Web Audio API sound synthesizer for interactive UI feedback (clicks, pops, chimes) with persistent audio toggle (`adt_audio_enabled`) and `Shift+A` shortcut.
- **Dynamic Reading Time & Word Count Badges**: Client-side content metric engine generating glassmorphic reading time badges (`⏱️ X min read · Y words`) across `about.html`, `journey.html`, `experience.html`, `achievements.html`, and `projects.html`.
- **Real-Time Filter Result Counters**: Live status indicator badges (`Showing N of M items`) for search and category filtering on projects and achievements lists.
- **Timeline & Versioning Alignment**: Milestone nodes `j-033` (v37 Guided Tour) and `j-034` (v38 Upgrade Suite) added to `journey.html`, `sw.js` cache bumped to `v38`, and release history updated across `SITE_RELEASES`, command palette (`CMDK`), and footer controls (`What's New (v38)`).
- **Responsive Animated Hero Caption**: Fixed hero subtitle typewriter text (`#hero-caption`) on small screen sizes (<=768px) by enabling natural multi-line text wrapping (`white-space: normal`, `overflow-wrap: break-word`) so long captions wrap to the next line instead of truncating with `...` on mobile viewports.
- **Mobile Access Tier & Keymap Layout Polish**: Fixed squished text column bug on mobile in `#about-sign-in`, `#vip-exclusive`, and `#master-exclusive` by switching icon/content layout to column direction (`flex-direction: column`) and adjusting padding (`.access-card-inner`, `.master-card-inner`). Adjusted keymap card padding and floating widget offsets (`.back-top`, `.audio-toggle`, `.scroll-pct`) on mobile viewports (<=768px and <=480px) to prevent button overlay collisions.
- **Verification status**: `python scripts/verify.py` passes with **0 errors and 0 warnings** (`achievements=37, projects=22, journey=34`).
