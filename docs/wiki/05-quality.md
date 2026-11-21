# 5. Quality

[← Key decisions](04-decisions.md) · [Wiki home](README.md)

## Checks

`npm run qa` runs lint (zero warnings allowed), type-check, content validation, tests, PDF validation and the production build. The GitHub Pages workflow runs lint, type-check, content validation and tests before it builds.

| Check | Result (Nov 2026) |
|---|---|
| Vitest + Testing Library | 18 files, 137 tests passing. Covers routes, metadata, case-study content rules and the access flow end to end. |
| Lint | 0 warnings |
| Type-check | Passes |
| Content validation | Passes, on source and built output |
| PDF validation | Résumé and graduate CV pass |

## Accessibility (July 2026 review)

From [`docs/ACCESSIBILITY-REVIEW.md`](../ACCESSIBILITY-REVIEW.md):
- 135 rendered route and view states at nine viewport widths, checked with axe-core (WCAG 2 A/AA, 2.1 A/AA, 2.2 AA): **0 violations**.
- Keyboard focus checks 6/6, mobile landscape 3/3, and 200%-zoom reflow 3/3.
- The mobile menu is a real modal dialog with focus management.

The review doesn't claim formal WCAG conformance or replace testing with assistive-technology users. The content rules stop the site from claiming it either.

## Performance (July 2026 review)

From [`docs/PERFORMANCE-REVIEW.md`](../PERFORMANCE-REVIEW.md): Lighthouse CI, three mobile-simulated runs per page.
- Performance scores 90–92, with Accessibility, Best Practices and SEO all at 100.
- Total blocking time 0 ms, layout shift 0 to 0.001, LCP 3.2–3.4 s.
- CSS went from 195.7 KiB to 63.8 KiB by removing unused Tailwind output.

**Room to improve:** LCP above 2.5 s on simulated mobile is the clearest target.

## Known limitations

See [`docs/KNOWN-LIMITATIONS.md`](../KNOWN-LIMITATIONS.md). Headlines:
- Analytics delivery hasn't been tested against a production property.
- The Earl the Kaiju coaching site isn't deployed, so its case study uses local-build captures.
- The access gate needs its one-time setup before the forms work in production.
