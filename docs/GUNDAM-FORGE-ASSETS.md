# Gundam Forge — asset provenance manifest

Audit date: 2026-10-25. Every image on `/work/gundam-forge` is listed here with where it came from and what it is allowed to claim. Per-file sizes, crops and SHA-256 values of the source captures are in `client/src/data/gundamForge.media.json`, which the build script writes.

## How the files were made

- **Source.** The public repository `Epetaway/Gundam-Forge` at `50321ed` (Apr 24, 2026). Earl's local checkout (`Dev/Projects/Gundam-Forge-main`) matches that commit file for file (checked by hash on key files). Read, never modified.
- **Running it.** A local production build (`apps/web`: `npm run build && npx next start -p 3002`). One capture-only change: `next/font/google` can't download Orbitron and Exo 2 without network, so `layout.tsx` and `globals.css` were pointed at the same OFL families from `@fontsource` 5.3.0. The rendered typography is the app's own. Nothing else in the app was changed.
- **Captures.** `scripts/gundam-forge-captures.mjs` drives the build with Playwright at 2× (1440 × 900 desktop, 390 × 844 phone), `prefers-reduced-motion: reduce`, and these rules:
  - **Official card art is never published.** Every card-image request is answered with a **text proxy** drawn from that card's catalog record — name, colour, type, cost, level, AP/HP and id — in Gundam Forge's own `--color-*` tokens, and labelled `TEXT PROXY` on the card. The repository itself doesn't commit card art (its README says so); this keeps the portfolio the same way.
  - **Fictional study decks.** Two decks are written into the app's own storage format (`gundam-forge.decks`): "Blue / White study — draft" (the bundled *Forge Team* seed deck "Blue / White Midrange" with one card removed, 49/50) and "Blue / White study" (the full seed deck plus a 10-card resource deck). The deck viewer and playtester captures use that same *Forge Team* seed deck.
  - **No real people.** The app's tournament-deck list carries real player handles from a public results feed, so no capture shows it.
  - The first-visit welcome is pre-dismissed except in the capture that shows it. Sound is muted. Every other non-local request is aborted.
- **Derivatives.** `scripts/case-study-media.mjs` writes AVIF + WebP (metadata stripped) at 900 and 1600 px for desktop captures and 360 and 720 px for phone captures. Crops are fixed rectangles recorded in the media JSON. Nothing is retouched or recoloured.
- **Compositions.** `scripts/case-study-compositions.mjs` lays out the card preview (1440 × 1200) and the Open Graph image (1200 × 630) from two real captures and the lockup, on a ground drawn in the app's tokens.
- **Drawn on the page.** The lockup, the card tiles, the swatches, the type specimens, the panel levels, the motion tracks, the rules table and the architecture strip are HTML/CSS on the page, labelled "Retrospective illustration" where they illustrate rather than reproduce. The drawn cards are fictional ("Vanguard Frame", "Relay Station", "Signal Flare").

To rebuild:

```bash
# 0. Dump the bundled decks once (run inside Gundam-Forge-main/apps/web)
cat > dump-decks.tmp.ts <<'TS'
import { getDecks } from '@/lib/data/decks';
console.log(JSON.stringify(getDecks().map(({ id, entries }) => ({ id, entries }))));
TS
npx tsx dump-decks.tmp.ts > /tmp/gf-decks.json && rm dump-decks.tmp.ts

# 1. Captures (needs the production build running on :3002)
CATALOG=../Gundam-Forge-main/apps/web/public/data/cards.catalog.json DECKS_JSON=/tmp/gf-decks.json \
FONT_DIR=/path/to/woff2 CHROME_BIN=/path/to/chrome node scripts/gundam-forge-captures.mjs

# 2. Compositions (shared with DojoNet)
GF_CAPTURES=tmp/gundam-forge-captures DN_CAPTURES=tmp/dojonet-captures FONT_DIR=/path/to/woff2 \
CHROME_BIN=/path/to/chrome node scripts/case-study-compositions.mjs

# 3. Derivatives and the media record (needs sharp, which the portfolio doesn't install)
PROJECT=gundam-forge SHARP_FROM=/path/to/a/project/with/sharp/package.json node scripts/case-study-media.mjs
```

`FONT_DIR` holds `@fontsource` 5.3.0 latin files: `orbitron-latin-700-normal.woff2`, `exo-2-latin-{500,600}-normal.woff2`, `jetbrains-mono-latin-500-normal.woff2` (and, for the compositions, `bebas-neue-latin-400-normal.woff2`, `inter-latin-{500,600}-normal.woff2`).

## Status vocabulary (as shown on the page)

- **Local build capture** — the running app, local production build at `50321ed`, with the rules above.
- **Documented decision** — a choice recorded in a commit message, cited by hash.
- **Retrospective illustration** — drawn for this page from the code.
- **Computed for this page** — measured or counted while preparing the page (test run, contrast, deck audit).
- **Superseded** — an earlier direction, shown as history.

## Manifest

| Media id | Route and state | Viewport | Section | Notes |
|---|---|---|---|---|
| `forge-draft` | `/forge?deckId=study-draft` | 1440 × 900 | Hero; 02.2; 02.3 | 49/50, Issues (2) |
| `forge-issues` | Same, Issues sheet open | 1440 × 900 | 02.3 | One error, one warning |
| `forge-valid` | `/forge?deckId=study-valid` | 1440 × 900 | 02.3 | 50/50, 10/10, ✓ Valid |
| `forge-create` | `/forge` | 1440 × 900 | 02.2 | Create New Deck |
| `deck-view` | `/decks/blue-white-midrange` | 1440 × 900 | 02.2 | *Forge Team* seed deck |
| `cards` | `/cards` | 1440 × 900 | 02.7 | 623 records, proxies |
| `home` | `/`, cropped to `0,0,2880,1000` | 1440 × 900 | 02.7 | Cropped above the stat row: those counters are hard-coded demo numbers (see the case study record) |
| `welcome` | `/`, first visit | 1440 × 900 | 02.7 | |
| `playtest-mulligan` | `/decks/blue-white-midrange/playtest`, after coin flip | 1440 × 900 | 02.5 | |
| `playtest-board` | Same, hand kept, turn 1 | 1440 × 900 | 02.5 | Heuristic bot |
| `playtest-empty` | `/playtest` with no deck, cropped `760,700,1360,420` | 1440 × 900 | 02.7 | |
| `light-forge-draft` | `/forge?deckId=study-draft`, `data-theme="light"` | 1440 × 900 | 02.6 | Shows the light-theme gap |
| `light-forge-valid` | `/forge?deckId=study-valid`, light | 1440 × 900 | — | Built, not shown |
| `m-forge-draft`, `m-forge-issues`, `m-cards`, `m-light-forge` | As above | 390 × 844 | Hero; 02.6 | |
| `preview` | Composition: lockup + `forge-draft` + `m-forge-issues` | 1440 × 1200 | Home and Work cards | |
| `social/og.png` | Composition: lockup, headline + `forge-issues` | 1200 × 630 | Open Graph | |

### Fonts

Orbitron 600/700 and Exo 2 400–700 (SIL OFL 1.1, `@fontsource` 5.3.0 latin) are self-hosted in `client/public/assets/fonts/` and loaded only by `gundam-forge.css`. JetBrains Mono is the portfolio's own.

## Audited and not used

| Asset | Where | Why it isn't on the page |
|---|---|---|
| Official card art | `apps/web/public/card_art/` (downloaded at build time, not in git) | Bandai's artwork. Replaced by text proxies in every capture. |
| Tournament deck list and deck pages | `/decks`, `decks-live.json` | Real player handles. |
| Home stat row and "Live" meta panel | `/` | The player, submission and win-rate counters are hard-coded in `app/page.tsx`; "Live" describes a static snapshot. |
| The previous page's images | `implementation/*.png`, `preview.svg`, `social/og.svg` | Replaced by the derivatives above (Oct 2025 captures with empty card tiles). |
| `apps/web/public/hero-bg.png`, `card-back.svg` | App repository | Not needed; the page draws its own ground and cards. |
