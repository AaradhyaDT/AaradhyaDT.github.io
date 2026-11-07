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
  python scripts/compile_cv.py --check-claims
"""

import argparse
import json
from pathlib import Path
import re
import subprocess
import sys

import docx
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE
from docx.shared import Inches, Pt, RGBColor

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "data" / "master_cv.json"
OUTPUT_DIR = ROOT / "assets" / "docs"
WORDCRAFT_CLI = Path(r"F:\wordcraft-0.10.0-windows-x64-portable\wordcraft-cli.exe")

# Typographic Palette
COLOR_INK = RGBColor(0x17, 0x21, 0x2B)        # Deep Charcoal
COLOR_ACCENT = RGBColor(0x27, 0x4C, 0x5E)     # Slate Teal / Navy
COLOR_MUTED = RGBColor(0x4B, 0x55, 0x63)      # Muted Gray
COLOR_BODY = RGBColor(0x1F, 0x29, 0x37)       # Body text
HEX_ACCENT = "274C5E"
HEX_INK = "17212B"
HEX_LINK = "1E3A8A"


def add_hyperlink(paragraph, url: str, text: str, color_hex: str = HEX_LINK, underline: bool = True):
    """Add a native Word hyperlink XML element to a paragraph."""
    part = paragraph.part
    r_id = part.relate_to(url, RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)

    new_run = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")

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
    pPr = paragraph._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), str(size_eighth_pts))
    bottom.set(qn("w:space"), "3")
    bottom.set(qn("w:color"), color_hex)
    pBdr.append(bottom)
    pPr.append(pBdr)


def add_formatted_runs(paragraph, text: str, font_size=Pt(8.8), default_color=COLOR_BODY, font_name="Calibri"):
    """Parse inline **bold** syntax and add runs to paragraph."""
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
            add_hyperlink(p_proj, link, proj["title"], color_hex=HEX_INK, underline=False)
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


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--preset", default="master",
                        choices=["master", "research", "systems", "aiml", "fullstack", "compact"],
                        help="Target role preset (default: master)")
    parser.add_argument("--data", type=Path, default=DATA_FILE, help="Path to master CV JSON")
    parser.add_argument("--output-docx", type=Path, default=None, help="Custom output DOCX path")
    parser.add_argument("--output-pdf", type=Path, default=None, help="Custom output PDF path")
    parser.add_argument("--format", default="both", choices=["docx", "pdf", "both"], help="Output format")
    parser.add_argument("--check-claims", action="store_true", help="Audit quantitative claims before compiling")
    parser.add_argument("--all-presets", action="store_true", help="Compile all presets in batch")
    args = parser.parse_args()

    if not args.data.exists():
        sys.exit(f"Data file not found: {args.data}")

    data = json.loads(args.data.read_text(encoding="utf-8"))

    if args.check_claims or True:
        check_claims(data)

    presets = ["master", "research", "systems", "aiml", "fullstack", "compact"] if args.all_presets else [args.preset]

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

    print("\nCompilation pipeline completed successfully.")


if __name__ == "__main__":
    main()
