#!/usr/bin/env python3
"""compile_cv.py — Single-Source-of-Truth CV Compiler.

Compiles targeted, ATS-optimized DOCX and vector PDF resumes from
data/master_cv.json using python-docx and WordCraft CLI.

Usage:
  python scripts/compile_cv.py --preset master
  python scripts/compile_cv.py --preset research
  python scripts/compile_cv.py --preset systems
  python scripts/compile_cv.py --preset aiml
  python scripts/compile_cv.py --preset fullstack
  python scripts/compile_cv.py --preset compact
  python scripts/compile_cv.py --all-presets
  python scripts/compile_cv.py --sync-web
  python scripts/compile_cv.py --check-ssot
  python scripts/compile_cv.py --check-claims
"""

import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "data" / "master_cv.json"
RESUME_JS_FILE = ROOT / "assets" / "js" / "data" / "resume-data.js"
PROJECTS_HTML = ROOT / "projects.html"
OUTPUT_DIR = ROOT / "assets" / "docs"
WORDCRAFT_CLI = Path(r"F:\wordcraft-0.10.0-windows-x64-portable\wordcraft-cli.exe")
ALL_PRESETS = ["master", "research", "systems", "aiml", "fullstack", "compact"]

HEX_ACCENT = "274C5E"
HEX_INK = "17212B"
HEX_LINK = "1E3A8A"


def _load_docx_modules():
    """Lazy-import python-docx so pure-Python SSOT checks run in minimal CI."""
    import docx
    from docx.oxml import OxmlElement
    from docx.oxml.ns import qn
    from docx.opc.constants import RELATIONSHIP_TYPE
    from docx.shared import Inches, Pt, RGBColor

    palette = {
        "ink": RGBColor(0x17, 0x21, 0x2B),      # Deep Charcoal
        "accent": RGBColor(0x27, 0x4C, 0x5E),   # Slate Teal / Navy
        "muted": RGBColor(0x4B, 0x55, 0x63),    # Muted Gray
        "body": RGBColor(0x1F, 0x29, 0x37),     # Body text
    }
    return docx, OxmlElement, qn, RELATIONSHIP_TYPE, Inches, Pt, palette


def add_hyperlink(
    paragraph,
    url: str,
    text: str,
    color_hex: str = HEX_LINK,
    underline: bool = True,
    font_name: str = "Calibri",
    font_size_pt: float = 8.5,
    bold: bool = False,
):
    """Add a native Word hyperlink XML element to a paragraph with explicit typography."""
    _, OxmlElement, qn, RELATIONSHIP_TYPE, _, _, _ = _load_docx_modules()
    part = paragraph.part
    r_id = part.relate_to(url, RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)

    new_run = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")

    rFonts = OxmlElement("w:rFonts")
    rFonts.set(qn("w:ascii"), font_name)
    rFonts.set(qn("w:hAnsi"), font_name)
    rFonts.set(qn("w:cs"), font_name)
    rPr.append(rFonts)

    sz = OxmlElement("w:sz")
    sz.set(qn("w:val"), str(int(round(font_size_pt * 2))))
    rPr.append(sz)
    szCs = OxmlElement("w:szCs")
    szCs.set(qn("w:val"), str(int(round(font_size_pt * 2))))
    rPr.append(szCs)

    if bold:
        rPr.append(OxmlElement("w:b"))

    if color_hex:
        c = OxmlElement("w:color")
        c.set(qn("w:val"), color_hex)
        rPr.append(c)

    if underline:
        u = OxmlElement("w:u")
        u.set(qn("w:val"), "single")
        rPr.append(u)

    new_run.append(rPr)
    new_run_text = OxmlElement("w:t")
    new_run_text.text = text
    new_run.append(new_run_text)
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)


def add_bottom_border(paragraph, color_hex: str = HEX_ACCENT, size_eighth_pts: int = 8):
    """Add a subtle hairline border below a heading paragraph."""
    _, OxmlElement, qn, _, _, _, _ = _load_docx_modules()
    pPr = paragraph._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), str(size_eighth_pts))
    bottom.set(qn("w:space"), "3")
    bottom.set(qn("w:color"), color_hex)
    pBdr.append(bottom)
    pPr.append(pBdr)


def add_formatted_runs(paragraph, text: str, font_size=None, default_color=None, font_name="Calibri"):
    """Parse inline **bold** syntax and add runs to paragraph."""
    _, _, _, _, _, Pt, palette = _load_docx_modules()
    if font_size is None:
        font_size = Pt(8.8)
    if default_color is None:
        default_color = palette["body"]
    parts = text.split("**")
    for i, part in enumerate(parts):
        if not part:
            continue
        run = paragraph.add_run(part)
        run.font.name = font_name
        run.font.size = font_size
        run.font.color.rgb = default_color
        if i % 2 == 1:
            run.font.bold = True


def build_docx(data: dict, preset: str, output_path: Path):
    """Generate ATS-optimized DOCX from master CV data using python-docx."""
    docx, _, _, _, Inches, Pt, palette = _load_docx_modules()
    COLOR_INK = palette["ink"]
    COLOR_ACCENT = palette["accent"]
    COLOR_MUTED = palette["muted"]
    COLOR_BODY = palette["body"]
    doc = docx.Document()

    # Set page margins
    section = doc.sections[0]
    section.page_width = Inches(8.27)    # A4 width
    section.page_height = Inches(11.69)  # A4 height
    section.top_margin = Inches(0.48)
    section.bottom_margin = Inches(0.48)
    section.left_margin = Inches(0.55)
    section.right_margin = Inches(0.55)

    basics = data["basics"]

    # 1. Candidate Header
    p_name = doc.add_paragraph()
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(1)
    run_name = p_name.add_run(basics["name"])
    run_name.font.name = "Calibri"
    run_name.font.size = Pt(20)
    run_name.font.bold = True
    run_name.font.color.rgb = COLOR_INK

    # Subtitle
    title_text = basics["title_by_preset"].get(preset, basics["title_by_preset"]["master"])
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(3)
    run_title = p_title.add_run(title_text)
    run_title.font.name = "Calibri"
    run_title.font.size = Pt(9.8)
    run_title.font.bold = True
    run_title.font.color.rgb = COLOR_ACCENT

    # Contact line with hyperlinks
    contact = basics["contact"]
    p_contact = doc.add_paragraph()
    p_contact.paragraph_format.space_before = Pt(0)
    p_contact.paragraph_format.space_after = Pt(6)

    def add_contact_item(label: str, url: str = None):
        if url:
            add_hyperlink(p_contact, url, label, color_hex=HEX_LINK, underline=False)
        else:
            r = p_contact.add_run(label)
            r.font.name = "Calibri"
            r.font.size = Pt(8.5)
            r.font.color.rgb = COLOR_MUTED

    def add_separator():
        r = p_contact.add_run("  •  ")
        r.font.name = "Calibri"
        r.font.size = Pt(8.5)
        r.font.color.rgb = COLOR_MUTED

    add_contact_item(contact["location"])
    add_separator()
    add_contact_item(contact["email"], f"mailto:{contact['email']}")
    add_separator()
    add_contact_item(contact["phone"], f"tel:{contact['phone'].replace(' ', '')}")
    add_separator()
    add_contact_item("linkedin.com/in/aaradhya-dev-tamrakar", contact["linkedin"])
    add_separator()
    add_contact_item("github.com/AaradhyaDT", contact["github"])
    add_separator()
    add_contact_item("aaradhyadt.github.io", contact["website"])
    if contact.get("scholar") and preset in ("research", "master"):
        add_separator()
        add_contact_item("scholar.google.com", contact["scholar"])

    # 2. Profile Summary
    profile_text = basics["profiles_by_preset"].get(preset, basics["profiles_by_preset"]["master"])
    p_prof = doc.add_paragraph()
    p_prof.paragraph_format.space_before = Pt(0)
    p_prof.paragraph_format.space_after = Pt(8)
    p_prof.paragraph_format.line_spacing = 1.15
    add_formatted_runs(p_prof, profile_text, font_size=Pt(8.8), default_color=COLOR_BODY)

    def add_section_header(title: str):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(9)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        add_bottom_border(p, HEX_ACCENT, 8)
        r = p.add_run(title)
        r.font.name = "Calibri"
        r.font.size = Pt(10.2)
        r.font.bold = True
        r.font.color.rgb = COLOR_ACCENT

    # 3. Education
    add_section_header("EDUCATION")
    for edu in data.get("education", []):
        if preset != "master" and preset not in edu.get("tags", []):
            continue
        p_edu = doc.add_paragraph()
        p_edu.paragraph_format.space_before = Pt(2)
        p_edu.paragraph_format.space_after = Pt(1)
        p_edu.paragraph_format.keep_with_next = True

        r_deg = p_edu.add_run(edu["degree"])
        r_deg.font.name = "Calibri"
        r_deg.font.size = Pt(9.3)
        r_deg.font.bold = True
        r_deg.font.color.rgb = COLOR_INK

        r_dates = p_edu.add_run(f"  |  {edu['dates']}")
        r_dates.font.name = "Calibri"
        r_dates.font.size = Pt(8.5)
        r_dates.font.color.rgb = COLOR_MUTED

        p_sub = doc.add_paragraph()
        p_sub.paragraph_format.space_before = Pt(0)
        p_sub.paragraph_format.space_after = Pt(2)
        p_sub.paragraph_format.keep_with_next = True
        r_inst = p_sub.add_run(f"{edu['institution']}  •  {edu['gpa']}")
        r_inst.font.name = "Calibri"
        r_inst.font.size = Pt(8.6)
        r_inst.font.color.rgb = COLOR_MUTED

        if preset in ["master", "research", "systems", "aiml"]:
            p_cw = doc.add_paragraph()
            p_cw.paragraph_format.space_before = Pt(0)
            p_cw.paragraph_format.space_after = Pt(4)
            r_cw_label = p_cw.add_run("Relevant Coursework: ")
            r_cw_label.font.name = "Calibri"
            r_cw_label.font.size = Pt(8.4)
            r_cw_label.font.bold = True
            r_cw_label.font.color.rgb = COLOR_INK

            r_cw = p_cw.add_run(" · ".join(edu.get("coursework", [])))
            r_cw.font.name = "Calibri"
            r_cw.font.size = Pt(8.4)
            r_cw.font.color.rgb = COLOR_MUTED

    # 4. Fellowships & Applied ML Experience
    add_section_header("FELLOWSHIPS & APPLIED ML EXPERIENCE")
    for fel in data.get("fellowships", []):
        if preset != "master" and preset not in fel.get("tags", []):
            continue
        p_fel = doc.add_paragraph()
        p_fel.paragraph_format.space_before = Pt(3)
        p_fel.paragraph_format.space_after = Pt(1)
        p_fel.paragraph_format.keep_with_next = True

        r_ft = p_fel.add_run(f"{fel['title']} — {fel['organization']}")
        r_ft.font.name = "Calibri"
        r_ft.font.size = Pt(9.3)
        r_ft.font.bold = True
        r_ft.font.color.rgb = COLOR_INK

        r_fd = p_fel.add_run(f"  |  {fel['dates']}")
        r_fd.font.name = "Calibri"
        r_fd.font.size = Pt(8.5)
        r_fd.font.color.rgb = COLOR_MUTED

        # Bullets
        for b in fel.get("bullets", []):
            if preset != "master":
                if preset not in b.get("tags", []):
                    continue
                if preset == "compact" and b.get("priority", 1) > 1:
                    continue
            p_b = doc.add_paragraph(style="List Bullet")
            p_b.paragraph_format.space_before = Pt(0)
            p_b.paragraph_format.space_after = Pt(1.5)
            p_b.paragraph_format.line_spacing = 1.15
            add_formatted_runs(p_b, b["text"], font_size=Pt(8.7))

    # 5. Research & Technical Projects
    add_section_header("RESEARCH & TECHNICAL PROJECTS")
    for proj in data.get("projects", []):
        if preset != "master" and preset not in proj.get("tags", []):
            continue
        p_proj = doc.add_paragraph()
        p_proj.paragraph_format.space_before = Pt(3.5)
        p_proj.paragraph_format.space_after = Pt(0.5)
        p_proj.paragraph_format.keep_with_next = True

        # Project title (hyperlinked if github/portfolio exists)
        link = proj.get("links", {}).get("portfolio") or proj.get("links", {}).get("github")
        if link:
            add_hyperlink(
                p_proj,
                link,
                proj["title"],
                color_hex=HEX_INK,
                underline=False,
                font_name="Calibri",
                font_size_pt=9.3,
                bold=True,
            )
        else:
            r_pt = p_proj.add_run(proj["title"])
            r_pt.font.name = "Calibri"
            r_pt.font.size = Pt(9.3)
            r_pt.font.bold = True
            r_pt.font.color.rgb = COLOR_INK

        r_pd = p_proj.add_run(f"  |  {proj['dates']}")
        r_pd.font.name = "Calibri"
        r_pd.font.size = Pt(8.5)
        r_pd.font.color.rgb = COLOR_MUTED

        # Tech stack
        p_ts = doc.add_paragraph()
        p_ts.paragraph_format.space_before = Pt(0)
        p_ts.paragraph_format.space_after = Pt(2)
        p_ts.paragraph_format.keep_with_next = True
        r_ts = p_ts.add_run(" · ".join(proj.get("tech_stack", [])))
        r_ts.font.name = "Calibri"
        r_ts.font.size = Pt(8.3)
        r_ts.font.color.rgb = COLOR_MUTED

        # Bullets
        for b in proj.get("bullets", []):
            if preset != "master":
                if preset not in b.get("tags", []):
                    continue
                if preset == "compact" and b.get("priority", 1) > 1:
                    continue
            p_b = doc.add_paragraph(style="List Bullet")
            p_b.paragraph_format.space_before = Pt(0)
            p_b.paragraph_format.space_after = Pt(1.5)
            p_b.paragraph_format.line_spacing = 1.15
            add_formatted_runs(p_b, b["text"], font_size=Pt(8.7))

    # 6. Leadership & Service
    add_section_header("LEADERSHIP & SERVICE")
    for lead in data.get("leadership_and_service", []):
        if preset != "master" and preset not in lead.get("tags", []):
            continue
        p_lead = doc.add_paragraph()
        p_lead.paragraph_format.space_before = Pt(2.5)
        p_lead.paragraph_format.space_after = Pt(1)
        p_lead.paragraph_format.keep_with_next = True

        r_lr = p_lead.add_run(f"{lead['role']} — {lead['organization']}")
        r_lr.font.name = "Calibri"
        r_lr.font.size = Pt(9.1)
        r_lr.font.bold = True
        r_lr.font.color.rgb = COLOR_INK

        r_ld = p_lead.add_run(f"  |  {lead['dates']}")
        r_ld.font.name = "Calibri"
        r_ld.font.size = Pt(8.5)
        r_ld.font.color.rgb = COLOR_MUTED

        for b_text in lead.get("bullets", []):
            p_b = doc.add_paragraph(style="List Bullet")
            p_b.paragraph_format.space_before = Pt(0)
            p_b.paragraph_format.space_after = Pt(1.5)
            p_b.paragraph_format.line_spacing = 1.15
            add_formatted_runs(p_b, b_text, font_size=Pt(8.7))

    # 7. Technical Skills
    add_section_header("TECHNICAL SKILLS")
    for cat in data.get("skills", {}).get("categories", []):
        if preset != "master" and preset not in cat.get("tags", []):
            continue
        p_sk = doc.add_paragraph()
        p_sk.paragraph_format.space_before = Pt(0)
        p_sk.paragraph_format.space_after = Pt(1.5)

        r_cn = p_sk.add_run(f"{cat['name']}: ")
        r_cn.font.name = "Calibri"
        r_cn.font.size = Pt(8.7)
        r_cn.font.bold = True
        r_cn.font.color.rgb = COLOR_INK

        r_slist = p_sk.add_run(", ".join(cat["skills"]))
        r_slist.font.name = "Calibri"
        r_slist.font.size = Pt(8.7)
        r_slist.font.color.rgb = COLOR_BODY

    # 8. Certifications & Activities (Master and Research/Academic)
    if preset in ["master", "research", "academic"]:
        add_section_header("CERTIFICATIONS, WORKSHOPS & ACTIVITIES")
        p_cert = doc.add_paragraph()
        p_cert.paragraph_format.space_before = Pt(0)
        p_cert.paragraph_format.space_after = Pt(2)
        p_cert.paragraph_format.line_spacing = 1.15
        cert_items = [f"{c['name']} ({c.get('date', '')})" for c in data.get("certifications_and_activities", [])]
        add_formatted_runs(p_cert, "  •  ".join(cert_items), font_size=Pt(8.5), default_color=COLOR_MUTED)

    # 9. Academic References (Master and Academic)
    if preset in ["master", "academic", "research"]:
        add_section_header("ACADEMIC & PROFESSIONAL REFERENCES")
        for ref in data.get("references", []):
            if preset != "master" and preset not in ref.get("tags", []):
                continue
            p_ref = doc.add_paragraph()
            p_ref.paragraph_format.space_before = Pt(2)
            p_ref.paragraph_format.space_after = Pt(1)
            p_ref.paragraph_format.keep_with_next = True

            r_rn = p_ref.add_run(f"{ref['name']} — {ref['title']}")
            r_rn.font.name = "Calibri"
            r_rn.font.size = Pt(8.8)
            r_rn.font.bold = True
            r_rn.font.color.rgb = COLOR_INK

            p_ri = doc.add_paragraph()
            p_ri.paragraph_format.space_before = Pt(0)
            p_ri.paragraph_format.space_after = Pt(2)
            email_str = f"  •  Email: {ref['email']}" if ref.get("email") else ""
            r_inst = p_ri.add_run(f"{ref['institution']}{email_str}. Context: {ref['relationship']}")
            r_inst.font.name = "Calibri"
            r_inst.font.size = Pt(8.4)
            r_inst.font.color.rgb = COLOR_MUTED

    output_path.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(output_path))
    print(f"Generated DOCX: {output_path} ({output_path.stat().st_size:,} bytes)")


def convert_docx_to_pdf(docx_path: Path, pdf_path: Path):
    """Convert DOCX to vector PDF using WordCraft CLI."""
    if not WORDCRAFT_CLI.exists():
        raise FileNotFoundError(f"WordCraft CLI not found at: {WORDCRAFT_CLI}")

    cmd = [str(WORDCRAFT_CLI), "convert", str(docx_path), str(pdf_path)]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"WordCraft conversion failed: {res.stderr}\n{res.stdout}")
    print(f"Generated PDF: {pdf_path} ({pdf_path.stat().st_size:,} bytes)")


def verify_pdf(pdf_path: Path):
    """Inspect generated PDF using PyMuPDF (page count, text integrity)."""
    import pymupdf
    doc = pymupdf.open(str(pdf_path))
    page_count = len(doc)
    total_chars = sum(len(p.get_text()) for p in doc)
    print(f"Verified PDF {pdf_path.name}: {page_count} page(s), {total_chars:,} characters extracted.")
    return page_count


def check_claims(data: dict):
    """Verify that all core quantitative claims match the claims register."""
    print("Verifying quantitative claims against registry...")
    data_str = json.dumps(data)

    required_claims = [
        ("0.9185", "SPARK SisFall AUC-ROC"),
        ("18.5 KB", "SPARK quantized INT8 CNN model footprint"),
        ("126", "BiasAperture demographic bins"),
    ]

    for val, desc in required_claims:
        if val not in data_str:
            raise AssertionError(f"Claims mismatch! Missing {desc} ('{val}') in master CV data.")
        print(f"  [OK] Claim verified: {desc} ({val})")
    print("All quantitative claims formally verified.")


def _strip_md(text: str) -> str:
    """Remove inline **bold** markers for plain-text web resume entries."""
    return text.replace("**", "")


def _source_sha256(raw_text: str) -> str:
    """Compute cross-platform LF-normalized SHA-256 digest of master_cv.json."""
    normalized = raw_text.replace("\r\n", "\n").encode("utf-8")
    return hashlib.sha256(normalized).hexdigest()


def _build_web_role(data: dict, preset: str, title: str, project_section_title: str) -> dict:
    """Project a single web role view deterministically from master_cv.json."""
    sections = []

    # Education
    edu_items = []
    for edu in data.get("education", []):
        if preset != "master" and preset not in edu.get("tags", []):
            continue
        cw = ", ".join(edu.get("coursework", []))
        status = edu.get("status", "Final Year")
        gpa = edu.get("gpa", "")
        bullet = f"{status}{f'; {gpa}' if gpa else ''}. Coursework: {cw}."
        edu_items.append({
            "header": edu["degree"],
            "sub": f"{edu['institution']} | {edu['dates']}",
            "bullets": [bullet],
        })
    if edu_items:
        sections.append({"title": "Education", "items": edu_items})

    # Projects
    proj_items = []
    for proj in data.get("projects", []):
        if preset != "master" and preset not in proj.get("tags", []):
            continue
        bullets = [
            _strip_md(b["text"])
            for b in proj.get("bullets", [])
            if preset == "master" or preset in b.get("tags", [])
        ]
        proj_items.append({
            "header": proj["title"],
            "sub": " · ".join(proj.get("tech_stack", [])),
            "bullets": bullets,
        })
    if proj_items:
        sections.append({"title": project_section_title, "items": proj_items})

    # Fellowships
    fel_items = []
    for fel in data.get("fellowships", []):
        if preset != "master" and preset not in fel.get("tags", []):
            continue
        bullets = [
            _strip_md(b["text"])
            for b in fel.get("bullets", [])
            if preset == "master" or preset in b.get("tags", [])
        ]
        fel_items.append({
            "header": f"{fel['title']} | {fel['organization']}",
            "sub": fel["dates"],
            "bullets": bullets,
        })
    if fel_items:
        sections.append({"title": "Fellowships", "items": fel_items})

    # Technical Skills
    skill_items = []
    for cat in data.get("skills", {}).get("categories", []):
        if preset != "master" and preset not in cat.get("tags", []):
            continue
        skill_items.append({
            "header": cat["name"],
            "sub": ", ".join(cat.get("skills", [])),
        })
    if skill_items:
        sections.append({"title": "Technical Skills", "items": skill_items})

    # Leadership & Engineering Service
    lead_items = []
    for lead in data.get("leadership_and_service", []):
        if preset != "master" and preset not in lead.get("tags", []):
            continue
        lead_items.append({
            "header": f"{lead['organization']} | {lead['role']}",
            "sub": lead["dates"],
            "bullets": [_strip_md(b) for b in lead.get("bullets", [])],
        })
    if lead_items:
        sections.append({"title": "Leadership and Engineering Service", "items": lead_items})

    return {"title": title, "sections": sections}


def generate_resume_js(data: dict, raw_text: str) -> str:
    """Deterministically compile assets/js/data/resume-data.js from data/master_cv.json."""
    basics = data["basics"]
    contact = basics["contact"]
    contact_line = " · ".join([
        contact["location"],
        contact["email"],
        contact["phone"],
        contact["linkedin"].replace("https://", ""),
        contact["github"].replace("https://", ""),
        contact["website"].replace("https://", ""),
    ])
    payload = {
        "name": basics["name"],
        "subtitle": basics["title_by_preset"]["master"],
        "contact": contact_line,
        "summary": _strip_md(basics["profiles_by_preset"]["master"]),
        "roles": {
            "all": _build_web_role(data, "master", "Engineering CV", "Selected Engineering Projects"),
            "aiml": _build_web_role(data, "aiml", "AI/ML Engineering CV", "Selected Engineering Projects"),
            "hardware": _build_web_role(data, "systems", "Embedded AI and Systems CV", "Embedded, Systems and Robotics Projects"),
            "fullstack": _build_web_role(data, "fullstack", "AI Systems and Developer Tools CV", "AI and Developer Infrastructure"),
        },
    }
    digest = _source_sha256(raw_text)[:16]
    last_updated = data.get("metadata", {}).get("last_updated", "unknown")
    header = (
        f"/* AUTO-GENERATED from data/master_cv.json (SSOT, updated {last_updated}, sha256:{digest}).\n"
        f" * Do not hand-edit. Regenerate with: python scripts/compile_cv.py --sync-web */\n"
    )
    return header + "const RESUME_DATA = " + json.dumps(payload, indent=2, ensure_ascii=False) + ";\n"


def sync_web_resume_data(data: dict, raw_text: str, out_path: Path = RESUME_JS_FILE) -> Path:
    """Write deterministically compiled resume-data.js from master_cv.json."""
    content = generate_resume_js(data, raw_text)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(content, encoding="utf-8", newline="\n")
    print(f"Synced SSOT web resume data: {out_path} ({len(content):,} chars)")
    return out_path


def check_ssot(data: dict, raw_text: str, resume_js_path: Path = RESUME_JS_FILE) -> list[str]:
    """Verify Single Source of Truth invariants across master_cv.json, resume-data.js, projects.html, and docs."""
    errors: list[str] = []

    try:
        check_claims(data)
    except AssertionError as exc:
        errors.append(str(exc))

    # 1. Verify projects.html anchor links referenced in master_cv.json
    if PROJECTS_HTML.exists():
        projects_html = PROJECTS_HTML.read_text(encoding="utf-8", errors="ignore")
        valid_ids = set(re.findall(r'id="(p-\d+)"', projects_html))
        for proj in data.get("projects", []):
            url = proj.get("links", {}).get("portfolio", "")
            m = re.search(r"#(p-\d+)$", url)
            if m and m.group(1) not in valid_ids:
                errors.append(f"Broken portfolio anchor in master_cv.json: {proj['id']} -> {url}")

    # 2. Verify resume-data.js is in exact sync with master_cv.json
    expected_js = generate_resume_js(data, raw_text).replace("\r\n", "\n")
    if not resume_js_path.exists():
        errors.append(f"Missing derived web resume file: {resume_js_path}")
    else:
        actual_js = resume_js_path.read_text(encoding="utf-8").replace("\r\n", "\n")
        if actual_js != expected_js:
            errors.append(
                "SSOT drift detected: assets/js/data/resume-data.js does not match data/master_cv.json. "
                "Run: python scripts/compile_cv.py --sync-web"
            )

    # 3. Verify all 6 compiled DOCX & PDF presets exist
    for preset in ALL_PRESETS:
        suffix = "" if preset == "master" else f"_{preset.upper()}"
        for ext in (".docx", ".pdf"):
            artifact = OUTPUT_DIR / f"AARADHYA_DEV_TAMRAKAR_CV{suffix}{ext}"
            if not artifact.exists() or artifact.stat().st_size == 0:
                errors.append(f"Missing or empty compiled CV artifact: {artifact.relative_to(ROOT)}")

    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--preset", default="master",
                        choices=ALL_PRESETS,
                        help="Target role preset (default: master)")
    parser.add_argument("--data", type=Path, default=DATA_FILE, help="Path to master CV JSON")
    parser.add_argument("--output-docx", type=Path, default=None, help="Custom output DOCX path")
    parser.add_argument("--output-pdf", type=Path, default=None, help="Custom output PDF path")
    parser.add_argument("--format", default="both", choices=["docx", "pdf", "both"], help="Output format")
    parser.add_argument("--check-claims", action="store_true", help="Audit quantitative claims before compiling")
    parser.add_argument("--all-presets", action="store_true", help="Compile all presets in batch and sync web resume data")
    parser.add_argument("--sync-web", action="store_true", help="Regenerate assets/js/data/resume-data.js from master_cv.json")
    parser.add_argument("--check-ssot", action="store_true", help="Verify SSOT parity across master_cv.json, resume-data.js, anchors, and docs without compiling")
    args = parser.parse_args()

    if not args.data.exists():
        sys.exit(f"Data file not found: {args.data}")

    raw_text = args.data.read_text(encoding="utf-8")
    data = json.loads(raw_text)

    if args.check_ssot and not (args.sync_web or args.all_presets):
        errors = check_ssot(data, raw_text)
        if errors:
            for err in errors:
                print(f"  [FAIL] {err}")
            sys.exit(1)
        print("SSOT check passed: master_cv.json, resume-data.js, project anchors, and all 6 DOCX/PDF presets are synchronized.")
        return

    if args.sync_web and not args.all_presets:
        check_claims(data)
        sync_web_resume_data(data, raw_text)
        if args.check_ssot:
            errors = check_ssot(data, raw_text)
            if errors:
                for err in errors:
                    print(f"  [FAIL] {err}")
                sys.exit(1)
            print("SSOT check passed.")
        return

    check_claims(data)

    presets = ALL_PRESETS if args.all_presets else [args.preset]

    for p in presets:
        print(f"\n--- Compiling preset: {p.upper()} ---")
        if args.output_docx:
            docx_out = args.output_docx
        else:
            name_suffix = "" if p == "master" else f"_{p.upper()}"
            docx_out = OUTPUT_DIR / f"AARADHYA_DEV_TAMRAKAR_CV{name_suffix}.docx"

        if args.output_pdf:
            pdf_out = args.output_pdf
        else:
            name_suffix = "" if p == "master" else f"_{p.upper()}"
            pdf_out = OUTPUT_DIR / f"AARADHYA_DEV_TAMRAKAR_CV{name_suffix}.pdf"

        # Generate DOCX
        if args.format in ["docx", "both"]:
            build_docx(data, p, docx_out)

        # Generate PDF
        if args.format in ["pdf", "both"]:
            convert_docx_to_pdf(docx_out, pdf_out)
            verify_pdf(pdf_out)

    if args.all_presets or args.sync_web:
        sync_web_resume_data(data, raw_text)

    if args.check_ssot:
        errors = check_ssot(data, raw_text)
        if errors:
            for err in errors:
                print(f"  [FAIL] {err}")
            sys.exit(1)

    print("\nCompilation pipeline completed successfully.")


if __name__ == "__main__":
    main()
