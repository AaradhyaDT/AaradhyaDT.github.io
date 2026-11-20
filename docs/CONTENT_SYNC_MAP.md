# Content & Profile Sync Map (Layer 2)

Prevents drift between canonical engineering records, JSON data sources, generated runtime indexes, and rendered HTML pages.

---

## Canonical Dossier ↔ Site Surfaces

| Canonical Source | Target Pages / Assets | What Must Stay Aligned |
| :--- | :--- | :--- |
| [PROFILE.md](../PROFILE.md) (`PROF-001-ENGINEERING-PROFILE`) | [about.html](../about.html), [experience.html](../experience.html), [projects.html](../projects.html), [achievements.html](../achievements.html) | Engineering identity, academic standing, leadership roles, E0–E5 evidence tiers, and key project metrics |
| [data/quantitative-claims.json](../data/quantitative-claims.json) | HTML metric claims across pages | Checked by `verify.py` (`claim-provenance`) |
| [data/project-narratives.json](../data/project-narratives.json) & [data/project-summaries.json](../data/project-summaries.json) | [projects.html](../projects.html) | Project narratives, summaries, and category counts (47 projects) |
| [data/ecosystem.json](../data/ecosystem.json) | [projects.html](../projects.html) (`#constellation`, `#ecosystem`) | Working ecosystem nodes, edges, and categories |
| [data/output-captures.json](../data/output-captures.json) | Evidence & output capture views (`evidence.js`) | Captured outputs and media references |
| [data/master_cv.json](../data/master_cv.json) | [assets/js/data/resume-data.js](../assets/js/data/resume-data.js) | Structured CV/resume payload |

---

## Generated Runtime Data (`assets/js/data/`)

| File | Generator / Owner | Trigger |
| :--- | :--- | :--- |
| `search-index.js` | `scripts/extract_index.py` | Automatically updated by `.\sync.ps1` and `.github/workflows/update-search-index.yml` |
| `releases.js` | `scripts/site_automation.py` | Automatically bumped by `.\sync.ps1` (patch) or `.\sync.ps1 -Major` |
| `graph-data.js` | `scripts/generate_graph_data.py` | Regenerated from local `graphify-out/graph.json` when refreshing the 3D Knowledge Graph HUD |
| `assets/js/last-commit.json` | GitHub Actions (`stamp-last-commit.yml`) | Bot-managed on push; never edit manually |
