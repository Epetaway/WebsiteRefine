from pathlib import Path

import pdfplumber
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
FILES = {
    "public resume": ROOT
    / "client"
    / "public"
    / "assets"
    / "Earl-Hickson-Jr-Resume.pdf",
    "graduate CV": ROOT
    / "client"
    / "public"
    / "assets"
    / "application"
    / "Earl-Hickson-Jr-HCI-Graduate-CV.pdf",
}

BANNED = [
    "HCI Graduate Study (Planned)",
    "Applications in progress",
    "Maintained in two variants",
    "Request a tailored variant",
    "10+ years",
    "150+",
    "20%",
    "12%",
    # Stale chronology replaced by the Oct 24, 2026 resume.
    "Merck",
    "Verizon",
    "531 integration tests",
    "17 E2E flows",
]


def validate(label: str, path: Path) -> None:
    if not path.exists() or path.stat().st_size < 5_000:
        raise AssertionError(f"{label}: missing or unexpectedly small file")

    reader = PdfReader(path)
    if len(reader.pages) != 2:
        raise AssertionError(f"{label}: expected 2 pages, found {len(reader.pages)}")

    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    for expected in [
        "Earl Hickson Jr.",
        "Lead Front-End Engineer",
        "e@ehicksonjr.com",
        "linkedin.com/in/earlhicksonjr",
        "github.com/Epetaway",
    ]:
        if expected not in text:
            raise AssertionError(f"{label}: missing expected text {expected!r}")

    for phrase in BANNED:
        if phrase.lower() in text.lower():
            raise AssertionError(f"{label}: contains blocked phrase {phrase!r}")

    annotations = sum(len(page.get("/Annots", [])) for page in reader.pages)
    if annotations < 4:
        raise AssertionError(f"{label}: expected working link annotations")

    metadata = reader.metadata or {}
    if "Earl Hickson Jr." not in str(metadata.get("/Title", "")):
        raise AssertionError(f"{label}: missing document title metadata")

    with pdfplumber.open(path) as pdf:
        character_sizes = [
            float(character["size"])
            for page in pdf.pages
            for character in page.chars
            if str(character.get("text", "")).strip()
        ]
    if not character_sizes or min(character_sizes) < 8.9:
        raise AssertionError(
            f"{label}: text below the 9 point minimum "
            f"(minimum {min(character_sizes):.2f})"
        )


for document_label, document_path in FILES.items():
    validate(document_label, document_path)

public_text = "\n".join(
    page.extract_text() or ""
    for page in PdfReader(FILES["public resume"]).pages
)
if "Graduate CV" in public_text:
    raise AssertionError("public resume: graduate CV language leaked into employment resume")
# The public resume carries the resume's full record, including the two confirmed metrics.
for expected in [
    "SUMMARY",
    "TECHNICAL SKILLS",
    "PROFESSIONAL EXPERIENCE",
    "SELECTED PROJECTS",
    "COACHING AND LEADERSHIP",
    "EDUCATION AND CERTIFICATIONS",
    "AMA Fight Club",
    "Asembia",
    "BroadcastMed",
    "Prosek Partners",
    "Merkle",
    "18%",
    "25%",
]:
    if expected not in public_text:
        raise AssertionError(f"public resume: missing {expected!r}")

graduate_text = "\n".join(
    page.extract_text() or ""
    for page in PdfReader(FILES["graduate CV"]).pages
)
for expected in ["HCI Graduate Applicant", "RESEARCH INTERESTS", "SELECTED WRITING"]:
    if expected not in graduate_text:
        raise AssertionError(f"graduate CV: missing {expected!r}")

print("PDF validation passed for public resume and graduate CV.")
