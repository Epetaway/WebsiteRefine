# Visual Alignment Evidence

Reference: `Afro-Futurist Editorial Modernism (4).zip`

Production target: native React/Vite application

Capture sizes: 1440 × 1000 and 390 × 844

## Coverage

| Current route | Handoff template | Desktop | Mobile |
| --- | --- | --- | --- |
| `/` | Home | Captured | Captured |
| `/work` | Investigations | Captured | Captured |
| `/work/withyou` | WithYou Investigation | Captured | Captured |
| `/work/dojonet` | DojoNet Investigation | Captured | Captured |
| `/work/gundam-forge` | Gundam Forge Investigation | Captured | Captured |
| `/research` | Research | Captured | Captured |
| `/field-notes` | Writing | Captured | Captured |
| `/field-notes/teaching-jiu-jitsu-and-ux` | Field Note article | Captured | Captured |
| `/field-notes/designing-consent` | Field Note article | Captured | Captured |
| `/field-notes/information-architecture-and-card-games` | Field Note article | Captured | Captured |
| `/about` | About | Captured | Captured |
| `/resume` | Resume | Captured | Captured |
| `/contact` | Contact | Captured | Captured |
| `/graduate-review` | Graduate Review | Captured | Captured |

The ZIP's Site Header is a shared partial rather than a separate public page. It
is exercised in every comparison. Its five historical article exports are
variants of one Field Note template; the three currently published notes are all
captured against that template.

## Acceptance result

- 56 screenshots captured: reference and current for 14 routes at two sizes.
- Exactly one `h1` on every reference and current capture.
- No horizontal overflow in any capture.
- Source Serif display typography detected on every page.
- Mobile top-level title sizes match the reference template on Home, Work,
  Research, Writing, Field Notes, About, Resume, Contact, and Graduate Review.
- The compact footer, editorial page labels, investigation layouts, Field Note
  cover rhythm, and professional-page composition were visually reviewed.
- The `/work` index uses the supplied three-open-studies structure and product
  exhibits. Project implementation captures preserve the reference's 16:10
  evidence-grid rhythm, enlarge on pointer hover, and open in a full-screen
  lightbox on touch activation.

The machine-readable measurements are in `output/visual-qa/results.json`. The
eight `alignment-*.png` files are the compact review sheets; `current/`,
`reference/`, and `pairs/` contain the individual evidence.

## Intentional differences

- Current text and professional facts remain tied to the canonical evidence
  record. Metrics or claims present only in the handoff were not copied.
- The oversized `01` human-context treatment is intentionally omitted from the
  investigation pages; the same chapter hierarchy is retained without the
  dominant numeral.
- Current Field Notes use the published article content and relevant native
  project imagery, while preserving the handoff's article composition.
- The ZIP's historical Field Note variants are not exposed as invented current
  publications.

## Reproduce

```bash
npm run build
npm run qa:visual
```

The capture command starts local current/reference servers when needed,
generates all screenshots and comparison sheets, and exits nonzero if structural
alignment checks fail.
