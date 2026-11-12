/* ── Global search index (each page appends its entries) ──── */

// Usage in page: SEARCH_INDEX.push(...entries)

window.SEARCH_INDEX = window.SEARCH_INDEX || [];



const SEARCH_STATIC_INDEX = {
  achievement: [
  {
    "type": "achievement",
    "title": "JavaScript Bootcamp",
    "meta": "KEC IT Club · 2023",
    "href": "achievements.html#achv-0",
    "text": "kec it club javascript bootcamp 2023"
  },
  {
    "type": "achievement",
    "title": "Session on Git & GitHub",
    "meta": "KEC IT Club · Nov 2024",
    "href": "achievements.html#achv-1",
    "text": "kec it club session on git & github nov 2024"
  },
  {
    "type": "achievement",
    "title": "Workshop on Linux and Open Source Contribution",
    "meta": "GNOME Nepal & KEC IT Club · Nov 2024",
    "href": "achievements.html#achv-2",
    "text": "gnome nepal & kec it club workshop on linux and open source contribution nov 2024"
  },
  {
    "type": "achievement",
    "title": "HTML & CSS Workshop — Design, Code & Launch via GitHub Pages",
    "meta": "Microsoft Learn Student Ambassador · May 2022",
    "href": "achievements.html#achv-3",
    "text": "microsoft learn student ambassador html & css workshop — design, code & launch via github pages may 2022"
  },
  {
    "type": "achievement",
    "title": "PreXtreme Competitive Programming Workshop",
    "meta": "IEEE · Jul 2025",
    "href": "achievements.html#achv-4",
    "text": "ieee prextreme competitive programming workshop jul 2025"
  },
  {
    "type": "achievement",
    "title": "AWS Fundamentals Workshop",
    "meta": "KEC IT Club · AWS Cloud Club Nepal · Jul 2025",
    "href": "achievements.html#achv-5",
    "text": "kec it club · aws cloud club nepal aws fundamentals workshop jul 2025"
  },
  {
    "type": "achievement",
    "title": "Agile Workshop",
    "meta": "IEEE · Jul 2025",
    "href": "achievements.html#achv-6",
    "text": "ieee agile workshop jul 2025"
  },
  {
    "type": "achievement",
    "title": "PCB Design & Fabrication Workshop",
    "meta": "Nepal Students' Union KEC · KEC Robotics Club · Jul 2025",
    "href": "achievements.html#achv-7",
    "text": "nepal students' union kec · kec robotics club pcb design & fabrication workshop jul 2025"
  },
  {
    "type": "achievement",
    "title": "Mentor — Electronics For All Workshop",
    "meta": "IEEE · Jul 2025",
    "href": "achievements.html#achv-8",
    "text": "ieee mentor — electronics for all workshop jul 2025"
  },
  {
    "type": "achievement",
    "title": "How Hackers Bypass Security: A Beginner's Guide",
    "meta": "Offenso Hackers Academy · Jul 2025",
    "href": "achievements.html#achv-9",
    "text": "offenso hackers academy how hackers bypass security: a beginner's guide jul 2025"
  },
  {
    "type": "achievement",
    "title": "IEEE Day 2025 — Organizer",
    "meta": "IEEE · Oct 2025",
    "href": "achievements.html#achv-10",
    "text": "ieee ieee day 2025 — organizer oct 2025"
  },
  {
    "type": "achievement",
    "title": "IEEEXtreme 19.0",
    "meta": "IEEE · Oct 2025",
    "href": "achievements.html#achv-11",
    "text": "ieee ieeextreme 19.0 oct 2025"
  },
  {
    "type": "achievement",
    "title": "IEEE WIE LaTeX Training Program",
    "meta": "IEEE · May 2026",
    "href": "achievements.html#achv-12",
    "text": "ieee ieee wie latex training program may 2026"
  },
  {
    "type": "achievement",
    "title": "Prompt Engineering Fundamentals",
    "meta": "TechAxis · May 2026",
    "href": "achievements.html#achv-13",
    "text": "techaxis prompt engineering fundamentals may 2026"
  },
  {
    "type": "achievement",
    "title": "IEEE SPAx — Engineer Your Profile",
    "meta": "IEEE · May 2026",
    "href": "achievements.html#achv-14",
    "text": "ieee ieee spax — engineer your profile may 2026"
  },
  {
    "type": "achievement",
    "title": "NepaTronix Drone Training Program",
    "meta": "Drone Operator Training · May 2026",
    "href": "achievements.html#achv-15",
    "text": "drone operator training nepatronix drone training program may 2026"
  },
  {
    "type": "achievement",
    "title": "DataCamp — CPE Credit Certificates",
    "meta": "DataCamp · May 2026 · Jul 2026",
    "href": "achievements.html#achv-16",
    "text": "datacamp datacamp — cpe credit certificates may 2026 · jul 2026"
  },
  {
    "type": "achievement",
    "title": "Datacamp Projects",
    "meta": "DataCamp · May 2026 · Jul 2026",
    "href": "achievements.html#achv-17",
    "text": "datacamp datacamp projects may 2026 · jul 2026"
  },
  {
    "type": "achievement",
    "title": "IEEE Conference Leadership Workshop 2026",
    "meta": "IEEE · 30–31 Jan 2026",
    "href": "achievements.html#achv-18",
    "text": "ieee ieee conference leadership workshop 2026 30–31 jan 2026"
  },
  {
    "type": "achievement",
    "title": "AI Fluency: Framework & Foundations",
    "meta": "ANTHROPIC · Jul 2026",
    "href": "achievements.html#achv-19",
    "text": "anthropic ai fluency: framework & foundations jul 2026"
  },
  {
    "type": "achievement",
    "title": "SimOps Certifications",
    "meta": "SimOps · Jul 2026",
    "href": "achievements.html#achv-20",
    "text": "simops simops certifications jul 2026"
  },
  {
    "type": "achievement",
    "title": "Sports Week — Volunteer Organizer",
    "meta": "Kathmandu Engineering College · 2026",
    "href": "achievements.html#achv-21",
    "text": "kathmandu engineering college sports week — volunteer organizer 2026"
  },
  {
    "type": "achievement",
    "title": "Dristi 3.0 — Volunteer Organizer",
    "meta": "Kathmandu Engineering College · 2025",
    "href": "achievements.html#achv-22",
    "text": "kathmandu engineering college dristi 3.0 — volunteer organizer 2025"
  },
  {
    "type": "achievement",
    "title": "Mr. KEC 2025",
    "meta": "Kathmandu Engineering College · 2025",
    "href": "achievements.html#achv-23",
    "text": "kathmandu engineering college mr. kec 2025 2025"
  },
  {
    "type": "achievement",
    "title": "Proteus Workshop",
    "meta": "KEC Electrical Club · 2024",
    "href": "achievements.html#achv-24",
    "text": "kec electrical club proteus workshop 2024"
  },
  {
    "type": "achievement",
    "title": "AutoCAD Workshop",
    "meta": "CESA (Civil Engineering Student's Association) · 2025",
    "href": "achievements.html#achv-25",
    "text": "cesa (civil engineering student's association) autocad workshop 2025"
  },
  {
    "type": "achievement",
    "title": "Machine Learning Hackathon",
    "meta": "WiseBee · 2 Dec 2023",
    "href": "achievements.html#achv-26",
    "text": "wisebee machine learning hackathon 2 dec 2023"
  },
  {
    "type": "achievement",
    "title": "EU AI Act Literacy — Specialist Certification",
    "meta": "DataCamp · Jul 2026",
    "href": "achievements.html#achv-28",
    "text": "datacamp eu ai act literacy — specialist certification jul 2026"
  },
  {
    "type": "achievement",
    "title": "Introduction to Security in the World of AI",
    "meta": "DataCamp · Jul 2026",
    "href": "achievements.html#achv-31",
    "text": "datacamp introduction to security in the world of ai jul 2026"
  },
  {
    "type": "achievement",
    "title": "Introduction to Python",
    "meta": "DataCamp · May 2026",
    "href": "achievements.html#achv-32",
    "text": "datacamp introduction to python may 2026"
  },
  {
    "type": "achievement",
    "title": "Introduction to Git",
    "meta": "DataCamp · Jul 2026",
    "href": "achievements.html#achv-33",
    "text": "datacamp introduction to git jul 2026"
  },
  {
    "type": "achievement",
    "title": "AI-Assisted Coding for Developers",
    "meta": "DataCamp · Jul 2026",
    "href": "achievements.html#achv-34",
    "text": "datacamp ai-assisted coding for developers jul 2026"
  },
  {
    "type": "achievement",
    "title": "Introduction to Claude Cowork",
    "meta": "ANTHROPIC · Jul 2026",
    "href": "achievements.html#achv-35",
    "text": "anthropic introduction to claude cowork jul 2026"
  },
  {
    "type": "achievement",
    "title": "NEC License Exam Mock Test (BCT)",
    "meta": "Nepal Engineering Council (NEC) · 10 May 2026",
    "href": "achievements.html#achv-36",
    "text": "nepal engineering council (nec) nec license exam mock test (bct) scored 97/100 on the computer engineering (bct) format licensure preparation assessment. 10 may 2026"
  },
  {
    "type": "achievement",
    "title": "Laser Safety Awareness Training",
    "meta": "xTool · KEC Makerspace · 19 Aug 2026",
    "href": "achievements.html#achv-37",
    "text": "xtool · kec makerspace laser safety awareness training 19 aug 2026"
  },
  {
    "type": "achievement",
    "title": "Printer Maintenance Certification",
    "meta": "xTool · KEC Makerspace · 19 Aug 2026",
    "href": "achievements.html#achv-38",
    "text": "xtool · kec makerspace printer maintenance certification 19 aug 2026"
  },
  {
    "type": "achievement",
    "title": "KEC Music Club — Performer",
    "meta": "KEC Music Club · 2023–2026",
    "href": "achievements.html#achv-27",
    "text": "kec music club kec music club — performer performed 4+ times per year for 3+ years at kec music club events. 2023–2026"
  },
  {
    "type": "achievement",
    "title": "Mentor — Basic Electronics Workshop",
    "meta": "Electronic Project Club (EPC) · 7 Dec 2025",
    "href": "achievements.html#achv-29",
    "text": "electronic project club (epc) mentor — basic electronics workshop mentored 1st and 2nd year students through building simple circuits and checking outputs step by step. 7 dec 2025"
  },
  {
    "type": "achievement",
    "title": "+2 Students Orientation — Host",
    "meta": "IEEE · 7 Jun 2026",
    "href": "achievements.html#achv-30",
    "text": "ieee +2 students orientation — host hosted +2 students at the ieee kec ktm student branch with interactive quiz rounds showcasing branch activities. 7 jun 2026"
  }

  ],
  project: [
  {
    "type": "project",
    "title": "STRANGLER-IPU — Ingress Processing Unit Architecture",
    "meta": "Active Research · Computer Architecture, Systems Architecture, 6G Ingress",
    "href": "projects.html#p-032",
    "text": "strangler-ipu — ingress processing unit architecture the problem high-volume ingest can spend host memory bandwidth moving data that later processing discards. research work developed the strangler-ipu architecture proposal and python models comparing host pipelines with processing near the ingress boundary. engineering focus vary input rate, useful-data fraction, and interconnect capacity to identify when early reduction could offset accelerator overhead. current boundary architecture research and numerical modelling. results depend on the model assumptions; silicon, energy use, and physical interconnect performance remain unmeasured. computer architecture systems architecture 6g ingress cxl 3.0/4.0 discrete-event sim simpy near-memory computing latex active research"
  },
  {
    "type": "project",
    "title": "BiasAperture — Vision Fairness & Bias Audit",
    "meta": "In Progress · AIF360, Fairlearn, FairFace",
    "href": "projects.html#p-025",
    "text": "biasaperture — vision fairness & bias audit the problem aggregate accuracy can hide demographic performance gaps in facial-analysis models. our work co-developed with tisha manandhar as our fuse ai fellowship capstone. the pipeline ingests predictions and demographic metadata, compares binary group-rate metrics through aif360 and fairlearn, and generates standalone audit reports. engineering focus consistent metric definitions, cohort support checks, uncertainty reporting, and traceable evaluation outputs. backend agreement checks point estimates; it does not independently validate the shared statistical code. current boundary a diagnostic tool, not a debiasing method or a certification of legal compliance. statistical validation and matched model comparisons remain areas of active work. aif360 fairlearn fairface utkface computer vision bias auditing statistical testing shap eu ai act nist rmf html/jinja2 in progress"
  },
  {
    "type": "project",
    "title": "SPARK — Two-Layer Fall Detection Wearable",
    "meta": "In Progress · ESP32-S3, MPU6050, TFLite Micro",
    "href": "projects.html#p-018",
    "text": "spark — two-layer fall detection wearable the problem fall-detection systems need to connect sensor data, model decisions, and useful incident records under embedded resource constraints. my contribution project lead for ml modelling, gateway processing, and explainability in a four-person team. firmware, hardware, and display-client work have separate owners. engineering focus offline sisfall model development and quantization, plus gateway parsing, storage, reporting, and api modules. the proposed wearable pairs a threshold gate with a tflite micro classifier. current boundary software and offline artifacts are available. hardware procurement, physical on-device evaluation, ble integration, and volunteer cohort studies remain pending. offline benchmark results are not clinical validation. esp32-s3 mpu6050 tflite micro int8 quantization 1d cnn shap fastapi latex in progress"
  },
  {
    "type": "project",
    "title": "Gesture-Controlled Self-Balancing Robot",
    "meta": "Arduino, HC-05, MPU-6050",
    "href": "projects.html#p-001",
    "text": "gesture-controlled self-balancing robot the problem a two-wheeled robot must maintain balance while responding to remote commands. my contribution worked on pid stabilization and an android gesture-control application using mediapipe, camerax, and hc-05 bluetooth. system the robot combines imu feedback, motor actuation, and real-time hand tracking. the video below shows the hardware demonstration. scope an academic robotics project. the demonstration illustrates the integrated system; it is not a standardized robustness benchmark. arduino hc-05 mpu-6050 nema-17 mediapipe pid matlab"
  },
  {
    "type": "project",
    "title": "PrakopNet — Multi-Hazard Early Warning System",
    "meta": "Archived · ESP32, Wireless Mesh, Raspberry Pi 4B",
    "href": "projects.html#p-012",
    "text": "prakopnet — multi-hazard early warning system the problem remote hazard monitoring needs a way to collect sensor readings where power and connectivity are limited. proposed approach explored a solar-powered sensor-mesh concept with esp32 nodes and a raspberry pi gateway for monitoring hazards in nepal. engineering focus the concept considered local sensing, wireless aggregation, and gateway processing as separate parts of the system. current boundary archived before the proposal stage. the project did not reach an implemented monitoring system; the later spark project became the active hardware effort. esp32 wireless mesh raspberry pi 4b tflite micro lstm gps fastapi edge ai archived"
  },
  {
    "type": "project",
    "title": "Edge AI Stability Detection System",
    "meta": "Python, scikit-learn, RandomForest",
    "href": "projects.html#p-007",
    "text": "edge ai stability detection system the problem a balancing platform needs to distinguish stable motion from conditions that require corrective action. what i built developed a random forest stability classifier using simulated imu data, with a fastapi endpoint and an exported joblib model. engineering focus separate the sensor-feature classifier from the api so a robotics controller can consume predictions through a defined interface. current boundary the recorded evaluation uses simulated sensor data. its accuracy does not establish performance on physical imu traces or prove closed-loop robot stability. python scikit-learn randomforest fastapi joblib imu edge ai"
  },
  {
    "type": "project",
    "title": "Antenna Lab Data Analysis",
    "meta": "Python, Pandas, NumPy",
    "href": "projects.html#p-013",
    "text": "antenna lab data analysis the problem antenna measurements stored in spreadsheets need a common representation before radiation patterns can be compared. what i built prepared a python analysis workflow that reads laboratory excel measurements, interpolates sampled values, and produces polar plots. engineering focus use scipy interpolation and matplotlib to make the measured angular response easier to inspect. current boundary communication and rf coursework. interpolation fills the plotted curve between samples; it does not add new physical measurements or establish antenna calibration. python pandas numpy scipy matplotlib polar plot"
  },
  {
    "type": "project",
    "title": "Custom Processor FSM Design",
    "meta": "VHDL, Vivado, FSM",
    "href": "projects.html#p-014",
    "text": "custom processor fsm design the problem arithmetic operations need a defined sequence of register transfers and control signals in a custom processor. what i built implemented a vhdl datapath and finite-state controller for gcd and exponentiation operations as embedded systems coursework. engineering focus separate datapath operations from state transitions, then inspect the resulting behaviour in vivado simulation. current boundary the project record documents simulation in vivado 2023.2. it does not establish operation on an fpga board or measured hardware timing. vhdl vivado fsm datapath fpga"
  },
  {
    "type": "project",
    "title": "Fleet Orchestrator — AI Workflow Coordination",
    "meta": "Python 3.14, Multi-Agent Swarm, FastAPI",
    "href": "projects.html#p-040",
    "text": "fleet orchestrator — ai workflow coordination the problem multi-step ai work needs task coordination, provider adapters, and failure handling beyond a sequence of chat prompts. what i built a python and fastapi coordination system with worker adapters, task scheduling, status inspection, and an mcp interface. engineering focus keep task state outside individual workers, route work through explicit interfaces, and use local routing and deterministic tooling where another model call is unnecessary. current boundary provider availability, quotas, and credentials affect execution. configured adapters and passing tests do not establish a continuously running autonomous fleet or measured token savings. python 3.14 multi-agent swarm fastapi workflow automation google colab"
  },
  {
    "type": "project",
    "title": "Agent-Customization-Sync — Cross-IDE Configuration Snapshot & Transpilation",
    "meta": "Python, MCP, Cross-IDE Tooling",
    "href": "projects.html#p-041",
    "text": "agent-customization-sync — cross-ide configuration snapshot & transpilation the problem agent instructions and mcp configurations drift when the same development setup is maintained across multiple ides. what i built a configuration tool for snapshots, guarded restore, rules transpilation, and cross-ide drift audits. engineering focus sha-256 manifests check file integrity; shared skill links reduce duplication. instruction-overhead auditing helps inspect how much static context a configuration consumes. why it matters recurring setup becomes a repeatable local operation. the configuration audit does not claim to measure total runtime tokens or model quality. python mcp cross-ide tooling sha-256 windows"
  },
  {
    "type": "project",
    "title": "Claude Desktop Multi-Profile & Distributed Service Provisioning (DSP) Fabric",
    "meta": "DSP Fabric, FastAPI, SQLite WAL",
    "href": "projects.html#p-023",
    "text": "claude desktop multi-profile & distributed service provisioning (dsp) fabric the problem different ai-assisted tasks need separate desktop profiles and consistent service configuration. what i built multi-profile claude desktop tooling and service-provisioning workflows for organizing ai-assisted development environments. engineering focus reusable profile setup and service interfaces, with orchestration components kept distinct from a single conversation. scope developer tooling for a personal workflow. a configured profile is not evidence of unattended task completion. dsp fabric fastapi sqlite wal atomic leasing self-healing fastmcp (44 tools) cdp bridge powershell 7"
  },
  {
    "type": "project",
    "title": "GitHub Pilot — Autonomous Multi-Account Fleet Auditor & Navigator",
    "meta": "Python 3.10+, Typer CLI, HTTP/2 Async",
    "href": "projects.html#p-034",
    "text": "github pilot — autonomous multi-account fleet auditor & navigator the problem checking repository health across github accounts can require repeated api requests and manual inspection of ci and commit history. what i built built python tooling for repository audits, account configuration, commit digests, and generated profile statistics. engineering focus fetch and aggregate routine repository data locally, then pass a compact result to an assistant when interpretation is needed. current boundary github permissions, api limits, and cached data affect the result. local aggregation avoids model calls for those operations; total token savings have not been benchmarked. python 3.10+ typer cli http/2 async token-zero developer tooling multi-account fleet auditing rich ui"
  },
  {
    "type": "project",
    "title": "Windows Pilot — Semantic UIA & MCP Desktop Automation Engine",
    "meta": "Python 3.10+, Win32 API, UI Automation COM",
    "href": "projects.html#p-033",
    "text": "windows pilot — semantic uia & mcp desktop automation engine the problem desktop automation tied to pixel coordinates can break when a window moves or display scaling changes. what i built built a windows automation toolkit that finds controls through ui automation and exposes operations through python, cli, and mcp interfaces. engineering focus use semantic selectors for control discovery and win32 operations for window focus, clipboard input, and screen capture. current boundary windows-specific tooling. automation depends on the accessibility information an application exposes, its window state, and the permissions of the running process. python 3.10+ win32 api ui automation com mcp server desktop automation virtual desktops windows 11 actionchain"
  },
  {
    "type": "project",
    "title": "Nexus — Personal AI Operating System",
    "meta": "In Progress · React, Vite, FastAPI",
    "href": "projects.html#p-010",
    "text": "nexus — personal ai operating system the problem project notes and model responses become difficult to follow when they are spread across unrelated browser sessions. what i built built a react and fastapi workspace that stores project history in sqlite and displays responses from configured model providers side by side. engineering focus use sqlite fts5 to retrieve project notes and attach relevant context to a request while keeping histories scoped to their project. current boundary a local application with external model integrations. provider credentials, model availability, and api failures still determine whether a request completes. react vite fastapi sqlite fts5 groq gemini python in progress"
  },
  {
    "type": "project",
    "title": "Super-NLM — Multi-Account NotebookLM Hub & MCP Server",
    "meta": "In Progress · Python, MCP, NotebookLM",
    "href": "projects.html#p-031",
    "text": "super-nlm — multi-account notebooklm hub & mcp server the problem notebook collections spread across accounts are difficult to search, query, and maintain from one workflow. what i built built a notebooklm dashboard and mcp server that aggregate notebook listings, support notebook queries, and manage scheduled artifact work. engineering focus cache listings, retain account ownership, and track job state so repeated navigation and scheduling do not require another planning prompt. current boundary notebook access depends on authentication, sharing permissions, provider quotas, and upstream service behaviour. cached listings can lag behind the live account state. python mcp notebooklm multi-account rate-limit routing agentic round-robin fastapi in progress"
  },
  {
    "type": "project",
    "title": "Nepali OCR AI — Vision OCR, Varnavinyas Grammar & Bi-Directional Transcoder",
    "meta": "Python 3.11, FastMCP, Devanagari OCR",
    "href": "projects.html#p-038",
    "text": "nepali ocr ai — vision ocr, varnavinyas grammar & bi-directional transcoder the problem scanned nepali text and legacy preeti encoding need different processing before they can be searched or edited as unicode. what i built built a nepali document toolkit with ocr processing, spelling-rule checks, preeti/unicode conversion, and word document repair interfaces. engineering focus keep image recognition, character-order conversion, and text correction separate so each transformation can be inspected. current boundary ocr depends on scan quality and the selected recognition backend. font conversion and spelling rules do not establish document-level accuracy or guarantee correct nepali text. python 3.11 fastmcp devanagari ocr varnavinyas engine preeti unicode python-docx"
  },
  {
    "type": "project",
    "title": "IEEE-Xtreme Algorithmic Intelligence Archive — 662-Task Corpus & Xtreme-Bench",
    "meta": "Python 3.14, Hugging Face, LLM Benchmark",
    "href": "projects.html#p-039",
    "text": "ieee-xtreme algorithmic intelligence archive — 662-task corpus & xtreme-bench the problem programming problems need statements, constraints, and reference solutions in a form that can be searched and evaluated consistently. what i built developed a competitive-programming archive and evaluation tooling for collecting problem material and organizing reference solutions. engineering focus retain mathematical notation, separate statements from solutions, and use local indexing for retrieval before model-assisted analysis. current boundary archive coverage and solution validation vary by task. a stored solution or an exported benchmark entry does not by itself establish an accepted submission or a measured model score. python 3.14 hugging face llm benchmark competitive programming sqlite fts5 notebooklm rag"
  },
  {
    "type": "project",
    "title": "LocalSend MCP — Zero-Cloud LAN P2P File & Clipboard Transfer Bridge",
    "meta": "Node.js ESM, @modelcontextprotocol/sdk, LocalSend v2.1",
    "href": "projects.html#p-035",
    "text": "localsend mcp — zero-cloud lan p2p file & clipboard transfer bridge the problem an assistant may need to move a generated file to a nearby device without using a cloud storage service. what i built built an mcp server around the localsend protocol for lan peer discovery and file, folder, or text transfer. engineering focus preserve relative paths during folder transfer and expose discovery and transfer operations through explicit tool requests. current boundary transfers require reachable peers, compatible localsend clients, and recipient acceptance where required. firewalls and network isolation can prevent discovery or delivery. node.js esm @modelcontextprotocol/sdk localsend v2.1 mtls udp multicast p2p transfer"
  },
  {
    "type": "project",
    "title": "Google Classroom MCP — Academic Coursework & Due Date Automation Bridge",
    "meta": "Node.js ESM, MCP SDK, Google Classroom API",
    "href": "projects.html#p-036",
    "text": "google classroom mcp — academic coursework & due date automation bridge the problem coursework context is spread across course streams, assignments, submissions, and attached resources. what i built built a node.js mcp bridge that maps assistant tool requests to google classroom api operations using oauth authentication. engineering focus keep course and coursework identifiers explicit, refresh authorized tokens, and return structured results for downstream workflows. current boundary available operations depend on account permissions and api quotas. the current local course-copy checks have unresolved failures, so that path still needs repair and end-to-end verification. node.js esm mcp sdk google classroom api oauth 2.0 coursework automation drive integration"
  },
  {
    "type": "project",
    "title": "Typora MCP Server — Native Markdown Desktop Orchestration & Ingestion Engine",
    "meta": "Node.js ESM, TypeScript, MCP SDK",
    "href": "projects.html#p-037",
    "text": "typora mcp server — native markdown desktop orchestration & ingestion engine the problem a writing workflow needs to connect markdown files, editor state, and exported documents without repeatedly locating them by hand. what i built built a windows mcp server for inspecting typora processes, opening documents, reading recovery drafts, and managing themes and html exports. engineering focus use process inspection and typora's local files to expose document state through defined tool operations. current boundary the integration depends on typora's installation and local file formats. process discovery does not guarantee that a document is saved or that every editor action can be automated. node.js esm typescript mcp sdk win32 cim typora engine markdown tooling"
  },
  {
    "type": "project",
    "title": "Headless LocalSend Substrate — Direct P2P Wireless & ADB Transport",
    "meta": "Python 3.11, LocalSend v2.1, mTLS",
    "href": "projects.html#p-048",
    "text": "headless localsend substrate — direct p2p wireless & adb transport the problem cross-device transfers need silent background operations without gui interruption or external cloud dependency. what i built built a zero-gui headless localsend v2.1 daemon with in-memory self-signed tls certs, pinned sha-256 fingerprints, silent windows hkcu run startup, and hardware-accelerated adb fallback (45+ mb/s). engineering focus eliminate gui popups and manual confirmation overhead through background certificate pinning and automatic explorer context menu dispatch. current boundary hardware adb push requires usb debugging permissions; wireless fallback relies on local subnet wi-fi routing. python 3.11 localsend v2.1 mtls p2p networking adb push windows 11"
  },
  {
    "type": "project",
    "title": "Codon Stream — 500-Gene CP Algorithmic Library",
    "meta": "C++20, Python 3.11, Algorithms",
    "href": "projects.html#p-047",
    "text": "codon stream — 500-gene cp algorithmic library the problem competitive programming requires reliable, pre-verified algorithmic primitives and contest templates under strict memory and runtime limits. what i built built a hardened 500-gene repository of algorithmic primitives, template implementations, and ieeextreme solutions across 6 architectural tiers. engineering focus automated schema validation, empirical fitness benchmarking, big-o complexity profiling, and a 2-layer printable contest desk reference. current boundary primitives are verified against curated test suites and regulation constraints; contest performance remains bounded by problem-specific adaptation. c++20 python 3.11 algorithms ieeextreme automated testing"
  },
  {
    "type": "project",
    "title": "Alpha Android Super-App",
    "meta": "In Progress · Kotlin, Jetpack Compose, Material3",
    "href": "projects.html#p-002",
    "text": "alpha android super-app the problem personal android tools need shared navigation and settings without coupling every feature into one screen. what i built built a kotlin and jetpack compose application with a calculator, budget tracking, and a camera-based gesture-control module. engineering focus keep feature screens modular and use a common application shell for state, navigation, and android permissions. current boundary feature readiness varies across the application. camera and bluetooth behaviour require device checks; the presence of a module does not establish a published play store release. kotlin jetpack compose material3 camerax mediapipe bluetooth spp datastore apache poi in progress"
  },
  {
    "type": "project",
    "title": "md2pdf — Desktop Markdown to PDF Converter",
    "meta": "Python, Tkinter, Pandoc",
    "href": "projects.html#p-029",
    "text": "md2pdf — desktop markdown to pdf converter pdf produced by md2pdf · readme input · simple renderer python tkinter pandoc wkhtmltopdf markdown desktop app"
  },
  {
    "type": "project",
    "title": "Win-Governor — Windows OS Kernel Tuning & Task Governance Utility",
    "meta": "C# / .NET 10, WPF, Win32 NT Kernel",
    "href": "projects.html#p-030",
    "text": "win-governor — windows os kernel tuning & task governance utility the problem windows memory-management operations need a usable interface and clear control over when system changes run. what i built built a c# and wpf utility (win-governor, formerly novaoptimizer) targeting .net 8 with memory-management operations and a background monitoring workflow. engineering focus expose working-set and standby-list operations through windows apis rather than relying on a model to interpret and execute shell instructions. current boundary some operations require elevated permissions or undocumented windows interfaces. their effect depends on workload and os behaviour; reclaimed memory is not a general performance benchmark. c# / .net 10 wpf win32 nt kernel memory management task manager turbo boost windows 11"
  },
  {
    "type": "project",
    "title": "Pulse Live — Real-Time Interactive Polling Platform",
    "meta": "React 19, TypeScript, Vite",
    "href": "projects.html#p-021",
    "text": "pulse live — real-time interactive polling platform the problem a presenter needs to collect audience responses while participants and the shared display stay synchronized. what i built developed a react and typescript polling project with choice questions, q&a, word clouds, and qr-code joining. engineering focus use supabase data updates to connect voting sessions with presenter controls and the audience display. current boundary a web application project. concurrent attendance, reconnect behaviour, and response latency need a live session test; no capacity claim is made from the archived preview. react 19 typescript vite supabase websockets react router v7 lucide icons qr code"
  },
  {
    "type": "project",
    "title": "Cryptarithmetic Solver & API",
    "meta": "Python, FastAPI, Backtracking",
    "href": "projects.html#p-020",
    "text": "cryptarithmetic solver & api actual solver run · send + more = money and all two + two = four solutions python fastapi backtracking docker algorithm design"
  },
  {
    "type": "project",
    "title": "IEEE KEC React Workshop",
    "meta": "React, Vite, JavaScript",
    "href": "projects.html#p-015",
    "text": "ieee kec react workshop the problem first-time react learners need small examples whose state changes they can trace while following a workshop. what i built prepared a vite-based teaching application for the ieee kec workshop, progressing from greeting and props examples to counters and a live clock. engineering focus keep each lesson in a separate component so learners can connect a change in code with its effect in the browser. current boundary instructional material for an introductory workshop. the application demonstrates react concepts; it does not include the operational requirements of a deployed product. react vite javascript teaching material"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 1 — Cardiac Event Data Wrangling",
    "meta": "Python, Pandas, EDA",
    "href": "projects.html#p-003",
    "text": "fusemachines wk 1 — cardiac event data wrangling the problem a model cannot support useful analysis until missing values, feature relationships, and class balance are understood. coursework implementation prepared a data-wrangling notebook for a synthetic heart-attack-risk dataset as fuse ai fellowship coursework. engineering focus inspect distributions, correlations, and class imbalance before preparing the data for downstream modelling. current boundary an exploratory analysis of synthetic data. the notebook does not establish clinical risk prediction, patient safety, or applicability to real hospital records. python pandas eda data wrangling"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 2 — Customer API App",
    "meta": "FastAPI, PostgreSQL, SQLAlchemy",
    "href": "projects.html#p-004",
    "text": "fusemachines wk 2 — customer api app the problem customer, order, and payment records need consistent validation and persistence across api requests. coursework implementation built a fastapi application with sqlalchemy and postgresql, including record-management endpoints and a statistics module. engineering focus separate database access from request handling and use environment-based configuration, container setup, and centralized logging. current boundary a fellowship api implementation. deployment configuration alone does not establish production availability, access-control completeness, or performance under concurrent traffic. fastapi postgresql sqlalchemy pydantic docker 12-factor app"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 3 — Text-to-SQL Agentic Pipeline",
    "meta": "Python, FastAPI, Streamlit",
    "href": "projects.html#p-005",
    "text": "fusemachines wk 3 — text-to-sql agentic pipeline the problem a natural-language database question needs to become valid sql before its result can be explained to a user. coursework implementation built a postgresql-backed pipeline that plans a query, generates sql, validates it, executes it, and summarizes the result. engineering focus separate query generation from validation and execution, then compare outputs against the assignment's reference questions and sql. current boundary evaluation is bounded by the coursework schema and recorded question set. successful queries there do not establish correctness on unfamiliar schemas or authorization to execute arbitrary sql. python fastapi streamlit gpt-4o-mini postgresql docker prompt chaining"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 4 — Telco Churn & CLV ML Pipeline",
    "meta": "Python, scikit-learn, Logistic Regression",
    "href": "projects.html#p-006",
    "text": "fusemachines wk 4 — telco churn & clv ml pipeline the problem customer retention work combines a binary churn decision with an estimate of customer lifetime value. coursework implementation built classification and regression workflows using linear-model families, with diagnostic plots and an exported notebook report. engineering focus compare model behaviour across the churn and value-prediction tasks rather than using one score for both objectives. current boundary an offline coursework analysis. results depend on the dataset, target definitions, and evaluation split; they do not demonstrate an intervention that reduces churn. python scikit-learn logistic regression ridge lasso pandas papermill"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 5 — Telco Churn Tree-Based Ensemble Pipeline",
    "meta": "Python, XGBoost, Random Forest",
    "href": "projects.html#p-008",
    "text": "fusemachines wk 5 — telco churn tree-based ensemble pipeline the problem churn classification must account for class imbalance without allowing resampling to leak into validation data. coursework implementation built a telco churn pipeline using tree-based ensembles, with a separate tenure-regression task and model documentation. engineering focus restrict smote to training folds and inspect feature contributions with shap alongside the model comparison. current boundary offline fellowship coursework. explanations describe the fitted model's behaviour on the evaluated data; they do not establish causal drivers of customer churn. python xgboost random forest shap imbpipeline smote joblib scikit-learn"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 6 — Probabilistic Models",
    "meta": "Python, PyMC, ArviZ",
    "href": "projects.html#p-009",
    "text": "fusemachines wk 6 — probabilistic models the problem a point estimate can hide uncertainty that matters when comparing predictions or updating beliefs from new observations. coursework implementation implemented probabilistic-modelling exercises covering mle, map estimation, bayesian updating, graphical models, and pymc logistic regression. engineering focus retain posterior samples and use arviz diagnostics to inspect the fitted bayesian model rather than reporting only a single coefficient estimate. current boundary coursework examples under explicit model and prior assumptions. sampling diagnostics assess the fitted inference run; they do not prove that those assumptions match a deployment population. python pymc arviz pgmpy bayesian inference scikit-learn pandas"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 7 — Customer Segmentation",
    "meta": "Python, scikit-learn, K-Means",
    "href": "projects.html#p-011",
    "text": "fusemachines wk 7 — customer segmentation the problem retail transaction data has no predefined customer segments, so the feature representation shapes the groups a clustering method finds. coursework implementation built an online retail ii segmentation workflow with rfm and category-ratio features, then compared k-means, hierarchical clustering, and dbscan. engineering focus inspect cluster structure with silhouette and davies-bouldin scores and relate the groups back to their transaction features. current boundary an exploratory segmentation exercise. internal clustering scores do not establish durable customer categories or measured campaign value. python scikit-learn k-means hierarchical clustering dbscan rfm pandas scipy"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 8 — Forecasting",
    "meta": "Python, statsmodels, SARIMA",
    "href": "projects.html#p-016",
    "text": "fusemachines wk 8 — forecasting the problem time-series models must be compared on future observations without leaking information from later periods into training. coursework implementation built a forecasting notebook comparing classical and machine-learning models, an ensemble, and forecast diagnostics. engineering focus evaluate errors with mase and rmse and examine whether combining forecasts changes the comparison with individual models. current boundary the recorded environment could not fetch yahoo finance data and used a seeded synthetic fallback. those results demonstrate the pipeline, not predictive performance on the real s&p 500. python statsmodels sarima holt-winters prophet lightgbm lstm xgboost"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 9 — NEU Steel Defect CNN",
    "meta": "Python, PyTorch, torchvision",
    "href": "projects.html#p-017",
    "text": "fusemachines wk 9 — neu steel defect cnn the problem steel surface-defect classification needs a model that learns image structure while exposing overfitting on the available dataset. coursework implementation built a pytorch cnn workflow for the six neu defect classes, with augmentation, normalization, and dropout experiments. engineering focus compare training and validation behaviour while tuning the model, rather than treating training accuracy as evidence of generalization. current boundary an offline image-classification assignment. the evaluation does not establish detection performance on a production line, unseen cameras, or a different defect distribution. python pytorch torchvision cnn optuna scikit-learn"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 10 — Image Processing",
    "meta": "Python, OpenCV, NumPy",
    "href": "projects.html#p-019",
    "text": "fusemachines wk 10 — image processing the problem fruit images need to be separated into usable regions before shapes and object locations can be inspected. coursework implementation built an opencv workflow for hsv segmentation, morphological cleanup, denoising, and edge and feature detection. engineering focus implement the canny stages directly, compare them with opencv, and inspect how detection changes when fruit touches or image noise increases. current boundary classical image-processing coursework on the selected image sets. thresholds and geometric assumptions need retuning for different lighting, backgrounds, and camera conditions. python opencv numpy matplotlib hsv segmentation canny edge detection hough transform"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 11 — Vision Transformers",
    "meta": "Python, PyTorch, torchvision",
    "href": "projects.html#p-022",
    "text": "fusemachines wk 11 — vision transformers the problem classification, object detection, and segmentation answer different visual questions and need separate evaluation criteria. coursework implementation built a computer-vision coursework notebook covering resnet transfer learning, faster r-cnn, deeplab segmentation, a vae, and transformer-based image representations. engineering focus compare learned and zero-shot representations, inspect gradcam outputs, and consider export requirements in the assignment's deployment scenario. current boundary notebook experiments on selected datasets and image slices. the warehouse-camera rollout is a coursework scenario; the project does not establish operation across a deployed camera fleet. python pytorch torchvision timm clip onnx gradcam vision transformers"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 12 — NER for Customer Support",
    "meta": "Python, NER, CoNLL-2003",
    "href": "projects.html#p-024",
    "text": "fusemachines wk 12 — ner for customer support the problem text-routing workflows need entity boundaries and types before names and locations can be used as structured fields. coursework implementation built a conll-2003 named-entity workflow with preprocessing, token features, a crf model, and error analysis. engineering focus combine word-shape and neighbouring-token features, then inspect entity-level precision and recall alongside individual mistakes. current boundary the source dataset is general-domain annotated text. the customer-support framing is an assignment scenario; transfer to real tickets and crm data requires separate evaluation. python ner conll-2003 feature engineering nlp"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 13 — LSTM Text Classification",
    "meta": "Python, PyTorch, LSTM",
    "href": "projects.html#p-027",
    "text": "fusemachines wk 13 — lstm text classification the problem a text classifier needs to map variable-length headlines into a fixed set of topic labels. coursework implementation implemented an ag_news headline classifier with a constructed vocabulary, an embedding layer, an lstm, and a final classification layer. engineering focus build the pytorch training and inference flow from the supplied notebook skeleton and inspect the effect of sequence representation on predictions. current boundary a four-topic coursework classifier with recorded notebook outputs. performance on the assignment data does not establish robustness to new topics, languages, or changing news vocabulary. python pytorch lstm ag_news nlp"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 14 — Agentic Intent Routing",
    "meta": "Python, BERT, Fine-Tuning",
    "href": "projects.html#p-028",
    "text": "fusemachines wk 14 — agentic intent routing the problem a support message must reach the correct handling category before a specialized assistant can respond. coursework implementation developed encoder and decoder-model routing approaches for eleven customer-support categories using the bitext dataset. engineering focus use a group-aware stratified split to keep repeated instruction text from crossing training and evaluation boundaries, then compare the candidate routing approaches. current boundary an intent-classification experiment. routing labels measure category selection; they do not establish the correctness of a downstream agent's answer or its business action. python bert fine-tuning slm intent classification stratified split"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 15 — RAG AI Assistant",
    "meta": "Python, FastAPI, RAG",
    "href": "projects.html#p-045",
    "text": "fusemachines wk 15 — rag ai assistant the problem an assistant needs retrieved context and bounded tool use when a model response alone is insufficient. coursework implementation built a fastapi assistant with qdrant retrieval, structured responses, tool calling, and a streamlit interface. engineering focus use caching, retries, circuit breakers, and a provider fallback chain to handle repeated requests and unavailable model services. current boundary a fellowship implementation. retrieval quality and response correctness depend on the corpus and provider; configured fallbacks do not guarantee that an unavailable service will be replaced successfully. python fastapi rag qdrant streamlit vllm docker"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 16 — Verified Agentic Assistant",
    "meta": "Python, Agentic AI, RAG",
    "href": "projects.html#p-046",
    "text": "fusemachines wk 16 — verified agentic assistant the problem a single retrieval pass can miss information, follow outdated context, or produce citations that were never retrieved. coursework implementation extended the rag assistant with an iterative tool-use loop, context management, and a deterministic citation-verification gate. engineering focus clear old tool results while retaining notes, cap the loop's budget, and record trajectories and failures in a custom evaluation harness. current boundary the saved report covers four cases and includes a provider failure. citation checks establish source membership, not the factual correctness of every answer. python agentic ai rag context engineering evaluation fastapi"
  },
  {
    "type": "project",
    "title": "Fusemachines Wk 17 — Agentic AI & Telco Churn MLOps",
    "meta": "Python, MLOps, MLflow",
    "href": "projects.html#p-043",
    "text": "fusemachines wk 17 — agentic ai & telco churn mlops the problem ml and agent applications need a repeatable way to track experiments, serve outputs, and detect regressions. coursework implementation built telco churn and agent-assistant mlops workflows using mlflow experiment tracking, fastapi serving, evidently monitoring, and airflow scheduling. engineering focus separate training and registry workflows from serving and monitoring; track agent prompts and traces alongside regression evaluations. evaluation boundary coursework implementations. llm-as-judge scores require their own calibration; they are not independent proof of response correctness. python mlops mlflow evidently ai airflow llm evaluation fastapi"
  },
  {
    "type": "project",
    "title": "Fusemachines Week 18 — Trustworthy AI Guardrails",
    "meta": "Python, AI Safety, Prompt Injection",
    "href": "projects.html#p-044",
    "text": "fusemachines week 18 — trustworthy ai guardrails the problem an assistant can receive sensitive inputs and return malformed, unsupported, or sensitive outputs. coursework implementation built a guardrail pipeline with input checks for pii and prompt injection, plus output checks for schema conformity, groundedness, and leakage. engineering focus keep checks around the generation step and use a curated evaluation set to inspect which cases are blocked, accepted, or require fallback handling. current boundary checks cover the implemented rules and recorded cases. they do not establish complete jailbreak resistance, comprehensive pii detection, or guaranteed factual correctness. python ai safety prompt injection pii pydantic llm guardrails"
  },
  {
    "type": "project",
    "title": "ONM Case Study — Fusemachines Inc.",
    "meta": "LaTeX, Organizational Analysis, Case Study",
    "href": "projects.html#p-026",
    "text": "onm case study — fusemachines inc. the problem an organizational case study needs evidence about how responsibilities and hiring practices work beyond a company's public description. what i built prepared an organization and management coursework study of fusemachines, drawing on an interview with talent acquisition and pr managers. engineering focus connect the interview material to organizational structure, hr practices, and cross-functional operations in a written report with latex sources. current boundary an academic case study based on the available interview and documentation. it represents that study's scope and period, rather than an ongoing audit of the company. latex organizational analysis case study coursework"
  }

  ]
};

window.SEARCH_STATIC_INDEX = SEARCH_STATIC_INDEX;

