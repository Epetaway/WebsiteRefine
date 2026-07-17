# Performance Review

Review date: 2026-07-17

## Changes implemented

- Removed iframe/.dc.html loading from canonical routes.
- Kept route-based React code splitting for page and prototype code.
- Removed unused Tailwind component/utility generation from the active stylesheet.
- Reduced built CSS from 195.7 KiB to 63.8 KiB (11.7 KiB gzip).
- Self-hosted Latin-subset Manrope, Source Serif 4, Source Serif 4 Italic, and JetBrains Mono files.
- Preloaded the two critical text fonts and removed the blocking Google Fonts origin.
- Added responsive 480/800/full-width WebP sources for WithYou and DojoNet previews.
- Added intrinsic dimensions and below-fold lazy loading.
- Replaced the franchise-style Gundam preview with an original lightweight SVG.
- Reserved a full viewport during lazy-route resolution, eliminating the footer layout shift.
- Enabled gzip compression in the local Express production server; Vercel/Netlify CDNs also compress static output.
- Analytics initializes only when `VITE_GA_MEASUREMENT_ID` exists.

## Final Lighthouse CI

Three mobile-simulated runs per page, production build, 15 reports:

| Route | Performance median (range) | Accessibility | Best practices | SEO | FCP median | LCP median | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 90 (90–90) | 100 | 100 | 100 | 1.90 s | 3.39 s | 0 ms | 0 |
| `/work` | 90 (90–90) | 100 | 100 | 100 | 1.90 s | 3.38 s | 0 ms | 0 |
| `/work/withyou` | 91 (91–91) | 100 | 100 | 100 | 1.90 s | 3.31 s | 0 ms | 0 |
| `/research` | 92 (92–92) | 100 | 100 | 100 | 1.82 s | 3.16 s | 0 ms | 0.001 |
| `/graduate-review` | 92 (92–92) | 100 | 100 | 100 | 1.90 s | 3.16 s | 0 ms | 0 |

Configured assertions: performance ≥80 (warning threshold), accessibility ≥95, best practices ≥90, and SEO ≥90. All final assertions pass.

## Build output

- Entry JavaScript: 200.7 KiB / 67.0 KiB gzip.
- Active CSS: 63.8 KiB / 11.7 KiB gzip.
- Page chunks: approximately 0.3–19.6 KiB uncompressed.
- Public résumé: 7.8 KiB.
- Graduate CV: 8.8 KiB.

## Remaining opportunities

- The entry bundle still includes the shared React/router/runtime layer; TBT is 0 ms, so splitting it further is low priority.
- Full AVIF art-direction variants could reduce image transfer on very high-density mobile screens.
- Real-user Core Web Vitals require production traffic and cannot be inferred from lab results alone.
