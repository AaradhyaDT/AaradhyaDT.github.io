/* AUTO-GENERATED from data/master_cv.json (SSOT, updated 2026-11-19, sha256:42c35094c16841aa).
 * Do not hand-edit. Regenerate with: python scripts/compile_cv.py --sync-web */
const RESUME_DATA = {
  "name": "Aaradhya Dev Tamrakar",
  "subtitle": "AI/ML Engineering · AI Systems & Workflow Tooling · Embedded AI · Model Evaluation",
  "contact": "Kathmandu, Nepal · aaradhyadevtmr@gmail.com · +977 9844602050 · linkedin.com/in/aaradhya-dev-tamrakar · github.com/AaradhyaDT · aaradhyadt.github.io",
  "summary": "Final-year (8th Semester) Electronics, Communication and Information Engineering student at IOE, Kathmandu Engineering College, building applied ML systems, AI workflow tooling, and embedded ML software. Fuse AI Fellow (Fusemachines) and NSSR DataCamp Fellow. I use AI where it adds value, turn repeatable work into reusable tools, and verify results with tests and explicit evaluation. Work spans demographic fairness auditing, multi-provider agent coordination, Model Context Protocol (MCP) infrastructure, edge ML inference on ESP32-S3, near-memory ingress simulation, and native Windows systems utilities.",
  "roles": {
    "all": {
      "title": "Engineering CV",
      "sections": [
        {
          "title": "Education",
          "items": [
            {
              "header": "Bachelor of Engineering (B.E.) in Electronics, Communication and Information Engineering",
              "sub": "Kathmandu Engineering College, Institute of Engineering (IOE), Tribhuvan University | December 2022 – Expected January 2027",
              "bullets": [
                "Final Year (Year IV, Part II — 8th / Final Semester); Cumulative Average: ~75% across completed semesters. Coursework: Artificial Intelligence, Machine Learning, Digital Signal Analysis & Processing, Signals and Systems, Embedded Systems, Microprocessors, Control Systems, Telecommunications & Wireless Communication, Computer Networks, Engineering Mathematics, Probability and Statistics, Object-Oriented Programming (C++)."
              ]
            }
          ]
        },
        {
          "title": "Selected Engineering Projects",
          "items": [
            {
              "header": "BiasAperture — Computer Vision Demographic Fairness & Bias Audit",
              "sub": "Python · AIF360 · Fairlearn · Statistical Testing · Jinja2 · OpenCV",
              "bullets": [
                "Co-developed an automated prediction-auditing and reporting pipeline as a two-person fellowship capstone with Tisha Manandhar.",
                "Audited classification performance across 126 demographic bins on the FairFace benchmark (97,698 images), computing Disparate Impact Ratio, Demographic Parity Difference, and Equalized Odds with cohort-support diagnostics.",
                "Engineered self-contained HTML and PDF report generation with confidence intervals and diagnostic disparity plots; matched model comparisons and statistical validation remain active work."
              ]
            },
            {
              "header": "SPARK — Two-Layer Edge-AI Fall Detection Wearable",
              "sub": "ESP32-S3 · C/C++ · TensorFlow Lite Micro · Python · FreeRTOS · MPU-6050 · SHAP",
              "bullets": [
                "Project lead for ML modeling, gateway processing, and explainability in a four-person team; hardware and firmware have dedicated owners.",
                "Trained leakage-free subject-stratified 1D-CNN fall-detection models on the SisFall benchmark (38 subjects, 38,420 windows), achieving 0.9185 AUC-ROC and 87.81% sensitivity.",
                "Quantized the model to an 18.5 KB INT8 CNN footprint for ESP32-S3 deployment and built edge-gateway SHAP attribution; on-device hardware testing, BLE streaming, and volunteer cohort validation remain pending."
              ]
            },
            {
              "header": "STRANGLER-IPU — Ingress Processing Unit Architecture Research",
              "sub": "Python · SimPy · CXL Memory Modeling · Discrete-Event Simulation · LaTeX",
              "bullets": [
                "Modeled decoupled front-end ingress offload over asymmetric CXL pooled-memory fabrics via SimPy discrete-event simulation (sweep_ipu_breakeven.py), observing 4.12x tail-latency reduction and 68% host memory bus contention relief in simulation (research prototype; no physical silicon).",
                "Documented architectural assumptions, failure modes, and invariant boundaries in versioned RFCs and reproducible LaTeX technical reports."
              ]
            },
            {
              "header": "Fleet Orchestrator — AI Workflow Coordination & Tooling",
              "sub": "Python · FastAPI · Provider Adapters · Model Context Protocol (MCP) · SQLite",
              "bullets": [
                "Built coordination tooling for multi-step AI workflows with explicit task state, worker adapters, scheduling, failure handling, and live status inspection.",
                "Standardized provider adapters (local models, CLI harnesses, API endpoints) and local MCP integrations to turn repeated orchestration scripts into inspectable, reusable interfaces."
              ]
            },
            {
              "header": "Agent-Customization-Sync — Cross-IDE Configuration Tooling",
              "sub": "Python · SHA-256 · CLI · MCP Configuration",
              "bullets": [
                "Built configuration snapshots, guarded restore, rules transpilation, and SHA-256 drift audits across development environments (Antigravity, Cursor, Claude Code).",
                "Audits instruction overhead and links shared skills to reduce configuration duplication across machines."
              ]
            },
            {
              "header": "Super-NLM — Multi-Account NotebookLM Hub & MCP Server",
              "sub": "Python · Model Context Protocol (MCP) · Google Drive API · FastAPI",
              "bullets": [
                "Developed an MCP server enabling agents to search and query notebooks across accounts, synchronize Google Drive folders, and batch-download Studio artifacts.",
                "Implemented scheduled job queues and quota-aware backoff to support reproducible document synthesis across research and coursework materials."
              ]
            },
            {
              "header": "Headless LocalSend Substrate & Utility MCP Suite",
              "sub": "Python · Model Context Protocol (MCP) · LAN P2P · ADB · FastAPI",
              "bullets": [
                "Built Headless LocalSend Substrate (#p-048) for silent background LAN P2P and direct hardware-speed ADB file transfers without GUI interruption or cloud storage.",
                "Developed companion MCP servers (LocalSend MCP #p-035, Google Classroom MCP #p-036, Typora MCP #p-037) connecting assistants to nearby devices, coursework deadlines, and Markdown export workflows."
              ]
            },
            {
              "header": "Windows Pilot & GitHub Pilot — Semantic UIA & Multi-Account Fleet Automation",
              "sub": "Python · Windows UI Automation (UIA) · Model Context Protocol (MCP) · GitHub API · PowerShell",
              "bullets": [
                "Built Windows Pilot (#p-033), an MCP desktop automation engine operating on semantic UI Automation trees rather than brittle pixel coordinates.",
                "Built GitHub Pilot (#p-034) to inspect repository health, CI status, and commit history across multiple GitHub accounts without manual polling."
              ]
            },
            {
              "header": "Win-Governor (NovaOptimizer) & Win-Vault — Windows Systems & Privacy Utilities",
              "sub": "C# / .NET · WPF · Python · Win32 / NT Kernel APIs · NTFS ACLs · PowerShell",
              "bullets": [
                "Built Win-Governor / NovaOptimizer (#p-030) using Win32 memory APIs to reclaim 1.2–3.4 GB working-set RAM under heavy multitasking with explicit user control over when operations run.",
                "Built Win-Vault, a lightweight directory privacy utility enforcing kernel-level NTFS ACL access restrictions without third-party drivers."
              ]
            },
            {
              "header": "Nepali OCR AI — Vision OCR, Varnavinyas Grammar & Bi-Directional Transcoder",
              "sub": "Python · Tesseract OCR · OpenCV · Devanagari NLP",
              "bullets": [
                "Built a low-resource Nepali document pipeline combining OpenCV illumination preprocessing, OCR extraction, Devanagari normalization, and bi-directional Preeti <-> Unicode transcoding."
              ]
            },
            {
              "header": "IEEE-Xtreme Algorithmic Archive & Codon Stream — Competitive Programming Corpus",
              "sub": "C++ · Python · Algorithms & Data Structures · Chrome DevTools Protocol",
              "bullets": [
                "Built an indexed 662-task IEEE-Xtreme archive (#p-039) with structured statements, constraints, and reference solutions alongside Codon Stream (#p-047), a pre-verified 500-gene algorithmic library for strict time/memory limits."
              ]
            },
            {
              "header": "Gesture-Controlled Self-Balancing Robot (GCSBR)",
              "sub": "Arduino · C++ · MPU-6050 · PID Control · Kotlin · MediaPipe Hands · CameraX",
              "bullets": [
                "Implemented closed-loop PID stabilization firmware for a two-wheeled inverted pendulum robot and built an Android companion app (Kotlin, MediaPipe Hands, CameraX) mapping hand gestures to directional commands over Bluetooth."
              ]
            },
            {
              "header": "Living Portfolio & Personal Systems — AaradhyaDT.github.io, Claude DSP & Alpha",
              "sub": "Vanilla HTML/CSS/ES6 · Web Crypto (AES-256-GCM) · Python Verification · Kotlin / Jetpack Compose · PowerShell",
              "bullets": [
                "Engineered aaradhyadt.github.io as a zero-build-step PWA featuring client-side AES-256-GCM content gating, 3D knowledge-graph navigation, single-source CV compilation, and a 26-category pre-commit verification suite (verify.py).",
                "Developed Claude Desktop Multi-Profile DSP Fabric (#p-023) for isolated desktop sessions and Alpha (#p-002), a modular Android super-app built with Kotlin, Jetpack Compose, and Room."
              ]
            }
          ]
        },
        {
          "title": "Fellowships",
          "items": [
            {
              "header": "Fuse AI Fellow | Fusemachines AI Fellowship 2026",
              "sub": "2026 – Present (Active)",
              "bullets": [
                "Co-developed BiasAperture, an automated demographic fairness auditing pipeline measuring predictive disparities on computer vision benchmarks as the two-person fellowship capstone.",
                "Built agentic AI and retrieval coursework including a 5-stage Text-to-SQL pipeline (Planner -> Generator -> Validator -> Executor -> Summarizer), a FastAPI RAG AI Assistant (Qdrant, bounded tool calls), a Verified Agentic Assistant checking retrieved context and citations, and Trustworthy AI Guardrails (Pydantic schema, prompt-injection, PII, and groundedness checks against a golden evaluation set).",
                "Implemented dual-track MLOps coursework for experiment tracking, model serving, data-drift monitoring, and scheduled regression evaluation using MLflow, FastAPI, Docker, PostgreSQL, Evidently, and Airflow.",
                "Developed tabular, vision, and NLP coursework pipelines spanning Telco Churn & CLV (XGBoost, LightGBM, SMOTE, SHAP), multi-horizon time-series forecasting ensembles, NEU Steel Defect CNN and Vision Transformers, and customer-support NER and LSTM classifiers."
              ]
            },
            {
              "header": "NSSR DataCamp Fellow (Cohort 2) | Nepalese Society of Student Researchers",
              "sub": "April 2026 – Present",
              "bullets": [
                "Completed applied GenAI projects automating data cleaning, schema normalization, text analysis, and structured exploratory workflows; earned DataCamp CPE credit certificates.",
                "Continuing structured technical pathways in SQL database design, Python data analysis, and predictive modeling."
              ]
            }
          ]
        },
        {
          "title": "Technical Skills",
          "items": [
            {
              "header": "Machine Learning, Evaluation & Vision/NLP",
              "sub": "Python, PyTorch, scikit-learn, Pandas, NumPy, XGBoost, LightGBM, SHAP, Fairlearn, AIF360, OpenCV, MediaPipe, Qdrant, Pydantic, SimPy"
            },
            {
              "header": "AI Systems, MLOps & Backend",
              "sub": "FastAPI, Docker, Model Context Protocol (MCP), SQL (PostgreSQL, SQLite), asyncio, REST APIs, MLflow, Airflow, Evidently"
            },
            {
              "header": "Embedded Systems, Edge AI & Native/Mobile",
              "sub": "C/C++, ESP32-S3, TensorFlow Lite Micro, FreeRTOS, Arduino, IMU & Sensor Interfacing (UART/I2C/SPI/BLE), Kotlin (Jetpack Compose, CameraX), C# / .NET (Win32 & NTFS APIs)"
            },
            {
              "header": "Engineering Practice & Tooling",
              "sub": "Git & GitHub, Linux, PowerShell, Pytest, Automated Verification & CI, Reproducible Configurations, WordCraft, LaTeX, EasyEDA / Proteus"
            }
          ]
        },
        {
          "title": "Leadership and Engineering Service",
          "items": [
            {
              "header": "IEEE KEC KTM Student Branch | Vice Chair (2026 – Present); Vice Secretary (2025 – 2026)",
              "sub": "2025 – Present",
              "bullets": [
                "Coordinate branch planning, technical workshops, and committee communications; organized IEEE Day 2025, IEEE SPAx, and mentored students in the Electronics For All workshop.",
                "Represented the branch at the IEEE Conference Leadership Workshop 2026 and hosted student technical orientations."
              ]
            },
            {
              "header": "KEC Makerspace, Kathmandu Engineering College | Makerspace Ambassador",
              "sub": "June 2026 – Present",
              "bullets": [
                "Maintain the KEC Makerspace website (content updates, image repairs, interface fixes) and support campus 3D printing, laser fabrication, and embedded prototyping."
              ]
            },
            {
              "header": "Electronics Project Club (EPC), Kathmandu Engineering College | Event Manager (2026 – Present); Resource Manager (2024 – 2026)",
              "sub": "2024 – Present",
              "bullets": [
                "Coordinate workshop logistics, hardware component inventory, and project showcases; mentored in the Basic Electronics Workshop and co-hosted the EPC Handover Program 2025."
              ]
            }
          ]
        }
      ]
    },
    "aiml": {
      "title": "AI/ML Engineering CV",
      "sections": [
        {
          "title": "Education",
          "items": [
            {
              "header": "Bachelor of Engineering (B.E.) in Electronics, Communication and Information Engineering",
              "sub": "Kathmandu Engineering College, Institute of Engineering (IOE), Tribhuvan University | December 2022 – Expected January 2027",
              "bullets": [
                "Final Year (Year IV, Part II — 8th / Final Semester); Cumulative Average: ~75% across completed semesters. Coursework: Artificial Intelligence, Machine Learning, Digital Signal Analysis & Processing, Signals and Systems, Embedded Systems, Microprocessors, Control Systems, Telecommunications & Wireless Communication, Computer Networks, Engineering Mathematics, Probability and Statistics, Object-Oriented Programming (C++)."
              ]
            }
          ]
        },
        {
          "title": "Selected Engineering Projects",
          "items": [
            {
              "header": "BiasAperture — Computer Vision Demographic Fairness & Bias Audit",
              "sub": "Python · AIF360 · Fairlearn · Statistical Testing · Jinja2 · OpenCV",
              "bullets": [
                "Co-developed an automated prediction-auditing and reporting pipeline as a two-person fellowship capstone with Tisha Manandhar.",
                "Audited classification performance across 126 demographic bins on the FairFace benchmark (97,698 images), computing Disparate Impact Ratio, Demographic Parity Difference, and Equalized Odds with cohort-support diagnostics.",
                "Engineered self-contained HTML and PDF report generation with confidence intervals and diagnostic disparity plots; matched model comparisons and statistical validation remain active work."
              ]
            },
            {
              "header": "SPARK — Two-Layer Edge-AI Fall Detection Wearable",
              "sub": "ESP32-S3 · C/C++ · TensorFlow Lite Micro · Python · FreeRTOS · MPU-6050 · SHAP",
              "bullets": [
                "Project lead for ML modeling, gateway processing, and explainability in a four-person team; hardware and firmware have dedicated owners.",
                "Trained leakage-free subject-stratified 1D-CNN fall-detection models on the SisFall benchmark (38 subjects, 38,420 windows), achieving 0.9185 AUC-ROC and 87.81% sensitivity.",
                "Quantized the model to an 18.5 KB INT8 CNN footprint for ESP32-S3 deployment and built edge-gateway SHAP attribution; on-device hardware testing, BLE streaming, and volunteer cohort validation remain pending."
              ]
            },
            {
              "header": "Fleet Orchestrator — AI Workflow Coordination & Tooling",
              "sub": "Python · FastAPI · Provider Adapters · Model Context Protocol (MCP) · SQLite",
              "bullets": [
                "Built coordination tooling for multi-step AI workflows with explicit task state, worker adapters, scheduling, failure handling, and live status inspection.",
                "Standardized provider adapters (local models, CLI harnesses, API endpoints) and local MCP integrations to turn repeated orchestration scripts into inspectable, reusable interfaces."
              ]
            },
            {
              "header": "Super-NLM — Multi-Account NotebookLM Hub & MCP Server",
              "sub": "Python · Model Context Protocol (MCP) · Google Drive API · FastAPI",
              "bullets": [
                "Developed an MCP server enabling agents to search and query notebooks across accounts, synchronize Google Drive folders, and batch-download Studio artifacts."
              ]
            },
            {
              "header": "Nepali OCR AI — Vision OCR, Varnavinyas Grammar & Bi-Directional Transcoder",
              "sub": "Python · Tesseract OCR · OpenCV · Devanagari NLP",
              "bullets": [
                "Built a low-resource Nepali document pipeline combining OpenCV illumination preprocessing, OCR extraction, Devanagari normalization, and bi-directional Preeti <-> Unicode transcoding."
              ]
            }
          ]
        },
        {
          "title": "Fellowships",
          "items": [
            {
              "header": "Fuse AI Fellow | Fusemachines AI Fellowship 2026",
              "sub": "2026 – Present (Active)",
              "bullets": [
                "Co-developed BiasAperture, an automated demographic fairness auditing pipeline measuring predictive disparities on computer vision benchmarks as the two-person fellowship capstone.",
                "Built agentic AI and retrieval coursework including a 5-stage Text-to-SQL pipeline (Planner -> Generator -> Validator -> Executor -> Summarizer), a FastAPI RAG AI Assistant (Qdrant, bounded tool calls), a Verified Agentic Assistant checking retrieved context and citations, and Trustworthy AI Guardrails (Pydantic schema, prompt-injection, PII, and groundedness checks against a golden evaluation set).",
                "Implemented dual-track MLOps coursework for experiment tracking, model serving, data-drift monitoring, and scheduled regression evaluation using MLflow, FastAPI, Docker, PostgreSQL, Evidently, and Airflow.",
                "Developed tabular, vision, and NLP coursework pipelines spanning Telco Churn & CLV (XGBoost, LightGBM, SMOTE, SHAP), multi-horizon time-series forecasting ensembles, NEU Steel Defect CNN and Vision Transformers, and customer-support NER and LSTM classifiers."
              ]
            },
            {
              "header": "NSSR DataCamp Fellow (Cohort 2) | Nepalese Society of Student Researchers",
              "sub": "April 2026 – Present",
              "bullets": [
                "Completed applied GenAI projects automating data cleaning, schema normalization, text analysis, and structured exploratory workflows; earned DataCamp CPE credit certificates.",
                "Continuing structured technical pathways in SQL database design, Python data analysis, and predictive modeling."
              ]
            }
          ]
        },
        {
          "title": "Technical Skills",
          "items": [
            {
              "header": "Machine Learning, Evaluation & Vision/NLP",
              "sub": "Python, PyTorch, scikit-learn, Pandas, NumPy, XGBoost, LightGBM, SHAP, Fairlearn, AIF360, OpenCV, MediaPipe, Qdrant, Pydantic, SimPy"
            },
            {
              "header": "AI Systems, MLOps & Backend",
              "sub": "FastAPI, Docker, Model Context Protocol (MCP), SQL (PostgreSQL, SQLite), asyncio, REST APIs, MLflow, Airflow, Evidently"
            },
            {
              "header": "Engineering Practice & Tooling",
              "sub": "Git & GitHub, Linux, PowerShell, Pytest, Automated Verification & CI, Reproducible Configurations, WordCraft, LaTeX, EasyEDA / Proteus"
            }
          ]
        },
        {
          "title": "Leadership and Engineering Service",
          "items": [
            {
              "header": "IEEE KEC KTM Student Branch | Vice Chair (2026 – Present); Vice Secretary (2025 – 2026)",
              "sub": "2025 – Present",
              "bullets": [
                "Coordinate branch planning, technical workshops, and committee communications; organized IEEE Day 2025, IEEE SPAx, and mentored students in the Electronics For All workshop.",
                "Represented the branch at the IEEE Conference Leadership Workshop 2026 and hosted student technical orientations."
              ]
            },
            {
              "header": "Electronics Project Club (EPC), Kathmandu Engineering College | Event Manager (2026 – Present); Resource Manager (2024 – 2026)",
              "sub": "2024 – Present",
              "bullets": [
                "Coordinate workshop logistics, hardware component inventory, and project showcases; mentored in the Basic Electronics Workshop and co-hosted the EPC Handover Program 2025."
              ]
            }
          ]
        }
      ]
    },
    "hardware": {
      "title": "Embedded AI and Systems CV",
      "sections": [
        {
          "title": "Education",
          "items": [
            {
              "header": "Bachelor of Engineering (B.E.) in Electronics, Communication and Information Engineering",
              "sub": "Kathmandu Engineering College, Institute of Engineering (IOE), Tribhuvan University | December 2022 – Expected January 2027",
              "bullets": [
                "Final Year (Year IV, Part II — 8th / Final Semester); Cumulative Average: ~75% across completed semesters. Coursework: Artificial Intelligence, Machine Learning, Digital Signal Analysis & Processing, Signals and Systems, Embedded Systems, Microprocessors, Control Systems, Telecommunications & Wireless Communication, Computer Networks, Engineering Mathematics, Probability and Statistics, Object-Oriented Programming (C++)."
              ]
            }
          ]
        },
        {
          "title": "Embedded, Systems and Robotics Projects",
          "items": [
            {
              "header": "SPARK — Two-Layer Edge-AI Fall Detection Wearable",
              "sub": "ESP32-S3 · C/C++ · TensorFlow Lite Micro · Python · FreeRTOS · MPU-6050 · SHAP",
              "bullets": [
                "Project lead for ML modeling, gateway processing, and explainability in a four-person team; hardware and firmware have dedicated owners.",
                "Trained leakage-free subject-stratified 1D-CNN fall-detection models on the SisFall benchmark (38 subjects, 38,420 windows), achieving 0.9185 AUC-ROC and 87.81% sensitivity.",
                "Quantized the model to an 18.5 KB INT8 CNN footprint for ESP32-S3 deployment and built edge-gateway SHAP attribution; on-device hardware testing, BLE streaming, and volunteer cohort validation remain pending."
              ]
            },
            {
              "header": "STRANGLER-IPU — Ingress Processing Unit Architecture Research",
              "sub": "Python · SimPy · CXL Memory Modeling · Discrete-Event Simulation · LaTeX",
              "bullets": [
                "Modeled decoupled front-end ingress offload over asymmetric CXL pooled-memory fabrics via SimPy discrete-event simulation (sweep_ipu_breakeven.py), observing 4.12x tail-latency reduction and 68% host memory bus contention relief in simulation (research prototype; no physical silicon).",
                "Documented architectural assumptions, failure modes, and invariant boundaries in versioned RFCs and reproducible LaTeX technical reports."
              ]
            },
            {
              "header": "Agent-Customization-Sync — Cross-IDE Configuration Tooling",
              "sub": "Python · SHA-256 · CLI · MCP Configuration",
              "bullets": [
                "Built configuration snapshots, guarded restore, rules transpilation, and SHA-256 drift audits across development environments (Antigravity, Cursor, Claude Code).",
                "Audits instruction overhead and links shared skills to reduce configuration duplication across machines."
              ]
            },
            {
              "header": "Headless LocalSend Substrate & Utility MCP Suite",
              "sub": "Python · Model Context Protocol (MCP) · LAN P2P · ADB · FastAPI",
              "bullets": [
                "Built Headless LocalSend Substrate (#p-048) for silent background LAN P2P and direct hardware-speed ADB file transfers without GUI interruption or cloud storage."
              ]
            },
            {
              "header": "Windows Pilot & GitHub Pilot — Semantic UIA & Multi-Account Fleet Automation",
              "sub": "Python · Windows UI Automation (UIA) · Model Context Protocol (MCP) · GitHub API · PowerShell",
              "bullets": [
                "Built Windows Pilot (#p-033), an MCP desktop automation engine operating on semantic UI Automation trees rather than brittle pixel coordinates."
              ]
            },
            {
              "header": "Win-Governor (NovaOptimizer) & Win-Vault — Windows Systems & Privacy Utilities",
              "sub": "C# / .NET · WPF · Python · Win32 / NT Kernel APIs · NTFS ACLs · PowerShell",
              "bullets": [
                "Built Win-Governor / NovaOptimizer (#p-030) using Win32 memory APIs to reclaim 1.2–3.4 GB working-set RAM under heavy multitasking with explicit user control over when operations run.",
                "Built Win-Vault, a lightweight directory privacy utility enforcing kernel-level NTFS ACL access restrictions without third-party drivers."
              ]
            },
            {
              "header": "IEEE-Xtreme Algorithmic Archive & Codon Stream — Competitive Programming Corpus",
              "sub": "C++ · Python · Algorithms & Data Structures · Chrome DevTools Protocol",
              "bullets": [
                "Built an indexed 662-task IEEE-Xtreme archive (#p-039) with structured statements, constraints, and reference solutions alongside Codon Stream (#p-047), a pre-verified 500-gene algorithmic library for strict time/memory limits."
              ]
            },
            {
              "header": "Gesture-Controlled Self-Balancing Robot (GCSBR)",
              "sub": "Arduino · C++ · MPU-6050 · PID Control · Kotlin · MediaPipe Hands · CameraX",
              "bullets": [
                "Implemented closed-loop PID stabilization firmware for a two-wheeled inverted pendulum robot and built an Android companion app (Kotlin, MediaPipe Hands, CameraX) mapping hand gestures to directional commands over Bluetooth."
              ]
            }
          ]
        },
        {
          "title": "Fellowships",
          "items": [
            {
              "header": "Fuse AI Fellow | Fusemachines AI Fellowship 2026",
              "sub": "2026 – Present (Active)",
              "bullets": []
            }
          ]
        },
        {
          "title": "Technical Skills",
          "items": [
            {
              "header": "Embedded Systems, Edge AI & Native/Mobile",
              "sub": "C/C++, ESP32-S3, TensorFlow Lite Micro, FreeRTOS, Arduino, IMU & Sensor Interfacing (UART/I2C/SPI/BLE), Kotlin (Jetpack Compose, CameraX), C# / .NET (Win32 & NTFS APIs)"
            },
            {
              "header": "Engineering Practice & Tooling",
              "sub": "Git & GitHub, Linux, PowerShell, Pytest, Automated Verification & CI, Reproducible Configurations, WordCraft, LaTeX, EasyEDA / Proteus"
            }
          ]
        },
        {
          "title": "Leadership and Engineering Service",
          "items": [
            {
              "header": "IEEE KEC KTM Student Branch | Vice Chair (2026 – Present); Vice Secretary (2025 – 2026)",
              "sub": "2025 – Present",
              "bullets": [
                "Coordinate branch planning, technical workshops, and committee communications; organized IEEE Day 2025, IEEE SPAx, and mentored students in the Electronics For All workshop.",
                "Represented the branch at the IEEE Conference Leadership Workshop 2026 and hosted student technical orientations."
              ]
            },
            {
              "header": "KEC Makerspace, Kathmandu Engineering College | Makerspace Ambassador",
              "sub": "June 2026 – Present",
              "bullets": [
                "Maintain the KEC Makerspace website (content updates, image repairs, interface fixes) and support campus 3D printing, laser fabrication, and embedded prototyping."
              ]
            },
            {
              "header": "Electronics Project Club (EPC), Kathmandu Engineering College | Event Manager (2026 – Present); Resource Manager (2024 – 2026)",
              "sub": "2024 – Present",
              "bullets": [
                "Coordinate workshop logistics, hardware component inventory, and project showcases; mentored in the Basic Electronics Workshop and co-hosted the EPC Handover Program 2025."
              ]
            }
          ]
        }
      ]
    },
    "fullstack": {
      "title": "AI Systems and Developer Tools CV",
      "sections": [
        {
          "title": "Education",
          "items": [
            {
              "header": "Bachelor of Engineering (B.E.) in Electronics, Communication and Information Engineering",
              "sub": "Kathmandu Engineering College, Institute of Engineering (IOE), Tribhuvan University | December 2022 – Expected January 2027",
              "bullets": [
                "Final Year (Year IV, Part II — 8th / Final Semester); Cumulative Average: ~75% across completed semesters. Coursework: Artificial Intelligence, Machine Learning, Digital Signal Analysis & Processing, Signals and Systems, Embedded Systems, Microprocessors, Control Systems, Telecommunications & Wireless Communication, Computer Networks, Engineering Mathematics, Probability and Statistics, Object-Oriented Programming (C++)."
              ]
            }
          ]
        },
        {
          "title": "AI and Developer Infrastructure",
          "items": [
            {
              "header": "BiasAperture — Computer Vision Demographic Fairness & Bias Audit",
              "sub": "Python · AIF360 · Fairlearn · Statistical Testing · Jinja2 · OpenCV",
              "bullets": []
            },
            {
              "header": "Fleet Orchestrator — AI Workflow Coordination & Tooling",
              "sub": "Python · FastAPI · Provider Adapters · Model Context Protocol (MCP) · SQLite",
              "bullets": [
                "Built coordination tooling for multi-step AI workflows with explicit task state, worker adapters, scheduling, failure handling, and live status inspection.",
                "Standardized provider adapters (local models, CLI harnesses, API endpoints) and local MCP integrations to turn repeated orchestration scripts into inspectable, reusable interfaces."
              ]
            },
            {
              "header": "Agent-Customization-Sync — Cross-IDE Configuration Tooling",
              "sub": "Python · SHA-256 · CLI · MCP Configuration",
              "bullets": [
                "Built configuration snapshots, guarded restore, rules transpilation, and SHA-256 drift audits across development environments (Antigravity, Cursor, Claude Code).",
                "Audits instruction overhead and links shared skills to reduce configuration duplication across machines."
              ]
            },
            {
              "header": "Super-NLM — Multi-Account NotebookLM Hub & MCP Server",
              "sub": "Python · Model Context Protocol (MCP) · Google Drive API · FastAPI",
              "bullets": [
                "Developed an MCP server enabling agents to search and query notebooks across accounts, synchronize Google Drive folders, and batch-download Studio artifacts.",
                "Implemented scheduled job queues and quota-aware backoff to support reproducible document synthesis across research and coursework materials."
              ]
            },
            {
              "header": "Headless LocalSend Substrate & Utility MCP Suite",
              "sub": "Python · Model Context Protocol (MCP) · LAN P2P · ADB · FastAPI",
              "bullets": [
                "Built Headless LocalSend Substrate (#p-048) for silent background LAN P2P and direct hardware-speed ADB file transfers without GUI interruption or cloud storage.",
                "Developed companion MCP servers (LocalSend MCP #p-035, Google Classroom MCP #p-036, Typora MCP #p-037) connecting assistants to nearby devices, coursework deadlines, and Markdown export workflows."
              ]
            },
            {
              "header": "Windows Pilot & GitHub Pilot — Semantic UIA & Multi-Account Fleet Automation",
              "sub": "Python · Windows UI Automation (UIA) · Model Context Protocol (MCP) · GitHub API · PowerShell",
              "bullets": [
                "Built Windows Pilot (#p-033), an MCP desktop automation engine operating on semantic UI Automation trees rather than brittle pixel coordinates.",
                "Built GitHub Pilot (#p-034) to inspect repository health, CI status, and commit history across multiple GitHub accounts without manual polling."
              ]
            },
            {
              "header": "Living Portfolio & Personal Systems — AaradhyaDT.github.io, Claude DSP & Alpha",
              "sub": "Vanilla HTML/CSS/ES6 · Web Crypto (AES-256-GCM) · Python Verification · Kotlin / Jetpack Compose · PowerShell",
              "bullets": [
                "Engineered aaradhyadt.github.io as a zero-build-step PWA featuring client-side AES-256-GCM content gating, 3D knowledge-graph navigation, single-source CV compilation, and a 26-category pre-commit verification suite (verify.py).",
                "Developed Claude Desktop Multi-Profile DSP Fabric (#p-023) for isolated desktop sessions and Alpha (#p-002), a modular Android super-app built with Kotlin, Jetpack Compose, and Room."
              ]
            }
          ]
        },
        {
          "title": "Fellowships",
          "items": [
            {
              "header": "Fuse AI Fellow | Fusemachines AI Fellowship 2026",
              "sub": "2026 – Present (Active)",
              "bullets": [
                "Built agentic AI and retrieval coursework including a 5-stage Text-to-SQL pipeline (Planner -> Generator -> Validator -> Executor -> Summarizer), a FastAPI RAG AI Assistant (Qdrant, bounded tool calls), a Verified Agentic Assistant checking retrieved context and citations, and Trustworthy AI Guardrails (Pydantic schema, prompt-injection, PII, and groundedness checks against a golden evaluation set).",
                "Implemented dual-track MLOps coursework for experiment tracking, model serving, data-drift monitoring, and scheduled regression evaluation using MLflow, FastAPI, Docker, PostgreSQL, Evidently, and Airflow."
              ]
            },
            {
              "header": "NSSR DataCamp Fellow (Cohort 2) | Nepalese Society of Student Researchers",
              "sub": "April 2026 – Present",
              "bullets": [
                "Completed applied GenAI projects automating data cleaning, schema normalization, text analysis, and structured exploratory workflows; earned DataCamp CPE credit certificates."
              ]
            }
          ]
        },
        {
          "title": "Technical Skills",
          "items": [
            {
              "header": "AI Systems, MLOps & Backend",
              "sub": "FastAPI, Docker, Model Context Protocol (MCP), SQL (PostgreSQL, SQLite), asyncio, REST APIs, MLflow, Airflow, Evidently"
            },
            {
              "header": "Engineering Practice & Tooling",
              "sub": "Git & GitHub, Linux, PowerShell, Pytest, Automated Verification & CI, Reproducible Configurations, WordCraft, LaTeX, EasyEDA / Proteus"
            }
          ]
        },
        {
          "title": "Leadership and Engineering Service",
          "items": [
            {
              "header": "IEEE KEC KTM Student Branch | Vice Chair (2026 – Present); Vice Secretary (2025 – 2026)",
              "sub": "2025 – Present",
              "bullets": [
                "Coordinate branch planning, technical workshops, and committee communications; organized IEEE Day 2025, IEEE SPAx, and mentored students in the Electronics For All workshop.",
                "Represented the branch at the IEEE Conference Leadership Workshop 2026 and hosted student technical orientations."
              ]
            },
            {
              "header": "KEC Makerspace, Kathmandu Engineering College | Makerspace Ambassador",
              "sub": "June 2026 – Present",
              "bullets": [
                "Maintain the KEC Makerspace website (content updates, image repairs, interface fixes) and support campus 3D printing, laser fabrication, and embedded prototyping."
              ]
            }
          ]
        }
      ]
    }
  }
};
