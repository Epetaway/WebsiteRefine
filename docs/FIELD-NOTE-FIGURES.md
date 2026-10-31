# Field Note design: brands and figures

Field Notes come in two forms and share one page layout (`client/src/pages/field-note.tsx`):

- **Text-only notes** render as a reading column with the evidence note beside it.
- **Notes with figures** add a phone screen after a section's text, with a numbered caption beside it
  (stacked when the reading column is narrower than 640px), and a figure index in the evidence note.

A figure is an optional `figure` on a section in `client/src/data/fieldNotes.ts`. The Field Notes index
shows each note's figure count, or "Text" for text-only notes.

## Brands

A note set `project` in `client/src/data/fieldNotes.ts` takes that project's brand; a note without one
uses the portfolio brand. Brands are defined in `client/src/data/noteBrands.ts` and applied by
`client/src/styles/field-notes.css` through `--nb-*` custom properties.

| From the portfolio (always) | From the project brand |
|---|---|
| Header, grid, reading column, evidence note, figure system | Hero and footer surface with its two glows |
| Manrope headings and body, JetBrains Mono labels | Accent and secondary accent on the dark surface |
| The EH monogram | Paper and second paper tone for the reading column |
| | Ink for rules, labels and links on paper |
| | Figure-frame surface and corner radius |
| | Its own lockup, beside the EH monogram ("EH × WithYou") |

Project typefaces (Inter for WithYou, Bebas Neue for DojoNet, Orbitron for Gundam Forge) appear only in
the lockup. The WithYou mark is the case study's own `WyMark` (`client/src/components/withyou/WyMark.tsx`).

Colours come from each case study's stylesheet. `note-brands.test.tsx` checks every text pairing
(text, accent, secondary accent and muted on surface; ink on both papers; surface on accent; body ink
on paper) meets WCAG AA 4.5:1, so a token change that breaks contrast fails the tests.

| Note | Project |
|---|---|
| 01 Teaching Jiu-Jitsu Changed the Way I Think About UX | DojoNet |
| 02 Designing Consent Into Digital Products | WithYou |
| 03 What Trading Card Games Teach Us About Information Architecture | Gundam Forge |
| 04 A Bridge You Meet Each Other On | WithYou |

## Figure rules

- **Show only what the section describes.** A figure must show the screen the text is talking about.
  If no real capture shows it, the note stays text-only.
- **Alt text describes what is on screen** for someone who can't see it: the screen's name, the visible
  wording that matters, and the state. It doesn't interpret or add claims.
- **The caption says why the screen matters** to the argument, and claims no more than the screen shows.
- **The source line says where it came from:** product, platform, data used, capture date.
- Demo or QA accounts only. No personal data, debug overlays or developer seed labels in the frame.

`npm run validate:content` fails when an image is missing at either width, alt text is under 40
characters, a caption or source is empty, or the alt text repeats the caption.

## Source and build

Images come from Earl's shared screenshot catalog at `~/Dev/Screenshots` (that folder's `CLAUDE.md`
records how each set was captured). `scripts/field_note_figures.py` maps each figure to its source file
and writes `client/public/assets/field-notes/figures/<note-slug>/<name>-{600,1080}.webp`. Images are only
resized and re-encoded; metadata is stripped and nothing is cropped or retouched.

```bash
python3 -m pip install pillow   # once
python3 scripts/field_note_figures.py   # SCREENSHOTS_DIR overrides ~/Dev/Screenshots
```

| Note | Figure | Source file | Captured |
|---|---|---|---|
| A Bridge You Meet Each Other On | 01 Today screen | `WithYou/today/01-today-dashboard.png` | Oct 28, 2026, Samsung Android, demo account |
| A Bridge You Meet Each Other On | 02 Guidance | `WithYou/guidance/01-guidance-overview.png` | same |
| Designing Consent Into Digital Products | 01 Quick Note review | `WithYou/connect/03-quick-note-review.png` | same |
| Designing Consent Into Digital Products | 02 Weekly check-in | `WithYou/weekly-check-in/02-weekly-question-form.png` | same |

## Not used, and why (Oct 31, 2026)

- `WithYou/spark-profile/…`, `spark-wishlist/…`, `spark-partner-view/…`: they would illustrate
  field-level visibility well, but item names carry developer seed tags (DEVPRIV, JORDANSHARED,
  DEVWISHSHARED). Recapture with clean demo names to use them.
- `WithYou/weekly-check-in/01-weekly-check-in-intro.png` shows the same screen as `02-`; only one is used.
- Teaching Jiu-Jitsu (DojoNet) and Trading Card Games (Gundam Forge): the catalog has no captures of
  either product yet, so both notes stay text-only.
