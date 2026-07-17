# SEO Reindexing Checklist

Prepared: 2026-07-17

## Release candidate complete

- [x] Canonical domain is `https://ehicksonjr.com`.
- [x] Every canonical route supplies a unique title, description, canonical URL, Open Graph data, image, and Twitter data.
- [x] Homepage includes `Person` JSON-LD.
- [x] Investigations include `CreativeWork` JSON-LD.
- [x] Field Notes include `Article` JSON-LD and published dates.
- [x] Sitemap includes `/graduate-review` and the three Field Notes.
- [x] Robots allows canonical pages and excludes HCEPS/prototype archives.
- [x] Legacy route rules are permanent redirects.
- [x] Social images and favicon use Earl Hickson Jr./UX Engineer identity.
- [x] Metadata does not point to `.dc.html`, iframe content, or stale résumé variants.
- [x] Browser QA found zero metadata failures across 135 states.
- [x] Lighthouse SEO scored 100 in all 15 final runs.

## Current live-production observation

Checked 2026-07-17:

- Existing homepage, Work, investigation, sitemap, robots, and public résumé respond.
- `/projects/withyou` returns a 301 to `/work`.
- The live bundle is older than this branch: it still references Google Fonts.
- The live sitemap does not yet include `/graduate-review`.
- The graduate CV path currently falls through to HTML rather than returning a PDF.

## Post-merge deployment and reindexing

- [ ] Deploy the exact merged commit to production.
- [ ] Confirm the build hash matches the deployed release record.
- [ ] Validate all legacy redirects with HTTP status checks.
- [ ] Confirm `/assets/application/Earl-Hickson-Jr-HCI-Graduate-CV.pdf` returns `200 application/pdf`.
- [ ] Confirm the public résumé returns `200 application/pdf`.
- [ ] Confirm `/sitemap.xml` contains `/graduate-review`.
- [ ] Confirm `/robots.txt` references the canonical sitemap and archive exclusions.
- [ ] Inspect canonical/title/description/OG/Twitter tags on every route.
- [ ] Validate Open Graph images with LinkedIn and other social debuggers.
- [ ] Submit `https://ehicksonjr.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- [ ] Request reindexing for Home, Work, Research, Resume, Graduate Review, and each investigation.
- [ ] Inspect old `/projects`, `/case-studies`, `/investigations`, `/blog`, `/writing`, `/how-i-think`, and `/approach` URLs.
- [ ] Confirm stale Front-End Engineer snippets disappear.
- [ ] Confirm canonical titles show Earl Hickson Jr. — UX Engineer.
