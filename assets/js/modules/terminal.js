/* ============================================================
   MODULE: terminal.js — aaradhyadt.github.io (v54.5)
   Interactive retro-futuristic dev terminal widget.
   ============================================================ */

(function initTerminalWidget() {
  function setup() {
    const term = document.getElementById('adtTerminal');
    if (!term) return;

    const body = term.querySelector('.terminal-body');
    const input = term.querySelector('.terminal-input');
    const quickBtns = term.querySelectorAll('.terminal-quick-cmd');
    if (!body || !input) return;

    // Make terminal output accessible to screen readers
    body.setAttribute('aria-live', 'polite');
    body.setAttribute('aria-relevant', 'additions');
    body.setAttribute('aria-atomic', 'false');

    const welcomeSpan = body.querySelector('.term-green');
    if (welcomeSpan && typeof SITE_RELEASES !== 'undefined' && SITE_RELEASES[0]) {
      welcomeSpan.textContent = `Welcome to Aaradhya Dev Tamrakar's Interactive Developer Terminal (${SITE_RELEASES[0].version}).`;
    }

    let history = [];
    try {
      const saved = localStorage.getItem('adt_terminal_history');
      if (saved) history = JSON.parse(saved);
      if (!Array.isArray(history)) history = [];
    } catch (e) {
      history = [];
    }
    let historyIndex = history.length;

    const COMMANDS = {
      help: () => `
<span class="term-green">Available Commands:</span><br>
  <span class="term-gold">skills</span>       - Overview of technical skillset &amp; engineering tools<br>
  <span class="term-gold">radar</span>        - Interactive 5-Domain Skill Radar visualizer<br>
  <span class="term-gold">graph</span>        - Interactive 3D AST Knowledge Graph HUD (WebGL 2)<br>
  <span class="term-gold">resume</span>       - Open Tailored ATS Resume Generator &amp; Multi-Format Exporter<br>
  <span class="term-gold">projects</span>     - Key engineering &amp; AI/ML projects<br>
  <span class="term-gold">filter [cat]</span> - Filter project cards ('filter aiml', 'filter embedded', 'filter apps')<br>
  <span class="term-gold">goto [page]</span>  - Quick navigation ('goto projects', 'goto about', 'goto contact')<br>
  <span class="term-gold">cv</span>           - Download official Curriculum Vitae (PDF)<br>
  <span class="term-gold">email</span>        - Copy direct contact email to clipboard<br>
  <span class="term-gold">share</span>        - Share portfolio link via Web Share API<br>
  <span class="term-gold">history</span>      - View recent terminal command execution history<br>
  <span class="term-gold">run [name]</span>   - Run simulation ('run spark', 'run gcsbr', 'run prakopnet', 'run pulselive')<br>
  <span class="term-gold">stats</span>        - Site telemetry summary (projects, achievements, milestones)<br>
  <span class="term-gold">benchmark</span>    - Client runtime performance &amp; DOM metrics<br>
  <span class="term-gold">glossary</span>     - Technical acronym glossary ('glossary spark')<br>
  <span class="term-gold">experience</span>   - Leadership &amp; technical roles<br>
  <span class="term-gold">achievements</span> - Credentials &amp; competition milestones<br>
  <span class="term-gold">contact</span>      - Direct communication channels<br>
  <span class="term-gold">graph / ast</span>   - Interactive 2D/3D AST Knowledge Graph HUD (ExplainGit style)<br>
  <span class="term-gold">shortcuts</span>    - Open Keyboard Shortcuts Cheat Sheet HUD (?)<br>
  <span class="term-gold">whatsnew</span>     - View latest major release highlights<br>
  <span class="term-gold">healthcheck</span> - Run client-side site diagnostics<br>
  <span class="term-gold">theme</span>        - Toggle site color scheme (Dark / Light)<br>
  <span class="term-gold">accent [name]</span> - Easter egg color themes (gold, emerald, violet, cyan, ruby, prism)<br>
  <span class="term-gold">notify</span>        - Enable browser &amp; push notifications for site updates<br>
  <span class="term-gold">sound / audio</span> - Toggle UI micro-sound cues<br>
  <span class="term-gold">tour</span>         - Launch interactive guided site tour<br>
  <span class="term-gold">matrix</span>       - Trigger cybernetic digital rain<br>
  <span class="term-gold">clear</span>        - Clear terminal screen output
`.trim(),
      goto: (arg) => {
        const dest = (arg || '').toLowerCase().trim();
        const map = {
          home: 'index.html',
          projects: 'projects.html',
          project: 'projects.html',
          experience: 'experience.html',
          achievements: 'achievements.html',
          achievement: 'achievements.html',
          about: 'about.html',
          journey: 'journey.html',
          contact: 'contact.html',
          terms: 'terms.html',
          privacy: 'privacy.html'
        };
        if (map[dest]) {
          setTimeout(() => { window.location.href = map[dest]; }, 600);
          return `<span class="term-green">Navigating to ${map[dest]}...</span>`;
        }
        return `<span class="term-gold">Usage: goto [home | projects | experience | achievements | about | journey | contact]</span>`;
      },
      ls: () => `
<span class="term-green">[SITE DIRECTORY &amp; MODULES]</span><br>
  <span class="term-cyan">Pages:</span> index.html  projects.html  experience.html  achievements.html  about.html  journey.html  contact.html<br>
  <span class="term-cyan">Docs:</span>  AARADHYA_DEV_TAMRAKAR_CV.pdf  llms.txt  llms-full.txt  sitemap.xml<br>
  <span class="term-cyan">Categories:</span> aiml  embedded  hardware  apps
`.trim(),
      whoami: () => `
<span class="term-green">Aaradhya Dev Tamrakar (ADT)</span><br>
  • <span class="term-gold">Role:</span> Electronics, Communication &amp; Information Engineer (BEI IV/II)<br>
  • <span class="term-gold">Institution:</span> Kathmandu Engineering College, IOE, Tribhuvan University<br>
  • <span class="term-gold">Fellowships:</span> Fuse AI Fellow (Fusemachines 2026) · NSSR DataCamp Fellow (C2)<br>
  • <span class="term-gold">Leadership:</span> Vice Chair, IEEE KEC Student Branch · EPC Club Event Manager<br>
  • <span class="term-gold">Focus:</span> Edge AI, Embedded Systems, Robotics (ESP32-S3 / PyTorch / TFLite Micro)
`.trim(),
      cat: (arg) => {
        const target = (arg || '').toLowerCase().trim();
        if (target === 'cv' || target === 'resume') {
          return COMMANDS.cv();
        }
        if (target === 'bio' || target === 'about') {
          return COMMANDS.whoami();
        }
        if (target === 'spark') {
          return COMMANDS.run('spark');
        }
        if (target === 'skills') {
          return COMMANDS.skills();
        }
        return `<span class="term-gold">Usage: cat [cv | bio | spark | skills]</span>`;
      },
      ping: (arg) => {
        const target = (arg || 'aaradhyadt.github.io').trim();
        const latency = Math.floor(Math.random() * 18) + 12;
        return `<span class="term-green">PING ${escapeHtml(target)}: 64 bytes | time=${latency}ms | TTL=118 (status: OK)</span>`;
      },
      cls: () => COMMANDS.clear(),
      cv: () => {
        const a = document.createElement('a');
        a.href = 'assets/docs/AARADHYA_DEV_TAMRAKAR_CV.pdf';
        a.download = 'AARADHYA_DEV_TAMRAKAR_CV.pdf';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return '<span class="term-green">Triggered CV download (AARADHYA_DEV_TAMRAKAR_CV.pdf).</span>';
      },
      email: () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText('aaradhyadevtmr@gmail.com');
          return '<span class="term-green">Copied aaradhyadevtmr@gmail.com to clipboard!</span>';
        }
        return '<span class="term-gold">Email: aaradhyadevtmr@gmail.com</span>';
      },
      filter: (arg) => {
        const cat = (arg || '').toLowerCase().trim();
        const filterBtn = document.querySelector(`.proj-filter-btn[data-filter="${cat}"]`);
        if (filterBtn) {
          filterBtn.click();
          return `<span class="term-green">Applied filter: ${cat}</span>`;
        }
        if (location.pathname.includes('projects.html')) {
          return `<span class="term-gold">Available filters on projects.html: all, aiml, embedded, hardware, apps</span>`;
        }
        return `<span class="term-gold">Project filters are available on projects.html (type 'goto projects' first).</span>`;
      },
      radar: () => {
        if (typeof initSkillRadar === 'function') initSkillRadar();
        return '<span class="term-green">Interactive Skill Radar rendered.</span>';
      },
      graph: () => {
        if (typeof openGraphModal === 'function') {
          openGraphModal();
          return '<span class="term-green">Opening ExplainGit Knowledge Graph HUD...</span>';
        }
        return '<span class="term-gold">Graph visualizer module loading...</span>';
      },
      topology: () => COMMANDS.graph(),
      ast: () => COMMANDS.graph(),
      resume: () => {
        if (typeof openResumeGenerator === 'function') openResumeGenerator();
        return '<span class="term-green">Opening Tailored ATS Resume Generator modal...</span>';
      },
      stats: () => {
        const achvCount = typeof SEARCH_STATIC_INDEX !== 'undefined' ? (SEARCH_STATIC_INDEX.achievement || []).length : 39;
        const projCount = typeof SEARCH_STATIC_INDEX !== 'undefined' ? (SEARCH_STATIC_INDEX.project || []).length : 30;
        const currentVer = (typeof SITE_RELEASES !== 'undefined' && SITE_RELEASES[0]?.version) ? SITE_RELEASES[0].version : 'v54.5';
        return `
<span class="term-green">[ADT PORTFOLIO TELEMETRY ${currentVer}]</span><br>
  • <span class="term-gold">Published Projects:</span> ${projCount} verified repositories &amp; systems<br>
  • <span class="term-gold">Certifications:</span> ${achvCount} verifiable credentials<br>
  • <span class="term-gold">Journey Milestones:</span> 36 chronological commits<br>
  • <span class="term-gold">Architecture:</span> Modular ES6 + Zero-Build + Service Worker Cache-First<br>
  • <span class="term-gold">Target Hardware:</span> ESP32-S3, STM32, ARM Cortex-M, NVIDIA Edge AI
`.trim();
      },
      benchmark: () => {
        const totalNodes = document.getElementsByTagName('*').length;
        const scriptCount = document.scripts.length;
        const styleSheetCount = document.styleSheets.length;
        let memoryInfo = '';
        if (window.performance && performance.memory) {
          const usedMB = Math.round(performance.memory.usedJSHeapSize / (1024 * 1024));
          const totalMB = Math.round(performance.memory.totalJSHeapSize / (1024 * 1024));
          memoryInfo = ` | Heap: ${usedMB}MB / ${totalMB}MB`;
        }
        return `
<span class="term-green">[BROWSER RUNTIME BENCHMARK]</span><br>
  • <span class="term-cyan">DOM Elements:</span> ${totalNodes} nodes active<br>
  • <span class="term-cyan">Loaded Scripts:</span> ${scriptCount} scripts (${document.querySelectorAll('script[src*="modules/"]').length} modular)<br>
  • <span class="term-cyan">Active Stylesheets:</span> ${styleSheetCount} loaded<br>
  • <span class="term-cyan">Memory Footprint:</span> ${memoryInfo || 'Protected in current browser'}<br>
  • <span class="term-cyan">Hardware Concurrency:</span> ${navigator.hardwareConcurrency || 'N/A'} cores detected
`.trim();
      },
      run: (arg) => {
        const sub = (arg || '').toLowerCase().trim();
        const currentVer = (typeof SITE_RELEASES !== 'undefined' && SITE_RELEASES[0]?.version) ? SITE_RELEASES[0].version : 'v54.5';
        if (sub === 'spark') {
          return `
<span class="term-green">[SPARK TELEMETRY SIMULATOR ${currentVer}]</span><br>
  [00:00:01] Initializing ESP32 I2C bus @ 400kHz... <span class="term-cyan">OK</span><br>
  [00:00:02] Calibrating PPG Optical Pulse Sensor... <span class="term-cyan">STABLE</span><br>
  [00:00:03] Bio-Signal Filter: Bandpass 0.5Hz–5.0Hz... <span class="term-gold">ACTIVE</span><br>
  [00:00:04] Heart Rate BPM: 72 bpm | SpO2: 98% | BLE Status: <span class="term-green">CONNECTED</span>
`.trim();
        } else if (sub === 'gcsbr') {
          return `
<span class="term-green">[GCSBR PID &amp; SENSOR FUSION SIMULATOR ${currentVer}]</span><br>
  [00:00:01] MPU6050 Accelerometer/Gyro Init... <span class="term-cyan">OK</span><br>
  [00:00:02] Complementary Filter α=0.98, Tilt Angle: +0.12°... <span class="term-cyan">BALANCED</span><br>
  [00:00:03] PID Loop Output: Kp=14.5 Ki=0.8 Kd=1.2 -&gt; Motor PWM: <span class="term-gold">142 / 255</span>
`.trim();
        } else if (sub === 'prakopnet') {
          return `
<span class="term-green">[PRAKOPNET DISASTER TELEMETRY ENGINE ${currentVer}]</span><br>
  [00:00:01] LoRaWAN Mesh Network Node 0x7F... <span class="term-cyan">SYNCED</span><br>
  [00:00:02] Seismic Geophone Ingestion: 250 SPS... <span class="term-cyan">NOMINAL</span><br>
  [00:00:03] Flash Flood Level Sensor: Normal Basin Threshold... <span class="term-gold">MONITORING</span><br>
  [00:00:04] Real-Time WebSocket Broadcast to Emergency Dispatch: <span class="term-green">ONLINE</span>
`.trim();
        } else if (sub === 'pulselive') {
          return `
<span class="term-green">[PULSELIVE DIAGNOSTIC HUB SIMULATOR ${currentVer}]</span><br>
  [00:00:01] Audio DSP Pipeline: 44.1kHz 24-bit Stream Ingest... <span class="term-cyan">LOCKED</span><br>
  [00:00:02] Wavelet Transform Acoustic Feature Extractor... <span class="term-cyan">ACTIVE</span><br>
  [00:00:03] Inference Model: Edge-Optimized Neural Classifier... <span class="term-gold">RUNNING (1.4ms)</span><br>
  [00:00:04] Diagnostic Anomaly Score: 0.02 (Healthy)... <span class="term-green">VERIFIED</span>
`.trim();
        }
        return `<span class="term-gold">Usage: 'run spark', 'run gcsbr', 'run prakopnet', or 'run pulselive'</span>`;
      },
      glossary: (arg) => {
        const term = (arg || '').toLowerCase().trim();
        const dict = {
          spark: 'SPARK: Smart Pulse & Activity Recognition Kit — Biomedical wearable monitor.',
          gcsbr: 'GCSBR: Gesture-Controlled Self-Balancing Robot — 2-wheeled inverted pendulum PID robotics system.',
          pcb: 'PCB: Printed Circuit Board — Custom hardware layout designed in KiCAD.',
          adt: 'ADT: Aaradhya Dev Tamrakar — Personal brand identity & engineering portfolio.',
          fpga: 'FPGA: Field-Programmable Gate Array — Hardware logic synthesis.',
          eqtl: 'eQTL: Expression Quantitative Trait Loci — Genetic variant analysis in genomics.'
        };
        if (!term) {
          return `<span class="term-green">▶ Engineering Acronym Glossary:</span><br>` +
            Object.keys(dict).map(k => `  • <span class="term-gold">${k}</span>: ${dict[k]}`).join('<br>') +
            `<br><br>Type <span class="term-cyan">'glossary [term]'</span> for quick lookup.`;
        }
        if (dict[term]) {
          return `<span class="term-green">▶ ${dict[term]}</span>`;
        }
        return `<span class="term-gold">Term '${escapeHtml(term)}' not found. Available terms: ${Object.keys(dict).join(', ')}</span>`;
      },
      skills: () => `
<span class="term-green">▶ Core Technical Skillset:</span><br>
  • <span class="term-cyan">Embedded &amp; Firmware:</span> C, C++, Verilog, ARM Cortex-M, STM32, ESP32, KiCAD<br>
  • <span class="term-cyan">AI / ML &amp; Vision:</span> Python, PyTorch, OpenCV, TensorFlow, Signal Processing<br>
  • <span class="term-cyan">Web Systems:</span> JavaScript (ES6+), HTML5/CSS3, Node.js, WebSockets, REST APIs
`.trim(),
      projects: () => `
<span class="term-green">▶ Featured Projects:</span><br>
  1. <span class="term-gold">SPARK</span> — Two-Layer Fall Detection Wearable<br>
  2. <span class="term-gold">GCSBR</span> — Gesture-Controlled Self-Balancing Robot<br>
  3. <span class="term-gold">Pulse Live</span> — Real-Time Interactive Polling Platform<br>
  4. <span class="term-gold">PrakopNet</span> — Multi-Hazard Early Warning System<br>
  5. Type <span class="term-cyan">'2'</span> or navigate to <a href="projects.html" class="term-link">projects.html</a> for all 30 projects!
`.trim(),
      experience: () => `
<span class="term-green">▶ Engineering Leadership &amp; Experience:</span><br>
  • <span class="term-gold">Vice Chair</span> — IEEE KEC Student Branch (2025–2026)<br>
  • <span class="term-gold">Fuse AI Fellow</span> — Fusemachines (2026)<br>
  • <span class="term-gold">NSSR Fellow</span> — DataCamp (Cohort 2)<br>
  • <span class="term-gold">Event Manager</span> — Electronics &amp; Propagation Club (EPC)<br>
  • <span class="term-gold">Ambassador</span> — KEC Makerspace
`.trim(),
      achievements: () => `
<span class="term-green">▶ Achievements &amp; Credentials:</span><br>
  • 39 verified credentials spanning AWS, DataCamp, IEEE, and GNOME<br>
  • Full verification suite: <a href="achievements.html" class="term-link">achievements.html</a>
`.trim(),
      contact: () => `
<span class="term-green">▶ Connect Channels:</span><br>
  • Email:    <a href="mailto:aaradhyadevtmr@gmail.com" class="term-link">aaradhyadevtmr@gmail.com</a><br>
  • GitHub:   <a href="https://github.com/AaradhyaDT" target="_blank" rel="noopener noreferrer" class="term-link">github.com/AaradhyaDT</a><br>
  • LinkedIn: <a href="https://www.linkedin.com/in/aaradhya-dev-tamrakar" target="_blank" rel="noopener noreferrer" class="term-link">linkedin.com/in/aaradhya-dev-tamrakar</a>
`.trim(),
      share: () => {
        if (typeof shareContent === 'function') {
          shareContent({
            title: 'Aaradhya Dev Tamrakar — Portfolio',
            text: 'Explore the engineering portfolio, projects, and research of Aaradhya Dev Tamrakar.',
            url: window.location.origin + '/index.html'
          });
          return '<span class="term-green">Opened Web Share dialog / copied portfolio link to clipboard.</span>';
        }
        return '<span class="term-gold">Portfolio URL: https://aaradhyadt.github.io</span>';
      },
      history: () => {
        if (!history.length) return '<span class="term-gold">No command history recorded yet.</span>';
        return '<span class="term-green">▶ Recent Command History:</span><br>' +
          history.map((c, i) => `  <span class="term-gold">${i + 1}.</span> ${escapeHtml(c)}`).join('<br>');
      },
      shortcuts: () => {
        if (typeof openShortcutsModal === 'function') openShortcutsModal();
        return '<span class="term-green">Opening Keyboard Shortcuts Cheat Sheet HUD...</span>';
      },
      keys: () => {
        if (typeof openShortcutsModal === 'function') openShortcutsModal();
        return '<span class="term-green">Opening Keyboard Shortcuts Cheat Sheet HUD...</span>';
      },
      keymap: () => {
        if (typeof openShortcutsModal === 'function') openShortcutsModal();
        return '<span class="term-green">Opening Keyboard Shortcuts Cheat Sheet HUD...</span>';
      },
      hud: () => {
        if (typeof openShortcutsModal === 'function') openShortcutsModal();
        return '<span class="term-green">Opening Keyboard Shortcuts Cheat Sheet HUD...</span>';
      },
      whatsnew: () => {
        if (typeof openWhatsNewModal === 'function') openWhatsNewModal();
        return '<span class="term-green">Opening What\'s New modal...</span>';
      },
      healthcheck: () => {
        const checks = [];
        // 1. Module loading status
        const expectedModules = ['core.js', 'tour.js', 'cmdk.js', 'ui.js', 'access.js', 'audio.js', 'terminal.js', 'haptics.js'];
        const loadedScripts = Array.from(document.querySelectorAll('script[src*="modules/"]')).map(s => s.src.split('/').pop());
        const missingModules = expectedModules.filter(m => !loadedScripts.includes(m));
        if (missingModules.length === 0) {
          checks.push('<span class="term-green">\u2713</span> Modules: all ' + expectedModules.length + ' loaded');
        } else {
          checks.push('<span class="term-red">\u2717</span> Modules: missing ' + missingModules.join(', '));
        }
        // 2. Service Worker status
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          checks.push('<span class="term-green">\u2713</span> Service Worker: active');
        } else if ('serviceWorker' in navigator) {
          checks.push('<span class="term-gold">\u25CB</span> Service Worker: registered but no controller');
        } else {
          checks.push('<span class="term-red">\u2717</span> Service Worker: not supported');
        }
        // 3. Cache version
        if (typeof SITE_RELEASES !== 'undefined' && SITE_RELEASES[0]) {
          checks.push('<span class="term-green">\u2713</span> Site version: ' + SITE_RELEASES[0].version + ' (' + SITE_RELEASES[0].date + ')');
        } else {
          checks.push('<span class="term-red">\u2717</span> Site version: SITE_RELEASES not found');
        }
        // 4. Theme/Accent state
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        const accent = localStorage.getItem('adt-accent') || 'gold';
        checks.push('<span class="term-green">\u2713</span> Theme: ' + theme + ' / Accent: ' + accent);
        // 5. LocalStorage health
        try {
          const keys = Object.keys(localStorage).filter(k => k.startsWith('adt'));
          checks.push('<span class="term-green">\u2713</span> LocalStorage: ' + keys.length + ' adt-* keys');
        } catch (e) {
          checks.push('<span class="term-red">\u2717</span> LocalStorage: blocked or unavailable');
        }
        // 6. Performance metrics
        if (window.performance && performance.getEntriesByType) {
          const nav = performance.getEntriesByType('navigation')[0];
          if (nav) {
            const domReady = Math.round(nav.domContentLoadedEventEnd - nav.startTime);
            const fullLoad = Math.round(nav.loadEventEnd - nav.startTime);
            checks.push('<span class="term-green">\u2713</span> DOMContentLoaded: ' + domReady + 'ms / Full load: ' + fullLoad + 'ms');
          }
        }
        // 7. Page count via nav links
        const navLinks = document.querySelectorAll('.nav-links a');
        checks.push('<span class="term-green">\u2713</span> Navigation: ' + navLinks.length + ' nav links rendered');
        // 8. Search index
        if (typeof SEARCH_STATIC_INDEX !== 'undefined') {
          const achvCount = (SEARCH_STATIC_INDEX.achievement || []).length;
          const projCount = (SEARCH_STATIC_INDEX.project || []).length;
          checks.push('<span class="term-green">\u2713</span> Search index: ' + achvCount + ' achievements, ' + projCount + ' projects');
        } else {
          checks.push('<span class="term-red">\u2717</span> Search index: SEARCH_STATIC_INDEX not found');
        }
        const currentVer = (typeof SITE_RELEASES !== 'undefined' && SITE_RELEASES[0]?.version) ? SITE_RELEASES[0].version : 'v54.5';
        return `<span class="term-green">[SITE HEALTHCHECK ${currentVer}]</span><br>` + checks.map(c => '  ' + c).join('<br>');
      },
      sound: () => {
        if (typeof toggleAudioCues === 'function') toggleAudioCues();
        return '<span class="term-green">Audio micro-sounds toggled!</span>';
      },
      audio: () => {
        if (typeof toggleAudioCues === 'function') toggleAudioCues();
        return '<span class="term-green">Audio micro-sounds toggled!</span>';
      },
      notify: async () => {
        if (typeof requestNotificationPermission === 'function') {
          const res = await requestNotificationPermission();
          return `<span class="term-green">Notification permission status: ${res}</span>`;
        }
        return '<span class="term-gold">Notification API not available in this browser.</span>';
      },
      notifications: async () => {
        if (typeof requestNotificationPermission === 'function') {
          const res = await requestNotificationPermission();
          return `<span class="term-green">Notification permission status: ${res}</span>`;
        }
        return '<span class="term-gold">Notification API not available in this browser.</span>';
      },
      tour: () => {
        if (typeof startTour === 'function') startTour();
        return '<span class="term-green">Starting guided site tour...</span>';
      },
      theme: () => {
        if (typeof toggleTheme === 'function') toggleTheme();
        return '<span class="term-green">Color theme toggled!</span>';
      },
      accent: (arg) => {
        const val = (arg || '').toLowerCase().trim();
        const themes = ['gold', 'emerald', 'violet', 'cyan', 'ruby', 'prism'];
        if (!val) {
          const current = localStorage.getItem('adt-accent') || 'gold';
          return `<span class="term-green">▶ Available Accent Themes (Easter Egg):</span><br>` +
            themes.map(t => `  • <span class="term-gold">${t}</span>${t === current ? ' <span class="term-cyan">(active)</span>' : ''}`).join('<br>') +
            `<br><br>Type <span class="term-cyan">'accent [theme]'</span> (e.g. <span class="term-gold">accent emerald</span>, <span class="term-gold">accent violet</span>) to activate!`;
        }
        if (themes.includes(val)) {
          if (typeof applyAccent === 'function') applyAccent(val);
          return `<span class="term-green">Accent color theme updated to: <strong>${escapeHtml(val)}</strong></span>`;
        }
        return `<span class="term-gold">Unknown accent: '${escapeHtml(val)}'. Available options: ${themes.join(', ')}</span>`;
      },
      color: (arg) => COMMANDS.accent(arg),
      clear: () => {
        body.innerHTML = '';
        return '';
      },
      matrix: () => {
        const rows = 6, cols = 36, chars = '01';
        const randRow = () => {
          let row = '';
          for (let j = 0; j < cols; j++) row += chars[Math.floor(Math.random() * chars.length)];
          return row;
        };
        const id = 'matrix-rain-' + Date.now();
        const rowsHtml = Array.from({ length: rows }, (_, i) =>
          `<span class="term-green" style="opacity:${(i + 1) / rows};display:block;">${randRow()}</span>`
        ).join('');
        // Deferred so the container exists in the DOM (appendOutput runs
        // synchronously right after this returns) before we animate it.
        setTimeout(() => {
          const el = document.getElementById(id);
          if (!el) return;
          const spans = el.querySelectorAll('span');
          let ticks = 0;
          const iv = setInterval(() => {
            spans.forEach(s => { s.textContent = randRow(); });
            if (++ticks > 20) clearInterval(iv);
          }, 90);
        }, 0);
        return `<div id="${id}">${rowsHtml}</div>`;
      }
    };

    function appendOutput(cmd, res) {
      const line = document.createElement('div');
      line.className = 'term-line';
      line.innerHTML = `
        <div class="term-cmd-prompt"><span class="term-user">visitor@adt</span>:<span class="term-path">~</span>$ ${escapeHtml(cmd)}</div>
        ${res ? `<div class="term-cmd-res">${res}</div>` : ''}
      `;
      body.appendChild(line);
      requestAnimationFrame(() => { body.scrollTop = body.scrollHeight; });
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function execCommand(rawCmd) {
      const trimmed = rawCmd.trim();
      if (!trimmed) return;
      if (typeof triggerHapticFeedback === 'function') triggerHapticFeedback(10);
      
      // Avoid duplicate consecutive entries in history
      if (history[history.length - 1] !== rawCmd) {
        history.push(rawCmd);
        if (history.length > 50) history.shift();
        try {
          localStorage.setItem('adt_terminal_history', JSON.stringify(history));
        } catch (e) {}
      }
      historyIndex = history.length;
      const parts = trimmed.split(/\s+/);
      const baseCmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ');

      if (baseCmd === 'clear') {
        COMMANDS.clear();
        return;
      }
      const handler = COMMANDS[baseCmd];
      if (handler) {
        try {
          appendOutput(rawCmd, handler(arg));
        } catch (err) {
          appendOutput(rawCmd, `<span class="term-red">Error executing '${escapeHtml(baseCmd)}': ${escapeHtml(err.message || String(err))}</span>`);
        }
      } else {
        appendOutput(rawCmd, `<span class="term-red">Command not found: '${escapeHtml(trimmed)}'. Type <span class="term-gold">'help'</span> for a list of available commands.</span>`);
      }
    }

    input.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const raw = input.value;
        const trimmed = raw.trimStart();
        if (!trimmed) return;
        const parts = trimmed.split(/\s+/);
        const allCmds = Object.keys(COMMANDS);

        if (parts.length === 1 && !raw.endsWith(' ')) {
          const prefix = parts[0].toLowerCase();
          const matches = allCmds.filter(c => c.startsWith(prefix));
          if (matches.length === 1) {
            input.value = matches[0] + ' ';
          } else if (matches.length > 1) {
            appendOutput(raw, `<span class="term-gold">Suggestions:</span> ${matches.map(m => `<span class="term-cyan">${m}</span>`).join('  ')}`);
          }
        } else if (parts.length >= 1) {
          const baseCmd = parts[0].toLowerCase();
          const subPrefix = (parts.length > 1 ? parts[1] : '').toLowerCase();
          const SUB_OPTIONS = {
            goto: ['home', 'projects', 'experience', 'achievements', 'about', 'journey', 'contact', 'terms', 'privacy'],
            filter: ['all', 'aiml', 'embedded', 'hardware', 'apps'],
            run: ['spark', 'gcsbr', 'prakopnet', 'pulselive'],
            cat: ['cv', 'bio', 'spark', 'skills'],
            accent: ['gold', 'emerald', 'violet', 'cyan', 'ruby', 'prism'],
            color: ['gold', 'emerald', 'violet', 'cyan', 'ruby', 'prism']
          };
          if (SUB_OPTIONS[baseCmd]) {
            const matches = SUB_OPTIONS[baseCmd].filter(s => s.startsWith(subPrefix));
            if (matches.length === 1) {
              input.value = `${baseCmd} ${matches[0]}`;
            } else if (matches.length > 1) {
              appendOutput(raw, `<span class="term-gold">Subcommands:</span> ${matches.map(m => `<span class="term-cyan">${m}</span>`).join('  ')}`);
            }
          }
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const val = input.value;
        input.value = '';
        execCommand(val);
      } else if (e.key === 'ArrowUp') {
        if (history.length > 0) {
          e.preventDefault();
          if (historyIndex > 0) historyIndex--;
          input.value = history[historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (history.length > 0) {
          e.preventDefault();
          if (historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex] || '';
          } else {
            historyIndex = history.length;
            input.value = '';
          }
        }
      }
    });

    quickBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        triggerHapticFeedback(10);
        const cmd = btn.dataset.cmd;
        if (cmd) execCommand(cmd);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();