# Production Readiness

Review date: 2026-07-16

Release branch: `hci-application-readiness`

## Release gates

| Gate | Command/evidence | Status |
| --- | --- | --- |
| Clean dependency install | `npm ci` | Passed |
| Lint | `npm run lint` | Passed in `npm run qa` |
| Type check | `npm run check` | Passed in `npm run qa` |
| Public-content policy | `npm run content:validate` | Passed: 20 production sources, 2 public documents |
| Behavior tests | `npm test` | Passed: 37 tests across 9 files |
| Production build | `npm run build` | Passed; 14 route shells generated |
| Netlify build | `npx netlify-cli@26.2.0 build --offline` | Passed; site and ESM function bundled without warnings |
| Performance budget | `npm run performance:validate` | Passed: 10 active-image, bundle, splitting, and loading checks |
| PDF generation/validation | `npm run documents:qa` | Passed; two pages each |
| PDF visual review | Rendered at 144 DPI | Passed; four pages inspected |
| Responsive/browser review | `npm run qa:browser` | Passed: 34 browser checks |
| Production dependency audit | `npm audit --omit=dev` | Passed: 0 vulnerabilities |

## Deployment state

- Official domain: `https://ehicksonjr.com`
- Production baseline commit: `ad2844899ceadcc7b2a8b5449d9464b2bb737129`
- Official-domain provider observed at baseline: Netlify
- Repository production configuration after migration: Netlify
- GitHub Actions role after migration: lint, type-check, test, build, and PDF QA
- Required external action: disconnect the Vercel Git integration to stop its
  provider-side automatic deployments.

## Environment requirements

- `VITE_GA_MEASUREMENT_ID` (optional analytics)

The public Contact page uses direct email and requires no service secret.
`SENDGRID_API_KEY` and a verified `SENDGRID_FROM_EMAIL` are required only if the
retained server email endpoint is reintroduced into the public UI. That endpoint
returns an honest delivery error when configuration or provider delivery fails.

## Release checklist

- [x] One canonical UX Engineer identity.
- [x] Native semantic canonical routes; no production iframe runtime.
- [x] One public resume and redirected legacy document URLs.
- [x] Application-specific no-index graduate CV.
- [x] Canonical employment data and explicit unresolved facts.
- [x] Unsupported metrics removed from the runtime and documents.
- [x] Honest project/evidence/proposed-research labels.
- [x] Route-specific metadata shells, sitemap, robots, and redirects.
- [x] Source-only HCEPS and standalone prototype archives excluded from deploy output.
- [x] Complete final QA and browser matrix.
- [x] Enforce active-image and built-asset performance budgets.
- [ ] Merge only after fact owners accept the conservative employment record.
- [ ] Verify Netlify secrets, custom domain, redirects, and headers after deploy.

## Final scoring rubric

Scores reflect repository evidence and the completed local production review.
None is a claim of independent accreditation or deployed-state verification.

| Dimension | Score | Evidence and boundary |
| --- | ---: | --- |
| 1. Professional identity | 9.5 | One name, UX Engineer title, thesis, domain, and canonical fact record across runtime, metadata, and documents. |
| 2. HCI motivation | 9.4 | The trajectory from graphic design through engineering to human consequence is explicit on Home, About, Research, and Graduate Review. |
| 3. Research direction | 9.3 | Relationships, learning, privacy, decision support, and human agency form a coherent direction; proposed methods are separated from completed work. |
| 4. Design quality | 9.3 | The v4 Afro-Futurist editorial reference is expressed as a consistent native system with a light alternating Home investigation exhibit, unnumbered human-context chapters, distinct investigation identities, restrained motion, and evidence-first layouts that passed the visual matrix. |
| 5. Engineering quality | 9.2 | Native lazy routes, typed content models, CI, content and performance enforcement, behavioral tests, a self-starting browser harness, and a reproducible build are present. |
| 6. Accessibility | 9.0 | Semantic structure, keyboard behavior, focus management, reduced motion, text status, zoom, and landscape behavior are verified; no independent audit is claimed. |
| 7. Project evidence | 9.2 | Contribution, implementation, design, gaps, limitations, captures, and proposed evaluation are labeled for each flagship investigation. |
| 8. Resume accuracy | 9.1 | One readable, ATS-oriented public resume is generated from canonical facts; unknown current-employment details are withheld and documented. |
| 9. Graduate CV quality | 9.2 | The two-page application CV distinguishes independent inquiry from peer-reviewed research and uses the same professional record. |
| 10. Production readiness | 9.0 | Clean install, QA, build, PDF checks, content and performance policies, and production dependency audit pass; deployment verification remains external. |
| 11. Responsive quality | 9.4 | Thirty-four production-browser checks cover the required 320–1920 px matrix, the corrected investigation and framework compositions, evidence-image enlargement, mobile interaction, prototypes, and zoom equivalent. |
| 12. SEO and metadata | 9.2 | Fourteen route shells have canonical, social, and structured metadata; the application route is no-indexed and legacy routes redirect intentionally. |
| 13. Ethical claim handling | 9.6 | Unsupported metrics and guarantees are removed, uncertainty is explicit, and a release gate prevents named risky claims and stale documents. |
| 14. Reviewer usability | 9.4 | Hiring and admissions paths expose role, motivation, contributions, evidence, limitations, methods, downloads, and contact within a short review. |
| 15. Overall application readiness | 9.3 | The repository now forms one coherent professional and graduate-review system, with remaining gaps limited to fact-owner and provider-side verification. |

## Rollback

The work is isolated on `hci-application-readiness`. The baseline is the immutable
commit recorded above. Do not rewrite `main`; merge through normal review after
release gates pass.
