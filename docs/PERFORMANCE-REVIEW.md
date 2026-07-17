# Performance Review

Review date: 2026-07-16

Target: local production build

## Implemented

- Every page route is loaded through `React.lazy`; the production build emits 11
  page-level imports instead of one page bundle.
- The Home investigation exhibits are WebP assets between 62 KB and 104 KB.
- Active portrait and martial-arts editorial assets are WebP files between 34 KB
  and 78 KB. The replaced source PNGs ranged from 431 KB to 1.8 MB and are no
  longer imported into the production bundle.
- Below-the-fold editorial and investigation images use native lazy loading.
- Image dimensions are present on the Home portrait, Home exhibits, About
  fieldwork image, and Field Notes index images to reserve layout space.
- Web fonts use early origin connections and `display=swap`; analytics is only
  initialized when its optional deployment identifier is configured.

## Enforced budgets

`npm run performance:validate` runs after every production build in `npm run qa`
and in GitHub Actions. The current build passes:

| Asset class | Current largest | Budget |
| --- | ---: | ---: |
| Active source/editorial image | 104 KB | 250 KB |
| Built JavaScript chunk | 195 KB | 250 KB |
| Built stylesheet | 87 KB | 110 KB |

The validator also checks route-level lazy imports and below-the-fold image
loading behavior. Budgets are uncompressed file sizes, making the gate stable
and stricter than transfer-size checks.

## Boundary

These deterministic repository checks do not substitute for a live Lighthouse,
WebPageTest, or throttled-device run. Network timing, CDN caching, deployed
headers, third-party analytics, and Core Web Vitals must be measured on the
Netlify production URL after deployment. No live score is claimed before that
provider-side check.
