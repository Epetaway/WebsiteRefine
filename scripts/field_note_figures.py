#!/usr/bin/env python3
"""Builds the Field Note figures from Earl's shared screenshot catalog.

Source: ~/Dev/Screenshots (catalog notes in that folder's CLAUDE.md; set SCREENSHOTS_DIR to
override). Each screenshot is a real device capture with demo/QA data. Nothing is retouched,
cropped or recoloured; each is only resized and re-encoded as WebP with metadata stripped.

Output: client/public/assets/field-notes/figures/<note-slug>/<name>-{600,1080}.webp
Provenance and alt-text rules: docs/FIELD-NOTE-FIGURES.md

    python3 scripts/field_note_figures.py        (needs Pillow: python3 -m pip install pillow)
"""

import hashlib
import os
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = Path(os.environ.get("SCREENSHOTS_DIR", Path.home() / "Dev/Screenshots"))
OUT = ROOT / "client/public/assets/field-notes/figures"
WIDTHS = (600, 1080)

# note slug -> (output name, source path inside the catalog)
FIGURES = {
    "a-bridge-you-meet-each-other-on": [
        ("withyou-today", "WithYou/today/01-today-dashboard.png"),
        ("withyou-guidance", "WithYou/guidance/01-guidance-overview.png"),
    ],
    "designing-consent": [
        ("withyou-quick-note-review", "WithYou/connect/03-quick-note-review.png"),
        ("withyou-weekly-check-in", "WithYou/weekly-check-in/02-weekly-question-form.png"),
    ],
}


def main() -> int:
    if not SOURCE.is_dir():
        print(f"Screenshot catalog not found: {SOURCE} (set SCREENSHOTS_DIR)", file=sys.stderr)
        return 1
    for slug, figures in FIGURES.items():
        for name, relative in figures:
            source = SOURCE / relative
            image = Image.open(source).convert("RGB")
            digest = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
            for width in WIDTHS:
                height = round(image.height * width / image.width)
                target = OUT / slug / f"{name}-{width}.webp"
                target.parent.mkdir(parents=True, exist_ok=True)
                image.resize((width, height), Image.Resampling.LANCZOS).save(
                    target, "WEBP", quality=84, method=6
                )
                print(f"{relative} ({digest}) -> {target.relative_to(ROOT)} {width}x{height}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
