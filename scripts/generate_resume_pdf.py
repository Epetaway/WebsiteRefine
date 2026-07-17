from __future__ import annotations

import json
from pathlib import Path
from shutil import copyfile
from xml.sax.saxutils import escape

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "client" / "src" / "data" / "professionalFacts.json"
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_RESUME = ROOT / "client" / "public" / "assets" / "Earl-Hickson-Jr-Resume.pdf"
PUBLIC_CV = ROOT / "client" / "public" / "assets" / "application" / "Earl-Hickson-Jr-HCI-Graduate-CV.pdf"
OUTPUT_RESUME = OUTPUT_DIR / "Earl-Hickson-Jr-Resume.pdf"
OUTPUT_CV = OUTPUT_DIR / "Earl-Hickson-Jr-HCI-Graduate-CV.pdf"

INK = HexColor("#151515")
MUTED = HexColor("#5C5A57")
PURPLE = HexColor("#6A49C8")
LIGHT_PURPLE = HexColor("#EEE9FA")
RULE = HexColor("#D5D0C8")


def ascii_dashes(value: str) -> str:
    return (
        value.replace("\u2010", "-")
        .replace("\u2011", "-")
        .replace("\u2012", "-")
        .replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2192", "to")
    )


def text(value: str) -> str:
    return escape(ascii_dashes(value))


with DATA_PATH.open(encoding="utf-8") as source:
    facts = json.load(source)

profile = facts["profile"]
experience = facts["professionalExperience"]
education = facts["education"]
certifications = facts["certifications"]
capabilities = facts["capabilities"]

styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=23,
    leading=25,
    textColor=INK,
    spaceAfter=2,
)
title_style = ParagraphStyle(
    "Title",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=11,
    leading=14,
    textColor=PURPLE,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.1,
    leading=12.5,
    textColor=MUTED,
    alignment=TA_RIGHT,
)
section_style = ParagraphStyle(
    "Section",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=10.5,
    leading=12.5,
    tracking=1.1,
    textColor=PURPLE,
    spaceBefore=11,
    spaceAfter=6,
    keepWithNext=True,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.7,
    leading=13.1,
    textColor=INK,
    spaceAfter=4,
)
job_style = ParagraphStyle(
    "Job",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10.3,
    leading=12.4,
    textColor=INK,
)
meta_style = ParagraphStyle(
    "Meta",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.1,
    leading=11.5,
    textColor=MUTED,
)
date_style = ParagraphStyle("Date", parent=meta_style, alignment=TA_RIGHT)
bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    leftIndent=11,
    firstLineIndent=-8,
    bulletIndent=0,
    spaceAfter=2,
)
small_style = ParagraphStyle(
    "Small",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.2,
    leading=12.2,
    textColor=INK,
    spaceAfter=3,
)
label_style = ParagraphStyle(
    "Label",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.8,
    leading=10.5,
    tracking=0.8,
    textColor=PURPLE,
)


def section_label(value: str) -> Paragraph:
    return Paragraph(text(value.upper()), section_style)


def bullet(value: str) -> Paragraph:
    return Paragraph(f"<bullet>&bull;</bullet>{text(value)}", bullet_style)


def document_header(subtitle: str) -> Table:
    links = profile["links"]
    contact = (
        f'<link href="mailto:{links["email"]}">{text(links["email"])}</link><br/>'
        f'<link href="{links["linkedin"]}">linkedin.com/in/earlhicksonjr</link><br/>'
        f'<link href="{links["github"]}">github.com/Epetaway</link>'
    )
    header = Table(
        [
            [Paragraph(text(profile["name"]), name_style), Paragraph(contact, contact_style)],
            [Paragraph(text(subtitle), title_style), ""],
        ],
        colWidths=[4.7 * inch, 2.35 * inch],
    )
    header.setStyle(
        TableStyle(
            [
                ("SPAN", (1, 0), (1, 1)),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return header


def experience_entry(item: dict, compact: bool = False):
    heading = Table(
        [[Paragraph(text(item["role"]), job_style), Paragraph(text(item["dates"]), date_style)]],
        colWidths=[5.35 * inch, 1.7 * inch],
    )
    heading.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    content = [heading, Paragraph(text(item["company"]), meta_style), Spacer(1, 2)]
    if item["bullets"] and not compact:
        content.extend(bullet(value) for value in item["bullets"])
    else:
        content.append(Paragraph(text(item["summary"]), small_style))
    content.append(Spacer(1, 4))
    return KeepTogether(content)


def item_heading(primary: str, secondary: str, description: str):
    return KeepTogether(
        [
            Paragraph(text(primary), job_style),
            Paragraph(text(secondary), meta_style),
            Spacer(1, 1),
            Paragraph(text(description), small_style),
            Spacer(1, 4),
        ]
    )


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(PURPLE)
    canvas.setLineWidth(1.2)
    canvas.line(0.62 * inch, 0.42 * inch, 1.12 * inch, 0.42 * inch)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawRightString(7.88 * inch, 0.38 * inch, f"EARL HICKSON JR.  /  {doc.page}")
    canvas.restoreState()


def build_document(path: Path, title: str, story: list):
    path.parent.mkdir(parents=True, exist_ok=True)
    document = BaseDocTemplate(
        str(path),
        pagesize=letter,
        leftMargin=0.62 * inch,
        rightMargin=0.62 * inch,
        topMargin=0.52 * inch,
        bottomMargin=0.58 * inch,
        title=title,
        author=profile["name"],
        subject="Professional application materials",
        creator="ehicksonjr.com canonical professional-data system",
    )
    frame = Frame(
        document.leftMargin,
        document.bottomMargin,
        document.width,
        document.height,
        id="content",
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    document.addPageTemplates(PageTemplate(id="document", frames=[frame], onPage=on_page))
    document.build(story)


def resume_story():
    story = [
        document_header(profile["title"]),
        Spacer(1, 9),
        section_label("Professional summary"),
        Paragraph(text(f'{profile["summary"]} {profile["careerContext"]}'), body_style),
        section_label("Professional experience"),
    ]
    for item in experience[:3]:
        story.append(experience_entry(item))

    story.append(section_label("Selected independent investigations"))
    projects = [
        ("WithYou", "React Native / TypeScript / Express / PostgreSQL / Prisma", "Independent HCI investigation into connection, privacy, and field-level sharing decisions."),
        ("DojoNet", "React / Vite / TypeScript / Tailwind CSS", "Independent HCI investigation into reflection and qualitative progression without false completion scores."),
        ("Gundam Forge", "Next.js / React / TypeScript / Supabase / Vitest", "Independent HCI investigation into continuous validation and decision support; unofficial fan project."),
    ]
    for project in projects:
        story.append(item_heading(*project))

    story.extend([PageBreak(), section_label("Earlier experience")])
    for item in experience[3:]:
        story.append(experience_entry(item, compact=True))

    story.append(section_label("Capabilities"))
    rows = []
    for index in range(0, len(capabilities), 2):
        pair = capabilities[index : index + 2]
        rows.append([Paragraph(text(item["group"].upper()), label_style) for item in pair])
        rows.append([Paragraph(text(item["items"]), small_style) for item in pair])
    capability_table = Table(rows, colWidths=[3.48 * inch, 3.48 * inch])
    capability_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(capability_table)
    story.append(section_label("Education and certification"))
    for item in education:
        story.append(item_heading(item["degree"], f'{item["institution"]} / {item["location"]} / {item["date"]}', "Formal foundation in visual communication, hierarchy, typography, and composition."))
    for item in certifications:
        verification = f'<link href="{item["verificationUrl"]}">{text(item["verificationUrl"].replace("https://", ""))}</link>'
        story.extend([Paragraph(text(item["name"]), job_style), Paragraph(text(f'{item["issuer"]} / Verified {item["date"]}'), meta_style), Paragraph(verification, meta_style)])
    return story


def graduate_cv_story():
    research_interests = " / ".join(facts["researchInterests"])
    story = [
        document_header("HCI Graduate Application CV"),
        Spacer(1, 9),
        section_label("Research profile"),
        Paragraph(
            text("UX Engineer and independent HCI practitioner with a background in graphic design, frontend engineering, and full-stack product development. My research interests focus on how interactive systems can support human capability across relationships, learning, privacy, and complex decision-making without unnecessarily replacing human agency."),
            body_style,
        ),
        section_label("Research interests"),
        Paragraph(text(research_interests), body_style),
        section_label("Education and certification"),
    ]
    for item in education:
        story.append(item_heading(item["degree"], f'{item["institution"]} / {item["location"]} / {item["date"]}', "Graphic design training in visual communication, hierarchy, typography, and composition."))
    for item in certifications:
        story.append(item_heading(item["name"], f'{item["issuer"]} / Verified {item["date"]}', item["verificationUrl"]))

    story.append(section_label("Selected HCI investigations"))
    investigations = [
        ("WithYou - Independent HCI investigation", "Privacy, consent, and relationships", "Designed and implemented a beta-oriented relationship application and a focused sharing prototype. Known gap: one legacy endpoint retains earlier unconditional behavior. Proposed next methods: scope-comprehension testing, scenarios, and interviews."),
        ("DojoNet - Independent HCI investigation", "Learning, reflection, and progression", "Designed and implemented practitioner-facing learning surfaces and a qualitative progression prototype. Instructor workflows remain incomplete. Proposed next methods: diary study, observation, and instructor interviews."),
        ("Gundam Forge - Independent HCI investigation", "Information architecture and decision support", "Built a functional beta-oriented deck-building and playtesting system with continuous validation and a heuristic opponent. Proposed next methods: comparative decision tasks and think-aloud usability testing."),
    ]
    for item in investigations:
        story.append(item_heading(*item))

    story.extend([section_label("Technical preparation"), Paragraph(text("Methods used: " + "; ".join(facts["researchPreparation"]["used"]) + "."), body_style)])
    for capability in capabilities:
        story.append(Paragraph(f'<b>{text(capability["group"])}:</b> {text(capability["items"])}', small_style))

    story.extend([PageBreak(), section_label("Professional experience")])
    for item in experience:
        story.append(experience_entry(item, compact=True))

    teaching = facts["teachingPerspective"]
    story.extend(
        [
            section_label("Teaching and leadership"),
            Paragraph(text(teaching["summary"]), body_style),
            Paragraph(text(teaching["publicRecordStatus"]), meta_style),
            section_label("Selected writing"),
        ]
    )
    writing = [
        ("Teaching Jiu-Jitsu Changed the Way I Think About UX", "Learning, feedback, reflection, and the difference between information transfer and capability."),
        ("Designing Consent Into Digital Products", "Privacy architecture, field-level visibility, and the gap between interface promises and implementation paths."),
        ("What Trading Card Games Teach Us About Information Architecture", "Recognition, constraint timing, and decision support without replacing player judgment."),
    ]
    for title, description in writing:
        story.append(item_heading(title, "Field Notes / ehicksonjr.com/field-notes", description))

    story.extend(
        [
            section_label("Methods sought through formal study"),
            Paragraph(text(" / ".join(facts["researchPreparation"]["seeking"])), body_style),
            Paragraph(text("These methods are training goals and proposed evaluation directions, not completed research claims."), meta_style),
        ]
    )
    return story


OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
PUBLIC_RESUME.parent.mkdir(parents=True, exist_ok=True)
PUBLIC_CV.parent.mkdir(parents=True, exist_ok=True)

build_document(OUTPUT_RESUME, "Earl Hickson Jr. - UX Engineer Resume", resume_story())
build_document(OUTPUT_CV, "Earl Hickson Jr. - HCI Graduate Application CV", graduate_cv_story())
copyfile(OUTPUT_RESUME, PUBLIC_RESUME)
copyfile(OUTPUT_CV, PUBLIC_CV)

print(OUTPUT_RESUME)
print(OUTPUT_CV)
