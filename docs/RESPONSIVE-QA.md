# Responsive QA

Review date: 2026-07-17

## Automated matrix

`npm run qa:browser` exercised all 12 canonical route patterns plus expanded investigation modes at:

- 320 × 844
- 375 × 844
- 390 × 844
- 430 × 844
- 768 × 1024
- 1024 × 768
- 1280 × 900
- 1440 × 900
- 1920 × 900

Total: 135 route/view checks.

Additional checks:

- 844 × 390 mobile landscape on Home, WithYou, and Graduate Review.
- 640 CSS-pixel viewport as a 1280-wide/200%-zoom reflow equivalent on Home, Resume, and Graduate Review.
- 125% default-root-text simulation on Graduate Review at 390 px.
- Reduced-motion preference across the full matrix.
- Keyboard-only skip link and mobile navigation.
- Primary interactive target height.

## Results

| Requirement | Result |
| --- | --- |
| Horizontal overflow | 0 failures |
| Canonical routes | 12/12 rendered |
| Expanded project studies | 3/3 rendered at every width |
| Images and captions | Loaded and associated |
| Mobile navigation | Usable, trapped, escapable, focus restored |
| Long headings | Reflow without clipping |
| Important CTAs | Visible and operable |
| Resume | Reflowed without a second document UI |
| Graduate Review | Reflowed at mobile, tablet, landscape, and zoom-equivalent widths |
| Field Note | Reading column and evidence aside collapse correctly |
| Primary touch targets | No checked target below 44 px |
| Console/runtime errors | 0 |

Representative full-page screenshots are generated in `tmp/browser-qa/` for 320 Home, 375 Work, 768 WithYou full study, 1024 Graduate Review, and 1440 Home. They are QA artifacts rather than source-controlled product assets.

## Visual findings

- The editorial hierarchy remains legible at 320 px without reducing headings to generic mobile typography.
- Project entries collapse from image/content grids to a clear single-column sequence.
- Technology sections retain contrast and separation without becoming dense card walls.
- The sticky reading-mode control becomes non-sticky on small screens.
- Resume chronology and graduate-review evidence tables become stacked pairs rather than horizontally scrolling.
- Desktop line lengths remain bounded by the reading and content tokens.

## Remaining manual follow-up

Physical iOS Safari, Android Chrome, and tablet-device checks are still recommended for browser-chrome behavior and real system font scaling. No repository defect is currently open from the tested matrix.
