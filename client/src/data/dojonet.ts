// DojoNet — case study content for /work/dojonet.
//
// Every claim traces to a source in docs/DOJONET-CASE-STUDY.md (evidence matrix) and every image
// to docs/DOJONET-ASSETS.md (provenance). The app repository is public
// (Epetaway/DojoNet-Prototype-MAX, cited at be2db53, Oct 28, 2025), so code excerpts link to the
// exact lines. Contrast ratios are computed with the WCAG 2.x formula (dojonet.test.tsx checks
// them); token counts come from searching the source at that commit.

import mediaRecord from "./dojonet.media.json";
import { getInvestigation } from "./investigations";
import type { KitCode, KitFigure, KitRepository, KitStatus } from "@/components/case-study-kit/kit";

export type DnMediaId = keyof typeof mediaRecord.media;
export type DnFigure = KitFigure<DnMediaId>;
export const dnMedia = mediaRecord.media;
export const dnOg = mediaRecord.og.src;

const base = getInvestigation("dojonet");
if (!base) throw new Error("The DojoNet investigation record is missing.");
export const dojonetRecord = base;

export const repository: KitRepository = {
  name: "Epetaway/DojoNet-Prototype-MAX",
  url: "https://github.com/Epetaway/DojoNet-Prototype-MAX",
  commit: "be2db53",
  fullCommit: "be2db530aea80ea8525a02536af0452dcd49b1fb",
};

export const dojonet = {
  slug: "dojonet",
  path: "/work/dojonet",
  number: base.number,
  name: base.name,
  heroLine: "Progress isn't the same as completion.",
  heroLead:
    "A training journal and community for martial artists, designed and built as a React prototype: a journal that files your training into belt chapters, a technique library with four honest stages instead of a percentage, and a small design system to hold it together. It's the earliest project on this site and the one I'd change most, so this page shows both.",
  role: "Product idea, interface design and front-end development, solo.",
  disciplines: "Learning design · Interface system · React and TypeScript · Prototyping",
  when: "2025 · public repository from Oct 27, 2025",
  stack: base.stack,
} as const;

export const statusLedger: { label: string; value: string; status: KitStatus }[] = [
  { label: "Journal and technique stages", value: "Working in the browser on demo data", status: "DEVELOPMENT-STAGE IMPLEMENTATION" },
  { label: "Persistence", value: "Browser storage only; a 16-model database schema is designed, not connected", status: "PARTIAL" },
  { label: "Instructor coaching", value: "Not built", status: "KNOWN GAP" },
];

export const overview = {
  problem:
    "Training apps count what's easy to count: sessions, streaks, hours. Most of a martial artist's progress is what isn't — knowing why a technique works, taking a correction, landing it on someone who's resisting. A percentage bar can't tell those apart.",
  role:
    "I came up with the product, defined its UX and component spec, designed the interface and its tokens, and built the front end in React and TypeScript, with a small Express server for local development. It's a one-person prototype: demo data, no backend in the deployed build.",
  exists:
    "A React 19 and Vite app: a dashboard with a journal-first composer; a training journal with entries, sparring, a technique library, progress and goals; journal chapters by belt; events, forums and profiles. Everything runs in the browser on seeded demo data.",
  boundary:
    "No users, no hosted backend and no measured learning outcome. Captures come from a local production build of the public repository at be2db53, signed in as the app's own demo account; remote avatars and stock photos render as neutral placeholders. Several captures show bugs on purpose — this page documents them.",
};

export const chapters: { number: string; id: string; title: string; line: string; status: KitStatus }[] = [
  { number: "01", id: "system", title: "The design system", line: "Warm white, one Dojo Red, no borders — and Bebas Neue where it should feel like a gym wall.", status: "PARTIAL" },
  { number: "02", id: "learning", title: "Designing for learning", line: "Belt chapters and four stages: a history of practice instead of a score.", status: "DEVELOPMENT-STAGE IMPLEMENTATION" },
  { number: "03", id: "engineering", title: "Engineering, and what I'd fix", line: "A static demo on browser storage, two stores, and a token that was never defined.", status: "KNOWN GAP" },
];

// ---------------------------------------------------------------- Chapter 01 · The design system

export const productIdea = {
  statement: "A dojo page that feels like yours.",
  detail:
    "The spec describes DojoNet as a martial-arts social network “inspired by early MySpace customization with 2025-grade design”: a page you can theme, a Top 8 of training partners, a journal you actually keep. The design system had to make room for that personality without letting it break the layout.",
  source: "docs/DojoNet-UI-UX-and-Component-Implementation.md · §1",
};

export const specPrinciples: string[] = [
  "Journal-first: gentle prompts and fast post actions.",
  "Verification and gym affiliation shown clearly, never loudly.",
  "Safe interactions: scoped privacy, friendly defaults, accessible controls.",
  "Personalisation: light theming and layout editing for each dojo page.",
  "Modular, responsive components with sensible motion and loading states.",
];

export type DnSwatch = { name: string; token: string; hex: string; role: string; contrast: string; ink: "light" | "dark"; dark?: string };

// src/index.css, “Spec v3”. Ratios: text tokens on the surface they sit on; accents as text on white.
export const palette: DnSwatch[] = [
  { name: "Background", token: "--color-bg", hex: "#F9F9F9", dark: "#0B0C0F", role: "Page ground", contrast: "Text 16.5:1", ink: "dark" },
  { name: "Surface", token: "--color-surface", hex: "#FFFFFF", dark: "#121418", role: "Cards, composer, panels", contrast: "Text 17.4:1", ink: "dark" },
  { name: "Matte Black", token: "--color-text", hex: "#1A1A1A", dark: "#F3F4F6", role: "Primary text", contrast: "17.4:1 on surface", ink: "light" },
  { name: "Text Secondary", token: "--color-text-muted", hex: "#4D4D4D", dark: "#9CA3AF", role: "Metadata, labels", contrast: "8.5:1 · dark 7.3:1", ink: "light" },
  { name: "Dojo Red", token: "--accent-primary", hex: "#B71C1C", dark: "#EF4444", role: "The brand and every primary action", contrast: "6.6:1 · white on it 6.6:1", ink: "light" },
  { name: "Teal", token: "--accent-teal", hex: "#009688", role: "Success", contrast: "3.7:1 as text", ink: "light" },
  { name: "Amber", token: "--accent-amber", hex: "#F59E0B", role: "Warning", contrast: "2.1:1 as text", ink: "dark" },
];

export const systemSpecs: { label: string; value: string }[] = [
  { label: "Borders", value: "None. --color-border is transparent: surfaces separate by shadow alone." },
  { label: "Elevation", value: "0 1px 2px / 0 10px 24px at 6% and 12% black — one token, every card." },
  { label: "Radii", value: "8 · 12 · 16 · 20 px; cards use 16." },
  { label: "Spacing", value: "An 8-point scale: 8 · 16 · 24 · 32." },
  { label: "Page margins", value: "16 px phone · 40 px tablet · 80 px desktop." },
  { label: "Dark theme", value: "A .dark class re-maps the same names; the red brightens to #EF4444." },
];

export const typefaces: { family: string; role: string; spec: string; sample: string; className: string }[] = [
  { family: "Bebas Neue", role: "The wordmark and section headings", spec: "400 · uppercase · +0.02em", sample: "Discover your martial arts journey", className: "display" },
  { family: "Inter", role: "Everything people read and type", spec: "400 · 500 · 600 · 700", sample: "Drilled hip escapes, knee shields. Struggled vs pressure passing.", className: "sans" },
];

export const profileThemes: { name: string; primary: string; secondary: string }[] = [
  { name: "Default", primary: "#0ea5e9", secondary: "#0c4a6e" },
  { name: "Tatami", primary: "#f59e0b", secondary: "#78350f" },
  { name: "Iron", primary: "#6366f1", secondary: "#312e81" },
  { name: "Neon", primary: "#ec4899", secondary: "#831843" },
];

export const tokenAudit = {
  defined: 24,
  undefinedNames: ["--color-primary", "--color-elevated", "--accent-primary-hover", "--color-surface-hover", "--color-bg-elevated", "--color-border-hover"],
  colorPrimaryUses: 153,
  colorPrimaryFiles: 16,
  accentPrimaryUses: 105,
  status: "KNOWN GAP" as KitStatus,
  title: "153 uses of a token that doesn't exist",
  detail:
    "index.css defines 24 custom properties. Components reference six more that it never declares. The most common, --color-primary, appears 153 times across 16 files — the README even lists it as the brand accent — while the stylesheet calls that colour --accent-primary. An undefined variable resolves to nothing, so in light mode every active tab and primary link-button renders white text on a transparent background. Dark mode hides the bug: white on near-black still reads.",
};

export const redsFinding = {
  status: "KNOWN GAP" as KitStatus,
  title: "One brand red, three in the code",
  detail:
    "Dojo Red lives in a token (105 uses), but 51 class names point at Tailwind's “brand” palette, which is rose (#E11D48), and 57 more at raw red-500 (#EF4444). The capture's New Post button and the active nav item aren't the same red as the Post button beside them.",
};

export const fixFigures: { before: DnFigure; after: DnFigure }[] = [
  {
    before: {
      media: "training",
      alt: "The Training Journal in light mode: the active Journal Entries tab and the New Entry button are white text on an almost white background and can barely be seen",
      caption: "As built. The active tab and New Entry are there — white on #F9F9F9, 1.05:1.",
      status: "LOCAL BUILD CAPTURE",
      source: "#/training · light",
    },
    after: {
      media: "training-fixed",
      alt: "The same Training Journal with the missing token defined: the active tab and New Entry button now show as Dojo Red with white text",
      caption: "One line added — :root { --color-primary: var(--accent-primary) } — and they come back in Dojo Red, 6.6:1.",
      status: "FIX DEMONSTRATED",
      source: "Same page · one CSS rule injected at capture",
    },
  },
  {
    before: {
      media: "m-techniques",
      alt: "The technique library on a phone: the active Technique Library tab and the New Entry and Add Technique buttons are invisible",
      caption: "At 390 px the same gap hides the tab you're on and both add buttons.",
      status: "LOCAL BUILD CAPTURE",
      source: "#/training · 390 × 844",
    },
    after: {
      media: "m-techniques-fixed",
      alt: "The technique library on a phone after the fix, with Practicing selected for Hip Escape in amber text",
      caption: "Fixed, with Practicing chosen for Hip Escape. Note the amber stage label — see 02.1.",
      status: "FIX DEMONSTRATED",
      source: "Same page · one CSS rule injected at capture",
    },
  },
];

// ---------------------------------------------------------------- Chapter 02 · Designing for learning

export const productProblem =
  "If the screen says 80% mastered, a student believes it, and so does everyone they show it to. The model on the screen becomes the model in their head. So the model has to be honest before it's motivating.";

export const stages: { id: string; label: string; meaning: string; hex: string; selectedContrast: string }[] = [
  { id: "learning", label: "Learning", meaning: "I've been shown it and I know what it's for.", hex: "#EF4444", selectedContrast: "3.3:1" },
  { id: "practicing", label: "Practicing", meaning: "I can do it in drilling, with a cooperative partner.", hex: "#F59E0B", selectedContrast: "2.0:1" },
  { id: "comfortable", label: "Comfortable", meaning: "It shows up in live rolls against resistance.", hex: "#009688", selectedContrast: "3.3:1" },
  { id: "mastered", label: "Mastered", meaning: "I can teach it and fix it in someone else.", hex: "#22C55E", selectedContrast: "2.1:1" },
];

export const stageNote =
  "The four labels and their order are the app's own. The one-line meanings are proposed for this page; the product doesn't define its stages anywhere a student can read, which is part of the problem.";

export const stageFinding = {
  status: "KNOWN GAP" as KitStatus,
  title: "The selected stage is the hardest one to read",
  detail:
    "Unselected stage buttons are grey on light grey at 8.0:1. The selected one switches to its colour on a 10% tint of the same colour: Learning 3.3:1, Practicing 2.0:1, Comfortable 3.3:1, Mastered 2.1:1. The answer to “where am I?” is the lowest-contrast text on the card.",
};

export const modelPoints: { title: string; body: string; source: string; status: KitStatus }[] = [
  {
    title: "Four stages, chosen by the learner",
    body: "A technique is Learning, Practicing, Comfortable or Mastered — a TypeScript union, not a number. Nothing calculates it: you pick it, and you can move it back.",
    source: "TrainingJournal.tsx · Technique.proficiency",
    status: "IMPLEMENTED + INTEGRATED",
  },
  {
    title: "Progress shows a spread, not a score",
    body: "The Progress tab shows how many techniques sit at each stage, and each stage's share. It never rolls them into one overall score.",
    source: "TrainingJournal.tsx · Technique Proficiency",
    status: "IMPLEMENTED + INTEGRATED",
  },
  {
    title: "Belt chapters",
    body: "New members start a “White Belt Journey” chapter, and every journal entry files into the chapter that's open. A promotion closes it and opens the next, named for the new rank, so the history reads like a training log, not a checklist.",
    source: "store.js · ensureChapter, rankUp · Journal.jsx",
    status: "IMPLEMENTED + INTEGRATED",
  },
  {
    title: "The dashboard still counts",
    body: "The first thing on the dashboard is a streak, hours this month and total sessions. That's the completion model the rest of the product argues against, in the most prominent spot.",
    source: "MilestonesWidget · dashboard capture",
    status: "KNOWN GAP",
  },
];

export const ia: { area: string; screens: string[]; note: string; inScope: boolean }[] = [
  { area: "Dashboard", screens: ["Composer: Post or Journal", "Feed", "Your Progress", "Upcoming events"], note: "Journal-first home", inScope: true },
  { area: "My Journal", screens: ["Chapters by belt", "Filters", "Entry stats"], note: "The learning history", inScope: true },
  { area: "Training Journal", screens: ["Entries", "Sparring", "Technique library", "Partners", "Progress", "Goals"], note: "Structured practice", inScope: true },
  { area: "Community", screens: ["Forums", "Events", "Explore", "Partner matching"], note: "Present in the prototype; outside this case study", inScope: false },
  { area: "You", screens: ["Profile with themes and Top 8", "Messages", "Notifications", "Settings"], note: "Personal dojo page", inScope: false },
];

export const composerFigure: DnFigure = {
  media: "composer-journal",
  alt: "The dashboard composer switched to Journal: title, a notes field, discipline and session type, duration, techniques, mood, energy, intensity and recovery sliders, an injured checkbox, and a visibility menu set to Public",
  caption: "The composer's Journal mode asks for the session, not just a post: discipline, type, duration, techniques, mood and three 1–10 sliders. The visibility menu starts on Public.",
  status: "LOCAL BUILD CAPTURE",
  source: "#/dashboard · Journal mode",
};

export const privacyFinding = {
  status: "KNOWN GAP" as KitStatus,
  title: "A journal that starts public",
  detail:
    "The spec's journal composer defaults to Private. The composer that shipped defaults every entry, journal or post, to Public (PostComposer.jsx, line 8). A training journal holds injuries and bad days; it should start private and be shared on purpose. It's the lesson I took into WithYou, where private is the default for everything.",
};

export const buildFigures: DnFigure[] = [
  {
    media: "dashboard",
    alt: "The DojoNet dashboard: left navigation with a red New Post button, the composer, a feed post from the demo user, and a Your Progress panel of streak, hours, sessions and belt",
    caption: "Dashboard: composer first, feed second. Your Progress — the counters 02.1 calls out — owns the right rail.",
    status: "LOCAL BUILD CAPTURE",
    source: "#/dashboard · demo account",
  },
  {
    media: "journal",
    alt: "My Journal: All Chapters, White Belt Journey and Blue Belt (current) tabs, filters and stats on the left, and a private White Belt Finale entry with technique tags",
    caption: "My Journal, filed by belt: White Belt Journey, then Blue Belt (current). The entry is marked Private.",
    status: "LOCAL BUILD CAPTURE",
    source: "#/journal",
  },
  {
    media: "techniques-fixed",
    alt: "The technique library with the token fix applied: Hip Escape with its note and four stage buttons, Practicing selected",
    caption: "The technique library: a note per technique and the four stages, one tap each.",
    status: "FIX DEMONSTRATED",
    source: "#/training · Technique Library · token rule injected",
  },
  {
    media: "progress-fixed",
    alt: "The Progress tab: training overview totals, session vitals and a breakdown by session type",
    caption: "Progress: totals, session vitals and sessions by type, with the stage spread further down.",
    status: "FIX DEMONSTRATED",
    source: "#/training · Progress · token rule injected",
  },
];

export const parityFigures: DnFigure[] = [
  {
    media: "dark-dashboard",
    alt: "The dashboard in dark mode with near-black surfaces, light text and the brighter red accent",
    caption: "Dark mode re-maps the same token names. The red brightens to #EF4444 — white on it drops to 3.8:1.",
    status: "LOCAL BUILD CAPTURE",
    source: "#/dashboard · .dark",
  },
  {
    media: "dark-techniques",
    alt: "The technique library in dark mode where the active tab and add buttons are visible as white text",
    caption: "Same build, dark: the missing token goes unnoticed because white on near-black reads fine.",
    status: "LOCAL BUILD CAPTURE",
    source: "#/training · .dark",
  },
];

export const mobileFigures: DnFigure[] = [
  {
    media: "m-dashboard",
    alt: "The dashboard on a phone: composer, a feed post and the floating bottom navigation",
    caption: "Phone: the composer leads; a floating bar carries the navigation.",
    status: "LOCAL BUILD CAPTURE",
    source: "390 × 844",
  },
  {
    media: "m-journal",
    alt: "My Journal on a phone with a red New Entry button, chapter tabs and filters",
    caption: "Chapters become a horizontal scroller.",
    status: "LOCAL BUILD CAPTURE",
    source: "390 × 844",
  },
  {
    media: "m-techniques-fixed",
    alt: "The technique library on a phone with Practicing selected for Hip Escape",
    caption: "Stages stay one tap each at phone width.",
    status: "FIX DEMONSTRATED",
    source: "390 × 844 · token rule injected",
  },
];

// ---------------------------------------------------------------- Chapter 03 · Engineering

export const systemDescription =
  "A React 19 and Vite single-page app, routed with a hash router so it can live on GitHub Pages. State lives in Zustand and persists to localStorage; a small Express server with a JSON file stood in for an API during development, and a 16-model Prisma schema sketches the real backend. None of the server side runs in the deployed demo.";

export const architecture: { layer: string; detail: string; source: string; status: KitStatus }[] = [
  { layer: "React 19 + Vite", detail: "Lazy routes with Suspense; HashRouter in production for GitHub Pages.", source: "src/App.jsx · vite.config.js", status: "IMPLEMENTED + INTEGRATED" },
  { layer: "Two stores", detail: "A JavaScript store and a TypeScript store, both Zustand, both reading the session from localStorage.", source: "src/store.js · src/app/store.ts", status: "KNOWN GAP" },
  { layer: "Browser storage", detail: "Journals, techniques, goals and sessions per user under namespaced keys.", source: "src/lib/storage.js", status: "PARTIAL" },
  { layer: "Dev server", detail: "Express with JSON-file persistence; the front end falls back to local data when it's off.", source: "server/index.js", status: "PARTIAL" },
  { layer: "Database schema", detail: "Users, profiles, journals, threads, messages and more — 16 models.", source: "prisma/schema.prisma", status: "DESIGNED" },
];

export const codeHighlights: KitCode[] = [
  {
    id: "stages",
    title: "A stage you choose, not a number you earn.",
    path: "src/pages/TrainingJournal.tsx",
    lines: [916, 931],
    language: "ts",
    code: `{(['learning', 'practicing', 'comfortable', 'mastered'] as const).map(level => {
  const config = proficiencyColors[level]
  return (
    <button
      key={level}
      onClick={() => updateTechniqueProficiency(tech.id, level)}
      className={\`flex-1 px-2 py-1 rounded-lg text-xs font-medium transition-all \${
        tech.proficiency === level
          ? \`\${config.bg} \${config.text}\`
          : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'
      }\`}
    >
      {config.label}
    </button>
  )
})}`,
    problem: "Any progress number invites the question “how close am I to 100?” — and in a grappling art that question has no honest answer.",
    decision: "Model proficiency as one of four named states (a TypeScript union on the Technique type) and let the learner set it, up or down, with one tap.",
    implementation: "Each technique renders the four stages as buttons. Choosing one saves the technique back to the user's localStorage key; nothing derives a score from it.",
    tradeoff: "The buttons don't say they're selected to assistive technology (no aria-pressed), and the selected colours fail contrast. The seeded demo technique uses “Intermediate”, a value outside the union, so on first load no stage is selected at all.",
    evidence: "Captured in 02.4 and 03.3. The portfolio prototype in 02.5 restates the interaction with fictional data.",
  },
  {
    id: "chapters",
    title: "A promotion closes a chapter.",
    path: "src/store.js",
    lines: [544, 566],
    language: "ts",
    code: `rankUp(userId, newRank, art){
  const now = new Date().toISOString();

  // Close current chapter
  const chapters = get().chapters.map(ch =>
    ch.userId === userId && !ch.endedAt ? { ...ch, endedAt: now } : ch
  );

  // Create new chapter
  const userChapters = chapters.filter(ch => ch.userId === userId);
  const orderIndex = Math.max(...userChapters.map(ch => ch.orderIndex), 0) + 1;
  const newChapterId = uid('ch');
  const newChapter = {
    id: newChapterId,
    userId,
    title: newRank,
    startedAt: now,
    endedAt: null,
    orderIndex
  };

  const updatedChapters = [...chapters, newChapter];
  set({ chapters: updatedChapters }); LS.set('chapters', updatedChapters);`,
    problem: "A flat list of journal entries gets long, and it loses the shape of how someone actually learned.",
    decision: "Give the journal chapters with a start and an end, and let a belt promotion be the thing that turns the page.",
    implementation: "rankUp() stamps endedAt on the open chapter and opens a new one titled with the new rank. ensureChapter() files every new journal entry into whichever chapter is open, creating “White Belt Journey” if there isn't one.",
    tradeoff: "Belts are the only chapter boundary, and promotions in some schools take years. Self-named chapters (a camp, an injury comeback) would fit more of how people train.",
    evidence: "The My Journal capture in 02.4 shows the demo account's White Belt Journey and Blue Belt (current) chapters.",
  },
  {
    id: "session",
    title: "Two stores, one session, and a race.",
    path: "src/app/store.ts",
    lines: [80, 96],
    language: "ts",
    code: `// Auto-login as demo user if no session exists
...(typeof window !== 'undefined' && !LS.get('session', { userId: null }).userId ? (() => {
  const DEMO_ID = 'u_demo';
  // Seed demo data
  (async () => {
    try {
      const res = await fetch('/DojoNet-Prototype-MAX/demo-data.json');
      const demoData = await res.json();
      LS.set('users', demoData.users);
      LS.set('journals_u_demo', demoData.journals);
      LS.set('techniques_u_demo', demoData.techniques);
      …
      set({ users: demoData.users, session: { userId: DEMO_ID } });
      LS.set('session', { userId: DEMO_ID });
    } catch (e) {`,
    problem: "A static demo has no login server, so a first-time visitor needs to land signed in with something to look at.",
    decision: "Seed a demo account from a JSON file on first load and write the session to localStorage.",
    implementation: "The TypeScript store fetches demo-data.json and sets its own session. The JavaScript store, which most pages use, read the session once when it loaded (store.js, line 278) — before the fetch finished.",
    tradeoff: "On a first visit the dashboard says “Login to see your dashboard” until a reload. Two stores holding the same state is the root cause; one store, or a shared session subscription, is the fix.",
    evidence: "Reproduced for this page in a fresh browser profile — the “fresh-dashboard” capture in 03.3.",
  },
  {
    id: "tokens",
    title: "The tokens that exist.",
    path: "src/index.css",
    lines: [6, 20],
    language: "ts",
    code: `/* Design Tokens: Light Theme */
:root {
	/* Colors (Spec v3) */
	--color-bg: #F9F9F9; /* Background Light */
	--color-surface: #FFFFFF; /* Surface */
	/* Slightly deeper base shadow for borderless separation */
	--color-elevation: 0 1px 2px rgba(26,26,26,0.06), 0 10px 24px rgba(26,26,26,0.12);
	--color-text: #1A1A1A; /* Text Primary */
	--color-text-muted: #4D4D4D; /* Text Secondary */
	--color-border: transparent; /* Neutral (borderless preference) */

	/* Accent Palette */
	--accent-primary: #B71C1C; /* Dojo Red */
	--accent-teal: #009688; /* Success brand per spec */
	--accent-amber: #F59E0B; /* Warning */`,
    problem: "Tokens only help if every component spells them the same way.",
    decision: "Name the palette once in CSS custom properties and reference them from Tailwind's arbitrary values, so the dark theme is one class away.",
    implementation: "A .dark block re-maps the same names. Components use bg-[var(--…)] and text-[var(--…)] throughout.",
    tradeoff: "Nothing checks the names. --accent-primary is defined here; --color-primary, used 153 times, isn't — and arbitrary values fail silently. A lint rule or a typed token map would have caught it at build time.",
    evidence: "Counted for this page at be2db53: 24 properties defined, 6 referenced but undefined.",
  },
];

export const testRun: { label: string; value: string; status: KitStatus }[] = [
  { label: "Vitest", value: "1 test file, 1 test — tutorial gating — passes (Oct 25, 2026)", status: "COMPUTED FOR THIS PAGE" },
  { label: "Production build", value: "vite build succeeds; the entry chunk is 121 kB gzipped", status: "COMPUTED FOR THIS PAGE" },
  { label: "Portfolio prototype", value: "Deterministic interaction test: session, stage, reflection, history, reset", status: "IMPLEMENTED + INTEGRATED" },
  { label: "Coverage of the journal itself", value: "No automated tests", status: "KNOWN GAP" },
];

export const qaHistory: { date: string; finding: string; source: string }[] = [
  { date: "Oct 27", finding: "Deep links needed a 404-redirect workaround on GitHub Pages. Production switched to a hash router instead.", source: "a7a79cb → 03c3ffe" },
  { date: "Oct 27", finding: "Signed-out visitors hit localStorage errors. Fixed for the static demo.", source: "1000620" },
  { date: "Oct 27", finding: "Top Conversations crashed in static mode with no API. Stubbed its responses.", source: "989ca4a" },
  { date: "Oct 27", finding: "The demo user was missing the arrays the dashboard reads (friends, followers, comments). Added them.", source: "db710cc" },
  { date: "Oct 27", finding: "Dashboard widgets called getJournals on the store that didn't have it. Added it to the TypeScript store.", source: "077fe29" },
];

export const qaFigures: DnFigure[] = [
  {
    media: "fresh-dashboard",
    alt: "The DojoNet dashboard on a first visit showing only the header and the message Login to see your dashboard",
    caption: "First visit, fresh browser: the demo account exists, but the page's store doesn't know yet.",
    status: "LOCAL BUILD CAPTURE",
    source: "#/dashboard · new browser profile",
  },
  {
    media: "profile-crash",
    alt: "A red runtime error banner reading TypeError: Cannot read properties of undefined (reading 'left') with a stack trace",
    caption: "The demo profile crashes: its seed user has no layout object for the profile's left and right columns.",
    status: "LOCAL BUILD CAPTURE",
    source: "#/profile/u_demo",
  },
];

export const auditFindings: { finding: string; measure: string; status: KitStatus }[] = [
  { finding: "Six CSS variables used but never defined; --color-primary alone 153 times", measure: "Counted at be2db53", status: "KNOWN GAP" },
  { finding: "First visit shows “Login to see your dashboard” until a reload", measure: "Reproduced", status: "KNOWN GAP" },
  { finding: "The demo profile route crashes (reading 'left' of undefined)", measure: "Reproduced", status: "KNOWN GAP" },
  { finding: "Seed technique uses “Intermediate”, outside the four-stage union", measure: "demo-data.json", status: "KNOWN GAP" },
  { finding: "New entries default to Public", measure: "PostComposer.jsx", status: "KNOWN GAP" },
  { finding: "Selected stage labels between 2.0:1 and 3.3:1", measure: "Computed", status: "KNOWN GAP" },
  { finding: "“New Entry” on the Training Journal sends you back to the dashboard composer", measure: "TrainingJournal.tsx", status: "KNOWN GAP" },
  { finding: "The Button atom is 40 px tall, under a 44 px touch target", measure: "Button.jsx · h-10", status: "KNOWN GAP" },
];

// ---------------------------------------------------------------- Reflection

export const reflections: { title: string; body: string }[] = [
  {
    title: "The model is the message.",
    body: "The technique library says progress is a stage you name. The dashboard says it's a streak. The product made both arguments at once, and the louder one was on the home screen. I'd lead with the last thing you learned instead.",
  },
  {
    title: "Private is a default, not a setting.",
    body: "My own spec said journal entries start private. The build started them public, and I didn't catch it. In WithYou I made private the default for everything and treated sharing as the deliberate act.",
  },
  {
    title: "A token is only real if something checks it.",
    body: "A palette in a comment block isn't a design system. In the projects since, tokens live in one typed source and contrast is checked by tests — this page's numbers included — instead of by eye.",
  },
];

export const roadmap: { track: string; items: string[] }[] = [
  {
    track: "Product",
    items: [
      "Lead the dashboard with the latest stage change or reflection, not a streak",
      "Journal entries private by default; sharing as an explicit step",
      "A coach's note that sits beside the learner's own stage, never over it",
    ],
  },
  {
    track: "Engineering",
    items: [
      "One store; the session read from a single subscription",
      "Define the six missing tokens and lint for undefined custom properties",
      "Seed data typed against the app's own types; fix the profile layout crash",
    ],
  },
  {
    track: "Research",
    items: [
      "Diary study of how students choose and revise a stage",
      "Instructor interviews: when should a coach disagree with a self-assessment?",
      "Compare a stage history with a percentage bar on the same training log",
    ],
  },
];
