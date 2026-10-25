// Gundam Forge — case study content for /work/gundam-forge.
//
// Every claim traces to a source in docs/GUNDAM-FORGE-CASE-STUDY.md (evidence matrix) and every
// image to docs/GUNDAM-FORGE-ASSETS.md (provenance). The app repository is public
// (Epetaway/Gundam-Forge, cited at 50321ed, Apr 24, 2026), so code excerpts link to the exact
// lines. Dates come from its commit history. Contrast ratios are computed with the WCAG 2.x
// formula; "measured" ratios were read from the rendered page (gundam-forge.test.tsx checks the
// token-level ones). validate-content.ts and client/src/test/gundam-forge.test.tsx check the
// rules that matter most.

import mediaRecord from "./gundamForge.media.json";
import { getInvestigation } from "./investigations";
import type { KitCode, KitFigure, KitRepository, KitStatus } from "@/components/case-study-kit/kit";

export type GfMediaId = keyof typeof mediaRecord.media;
export type GfFigure = KitFigure<GfMediaId>;
export const gfMedia = mediaRecord.media;
export const gfOg = mediaRecord.og.src;

const base = getInvestigation("gundam-forge");
if (!base) throw new Error("The Gundam Forge investigation record is missing.");
export const gundamForgeRecord = base;

export const repository: KitRepository = {
  name: "Epetaway/Gundam-Forge",
  url: "https://github.com/Epetaway/Gundam-Forge",
  commit: "50321ed",
  fullCommit: "50321ed47aedc181296c606682b6c001eaa5c61e",
};

export const gundamForge = {
  slug: "gundam-forge",
  path: "/work/gundam-forge",
  number: base.number,
  name: base.name,
  heroLine: "Show the rule while the player is still deciding.",
  heroLead:
    "An unofficial deck builder and playtester for the Gundam Card Game, designed and built end to end: the interface system, the deck-building workflow, the rules engine underneath and a bot to test against. Listing 623 cards was the easy part. Telling a player what a rule means for their deck, without building the deck for them, was the work.",
  role: "Product design, interface system and front-end development. AI coding assistants (Claude and GitHub Copilot's agent) helped me fill gaps and move faster; the direction and the decisions were mine.",
  disciplines: "Interface system · Interaction design · Next.js and TypeScript · Rules engine and testing",
  when: "February – April 2026 · 308 commits",
  stack: base.stack,
} as const;

export const statusLedger: { label: string; value: string; status: KitStatus }[] = [
  { label: "Deck validation", value: "Runs on every change: five rules, three pieces of advice", status: "IMPLEMENTED + INTEGRATED" },
  { label: "Banned and restricted cards", value: "Modelled in the types; the validator doesn't use them yet", status: "DESIGNED" },
  { label: "Public hosting", value: "A Pages deploy workflow exists; no verified public URL", status: "KNOWN GAP" },
];

export const overview = {
  problem:
    "Card games publish their rules as documents and their cards as databases. Neither tells you, mid-build, that your deck is one card short or one colour over, or why that matters. Most deck builders either say nothing until you export, or quietly refuse the click.",
  role:
    "I designed and built it: the interface system and its tokens, the create–build–view workflow, the validation engine in a shared package, the playtester and its rule-following bot, and the data pipeline behind the card catalog. AI coding assistants worked from my specs to fill gaps and speed things up. I reviewed what came back, kept what fit and reverted what didn't.",
  exists:
    "A typed Next.js 14 app in a monorepo: catalog search and filters, a deck builder that validates on every change, deck analytics, a playtester with a coin flip, mulligan and a heuristic bot, and decks saved in the browser. Its test suite passes — 253 tests, 4 skipped — in a run made for this page.",
  boundary:
    "Unofficial and not affiliated with Bandai. Not hosted at a verified public URL; no users and no measured outcome. Every capture comes from a local production build with fictional study decks, and official card art is replaced by text proxies drawn from each card's own data. This page doesn't publish the art.",
};

export const chapters: { number: string; id: string; title: string; line: string; status: KitStatus }[] = [
  { number: "01", id: "system", title: "The interface system", line: "A dark, dense tool: steel surfaces, one cobalt signal, and a typeface for each job.", status: "IMPLEMENTED + INTEGRATED" },
  { number: "02", id: "decision", title: "Designing the decision", line: "Counts always in view, reasons one tap away, and advice that never pretends to be a rule.", status: "IMPLEMENTED + INTEGRATED" },
  { number: "03", id: "engineering", title: "Engineering the rules", line: "One validator in a shared package, called by every surface that needs an answer.", status: "PARTIAL" },
];

// ---------------------------------------------------------------- Chapter 01 · The interface system

export const identityTimeline: { date: string; title: string; detail: string; source: string; status: KitStatus }[] = [
  {
    date: "Feb 22, 2026 · 1:28 pm",
    title: "Borrowed",
    detail: "The first pass restyled the app after the official game site's colours and look.",
    source: "07942d4",
    status: "SUPERSEDED",
  },
  {
    date: "Feb 22, 2026 · 6:09 pm",
    title: "Owned",
    detail: "Same day, replaced with Gundam Forge's own tokens and navigation. An unofficial tool shouldn't dress like the official one.",
    source: "23f3bbe",
    status: "DOCUMENTED DECISION",
  },
  {
    date: "Feb 25, 2026",
    title: "Industrial command, v2",
    detail: "A visual reset toward the steel-and-cobalt panels the app uses now.",
    source: "58116cd",
    status: "SUPERSEDED",
  },
  {
    date: "Mar 3, 2026",
    title: "Token audit",
    detail: "Raw Tailwind colours replaced with design tokens: 30-plus replacements across 10 files, then card tiles unified on the same tokens.",
    source: "f457ea8 · b11fe4f",
    status: "IMPLEMENTED + INTEGRATED",
  },
  {
    date: "Mar 4, 2026",
    title: "Semantic text tokens",
    detail: "Four text levels (primary, secondary, muted, subtle) instead of ad-hoc greys.",
    source: "615cc9c",
    status: "IMPLEMENTED + INTEGRATED",
  },
];

export type GfSwatch = { name: string; token: string; hex: string; role: string; contrast: string; ink: "light" | "dark" };

// Rendered values: the HSL custom properties in apps/web/app/globals.css (dark theme), shown as hex.
export const surfaces: GfSwatch[] = [
  { name: "Background", token: "--background · 221 62% 9%", hex: "#091225", role: "Page ground", contrast: "Primary text 16.1:1", ink: "light" },
  { name: "Surface", token: "--surface · 219 45% 14%", hex: "#141f34", role: "Panels, header, sheets", contrast: "Primary text 14.2:1", ink: "light" },
  { name: "Elevated", token: "--surface-elevated · 219 40% 17%", hex: "#1a263d", role: "Level-2 panels, modals", contrast: "Primary text 13.1:1", ink: "light" },
  { name: "Interactive", token: "--surface-interactive · 219 35% 20%", hex: "#212e45", role: "Secondary buttons, tracks", contrast: "Primary text 11.8:1", ink: "light" },
  { name: "Border", token: "--border · 218 30% 24%", hex: "#2b3850", role: "Hairlines between panels", contrast: "1.4:1 on surface (decorative)", ink: "light" },
];

export const textLevels: GfSwatch[] = [
  { name: "Primary", token: "--text-primary · steel-900", hex: "#e9eff7", role: "Names, numbers, headings", contrast: "14.2:1 on surface", ink: "dark" },
  { name: "Secondary", token: "--text-secondary · steel-800", hex: "#d5ddec", role: "Body copy", contrast: "12.1:1", ink: "dark" },
  { name: "Muted", token: "--text-muted · steel-700", hex: "#bdc8db", role: "Labels, metadata", contrast: "9.8:1", ink: "dark" },
  { name: "Subtle", token: "--text-subtle · steel-600", hex: "#99a5bd", role: "Hints, timestamps", contrast: "6.6:1", ink: "dark" },
];

export const signals: GfSwatch[] = [
  { name: "Cobalt", token: "--accent · 217 91% 60%", hex: "#3c83f6", role: "Focus rings, selection and primary actions", contrast: "4.52:1 on surface", ink: "light" },
  { name: "Success", token: "--success", hex: "#21c45d", role: "Valid deck, complete counts", contrast: "7.2:1", ink: "dark" },
  { name: "Warning", token: "--warning", hex: "#f59f0a", role: "Local-storage notice", contrast: "7.7:1", ink: "dark" },
  { name: "Destructive", token: "--destructive", hex: "#ef4343", role: "Rule errors, delete", contrast: "4.36:1", ink: "light" },
];

// --color-* in globals.css: one per card colour in the game.
export const cardColors: { name: string; hex: string; contrast: string }[] = [
  { name: "Blue", hex: "#3b82f6", contrast: "4.48:1" },
  { name: "Red", hex: "#ef4444", contrast: "4.38:1" },
  { name: "Green", hex: "#22c55e", contrast: "7.23:1" },
  { name: "White", hex: "#e5e7eb", contrast: "13.30:1" },
  { name: "Purple", hex: "#8b5cf6", contrast: "3.89:1" },
  { name: "Colorless", hex: "#7d8ea8", contrast: "4.95:1" },
];

export const tokenDrift = {
  status: "KNOWN GAP" as KitStatus,
  title: "Two sources of truth for one palette",
  detail:
    "The design-system package exports its colours as hex (background #0e1116), but Tailwind reads the HSL custom properties in globals.css (background #091225), and nothing imports the package's semantic hex values. The page renders the CSS. Next step: generate the CSS variables from the package so there's one source.",
};

export const typefaces: { family: string; role: string; spec: string; sample: string; className: string }[] = [
  { family: "Orbitron", role: "Display — the wordmark, page titles, big numbers", spec: "500 · 600 · 700 · uppercase, +0.06em", sample: "Build. Test. Win.", className: "display" },
  { family: "Exo 2", role: "Interface — everything people read", spec: "400 · 500 · 600 · 700", sample: "Main deck must contain exactly 50 cards.", className: "sans" },
  { family: "JetBrains Mono", role: "Data — counts, card numbers, labels", spec: "tabular figures · +0.08em labels", sample: "49/50 · 0/10 · GD01-100", className: "mono" },
];

export const typeScale: { name: string; spec: string }[] = [
  { name: "3xl", spec: "1.875rem / 2.25rem" },
  { name: "2xl", spec: "1.5rem / 2rem" },
  { name: "xl", spec: "1.25rem / 1.75rem" },
  { name: "lg", spec: "1.125rem / 1.75rem" },
  { name: "base", spec: "1rem / 1.5rem" },
  { name: "sm", spec: "0.875rem / 1.25rem" },
  { name: "xs", spec: "0.75rem / 1rem" },
];

// Defined in globals.css. Adoption is partial: levels 1 and 2 are used, level 3 isn't yet.
export const panelLevels: { name: string; spec: string; use: string }[] = [
  { name: "panel-level-1", spec: "surface · border · shadow sm (0 2px 6px)", use: "Resting panels" },
  { name: "panel-level-2", spec: "surface-elevated · steel-400 border · shadow md (0 12px 28px)", use: "Raised panels — the deck preview" },
  { name: "panel-level-3", spec: "surface-elevated · cobalt-400/40 border · shadow lg (0 24px 48px)", use: "Focused work — defined, not used yet" },
];

export const motionTokens: { name: string; value: string; use: string }[] = [
  { name: "instant", value: "80ms", use: "Presses" },
  { name: "fast", value: "140ms", use: "Hovers, toggles" },
  { name: "normal", value: "220ms", use: "Panels, sheets" },
  { name: "slow", value: "320ms", use: "Page-level changes" },
];

export const systemRules: string[] = [
  "The Button component sets a 44 px minimum height at every size. Smaller hand-rolled controls, like the Issues pill, don't use it yet.",
  "Cards keep the game's 5 : 7 ratio at every size; grid widths step 140 → 160 → 180 px by breakpoint.",
  "prefers-reduced-motion drops every animation and transition to near zero, site-wide.",
];

export const buttonFinding = {
  status: "KNOWN GAP" as KitStatus,
  title: "The primary button label is 3.68:1",
  detail:
    "White on cobalt-500 (#3b82f6) is below 4.5:1 for 14px semibold text. The dark text tokens all pass — even “subtle” is 6.6:1 — so the fix is the button, not the system: cobalt-600 (#2563eb) carries white at 5.2:1.",
};

// ---------------------------------------------------------------- Chapter 02 · Designing the decision

export const productProblem =
  "A deck is fifty cards, ten resources, at most two colours and at most four copies of anything. Those are rules. Fifteen units and a sensible cost curve are advice. If the interface can't tell those apart, it either nags or lies.";

export const ruleSet: { kind: "Rule" | "Advice"; text: string; source: string }[] = [
  { kind: "Rule", text: "Main deck must contain exactly 50 cards", source: "validation.ts · Rule 1" },
  { kind: "Rule", text: "Resource deck must contain exactly 10 cards when included", source: "Rule 2 · game rule 6-1-1" },
  { kind: "Rule", text: "At most 2 colours, Colorless excluded", source: "Rule 3 · game rule 6-1-1-2" },
  { kind: "Rule", text: "Every card ID must exist in the catalog", source: "Rule 4" },
  { kind: "Rule", text: "At most 4 copies of a card", source: "Rule 5 · game rule 2-1-2" },
  { kind: "Advice", text: "Consider at least 15 Unit cards", source: "Warning" },
  { kind: "Advice", text: "No Resource cards: the simulator will stand in placeholders", source: "Warning" },
  { kind: "Advice", text: "Average cost above 4.5: consider cheaper cards", source: "Warning" },
];

export const principles: { id: string; title: string; body: string; note?: string }[] = [
  {
    id: "P1",
    title: "Count in the open.",
    body: "Main and resource counts sit above the deck as progress chips that turn green at 50 and 10. The bar is a live region (role=\"status\"), so the count is never more than a glance — or an announcement — away.",
  },
  {
    id: "P2",
    title: "Rules block outcomes, not edits.",
    body: "You can build an invalid deck. You can't playtest one: the Playtest button waits for a valid deck, and the playtester refuses an invalid one with the list of issues.",
    note: "This is the case study's title in practice: the rule shows up while you're still deciding, and it only stops you at the point where it would mislead you.",
  },
  {
    id: "P3",
    title: "Advice never wears a rule's colour.",
    body: "Errors and warnings are separate lists from the validator to the screen. Errors are red and make the deck invalid; warnings are amber and don't.",
  },
  {
    id: "P4",
    title: "Removal is reversible.",
    body: "Taking a card out shows “Removed <card>” with Undo for five seconds. The fast path doesn't punish a slip.",
  },
];

export const builderChanges: { date: string; change: string; why: string; source: string }[] = [
  { date: "Feb 26", change: "Create → Build → View workflow; the MTG-style “Format” field removed", why: "A pattern borrowed from Magic deck builders that didn't match how Gundam decks are built.", source: "ccfb1e7" },
  { date: "Mar 2", change: "Double-click to add → a visible + button on every card", why: "Double-click is invisible and doesn't exist on touch.", source: "0ee8d58" },
  { date: "Mar 2", change: "Carousel → a scrolling grid in the card panel", why: "Four cards per slide hid the catalog behind pagination.", source: "a31bea0" },
  { date: "Mar 2", change: "Advanced filters collapsed by default, with an active-count label", why: "Cards visible on load instead of 300 px of filters.", source: "c7288a5" },
  { date: "Mar 8", change: "Meta-archetype sidebar removed from the Forge", why: "It didn't help build a deck and crowded the one that was being built.", source: "4e6c20f" },
  { date: "Apr 12", change: "Card-detail redesign shipped, then reverted the same day", why: "The richer version came out the same day; the layout that stayed puts the rules text at full contrast.", source: "f984f2d → 2b7af24 → 542f203" },
];

export const capDecision = {
  status: "DOCUMENTED DECISION" as KitStatus,
  title: "The one rule that's enforced silently",
  detail:
    "On Mar 1, 2026 the builder started capping each card at four copies at the click, “rather than relying solely on validation errors” (34ab631). It keeps decks legal, but the fifth click does nothing and says nothing. It's the open question from this project in one line of code: when should an interface block, and when should it explain? Next version: allow the click, show the count go red, and say why.",
};

export const workflowFigures: GfFigure[] = [
  {
    media: "forge-create",
    alt: "Gundam Forge's Create New Deck screen: a basics form with deck name and visibility, collapsed intent and import sections, a local-storage notice and a live deck preview",
    caption: "Create. Name, visibility and optional intent; the preview builds as you type. The amber notice says decks live in this browser.",
    status: "LOCAL BUILD CAPTURE",
    source: "/forge · 1440 × 900",
  },
  {
    media: "forge-draft",
    alt: "The Forge deck builder: card catalog on the left, the deck in stacks of text-proxy cards in the centre, analytics showing 49 of 50 main deck cards, and an Issues (2) button",
    caption: "Build. 49/50 and 0/10 above the deck; Issues (2) on the right. The analytics read the same validator.",
    status: "LOCAL BUILD CAPTURE",
    source: "/forge?deckId=study-draft · 1440 × 900",
  },
  {
    media: "deck-view",
    alt: "Gundam Forge's deck viewer for a seed deck: card stacks, a cost curve, a colour split chart and deck analytics with Playtest, Share and Export actions",
    caption: "View. The finished deck, its curve and colour split, and the way out to Playtest, Share or Export.",
    status: "LOCAL BUILD CAPTURE",
    source: "/decks/blue-white-midrange · a “Forge Team” seed deck",
  },
];

export const decisionSequence: GfFigure[] = [
  {
    media: "forge-draft",
    alt: "The deck builder with a draft deck one card short: 49/50 main deck, 0/10 resources and an Issues (2) button",
    caption: "One card short. The count says so before anything else does.",
    status: "LOCAL BUILD CAPTURE",
    source: "/forge · fictional study deck",
  },
  {
    media: "forge-issues",
    alt: "The Deck Issues sheet open over the builder, listing one error about the 50-card main deck and one warning about missing resource cards",
    caption: "One tap for reasons. The error is red; the advice is amber and phrased as a consequence, not an order.",
    status: "LOCAL BUILD CAPTURE",
    source: "Issues sheet · role=\"dialog\"",
  },
  {
    media: "forge-valid",
    alt: "The deck builder with a complete deck: 50/50 and 10/10 in green and a Valid badge in place of the issues button",
    caption: "Recovered. Both counts green, Issues replaced by ✓ Valid, and Playtest unlocks.",
    status: "LOCAL BUILD CAPTURE",
    source: "/forge?deckId=study-valid",
  },
];

export const playtestFigures: GfFigure[] = [
  {
    media: "playtest-mulligan",
    alt: "The playtester's Mulligan Decision screen showing a five-card opening hand of text proxies and two explained choices: keep this hand or redraw",
    caption: "The same idea in the playtester: two choices, each with its consequence written under it, then a separate confirm.",
    status: "LOCAL BUILD CAPTURE",
    source: "/decks/blue-white-midrange/playtest",
  },
  {
    media: "playtest-board",
    alt: "The playtest battlefield on turn one: opponent and player shield rows, bases, deck and resource counts, and a six-card hand of text proxies",
    caption: "Turn one against the rule-following bot. Phase, turn and the next action sit in the header; the hand stays at the bottom.",
    status: "LOCAL BUILD CAPTURE",
    source: "/decks/blue-white-midrange/playtest",
  },
];

export const surfaceFigures: GfFigure[] = [
  {
    media: "cards",
    alt: "The Cards page: a grid of text-proxy cards sorted A to Z, with search, sort and a filters button",
    caption: "All 623 catalog records, searchable and filterable. Proxies stand in for the art.",
    status: "LOCAL BUILD CAPTURE",
    source: "/cards",
  },
  {
    media: "home",
    alt: "Gundam Forge's home page hero: Build. Test. Win. with Create Deck and Browse Cards buttons and a Meta Snapshot panel of catalog counts",
    caption: "Home, above the fold. The Meta Snapshot counts come from the bundled data (41 decks, 623 cards).",
    status: "LOCAL BUILD CAPTURE",
    source: "/ · cropped above the stat row",
  },
  {
    media: "welcome",
    alt: "A first-visit welcome dialog titled Browse Cards, step one of three, with Skip and Next buttons",
    caption: "First visit: a three-step welcome you can skip.",
    status: "LOCAL BUILD CAPTURE",
    source: "/ · first visit",
  },
];

export const emptyStateFigure: GfFigure = {
  media: "playtest-empty",
  alt: "A Cannot Start Playtest message explaining that no deck ID was provided, with Go to Forge and Browse Decks buttons",
  caption: "Errors as directions: what happened, and the two places to go next.",
  status: "LOCAL BUILD CAPTURE",
  source: "/playtest with no deck",
};

export const responsiveFigures: GfFigure[] = [
  {
    media: "m-forge-draft",
    alt: "The deck builder on a phone: counts and an Issues (2) button above deck analytics and a three-column grid of cards with add and remove buttons",
    caption: "The builder at 390 px: the counts and Issues stay on top; the catalog moves behind a Cards button.",
    status: "LOCAL BUILD CAPTURE",
    source: "390 × 844",
  },
  {
    media: "m-forge-issues",
    alt: "The Deck Issues bottom sheet on a phone listing the 50-card error and the missing-resources warning",
    caption: "The issues sheet comes up from the bottom, in reach of a thumb.",
    status: "LOCAL BUILD CAPTURE",
    source: "390 × 844",
  },
  {
    media: "m-cards",
    alt: "The Cards page on a phone: search, sort, filters and a two-column grid of text-proxy cards",
    caption: "Cards in two columns, search and sort first.",
    status: "LOCAL BUILD CAPTURE",
    source: "390 × 844",
  },
];

export const themeFigures: GfFigure[] = [
  {
    media: "light-forge-draft",
    alt: "The deck builder in the light theme: white surfaces and dark text, with a washed-out yellow local-storage notice and a pale red Issues button",
    caption: "The light theme swaps the surfaces and text levels. The storage notice and Issues button kept their dark-theme colours.",
    status: "LOCAL BUILD CAPTURE",
    source: "data-theme=\"light\"",
  },
  {
    media: "m-light-forge",
    alt: "The light-theme builder on a phone with a low-contrast yellow notice at the top",
    caption: "Same gap at 390 px.",
    status: "LOCAL BUILD CAPTURE",
    source: "390 × 844 · light",
  },
];

export const lightThemeFinding = {
  status: "KNOWN GAP" as KitStatus,
  title: "The light theme is partial",
  detail:
    "The theme toggle re-maps every semantic token, but components that use raw Tailwind colours don't follow. Measured on the rendered page: the local-storage notice is 1.5:1 in light mode (13.1:1 in dark) and the Issues button 2.5:1 (5.5:1). The token audit in March fixed this class of problem once; the light theme needs the same pass.",
};

// ---------------------------------------------------------------- Chapter 03 · Engineering the rules

export const systemDescription =
  "A monorepo with one Next.js app and three packages. The rules live in packages/shared, where the deck builder, the playtester, the deck API route and the game's deck loader all call the same validateDeck(). The web app builds as a static export for GitHub Pages; decks are saved in the browser, and the Supabase paths stay behind feature flags that are off by default.";

export const architecture: { layer: string; detail: string; source: string; status: KitStatus }[] = [
  { layer: "Card data pipeline", detail: "Sync and audit scripts build a 623-record catalog JSON from the official card list.", source: "scripts/ · cards.catalog.json", status: "IMPLEMENTED + INTEGRATED" },
  { layer: "Shared rules", detail: "Card schema (Zod), validateDeck(), the game and playtest engines and their tests.", source: "packages/shared", status: "IMPLEMENTED + INTEGRATED" },
  { layer: "Design system", detail: "Tokens, spacing, type, motion and card sizes, consumed through the Tailwind theme.", source: "packages/design-system", status: "PARTIAL" },
  { layer: "Web app", detail: "Next.js 14 App Router, Radix primitives, TanStack Query; static export.", source: "apps/web", status: "IMPLEMENTED + INTEGRATED" },
  { layer: "Persistence", detail: "Decks in localStorage with a visible notice; cloud sync and auth behind flags.", source: "lib/deck/storage.ts · lib/config/features.ts", status: "PARTIAL" },
];

export const codeHighlights: KitCode[] = [
  {
    id: "rules",
    title: "Rules are errors. Advice is a warning.",
    path: "packages/shared/src/validation.ts",
    lines: [99, 146],
    language: "ts",
    code: `// Rule 1: Main deck MUST be exactly 50 cards (strictly enforced)
if (mainDeckCards < MIN_MAIN_DECK_SIZE) {
  errors.push(\`Main deck must contain exactly \${MIN_MAIN_DECK_SIZE} cards (currently \${mainDeckCards}).\`);
} …

// Rule 3: Maximum 2 colors excluding Colorless (Rule 6-1-1-2)
const nonColorlessColors = colorsUsed.filter(c => c !== 'Colorless');
if (nonColorlessColors.length > MAX_COLORS) {
  errors.push(\`Deck can contain at most \${MAX_COLORS} colors excluding Colorless (currently \${nonColorlessColors.join(', ')}).\`);
}
…
// Warnings
if (mainDeckCards > 0 && typeCounts.Unit < 15) {
  warnings.push(\`Consider adding more Unit cards (currently \${typeCounts.Unit}, recommend at least 15).\`);
}

if (resourceDeckCards === 0 && mainDeckCards > 0) {
  warnings.push(\`No Resource cards in deck. The simulator will generate placeholder resources.\`);
}`,
    problem: "A single list of “problems” makes a suggestion look as binding as a rule, so players either ignore all of it or obey all of it.",
    decision: "The validator returns errors and warnings separately, and only errors decide isValid. Each message says what the rule is and where the deck stands.",
    implementation: "validateDeck() counts once (type, colour, cost curve, copies), then applies five rule checks and three advisory checks. The metrics it returns drive the progress chips and the analytics, so the screen and the verdict can't disagree.",
    tradeoff: "Messages name card numbers (“GD01-100”), not card names, because the validator only has IDs in scope. Readable to me, not to a new player — the UI should map IDs to names before showing them.",
    evidence: "22 tests in packages/shared/tests/validation.test.ts cover each rule and warning. Run for this page over the 41 decks bundled with the app: 39 pass; two seed decks fail (three colours; 46 cards and an unknown ID).",
  },
  {
    id: "status",
    title: "The count is always in view; the reasons are one tap away.",
    path: "apps/web/app/forge/forge-workbench.tsx",
    lines: [345, 407],
    language: "ts",
    code: `function ValidationBar({ entries, allCards }: ValidationBarProps) {
  const result = React.useMemo(() => validateDeck(entries, allCards), [entries, allCards]);
  const { metrics, errors, warnings, isValid } = result;
  const [issuesOpen, setIssuesOpen] = React.useState(false);
  …
  const issueCount = errors.length + warnings.length;

  return (
    <>
      <div
        className="…"
        role="status"
        aria-label="Deck validation status"
      >
        …
          {issueCount > 0 ? (
            <button
              type="button"
              className="…"
              onClick={() => setIssuesOpen(true)}
              aria-label={\`\${issueCount} deck issue\${issueCount !== 1 ? 's' : ''}. Tap to view.\`}
            >
              Issues ({issueCount})
            </button>
          ) : isValid ? (
            <span className="…">✓ Valid</span>
          ) : null}`,
    problem: "Inline error lists push the deck down the screen on every edit; hiding them entirely means the player finds out at export.",
    decision: "Keep the numbers inline and the explanations behind one button. The bar re-validates on every change; the sheet opens only when asked.",
    implementation: "useMemo re-runs validateDeck() whenever the entries change. The bar is a polite live region; the Issues button carries a full sentence as its accessible name; the sheet is a labelled modal dialog.",
    tradeoff: "A count of issues says how many, not which. The first error's text could sit beside the count on wide screens, where there's room.",
    evidence: "Shown in the three captures in 02.3. The same component renders at 390 px with the sheet anchored to the bottom.",
  },
  {
    id: "legality",
    title: "Designed, not yet enforced.",
    path: "packages/shared/src/types.ts",
    lines: [176, 203],
    language: "ts",
    code: `export const getCopyLimit = (
  card: CardDefinition,
  formatId: string
): number => {
  if (!card.legalities) {
    return 4; // Default max copies
  }
  …
  switch (status) {
    case 'legal':
      return 4;
    case 'restricted':
      return 1;
    case 'suspended':
    case 'banned':
      return 0;`,
    problem: "Competitive play bans and restricts cards. A deck builder that only knows “four copies” will call a banned card legal.",
    decision: "Model legality per card and per format in the shared types first, then wire it into validation once there's a trustworthy source for the lists.",
    implementation: "CardDefinition carries optional legalities; isLegalInFormat() and getCopyLimit() turn them into a yes/no and a number.",
    tradeoff: "Nothing calls these helpers yet. validateDeck() still applies a flat limit of four (validation.ts line 124), so the type model promises more than the product does. The case study says so instead of the feature list.",
    evidence: "Searched for this page: getCopyLimit and isLegalInFormat have no call sites outside types.ts at 50321ed.",
  },
  {
    id: "art",
    title: "No art in the repo, and never a broken image.",
    path: "apps/web/components/ui/CardArtImage.tsx",
    lines: [22, 54],
    language: "ts",
    code: `export function CardArtImage(props: CardArtImageProps): JSX.Element {
  const { card, alt, onError, ...imageProps } = props;

  const primarySource = React.useMemo(() => getCardImage(card), [card]);
  const cdnSource = React.useMemo(() => getCardImageFallback(card.id, card.name), [card.id, card.name]);
  const cardBackSource = withBasePath('/card-back.svg');
  const inlineFallback = React.useMemo(() => buildInlineFallback(card.name), [card.name]);
  const [source, setSource] = React.useState(primarySource);
  …
  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (source === primarySource && source !== cdnSource) {
      setSource(cdnSource);
    } else if (source !== cardBackSource && source !== inlineFallback) {
      setSource(cardBackSource);
    } else if (source !== inlineFallback) {
      setSource(inlineFallback);
    }
    onError?.(event);
  };`,
    problem: "Card art is someone else's property and hotlinking it fails in the browser. A deck builder full of broken-image icons is unusable.",
    decision: "Keep art out of git, fetch it at build time for the deploy, and fall back in a fixed order: local file, official CDN, the app's own card back, then a generated tile with the card's name.",
    implementation: "One component owns the chain; every card surface uses it. The CI build downloads art server-side so the static export serves it from its own origin (fb994df, Feb 25, 2026).",
    tradeoff: "Four sources means four ways for an image to look different. The tile always works, but a player can't tell a missing image from a slow one.",
    evidence: "With no network, the local build used for this page fell through to the card back on every card — the chain held. The page's text proxies replace that last step at capture time.",
  },
];

export const testRun: { label: string; value: string; status: KitStatus }[] = [
  { label: "Vitest, whole repo", value: "257 tests in 27 files: 253 passed, 4 skipped (Oct 25, 2026)", status: "COMPUTED FOR THIS PAGE" },
  { label: "Two component test files", value: "Don't start on a clean install: jsdom isn't a declared dependency. They pass once it's added.", status: "KNOWN GAP" },
  { label: "TypeScript", value: "tsc --noEmit clean in apps/web", status: "COMPUTED FOR THIS PAGE" },
  { label: "Production build", value: "next build succeeds; the Forge route loads 295 kB of JavaScript first (capture build)", status: "COMPUTED FOR THIS PAGE" },
  { label: "CI", value: "The deploy workflow runs typecheck and build, not the tests", status: "KNOWN GAP" },
];

export const qaHistory: { date: string; finding: string; source: string }[] = [
  { date: "Feb 24", finding: "Deck rules corrected against the official rules: four copies, not three; the 10-card resource deck made a hard error.", source: "f70a928" },
  { date: "Feb 25", finding: "Every card image broke in the browser: both art hosts block hotlinking. Art now downloads at build time and ships from the app's own origin.", source: "fb994df" },
  { date: "Mar 2", finding: "Playtester labels were emoji-only and its error toast pulsed. Real aria-labels, a static role=\"alert\", and a way back to Decks.", source: "8e02fbc" },
  { date: "Mar 2", finding: "Decks vanish if browser data is cleared. Added the notice that says so where decks are created.", source: "291a53c" },
  { date: "Mar 3", finding: "On phones the card dialog centred on 100vh and cut off below the browser bar. Re-anchored on svh units.", source: "0ce2b43 · PR #6" },
  { date: "Mar 30", finding: "Filters, counts and validation disagreed about which cards were which. One shared card classification for all three.", source: "PR #8" },
];

export const auditFindings: { finding: string; measure: string; status: KitStatus }[] = [
  { finding: "Warning text in the Issues sheet (amber-700 on the dark surface)", measure: "2.8:1 measured", status: "KNOWN GAP" },
  { finding: "The 49/50 and 0/10 counters before they turn green (cobalt-600, 12px)", measure: "3.5:1 measured", status: "KNOWN GAP" },
  { finding: "Playtest's disabled reason lives only in a title tooltip — no keyboard or touch access", measure: "Code review", status: "KNOWN GAP" },
  { finding: "On first load the autosave effect writes an empty deck before the stored one loads; React's development double-mount then reads it back empty", measure: "Reproduced in next dev", status: "KNOWN GAP" },
  { finding: "The app never says it's unofficial or unaffiliated", measure: "Searched the UI source", status: "KNOWN GAP" },
  { finding: "The home page's player, submission and win-rate counters are hard-coded numbers", measure: "app/page.tsx", status: "KNOWN GAP" },
];

// ---------------------------------------------------------------- Reflection

export const reflections: { title: string; body: string }[] = [
  {
    title: "A rule and a hint need different voices.",
    body: "The most useful thing the validator does is refuse to merge errors and warnings. Once those were separate all the way to the screen, the colours, the copy and the Playtest gate all followed.",
  },
  {
    title: "Prevention is a decision too.",
    body: "Capping copies at the click made every deck legal and made one rule invisible. I'd still prevent it — but I'd show the count go red and say why, because a silent “no” teaches nothing.",
  },
  {
    title: "Tokens don't stay true on their own.",
    body: "I audited colours in March and the light theme still drifted, and the package and the CSS still disagree. The fix is structural: generate the CSS from one source and test the contrast in CI, the way the portfolio now does for this page.",
  },
];

export const roadmap: { track: string; items: string[] }[] = [
  {
    track: "Product",
    items: [
      "Say “unofficial, not affiliated with Bandai” in the footer and the welcome",
      "Replace the hard-coded home counters with real data or remove them",
      "Name cards, not IDs, in every validation message",
    ],
  },
  {
    track: "Engineering",
    items: [
      "Wire getCopyLimit() into validateDeck() once a trusted ban list exists",
      "Generate globals.css colour variables from the design-system package",
      "Run Vitest in CI and declare jsdom; fix the autosave-on-mount race",
    ],
  },
  {
    track: "Research",
    items: [
      "Scenario test: build to 50 with and without the live counts",
      "Think-aloud on warning wording: does “consider” read as optional?",
      "Block versus explain: compare the silent cap with a red count",
    ],
  },
];
