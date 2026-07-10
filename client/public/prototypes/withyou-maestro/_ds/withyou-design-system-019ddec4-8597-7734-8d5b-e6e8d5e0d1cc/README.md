# WithYou — Design System (v4.2 · June 2026)

> A relationship operating system for couples. Warm, mature, private. Coral & plum, with Inter at every weight.

---

## What is WithYou?

**WithYou** is a private relationship wellness app for couples. The product helps partners communicate clearly, check in emotionally, share notes, plan intentional time together, and build healthier connection habits.

Core values that drive every design decision:

- **Emotional safety** — chip-based check-ins instead of mood scoring; no judgment language.
- **Privacy by default** — no public feed, no followers, no likes. Two-person product.
- **Consent-based pairing** — invite codes, mutual opt-in, one active relationship per user.
- **Guided support** — gentle prompts and indirect communication that lower the cost of saying what you need.

The brand voice is **warm, mature, plain-spoken, and never performative**. The visual world is **editorial-documentary photography of real couples**, layered with the **coral / blush / plum / lavender / sage** palette and **Inter** at every weight.

---

## Products represented

| Product | What it is | Surface |
|---|---|---|
| **Mobile app** (iOS + Android) | The product itself — the two-person space where check-ins, notes, profiles, date ideas, and pairing happen. | `ui_kits/mobile/` |
| **Marketing site** | Couple-facing landing page, App Store screenshots, social launch kit. | `ui_kits/marketing/` |
| **Brand identity** | Logo system, color, typography, voice, image direction, dev handoff. | `ui_kits/brand/` |
| **Pitch deck** | Investor-narrative 16:9 slides — cover, problem, solution, model, roadmap, ask. | `slides/` |

---

## Sources used to build this system

| Source | Where |
|---|---|
| **Production codebase** (Expo/React Native, Express API, Prisma) | Local mount: `withyou/` — the canonical token source is `withyou/apps/mobile/src/theme/tokens.ts` |
| **Existing brand explorations** (JSX artboards) | Local mount: `WithYou (1)/` — JSX components for screens, marketing, brand pages, photo library |
| **GitHub** | [`Epetaway/withyou`](https://github.com/Epetaway/withyou) — same source as the mounted codebase |
| **Curated photo library** | 36 approved couple photos (`a-01..a-20`, `b-01..b-16`) from `WithYou (1)/assets/photos/` — copied in to `assets/photos/` |

---

## System architecture

The system is four layers. Read them top-down — each builds on the one above.

| Layer | What it is | Where | Compiles to |
|---|---|---|---|
| **1 · Tokens** | Color, type, space, radius, shadow, motion as CSS vars | `colors_and_type.css`, `styles.css` | the `wy-*` / `--wy-*` vocabulary |
| **2 · Components** | Reusable, typed building blocks on the namespace | `components/<Name>/` | `window.WithYouDesignSystem_019dde.<Name>` |
| **3 · App** | The actual app screens & flows (interactive Design Components) | `templates/<flow>/` | the running product, starting at Connect |
| **4 · Kits & handoff** | Living prototypes, brand, deck, and the engineering package | `ui_kits/`, `slides/`, `handoff/` | references, not shipped UI |

Supporting: `assets/photos/` (the 36-photo library), `wy-icons.js` (the `<wy-icon>` stroke set), `preview/` (Design System tab cards).

> **A note on the word “template.”** The platform only compiles an interactive Design Component when it lives under `templates/`, and labels that group “Templates” in the picker. So the app flows physically sit in `templates/` — but conceptually they are the **app architecture**, not reusable starting points. The genuine reusable building blocks are Layer 2 **components**.

---

## Index — what's in this folder

```
.
├── README.md                  ← this file
├── SKILL.md                   ← agent-skill manifest (Claude Code-compatible)
├── colors_and_type.css        ← LAYER 1 · CSS vars: color, type, space, radius, shadow, motion
├── styles.css                 ← LAYER 1 · component utility classes
├── wy-icons.js                ← <wy-icon> custom stroke-icon set (shadow-DOM, themes via currentColor)
│
├── components/                ← LAYER 2 · reusable, typed components (on the namespace)
│   ├── Stepper/                ← generic multi-step form · per-step gradient header · Back/Continue
│   │   ├── Stepper.jsx · Stepper.d.ts · Stepper.html (@dsCard demo)
│   ├── ProfileCard/           ← image-forward partner profile · partner-view + own-view (share/hide)
│   └── GalleryCard/           ← image-forward shared album · featured + mosaic layouts
│
├── templates/                 ← LAYER 3 · the app — interactive flows, all starting at Connect
│   ├── connect/                ← Connect home dashboard — the hub every flow launches from
│   ├── onboarding/            ← welcome → 4-step gradient Stepper → profile preview → done
│   ├── connection-rounds/     ← weekly paired question — answer → reveal
│   ├── quick-notes/           ← typed emotional note in <30s · send + receive + 5 bad paths
│   ├── lets-mediate/          ← AI-guided hard conversation · safety architecture + 4 bad paths
│   └── date-night/            ← browse ImageCard grid → hero detail → propose → confirmed
│
├── preview/                   ← Design System tab cards
│   ├── colors-*.html          ← color palette cards
│   ├── type-*.html            ← typography cards
│   ├── spacing-*.html         ← radii, shadow, spacing
│   ├── components-*.html      ← buttons, inputs, chips, cards, alerts, avatars
│   ├── pattern-*.html         ← onboarding, profile-builder, date-night, quick-notes, lets-mediate
│   └── brand-*.html           ← logo, app icons, voice, imagery
│
├── ui_kits/                   ← LAYER 4 · living prototypes
│   ├── mobile/                ← iOS + Android UI kit (components.jsx, screens.jsx, frames)
│   ├── marketing/             ← landing page, App Store, social
│   └── brand/                 ← brand identity recreation
│
├── slides/                    ← LAYER 4 · investor pitch-deck samples
│
├── assets/photos/             ← 36 approved couple photos (a-01..a-20, b-01..b-16)
│
└── handoff/                   ← LAYER 4 · dev handoff package v4.2 (tokens, specs, asset + export guides)
    └── README.md              ← start here for engineering handoff
```

---

## CONTENT FUNDAMENTALS

### Voice & tone

WithYou speaks like a thoughtful friend who has done their own work. **Warm, plain, low-pressure, never therapy-jargon, never wellness-corporate.**

Three principles, taken straight from the brand artboards:

1. **Indirect over direct** — "Say what you need without the pressure" beats "Tell your partner exactly how you feel."
2. **Stay close, not fix** — "Stay close, even when life gets busy" beats "Improve your relationship."
3. **Small, not big** — "Small check-ins. Better understanding." beats "Transform your bond."

### We sound like this

> "Say what you need without the pressure."
> "Stay close, even when life gets busy."
> "Small check-ins. Better understanding."
> "Pick what feels true. There's no wrong answer."
> "A short note today might land well."
> "Your relationship is not data."

### We never sound like this

> ~~"Find your soulmate."~~
> ~~"Fix your relationship instantly."~~
> ~~"Spice up your romance."~~
> ~~"Unlock deeper intimacy."~~
> ~~"Boost your love score by 47%."~~

### Casing & punctuation

- **Sentence case for everything except the wordmark** (`WithYou`, with `You` always in coral). Buttons read "Continue with email", not "CONTINUE WITH EMAIL". Tabs read "Check-in", not "CHECK-IN".
- **Eyebrow labels are the exception**: short metadata like `TODAY · GENTLE NUDGE`, `FROM JORDAN · YESTERDAY`, `STEP 2 OF 3`, `LIBRARY · v1` use **uppercase JetBrains Mono** with `1.5px` letter-spacing. Treat these as system labels, not headlines.
- **Em-dashes (—) and middle-dots (·) are signatures.** Use `·` to separate metadata fields ("20 min · nearby"), `—` for parenthetical thoughts in body.
- **Numerals stay literal** (3, 7, 100k) — no spelled-out small numbers in UI.
- **Curly quotes ("") for testimonial pulls; straight quotes inside code or chip labels.**

### Person & address

- Speak directly to the user as **"you"** ("What do you need from Jordan today?", "Pick what feels true.").
- Refer to the partner by **first name** when known ("Jordan mentioned a hard week"). Never "your partner" if a name is on file — it's colder.
- WithYou is "we" only in privacy/legal copy ("We collect basic usage data…"). Otherwise the product fades and the couple is the subject.

### Emoji & symbols

- **No emoji in product UI, ever.** Iconography is the WithYou stroke icon set (see ICONOGRAPHY below) or nothing.
- **Stars (★★★★★)** are used once, for review counts on the marketing site.
- **Ampersand (&)** is fine in display headlines and the wordmark gap ("Maya & Jordan", "Privacy & Data") but not in body copy — write "and".

### Concrete copy examples (from the product)

| Surface | Copy |
|---|---|
| Auth hero | **Stay close,<br>even when life gets busy.** Private tools for couples — small check-ins, better understanding. |
| Check-in title | What do you need from Jordan today?<br>*Pick what feels true. There's no wrong answer.* |
| Check-in chips | Some space · A long hug · To be heard · Reassurance · Quiet time · Help with home |
| Pairing | Invite your partner. WithYou only works together. Share this private code — it expires in 7 days. |
| Privacy callout | Private by default. We do **not** use your private notes, messages, photos, or check-in text for marketing or analytics. |
| Empty state | Add what you're working on. |
| Marketing H1 | Say what you need. **Stay close, always.** |

---

## Components (Layer 2)

Reusable, typed building blocks. Each lives in `components/<Name>/` as a trio — `<Name>.jsx` (the component), `<Name>.d.ts` (typed props), `<Name>.html` (the `@dsCard` demo). All are exposed on `window.WithYouDesignSystem_019dde.<Name>` once the bundle compiles.

| Component | Props | What it is |
|---|---|---|
| **Stepper** | `theme`, `initialStep` | Generic multi-step form scaffold. Per-step gradient header (sunset → dusk → pair → plum-night), connected numbered dots, working Back/Continue nav. Powers Onboarding. |
| **ProfileCard** | `view`, `theme`, `name`, `age`, `photo` | Image-forward partner profile. `view="partner"` shows what your partner shares; `view="own"` previews how your partner sees you, with per-facet share/hide badges + edit affordances. |
| **GalleryCard** | `layout`, `theme` | Image-forward shared album. `layout="featured"` (hero + thumbnail strip) or `"mosaic"` (2×2 grid). |

Consume them from an `@dsCard` HTML file or another DC:

```js
const { Stepper, ProfileCard, GalleryCard } = window.WithYouDesignSystem_019dde;
```

Every component renders **light + dark** from a single `theme` prop and pulls all color/space/type from Layer-1 tokens — no hardcoded hex.

---

## VISUAL FOUNDATIONS

### Color

| Role | Token | Hex | Use |
|---|---|---|---|
| Primary | `--wy-coral` | `#FF6B6B` | Primary buttons, focus, brand emphasis. Never on big body text. |
| Secondary | `--wy-blush` | `#FFB4A4` | Soft lockups, gradient stops. |
| Surface coral | `--wy-blush-soft` | `#FFD8CC` | Coral icon chips, "from partner" cards. |
| Brand ink | `--wy-navy` | `#1D2841` | Headlines on light, dark mode chrome, deck covers. |
| Accent | `--wy-lavender` | `#A78BFA` | Lavender chips, "calm" emotion, secondary accent. |
| Success | `--wy-sage` | `#6BB48F` | Sage chips, "shared", success. |
| Surface | `--wy-cream` | `#FFF9F4` | Default page background — never pure white. |
| Card | `--wy-white` | `#FFFFFF` | Card surface only. |
| Ink | `--wy-ink` | `#111827` | Body text. |
| Charcoal | `--wy-charcoal` | `#374151` | Secondary body. |
| Gray | `--wy-gray` | `#6B7280` | Metadata. |

**Three signature gradients** (used sparingly — only on app-icon, paired-avatar, or hero accents):
- **Sunset** — `#FF6B6B → #FFB4A4`
- **Dusk** — `#A78BFA → #FFB4A4`
- **Plum night** — `#1D2841 → #FF6B6B`

The product is **warm, never bluish**. If a screen is reading cool, it's wrong.

### Typography

**Inter** at 400 / 500 / 600 / 700, with **JetBrains Mono** at 600 for eyebrow / metadata / dev tokens. Inter pairs humanist warmth with strong tracking control at small sizes. Negative letter-spacing (`-0.5` to `-2px`) at display sizes is the WithYou signature.

| Style | Size / weight | Tracking |
|---|---|---|
| Display | 56 / 700 | -2 |
| H1 | 40 / 700 | -1 |
| H2 | 28 / 700 | -0.5 |
| H3 | 20 / 600 | -0.3 |
| Body | 15 / 400 | 0 |
| Caption | 12 / 500 | 0 |
| Eyebrow (mono) | 11 / 600 | +1.5 |

### Backgrounds & surfaces

- **Default surface is cream** (`#FFF9F4`), never `#fff`. White is **only** for cards.
- **Full-bleed editorial photos** are the dominant hero pattern — not gradients, never illustration of people. See ICONOGRAPHY → photography.
- **Dark mode is plum-black** (`#14101A` / `#1F1A28`), never pure black.
- **No repeating patterns or textures.** No grain. No noise overlays. No mesh gradients.

### Borders, cards, corners

- Cards: **white**, `border-radius: 20px`, **`1px solid rgba(29,40,65,0.06)`** plus the soft sm shadow. Never a heavy border. The system **avoids** the "thin-card-with-bright-left-border" trope.
- Standard radii: **10 / 12 / 16 / 20 / 24** — pick the smallest that feels right; nothing under 8 except inline tokens. Buttons are **16**, chips are **20** (pill), inputs are **14**, cards are **20**, app-icon is **22% of size**.
- Hairlines (dividers, status-bar separators) are **0.5px** at `rgba(29,40,65,0.06)`. Never above 1px on a card.

### Shadows / elevation

A four-step ramp, navy-tinted, never grey:

```
xs  0 1px 3px rgba(29,40,65,0.04)                                 — buried
sm  0 1px 3px rgba(29,40,65,0.04), 0 4px 12px rgba(29,40,65,0.04) — default card
md  0 4px 12px rgba(29,40,65,0.10)                                — elevated card
lg  0 12px 32px rgba(29,40,65,0.14)                               — modal / phone
```

**Coral-tinted shadow** (`0 8px 24px rgba(255,107,107,0.3)`) is reserved for **the primary CTA only**.

### Layout rules

- Cream pages: 16-20px gutters on mobile, 56px on desktop.
- Cards stack with **12px** vertical gap, never less. Never zero — touch surfaces deserve breathing room.
- The **bottom tab bar** uses `backdrop-filter: blur(20px)` with `0.5px` top hairline. Always sticky, never solid.
- Status callouts (the "today's gentle nudge") sit on top of imagery in **glass cards**: `rgba(255,255,255,0.18)` + `blur(20px)` + `1px` white-25% inner border.

### Transparency & blur

Used **only** in three places, deliberately:

1. **Glass cards** over couple photography (the today nudge, the welcome lockup) — translucent white at 18-20%, blur 20px.
2. **Bottom navigation** — translucent surface with blur, so the photo flows under it.
3. **Image protection gradients** — `linear-gradient(180deg, transparent 40%, rgba(29,40,65,0.55) 100%)` over photos so light text reads.

Never blur for chrome decoration. Never frosted-glass cards on plain backgrounds.

### Motion

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (out) by default. `ease-in-out` only for two-way state (toggles).
- **Duration:** 150ms (micro), 220ms (default), 360ms (entrances).
- **No bounce, no springs.** Motion is calm. The brand is "stay close", not "wow".
- **Crossfade > slide** for nav transitions inside the product.
- **Toggles slide** the thumb 16px in 220ms with a tiny shadow crossfade.

### States — hover / press / focus

- **Hover (web)**: shift to `--wy-coral-hover` (`#FF5256`); for ghost buttons, lighten background to `--wy-blush-soft` at 50%.
- **Press**: `--wy-coral-pressed` (`#E45558`) and 98% scale; 80ms duration. **No** color flicker on text.
- **Focus**: 4px coral halo at 10% opacity (`box-shadow: 0 0 0 4px rgba(255,107,107,0.1)`) on inputs; **2px coral outline-offset 2** on buttons.
- **Disabled**: 40% opacity, no color change, never grey-out the text.

### Imagery — the look

- **Editorial · documentary · warm.**
- Real couples, candid, single scene. **No collages.** No stock-corporate kissy-poses. No dating-app pink saturation. No AI-generated faces.
- Diverse representation without performance.
- 16:9 hero, 9:16 mobile, 4:5 social.
- Pull from the **curated library only** — id format `a-06`, `b-12` etc. Files live at `assets/photos/{id}.jpg`. The `<CoupleImage variant="a" photo="a-06">` component handles cropping and the protection gradient.
- **v4.2 image-forward cards** (`ImageCard` / `ProfileCard` / `GalleryCard`) overlay copy directly on the photo with a runtime scrim — see `IMAGE_USAGE_GUIDE.md`. Never bake the scrim into the file.

### Hit targets & accessibility

- **44 × 44 minimum** (iOS) / **48dp** (Android) for any touch surface.
- Body text never below **14px** in product UI; **15** is the body default.
- Contrast: **4.5:1** for body, **3:1** for large. Coral on cream meets large-text contrast only — not body.
- Light + dark parity is required for every screen.
- Never hardcode hex in code — always reference a token.

---

## ICONOGRAPHY

WithYou ships its **own custom stroke icon set** — a small, hand-tuned library defined inline in `ui_kits/mobile/components.jsx` as the `<Icon name="…" />` component. **No icon font, no third-party icon library, no emoji in product UI.**

### Available icons

`home · heart · check · chart · user · bell · settings · chat · calendar · sparkle · lock · shield · map · edit · plus · arrowRight · arrowLeft · close · search · apple · google · voice · moon · sun · target · coffee · book`

Two brand SVGs ship alongside:

- **`<WyMark>`** — the two interlocking soft loops (heart + heart, off-axis). Two strokes, coral + secondary, with a clip mask on the left loop so they read as joined.
- **`<WyLogo>`** — the mark + the wordmark `WithYou`, with `You` set in coral. Display weight (700), `-0.5` tracking.

### Style rules

- **Stroke 1.8** at 24×24 viewBox, `strokeLinecap="round"`, `strokeLinejoin="round"`. **No filled shapes** except OAuth marks (Apple, Google) which use their brand-mandated forms.
- Inactive: `--wy-gray` (`#6B7280`). Active: `--wy-coral`. On dark: `--fg2` / `--wy-coral`.
- **Active state bumps stroke to 2.2** (slightly heavier) — that's the only weight change in the system.
- Sizes: **16, 18, 20, 22, 24** — pick the smallest that reads. Tab-bar icons are 22.

### When you must reach outside the set

If you genuinely need an icon WithYou doesn't have, **use Lucide** (`https://unpkg.com/lucide-static`) — same 24×24, 1.8-stroke, round-cap aesthetic so substitutions blend. Document any addition in the kit's README and propose a permanent SVG.

### Logos & brand assets shipped in this folder

| File | Use |
|---|---|
| `<WyMark>` (in `components.jsx`) | App-icon mark, standalone identity |
| `<WyLogo>` (in `components.jsx`) | Inline wordmark for nav, footers, hero |
| `assets/photos/` | The 36-photo curated library |

> **No logo PNGs/SVGs are shipped as standalone files yet** — the mark is currently rendered from JSX. See **CAVEATS** in the chat thread.

### Photography (treat as the primary "iconography")

WithYou's most distinctive visual asset is its **photo library**. Use a real couple photo wherever a stock illustration or generic gradient would otherwise go. The `<CoupleImage variant>` component pulls from the library and applies the standard protection gradient.

---

## How to use this system

1. **Read this README** + browse the cards in the **Design System** tab.
2. **Reach for a Layer-2 component first** — `Stepper`, `ProfileCard`, `GalleryCard` are typed and on the namespace (`window.WithYouDesignSystem_019dde`). Don't rebuild what exists.
3. **To see the app**, open `templates/connect/` — the Connect home dashboard — and follow any flow from there (Connection Rounds, Quick Notes, Let's Mediate, Date Night, Onboarding).
4. **For new artifacts**, link `colors_and_type.css` + `styles.css` and apply the `wy-*` semantic classes — never hardcode hex. Use `wy-icons.js` for iconography, never emoji.
5. **For React work**, lift `wyTokens` and the components from `ui_kits/mobile/components.jsx`. They are deliberately framework-light (no RN-only imports outside the production codebase).
6. **For engineering hand-off**, read `handoff/README.md` (v4.2) — component specs, tokens, asset + export guides.
7. **For copy**, reread CONTENT FUNDAMENTALS before writing a word. The voice is precise — small drift makes a different brand.

## The app (Layer 3)

Four tabs — **Home · Connect · Gallery · Us** — with every flow launching from the **Connect home dashboard** (`templates/connect/`):

- **Onboarding** — welcome → 4-step gradient **Stepper** (profile → connection style → privacy → pairing) → done.
- **Connection Rounds** (Connect, featured) — a weekly paired question; answer privately → reveal together.
- **Quick Notes** (Connect) — a typed emotional note in under 30 seconds; partner reads, reacts, replies. 5 bad paths.
- **Let's Mediate** (Connect) — AI-guided prep for hard conversations, with a 4-level safety check + quick exit. 4 bad paths.
- **Date Night** (off Home) — browse **ImageCard** grid → hero detail → propose → confirmed event card.
- **Us** — the **ProfileCard**: partner view + own view (per-facet share/hide). **Gallery** — the **GalleryCard**: featured + mosaic.

All content cards are **image-forward** (full-bleed photo, runtime scrim, overlaid copy) — the old image-beside-text thumbnail is retired. Every flow: **light + dark = same output.**

---

**Last updated:** June 2026 (v4.2)
**Maintainer:** Earl Hickson · `Epetaway/withyou`
