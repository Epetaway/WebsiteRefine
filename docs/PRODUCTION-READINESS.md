# Production Readiness

Review date: 2026-07-17

Branch: `hci-portfolio-production-readiness`

## Required commands

| Command | Result |
| --- | --- |
| `npm install` | Passed |
| `npm run lint` | Passed, 0 warnings |
| `npm run check` | Passed |
| `npm run typecheck` | Passed (`tsc`) |
| `npm test` | Passed, 7 files / 34 tests |
| `npm run validate:content` | Passed |
| `npm run validate:pdf` | Passed |
| `npm run build` | Passed |
| `npm run validate:built` | Passed |
| `npm run qa:browser` | Passed, 135 states |
| Lighthouse CI | Passed all assertions, 15 runs |
| `npm audit --omit=dev` | Passed, 0 production vulnerabilities |

`npm audit` including developer tooling reports four moderate `esbuild` advisories through `drizzle-kit` tooling. The offered force fix installs a breaking older `drizzle-kit`; it was not applied. The affected server is local development tooling, not the production dependency set.

## Release configuration

- Vite builds static client output into `dist/public`.
- Vercel uses `npm run build`, `dist/public`, permanent redirects, and a SPA fallback.
- Netlify uses the same build/publish contract and canonical redirects.
- Express `npm start` serves the built site for local production verification with gzip enabled.
- No `.openai/hosting.json` exists; no alternate Sites deployment was created.

## Validation summary

- Canonical routes render native semantic React; no iframe or `HandoffFrame`.
- Source and built-output claim validation pass.
- Route metadata, PDFs, images, redirects, 404 behavior, keyboard focus, and console state pass browser QA.
- PDFs pass structural validation and four rendered-page visual inspection.
- Performance medians are 90–92; accessibility, best practices, and SEO are 100.

## Deployment status

The repository is ready for a production pull request. The live domain still serves the prior release and therefore does not yet contain the graduate CV asset or updated sitemap. No production deployment was performed from this branch.

Production completion requires merge/deploy followed by the checklist in `docs/SEO-REINDEXING-CHECKLIST.md`. A successful build alone must not be recorded as deployed validation.
