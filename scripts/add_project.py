#!/usr/bin/env python3
"""
add_project.py — Deterministic, Token-Zero Project Onboarding Engine
for Aaradhya-Dev-Tamrakar.github.io (v54.5+)

Automates the repetitive, error-prone tasks when adding a project to the portfolio:
1. Detects existing project cards and computes next contiguous ID (e.g. p-035 / P — 035).
2. Derives payload slug and encrypts GitHub URL using AES-256-GCM (PBKDF2) into access.js.
3. Generates fully-accessible, semantic <details class="project-card"> HTML.
4. Injects card into chosen section ('personal' or 'projects').
5. Recalculates all filter pill counters ('All', 'aiml', 'embedded', 'hardware', 'apps') directly from DOM.
6. Rebuilds search index and executes verify.py verification gate.

Usage:
  # From JSON manifest:
  python scripts/add_project.py --from-json manifest.json

  # Direct CLI flags:
  python scripts/add_project.py --title "My Tool" --repo "https://github.com/..." --category apps aiml --bullets "Feature 1" "Feature 2" --tags "Python" "FastAPI"

  # Dry run (preview without modifying any files):
  python scripts/add_project.py --from-json manifest.json --dry-run

  # Interactive mode:
  python scripts/add_project.py --interactive
"""

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from bs4 import BeautifulSoup

# Paths
ROOT = Path(__file__).resolve().parent.parent
SCRIPTS_DIR = ROOT / "scripts"
PROJECTS_HTML = ROOT / "projects.html"
ACCESS_JS = ROOT / "assets" / "js" / "modules" / "access.js"
EXTRACT_INDEX_PY = SCRIPTS_DIR / "extract_index.py"
VERIFY_PY = SCRIPTS_DIR / "verify.py"

# Import existing manage_payloads module
sys.path.insert(0, str(SCRIPTS_DIR))
try:
    import manage_payloads
except ImportError:
    manage_payloads = None

VALID_CATEGORIES = ["aiml", "embedded", "hardware", "apps"]
KNOWN_STATUSES = ["In Progress", "Active Research", "Archived", "Completed"]


def get_next_project_id(soup: BeautifulSoup) -> tuple[str, str, int]:
    """
    Finds all existing project cards with id="p-XXX",
    computes max + 1, and returns (id_str, display_str, int_val).
    E.g. ("p-035", "P — 035", 35).
    """
    card_ids = []
    for card in soup.find_all("details", class_="project-card"):
        cid = card.get("id", "")
        m = re.match(r"^p-(\d+)$", cid)
        if m:
            card_ids.append(int(m.group(1)))

    next_num = max(card_ids) + 1 if card_ids else 1
    id_str = f"p-{next_num:03d}"
    display_str = f"P — {next_num:03d}"
    return id_str, display_str, next_num


def derive_payload_slug(repo_url: str, title: str) -> str:
    """Derives a clean payload key like 'proj-repo-name'."""
    repo_clean = repo_url.strip().rstrip("/")
    if "/" in repo_clean:
        name = repo_clean.split("/")[-1].lower()
    else:
        name = title.split("—")[0].strip().lower()
    name = re.sub(r"[^a-z0-9]+", "-", name).strip("-")
    if not name.startswith("proj-"):
        name = f"proj-{name}"
    return name


def build_card_soup(
    card_id: str,
    display_index: str,
    title: str,
    status_or_date: str,
    categories: list[str],
    bullets: list[str],
    tags: list[str],
    payload_id: str,
    tier: str = "vip",
    evidence_repo: str = None
) -> BeautifulSoup:
    """Constructs the exact HTML card node."""
    cat_str = " ".join(categories)

    # Determine status vs date badge
    is_special_status = status_or_date in ["In Progress", "Active Research", "Archived"]
    badge_html = (
        f'<span class="project-status">{status_or_date}</span>'
        if is_special_status
        else f'<span class="project-date">{status_or_date}</span>'
    )

    card_class = "project-card reveal"
    if status_or_date == "In Progress":
        card_class += " project-card--in-progress"
    elif status_or_date == "Active Research":
        card_class += " project-card--major"

    evidence_attr = f' data-evidence-repo="{evidence_repo}"' if evidence_repo else ""
    tier_attr = f' data-payload-tier="{tier.lower()}"' if tier.lower() == "master" else ""

    bullet_items = "".join(f"<li>{b}</li>\n" for b in bullets)
    tag_items = "".join(f'<span class="tag">{t}</span>' for t in tags)

    card_html = f"""<details class="{card_class}" data-category="{cat_str}"{evidence_attr} id="{card_id}">
<summary class="project-summary">
<div class="project-index">{display_index} {badge_html}</div>
<h3 class="project-title">{title}</h3>
</summary>
<div class="project-card-body">
<ul class="project-desc-list">
{bullet_items}</ul>
<div class="project-tags">
{tag_items}
</div>
<a class="project-link" data-payload-link-id="{payload_id}"{tier_attr} rel="noopener" target="_blank">View on GitHub ↗</a>
</div>
</details>"""

    return BeautifulSoup(card_html, "html.parser")


def recalculate_filter_counts(soup: BeautifulSoup) -> dict[str, int]:
    """Recalculates exact category counts across all project cards in DOM."""
    cards = soup.find_all("details", class_="project-card")
    total_count = len(cards)

    counts = {"all": total_count}
    for cat in VALID_CATEGORIES:
        counts[cat] = 0

    for card in cards:
        card_cats = card.get("data-category", "").split()
        for cat in VALID_CATEGORIES:
            if cat in card_cats:
                counts[cat] += 1

    # Update HTML filter pill counters
    filter_bar = soup.find(id="projectsFilterBar")
    if filter_bar:
        for btn in filter_bar.find_all("button", class_="proj-filter-btn"):
            data_filter = btn.get("data-filter")
            if data_filter in counts:
                count_span = btn.find("span", class_="proj-filter-count")
                if count_span:
                    count_span.string = str(counts[data_filter])

    return counts


def inject_card(soup: BeautifulSoup, card_soup: BeautifulSoup, section: str = "personal", position: str = "top"):
    """Injects the new card into the specified section in projects.html."""
    target_h2_id = "section-personal" if section == "personal" else "section-projects"
    h2 = soup.find("h2", id=target_h2_id)
    if not h2:
        raise ValueError(f"Could not find section header #{target_h2_id} in projects.html")

    new_node = card_soup.find("details")

    if position == "top":
        # Insert immediately following the section <h2>
        h2.insert_after(new_node)
    else:
        # Insert before the next section header or end of grid
        curr = h2.next_sibling
        last_card = None
        while curr:
            if curr.name == "h2" and "projects-section-title" in curr.get("class", []):
                break
            if curr.name == "details" and "project-card" in curr.get("class", []):
                last_card = curr
            curr = curr.next_sibling

        if last_card:
            last_card.insert_after(new_node)
        else:
            h2.insert_after(new_node)


def encrypt_and_register_link(payload_id: str, repo_url: str, tier: str = "vip") -> str:
    """Encrypts repo URL and registers it in access.js."""
    if not manage_payloads:
        raise RuntimeError("manage_payloads.py could not be imported")

    passcode = "master2026" if tier.lower() == "master" else "vip2026"
    hex_cipher = manage_payloads.encrypt_payload(repo_url, passcode)

    payloads = manage_payloads.read_access_payloads()
    payloads[payload_id] = hex_cipher
    manage_payloads.write_access_payloads(payloads)
    return hex_cipher


def add_project(
    title: str,
    repo_url: str,
    categories: list[str],
    bullets: list[str],
    tags: list[str],
    status_or_date: str = "In Progress",
    evidence_repo: str = None,
    section: str = "personal",
    tier: str = "vip",
    position: str = "top",
    dry_run: bool = False,
    run_verify: bool = True
) -> dict:
    """Main execution function for adding a project."""
    if not PROJECTS_HTML.exists():
        raise FileNotFoundError(f"projects.html not found at {PROJECTS_HTML}")

    html_content = PROJECTS_HTML.read_text(encoding="utf-8")
    soup = BeautifulSoup(html_content, "html.parser")

    # 1. Compute contiguous ID
    card_id, display_index, int_id = get_next_project_id(soup)
    payload_id = derive_payload_slug(repo_url, title)

    # 2. Build Card Node
    card_soup = build_card_soup(
        card_id=card_id,
        display_index=display_index,
        title=title,
        status_or_date=status_or_date,
        categories=categories,
        bullets=bullets,
        tags=tags,
        payload_id=payload_id,
        tier=tier,
        evidence_repo=evidence_repo
    )

    generated_html = card_soup.prettify()

    # 3. Inject Node
    inject_card(soup, card_soup, section=section, position=position)

    # 4. Recount filter pills
    new_counts = recalculate_filter_counts(soup)

    if dry_run:
        return {
            "status": "dry_run",
            "card_id": card_id,
            "display_index": display_index,
            "payload_id": payload_id,
            "tier": tier,
            "filter_counts": new_counts,
            "html": generated_html
        }

    # Live Mode:
    # 5. Encrypt and register link
    hex_payload = encrypt_and_register_link(payload_id, repo_url, tier=tier)

    # 6. Save projects.html
    PROJECTS_HTML.write_text(str(soup), encoding="utf-8")

    # 7. Rebuild search index & run verify
    index_success = False
    verify_output = ""
    if run_verify:
        if EXTRACT_INDEX_PY.exists():
            subprocess.run([sys.executable, str(EXTRACT_INDEX_PY)], check=False)
            index_success = True
        if VERIFY_PY.exists():
            res = subprocess.run([sys.executable, str(VERIFY_PY)], capture_output=True, text=True)
            verify_output = res.stdout

    return {
        "status": "success",
        "card_id": card_id,
        "display_index": display_index,
        "payload_id": payload_id,
        "hex_payload": hex_payload,
        "filter_counts": new_counts,
        "search_indexed": index_success,
        "verified": "ALL 25 CHECKS PASSED" in verify_output
    }


def interactive_mode():
    """Prompts the user interactively in the terminal for project details."""
    print("\n--- Interactive Project Onboarding ---")
    title = input("Project Title (e.g. 'Windows Pilot — Semantic UIA...'): ").strip()
    if not title:
        print("Error: Title cannot be empty.")
        sys.exit(1)

    repo_url = input("GitHub Repo URL: ").strip()
    if not repo_url:
        print("Error: Repo URL cannot be empty.")
        sys.exit(1)

    print("\nAvailable categories: aiml, embedded, hardware, apps")
    cat_input = input("Categories (space or comma separated): ").strip()
    categories = [c.strip().lower() for c in re.split(r"[\s,]+", cat_input) if c.strip()]
    if not categories:
        categories = ["apps"]

    status_or_date = input("Status or Date (e.g. 'Sep 2026' or 'In Progress') [In Progress]: ").strip()
    if not status_or_date:
        status_or_date = "In Progress"

    evidence_repo = input("Evidence Repo (optional, e.g. AaradhyaDT/repo): ").strip() or None

    print("\nEnter 2-3 technical description bullet points (blank line to finish):")
    bullets = []
    while True:
        b = input(f"  Bullet {len(bullets)+1}: ").strip()
        if not b:
            break
        bullets.append(b)

    if not bullets:
        bullets = ["Initial project release and architecture implementation."]

    tags_input = input("\nTags (comma separated, e.g. 'Python, FastAPI, Win32'): ").strip()
    tags = [t.strip() for t in tags_input.split(",") if t.strip()]

    section = input("\nTarget section ('personal' or 'projects') [personal]: ").strip().lower()
    if section not in ["personal", "projects"]:
        section = "personal"

    tier = input("Access Tier ('vip' or 'master') [vip]: ").strip().lower()
    if tier not in ["vip", "master"]:
        tier = "vip"

    confirm = input("\nProceed with live addition? (y/n) [y]: ").strip().lower()
    dry_run = confirm == "n"

    res = add_project(
        title=title,
        repo_url=repo_url,
        categories=categories,
        bullets=bullets,
        tags=tags,
        status_or_date=status_or_date,
        evidence_repo=evidence_repo,
        section=section,
        tier=tier,
        dry_run=dry_run
    )
    print("\nResult:", json.dumps(res, indent=2))


def main():
    parser = argparse.ArgumentParser(description="Deterministic Token-Zero Project Onboarding Engine")
    parser.add_argument("--from-json", "-f", type=Path, help="Path to JSON project manifest")
    parser.add_argument("--title", "-t", type=str, help="Project title")
    parser.add_argument("--repo", "-r", "--repo-url", type=str, help="GitHub repository URL")
    parser.add_argument("--category", "-c", nargs="+", help="Category (aiml, embedded, hardware, apps)")
    parser.add_argument("--bullets", "-b", nargs="+", help="Technical description bullet points")
    parser.add_argument("--tags", nargs="+", help="Project tags")
    parser.add_argument("--status", "--date", "-s", type=str, default="In Progress", help="Date or status string")
    parser.add_argument("--evidence-repo", type=str, help="Evidence repository slug (Owner/Repo)")
    parser.add_argument("--section", choices=["personal", "projects"], default="personal", help="Section header")
    parser.add_argument("--tier", choices=["vip", "master"], default="vip", help="Security access tier")
    parser.add_argument("--position", choices=["top", "bottom"], default="top", help="Insertion position in section")
    parser.add_argument("--dry-run", "-d", action="store_true", help="Preview without modifying disk")
    parser.add_argument("--no-verify", action="store_true", help="Skip search indexing and verification")
    parser.add_argument("--interactive", "-i", action="store_true", help="Launch interactive wizard")

    args = parser.parse_args()

    if args.interactive:
        interactive_mode()
        return

    if args.from_json:
        if not args.from_json.exists():
            print(f"Error: Manifest file {args.from_json} does not exist.")
            sys.exit(1)
        data = json.loads(args.from_json.read_text(encoding="utf-8"))
        res = add_project(
            title=data.get("title"),
            repo_url=data.get("repo_url") or data.get("repo"),
            categories=data.get("categories") or data.get("category", ["apps"]),
            bullets=data.get("bullets", []),
            tags=data.get("tags", []),
            status_or_date=data.get("status") or data.get("date", "In Progress"),
            evidence_repo=data.get("evidence_repo"),
            section=data.get("section", "personal"),
            tier=data.get("tier", "vip"),
            position=data.get("position", "top"),
            dry_run=args.dry_run or data.get("dry_run", False),
            run_verify=not args.no_verify
        )
        print(json.dumps(res, indent=2))
        return

    if not args.title or not args.repo:
        parser.print_help()
        sys.exit(1)

    categories = []
    if args.category:
        for c in args.category:
            categories.extend([x.strip().lower() for x in re.split(r"[\s,]+", c) if x.strip()])
    if not categories:
        categories = ["apps"]

    bullets = args.bullets or ["Initial implementation and deployment."]
    tags = []
    if args.tags:
        for t in args.tags:
            tags.extend([x.strip() for x in t.split(",") if x.strip()])

    res = add_project(
        title=args.title,
        repo_url=args.repo,
        categories=categories,
        bullets=bullets,
        tags=tags,
        status_or_date=args.status,
        evidence_repo=args.evidence_repo,
        section=args.section,
        tier=args.tier,
        position=args.position,
        dry_run=args.dry_run,
        run_verify=not args.no_verify
    )
    print(json.dumps(res, indent=2))


if __name__ == "__main__":
    main()
