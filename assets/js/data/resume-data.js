/* Current portfolio CV content — reconciled with data/master_cv.json (2026-11-19).
 * Rebuild downloadable DOCX/PDF presets with scripts/compile_cv.py --all-presets. */
const RESUME_DATA = {
  "name": "Aaradhya Dev Tamrakar",
  "subtitle": "AI/ML Engineering · AI Systems & Workflow Tooling · Embedded AI · Model Evaluation",
  "contact": "Kathmandu, Nepal · aaradhyadevtmr@gmail.com · +977 9844602050 · linkedin.com/in/aaradhya-dev-tamrakar · github.com/AaradhyaDT · aaradhyadt.github.io",
  "summary": "Final-year (8th Semester) Electronics, Communication and Information Engineering student at IOE, Kathmandu Engineering College, building applied ML systems, AI workflow tooling, and embedded ML software. Fuse AI Fellow (Fusemachines) and NSSR DataCamp Fellow. Uses AI where it adds value, turns repeatable work into reusable tools, and checks results with tests and explicit evaluation.",
  "roles": {
    "all": {
      "title": "Engineering CV",
      "sections": [
        {
          "title": "Education",
          "items": [
            {
              "header": "Bachelor of Engineering in Electronics, Communication and Information Engineering",
              "sub": "Kathmandu Engineering College, IOE, Tribhuvan University | Dec 2022 – Expected Jan 2027",
              "bullets": [
                "Final Year (Year IV, Part II — 8th / Final Semester; cumulative average ~75%). Coursework includes artificial intelligence, machine learning, digital signal processing, embedded systems, control systems, and telecommunications."
              ]
            }
          ]
        },
        {
          "title": "Selected Engineering Projects",
          "items": [
            {
              "header": "BiasAperture | Computer Vision Demographic Fairness & Bias Audit",
              "sub": "Python · AIF360 · Fairlearn · Statistical Testing · Jinja2 · OpenCV",
              "bullets": [
                "Co-developed an automated prediction-auditing and HTML/PDF reporting pipeline with Tisha Manandhar as a two-person Fuse AI Fellowship capstone.",
                "Audited classification performance across 126 demographic bins on FairFace (97,698 images) with Disparate Impact, Demographic Parity, and Equalized Odds diagnostics; matched model comparisons remain active work."
              ]
            },
            {
              "header": "SPARK | Two-Layer Edge-AI Fall Detection Wearable",
              "sub": "ESP32-S3 · C/C++ · TFLite Micro · FreeRTOS · Python · SHAP",
              "bullets": [
                "Project lead for ML modeling, gateway processing, and explainability in a four-person team; firmware and hardware have dedicated owners.",
                "Trained subject-stratified 1D-CNN on SisFall (0.9185 AUC-ROC, 87.81% sensitivity) and quantized to an 18.5 KB INT8 model; on-device hardware testing, BLE streaming, and volunteer cohort validation remain pending."
              ]
            },
            {
              "header": "STRANGLER-IPU | Ingress Processing Unit Architecture Research",
              "sub": "Python · SimPy · CXL Memory Modeling · Discrete-Event Simulation · LaTeX",
              "bullets": [
                "Modeled near-ingress data offload over asymmetric CXL pooled-memory fabrics in SimPy, observing 4.12x tail-latency reduction and 68% host memory bus contention relief in simulation (research prototype; no physical silicon)."
              ]
            },
            {
              "header": "Fleet Orchestrator | AI Workflow Coordination & Tooling",
              "sub": "Python · FastAPI · Provider Adapters · MCP · SQLite",
              "bullets": [
                "Built coordination tooling for multi-step AI workflows with explicit task state, worker adapters, scheduling, failure handling, and live status inspection."
              ]
            },
            {
              "header": "Agent-Customization-Sync & Super-NLM | Cross-IDE & Knowledge Tooling",
              "sub": "Python · SHA-256 · Model Context Protocol (MCP) · Google Drive API",
              "bullets": [
                "Built cross-IDE configuration snapshots, guarded restore, rules transpilation, and SHA-256 drift audits across Antigravity, Cursor, and Claude Code.",
                "Built Super-NLM MCP server for multi-account NotebookLM search, Drive folder sync, and scheduled Studio artifact downloads."
              ]
            },
            {
              "header": "Headless LocalSend Substrate, Windows Pilot & GitHub Pilot",
              "sub": "Python · LAN P2P · ADB · Windows UIA · MCP · PowerShell",
              "bullets": [
                "Built zero-GUI LocalSend daemon and hardware-speed ADB transfer substrate alongside LocalSend, Google Classroom, and Typora MCP bridges.",
                "Built Windows Pilot (semantic UIA desktop automation) and GitHub Pilot (multi-account repository health and CI auditing)."
              ]
            },
            {
              "header": "Win-Governor, Win-Vault, Nepali OCR AI & Algorithmic Archive",
              "sub": "C# / .NET · Win32/NTFS · OpenCV · Tesseract · C++",
              "bullets": [
                "Built native Windows memory utility (1.2–3.4 GB working-set RAM reclamation), zero-dependency NTFS ACL folder locker, Devanagari OCR + Preeti/Unicode transcoder, and a 662-task IEEE-Xtreme archive with 500-gene Codon Stream library."
              ]
            }
          ]
        },
        {
          "title": "Fellowships",
          "items": [
            {
              "header": "Fuse AI Fellow | Fusemachines AI Fellowship 2026",
              "sub": "2026 – Present",
              "bullets": [
                "Completed applied ML, CV, NLP, agentic AI, and MLOps coursework spanning BiasAperture capstone, 5-stage Text-to-SQL, RAG & Verified Agentic Assistants, Trustworthy AI Guardrails, and MLflow/FastAPI/Evidently/Airflow pipelines."
              ]
            },
            {
              "header": "NSSR DataCamp Fellow | Cohort 2",
              "sub": "April 2026 – Present",
              "bullets": [
                "Completed applied GenAI data-cleaning and text-analysis projects and CPE credit certificates; continuing SQL and Python data-analysis pathways."
              ]
            }
          ]
        },
        {
          "title": "Technical Skills",
          "items": [
            {
              "header": "ML, Evaluation & Vision/NLP",
              "sub": "Python, PyTorch, scikit-learn, Pandas, NumPy, XGBoost, LightGBM, SHAP, AIF360, Fairlearn, OpenCV, MediaPipe, Qdrant, Pydantic, SimPy"
            },
            {
              "header": "AI Systems, MLOps & Backend",
              "sub": "FastAPI, Docker, Model Context Protocol (MCP), SQL (PostgreSQL, SQLite), asyncio, REST APIs, MLflow, Airflow, Evidently"
            },
            {
              "header": "Embedded, Edge AI & Native/Mobile",
              "sub": "C/C++, ESP32-S3, TFLite Micro, FreeRTOS, Arduino, IMU/UART/I2C/SPI/BLE, Kotlin (Jetpack Compose, CameraX), C#/.NET (Win32/NTFS)"
            },
            {
              "header": "Engineering Practice & Tooling",
              "sub": "Git, GitHub, Linux, PowerShell, Pytest, Automated Verification, Reproducible Configurations, WordCraft, LaTeX"
            }
          ]
        },
        {
          "title": "Leadership and Engineering Service",
          "items": [
            {
              "header": "IEEE KEC KTM Student Branch | Vice Chair",
              "sub": "2026 – Present (Vice Secretary, 2025 – 2026)",
              "bullets": [
                "Coordinate branch planning, technical workshops, IEEE Day 2025, IEEE SPAx, and Electronics For All mentoring."
              ]
            },
            {
              "header": "KEC Makerspace | Ambassador",
              "sub": "June 2026 – Present",
              "bullets": [
                "Maintain website content and interface fixes; certified in xTool laser safety and printer maintenance."
              ]
            },
            {
              "header": "Electronics Project Club | Event Manager",
              "sub": "2026 – Present (Resource Manager, 2024 – 2026)",
              "bullets": [
                "Coordinate event logistics, hardware inventory, Basic Electronics mentoring, and EPC Handover 2025 co-hosting."
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
              "header": "Bachelor of Engineering in Electronics, Communication and Information Engineering",
              "sub": "Kathmandu Engineering College, IOE, Tribhuvan University | Dec 2022 – Expected Jan 2027",
              "bullets": [
                "Final Year (Year IV, Part II — 8th Semester). Coursework includes artificial intelligence, machine learning, digital signal processing, probability and statistics, and control systems."
              ]
            }
          ]
        },
        {
          "title": "Selected Engineering Projects",
          "items": [
            {
              "header": "BiasAperture | Demographic performance auditing",
              "sub": "Python · AIF360 · Fairlearn · Statistical Testing · Jinja2 · OpenCV",
              "bullets": [
                "Co-developed a prediction-auditing and HTML/PDF reporting pipeline with Tisha Manandhar across 126 demographic bins on FairFace (97,698 images).",
                "Computes Disparate Impact, Demographic Parity, and Equalized Odds with cohort-support checks; matched model comparisons remain active work."
              ]
            },
            {
              "header": "SPARK | Wearable Edge-AI fall detection",
              "sub": "ESP32-S3 · TFLite Micro · Python · SHAP · Gateway APIs",
              "bullets": [
                "ML, gateway, and explainability lead in a four-person team; trained subject-stratified 1D-CNN on SisFall (0.9185 AUC-ROC, 87.81% sensitivity) quantized to 18.5 KB INT8.",
                "Offline model and software artifacts are available; hardware, BLE, and volunteer cohort validation remain pending."
              ]
            },
            {
              "header": "Fleet Orchestrator & Super-NLM | AI workflow coordination",
              "sub": "Python · FastAPI · Provider Adapters · MCP · SQLite",
              "bullets": [
                "Built coordination tooling for multi-step AI workflows with task state, worker adapters, scheduling, and live status inspection, plus multi-account NotebookLM MCP automation."
              ]
            },
            {
              "header": "Nepali OCR AI | Low-resource document intelligence",
              "sub": "Python · Tesseract OCR · OpenCV · Devanagari NLP",
              "bullets": [
                "Built document preprocessing, OCR extraction, Devanagari normalization, and bi-directional Preeti <-> Unicode transcoding."
              ]
            }
          ]
        },
        {
          "title": "Fellowships",
          "items": [
            {
              "header": "Fuse AI Fellow | Fusemachines",
              "sub": "2026 – Present",
              "bullets": [
                "Built 5-stage Text-to-SQL, RAG & Verified Agentic Assistants, Trustworthy AI Guardrails, Telco Churn/CLV (XGBoost/SHAP), and MLflow/FastAPI/Evidently/Airflow MLOps coursework alongside the BiasAperture capstone."
              ]
            },
            {
              "header": "NSSR DataCamp Fellow | Cohort 2",
              "sub": "April 2026 – Present",
              "bullets": [
                "Completed applied GenAI data-cleaning projects and CPE credits; continuing SQL and Python data-analysis pathways."
              ]
            }
          ]
        },
        {
          "title": "Technical Skills",
          "items": [
            {
              "header": "ML, Evaluation & Vision/NLP",
              "sub": "Python, PyTorch, scikit-learn, Pandas, NumPy, XGBoost, LightGBM, SHAP, AIF360, Fairlearn, OpenCV, Qdrant, Pydantic"
            },
            {
              "header": "AI Systems, MLOps & Backend",
              "sub": "FastAPI, Docker, SQL, PostgreSQL, SQLite, asyncio, MCP, MLflow, Airflow, Evidently"
            },
            {
              "header": "Embedded & Edge AI",
              "sub": "C/C++, ESP32-S3, TFLite Micro, FreeRTOS, Arduino, MediaPipe, Kotlin"
            },
            {
              "header": "Engineering Practice",
              "sub": "Git, Pytest, automated verification, reproducible configurations, model evaluation"
            }
          ]
        },
        {
          "title": "Leadership and Engineering Service",
          "items": [
            {
              "header": "IEEE KEC KTM Student Branch | Vice Chair",
              "sub": "2026 – Present",
              "bullets": [
                "Coordinate branch planning, technical activities, and committee communication; previously Vice Secretary, 2025–2026."
              ]
            },
            {
              "header": "KEC Makerspace | Ambassador",
              "sub": "June 2026 – Present",
              "bullets": [
                "Maintain website content and interface fixes."
              ]
            },
            {
              "header": "Electronics Project Club | Event Manager",
              "sub": "2026 – Present",
              "bullets": [
                "Coordinate event logistics and delivery; previously Resource Manager, 2024–2026."
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
              "header": "Bachelor of Engineering in Electronics, Communication and Information Engineering",
              "sub": "Kathmandu Engineering College, IOE, Tribhuvan University | Dec 2022 – Expected Jan 2027",
              "bullets": [
                "Final Year (Year IV, Part II — 8th Semester). Coursework includes embedded systems, microprocessors, digital signal processing, control systems, and telecommunications."
              ]
            }
          ]
        },
        {
          "title": "Embedded, Systems and Robotics Projects",
          "items": [
            {
              "header": "SPARK | Two-Layer Edge-AI Fall Detection Wearable",
              "sub": "ESP32-S3 · C/C++ · TFLite Micro · FreeRTOS · MPU-6050",
              "bullets": [
                "Project lead for ML modeling, gateway processing, and explainability in a four-person team; quantized 1D-CNN to 18.5 KB INT8 (0.9185 SisFall AUC-ROC).",
                "Offline model and software artifacts are available; hardware, on-device, BLE, and volunteer cohort validation remain pending."
              ]
            },
            {
              "header": "STRANGLER-IPU | Ingress Processing Unit Architecture Research",
              "sub": "Python · SimPy · CXL Memory Modeling · Discrete-Event Simulation",
              "bullets": [
                "Simulated near-ingress offload over CXL pooled-memory fabrics (4.12x tail-latency reduction and 68% host memory contention relief in simulation; research prototype)."
              ]
            },
            {
              "header": "Win-Governor (NovaOptimizer), Win-Vault & Headless LocalSend",
              "sub": "C#/.NET · Win32/NTFS · Python · LAN P2P · ADB",
              "bullets": [
                "Built native Windows memory utility (1.2–3.4 GB working-set RAM reclamation), zero-dependency NTFS ACL folder locking, and silent LAN/ADB transfer daemon."
              ]
            },
            {
              "header": "Gesture-Controlled Self-Balancing Robot (GCSBR)",
              "sub": "Arduino · C++ · MPU-6050 · PID · Kotlin · MediaPipe · CameraX",
              "bullets": [
                "Implemented PID balance stabilization firmware and an Android gesture-control interface over Bluetooth."
              ]
            }
          ]
        },
        {
          "title": "Technical Skills",
          "items": [
            {
              "header": "Embedded & Edge AI",
              "sub": "C/C++, ESP32-S3, TFLite Micro, FreeRTOS, Arduino, IMU/UART/I2C/SPI/BLE, EasyEDA/Proteus"
            },
            {
              "header": "Systems & Native/Mobile",
              "sub": "C#/.NET (Win32 & NTFS APIs), Python, PowerShell, Linux, Kotlin (Jetpack Compose, CameraX), SimPy"
            },
            {
              "header": "ML & Evaluation",
              "sub": "PyTorch, scikit-learn, NumPy, Pandas, OpenCV, MediaPipe, SHAP"
            },
            {
              "header": "Engineering Practice",
              "sub": "Git, Pytest, automated verification, reproducible configurations, LaTeX"
            }
          ]
        },
        {
          "title": "Leadership and Engineering Service",
          "items": [
            {
              "header": "IEEE KEC KTM Student Branch | Vice Chair",
              "sub": "2026 – Present",
              "bullets": [
                "Coordinate branch planning, technical activities, and committee communication; previously Vice Secretary, 2025–2026."
              ]
            },
            {
              "header": "KEC Makerspace | Ambassador",
              "sub": "June 2026 – Present",
              "bullets": [
                "Maintain website content and interface fixes; certified in xTool laser safety and printer maintenance."
              ]
            },
            {
              "header": "Electronics Project Club | Event Manager",
              "sub": "2026 – Present",
              "bullets": [
                "Coordinate event logistics, hardware inventory, and mentoring; previously Resource Manager, 2024–2026."
              ]
            }
          ]
        },
        {
          "title": "Fellowships",
          "items": [
            {
              "header": "Fuse AI Fellow | Fusemachines",
              "sub": "2026 – Present",
              "bullets": [
                "Built applied ML and agentic coursework spanning classification, explainability, APIs, and MLOps; co-developed the BiasAperture capstone with Tisha Manandhar."
              ]
            },
            {
              "header": "NSSR DataCamp Fellow | Cohort 2",
              "sub": "April 2026 – Present",
              "bullets": [
                "Completed applied GenAI projects; continuing SQL and Python data-analysis pathways."
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
              "header": "Bachelor of Engineering in Electronics, Communication and Information Engineering",
              "sub": "Kathmandu Engineering College, IOE, Tribhuvan University | Dec 2022 – Expected Jan 2027",
              "bullets": [
                "Final Year (Year IV, Part II — 8th Semester). Coursework includes artificial intelligence, machine learning, computer networks, and object-oriented programming."
              ]
            }
          ]
        },
        {
          "title": "AI and Developer Infrastructure",
          "items": [
            {
              "header": "Fleet Orchestrator | AI workflow coordination",
              "sub": "Python · FastAPI · Provider Adapters · MCP · SQLite",
              "bullets": [
                "Built coordination tooling for multi-step AI workflows with task state, worker adapters, scheduling, failure handling, and live status inspection."
              ]
            },
            {
              "header": "Agent-Customization-Sync | Cross-IDE configuration tooling",
              "sub": "Python · SHA-256 · MCP Configuration",
              "bullets": [
                "Built configuration snapshots, guarded restore, rules transpilation, and SHA-256 drift audits across Antigravity, Cursor, and Claude Code."
              ]
            },
            {
              "header": "Super-NLM, Headless LocalSend & Utility MCP Suite",
              "sub": "Python · Model Context Protocol (MCP) · LAN P2P · ADB · FastAPI",
              "bullets": [
                "Built multi-account NotebookLM MCP hub, zero-GUI LocalSend/ADB transfer substrate, and MCP bridges for LocalSend, Google Classroom, and Typora."
              ]
            },
            {
              "header": "Windows Pilot, GitHub Pilot & Verified Portfolio Platform",
              "sub": "Python · Windows UIA · Vanilla HTML/CSS/ES6 · Web Crypto (AES-256-GCM)",
              "bullets": [
                "Built semantic UIA desktop automation, multi-account GitHub health auditing, and a zero-build-step PWA portfolio validated by a 26-category verification suite."
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
              "header": "ML & Evaluation",
              "sub": "Python, PyTorch, scikit-learn, Pandas, NumPy, XGBoost, SHAP, AIF360, Fairlearn, Qdrant, Pydantic"
            },
            {
              "header": "Embedded & Native/Mobile",
              "sub": "C/C++, ESP32-S3, TFLite Micro, Kotlin (Jetpack Compose), C#/.NET (Win32/NTFS)"
            },
            {
              "header": "Engineering Practice",
              "sub": "Git, GitHub, Linux, PowerShell, Pytest, automated verification, reproducible configurations"
            }
          ]
        },
        {
          "title": "Fellowships",
          "items": [
            {
              "header": "Fuse AI Fellow | Fusemachines",
              "sub": "2026 – Present",
              "bullets": [
                "Built RAG & Verified Agentic Assistants, Trustworthy AI Guardrails, 5-stage Text-to-SQL, and dual-track MLOps coursework alongside the BiasAperture capstone."
              ]
            },
            {
              "header": "NSSR DataCamp Fellow | Cohort 2",
              "sub": "April 2026 – Present",
              "bullets": [
                "Completed applied GenAI projects and CPE credit certificates; continuing SQL and Python pathways."
              ]
            }
          ]
        },
        {
          "title": "Leadership and Engineering Service",
          "items": [
            {
              "header": "IEEE KEC KTM Student Branch | Vice Chair",
              "sub": "2026 – Present",
              "bullets": [
                "Coordinate branch planning, technical activities, and committee communication; previously Vice Secretary, 2025–2026."
              ]
            },
            {
              "header": "KEC Makerspace | Ambassador",
              "sub": "June 2026 – Present",
              "bullets": [
                "Maintain website content and interface fixes."
              ]
            },
            {
              "header": "Electronics Project Club | Event Manager",
              "sub": "2026 – Present",
              "bullets": [
                "Coordinate event logistics and delivery; previously Resource Manager, 2024–2026."
              ]
            }
          ]
        }
      ]
    }
  }
};
