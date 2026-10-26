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
        spaceBefore=6,
        spaceAfter=3,
    ),
    "body": ParagraphStyle(
        "Body",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=11,
        textColor=INK,
        spaceAfter=2.5,
    ),
    "job": ParagraphStyle(
        "Job",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=11.8,
        textColor=INK,
        spaceAfter=0.5,
    ),
    "meta": ParagraphStyle(
        "Meta",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=10.8,
        textColor=MUTED,
        spaceAfter=2,
    ),
    "bullet": ParagraphStyle(
        "Bullet",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=10.7,
        leftIndent=11,
        firstLineIndent=-8,
        bulletIndent=0,
        textColor=INK,
        spaceAfter=1.2,
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


def add_flowing(story: list, block: list, head: int = 3) -> None:
    """Keep a heading with its first lines, then let the rest break across pages.

    Keeping a whole long role together leaves large gaps at the bottom of a page.
    """
    story.append(KeepTogether(block[:head]))
    story.extend(block[head:])


def display_url(url: str) -> str:
    for prefix in ("https://www.", "http://www.", "https://", "http://"):
        if url.startswith(prefix):
            url = url[len(prefix):]
            break
    return url.rstrip("/")


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
                        escaped(profile["location"]),
                        link(links["email"], f'mailto:{links["email"]}'),
                        link("ehicksonjr.com", links["website"]),
                        link(display_url(links["linkedin"]), links["linkedin"]),
                        link(display_url(links["github"]), links["github"]),
                    ]
                ),
                styles["contact"],
            ),
            Spacer(1, 4),
        ]
    )


def add_experience(story: list, data: dict, detailed: bool = True) -> None:
    story.append(heading("Professional experience"))
    for item in data["experience"]:
        block = [
            Paragraph(
                f'{escaped(item["role"])} | {escaped(item["employer"])}',
                styles["job"],
            ),
            paragraph(f'{item["location"]} | {item["dates"]}', "meta"),
        ]
        engagements = item.get("engagements") or []
        if not detailed:
            block.append(paragraph(item["summary"]))
        else:
            block.extend(bullet(value) for value in item["responsibilities"])
            for engagement in engagements:
                block.append(
                    Paragraph(
                        f'<b>{escaped(engagement["client"])}</b> | '
                        f'{escaped(engagement["role"])} | {escaped(engagement["dates"])}',
                        styles["body"],
                    )
                )
                block.extend(bullet(value) for value in engagement["responsibilities"])
            if not item["responsibilities"] and not engagements:
                block.append(paragraph(item["summary"]))
        block.append(Spacer(1, 2))
        add_flowing(story, block)
    story.append(paragraph(data["earlierExperience"], "meta"))


def add_selected_projects(story: list, data: dict) -> None:
    story.append(heading("Selected projects"))
    for item in data["selectedProjects"]:
        meta = [escaped(" | ".join(item["stack"]))]
        if item["live"]:
            meta.append(link(item["live"]["label"], item["live"]["url"]))
        meta.append(
            link(
                f'ehicksonjr.com/work/{item["slug"]}',
                f'https://ehicksonjr.com/work/{item["slug"]}',
            )
        )
        block = [
            Paragraph(
                f'{escaped(item["name"])} | {escaped(item["descriptor"])} | '
                f'{escaped(item["status"])}',
                styles["job"],
            ),
            Paragraph(" | ".join(meta), styles["meta"]),
        ]
        block.extend(bullet(value) for value in item["highlights"])
        block.append(Spacer(1, 2))
        add_flowing(story, block)


def add_investigations(story: list, data: dict) -> None:
    story.append(heading("Selected independent HCI investigations"))
    for item in data["investigations"]:
        block = [
            Paragraph(
                escaped(f'{item["name"]} | Independent HCI investigation'),
                styles["job"],
            ),
            paragraph(item["question"], "meta"),
            paragraph(
                f'Contribution: {item["role"]}. Evidence boundary: '
                f'{item["limitations"][0]}'
            ),
            Paragraph(
                link(
                    f'ehicksonjr.com/work/{item["slug"]}',
                    f'https://ehicksonjr.com/work/{item["slug"]}',
                ),
                styles["meta"],
            ),
            Spacer(1, 3),
        ]
        story.append(KeepTogether(block))


def add_capabilities(story: list, data: dict, heading_text: str) -> None:
    story.append(heading(heading_text))
    for group in data["capabilities"]:
        label = group["label"]
        if group.get("note"):
            label = f'{label} ({group["note"][0].lower()}{group["note"][1:]})'
        story.append(
            Paragraph(
                f'<b>{escaped(label)}:</b> '
                f'{escaped(", ".join(group["items"]))}',
                styles["body"],
            )
        )


def add_education(story: list, data: dict) -> None:
    story.append(heading("Education and certifications"))
    for item in data["education"]:
        story.append(
            Paragraph(
                f'<b>{escaped(item["credential"])}</b> | '
                f'{escaped(item["institution"])}, {escaped(item["location"])} | '
                f'{escaped(item["completed"])}',
                styles["body"],
            )
        )
    for item in data["certifications"]:
        verify = (
            f' | {link("Verify", item["verificationUrl"])}'
            if item.get("verificationUrl")
            else ""
        )
        story.append(
            Paragraph(
                f'<b>{escaped(item["credential"])}</b> | '
                f'{escaped(item["issuer"])} | {escaped(item["completed"])}{verify}',
                styles["body"],
            )
        )


def add_teaching(story: list, data: dict) -> None:
    story.append(heading("Coaching and leadership"))
    story.append(paragraph(data["teaching"]["summary"]))
    for position in data["teaching"]["positions"]:
        story.append(
            Paragraph(
                f'<b>{escaped(position["academy"])}</b> | {escaped(position["role"])} | '
                f'{escaped(position["location"])} | {escaped(position["dates"])}',
                styles["body"],
            )
        )


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
        rightMargin=0.5 * inch,
        leftMargin=0.5 * inch,
        topMargin=0.42 * inch,
        bottomMargin=0.55 * inch,
        title=title,
        author="Earl Hickson Jr.",
        subject=document_label,
        creator="WebsiteRefine canonical professional-data pipeline",
    )
    footer = page_footer(document_label)
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def public_resume_story(data: dict) -> list:
    profile = data["profile"]
    story = []
    add_header(
        story,
        data,
        " | ".join([profile["publicTitle"], *profile["specialties"]]),
    )
    story.append(heading("Summary"))
    story.append(paragraph(profile["summary"]))
    add_capabilities(story, data, "Technical skills")
    add_experience(story, data)
    add_selected_projects(story, data)
    add_teaching(story, data)
    add_education(story, data)
    return story


def graduate_cv_story(data: dict) -> list:
    story = []
    add_header(story, data, f'HCI Graduate Applicant | {data["profile"]["publicTitle"]}')
    story.append(heading("Applicant summary"))
    story.append(paragraph(data["profile"]["graduateSummary"]))
    story.append(heading("Research interests"))
    story.append(paragraph(" | ".join(data["research"]["interests"])))
    add_education(story, data)
    add_investigations(story, data)
    add_capabilities(story, data, "Technical preparation")
    story.append(PageBreak())
    add_experience(story, data, detailed=False)
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
        f'Earl Hickson Jr. - {data["profile"]["publicTitle"]} Resume',
        f'Earl Hickson Jr. | {data["profile"]["publicTitle"]} Resume',
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
