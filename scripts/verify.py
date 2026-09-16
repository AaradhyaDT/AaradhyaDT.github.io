#!/usr/bin/env python3
"""
verify.py — comprehensive structural integrity checker for
aaradhyadt.github.io (v54.5)

25 check categories covering HTML structure, cross-page links, asset
references, JS syntax, JS unit tests, CSP integrity, JS runtime safety,
CSS URL integrity, deep a11y & SEO, version consistency across all modules,
semantic data consistency, PWA compliance, file size budgets, markdown hygiene,
and more.

Run:  python scripts/verify.py            # standard output
      python scripts/verify.py --verbose  # show passes too
      python scripts/verify.py --fix      # auto-fix trivial issues

Exit codes: 0 = clean, 1 = errors, 2 = warnings only
Requires: beautifulsoup4
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

# Force UTF-8 output on Windows
if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except AttributeError:
        pass  # Python < 3.7

from bs4 import BeautifulSoup

# ── Paths ───────────────────────────────────────────────────────────
ROOT = Path(__file__).resolve().parent.parent
SCRIPT_JS = ROOT / "assets" / "js" / "script.js"
BG_ANIMATIONS_JS = ROOT / "assets" / "js" / "bg-animations.js"
SW_JS = ROOT / "sw.js"
SITEMAP_XML = ROOT / "sitemap.xml"
MANIFEST = ROOT / "site.webmanifest"
ROBOTS_TXT = ROOT / "robots.txt"
CSS_MODULES_DIR = ROOT / "assets" / "css" / "modules"
MODULES_DIR = ROOT / "assets" / "js" / "modules"
DATA_DIR = ROOT / "assets" / "js" / "data"
RELEASES_JS = DATA_DIR / "releases.js"
RESUME_DATA_JS = DATA_DIR / "resume-data.js"
TRACKER_MD = ROOT / "dev-logs" / "PortfolioWebsite_TRACKER.md"
SITE_AUTOMATION_PY = ROOT / "scripts" / "site_automation.py"
VERSION_FILE = ROOT / "VERSION"
README_MD = ROOT / "README.md"
PYPROJECT_TOML = ROOT / "pyproject.toml"
WORKFLOW_VERIFY_YML = ROOT / ".github" / "workflows" / "verify.yml"
QUANTITATIVE_CLAIMS = ROOT / "data" / "quantitative-claims.json"
BRAINSTORM_CLAIMS = ROOT / "data" / "brainstorm-claims.json"

# ── State ───────────────────────────────────────────────────────────
errors = []
warnings = []
passes = []

# ── ANSI Colors ─────────────────────────────────────────────────────
USE_COLOR = sys.stdout.isatty() and os.name != "nt" or os.environ.get("FORCE_COLOR")

def _c(code, text):
    return f"\033[{code}m{text}\033[0m" if USE_COLOR else text

def red(t):    return _c("31", t)
def yellow(t): return _c("33", t)
def green(t):  return _c("32", t)
def cyan(t):   return _c("36", t)
def bold(t):   return _c("1", t)
def dim(t):    return _c("2", t)

# ── Helpers ─────────────────────────────────────────────────────────
def get_html_files():
    """Return sorted list of site HTML files (excluding google verification)."""
    return sorted([f for f in ROOT.glob("*.html") if not f.name.startswith("google")])

def read_html(path):
    return path.read_text(encoding="utf-8")

def parse_html(path):
    return BeautifulSoup(read_html(path), "html.parser")

def log_error(category, msg):
    errors.append((category, msg))

def log_warning(category, msg):
    warnings.append((category, msg))

def log_pass(category, msg):
    passes.append((category, msg))

def check_quantitative_claims():
    """Validate claim provenance without accepting mutable or placeholder refs."""
    required = {
        "claim", "source_repo", "source_path", "source_commit", "metric",
        "value", "evidence_tier", "verification_method", "verification_test",
        "scope", "status",
        "limitations", "last_verified",
    }
    if not QUANTITATIVE_CLAIMS.exists():
        log_error("claim-provenance", "Missing data/quantitative-claims.json")
        return
    try:
        payload = json.loads(QUANTITATIVE_CLAIMS.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        log_error("claim-provenance", f"Invalid quantitative claims JSON: {exc}")
        return
    claims = payload.get("claims")
    if payload.get("schema_version") != "1.1" or not isinstance(claims, list) or not claims:
        log_error("claim-provenance", "Claims record has an invalid schema or no claims")
        return
    sha_re = re.compile(r"^[0-9a-f]{40}$")
    repo_re = re.compile(r"^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$")
    valid_statuses = {"verified", "needs_review"}
    for index, claim in enumerate(claims, start=1):
        missing = sorted(required - set(claim))
        if missing:
            log_error("claim-provenance", f"Claim {index} missing fields: {', '.join(missing)}")
            continue
        if claim["evidence_tier"] not in {"E0", "E1", "E2", "E3", "E4", "E5"}:
            log_error("claim-provenance", f"Claim {index} has invalid evidence tier")
        if claim["status"] not in valid_statuses:
            log_error("claim-provenance", f"Claim {index} has invalid status")
        if not repo_re.fullmatch(str(claim["source_repo"])):
            log_error("claim-provenance", f"Claim {index} has an invalid repository reference")
        source_path = str(claim["source_path"])
        if not source_path or source_path.startswith(("/", "\\")) or ".." in Path(source_path).parts:
            log_error("claim-provenance", f"Claim {index} has an invalid repository path")
        for field in ("verification_test", "metric", "scope"):
            if not isinstance(claim[field], str) or not claim[field].strip():
                log_error("claim-provenance", f"Claim {index} has an empty {field} reference")
        commit = claim["source_commit"]
        if claim["status"] == "verified":
            if not isinstance(commit, str) or not sha_re.fullmatch(commit):
                log_error("claim-provenance", f"Claim {index} requires a full immutable source_commit SHA")
        elif commit not in (None, ""):
            log_error("claim-provenance", f"Claim {index} needs review but has a non-immutable source_commit")
        if claim["status"] == "needs_review" and not str(claim.get("review_reason", "")).strip():
            log_error("claim-provenance", f"Claim {index} needs_review records require review_reason")
    if BRAINSTORM_CLAIMS.exists():
        try:
            imported = json.loads(BRAINSTORM_CLAIMS.read_text(encoding="utf-8"))
            if not isinstance(imported.get("claims"), list):
                log_error("claim-provenance", "Local brainstorm manifest must contain a claims list")
            else:
                log_pass("claim-provenance", f"Local brainstorm manifest loaded ({len(imported['claims'])} claims)")
        except (OSError, json.JSONDecodeError) as exc:
            log_error("claim-provenance", f"Invalid local brainstorm manifest: {exc}")
    if not any(error[0] == "claim-provenance" for error in errors):
        review_count = sum(claim.get("status") == "needs_review" for claim in claims)
        suffix = f"; {review_count} explicitly need immutable-source review" if review_count else ""
        log_pass("claim-provenance", f"{len(claims)} quantitative claims have structurally complete provenance{suffix}")
    projects_path = ROOT / "projects.html"
    if projects_path.exists():
        soup = parse_html(projects_path)
        claim_repos = {str(claim.get("source_repo", "")).strip() for claim in claims}
        bound_repos = {
            str(card.get("data-evidence-repo", "")).strip()
            for card in soup.select("details.project-card[data-evidence-repo]")
        }
        unknown = sorted(repo for repo in bound_repos if repo and repo not in claim_repos)
        if unknown:
            log_error("claim-provenance", "Project evidence binding has no canonical claim: " + ", ".join(unknown))
        elif bound_repos:
            log_pass("claim-provenance", f"{len(bound_repos)} project cards are bound to canonical evidence claims")

# ── Page config for content checks ──────────────────────────────────
PAGES = {
    "achievements": {
        "file": ROOT / "achievements.html",
        "container": "#achievementsList",
        "item": ".achievement-item",
        "id_prefix": "achv-",
    },
    "projects": {
        "file": ROOT / "projects.html",
        "container": "#projectsGrid",
        "item": ".project-card",
        "id_prefix": "p-",
    },
    "journey": {
        "file": ROOT / "journey.html",
        "container": "#journeyTrack",
        "item": ".journey-node",
        "id_prefix": "j-",
    },
}


# ════════════════════════════════════════════════════════════════════
#  CHECK 1: Content IDs (achievements, projects, journey)
# ════════════════════════════════════════════════════════════════════
def check_ids(name, cfg):
    """Every item must have an id; ids must be unique within the file."""
    cat = "ids"
    if not cfg["file"].exists():
        log_error(cat, f"[{name}] file not found: {cfg['file']}")
        return None
    soup = parse_html(cfg["file"])
    container = soup.select_one(cfg["container"])
    if container is None:
        log_error(cat, f"[{name}] container '{cfg['container']}' not found")
        return None
    items = container.select(cfg["item"])
    if not items:
        log_error(cat, f"[{name}] zero items found under "
                       f"'{cfg['container']} {cfg['item']}'")
        return None

    seen = {}
    missing = 0
    for i, el in enumerate(items):
        el_id = el.get("id")
        if not el_id:
            missing += 1
            continue
        seen.setdefault(el_id, []).append(i)

    if missing:
        log_warning(cat, f"[{name}] {missing} item(s) missing an id")

    dupes = {k: v for k, v in seen.items() if len(v) > 1}
    for el_id, positions in dupes.items():
        log_error(cat, f"[{name}] duplicate id '{el_id}' at positions {positions}")

    if cfg["id_prefix"]:
        bad_prefix = [k for k in seen if not k.startswith(cfg["id_prefix"])]
        if bad_prefix:
            log_warning(cat, f"[{name}] id(s) not matching prefix "
                              f"'{cfg['id_prefix']}': {bad_prefix}")

    if not dupes:
        log_pass(cat, f"[{name}] {len(items)} items, all IDs unique")

    return {"count": len(items), "ids": set(seen.keys())}


# ════════════════════════════════════════════════════════════════════
#  CHECK 2: Internal href resolution (content pages)
# ════════════════════════════════════════════════════════════════════
def check_internal_hrefs(name, cfg, valid_ids):
    """href="<file>.html#<id>" anchors must resolve."""
    cat = "hrefs"
    site_files = get_html_files()
    target = cfg["file"].name
    pattern = re.compile(rf'href="{re.escape(target)}#([^"]+)"')
    found_issues = False
    for f in site_files:
        text = read_html(f)
        for m in pattern.finditer(text):
            frag = m.group(1)
            if frag in ("main-content",):
                continue
            if frag not in valid_ids:
                log_error(cat, f"[{name}] {f.name} links to "
                               f"'{target}#{frag}' — id does not exist")
                found_issues = True
    if not found_issues:
        log_pass(cat, f"[{name}] all fragment links resolve correctly")


# ════════════════════════════════════════════════════════════════════
#  CHECK 3: Tag balance (HTMLParser-based)
# ════════════════════════════════════════════════════════════════════
def check_tag_balance(name, file_path):
    from html.parser import HTMLParser

    cat = "tags"
    void_elements = {
        "area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr",
    }

    class BalanceChecker(HTMLParser):
        def __init__(self):
            super().__init__(convert_charrefs=True)
            self.stack = []
            self.issues = []
            self._in_raw = None

        def handle_starttag(self, tag, attrs):
            if self._in_raw:
                return
            if tag in ("script", "style"):
                self._in_raw = tag
                return
            if tag in void_elements:
                return
            self.stack.append(tag)

        def handle_startendtag(self, tag, attrs):
            pass

        def handle_endtag(self, tag):
            if self._in_raw:
                if tag == self._in_raw:
                    self._in_raw = None
                return
            if not self.stack:
                self.issues.append(f"stray closing tag </{tag}> with no open tag")
                return
            if self.stack[-1] == tag:
                self.stack.pop()
            elif tag in self.stack:
                unclosed = []
                while self.stack and self.stack[-1] != tag:
                    unclosed.append(self.stack.pop())
                self.stack.pop()
                self.issues.append(f"</{tag}> closed out of order — "
                                    f"unclosed tag(s) in between: {unclosed}")
            else:
                self.issues.append(f"closing tag </{tag}> does not match "
                                    f"any open tag on the stack")

    text = file_path.read_text(encoding="utf-8")
    checker = BalanceChecker()
    checker.feed(text)
    checker.close()

    for issue in checker.issues:
        log_error(cat, f"[{name}] {issue}")
    if checker.stack:
        log_error(cat, f"[{name}] unclosed tag(s) at end of file: {checker.stack}")
    if not checker.issues and not checker.stack:
        log_pass(cat, f"[{name}] tag balance OK")


# ════════════════════════════════════════════════════════════════════
#  CHECK 4: Search index sync
# ════════════════════════════════════════════════════════════════════
def check_search_index_sync():
    cat = "search-index"
    try:
        sys.path.insert(0, str(ROOT / "scripts"))
        import importlib
        import extract_index as ei
        importlib.reload(ei)

        achievements = ei.extract_achievements()
        projects = ei.extract_projects()
        if not achievements or not projects:
            log_error(cat, "extract_index.py returned zero achievements or projects")
            return

        expected_block = ei.render_block(achievements, projects)
        src = ei.INDEX_FILE.read_text(encoding="utf-8")
        start = src.find(ei.START_MARK)
        end = src.find(ei.END_MARK, start) + len(ei.END_MARK) if start != -1 else -1
        if start == -1 or end == -1:
            log_error(cat, "could not locate SEARCH_STATIC_INDEX block in search-index.js")
            return
        current_block = src[start:end]

        if current_block.strip() != expected_block.strip():
            log_error(cat, "SEARCH_STATIC_INDEX is stale — run "
                           "`python scripts/extract_index.py`")
        else:
            log_pass(cat, f"search index up to date ({len(achievements)} achievements, "
                          f"{len(projects)} projects)")
    except Exception as e:
        log_warning(cat, f"could not run search index check: {e}")


# ════════════════════════════════════════════════════════════════════
#  CHECK 5: PWA & a11y metadata
# ════════════════════════════════════════════════════════════════════
def check_pwa_and_a11y_metadata():
    cat = "pwa-a11y"
    site_files = get_html_files()
    all_ok = True
    for f in site_files:
        text = read_html(f)
        if 'href="site.webmanifest"' not in text and "href='site.webmanifest'" not in text:
            log_error(cat, f"{f.name} missing <link rel=\"manifest\">")
            all_ok = False
        if 'class="skip-link"' not in text and "class='skip-link'" not in text:
            log_error(cat, f"{f.name} missing skip-link navigation")
            all_ok = False
        if 'id="main-content"' not in text and "id='main-content'" not in text:
            log_error(cat, f"{f.name} missing <main id=\"main-content\"> target")
            all_ok = False
        if 'fonts.googleapis.com' not in text:
            log_warning(cat, f"{f.name} missing Google Fonts preconnect/link")
            all_ok = False
        if 'property="og:image"' not in text and "property='og:image'" not in text:
            log_error(cat, f"{f.name} missing og:image social preview tag")
            all_ok = False
        if 'name="twitter:card"' not in text and "name='twitter:card'" not in text:
            log_error(cat, f"{f.name} missing twitter:card tag")
            all_ok = False

    sw_path = ROOT / "sw.js"
    if sw_path.exists():
        sw_text = sw_path.read_text(encoding="utf-8")
        if not re.search(r"CACHE_NAME\s*=\s*['\"]aaradhya-portfolio-v[\d.]+['\"]", sw_text):
            log_error(cat, "sw.js CACHE_NAME missing or malformed")
            all_ok = False

    if all_ok:
        log_pass(cat, f"all {len(site_files)} pages pass PWA & a11y metadata checks")


# ════════════════════════════════════════════════════════════════════
#  CHECK 6: Cross-page link validation
# ════════════════════════════════════════════════════════════════════
def check_cross_page_links():
    """Scan every href="*.html" and href="*.html#fragment" across all pages.
    Verify target pages exist and fragment IDs are defined in the target."""
    cat = "links"
    site_files = get_html_files()
    site_basenames = {f.name for f in site_files}
    # Pre-parse all pages and collect all IDs per page
    page_ids = {}
    for f in site_files:
        soup = parse_html(f)
        ids = set()
        for el in soup.find_all(attrs={"id": True}):
            ids.add(el["id"])
        page_ids[f.name] = ids

    broken_page = 0
    broken_frag = 0
    total_checked = 0

    for f in site_files:
        soup = parse_html(f)
        for a in soup.find_all("a", href=True):
            href = a["href"]
            # Skip external, mailto, tel, javascript, anchor-only
            if href.startswith(("http://", "https://", "mailto:", "tel:",
                                "javascript:", "#", "data:")):
                continue
            # Skip asset downloads
            if href.startswith("assets/"):
                continue
            # Parse page reference
            parts = href.split("#", 1)
            page_ref = parts[0].strip().lstrip("/")
            frag = parts[1] if len(parts) > 1 else None

            if not page_ref or page_ref == "":
                continue
            if not page_ref.endswith(".html"):
                continue

            total_checked += 1

            if page_ref not in site_basenames:
                log_error(cat, f"{f.name} links to '{page_ref}' — page does not exist")
                broken_page += 1
                continue

            if frag and frag not in page_ids.get(page_ref, set()):
                # Skip common programmatic anchors
                if frag in ("main-content",):
                    continue
                log_error(cat, f"{f.name} links to '{page_ref}#{frag}' — "
                               f"fragment ID not found in {page_ref}")
                broken_frag += 1

    if broken_page == 0 and broken_frag == 0:
        log_pass(cat, f"all {total_checked} cross-page links resolve correctly")


# ════════════════════════════════════════════════════════════════════
#  CHECK 7: Asset file existence
# ════════════════════════════════════════════════════════════════════
def check_asset_references():
    """Scan src=, href=, data-cert=, data-download= for local asset paths.
    Verify each referenced file exists on disk."""
    cat = "assets"
    site_files = get_html_files()
    missing = 0
    total = 0

    asset_attrs = re.compile(
        r'(?:src|href|data-cert|data-download)\s*=\s*["\']'
        r'(assets/[^"\']+)["\']',
        re.IGNORECASE
    )

    checked = set()
    for f in site_files:
        text = read_html(f)
        for m in asset_attrs.finditer(text):
            asset_path = m.group(1)
            if asset_path in checked:
                continue
            checked.add(asset_path)
            total += 1
            full_path = ROOT / asset_path
            if not full_path.exists():
                log_error(cat, f"{f.name} references '{asset_path}' — file not found")
                missing += 1

    if missing == 0:
        log_pass(cat, f"all {total} unique asset references resolve to existing files")


# ════════════════════════════════════════════════════════════════════
#  CHECK 8: JavaScript syntax validation
# ════════════════════════════════════════════════════════════════════
def check_js_syntax():
    """Run node --check on script.js, bg-animations.js, and all modules."""
    cat = "js-syntax"
    node = shutil.which("node")
    if not node:
        log_warning(cat, "node not found on PATH — skipping JS syntax checks")
        return

    js_files = [SCRIPT_JS]
    if BG_ANIMATIONS_JS.exists():
        js_files.append(BG_ANIMATIONS_JS)
    if MODULES_DIR.exists():
        js_files.extend(sorted(MODULES_DIR.glob("*.js")))
    if DATA_DIR.exists():
        js_files.extend(sorted(DATA_DIR.glob("*.js")))

    all_ok = True
    for js_file in js_files:
        if not js_file.exists():
            log_error(cat, f"{js_file.name} does not exist")
            all_ok = False
            continue
        try:
            result = subprocess.run(
                [node, "--check", str(js_file)],
                capture_output=True, text=True, timeout=10
            )
            if result.returncode != 0:
                err_msg = result.stderr.strip().split("\n")[0] if result.stderr else "unknown error"
                log_error(cat, f"{js_file.name} syntax error: {err_msg}")
                all_ok = False
        except subprocess.TimeoutExpired:
            log_warning(cat, f"{js_file.name} — node --check timed out")
            all_ok = False
        except Exception as e:
            log_warning(cat, f"{js_file.name} — check failed: {e}")
            all_ok = False

    if all_ok:
        log_pass(cat, f"all {len(js_files)} JS files pass syntax check")


# ════════════════════════════════════════════════════════════════════
#  CHECK 9: Comprehensive Version Consistency across All Sources
# ════════════════════════════════════════════════════════════════════
def check_version_consistency():
    """Assert sw.js, script.js, releases.js data file, all 8 JS modules,
    tracker, verify.py, and site_automation.py all report the exact same
    version number."""
    cat = "version"
    versions = {}

    # 1. sw.js CACHE_NAME
    if SW_JS.exists():
        sw_text = SW_JS.read_text(encoding="utf-8")
        m = re.search(r"CACHE_NAME\s*=\s*['\"]aaradhya-portfolio-v([\d.]+)['\"]", sw_text)
        if m:
            versions["sw.js CACHE_NAME"] = m.group(1)
        else:
            log_error(cat, "sw.js CACHE_NAME version not found")

        # sw.js header comment
        m = re.search(r"Service Worker.*?\(v([\d.]+)\)", sw_text[:500])
        if m:
            versions["sw.js header"] = m.group(1)

    # 2. script.js header & SITE_RELEASES[0]
    if SCRIPT_JS.exists():
        script_text = SCRIPT_JS.read_text(encoding="utf-8")
        m = re.search(r"SHARED SCRIPT.*?\(v([\d.]+)\)", script_text[:500])
        if m:
            versions["script.js header"] = m.group(1)

        m = re.search(r"Dynamic Module Loader\s*\(v([\d.]+)\)", script_text[:500])
        if m:
            versions["script.js module loader"] = m.group(1)

    # 3. SITE_RELEASES[0] in the releases data file
    if RELEASES_JS.exists():
        rel_text = RELEASES_JS.read_text(encoding="utf-8")
        m = re.search(r"version:\s*['\"]v?([\d.]+)['\"]", rel_text[:3000])
        if m:
            versions["SITE_RELEASES[0]"] = m.group(1)
        else:
            log_error(cat, "releases.js SITE_RELEASES[0] version not found")

    # 4. All JS module headers
    if MODULES_DIR.exists():
        for mod_path in sorted(MODULES_DIR.glob("*.js")):
            mod_text = mod_path.read_text(encoding="utf-8")
            m = re.search(r"\(v([\d.]+)\)", mod_text[:300])
            if m:
                versions[f"{mod_path.name} header"] = m.group(1)
            else:
                log_error(cat, f"{mod_path.name} header version missing or malformed")

    # 5. TRACKER.md title
    if TRACKER_MD.exists():
        tr_text = TRACKER_MD.read_text(encoding="utf-8")
        m = re.search(r"# Portfolio Website Tracker\s*—\s*v([\d.]+)", tr_text)
        if m:
            versions["TRACKER.md header"] = m.group(1)

    # 6. verify.py header
    self_path = Path(__file__).resolve()
    if self_path.exists():
        v_text = self_path.read_text(encoding="utf-8")
        m = re.search(r"(?:aaradhya-dev-tamrakar|aaradhyadt)\.github\.io\s*\(v([\d.]+)\)", v_text[:400], re.IGNORECASE)
        if m:
            versions["verify.py header"] = m.group(1)

    # 7. site_automation.py
    if SITE_AUTOMATION_PY.exists():
        sa_text = SITE_AUTOMATION_PY.read_text(encoding="utf-8")
        m = re.search(r"(?:Aaradhya-Dev-Tamrakar|AaradhyaDT)\.github\.io\s*\(v([\d.]+)\)", sa_text[:400], re.IGNORECASE)
        if m:
            versions["site_automation.py header"] = m.group(1)

    # 8. VERSION file
    if VERSION_FILE.exists():
        ver_file_text = VERSION_FILE.read_text(encoding="utf-8").strip()
        m = re.search(r"v?([\d.]+)", ver_file_text)
        if m:
            versions["VERSION file"] = m.group(1)
        else:
            log_error(cat, "VERSION file malformed")

    # 9. README.md version badge
    if README_MD.exists():
        rm_text = README_MD.read_text(encoding="utf-8")
        m = re.search(r"badge/version-v?([\d.]+)-blue\.svg", rm_text)
        if m:
            versions["README.md badge"] = m.group(1)
        else:
            log_error(cat, "README.md version badge not found")

    # 10. pyproject.toml version
    if PYPROJECT_TOML.exists():
        py_text = PYPROJECT_TOML.read_text(encoding="utf-8")
        m = re.search(r'version\s*=\s*"([\d.]+)"', py_text)
        if m:
            raw_py = m.group(1)
            norm_py = raw_py[:-4] if raw_py.endswith(".0.0") else (raw_py[:-2] if raw_py.endswith(".0") else raw_py)
            versions["pyproject.toml"] = norm_py
        else:
            log_error(cat, "pyproject.toml version not found")

    # 11. TRACKER.md State of Play PWA row
    if TRACKER_MD.exists():
        tr_text = TRACKER_MD.read_text(encoding="utf-8")
        m = re.search(r"\|\s*\*\*PWA Service Worker & Offline Caching\*\*\s*\|\s*\*\*Active \(`aaradhya-portfolio-v?([\d.]+)`\)\*\*", tr_text)
        if m:
            versions["TRACKER.md State of Play PWA"] = m.group(1)
        else:
            log_error(cat, "TRACKER.md State of Play PWA version row not found")

    # 12. verify.yml workflow header
    if WORKFLOW_VERIFY_YML.exists():
        wf_text = WORKFLOW_VERIFY_YML.read_text(encoding="utf-8")
        m = re.search(r"# Last updated:\s*[\d-]+\s*\(v([\d.]+)\)", wf_text)
        if m:
            versions["verify.yml header"] = m.group(1)
        else:
            log_error(cat, "verify.yml header version not found")

    # 13. terminal.js fallback versions
    term_path = MODULES_DIR / "terminal.js"
    if term_path.exists():
        term_text = term_path.read_text(encoding="utf-8")
        fallbacks = re.findall(r"SITE_RELEASES\[0\](?:\?)?\.version\s*:\s*['\"]v?([\d.]+)['\"]", term_text)
        if fallbacks:
            for i, fb in enumerate(fallbacks, 1):
                versions[f"terminal.js fallback {i}"] = fb
        else:
            log_error(cat, "terminal.js fallback versions not found")

    unique_versions = set(versions.values())
    if len(unique_versions) == 0:
        log_error(cat, "could not extract any version numbers")
    elif len(unique_versions) > 1:
        detail = ", ".join(f"{k}=v{v}" for k, v in versions.items())
        log_error(cat, f"version mismatch detected across sources: {detail}")
    else:
        ver = unique_versions.pop()
        log_pass(cat, f"all {len(versions)} sources consistent at v{ver}")


# ════════════════════════════════════════════════════════════════════
#  CHECK 10: Module file existence
# ════════════════════════════════════════════════════════════════════
def check_module_files():
    """Parse the MODULES array from script.js and verify every listed
    module path exists on disk."""
    cat = "modules"
    all_ok = True

    # JS Modules (incl. data/ files loaded via the same array)
    if not SCRIPT_JS.exists():
        log_error(cat, "script.js not found")
        all_ok = False
    else:
        text = SCRIPT_JS.read_text(encoding="utf-8")
        js_modules = re.findall(r"['\"](assets/js/(?:modules|data)/[^'\"]+\.js)['\"]", text[:1500])
        if not js_modules:
            log_error(cat, "could not parse MODULES array from script.js")
            all_ok = False
        else:
            for mod_path in js_modules:
                full = ROOT / mod_path
                if not full.exists():
                    log_error(cat, f"JS module '{mod_path}' listed in MODULES but file not found")
                    all_ok = False

    if all_ok:
        log_pass(cat, f"all {len(js_modules)} JS modules/data files referenced in script.js exist on disk")


# ════════════════════════════════════════════════════════════════════
#  CHECK 11: Sitemap sync
# ════════════════════════════════════════════════════════════════════
def check_sitemap_sync(fix=False):
    """Compare sitemap.xml URLs against actual *.html files."""
    cat = "sitemap"
    if not SITEMAP_XML.exists():
        log_error(cat, "sitemap.xml not found")
        return

    text = SITEMAP_XML.read_text(encoding="utf-8")
    sitemap_pages = set(re.findall(
        r"<loc>https://(?:aaradhya-dev-tamrakar|aaradhyadt)\.github\.io/([^<]*)</loc>", text, re.IGNORECASE
    ))
    sitemap_pages_norm = set()
    for p in sitemap_pages:
        if p == "" or p == "/":
            sitemap_pages_norm.add("index.html")
        else:
            sitemap_pages_norm.add(p.lstrip("/"))

    actual_pages = {f.name for f in get_html_files()}
    actual_pages -= {f.name for f in ROOT.glob("google*.html")}
    actual_pages -= {"404.html"}

    missing_from_sitemap = actual_pages - sitemap_pages_norm
    stale_in_sitemap = sitemap_pages_norm - actual_pages

    for p in sorted(missing_from_sitemap):
        log_warning(cat, f"'{p}' exists on disk but not in sitemap.xml")
    for p in sorted(stale_in_sitemap):
        log_error(cat, f"sitemap.xml lists '{p}' but file does not exist")

    if not missing_from_sitemap and not stale_in_sitemap:
        log_pass(cat, f"sitemap.xml matches {len(actual_pages)} site pages")


# ════════════════════════════════════════════════════════════════════
#  CHECK 12: Web manifest validation
# ════════════════════════════════════════════════════════════════════
def check_manifest():
    """Parse site.webmanifest as JSON. Verify required fields."""
    cat = "manifest"
    if not MANIFEST.exists():
        log_error(cat, "site.webmanifest not found")
        return

    try:
        data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        log_error(cat, f"site.webmanifest is invalid JSON: {e}")
        return

    required = ["name", "short_name", "start_url", "display", "icons"]
    missing = [k for k in required if k not in data]
    if missing:
        log_error(cat, f"site.webmanifest missing required fields: {missing}")
    else:
        log_pass(cat, "site.webmanifest has all required fields")

    icons = data.get("icons", [])
    if not icons:
        log_warning(cat, "site.webmanifest has empty icons array")
    elif icons[0].get("sizes") and icons[0].get("type"):
        log_pass(cat, f"site.webmanifest has {len(icons)} icon(s) defined")


# ════════════════════════════════════════════════════════════════════
#  CHECK 13: JSON-LD schema validation
# ════════════════════════════════════════════════════════════════════
def check_jsonld_schemas():
    """Extract <script type="application/ld+json"> blocks, parse as JSON,
    verify @context and @type are present."""
    cat = "schema"
    site_files = get_html_files()
    total_blocks = 0
    parse_errors = 0

    for f in site_files:
        soup = parse_html(f)
        blocks = soup.find_all("script", type="application/ld+json")
        for block in blocks:
            total_blocks += 1
            raw = block.string
            if not raw or not raw.strip():
                log_error(cat, f"{f.name} has empty JSON-LD block")
                parse_errors += 1
                continue
            try:
                data = json.loads(raw)
            except json.JSONDecodeError as e:
                log_error(cat, f"{f.name} JSON-LD parse error: {e}")
                parse_errors += 1
                continue

            items = data if isinstance(data, list) else [data]
            for item in items:
                if isinstance(item, dict):
                    if "@context" not in item:
                        log_warning(cat, f"{f.name} JSON-LD block missing @context")
                    if "@type" not in item:
                        log_warning(cat, f"{f.name} JSON-LD block missing @type")

    if parse_errors == 0 and total_blocks > 0:
        log_pass(cat, f"all {total_blocks} JSON-LD blocks parse successfully")
    elif total_blocks == 0:
        log_warning(cat, "no JSON-LD blocks found on any page")


# ════════════════════════════════════════════════════════════════════
#  CHECK 14: File size budgets
# ════════════════════════════════════════════════════════════════════
def check_file_sizes():
    """Warn when files exceed size thresholds."""
    cat = "size"
    thresholds = {
        "JS (script.js)": (SCRIPT_JS, 60_000),
    }
    if CSS_MODULES_DIR.exists():
        for mod in sorted(CSS_MODULES_DIR.glob("*.css")):
            thresholds[f"CSS ({mod.name})"] = (mod, 50_000)

    if MODULES_DIR.exists():
        for mod in sorted(MODULES_DIR.glob("*.js")):
            thresholds[f"JS ({mod.name})"] = (mod, 70_000)

    for f in get_html_files():
        thresholds[f"HTML ({f.name})"] = (f, 200_000)

    all_ok = True
    for label, (path, limit) in thresholds.items():
        if not path.exists():
            continue
        size = path.stat().st_size
        if size > limit:
            log_warning(cat, f"{label}: {size:,}B exceeds budget of {limit:,}B")
            all_ok = False

    if all_ok:
        log_pass(cat, "all files within size budgets")


# ════════════════════════════════════════════════════════════════════
#  CHECK 15: Service Worker cache completeness & module coverage
# ════════════════════════════════════════════════════════════════════
def check_sw_cache_completeness():
    """Parse sw.js STATIC_ASSETS array. Verify every listed file exists.
    Flag any *.html page or CSS/JS module not in the cache list."""
    cat = "sw-assets"
    if not SW_JS.exists():
        log_error(cat, "sw.js not found")
        return

    sw_text = SW_JS.read_text(encoding="utf-8")
    cached_paths = re.findall(r"['\"]\./([\w./\-]+)['\"]", sw_text)
    if not cached_paths:
        log_error(cat, "could not parse STATIC_ASSETS from sw.js")
        return

    missing = []
    for p in cached_paths:
        if p == "./":
            continue
        full = ROOT / p
        if not full.exists():
            log_error(cat, f"sw.js caches '{p}' but file does not exist")
            missing.append(p)

    # Check all HTML pages are cached
    actual_pages = {f.name for f in get_html_files()}
    cached_pages = {p for p in cached_paths if p.endswith(".html")}
    uncached_pages = actual_pages - cached_pages
    for p in sorted(uncached_pages):
        log_warning(cat, f"'{p}' is a site page but not in sw.js STATIC_ASSETS")

    # Check all CSS modules are cached (ignoring generated *.min.css artifacts)
    if CSS_MODULES_DIR.exists():
        css_modules = {f"assets/css/modules/{f.name}" for f in CSS_MODULES_DIR.glob("*.css") if not f.name.endswith(".min.css")}
        cached_css = set(cached_paths)
        uncached_css = css_modules - cached_css
        for c in sorted(uncached_css):
            log_warning(cat, f"CSS module '{c}' not in sw.js STATIC_ASSETS")

    # Check all JS modules & data files are cached
    if MODULES_DIR.exists():
        js_modules = {f"assets/js/modules/{f.name}" for f in MODULES_DIR.glob("*.js")}
        cached_js = set(cached_paths)
        uncached_js = js_modules - cached_js
        for j in sorted(uncached_js):
            log_warning(cat, f"JS module '{j}' not in sw.js STATIC_ASSETS")

    if DATA_DIR.exists():
        data_files = {f"assets/js/data/{f.name}" for f in DATA_DIR.glob("*.js")}
        cached_data = set(cached_paths)
        uncached_data = data_files - cached_data
        for d in sorted(uncached_data):
            log_warning(cat, f"JS data file '{d}' not in sw.js STATIC_ASSETS")

    if not missing and not uncached_pages:
        log_pass(cat, f"all {len(cached_paths)} cached assets exist, "
                      f"all HTML pages and modules cached")


# ════════════════════════════════════════════════════════════════════
#  CHECK 16: Robots.txt validation
# ════════════════════════════════════════════════════════════════════
def check_robots_txt():
    """Verify Sitemap: directive URL and basic syntax."""
    cat = "robots"
    if not ROBOTS_TXT.exists():
        log_error(cat, "robots.txt not found")
        return

    text = ROBOTS_TXT.read_text(encoding="utf-8")

    if "Sitemap:" not in text:
        log_warning(cat, "robots.txt missing Sitemap: directive")
        return

    m = re.search(r"Sitemap:\s*(\S+)", text)
    if m:
        url = m.group(1)
        if not re.search(r"(?:aaradhya-dev-tamrakar|aaradhyadt)\.github\.io/sitemap\.xml", url, re.IGNORECASE):
            log_error(cat, f"robots.txt Sitemap URL looks wrong: {url}")
        else:
            log_pass(cat, "robots.txt Sitemap directive correct")

    if "User-agent:" not in text:
        log_error(cat, "robots.txt missing User-agent directive")
    else:
        log_pass(cat, "robots.txt structure valid")


# ════════════════════════════════════════════════════════════════════
#  CHECK 17: Global ID uniqueness across pages
# ════════════════════════════════════════════════════════════════════
def check_global_id_uniqueness():
    """Scan all pages for id="" attributes. Flag collisions that could
    confuse cross-page fragment links."""
    cat = "ids-global"
    structural_ids = {
        "main-content", "readProgressBar", "siteFooter", "bg-canvas",
        "pcb-canvas", "whatsNewModal", "tourOverlay", "accessModal",
        "adtTerminal", "cmdkOverlay",
        "siteNav", "page-header", "cursor", "cursorDot", "cursorRing",
        "backTop", "scrollPct", "scrollProgress", "audioToggle",
        "quick-nav", "quickNavGrid",
        "cert-lightbox", "lb-body", "lb-close", "lb-download",
        "lb-label", "lb-open",
    }

    id_locations = {}
    for f in get_html_files():
        soup = parse_html(f)
        for el in soup.find_all(attrs={"id": True}):
            el_id = el["id"]
            if el_id in structural_ids:
                continue
            id_locations.setdefault(el_id, []).append(f.name)

    collisions = {k: v for k, v in id_locations.items() if len(v) > 1}
    if collisions:
        for el_id, files in sorted(collisions.items()):
            log_warning(cat, f"id='{el_id}' appears in multiple pages: "
                              f"{', '.join(files)}")
    else:
        unique_ids = sum(1 for v in id_locations.values() if len(v) == 1)
        log_pass(cat, f"{unique_ids} unique content IDs, no cross-page collisions")


# ════════════════════════════════════════════════════════════════════
#  CHECK 18: JavaScript Runtime Safety & Hygiene (NEW)
# ════════════════════════════════════════════════════════════════════
def check_js_safety():
    """Check for unguarded optional function calls, duplicate listeners,
    and legacy monolithic comment blocks."""
    cat = "js-safety"
    all_ok = True

    # 1. Guard check for playAudioCue in JS modules and scripts
    js_files = []
    if SCRIPT_JS.exists():
        js_files.append(SCRIPT_JS)
    if MODULES_DIR.exists():
        js_files.extend(sorted(MODULES_DIR.glob("*.js")))

    unguarded_audio = []
    for js_path in js_files:
        if js_path.name == "audio.js":
            continue
        lines = js_path.read_text(encoding="utf-8").splitlines()
        for idx, line in enumerate(lines, 1):
            if "playAudioCue(" in line and "function playAudioCue" not in line:
                # Check if this line or previous line has typeof check
                prev_line = lines[idx - 2] if idx >= 2 else ""
                has_guard = ("typeof playAudioCue" in line or "typeof playAudioCue" in prev_line or
                             "window.playAudioCue" in line)
                if not has_guard:
                    unguarded_audio.append(f"{js_path.name}:{idx}")

    if unguarded_audio:
        log_error(cat, f"unguarded playAudioCue() calls found at: {', '.join(unguarded_audio)}")
        all_ok = False

    # 2. Check for duplicate DOMContentLoaded / orphan initializers in modules
    if MODULES_DIR.exists():
        for mod_path in sorted(MODULES_DIR.glob("*.js")):
            mod_text = mod_path.read_text(encoding="utf-8")
            # Modules should not define redundant DOMContentLoaded listeners for functions handled by bootSite
            if re.search(r"document\.addEventListener\(['\"]DOMContentLoaded['\"].*?initSkillRadar", mod_text):
                log_error(cat, f"{mod_path.name} contains orphan DOMContentLoaded -> initSkillRadar listener")
                all_ok = False
            if "SHARED SCRIPT — aaradhyadt.github.io" in mod_text:
                log_error(cat, f"{mod_path.name} contains deprecated monolithic 'SHARED SCRIPT' header")
                all_ok = False

    # 3. Check for consecutive duplicate comment blocks in script.js
    if SCRIPT_JS.exists():
        lines = SCRIPT_JS.read_text(encoding="utf-8").splitlines()
        for i in range(len(lines) - 1):
            line_a = lines[i].strip()
            line_b = lines[i + 1].strip()
            if line_a and line_a.startswith(("/*", "//")) and line_a == line_b:
                log_warning(cat, f"script.js contains duplicate comment on lines {i+1}-{i+2}: '{line_a}'")
                all_ok = False

    if all_ok:
        log_pass(cat, "all JS modules adhere to runtime safety & hygiene rules")


# ════════════════════════════════════════════════════════════════════
#  CHECK 19: CSS Asset & URL Reference Integrity (NEW)
# ════════════════════════════════════════════════════════════════════
def check_css_integrity():
    """Scan all CSS files for url(...) references and verify assets exist."""
    cat = "css-integrity"
    css_files = []
    if CSS_MODULES_DIR.exists():
        css_files.extend(sorted(CSS_MODULES_DIR.glob("*.css")))

    missing_assets = []
    total_urls = 0

    for cf in css_files:
        text = cf.read_text(encoding="utf-8")
        for m in re.finditer(r'url\(\s*[\'"]?([^\'")]+)[\'"]?\s*\)', text):
            url = m.group(1).strip()
            # Skip data URIs, external protocols, and in-page/SVG fragment filters (including url-encoded %23)
            if url.startswith(("data:", "http://", "https://", "#", "%23")):
                continue
            total_urls += 1
            # Resolve relative to CSS file directory
            if url.startswith("/"):
                target = ROOT / url.lstrip("/")
            else:
                target = (cf.parent / url).resolve()
            if not target.exists():
                missing_assets.append(f"{cf.name} -> '{url}'")

    if missing_assets:
        log_error(cat, f"broken CSS asset references: {', '.join(missing_assets)}")
    else:
        log_pass(cat, f"all {total_urls} local CSS url() asset references exist on disk")


# ════════════════════════════════════════════════════════════════════
#  CHECK 20: Deep HTML, Accessibility & SEO Hygiene (NEW)
# ════════════════════════════════════════════════════════════════════
def check_html_a11y_seo():
    """Verify image alt attributes, link noopener on _blank, single h1 per page,
    title, meta description, and html lang."""
    cat = "html-a11y-seo"
    site_files = get_html_files()
    all_ok = True
    total_imgs = 0
    total_ext_links = 0

    for f in site_files:
        soup = parse_html(f)

        # 1. Single <h1> per page
        h1s = soup.find_all("h1")
        if len(h1s) != 1:
            log_error(cat, f"{f.name} has {len(h1s)} <h1> tags (must be exactly 1)")
            all_ok = False

        # 2. Image alt tags
        imgs = soup.find_all("img")
        for img in imgs:
            total_imgs += 1
            if not img.has_attr("alt"):
                src = img.get("src", "unknown")
                log_error(cat, f"{f.name} has <img> missing alt attribute: {src}")
                all_ok = False

        # 3. Security: target="_blank" must include rel="noopener"
        ext_links = soup.find_all("a", target="_blank")
        for a in ext_links:
            total_ext_links += 1
            rel = a.get("rel", [])
            if isinstance(rel, str):
                rel = rel.split()
            if "noopener" not in rel and "noreferrer" not in rel:
                log_error(cat, f"{f.name} external link '{a.get('href')}' missing rel=\"noopener\"")
                all_ok = False

        # 4. <html lang="en">
        html_tag = soup.find("html")
        if not html_tag or not html_tag.get("lang"):
            log_error(cat, f"{f.name} missing <html lang=\"en\"> attribute")
            all_ok = False

        # 5. Non-empty <title>
        title_tag = soup.find("title")
        if not title_tag or not title_tag.text.strip():
            log_error(cat, f"{f.name} missing or empty <title>")
            all_ok = False

        # 6. Non-empty <meta name="description">
        desc_tag = soup.find("meta", attrs={"name": "description"})
        if not desc_tag or not desc_tag.get("content", "").strip():
            log_error(cat, f"{f.name} missing or empty meta description")
            all_ok = False

        # 7. Canonical link (on all regular pages except 404)
        if f.name != "404.html":
            can_tag = soup.find("link", attrs={"rel": "canonical"})
            if not can_tag or not can_tag.get("href", "").strip():
                log_error(cat, f"{f.name} missing canonical <link rel=\"canonical\">")
                all_ok = False

    if all_ok:
        log_pass(cat, f"all {len(site_files)} pages pass a11y & SEO hygiene "
                      f"({total_imgs} images with alt, {total_ext_links} secure links, 1 h1/page)")


# ════════════════════════════════════════════════════════════════════
#  CHECK 21: Cross-Surface Semantic Data Consistency (NEW)
# ════════════════════════════════════════════════════════════════════
def check_data_consistency():
    """Verify resume data in ui.js matches HTML & JSON-LD role titles and contact info."""
    cat = "data-consistency"
    all_ok = True

    # 1. RESUME_DATA in data/resume-data.js should say Vice Chair for current leadership
    if RESUME_DATA_JS.exists():
        resume_text = RESUME_DATA_JS.read_text(encoding="utf-8")
        if "Vice Chair" not in resume_text:
            log_error(cat, "resume-data.js missing current leadership title 'Vice Chair'")
            all_ok = False
            all_ok = False

    # 2. SITE constants in constants.js (or core.js)
    constants_js_path = MODULES_DIR / "constants.js"
    target_const_path = constants_js_path if constants_js_path.exists() else (MODULES_DIR / "core.js")
    if target_const_path.exists():
        core_text = target_const_path.read_text(encoding="utf-8")
        if "aaradhyadevtmr@gmail.com" not in core_text:
            log_warning(cat, f"{target_const_path.name} SITE.masterEmails missing primary contact email")
            all_ok = False
        if "https://github.com/AaradhyaDT" not in core_text:
            log_warning(cat, f"{target_const_path.name} SITE.socials missing primary GitHub profile URL")
            all_ok = False

    # 3. contact.html email and github consistency
    contact_path = ROOT / "contact.html"
    if contact_path.exists():
        contact_text = contact_path.read_text(encoding="utf-8")
        if "aaradhyadevtmr@gmail.com" not in contact_text:
            log_warning(cat, "contact.html missing primary contact email")
            all_ok = False

    # 4. Project card highlighting hygiene (Ensure single major/latest highlight per coursework section)
    projects_path = ROOT / "projects.html"
    if projects_path.exists():
        soup = parse_html(projects_path)
        fuse_heading = soup.select_one("#section-fuseaif")
        if fuse_heading:
            fuse_cards = []
            curr = fuse_heading.find_next_sibling()
            while curr:
                classes = curr.get("class", [])
                if curr.name == "h2" and "projects-section-title" in classes:
                    break
                if "project-card" in classes:
                    fuse_cards.append(curr)
                curr = curr.find_next_sibling()

            major_fuse = [c for c in fuse_cards if "project-card--major" in c.get("class", [])]
            if len(major_fuse) > 1:
                ids = [c.get("id", "unknown") for c in major_fuse]
                log_error(cat, f"Multiple Fuse AIF cards have 'project-card--major' ({', '.join(ids)}). Only the latest should be highlighted.")
                all_ok = False
            elif len(major_fuse) == 1 and fuse_cards and major_fuse[0] != fuse_cards[0]:
                log_warning(cat, f"Fuse AIF 'project-card--major' is on #{major_fuse[0].get('id')} but #{fuse_cards[0].get('id')} is the top/latest card.")

    if all_ok:
        log_pass(cat, "cross-surface resume titles, contact info & profile metadata consistent")


# ════════════════════════════════════════════════════════════════════
#  CHECK 22: Dev Tracker & Markdown Hygiene (NEW)
# ════════════════════════════════════════════════════════════════════
def check_tracker_hygiene():
    """Validate Portfolio Tracker and key Markdown documents for MD009/MD026 compliance."""
    cat = "tracker-hygiene"
    all_ok = True

    md_files = [TRACKER_MD, ROOT / "README.md", ROOT / "AGENTS.md", ROOT / "GEMINI.md"]
    for md in md_files:
        if not md.exists():
            continue
        text = md.read_text(encoding="utf-8")
        # MD026: Heading trailing punctuation
        if re.search(r"(?m)^##.*[:;,!?]\s*$", text):
            log_warning(cat, f"{md.name} contains headings with trailing punctuation (violates MD026)")
            all_ok = False
        # MD009: Trailing whitespace
        if any(line.rstrip("\r\n") != line.rstrip() for line in text.splitlines()):
            log_warning(cat, f"{md.name} contains lines with trailing whitespace (violates MD009)")
            all_ok = False

    if all_ok:
        log_pass(cat, "tracker and key documentation files clean of MD009/MD026 lint issues")


# ════════════════════════════════════════════════════════════════════
#  CHECK 23: JavaScript Unit Tests Execution
# ════════════════════════════════════════════════════════════════════
def check_unit_tests():
    """Execute node --test across tests/unit/ and assert all tests pass."""
    cat = "unit-tests"
    node_bin = shutil.which("node")
    if not node_bin:
        log_warning(cat, "node binary not found on PATH — skipping unit tests")
        return

    tests_dir = ROOT / "tests" / "unit"
    if not tests_dir.exists() or not list(tests_dir.glob("*.test.mjs")):
        log_warning(cat, "no unit tests found under tests/unit/")
        return

    try:
        proc = subprocess.run(
            [node_bin, "--test"],
            cwd=str(ROOT),
            capture_output=True,
            text=True,
            timeout=15,
            encoding="utf-8",
            errors="replace"
        )
        if proc.returncode != 0:
            err_line = proc.stderr.strip() or proc.stdout.strip()
            first_err = err_line.splitlines()[-1] if err_line else "non-zero exit"
            log_error(cat, f"unit tests failed: {first_err}")
        else:
            m = re.search(r"pass (\d+)", proc.stdout)
            count_str = f" ({m.group(1)} tests passed)" if m else ""
            log_pass(cat, f"all JS unit tests passed cleanly{count_str}")
    except subprocess.TimeoutExpired:
        log_error(cat, "unit tests timed out after 15s")
    except Exception as e:
        log_error(cat, f"failed to execute unit tests: {e}")


# ════════════════════════════════════════════════════════════════════
#  CHECK 24: Content Security Policy (CSP) Meta Tag Integrity
# ════════════════════════════════════════════════════════════════════
def check_csp_integrity():
    """Verify that every HTML page includes a valid Content-Security-Policy meta tag."""
    cat = "csp"
    required_directives = ["default-src", "script-src", "style-src", "img-src", "connect-src", "frame-src"]
    all_ok = True

    for f in get_html_files():
        soup = parse_html(f)
        csp_meta = soup.find("meta", attrs={"http-equiv": re.compile(r"^Content-Security-Policy$", re.I)})
        if not csp_meta or not csp_meta.get("content"):
            log_error(cat, f"{f.name}: missing <meta http-equiv='Content-Security-Policy'> tag in <head>")
            all_ok = False
            continue

        content = csp_meta["content"]
        missing_dirs = [d for d in required_directives if d not in content]
        if missing_dirs:
            log_error(cat, f"{f.name}: CSP missing required directives: {', '.join(missing_dirs)}")
            all_ok = False

    if all_ok:
        log_pass(cat, f"all {len(get_html_files())} HTML pages contain valid, directive-complete CSP meta tags")


# ════════════════════════════════════════════════════════════════════
#  MAIN
# ════════════════════════════════════════════════════════════════════
def main():
    parser = argparse.ArgumentParser(
        description="Structural integrity checker for aaradhyadt.github.io"
    )
    parser.add_argument("--verbose", "-v", action="store_true",
                        help="Show passing checks too")
    parser.add_argument("--fix", action="store_true",
                        help="Auto-fix trivial issues (sitemap dates, etc.)")
    parser.add_argument("--skip-search-index", action="store_true",
                        help="Skip the generated-index check when a sequencing workflow owns it")
    args = parser.parse_args()

    print(bold("=" * 60))
    print(bold("  Portfolio Site Verification Suite (v54.5)"))
    print(bold("=" * 60))
    print()

    # ── Run all 25 check categories ─────────────────────────────
    # 1. Content IDs
    id_results = {}
    for name, cfg in PAGES.items():
        id_results[name] = check_ids(name, cfg)

    # 2. Internal hrefs (content pages)
    for name, cfg in PAGES.items():
        res = id_results.get(name)
        if res:
            check_internal_hrefs(name, cfg, res["ids"])

    # 3. Tag balance (all HTML)
    for f in get_html_files():
        check_tag_balance(f.name, f)

    # 4. Search index sync (the workflow_run job runs this after regeneration)
    if args.skip_search_index:
        log_pass("search-index", "Skipped; awaiting the post-update workflow_run verification")
    else:
        check_search_index_sync()

    # 5. PWA & a11y metadata
    check_pwa_and_a11y_metadata()

    # 6. Cross-page links
    check_cross_page_links()

    # 7. Asset references
    check_asset_references()

    # 8. JS syntax
    check_js_syntax()

    # 9. Version consistency
    check_version_consistency()

    # 10. Module files
    check_module_files()

    # 11. Sitemap sync
    check_sitemap_sync(fix=args.fix)

    # 12. Manifest validation
    check_manifest()

    # 13. JSON-LD schemas
    check_jsonld_schemas()

    # 14. File size budgets
    check_file_sizes()

    # 15. SW cache completeness
    check_sw_cache_completeness()

    # 16. Robots.txt
    check_robots_txt()

    # 17. Global ID uniqueness
    check_global_id_uniqueness()

    # 18. JS safety & runtime hygiene (NEW)
    check_js_safety()

    # 19. CSS asset & URL integrity (NEW)
    check_css_integrity()

    # 20. Deep HTML, Accessibility & SEO (NEW)
    check_html_a11y_seo()

    # 21. Semantic Data Consistency (NEW)
    check_data_consistency()

    # 22. Tracker & Markdown Hygiene (NEW)
    check_tracker_hygiene()

    # 23. JS Unit Tests (NEW)
    check_unit_tests()

    # 24. Content Security Policy Meta Tag Integrity (NEW)
    check_csp_integrity()

    # 25. Canonical quantitative claim provenance
    check_quantitative_claims()

    # ── Output ──────────────────────────────────────────────────
    all_cats = set()
    for cat, _ in errors + warnings + passes:
        all_cats.add(cat)
    all_cats = sorted(all_cats)

    cat_status = {}
    for cat in all_cats:
        cat_errors = [m for c, m in errors if c == cat]
        cat_warnings = [m for c, m in warnings if c == cat]
        cat_passes = [m for c, m in passes if c == cat]
        cat_status[cat] = (cat_errors, cat_warnings, cat_passes)

    # Print detailed results
    if errors:
        print(red(bold("ERRORS:")))
        for cat, msg in errors:
            print(f"  {red('X')} {dim(f'[{cat}]')} {msg}")
        print()

    if warnings:
        print(yellow(bold("WARNINGS:")))
        for cat, msg in warnings:
            print(f"  {yellow('!')} {dim(f'[{cat}]')} {msg}")
        print()

    if args.verbose and passes:
        print(green(bold("PASSES:")))
        for cat, msg in passes:
            print(f"  {green('+')} {dim(f'[{cat}]')} {msg}")
        print()

    # Summary dashboard
    print(bold("-" * 60))
    print(bold(f"  Category Summary ({len(all_cats)} Categories)"))
    print(bold("-" * 60))
    for cat in all_cats:
        cat_e, cat_w, cat_p = cat_status[cat]
        if cat_e:
            status = red(f"FAIL ({len(cat_e)} error(s))")
        elif cat_w:
            status = yellow(f"WARN ({len(cat_w)} warning(s))")
        else:
            status = green("PASS")
        print(f"  [{cat:>16s}]  {status}")
    print(bold("-" * 60))

    # Content counts
    counts = ", ".join(f"{n}={r['count']}" for n, r in id_results.items() if r)
    if counts:
        print(f"  Content: {counts}")

    # Final verdict
    print()
    if errors:
        print(red(bold(f"FAILED -- {len(errors)} error(s), {len(warnings)} warning(s).")))
        sys.exit(1)
    elif warnings:
        print(yellow(bold(f"OK with {len(warnings)} warning(s).")))
        sys.exit(0)
    else:
        print(green(bold(f"ALL {len(all_cats)} CHECKS PASSED")))
        sys.exit(0)


if __name__ == "__main__":
    main()