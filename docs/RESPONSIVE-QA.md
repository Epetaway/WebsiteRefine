# Responsive QA

Review target: native production build

Test URL: local production server

| Viewport / mode | Routes and behaviors | Result |
| --- | --- | --- |
| 320 px portrait | Home, navigation, Work, Resume, Graduate Review, Contact | Passed |
| 375 px portrait | Home, long headings, investigation exhibits, contact actions | Passed |
| 390 px portrait | Home, mobile menu, WithYou prototype | Passed |
| 430 px portrait | DojoNet and Gundam Forge prototypes | Passed |
| 768 px portrait | Work, Research, Field Notes, Resume | Passed |
| 1024 px landscape | Home, investigation captures, Graduate Review | Passed |
| 1280 px desktop | All canonical routes and legacy redirects | Passed |
| 1440 px desktop | Home, three investigations, long-form note | Passed |
| 1920 px desktop | Max-width rhythm, imagery, footer | Passed |
| Mobile landscape | Menu, prototype controls, direct contact actions | Passed via landscape CSS and navigation behavior checks |
| 200% zoom | Header, headings, resume, graduate path | Passed at 640 CSS px equivalent for a 1280 px viewport |

## Acceptance criteria

- No horizontal page overflow at any target width.
- No text clipping, overlap, or inaccessible off-screen controls.
- Mobile navigation fits short landscape viewports and remains keyboard usable.
- Images reserve layout space and below-fold media loads lazily.
- Prototype state and actions remain understandable without color.
- Long-form text remains readable and does not collapse into dense multi-column
  layouts on small screens.

## Evidence

`npm run qa:browser` completed 34 checks against a self-started local production
preview. It verified one `h1`, a main landmark, zero iframes, one canonical link,
no horizontal overflow, mobile-menu focus/scroll behavior, all three prototype
layouts, a legacy redirect, and the zoom-equivalent layout. It also checked the
three Home investigation exhibits and the unnumbered investigation human-context
chapter with visible changed-mind evidence at desktop and mobile widths. The
Home framework is separately checked for one thesis, three investigation
branches, four working principles, its research link, and overflow.
The same run verifies all three `/work` evidence exhibits, the closing method
note, all project capture grids, 16:10 capture framing, desktop hover
enlargement, and the mobile tap-to-open lightbox with scroll locking.
Screenshots and the machine-readable result are written to ignored
`tmp/browser-qa/` artifacts.

Representative screenshot montages were visually inspected. No clipping,
overlap, unreadable control, or editorial-art dominance issue was found.

`npm run qa:visual` additionally completed 28 page/viewport comparisons: 14
canonical routes at 1440 × 1000 and 390 × 844. The run captured 56 individual
reference/current screenshots and reported no heading, overflow, or display-font
failures. Persistent evidence is in `output/visual-qa/`; the route-by-route map
and intentional content differences are documented in `VISUAL-ALIGNMENT.md`.

## Afro-Futurist editorial reference review

The July 16 v4 handoff was reviewed at 1440 × 1000 and against the same mobile
matrix. The production implementation now follows its dark editorial palette,
compact serif page introductions, restrained mono labeling, flat resume rhythm,
admissions-review composition, and question-led investigation heroes. Home,
Research, Resume, Graduate Review, and Gundam Forge were compared directly.

Reference-only metrics and stale professional claims were intentionally not
copied. The visual system is reproduced with native React components and the
canonical evidence record; no reference HTML or iframe is used at runtime. The
Home investigation band now uses the reference's light editorial campaign
composition with alternating product exhibits rather than the generic numbered
section treatment. All equivalent handoff templates—not only the initial sample
pages—are now included in the automated screenshot comparison.
