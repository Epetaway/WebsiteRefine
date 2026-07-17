from pathlib import Path
import sys

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
DOCUMENTS = {
    "Earl-Hickson-Jr-Resume.pdf": {
        "path": ROOT / "client" / "public" / "assets" / "Earl-Hickson-Jr-Resume.pdf",
        "max_pages": 2,
        "expected": ["Earl Hickson Jr.", "UX Engineer", "Professional experience", "AMA Fight Club", "Kean University"],
        "title": "Earl Hickson Jr. - UX Engineer Resume",
    },
    "Earl-Hickson-Jr-HCI-Graduate-CV.pdf": {
        "path": ROOT / "client" / "public" / "assets" / "application" / "Earl-Hickson-Jr-HCI-Graduate-CV.pdf",
        "max_pages": 2,
        "expected": ["HCI Graduate Application CV", "Research interests", "Selected HCI investigations", "Methods sought through formal study"],
        "title": "Earl Hickson Jr. - HCI Graduate Application CV",
    },
}

errors = []
for filename, specification in DOCUMENTS.items():
    path = specification["path"]
    if path.name != filename:
        errors.append(f"Unexpected filename: {path.name}; expected {filename}")
        continue
    if not path.exists() or path.stat().st_size == 0:
        errors.append(f"Missing or empty PDF: {path}")
        continue

    reader = PdfReader(str(path))
    if len(reader.pages) > specification["max_pages"]:
        errors.append(f"{filename} has {len(reader.pages)} pages; maximum is {specification['max_pages']}")
    extracted = "\n".join(page.extract_text() or "" for page in reader.pages)
    for expected in specification["expected"]:
        if expected.casefold() not in extracted.casefold():
            errors.append(f"{filename} is missing expected selectable text: {expected}")
    metadata = reader.metadata or {}
    if metadata.get("/Title") != specification["title"]:
        errors.append(f"{filename} has incorrect title metadata: {metadata.get('/Title')}")
    if metadata.get("/Author") != "Earl Hickson Jr.":
        errors.append(f"{filename} has incorrect author metadata: {metadata.get('/Author')}")
    uris = []
    for page in reader.pages:
        for annotation_reference in page.get("/Annots", []):
            annotation = annotation_reference.get_object()
            action = annotation.get("/A")
            if action and action.get("/URI"):
                uris.append(action.get("/URI"))
    for required_uri in ("mailto:e@ehicksonjr.com", "https://linkedin.com/in/earlhicksonjr", "https://github.com/Epetaway"):
        if required_uri not in uris:
            errors.append(f"{filename} is missing required link: {required_uri}")

if errors:
    print("\n".join(f"ERROR: {error}" for error in errors), file=sys.stderr)
    raise SystemExit(1)

for filename, specification in DOCUMENTS.items():
    reader = PdfReader(str(specification["path"]))
    print(f"validated {filename}: {len(reader.pages)} pages, {specification['path'].stat().st_size} bytes")
