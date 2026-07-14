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
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "Earl-Hickson-Jr-Resume.pdf"
PUBLIC = ROOT / "client" / "public" / "assets" / "Earl-Hickson-Jr-Resume.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)
PUBLIC.parent.mkdir(parents=True, exist_ok=True)

INK = HexColor("#151515")
MUTED = HexColor("#66615B")
PINK = HexColor("#C65788")
GOLD = HexColor("#E4AE3A")
PAPER = HexColor("#F7F3EB")

styles = getSampleStyleSheet()
name = ParagraphStyle("Name", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=22, leading=24, textColor=INK, spaceAfter=2)
title = ParagraphStyle("Title", parent=styles["Normal"], fontName="Helvetica-Oblique", fontSize=10.5, leading=12, textColor=MUTED)
contact = ParagraphStyle("Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=7.5, leading=9.5, textColor=MUTED, alignment=TA_RIGHT)
section = ParagraphStyle("Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=7.2, leading=8.5, tracking=1.3, textColor=PINK, spaceBefore=7, spaceAfter=4)
summary = ParagraphStyle("Summary", parent=styles["Normal"], fontName="Helvetica", fontSize=8, leading=10.2, textColor=INK)
job = ParagraphStyle("Job", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.7, leading=10, textColor=INK)
meta = ParagraphStyle("Meta", parent=styles["Normal"], fontName="Helvetica", fontSize=7.4, leading=9, textColor=MUTED)
dates = ParagraphStyle("Dates", parent=meta, alignment=TA_RIGHT)
bullet = ParagraphStyle("Bullet", parent=styles["Normal"], fontName="Helvetica", fontSize=7.35, leading=8.8, leftIndent=8, firstLineIndent=-5, bulletIndent=0, textColor=INK, spaceAfter=1)
small = ParagraphStyle("Small", parent=styles["Normal"], fontName="Helvetica", fontSize=7.35, leading=9.1, textColor=INK)

jobs = [
    ("Front-End Developer & Digital Integration Specialist", "AMA Fight Club", "Jan 2025 - 2025", ["Redesigned the responsive website and improved mobile UX.", "Integrated Zen Planner lead capture and CRM workflows, ZipRecruiter forms, and QR campaigns.", "Evaluated platforms and digital tools supporting operations and marketing."]),
    ("Front-End Developer", "Asembia", "Dec 2023 - Oct 2024", ["Developed reusable component architecture and design-system patterns across healthcare platforms.", "Migrated Bootstrap 3 interfaces to Bootstrap 5 and improved prescriber-portal information layouts.", "Integrated REST APIs in a .NET environment and advanced WCAG 2.1 AA-aligned accessibility practices.", "Presented component architecture and product value to executive leadership."]),
    ("Lead Designer & Front-End Developer", "BroadcastMed", "Nov 2021 - Mar 2023", ["Designed and developed healthcare marketing microsites within a proprietary CMS.", "Created a standardized HTML email system and used Analytics and Hotjar findings to guide UX work.", "Mentored teammates and strengthened code-review and QA practices."]),
    ("Freelance Front-End Developer", "Merck", "2019", ["Delivered front-end development supporting digital marketing and communications initiatives."]),
    ("Front-End Developer", "Verizon Wireless", "2015 - 2016", ["Developed consumer-facing digital interfaces and internal tools."]),
    ("Digital Designer & Front-End Developer", "KBS&P", "2014 - 2015", ["Combined digital design and front-end development for enterprise clients at a New York advertising agency."]),
]


def section_label(text):
    return Paragraph(escape(text.upper()), section)


def entry(role, company, when, bullets):
    header = Table([[Paragraph(escape(role), job), Paragraph(escape(when), dates)]], colWidths=[5.15 * inch, 1.35 * inch])
    header.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "BOTTOM"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    content = [header, Paragraph(escape(company), meta), Spacer(1, 1.5)]
    content.extend(Paragraph(f"• {escape(item)}", bullet) for item in bullets)
    content.append(Spacer(1, 2.5))
    return KeepTogether(content)


def page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, letter[0], letter[1], fill=1, stroke=0)
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(1.5)
    canvas.line(0.55 * inch, 0.43 * inch, 1.05 * inch, 0.43 * inch)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7)
    canvas.drawRightString(7.95 * inch, 0.39 * inch, f"EARL HICKSON JR.  /  {doc.page}")
    canvas.restoreState()


doc = BaseDocTemplate(str(OUT), pagesize=letter, leftMargin=0.58 * inch, rightMargin=0.58 * inch, topMargin=0.4 * inch, bottomMargin=0.5 * inch, title="Earl Hickson Jr. Resume", author="Earl Hickson Jr.")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="resume", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
doc.addPageTemplates(PageTemplate(id="resume", frames=[frame], onPage=page))

story = []
header = Table([[Paragraph("Earl Hickson Jr.", name), Paragraph("e@ehicksonjr.com<br/>linkedin.com/in/earlhicksonjr<br/>github.com/Epetaway", contact)], [Paragraph("UX Engineer", title), ""]], colWidths=[4.4 * inch, 2.1 * inch])
header.setStyle(TableStyle([("SPAN", (1, 0), (1, 1)), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
story += [header, Spacer(1, 5), section_label("Professional Summary"), Paragraph("UX Engineer whose practice has progressed from graphic design to digital design, front-end development, and human-centered product engineering. Experienced in accessible interfaces, reusable component systems, API-integrated products, and independent full-stack applications. Currently working outside technology while pursuing a return to full-time product work.", summary), section_label("Professional Experience")]
for item in jobs:
    story.append(entry(*item))

story += [section_label("Selected Product Investigations")]
projects = [
    ("WithYou", "React Native / Node.js / Express / PostgreSQL / Prisma", "Designed and developed a relationship-centered application exploring privacy, shared interaction, and user-controlled information visibility."),
    ("Gundam Forge", "Next.js / React / TypeScript / Supabase / Vitest", "Built a deck-building and playtesting application with continuous count validation, deployment-dependent persistence, and heuristic opponent behavior."),
    ("DojoNet", "React / Vite / TypeScript / Tailwind CSS", "Designing a martial arts learning system supporting progression and reflection without reducing learning to task completion."),
]
for project, stack, description in projects:
    story += [KeepTogether([Paragraph(escape(project), job), Paragraph(escape(stack), meta), Spacer(1, 1), Paragraph(escape(description), small), Spacer(1, 3)])]

capabilities = [[Paragraph("INTERACTION & PRODUCT", meta), Paragraph("FRONT-END ENGINEERING", meta)], [Paragraph("User flows, information architecture, interaction design, prototyping, responsive design, design systems, accessibility", small), Paragraph("React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, component architecture, state management", small)], [Paragraph("BACKEND & DATA", meta), Paragraph("QUALITY & DELIVERY", meta)], [Paragraph("Node.js, Express, REST APIs, PostgreSQL, Prisma, Supabase, authentication, real-time systems", small), Paragraph("Behavior testing, Testing Library, Git/GitHub, CI/CD, Vite, deployment workflows", small)]]
cap_table = Table(capabilities, colWidths=[3.18 * inch, 3.18 * inch], rowHeights=[None] * 4, hAlign="LEFT")
cap_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 12), ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
story += [KeepTogether([section_label("Capabilities"), cap_table]), section_label("Education & Certification"), Paragraph("<b>BFA, Graphic Design</b>  /  Kean University, Union, New Jersey  /  2015", small), Spacer(1, 5), Paragraph("<b>IBM Full Stack Software Developer Professional Certificate</b>  /  Coursera / IBM  /  Verified December 2025", small), Paragraph("coursera.org/verify/professional-cert/ZD6SUR06VY2K", meta)]

doc.build(story)
copyfile(OUT, PUBLIC)
print(OUT)
