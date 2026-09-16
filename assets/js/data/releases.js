/* ============================================================
   SITE RELEASES DATA - aaradhyadt.github.io
   Single runtime source of truth for the version string and
   the What's-New modal feed (modules/ui.js). Bumped by
   scripts/site_automation.py (bump-patch / bump-major).
   Loads before core modules via script.js MODULES order.
   ============================================================ */
const SITE_RELEASES = [
  {
    version: 'v54.6',
    date: '2026-09-16',
    sha: 'rel54',
    title: "Ecosystem Multi-Repo Fleet Harmonization & Baseline v1.0 Freeze",
    highlights: [
      "Core updates and architectural improvements for v54",
      "PWA & Cache: Bumped Service Worker cache to aaradhya-portfolio-v54"
    ]
  },
  {
    version: 'v53.33',
    date: '2026-09-08',
    sha: 'rel53',
    title: "Visual Regression Engine & Native Dynamic ESM Suite",
    highlights: [
      "Core updates and architectural improvements for v53",
      "PWA & Cache: Bumped Service Worker cache to aaradhya-portfolio-v53"
    ]
  },
  {
    version: 'v52',
    date: '2026-09-08',
    sha: 'rel52',
    title: "Visual Regression Engine & Native Dynamic ESM Suite",
    highlights: [
      "Core updates and architectural improvements for v52",
      "PWA & Cache: Bumped Service Worker cache to aaradhya-portfolio-v52"
    ]
  },
  {
    version: 'v51.4',
    date: '2026-09-08',
    sha: 'rel51',
    title: "Tooling Hyper-Optimization & uv Acceleration Engine",
    highlights: [
      "Integrated Astral uv package manager and .venv environment engine",
      "Accelerated sync.ps1 execution from 45.7s to 6-11s (4-7x speedup)",
      "Optimized Graphify workflow to routine incremental AST sync without LLM latency",
      "Parallelized E2E integration and pre-commit verification gates via ThreadJob",
      "Added -FullGraph, -SkipBotSync, -NoUv flags and smart conditional git operations"
    ]
  },
  {
    version: 'v50.28',
    date: '2026-09-08',
    sha: 'rel50',
    title: "5-Project Ecosystem Synchronization, Native Unit Testing Suite & Security Hardening",
    highlights: [
      "Project Ecosystem Sync: Integrated NovaOptimizer (C#/.NET 10 & WPF), md2pdf-desktop (Tkinter/Pandoc/wkhtmltopdf), Claude Desktop v2 autonomous fleet, SPARK wearable, and BiasAperture fairness audit with zero-leak AES-256-GCM VIP links",
      "Native JS Unit Testing Suite: Zero-dependency node:test suite covering PBKDF2/AES-256-GCM crypto, CmdK search ranking, live dates, and CLI command parsing",
      "E2E Smoke Runner: Standalone HTTP/DOM verification engine testing status codes, 404 routing, 37 precached assets, and noscript fallbacks across all 10 pages",
      "Strict Content Security Policy: Deployed <meta http-equiv='Content-Security-Policy'> across all HTML pages for hardened XSS defense",
      "Verification Gate: Expanded pre-commit test suite to 24 check categories, fully passing with zero errors"
    ]
  },
{

    version: 'v49.50',

    date: '2026-08-19',

    sha: 'xtool20',

    title: 'xTool Laser Safety Awareness Training & Printer Maintenance Certifications',

    highlights: [

      'Certifications: Added xTool Laser Safety Awareness Training (achv-37) & Printer Maintenance Certification (achv-38) with WebP previews & PDF downloads',

      'Makerspace Integration: Tagged under Academic Certifications in collaboration with KEC Makerspace',

      'Search & Tour: Updated search static index and site tour metrics to 39 verified achievements',

      'Hygiene: Passed complete 22-category verification suite'

    ]

  },

  {

    version: 'v48',

    date: '2026-08-16',

    sha: '6c92142',

    title: 'Multi-Category Project Filters, ATS Multi-Format Exporter & Security Suite',

    highlights: [

      'Projects: Added dynamic category filter pill bar (All, AI/ML, Robotics/Embedded, Hardware, Web/Apps) with real-time count badges and smooth transitions',

      'ATS Resume Generator: One-click Copy ATS Plain Text and Download Markdown (.md) multi-format exports directly from the modal',

      'Offline Resilience: Contact form offline submission queue with automatic background synchronization on network reconnect',

      'Security & CLI: Client-side passcode brute-force rate limiting with 30s cooldown and new Dev Terminal navigation commands (goto, cv, email, filter)',

      'PWA & Cache: Bumped Service Worker cache to aaradhya-portfolio-v48'

    ]

  },

  {

    version: 'v47',

    date: '2026-08-14',

    sha: 'upg47',

    title: 'Comprehensive Upgrade Suite — Diagnostics, Terminal Expansion & Visual Polish',

    highlights: [

      'Diagnostics: Fixed verify.py JSON-LD schema validation to handle array-wrapped structured data blocks; excluded 404.html from sitemap sync warnings — suite now passes 0 errors, 0 warnings',

      'Dev Terminal v47: Added stats, benchmark, run prakopnet, run pulselive commands; implemented ArrowUp/ArrowDown command history traversal',

      'Visual Polish: Enhanced glass-card glassmorphism with inset top-edge highlight, hover lift spring transition, and accent glow border',

      'PWA & Cache: Bumped Service Worker cache to aaradhya-portfolio-v47 with full asset manifest'

    ]

  },

  {

    version: 'v46',

    date: '2026-08-13',

    sha: 'hyp3r46',

    title: 'Site-Wide Hyper-Automation Suite & Custom Site MCP Server Integration',

    highlights: [

      'Site Automation Engine: Shipped scripts/site_automation.py CLI supporting automated site telemetry, audits, version syncing, and search index extraction',

      'Site MCP Server: Built custom Model Context Protocol server (mcp-server/site_mcp.py) exposing site:// projects, experience, achievements, tracker, graph, and health resources over stdio',

      'MCP Configuration: Created mcp_config.json for instant registration in Antigravity IDE, Claude Desktop, and Cursor',

      'Lighthouse CI Automation: Added .github/workflows/lighthouse-audit.yml for automated Lighthouse accessibility and performance testing'

    ]

  },

  {

    version: 'v45',

    date: '2026-08-13',

    sha: 'v3r1fy45',

    title: 'Robust Troubleshooting Infrastructure & Site Hardening Upgrade',

    highlights: [

      'Verification Engine: Expanded verify.py from 5 to 17 check categories — cross-page links, asset validation, JS syntax, version consistency, JSON-LD schemas, file size budgets, and more',

      'Pre-Commit Gate: sync.ps1 now runs verify.py before every commit — blocks pushes with errors, -SkipVerify escape hatch for emergencies',

      'Dev Server Fix: Fixed ROOT path bug in dev-serve.py, added CORS headers and MIME type support for .webmanifest/.webp',

      'Dev Terminal: New healthcheck command for client-side diagnostics — module loading, SW status, performance metrics, nav link validation',

      'CI Enhancement: verify.yml now includes Node.js syntax checking step alongside Python structural checks'

    ]

  },

  {

    version: 'v44',

    date: '2026-08-13',

    sha: 'u7g7r44',

    title: 'Site-Wide v44 Upgrade Suite — Performance Hardening, A11y/SEO & Visual Polish',

    highlights: [

      'Performance Optimization: Scoped background grain overlay to dark mode only, eliminated static will-change compositing bloat, added LCP preloads',

      'Accessibility Hardening: Refined light-mode card shadows & focus-visible rings with double-ring contrast technique; fixed reduced motion cursor fallback',

      'Visual Aesthetics Polish: Added animated section title underlines, pulse animations on circuit divider nodes, and tactile button active micro-interactions',

      'SEO & PWA Hardening: Updated sitemap lastmod timestamps, enhanced web manifest with ID and categories, and bumped SW cache to aaradhya-portfolio-v44'

    ]

  },

  {

    version: 'v43',

    date: '2026-08-13',

    sha: 'r4d4r43',

    title: 'Site-Wide v43 Upgrade Suite — Skill Radar, ATS Resume Builder & Interactive Sandbox',

    highlights: [

      'Interactive Skill & Domain Radar visualizer with 5 core competency nodes, score metrics, and toolstacks on about.html',

      'Tailored ATS Resume Generator & Exporter modal with role-based filtering (Master CV, AI/ML, Embedded, Full-Stack) and one-click print/PDF export',

      'Multi-Tab Project Code & Architecture Inspector with syntax highlighting and copy code capabilities',

      'Interactive Dev Terminal sandbox commands (radar, resume, run spark, run gcsbr, glossary)',

      'PWA Service Worker cache version upgraded to aaradhya-portfolio-v43'

    ]

  },

  {

    version: 'v42',

    date: '2026-08-13',

    sha: 'm0du42l',

    title: 'Site-Wide v42 Upgrade Suite — Performance & Modular Code Quality Architecture',

    highlights: [

      'Refactored monolithic script.js into 8 clean, decoupled ES/IIFE architecture modules (core, ui, cmdk, access, tour, audio, terminal, haptics)',

      'Enhanced static search index verification and full structural integrity validation in verify.py',

      'PWA Service Worker cache version upgraded to aaradhya-portfolio-v42',

      'Optimized script loading and DOMContentLoaded boot initialization sequence'

    ]

  },

  {

    version: 'v41',

    date: '2026-08-12',

    sha: 'c0l0r41',

    title: 'Color Upgrades & Multi-Theme Accent Customization Suite',

    highlights: [

      'Interactive 6-theme Accent Color Palette Switcher (Gold ­ƒææ, Emerald ÔÜí, Violet ­ƒö«, Cyan ­ƒîè, Ruby ­ƒö┤, Prism ­ƒîî)',

      'Dynamic CSS accent token inheritance across dark and light themes with local storage persistence',

      'Upgraded ambient radial color glows, card glassmorphic hover borders, and terminal widget accents',

      'Tactile haptic feedback integration for swatch toggles & popover navigation',

      'PWA Service Worker cache version upgraded to aaradhya-portfolio-v41'

    ]

  },

  {

    version: 'v40',

    date: '2026-08-12',

    sha: '94bef09',

    title: 'Site-Wide v40 Upgrade Suite — Inter Typography & Performance Core',

    highlights: [

      'Inter variable font typography system modernization with optimized font fallbacks',

      'IntersectionObserver & Visibility API canvas rendering lifecycle optimization',

      'Spring-eased count-up milestone stat counters & card transform hardware scoping',

      'Scrolled nav saturation/blur (saturate 180% + blur 20px) visual upgrade',

      'PWA Service Worker cache version upgraded to aaradhya-portfolio-v40'

    ]

  },

  {

    version: 'v39',

    date: '2026-08-09',

    sha: '0039321',

    title: 'SEO, AEO & ADT Brand Identity Upgrade Suite',

    highlights: [

      'ADT (Aaradhya Dev Tamrakar) brand identity integration across all 10 site page titles & metadata',

      'Enhanced JSON-LD structured schemas (Person alternate names, WebSite, ProfilePage & FAQPage)',

      'AEO allowlist for AI search bots (GPTBot, ClaudeBot, PerplexityBot) in robots.txt',

      'Interactive Dev Terminal multiline output formatting & master Esc key overlay handler',

      'PWA Service Worker cache version upgraded to aaradhya-portfolio-v39'

    ]

  },

  {

    version: 'v38',

    date: '2026-08-08',

    sha: 'a7b8c9d',

    title: 'Site-Wide v38 Upgrade Suite — Web Audio Micro-Sounds, Reading Time & Verification',

    highlights: [

      'Web Audio API synthesized sound cues (clicks, pops, chimes) with Shift+A toggle',

      'Dynamic reading time & word count badges across all main content pages',

      'Real-time filter result count indicators on projects and achievements list',

      'PWA Service Worker cache version upgraded to aaradhya-portfolio-v38',

      'Site-wide HTML tag balance & structural integrity verification in verify.py',

      'Journey engineering timeline milestone nodes j-033 (v37) and j-034 (v38)'

    ]

  },

  {

    version: 'v37',

    date: '2026-08-08',

    sha: '570329b',

    title: 'Guided Cross-Page Site Tour with Spotlight Overlay',

    highlights: [

      'Interactive cross-page spotlight tour traversed across all 7 main pages',

      'Remembers tour progress across page transitions via localStorage',

      'Keyboard navigation (Arrow keys, Esc, Shift+T shortcut) & reduced-motion support',

      'Journey engineering timeline milestone node j-033 for v37 tour release'

    ]

  },

  {

    version: 'v36',

    date: '2026-08-08',

    sha: '9f8e7d6',

    title: 'Site-Wide v36 Upgrade Suite — Visual Polish, Performance & Mobile UX',

    highlights: [

      'Glassmorphism card polish & conic-gradient rotating borders',

      'Playfair Display display serif typography hierarchy upgrade',

      'Interactive Skill & Tech Matrix progress bars with scroll trigger',

      'Mobile Bottom Sheet navigation drawer with backdrop & drag handle',

      'Horizontal swipe-to-navigate between site pages with visual indicators',

      'Scroll-linked parallax depth effects (hero glow, background mesh blobs)',

      'Journey timeline milestone node j-032 for v36 upgrade suite'

    ]

  },

  {

    version: 'v35',

    date: '2026-08-08',

    sha: 'c5d35e1',

    title: 'Site-Wide v35 Upgrade Suite — Motion, Interactions & Performance',

    highlights: [

      'Staggered card entrance animations across grid sections',

      'Typed hero caption animation with expanded rotating pool',

      'Scroll-triggered animated stat counters (15+ Projects, 4th Year, etc.)',

      'Enhanced View Transitions API with element morphing & circular theme wipe',

      'Form focus glow rings & animated checkmark success state',

      'Journey timeline milestone node j-031 for v35 upgrade suite'

    ]

  },

  {

    version: 'v34',

    date: '2026-08-08',

    sha: 'a4b8c9d',

    title: 'Mobile Touch UX & Safe Area Overhaul Suite',

    highlights: [

      'iOS safe area inset (env(safe-area-inset-*)) & viewport-fit=cover integration',

      'Web Touch Gestures: swipe-to-close on mobile nav drawer, lightboxes & modals',

      'Haptic Touch Feedback API (navigator.vibrate) on micro-interactions',

      'Mobile Dev Terminal auto-scroll & touch preset enhancements',

      'Journey milestone node j-030 for v34 upgrade suite'

    ]

  },

  {

    version: 'v33',

    date: '2026-08-04',

    sha: 'fde29d6',

    title: 'Interactive Dev Terminal Widget, CMDK Filters & Cursor Light Trail',

    highlights: [

      'Interactive retro-futuristic terminal widget (#adt-terminal) with live command execution',

      'Quick category tab filter pills integrated into Command Palette (CMDK)',

      'Hardware-accelerated custom cursor light trail micro-interaction',

      'Journey milestone node j-029 for v33 upgrade suite'

    ]

  },

  {

    version: 'v32',

    date: '2026-08-04',

    sha: 'c65d080',

    title: 'PWA Resilience, Reading Progress Bar & 3D Card Tilt',

    highlights: [

      'PWA Service Worker v32 cache refresh with live network status toasts',

      'Top viewport reading progress bar (#readProgressBar) on scroll',

      '3D perspective card tilt micro-interactions on hover',

      'Journey timeline milestone j-028 for v32 upgrade suite'

    ]

  },

  {

    version: 'v31',

    date: '2026-08-04',

    sha: '8761335',

    title: 'Site Upgrade Suite — Hash Sync, Accessibility & PWA Refresh',

    highlights: [

      'Dynamic URL hash filter state sync (#track=academic, #track=eca) on achievements',

      'Screen reader aria-live=polite status announcements for item filtering',

      'PWA Service Worker cache version upgrade to v31',

      'Comprehensive social preview metadata audit (og:image, twitter:card)'

    ]

  },

  {

    version: 'v30',

    date: '2026-08-04',

    sha: 'b146fa5',

    title: 'PWA Service Worker, Skip-Links & Font Preconnects',

    highlights: [

      'Offline PWA Service Worker (sw.js) integration',

      'Keyboard accessibility skip-links across all 10 site HTML pages',

      'Font preconnect hints for faster typography handshakes',

      'CSS content-visibility optimization for rendering speed'

    ]

  },

  {

    version: 'v29',

    date: '2026-08-04',

    sha: '43d99bd',

    title: 'PWA WebManifest & Performance Upgrades',

    highlights: [

      'Created site.webmanifest with dark theme metadata (#0f0e0c)',

      'Playsinline video mobile attributes for iOS devices',

      'Dynamic cross-page theme-color address bar tinting',

      'SEO JSON-LD structured schemas across projects & experience'

    ]

  },

  {

    version: 'v28',

    date: '2026-08-04',

    sha: 'fdbf5b2',

    title: 'Site-Wide Audit & Deep-Linking Hardening',

    highlights: [

      'Explicit deep-link IDs for project cards and journey nodes',

      'Automated search index sync verification in scripts/verify.py',

      'Security hardening (rel=noopener, clean same-tab nav)'

    ]

  }

];



window.SITE_RELEASES = SITE_RELEASES;

