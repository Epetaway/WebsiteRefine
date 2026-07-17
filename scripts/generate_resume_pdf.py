import json
import subprocess
from pathlib import Path
from shutil import copyfile
from xml.sax.saxutils import escape

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "resume" / "content.json"
OUTPUT = ROOT / "output" / "pdf"
PUBLIC_RESUME = OUTPUT / "Earl-Hickson-Jr-Resume.pdf"
GRADUATE_CV = OUTPUT / "Earl-Hickson-Jr-HCI-Graduate-CV.pdf"
PUBLIC_ASSET = ROOT / "client" / "public" / "assets" / PUBLIC_RESUME.name
GRADUATE_ASSET = (
    ROOT / "client" / "public" / "assets" / "application" / GRADUATE_CV.name
)

INK = HexColor("#151515")
MUTED = HexColor("#5C5853")
ORCHID = HexColor("#A83E6F")
LINE = HexColor("#D7D0C5")


def normalize(value: str) -> str:
    return (
        value.replace("\u2014", "-")
        .replace("\u2013", "-")
        .replace("\u2011", "-")
        .replace("\u2010", "-")
        .replace("\u2018", "'")
        .replace("\u2019", "'")
        .replace("\u201c", '"')
        .replace("\u201d", '"')
        .replace("\u00b7", "|")
    )


def escaped(value: str) -> str:
    return escape(normalize(value))


def link(label: str, target: str) -> str:
    return f'<link href="{escape(target)}" color="#5E2141">{escaped(label)}</link>'


def load_data() -> dict:
    subprocess.run(
        ["npx", "tsx", "scripts/export-professional-data.ts"],
        cwd=ROOT,
        check=True,
    )
    return json.loads(CONTENT.read_text(encoding="utf-8"))


base = getSampleStyleSheet()
styles = {
    "name": ParagraphStyle(
        "Name",
        parent=base["Title"],
        fontName="Helvetica-Bold",
        fontSize=23,
        leading=25,
        textColor=INK,
        spaceAfter=2,
        alignment=TA_LEFT,
    ),
    "title": ParagraphStyle(
        "Title",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=13,
        tracking=0.8,
        textColor=ORCHID,
        spaceAfter=6,
    ),
    "contact": ParagraphStyle(
        "Contact",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        textColor=MUTED,
        spaceAfter=4,
    ),
    "section": ParagraphStyle(
        "Section",
        parent=base["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=12,
        tracking=1.1,
        textColor=ORCHID,
        spaceBefore=9,
        spaceAfter=5,
    ),
    "body": ParagraphStyle(
        "Body",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=12.5,
        textColor=INK,
        spaceAfter=4,
    ),
    "job": ParagraphStyle(
        "Job",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10.2,
        leading=12,
        textColor=INK,
        spaceAfter=1,
    ),
    "meta": ParagraphStyle(
        "Meta",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=11,
        textColor=MUTED,
        spaceAfter=3,
    ),
    "bullet": ParagraphStyle(
        "Bullet",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=12,
        leftIndent=12,
        firstLineIndent=-8,
        bulletIndent=0,
        textColor=INK,
        spaceAfter=2,
    ),
    "footer": ParagraphStyle(
        "Footer",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=10,
        textColor=MUTED,
        alignment=TA_RIGHT,
    ),
}


def paragraph(text: str, style: str = "body") -> Paragraph:
    return Paragraph(escaped(text), styles[style])


def heading(text: str) -> Paragraph:
    return Paragraph(escaped(text.upper()), styles["section"])


def bullet(text: str) -> Paragraph:
    return Paragraph(escaped(text), styles["bullet"], bulletText="-")


def add_header(story: list, data: dict, subtitle: str) -> None:
    profile = data["profile"]
    links = data["links"]
    story.extend(
        [
            paragraph(profile["name"], "name"),
            paragraph(subtitle, "title"),
            Paragraph(
                " | ".join(
                    [
                        link(links["email"], f'mailto:{links["email"]}'),
                        link("ehicksonjr.com", links["website"]),
                        link("linkedin.com/in/earlhicksonjr", links["linkedin"]),
                        link("github.com/Epetaway", links["github"]),
                    ]
                ),
                styles["contact"],
            ),
            Spacer(1, 4),
        ]
    )


def add_experience(story: list, data: dict) -> None:
    story.append(heading("Professional experience"))
    for item in data["experience"]:
        block = [
            Paragraph(
                f'{escaped(item["role"])} | {escaped(item["employer"])}',
                styles["job"],
            ),
            paragraph(f'{item["dates"]} | {item["area"]}', "meta"),
        ]
        responsibilities = item["responsibilities"]
        if responsibilities:
            block.extend(bullet(value) for value in responsibilities)
        else:
            block.append(paragraph(item["summary"]))
        block.append(Spacer(1, 4))
        story.append(KeepTogether(block))


def add_investigations(story: list, data: dict, graduate: bool = False) -> None:
    story.append(
        heading(
            "Selected independent HCI investigations"
            if graduate
            else "Selected product investigations"
        )
    )
    for item in data["investigations"]:
        label = (
            f'{item["name"]} | Independent HCI investigation'
            if graduate
            else f'{item["name"]} | {item["status"]}'
        )
        block = [Paragraph(escaped(label), styles["job"])]
        block.append(paragraph(item["question"], "meta"))
        if not graduate:
            block.append(paragraph(item["product"]))
        block.append(
            paragraph(
                f'Contribution: {item["role"]}. Evidence boundary: '
                f'{item["limitations"][0]}'
            )
        )
        if not graduate:
            block.append(paragraph(f'Stack: {" | ".join(item["stack"])}', "meta"))
        block.extend(
            [
                Paragraph(
                    link(
                        f'ehicksonjr.com/work/{item["slug"]}',
                        f'https://ehicksonjr.com/work/{item["slug"]}',
                    ),
                    styles["meta"],
                ),
                Spacer(1, 3),
            ]
        )
        story.append(KeepTogether(block))


def add_capabilities(story: list, data: dict, heading_text: str) -> None:
    story.append(heading(heading_text))
    for group in data["capabilities"]:
        story.append(
            Paragraph(
                f'<b>{escaped(group["label"])}:</b> '
                f'{escaped(", ".join(group["items"]))}',
                styles["body"],
            )
        )


def add_education(story: list, data: dict) -> None:
    story.append(heading("Education and certification"))
    for item in data["education"]:
        story.append(
            Paragraph(
                f'<b>{escaped(item["credential"])}</b> | '
                f'{escaped(item["institution"])} | {escaped(item["completed"])}',
                styles["body"],
            )
        )
    for item in data["certifications"]:
        story.append(
            Paragraph(
                f'<b>{escaped(item["credential"])}</b> | '
                f'{escaped(item["issuer"])} | {escaped(item["completed"])}',
                styles["body"],
            )
        )
        story.append(
            Paragraph(link("Verify certificate", item["verificationUrl"]), styles["meta"])
        )


def add_teaching(story: list, data: dict) -> None:
    story.append(heading("Teaching and leadership"))
    story.append(paragraph(data["teaching"]["summary"]))
    story.append(paragraph(data["teaching"]["evidenceBoundary"], "meta"))


def add_methods(story: list, data: dict) -> None:
    story.append(heading("Research preparation"))
    story.append(
        Paragraph(
            f'<b>Methods used:</b> '
            f'{escaped(" | ".join(data["research"]["methodsUsed"]))}',
            styles["body"],
        )
    )
    story.append(
        Paragraph(
            f'<b>Methods sought through graduate study:</b> '
            f'{escaped(" | ".join(data["research"]["methodsSought"]))}',
            styles["body"],
        )
    )


def add_writing(story: list, data: dict) -> None:
    story.append(heading("Selected writing"))
    for item in data["selectedWriting"]:
        url = f'https://ehicksonjr.com{item["path"]}'
        story.append(
            Paragraph(
                f'{link(item["title"], url)} | {escaped(item["theme"])} | '
                f'{escaped(item["date"])}',
                styles["body"],
            )
        )


def page_footer(document_label: str):
    def draw(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(0.5)
        canvas.line(
            doc.leftMargin,
            0.46 * inch,
            letter[0] - doc.rightMargin,
            0.46 * inch,
        )
        canvas.setFont("Helvetica", 9)
        canvas.setFillColor(MUTED)
        canvas.drawString(doc.leftMargin, 0.27 * inch, document_label)
        canvas.drawRightString(
            letter[0] - doc.rightMargin,
            0.27 * inch,
            f"{doc.page}",
        )
        canvas.restoreState()

    return draw


def build_pdf(path: Path, story: list, title: str, document_label: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(path),
        pagesize=letter,
        rightMargin=0.58 * inch,
        leftMargin=0.58 * inch,
        topMargin=0.5 * inch,
        bottomMargin=0.58 * inch,
        title=title,
        author="Earl Hickson Jr.",
        subject=document_label,
        creator="WebsiteRefine canonical professional-data pipeline",
    )
    footer = page_footer(document_label)
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def public_resume_story(data: dict) -> list:
    story = []
    add_header(story, data, data["profile"]["publicTitle"])
    story.append(heading("Professional summary"))
    story.append(paragraph(data["profile"]["summary"]))
    add_experience(story, data)
    add_capabilities(story, data, "Capabilities")
    story.append(PageBreak())
    add_investigations(story, data)
    add_education(story, data)
    add_teaching(story, data)
    return story


def graduate_cv_story(data: dict) -> list:
    story = []
    add_header(story, data, "HCI Graduate Applicant | UX Engineer")
    story.append(heading("Applicant summary"))
    story.append(paragraph(data["profile"]["graduateSummary"]))
    story.append(heading("Research interests"))
    story.append(paragraph(" | ".join(data["research"]["interests"])))
    add_education(story, data)
    add_investigations(story, data, graduate=True)
    add_capabilities(story, data, "Technical preparation")
    story.append(PageBreak())
    add_experience(story, data)
    add_teaching(story, data)
    add_methods(story, data)
    add_writing(story, data)
    return story


def main() -> None:
    data = load_data()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    build_pdf(
        PUBLIC_RESUME,
        public_resume_story(data),
        "Earl Hickson Jr. - UX Engineer Resume",
        "Earl Hickson Jr. | UX Engineer Resume",
    )
    build_pdf(
        GRADUATE_CV,
        graduate_cv_story(data),
        "Earl Hickson Jr. - HCI Graduate CV",
        "Earl Hickson Jr. | HCI Graduate CV",
    )
    PUBLIC_ASSET.parent.mkdir(parents=True, exist_ok=True)
    GRADUATE_ASSET.parent.mkdir(parents=True, exist_ok=True)
    copyfile(PUBLIC_RESUME, PUBLIC_ASSET)
    copyfile(GRADUATE_CV, GRADUATE_ASSET)
    print(f"Wrote {PUBLIC_RESUME.relative_to(ROOT)}")
    print(f"Wrote {GRADUATE_CV.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
