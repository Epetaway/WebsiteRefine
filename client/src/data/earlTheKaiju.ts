// Earl the Kaiju — flagship case study content.
//
// Every claim here traces to a source listed in docs/EARL-THE-KAIJU-CASE-STUDY.md
// (evidence matrix) and every image to docs/EARL-THE-KAIJU-ASSETS.md (provenance).
// Statuses use the vocabulary below; validate-content.ts and the governance tests
// check the rules that matter most (no live link until one is verified, no
// unsupported outcome language).

import mediaRecord from "./earlTheKaiju.media.json";

export type FlagshipStatus =
  | "APPROVED"
  | "PROPOSED"
  | "SOURCE REFERENCE"
  | "RETROSPECTIVE ILLUSTRATION"
  | "IMPLEMENTED + TESTED"
  | "BUILT, NOT DEPLOYED"
  | "CI RENDER"
  | "LOCAL BUILD CAPTURE"
  | "CONCEPT"
  | "DESIGNED"
  | "PLANNED"
  | "KNOWN GAP";

export type MediaId = keyof typeof mediaRecord.media;
export type LogoId = keyof typeof mediaRecord.logos;

export const media = mediaRecord.media;
export const logos = mediaRecord.logos;

export type Figure = {
  media: MediaId;
  alt: string;
  caption: string;
  status: FlagshipStatus;
  source: string;
};

export type CodeHighlight = {
  id: string;
  chapter: "website" | "coach";
  title: string;
  repo: string;
  path: string;
  commit: string;
  /** Public repositories link to the file; the website repository is private. */
  href?: string;
  language: "ts" | "kotlin" | "xml";
  code: string;
  problem: string;
  decision: string;
  implementation: string;
  tradeoff: string;
  evidence: string;
};

/** The coaching site has no verified public URL. Set this only after launch is confirmed. */
export const coachingSite: { liveUrl: string | null; status: string; note: string } = {
  liveUrl: null,
  status: "Built and tested on a local build. Not deployed; no domain chosen yet.",
  note: "There's no public link yet. When the site launches, a Visit Earl the Kaiju link will appear here.",
};

export const repositories = {
  website: { name: "Epetaway/EarltheKaiju", visibility: "private", commit: "77657a8" },
  coach: {
    name: "Epetaway/earltheKaiju_app",
    visibility: "public",
    commit: "6446efa",
    url: "https://github.com/Epetaway/earltheKaiju_app",
  },
  brand: { name: "Earl-the-Kaiju-Brand-Package-v1.5", files: 949 },
} as const;

export const flagship = {
  slug: "earl-the-kaiju",
  path: "/work/earl-the-kaiju",
  number: "02",
  name: "Earl the Kaiju",
  theme: "Brand ecosystem",
  question:
    "Can one person's identity become a brand, a business website and a working teaching tool — without faking any of it?",
  status: "Brand approved · Website and app in development",
  role: "Concept, art direction, UX and product decisions; AI-assisted development that I directed, reviewed and tested",
  context: "My own Brazilian Jiu-Jitsu brand",
  accent: "#0B7A62",
  accentSecondary: "#D4AF37",
  summary:
    "My Jiu-Jitsu brand, built end to end: an identity system, an interest-first instructor website, and Kaiju Coach, a private offline Android app for teaching class.",
  built:
    "An approved brand package (v1.5), a Next.js site whose interest form and Cloudflare Worker API pass end-to-end tests on a local build, and an Android MVP tested in CI and on my phone.",
  decision:
    "Interest first: the site collects inquiries, never bookings, and its form never asks for a child's name or health information.",
  stack: ["Brand identity", "Next.js", "Cloudflare Workers", "Kotlin", "Jetpack Compose"],
  previewAlt:
    "The Earl the Kaiju crest beside the instructor website's home page and the Kaiju Coach Today screen",
  heroLine: "Building an identity into a working ecosystem.",
  heroLead:
    "A brand, a coaching website and a teaching app, designed around my life as a Jiu-Jitsu black belt. I had to be able to use it before I'd show it to anyone.",
} as const;

export const statusLedger: { label: string; value: string; status: FlagshipStatus }[] = [
  { label: "Brand identity", value: "v1.5 approved Oct 18–19, 2026", status: "APPROVED" },
  { label: "Instructor website", value: "Built and tested locally; not public yet", status: "BUILT, NOT DEPLOYED" },
  { label: "Kaiju Coach", value: "Sprint 01 MVP, installed on my phone", status: "IMPLEMENTED + TESTED" },
];

export const overview = {
  problem:
    "I teach Jiu-Jitsu, and I design and build software. Neither side had a home I owned: no brand of my own, no site that explained how I teach, and a class workflow spread across a lesson plan, a phone timer, paper attendance and my memory.",
  role:
    "I set the brand strategy and art direction, wrote the requirements for both products, made the UX calls and approved every release. The production work — vector cleanup, most of the code and the tests — was done with Claude, an AI model, working from my briefs. I reviewed what came back, rejected what didn't feel like me, and tested the app on my own phone.",
  exists:
    "An approved identity system. A Next.js instructor website with a working interest form and Worker API, tested end to end on a local build. An offline Android app I can run a class with: Today, Planner, Class Mode, Timer, Students and Attendance.",
  boundary:
    "Everything here is built and tested. None of it has real users yet: the site isn't public and the app hasn't been used in a class. Those are the next results, and I'll publish them when they're real.",
};

export const chapters = [
  { number: "01", id: "identity", title: "Building the identity", line: "Strategy, symbol, lettering, color and the rules that hold it together.", status: "APPROVED" as FlagshipStatus },
  { number: "02", id: "website", title: "Building the business platform", line: "An instructor website that turns real interest into a conversation.", status: "BUILT, NOT DEPLOYED" as FlagshipStatus },
  { number: "03", id: "coach", title: "Building the instructor tool", line: "Kaiju Coach: everything I need on the mat, offline, on one phone.", status: "IMPLEMENTED + TESTED" as FlagshipStatus },
];

export const whyIBuiltIt = [
  "I trained as a graphic designer. My BFA taught me hierarchy, type, and how much a mark has to survive before it's really a logo. Front-end work came next, and with it a different kind of design: states, data, accessibility — the parts of an interface nobody notices until they break.",
  "I started Brazilian Jiu-Jitsu in 2015, the same year I graduated, and I was promoted to black belt in 2024. Somewhere in those years the mat became the place I understood myself best: how I react under pressure, what I do when I'm stuck, how to teach someone a thing they can't do yet.",
  "My design career hasn't been a straight line, and for a long time I kept those two parts of my life apart. I was also quieter about my own work than I should have been. Earl the Kaiju is me deciding to start again rather than start over — taking the two disciplines I actually have and building something real with both.",
  "Real meant three things. A brand I'd wear and teach under. A website that could introduce me to students without pretending I already run an academy. And a tool I'd reach for in the middle of a class. Running my own academy is the longer goal; this is the groundwork for it.",
  "It's also the clearest way I know to show what I can do. Every decision on this page had a real user behind it — me, my future students, their parents — and a real constraint.",
];

// ---------------------------------------------------------------- Chapter 01
export const brandIdea = {
  statement: "The panther is Earl.",
  explanation:
    "It isn't a mascot, a pet, or a spirit I call up. It's the part of me that watches, waits and acts with control. The belt is the ritual that binds and directs that power — it doesn't create it.",
  tension:
    "The brand had to feel mythic and professional, powerful and restrained: welcoming to a parent signing up a seven-year-old, and credible to a black belt from another gym.",
};

export const audiences = [
  { name: "Adults starting out", need: "Is this for someone like me? What's a first session actually like?" },
  { name: "Parents", need: "Is it safe, who's teaching, and will my kid be treated well?" },
  { name: "Competitors", need: "Does this coach have the record and the eye to help me win?" },
  { name: "Academy owners and seminar hosts", need: "Can this person teach my students well, and represent my gym?" },
];

export const symbolMap = [
  { part: "Earl", meaning: "Self-awareness, reflection, intelligence, accountability.", carried: "The emerald keystone at the apex — the mind on top." },
  { part: "Kaiju", meaning: "Instinct, strength, and the power within.", carried: "The gold-lined face and the Spectral Emerald eyes." },
  { part: "The belt", meaning: "Discipline, responsibility, deliberate control.", carried: "The chin spike points to the base, where the belt is tied." },
  { part: "The crest", meaning: "Containment, purpose, unity between the human and the beast.", carried: "An upright triangle. Nothing crosses its outer keyline." },
];

export const applicationRequirements = [
  "A website header where the crest never drops below its 64px screen minimum",
  "A favicon that still reads at 16px",
  "An Android adaptive launcher icon with a themed monochrome layer",
  "One-ink screen printing, stamps and laser engraving",
  "Embroidery on a gi patch",
  "Light paper and dark fabric",
  "Social posts, cards and flyers someone else can edit",
];

export const evolution: { version: string; date: string; title: string; detail: string }[] = [
  { version: "Source", date: "Before Oct 18", title: "Concept board", detail: "An AI-assisted raster render made to my direction set the composition." },
  { version: "v1.0", date: "Oct 2026", title: "First vector package", detail: "Crest and practical lettering traced from the art and cleaned." },
  { version: "v1.1", date: "Oct 2026", title: "Refinement pass", detail: "Frame straightened, inks renamed, real-size tests run — and two different crests found." },
  { version: "v1.2", date: "Oct 18", title: "Identity final", detail: "One master crest everywhere, Emerald #0B7A62, ceremonial direction A." },
  { version: "v1.3", date: "Oct 2026", title: "Tagline", detail: "Gain Perspective Over Fear. approved; templates proposed for review." },
  { version: "v1.4", date: "Oct 19", title: "Patterns and kit", detail: "Three patterns, three borders and an 18-piece graphic kit approved." },
  { version: "v1.5", date: "Oct 19", title: "Horizontal logos", detail: "EARL THE redrawn on top of KAIJU, tracked out — never stretched." },
];

export const processFigures: Figure[] = [
  {
    media: "source-board",
    alt: "A raster logo-system board: the panther crest, a stacked and a horizontal lockup, 怪獣, monochrome and reversed crests, clear space, a five-color palette and small-size tests",
    caption: "Where it started: a raster concept board made to my direction with AI image tools. It set the composition — upright triangle, frontal panther, gold and emerald — but it isn't production art.",
    status: "SOURCE REFERENCE",
    source: "Brand package v1.5 · 00-source-reference/official-logo-system-board.png",
  },
  {
    media: "proof-frame-straightening",
    alt: "A chart of the crest's left-side band edges before and after straightening, with a table of measured values for v1.0 and v1.1",
    caption: "Measured, not eyeballed. The source art's frame bowed by up to 6 units; each edge was fitted and warped back to straight lines, without touching the panther.",
    status: "APPROVED",
    source: "Approval proof 2 · v1.1 production fixes",
  },
  {
    media: "proof-one-crest-decision",
    alt: "Three crests side by side: the master crest, the stacked lockup as supplied with a different crest drawing, and the recommended lockup rebuilt on the master crest",
    caption: "The biggest find of the refinement pass: my files contained two different panthers. I chose the standalone crest as the master and had the stacked lockup rebuilt on it.",
    status: "APPROVED",
    source: "Approval proof 2 · decision",
  },
  {
    media: "proof-real-size",
    alt: "The full crest, simplified crest and eyes mark rendered at 16, 24, 32, 48 and 64 pixels and magnified",
    caption: "Rendered at real pixel sizes and inspected without smoothing. The full crest holds from 64px; a simplified cut covers 48–63px; an eyes-only mark handles favicons.",
    status: "APPROVED",
    source: "Approval proof 2 · real-size test",
  },
  {
    media: "proof-color-options",
    alt: "Three emerald options shown on dark and light grounds with button and link samples and their contrast ratios",
    caption: "Three sets of colors existed — the brief, my board and what the art rendered — and only emerald disagreed. My board's emerald measured 2.4:1 on Shadow, under the 3:1 graphics need; the art's green couldn't carry ivory text. #0B7A62 does both, so one emerald serves the logo and the interface.",
    status: "APPROVED",
    source: "Approval proof 3 · emerald options",
  },
  {
    media: "proof-ceremonial-directions",
    alt: "Two ceremonial wordmark directions under the crest: A with three chevrons each side of EARL THE, B with double rules",
    caption: "The ceremonial lettering was drawn, not typed. I chose direction A: its three chevrons echo the three bars on the practical lockup.",
    status: "APPROVED",
    source: "Approval proof 1 · ceremonial wordmark",
  },
  {
    media: "proof-lettering-fixes",
    alt: "Before and after rows of the ceremonial lettering: the H in THE straightened and the KAIJU letter spacing tightened",
    caption: "My two corrections before sign-off: the H read as an M, so its chevron became a straight bar; KAIJU was respaced to one optical gap (I to J went from 92 to 69 units).",
    status: "APPROVED",
    source: "Approval proof 4 · v1.2 final",
  },
  {
    media: "proof-one-crest-everywhere",
    alt: "Six files that carry the crest — master, practical stacked and horizontal, ceremonial stacked and horizontal, and the app icon — each marked identical with its scale",
    caption: "One crest, everywhere: all 3,858 points of the master crest checked in every lockup and the app icon.",
    status: "APPROVED",
    source: "Approval proof 4 · one-crest check",
  },
  {
    media: "proof-patterns-from-references",
    alt: "Two reference patterns beside the Lattice and Den patterns redrawn from them on the master crest",
    caption: "Patterns redrawn from my references as clean vectors on the crest's own line weights. Every crest in a tile is the master crest.",
    status: "APPROVED",
    source: "Approval proof 6 · v1.4 patterns",
  },
  {
    media: "proof-horizontal-before-after",
    alt: "The practical horizontal lockup before, with EARL THE beside KAIJU, and after, with EARL THE tracked out on top of KAIJU",
    caption: "v1.5, at my request: EARL THE moved on top of KAIJU at the same relative size, letters spaced apart — never stretched — to match KAIJU's width.",
    status: "APPROVED",
    source: "Approval proof 7 · v1.5 horizontal logos",
  },
];

export const reasoning: { question: string; answer: string }[] = [
  {
    question: "Why the triangle?",
    answer:
      "A triangle holds things, and it's the cleanest container for a frontal face: the ears rise toward the upper sides and the chin points to the base. Nothing crosses its outer keyline. That containment is the idea itself: power held in a shape. The triangle repeats in the keystone, the A's counter in KAIJU and the underline.",
  },
  {
    question: "Why the panther?",
    answer:
      "Because it's me. A black panther doesn't announce itself; it watches, waits and moves with control. That's the version of myself I found on the mat. The guidelines are explicit: never a mascot, never humanoid, never in a gi, never my pet.",
  },
  {
    question: "Why a near-frontal face?",
    answer:
      "A frontal face looks back at you. It stays symmetrical inside the triangle, reads at small sizes, and puts the eyes — the only bright color in the face — at the center, where they're the first thing you see in the dark. The geometry borrows from the faceted, medal-like animal faces of Japanese tokusatsu design without copying any of them.",
  },
  {
    question: "Why the dual reading?",
    answer:
      "Read top-down, the brow blades are also the gi's lapels, the emerald side panels are the gi holding the dark, and the chin spike points to where the belt is tied. You see a panther first; the gi and the belt reveal themselves later. 'Panther first, deeper story later' is written into the guidelines as a rule.",
  },
  {
    question: "Why Shadow, Emerald and Gold?",
    answer:
      "Shadow is the dark the panther lives in — about 70% of any layout. Emerald is the gi panels and the brand's action color; Spectral Emerald is reserved for the eyes, focus rings and live states. Gold is line-work and rank, restrained, never a background. Ivory carries the words.",
  },
  {
    question: "Why two lettering systems?",
    answer:
      "Practical lettering does the daily work: navigation, documents, the app. Ceremonial lettering is drawn for promotions, seminars and apparel backs — every KAIJU stem starts with a 30° brush-entry cut, the A's counter is the crest's triangle, the R's bowl is a rank chevron. The rule is simple: never mix them in one layout.",
  },
  {
    question: "What did it cost?",
    answer:
      "Five hairline gaps in my art close up below about 300px; I kept them because they're part of the drawing. The full crest doesn't hold under 64px, so the system needed a simplified crest and an eyes mark. Print minimums are measured, not proofed. Embroidery sizes are estimates until a digitizer stitches a sample. And 怪獣 still needs a fluent reader's check before anything is printed or stitched.",
  },
  {
    question: "How is it original?",
    answer:
      "KAIJU isn't fake brush script, and EARL THE is geometric and Afro-futurist-influenced without borrowing any real or fictional script. The four Earl glyphs — Self, Adaptation, Resilience, Lineage — are original marks, not a cipher. I left the round and shield panther badges out of the graphic kit on purpose: a panther in a new frame is a second crest.",
  },
];

export const palette: { name: string; hex: string; role: string; contrast: string; ink: "light" | "dark" }[] = [
  { name: "Shadow", hex: "#0B0F0E", role: "Primary background, ~70% of a layout", contrast: "Ivory on Shadow 17.1:1", ink: "light" },
  { name: "Emerald", hex: "#0B7A62", role: "Crest panels, buttons", contrast: "Ivory label on it 4.7:1", ink: "light" },
  { name: "Deep Emerald", hex: "#0F5B4B", role: "Pressed states, links on light", contrast: "On Ivory 7.1:1", ink: "light" },
  { name: "Spectral Emerald", hex: "#17D190", role: "The eyes, focus rings, live states", contrast: "On Shadow 9.7:1", ink: "dark" },
  { name: "Gold", hex: "#D4AF37", role: "Line-work, rank, eyebrows", contrast: "On Shadow 9.2:1 · never on Ivory", ink: "dark" },
  { name: "Ivory", hex: "#F4F1E9", role: "Text and light grounds", contrast: "Shadow on Ivory 17.1:1", ink: "dark" },
];

export const sizeRules: { mark: string; screen: string; print: string; thread: string }[] = [
  { mark: "Full crest", screen: "64px and up", print: "16mm offset · 25mm screen print", thread: "~95mm" },
  { mark: "Simplified crest", screen: "48–63px", print: "—", thread: "—" },
  { mark: "Eyes mark", screen: "Under 48px", print: "Under 16mm", thread: "Small patches" },
  { mark: "Ceremonial wordmark", screen: "160px wide", print: "40mm wide", thread: "~65mm wide" },
];

export const guidelineFigures: Figure[] = [
  { media: "guide-crest-anatomy", alt: "Guidelines page: the crest with eleven numbered parts — keystone, crown, ears, brow blades, eyes, muzzle, chin spike, fur bands, lapels, corner marks and frame", caption: "Crest anatomy: eleven parts, each with a job.", status: "APPROVED", source: "Brand guidelines v1.5 · page 07" },
  { media: "guide-ceremonial-construction", alt: "Guidelines page: the ceremonial lettering with eleven numbered construction details and a construction table", caption: "Ceremonial lettering construction: stems 25% of cap height, 9-unit channels, every pair at one optical gap.", status: "APPROVED", source: "Brand guidelines v1.5 · page 10" },
  { media: "guide-clear-space", alt: "Guidelines page: clear space around the crest equal to the keystone's height, and a minimum size table", caption: "Clear space and minimum sizes — tested, measured and estimated are labeled differently on purpose.", status: "APPROVED", source: "Brand guidelines v1.5 · page 12" },
  { media: "guide-small-sizes", alt: "Guidelines page: the crest at 128 down to 16 pixels, the Android adaptive icon layers, a themed icon and a browser tab favicon", caption: "Small sizes and the Android app icon, built from the master crest.", status: "APPROVED", source: "Brand guidelines v1.5 · page 13" },
  { media: "guide-typography", alt: "Guidelines page: Barlow Condensed and Manrope specimens with a type scale", caption: "Two families: Barlow Condensed for display, Manrope for reading. Both under the SIL Open Font License.", status: "APPROVED", source: "Brand guidelines v1.5 · page 17" },
  { media: "guide-companions", alt: "Guidelines page: the kanji 怪獣 and the four original Earl glyphs labeled Self, Adaptation, Resilience and Lineage", caption: "Companion marks: 怪獣 and the four Earl glyphs, used apart from the wordmark.", status: "APPROVED", source: "Brand guidelines v1.5 · page 18" },
];

export const applicationFigures: Figure[] = [
  { media: "app-icon", alt: "The Kaiju Coach launcher icon: the master crest on a dark rounded square", caption: "Android launcher icon — the same crest, from the brand's adaptive layers.", status: "APPROVED", source: "Brand package · 05-app-icon-favicon" },
  { media: "pattern-lattice", alt: "Lattice pattern swatch: crests on a grid of gold and emerald bands with rosettes and eyes", caption: "Lattice — rash guards, spats, gi lining.", status: "APPROVED", source: "Brand package · 11-patterns" },
  { media: "pattern-den", alt: "Den pattern swatch: dense rows of crest-shaped triangles in gold and emerald", caption: "Den — sleeves, shorts panels, packaging.", status: "APPROVED", source: "Brand package · 11-patterns" },
  { media: "template-business-card", alt: "Business card front template with the practical lockup and bracketed placeholder text", caption: "Business card template — proposed, under design review.", status: "PROPOSED", source: "Brand package · 10-marketing-templates" },
  { media: "template-social-post", alt: "Portrait social post template with a photo placeholder, headline placeholder and the lockup", caption: "Social post template — proposed.", status: "PROPOSED", source: "Brand package · 10-marketing-templates" },
  { media: "template-tagline-card", alt: "Square tagline card reading Gain Perspective Over Fear. in gold on Shadow", caption: "Tagline card — wording approved, layout proposed.", status: "PROPOSED", source: "Brand package · 10-marketing-templates" },
];

// ---------------------------------------------------------------- Chapter 02
export const websiteProblem =
  "I needed an independent online presence that could introduce my credentials and teaching philosophy, present coaching services, and turn legitimate interest into a conversation — without pretending I already operate a full academy.";

export const websiteAudienceNeeds = [
  { audience: "Adults new to Jiu-Jitsu", need: "Plain-language programs and a low-pressure way to ask a question." },
  { audience: "Parents", need: "Who teaches, how kids are treated, and a form a guardian fills out — never the child." },
  { audience: "Competitors", need: "A verified record and what competitive training covers." },
  { audience: "Academies and hosts", need: "Guest instruction and seminars, with group size and level up front." },
];

export const siteMap: { page: string; job: string }[] = [
  { page: "Home", job: "Who I am, the five programs, one clear next step" },
  { page: "Meet Earl", job: "My path, in my words" },
  { page: "Training", job: "Five programs: Private & Family, Competitive, Kids & Youth, Class Coaching, Seminars" },
  { page: "Experience", job: "Journey, academies, verified competition record" },
  { page: "Philosophy", job: "What Gain Perspective Over Fear means on the mat" },
  { page: "Register Your Interest", job: "One form, conditional questions per program" },
];

export const websiteDecisions: { title: string; detail: string }[] = [
  {
    title: "Interest, not bookings",
    detail:
      "Every call to action says Register Your Interest, and the form says out loud that it doesn't book a session. No prices, schedules, testimonials or academy claims — and those rules run as tests on every page.",
  },
  {
    title: "Children's privacy is in the shape of the form",
    detail:
      "Parents register interest, never children. There is no field for a child's name or health information, and the server drops anything outside the schema.",
  },
  {
    title: "Errors you can act on",
    detail:
      "Submitting with gaps shows one summary that links to every field that needs a fix, in form order — all problems in one pass, not one at a time.",
  },
  {
    title: "A menu that works without JavaScript",
    detail:
      "The phone menu is a native dialog with managed focus. Scripts off, it still opens through HTML invoker commands.",
  },
  {
    title: "The brand, not a copy of it",
    detail:
      "Colors and spacing come from the brand's tokens file. Logos are the SVG artwork, copied in with checksums; the header never shows the lockup below the crest's 64px minimum.",
  },
  {
    title: "Real photos, handled carefully",
    detail:
      "Originals are never edited. The pipeline generates AVIF and WebP and strips metadata; photos marked unpublished aren't generated at all. Documentary photos are never AI-altered, and photos that show training partners or a child stay unpublished until permission is sorted.",
  },
];

export const websiteFigures: Figure[] = [
  { media: "site-home-desktop", alt: "Instructor website home page on desktop: Earl in a black gi, his name in large condensed type, the tagline and a Register Your Interest button", caption: "Home, desktop. The hero portrait is an approved promotional edit of an original photo of me.", status: "LOCAL BUILD CAPTURE", source: "Epetaway/EarltheKaiju main @ 77657a8 · 1440px" },
  { media: "site-home-mobile", alt: "Instructor website home page on a phone: full-height portrait with the name and tagline below", caption: "Home, phone.", status: "LOCAL BUILD CAPTURE", source: "main @ 77657a8 · 390px" },
  { media: "site-about-desktop", alt: "Meet Earl page on desktop: the heading Meet Earl beside a documentary photo of Earl smiling on the mats in a black gi", caption: "Meet Earl — redesigned to match my own mockups after I wasn't happy with the first pass.", status: "LOCAL BUILD CAPTURE", source: "main @ 77657a8 · PR #10" },
  { media: "site-menu-mobile", alt: "The phone menu open: Home, Meet Earl, Training, Experience and Philosophy in large type, with a Register Your Interest button", caption: "Phone menu: a native dialog that still opens with JavaScript off.", status: "LOCAL BUILD CAPTURE", source: "main @ 77657a8 · 390px" },
  { media: "site-form-errors-desktop", alt: "The interest form after an empty submission: an error summary listing four linked fixes above the program choices, and an After you send it panel", caption: "One error summary, every fix linked. The panel beside it says this is an inquiry, not a booking.", status: "LOCAL BUILD CAPTURE", source: "main @ 77657a8 · 1440px" },
  { media: "site-form-errors-mobile", alt: "The same error summary on a phone, with the program choices below", caption: "The same summary on a phone.", status: "LOCAL BUILD CAPTURE", source: "main @ 77657a8 · 390px" },
];

export const inquiryPipeline: { step: string; detail: string }[] = [
  { step: "Shape", detail: "POST only, form encodings only, 20 KB cap" },
  { step: "Origin", detail: "Only the site's own origins" },
  { step: "Quiet drop", detail: "Honeypot filled or form done in under 3 s → looks like success, isn't saved" },
  { step: "Schema", detail: "The same Zod schema the browser used" },
  { step: "Spam check", detail: "Cloudflare Turnstile, verified server-side" },
  { step: "Rate limit", detail: "3 an hour, 10 a day, by salted IP hash" },
  { step: "Save", detail: "Cloudflare D1 (SQLite)" },
  { step: "Notify", detail: "Email in the background; a daily job retries failures" },
];

// ---------------------------------------------------------------- Chapter 03
export const coachProblem =
  "Teaching a class means juggling a lesson plan in one place, a round timer in another app, attendance on paper or in my head, and technique notes somewhere else — standing on a mat, often with one free hand, with students waiting.";

export const teachingMoments: { moment: string; need: string; answer: string }[] = [
  { moment: "Before class", need: "See today's classes, adjust the plan, know who's coming", answer: "Today" },
  { moment: "Walking onto the mat", need: "One tap to start", answer: "Start class, high on Today" },
  { moment: "Mid-class, standing", need: "Current segment, time left, what's next — readable at arm's length", answer: "Class Mode" },
  { moment: "Live rounds", need: "A timer the room can read and hear", answer: "Timer" },
  { moment: "Students arriving", need: "One tap each, mistakes fixed instantly", answer: "Attendance with undo" },
  { moment: "After class", need: "Record what worked", answer: "Post-class notes" },
  { moment: "Weekly", need: "Plan the week, reuse lessons", answer: "Planner and lesson builder" },
];

export const coachDesignNotes: { title: string; detail: string }[] = [
  { title: "An editorial command center", detail: "TODAY set at 96sp over a gold eyebrow and keystone rule; numbered section headers; data separated by hairlines instead of rounded stat cards." },
  { title: "Color only means something", detail: "Emerald is action, Spectral is live, Gold is rank and rest — and every color is paired with a word or a shape." },
  { title: "Shapes from the crest", detail: "Chamfered corners cut from the crest's geometry, and an original 47-icon set with square caps that match its line-work." },
  { title: "The crest stays in its place", detail: "It appears on the launcher and in Settings — not stamped on every screen." },
];

export const coachQaFindings: string[] = [
  "Start class — the most important action on the most important screen — sat below the fold. It moved up under the class facts.",
  "Landscape Class Mode clipped its own countdown. Landscape got its own type scale.",
  "Gold on Deep Emerald measured under 4.5:1. That label became Ivory.",
  "At 200% text, the nav bar, class facts and attendance rows broke. Labels now wrap and paired buttons stack.",
  "The emulator's accessibility checks failed an unlabeled, undersized drag handle. Fixed.",
  "On my own phone's 3-button navigation, content sat under the system buttons. Fixed.",
];

export const coachFigures: Figure[] = [
  { media: "coach-today", alt: "Kaiju Coach Today screen: TODAY in large type, next class Guard Retention at 6:30 PM, 60 minutes, 8 expected, a Start class button and the lesson objective", caption: "Today — the next class and one tap to start it.", status: "CI RENDER", source: "earltheKaiju_app @ 6446efa · fictional data" },
  { media: "coach-class-mode", alt: "Class Mode: the current segment with a large countdown, what's next, and buttons for attendance, timer and notes", caption: "Class Mode — the segment, time left, what's next.", status: "CI RENDER", source: "6446efa · fictional data" },
  { media: "coach-timer-work", alt: "Round timer on an emerald field: TRAIN, round 2 of 5, 4:19 remaining, next rest 1:00, pause control and presets", caption: "Timer — readable across the mat.", status: "CI RENDER", source: "6446efa · fictional data" },
  { media: "coach-attendance", alt: "Attendance screen listing fictional students with check controls and belt ranks", caption: "Attendance — one tap each, with undo.", status: "CI RENDER", source: "6446efa · fictional names" },
  { media: "coach-planner", alt: "Planner showing a week strip and a day agenda of classes", caption: "Planner — the week and the day.", status: "CI RENDER", source: "6446efa · fictional data" },
  { media: "coach-lesson-builder", alt: "Lesson builder with ordered segments, durations and techniques", caption: "Lesson builder — reusable plans.", status: "CI RENDER", source: "6446efa · fictional data" },
  { media: "coach-students", alt: "Students roster with belt ranks and a kids marker", caption: "Students — minimal data on purpose.", status: "CI RENDER", source: "6446efa · fictional names" },
  { media: "coach-post-class", alt: "Post-class summary with attendance totals and a note field", caption: "After class — what worked.", status: "CI RENDER", source: "6446efa · fictional data" },
  { media: "coach-settings", alt: "Settings screen including backup export and a line saying desktop sync isn't set up yet", caption: "Settings — sync is honest about not existing yet.", status: "CI RENDER", source: "6446efa" },
  { media: "coach-library-media-concept", alt: "Library screen with the media section marked as a concept", caption: "Media library — labeled as a concept in the app itself.", status: "CONCEPT", source: "6446efa" },
  { media: "coach-today-font-200", alt: "Today screen at 200 percent text size with wrapped labels", caption: "Today at 200% text.", status: "CI RENDER", source: "6446efa" },
  { media: "coach-device-class-mode", alt: "Class Mode captured on an Android 15 emulator with the real status bar", caption: "Class Mode on a real Android system (emulator run).", status: "CI RENDER", source: "CI device run · Android 15 Pixel 7 emulator" },
];

export const coachLandscape: Figure = { media: "coach-class-mode-landscape", alt: "Class Mode in landscape: segment title and countdown on the left, up-next and controls on the right", caption: "Landscape Class Mode, after QA gave it its own scale.", status: "CI RENDER", source: "6446efa" };

export const coachStatus: { status: FlagshipStatus; items: string[] }[] = [
  { status: "IMPLEMENTED + TESTED", items: ["Today", "Planner (day and week)", "Class editor and detail", "Lesson builder with reusable plans", "Class Mode and post-class notes", "Round timer with presets and cues", "Students and programs", "Attendance with undo", "Technique library", "Settings with JSON backup export"] },
  { status: "KNOWN GAP", items: ["No timer cues while the phone is locked (Sprint 02: foreground service)", "Backup export exists; restore doesn't yet", "Not yet used in a real class"] },
  { status: "DESIGNED", items: ["Local Wi-Fi sync with a desktop companion (docs/06, no code)", "Media library (concept screen only)"] },
  { status: "PLANNED", items: ["Website inquiries pulled into the app", "Month and year curriculum views, recurring classes", "Light theme for bright rooms"] },
];

export const testingLadder: { rung: string; found: string }[] = [
  { rung: "Robolectric renders of every screen state, at 150% and 200% text and landscape", found: "Layout and text-size problems" },
  { rung: "An Android 15 emulator running the full class flow with Google's Accessibility Test Framework", found: "Insets, keyboard and accessibility problems" },
  { rung: "My own Samsung Galaxy Note10+, running CI's exact APKs over USB", found: "Navigation-mode problems the emulator couldn't show" },
];

// ---------------------------------------------------------------- Code
export const codeHighlights: CodeHighlight[] = [
  {
    id: "shared-schema",
    chapter: "website",
    title: "One form contract, two runtimes",
    repo: repositories.website.name,
    path: "src/lib/inquiry/schema.ts",
    commit: repositories.website.commit,
    language: "ts",
    code: `// No runtime code generation: zod's JIT probes \`new Function\`, which the
// site's Content-Security-Policy (and the Workers runtime) forbids.
z.config({ jitless: true });

const kidsYouth = z.object({
  program: z.literal('kids-youth'),
  ...base,
  ...withExperience,
  guardian: z.literal(true, {
    error: 'Only a parent or guardian can register interest for a child.',
  }),
  ageBand: pick(AGE_BANDS, 'Choose an age range.'),
});

export const inquirySchema = z.discriminatedUnion(
  'program',
  [privateFamily, competitive, kidsYouth, classCoaching, seminars, general],
  { error: 'Choose what you’re interested in.' },
);`,
    problem: "The browser form and the Worker API have to agree on what's valid, and the form must never collect a child's name or health information.",
    decision: "One Zod schema, imported by both. The privacy rules are the shape itself: a guardian checkbox and an age band, no child's name field anywhere. Unknown fields are dropped, so nothing outside the schema can be stored.",
    implementation: "A discriminated union on program gives each of the five programs its own conditional questions, with the error copy written for people, not developers.",
    tradeoff: "A discriminated union stops at its first error, which would have made people fix one problem at a time; the parser also checks the shared fields so everything is reported in one pass. jitless parsing is slower — irrelevant at form scale.",
    evidence: "14 schema unit tests at the end of the first session. Lighthouse caught a CSP violation from zod's new Function probe that the browser tests missed; jitless fixed it and the end-to-end tests now fail on any CSP violation.",
  },
  {
    id: "worker-pipeline",
    chapter: "website",
    title: "An inquiry pipeline that fails safely",
    repo: repositories.website.name,
    path: "worker/routes/inquiry.ts",
    commit: repositories.website.commit,
    language: "ts",
    code: `// Bots: a filled honeypot, or a form completed impossibly fast, gets a
// normal-looking success and is quietly dropped.
if (
  (typeof honeypot === 'string' && honeypot.trim() !== '') ||
  (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_MS)
) {
  deps.log('inquiry.dropped', { reason: honeypot ? 'honeypot' : 'too-fast' });
  return succeed(request);
}

// … schema → Turnstile → rate limit by salted IP hash → insert into D1 …

// Respond now; email in the background. A failed email leaves
// notified_at empty and the daily cron retries it.
ctx.waitUntil(
  deps.notify(data, { id, createdAt: now })
    .then(() => db.update(inquiries)
      .set({ notifiedAt: deps.now(), notifyAttempts: 1 })
      .where(eq(inquiries.id, id))),
);`,
    problem: "A public form attracts bots, and an email outage shouldn't lose a real person's inquiry or make them wait.",
    decision: "Cheap checks first, quiet drops for obvious bots, the inquiry saved before any email is attempted, and email sent after the response.",
    implementation: "A Cloudflare Worker with injected dependencies (clock, ids, Turnstile, notifier), so every branch can run in tests against a real local D1 database.",
    tradeoff: "A quiet drop is invisible to a real person who somehow finishes in under three seconds. Rate limiting by IP hash can catch a shared network. The visitor sees success even if the email fails — the saved row and the daily retry cover that.",
    evidence: "16 Worker tests on a real local D1: saving, origin, honeypot, fill time, Turnstile, rate limit, email failure and cron retry, retention purge, no-JavaScript paths, email escaping.",
  },
  {
    id: "csp-hashes",
    chapter: "website",
    title: "A Content-Security-Policy built from the pages themselves",
    repo: repositories.website.name,
    path: "scripts/postbuild-headers.mjs",
    commit: repositories.website.commit,
    language: "ts",
    code: `const INLINE_SCRIPT = /<script(?![^>]*\\bsrc=)[^>]*>([\\s\\S]*?)<\\/script>/g;

for (const file of pages) {
  const html = await readFile(file, 'utf8');
  for (const [, body] of html.matchAll(INLINE_SCRIPT)) {
    if (!body) continue;
    hashes.add(\`'sha256-\${createHash('sha256').update(body, 'utf8').digest('base64')}'\`);
  }
}

const csp = [
  "default-src 'self'",
  \`script-src 'self' \${[...hashes].sort().join(' ')} \${TURNSTILE}\`,
  "form-action 'self'",
  "frame-ancestors 'none'",
  // …
].join('; ');`,
    problem: "Next.js inlines a few small scripts in every page. Allowing all inline script would undo most of what a CSP is for.",
    decision: "After each build, hash every inline script and allow exactly those hashes. Anything injected later is blocked.",
    implementation: "A post-build step writes Cloudflare's _headers file with the CSP, hardening headers and cache rules, and refuses to build if the header passes Cloudflare's 2,000-character limit.",
    tradeoff: "style-src still allows inline styles because React style props become attributes. The policy is only as current as the last build — which is why it's generated, never hand-edited.",
    evidence: "The end-to-end suite asserts the header on every page and fails on any CSP violation or runtime error.",
  },
  {
    id: "timer-engine",
    chapter: "coach",
    title: "A round timer that can't drift",
    repo: repositories.coach.name,
    path: "android/app/src/main/kotlin/com/earlthekaiju/coach/domain/timer/TimerEngine.kt",
    commit: repositories.coach.commit,
    href: `${repositories.coach.url}/blob/${repositories.coach.commit}/android/app/src/main/kotlin/com/earlthekaiju/coach/domain/timer/TimerEngine.kt`,
    language: "kotlin",
    code: `fun resume(run: TimerRun, nowElapsed: Long): TimerRun {
    val pausedAt = run.pausedAtElapsed ?: return run
    val pausedFor = (nowElapsed - pausedAt).coerceAtLeast(0L)
    return run.copy(pausedAccumMillis = run.pausedAccumMillis + pausedFor, pausedAtElapsed = null)
}

/** Milliseconds of actual training time elapsed (pauses excluded). */
fun activeMillis(run: TimerRun, nowElapsed: Long): Long {
    val reference = run.pausedAtElapsed ?: nowElapsed
    return (reference - run.startedAtElapsed - run.pausedAccumMillis).coerceAtLeast(0L)
}

/** Whole seconds shown on screen: 4.3s left shows 5, 4.0s shows 4, so 0 means "done". */
val remainingSeconds: Long get() = (remainingMillis + 999) / 1000`,
    problem: "A round timer that subtracts one every second drifts, and dies if Android pauses or kills the app mid-round — in the middle of live sparring.",
    decision: "Store only anchors (when the run started, how long it's been paused) and derive everything from Android's monotonic clock. Persist the anchors; drop cues that would ring late.",
    implementation: "Pure functions with no Android dependencies, so the whole engine runs in plain JVM tests.",
    tradeoff: "A reboot mid-round loses the run (detected and handled). No cues while the phone is locked yet — that needs a foreground service in Sprint 02.",
    evidence: "12 JVM tests, including 'remaining time is derived from the clock, not counted down' and 'a late transition after the app was frozen does not ring'. Restore after process death is tested too.",
  },
  {
    id: "lesson-snapshot",
    chapter: "coach",
    title: "History that doesn't rewrite itself",
    repo: repositories.coach.name,
    path: "android/app/src/main/kotlin/com/earlthekaiju/coach/data/repo/Repositories.kt",
    commit: repositories.coach.commit,
    href: `${repositories.coach.url}/blob/${repositories.coach.commit}/android/app/src/main/kotlin/com/earlthekaiju/coach/data/repo/Repositories.kt`,
    language: "kotlin",
    code: `planSegments.mapIndexed { index, s ->
    SessionSegmentEntity(
        id = newId(), sessionId = id, position = index,
        title = s.title, minutes = s.minutes, kind = s.kind, notes = s.notes,
        techniqueNames = techniques.filter { it.segmentId == s.id }
            .joinToString("\\n") { it.name },
        startedAt = if (index == 0) now else null,
        createdAt = now, updatedAt = now,
    )
}`,
    problem: "Lesson plans are templates I keep editing. If a past class pointed at the template, editing it would change what I 'taught' last month.",
    decision: "When a class starts, copy the plan's segments — and technique names as plain text — into the session.",
    implementation: "A snapshot written in the same call that marks the class in progress. Segment changes in Class Mode are a single Room transaction, after the end-to-end test caught two fast taps interleaving writes.",
    tradeoff: "Some text is duplicated. That's the point: a class record is what happened, not a reference to what might change.",
    evidence: "Repository test 'starting a class snapshots the plan so later template edits do not rewrite history', plus 'stepping back in class mode reopens that segment and resets later ones', against a real Room database.",
  },
  {
    id: "offline-by-construction",
    chapter: "coach",
    title: "Offline and private by construction",
    repo: repositories.coach.name,
    path: "android/app/src/main/AndroidManifest.xml",
    commit: repositories.coach.commit,
    href: `${repositories.coach.url}/blob/${repositories.coach.commit}/android/app/src/main/AndroidManifest.xml`,
    language: "xml",
    code: `<!-- Haptic feedback for timer round transitions. -->
<uses-permission android:name="android.permission.VIBRATE" />

<application
    android:name=".KaijuCoachApp"
    android:allowBackup="false"
    android:dataExtractionRules="@xml/data_extraction_rules"
    android:fullBackupContent="false"
    ... >`,
    problem: "Gyms have bad signal, and my roster includes kids' names. The app must never wait on a network, and student data shouldn't leave the phone by accident.",
    decision: "Room on the phone is the only source of truth. No INTERNET permission at all. Android cloud backup off; backups are JSON files I export on purpose.",
    implementation: "The schema is sync-ready from v1 — UUIDs, timestamps and soft deletes — so the planned desktop sync won't need a rewrite. Students store a name, rank, an under-18 flag and one teaching note: no birth dates, contacts, photos or medical data.",
    tradeoff: "Without a network permission there's no website integration yet, and parent contact details live outside the app for now.",
    evidence: "Repository test 'every record gets a stable uuid and sync timestamps'. CI on main @ 6446efa: 67 tests, 0 failed, lint clean.",
  },
];

// ---------------------------------------------------------------- Results
export const websiteTests = {
  date: "October 19, 2026",
  source: "docs/case-study-log.md, end of session 3",
  rows: [
    { suite: "Unit and Worker runtime (real local D1)", result: "31 passing" },
    { suite: "End-to-end, Playwright + axe, desktop and phone", result: "46 passing" },
    { suite: "axe WCAG 2.2 A/AA scans, every page", result: "0 violations" },
  ],
};

export const lighthouse = {
  label: "Local lab run · phone emulation with throttling · pre-launch build · October 19, 2026",
  rows: [
    { page: "Home", performance: 98, accessibility: 100, bestPractices: 100, seo: 100 },
    { page: "Meet Earl", performance: 98, accessibility: 100, bestPractices: 100, seo: 100 },
    { page: "Training", performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
    { page: "Experience", performance: 99, accessibility: 100, bestPractices: 100, seo: 100 },
    { page: "Philosophy", performance: 99, accessibility: 100, bestPractices: 100, seo: 100 },
    { page: "Register Your Interest", performance: 97, accessibility: 100, bestPractices: 96, seo: 100 },
    { page: "Privacy", performance: 98, accessibility: 100, bestPractices: 100, seo: 100 },
  ],
  note: "Best practices 96 on the form page: the test environment blocks Cloudflare's spam-check script and logs it as an error. Layout shift was 0 on every page. These aren't production numbers.",
};

export const coachTests = {
  date: "October 24, 2026",
  source: "CI run 40146198369 on main @ 6446efa",
  rows: [
    { suite: "Unit and Robolectric, incl. 45 screen renders", result: "67 tests, 0 failed" },
    { suite: "Android lint", result: "No issues" },
    { suite: "Full class flow on an Android 15 emulator, with accessibility checks", result: "Passed" },
    { suite: "Same flow on my Samsung Galaxy Note10+ (Android 12)", result: "Passed in 42 s" },
  ],
};

export const caughtByTests: string[] = [
  "Lighthouse found a CSP violation the browser tests missed (zod's new Function probe).",
  "axe flagged aria-required on a plain fieldset; radio groups became role=\"radiogroup\".",
  "A flaky accessibility scan ran mid-scroll after the taller v1.5 logo; scans now wait for the page to settle.",
  "The phone menu didn't open with JavaScript off; HTML invoker commands fixed it.",
  "Kaiju Coach's end-to-end test exposed segment changes that two fast taps could interleave; they're one transaction now.",
];

export const limitations: string[] = [
  "The coaching site isn't deployed and has no domain yet, so there are no real inquiries, Lighthouse production numbers or conversion data.",
  "The inner-page redesign is still in an open pull request; the Training, Experience and contact pages shown in the repo are the earlier style.",
  "Site copy is waiting on my voice pass, and some facts are held back until I confirm them.",
  "Kaiju Coach hasn't been used to teach a real class. Cue volume, glare, sweaty hands and TalkBack by ear are untested.",
  "The timer gives no cues while the phone is locked; backup restore isn't built.",
  "Desktop sync, the media library and website-to-app inquiries are designed or planned — none of them exist yet.",
  "Passing automated accessibility scans isn't a certification. Physical screen-reader testing is still to do.",
  "Brand: the tagline settings and templates are still under review; 怪獣 needs a fluent reader's check; embroidery and print sizes need a stitched sample and a printer's proof; a trademark search comes before commercial launch.",
];

export const reflections: { title: string; body: string }[] = [
  { title: "Designing for myself", body: "Being the user removes the guesswork and adds a blind spot: I know the workflow too well. The QA passes caught what I'd stopped seeing — like the Start class button sitting below the fold." },
  { title: "Symbol into system", body: "Meaning only survives if it's measurable. The story lives in the details people discover later; the mark has to work at 16px first." },
  { title: "Design decisions as components", body: "The crest's chamfers became the app's button shapes. Its keystone became the rule under every heading. The website imports the brand's tokens file as is; the app maps the same token values to semantic Compose roles." },
  { title: "Expressive and accessible", body: "The emerald I liked on day one failed contrast. The one I approved works as a logo color and a button label. Expression lost nothing." },
  { title: "Strategy into implementation", body: "'Interest, not bookings' started as a business decision. It became a schema, a set of content tests and the sentence beside every button." },
  { title: "A real product as a case study", body: "I can't show you conversions yet. I can show every decision, the evidence behind it, and exactly what isn't proven. That's the work I want to be hired for." },
];

export const roadmap: { track: string; items: string[] }[] = [
  { track: "Coaching website", items: ["My voice pass and confirmed facts", "Finish the inner-page redesign", "Choose a domain and deploy on Cloudflare's free plan", "Send a real test inquiry; publish real Lighthouse numbers"] },
  { track: "Kaiju Coach", items: ["Teach a real class with it and log what helped and what got in the way", "Sprint 02: locked-screen timer, backup restore, schema v2 for sync", "Sprint 03: desktop companion and pairing", "Later: website inquiries into the app"] },
  { track: "Brand", items: ["Tagline and template design review", "A fluent reader's check of 怪獣", "A stitched sample and a printer's proof", "Trademark search before commercial launch"] },
];
