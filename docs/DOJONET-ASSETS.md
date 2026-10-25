# DojoNet — asset provenance manifest

Audit date: 2026-10-25. Every image on `/work/dojonet` is listed here with where it came from and what it is allowed to claim. Per-file sizes, crops and SHA-256 values of the source captures are in `client/src/data/dojonet.media.json`, which the build script writes.

## How the files were made

- **Source.** The public repository `Epetaway/DojoNet-Prototype-MAX` at `be2db53` (Oct 28, 2025; 23 commits, all Earl's, Oct 27–28). Earl's local checkout (`Dev/Projects/DojoNet-Prototype-MAX-main`) matches that commit on the files the page cites (checked by hash: `src/index.css`, `TrainingJournal.tsx`, `store.js`, `app/store.ts`, `PostComposer.jsx`, `demo-data.json`, the UI/UX spec). Read, never modified.
- **Running it.** A local production build served the way GitHub Pages serves it: `npx vite build && npx vite preview --port 4173 --strictPort`, base `/DojoNet-Prototype-MAX/`, hash routes. Nothing in the app was changed.
- **Captures.** `scripts/dojonet-captures.mjs` drives the build with Playwright at 2× (1440 × 900 desktop, 390 × 844 phone), `prefers-reduced-motion: reduce`, and these rules:
  - **The app's own demo account.** The app seeds `u_demo` from `public/demo-data.json` on first load. The script loads once, waits, and reloads, because two stores race for the session on a first visit. The `fresh-dashboard` capture skips the reload on purpose to show that state.
  - **Neutral placeholders, no strangers' faces.** The demo data points avatars at a remote avatar service and event photos at stock libraries. Avatars render as a neutral grey silhouette; other remote images render as the app's own placeholder artwork (`public/placeholders/events/*.svg`, chosen by a hash of the URL). Every other non-local request is aborted.
  - **Fonts.** Bebas Neue and Inter are served locally from `@fontsource` 5.3.0 (OFL) in place of Google Fonts. Same families, same weights.
  - **The fix rule.** Captures whose id ends in `-fixed` add exactly one CSS rule before the screenshot: `:root { --color-primary: var(--accent-primary); }`. It defines the token the components use but `index.css` never declares. It demonstrates the fix for this page; it is not in the app repository. Every `-fixed` figure is labelled **Fix demonstrated**, and the test suite and content validator enforce that pairing.
  - Each capture starts from `about:blank` so the fix rule and in-page state never carry from one capture to the next.
- **Derivatives.** `scripts/case-study-media.mjs` writes AVIF + WebP (metadata stripped) at 900 and 1600 px for desktop captures and 360 and 720 px for phone captures. Crops are fixed rectangles recorded in the media JSON. Nothing is retouched or recoloured.
- **Compositions.** `scripts/case-study-compositions.mjs` lays out the card preview (1440 × 1200) and the Open Graph image (1200 × 630) from real captures and the Bebas wordmark, on a ground drawn in the app's Spec v3 tokens.
- **Drawn on the page.** The wordmark, swatches, type specimens, surface and elevation samples, profile themes, the stage comparison, the IA map and the architecture strip are HTML/CSS on the page, labelled "Retrospective illustration" where they illustrate rather than reproduce. The proposed stage control is labelled as proposed.

To rebuild:

```bash
# 1. Captures (needs the production build running on :4173, see above)
APP_DIR=/path/to/DojoNet-Prototype-MAX FONT_DIR=/path/to/woff2 CHROME_BIN=/path/to/chrome \
node scripts/dojonet-captures.mjs

# 2. Compositions (shared with Gundam Forge)
GF_CAPTURES=tmp/gundam-forge-captures DN_CAPTURES=tmp/dojonet-captures FONT_DIR=/path/to/woff2 \
CHROME_BIN=/path/to/chrome node scripts/case-study-compositions.mjs

# 3. Derivatives and the media record (needs sharp, which the portfolio doesn't install)
PROJECT=dojonet SHARP_FROM=/path/to/a/project/with/sharp/package.json node scripts/case-study-media.mjs
```

`FONT_DIR` holds `@fontsource` 5.3.0 latin files: `bebas-neue-latin-400-normal.woff2` and `inter-latin-{400,500,600,700}-normal.woff2`.

## Status vocabulary (as shown on the page)

- **Local build capture** — the running app, local production build at `be2db53`, with the rules above.
- **Fix demonstrated** — the same capture with the one-line token rule injected. Shows what the fix does; not what the repository ships.
- **Retrospective illustration** — drawn for this page from the code and the spec.
- **Computed for this page** — measured or counted while preparing the page (test run, build size, contrast, token counts).

## Manifest

| Media id | Route and state | Viewport | Section | Status |
|---|---|---|---|---|
| `dashboard` | `#/dashboard`, demo account | 1440 × 900 | 02.4; preview | Local build capture |
| `composer-journal` | `#/dashboard`, composer switched to Journal | 1440 × 900 | 02.3 | Local build capture |
| `training` | `#/training`, light | 1440 × 900 | 01.5 (before) | Local build capture |
| `training-fixed` | Same, fix rule | 1440 × 900 | 01.5 (after) | Fix demonstrated |
| `techniques` | `#/training`, Technique Library tab | 1440 × 900 | Investigation record captures | Local build capture |
| `techniques-fixed` | Same, fix rule, Practicing chosen for Hip Escape | 1440 × 900 | 02.4 | Fix demonstrated |
| `progress-fixed` | `#/training`, Progress tab, fix rule | 1440 × 900 | 02.4 | Fix demonstrated |
| `journal` | `#/journal` | 1440 × 900 | Hero; 02.4; OG | Local build capture |
| `profile-crash` | `#/profile/u_demo`, cropped `0,1560,1640,240` to the app's error banner | 1440 × 900 | 03.3 | Local build capture |
| `fresh-dashboard` | `#/dashboard`, new browser profile, no reload, cropped `0,0,2880,1300` | 1440 × 900 | 03.3 | Local build capture |
| `dark-dashboard` | `#/dashboard`, `.dark` | 1440 × 900 | 02.6 | Local build capture |
| `dark-techniques` | `#/training`, Technique Library, `.dark` | 1440 × 900 | 02.6 | Local build capture |
| `m-dashboard` | `#/dashboard` | 390 × 844 | 02.6; hero | Local build capture |
| `m-techniques` | `#/training`, Technique Library | 390 × 844 | 01.5 (before) | Local build capture |
| `m-techniques-fixed` | Same, fix rule, Practicing chosen | 390 × 844 | 01.5 (after); 02.6 | Fix demonstrated |
| `m-journal` | `#/journal` | 390 × 844 | 02.6; preview | Local build capture |
| `preview` | Composition: wordmark + `dashboard` + `m-journal` | 1440 × 1200 | Home and Work cards | Composition |
| `social/og.png` | Composition: wordmark, headline + `journal` | 1200 × 630 | Open Graph | Composition |

### Fonts

Bebas Neue 400 (SIL OFL 1.1, `@fontsource` 5.3.0 latin) is self-hosted in `client/public/assets/fonts/` and loaded only by `dojonet.css`. Inter 400–700 reuses the files already self-hosted for the WithYou page.

## Audited and not used

| Asset | Where | Why it isn't on the page |
|---|---|---|
| Avatars and event photos | Remote avatar service and stock libraries referenced by `demo-data.json` | Real people's faces and third-party photos. Replaced by a silhouette and the app's own placeholders. |
| Forums, Explore, partner matching, messages | `#/forums`, `#/explore`, `#/matchmaking`, `#/messages` | Outside this case study (the IA map shows them as out of scope). |
| `DojoNet_UI_UX_Documentation_2025.docx` | Earl's local checkout only | Not in the public repository; the page cites the Markdown spec that is (`docs/DojoNet-UI-UX-and-Component-Implementation.md`). |
| The previous page's images | `implementation/*.png`, `preview*.webp`, `social/og.svg` | Replaced by the derivatives above. |
