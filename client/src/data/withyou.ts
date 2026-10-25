// WithYou — case study content for /work/withyou.
//
// Every claim here traces to a source listed in docs/WITHYOU-CASE-STUDY.md (evidence
// matrix) and every image to docs/WITHYOU-ASSETS.md (provenance). Dates come from the app
// repository's history (TerrianAi/withyou @ 612da33) and its BETA_CHECKLIST. The repository
// is private, so code excerpts stay short and unlinked. validate-content.ts and
// client/src/test/withyou.test.tsx check the rules that matter most.

import mediaRecord from "./withyou.media.json";
import { getInvestigation, type EvidenceStatus } from "./investigations";

export type WyStatus =
  | EvidenceStatus
  | "SIMULATOR CAPTURE"
  | "EMULATOR CAPTURE"
  | "PROTOTYPE REFERENCE"
  | "DESIGN SOURCE"
  | "DOCUMENTED DECISION"
  | "RETROSPECTIVE ILLUSTRATION"
  | "SUPERSEDED"
  | "PLACEHOLDER"
  | "AI-GENERATED PLACEHOLDER"
  | "COMPUTED FOR THIS PAGE";

export type WyMediaId = keyof typeof mediaRecord.media;
export type WyBrandId = keyof typeof mediaRecord.brand;
export type WyIconId = keyof typeof mediaRecord.icons;
export type WyIllustrationId = keyof typeof mediaRecord.illustrations;

export const wyMedia = mediaRecord.media;
export const wyBrand = mediaRecord.brand;
export const wyIcons = mediaRecord.icons;
export const wyIllustrations = mediaRecord.illustrations;

export type WyFigure = {
  media: WyMediaId;
  alt: string;
  caption: string;
  status: WyStatus;
  source: string;
};

export type WyCode = {
  id: string;
  title: string;
  path: string;
  commit: string;
  language: "ts";
  code: string;
  problem: string;
  decision: string;
  implementation: string;
  tradeoff: string;
  evidence: string;
};

const base = getInvestigation("withyou");
if (!base) throw new Error("The WithYou investigation record is missing.");
export const withYouRecord = base;

export const repository = { name: "TerrianAi/withyou", visibility: "private", commit: "612da33" } as const;

export const withYou = {
  slug: "withyou",
  path: "/work/withyou",
  number: base.number,
  name: base.name,
  heroLine: "Two private rooms with a shared door.",
  heroLead:
    "A relationship app for two people, designed and built end to end: the brand, the design system, the iOS and Android interface, and the privacy model underneath. Making it feel warm was the easy part. Making sure warmth never meant access was the work.",
  role: "Product vision, brand, UX design and full-stack development. AI coding assistants helped me fill gaps and move faster; the direction and the decisions were mine.",
  disciplines: "Brand and design system · UX and interaction design · React Native · API and data",
  when: "January 2026 — ongoing",
  stack: base.stack,
} as const;

export const statusLedger: { label: string; value: string; status: WyStatus }[] = [
  { label: "Design system", value: "v4.2.1 tokens in code since Jun 18, 2026", status: "IMPLEMENTED + INTEGRATED" },
  { label: "iOS and Android app", value: "Beta-oriented build; not publicly released", status: "DEVELOPMENT-STAGE IMPLEMENTATION" },
  { label: "Privacy model", value: "Legacy profile gap closed Oct 12, 2026; per-space visibility still open", status: "PARTIAL" },
];

export const overview = {
  problem:
    "Relationship apps tend to treat pairing as permission: once two accounts are linked, everything one person writes can flow to the other. Closeness and privacy aren't opposites, but most shared software is built as if they were.",
  role:
    "I set the vision and owned the product end to end: the brand, the design system, the flows, the UX and privacy calls, and the build. AI coding assistants worked from my specs and design handoffs to fill gaps and speed the work up. I reviewed everything that came back, threw out what didn't hold up, and tested the builds myself in simulators, emulators and on Android phones.",
  exists:
    "A React Native app for iOS and Android on an Express, PostgreSQL and Prisma API: invite-and-accept pairing, private-by-default check-ins and profile fields with field-level sharing, and a design system that lives in code as tokens.",
  boundary:
    "Everything on this page is built and tested in development. Nothing here is released: there are no real users and no measured relationship outcome. The captures are dated, and some show screens the product has since retired. The couple photos in the app and its marketing are AI-generated stand-ins.",
};

export const chapters = [
  { number: "01", id: "brand", title: "Building the brand", line: "A voice, a mark, a palette and a photo system that stay warm without getting loud.", status: "IMPLEMENTED + INTEGRATED" as WyStatus },
  { number: "02", id: "product", title: "Designing the product", line: "From a workflow map to two platforms and two themes — with the privacy rules drawn into the screens.", status: "DEVELOPMENT-STAGE IMPLEMENTATION" as WyStatus },
  { number: "03", id: "engineering", title: "Engineering the privacy model", line: "Privacy as a property of the whole system, not a settings page.", status: "PARTIAL" as WyStatus },
];

// ---------------------------------------------------------------- Chapter 01 · Brand

export const brandIdea = {
  statement: "Stay close, even when life gets busy.",
  explanation:
    "That line is on the welcome screen, and it's the brief. WithYou isn't for fixing a relationship or spicing one up. It's for the ordinary weeks: small check-ins, a short note, a way to say what you need without a speech.",
  tension:
    "The brand had to feel like a thoughtful friend, not a wellness company or a dating app: warm without being sugary, private without feeling secretive, and calm enough to open on a bad day.",
};

export const voicePrinciples: { rule: string; yes: string; no: string }[] = [
  { rule: "Indirect over direct", yes: "Say what you need without the pressure.", no: "Tell your partner exactly how you feel." },
  { rule: "Stay close, not fix", yes: "Stay close, even when life gets busy.", no: "Improve your relationship." },
  { rule: "Small, not big", yes: "Small check-ins. Better understanding.", no: "Transform your bond." },
];

export const neverSound = ["Find your soulmate.", "Fix your relationship instantly.", "Unlock deeper intimacy.", "Boost your love score by 47%."];

export const markGeometry: { label: string; value: string }[] = [
  { label: "Construction", value: "Two ellipses, rx 16 × ry 22, on a 60 × 56 grid" },
  { label: "Angle", value: "Left loop −10°, right loop +10° — a W in silhouette" },
  { label: "Interlock", value: "A clip at x = 30 lets each loop pass in front once" },
  { label: "Stroke", value: "8.8% of the mark's width, never under 3px" },
  { label: "Color", value: "Coral loop and blush loop; tokens switch both in dark mode" },
];

export const markEvolution: {
  date: string;
  title: string;
  detail: string;
  files: { id: WyBrandId; alt: string }[];
  status: WyStatus;
}[] = [
  {
    date: "Apr 30, 2026",
    title: "First logo files",
    detail: "Coral and blush loops; navy wordmark with You in coral.",
    files: [
      { id: "logo-mark", alt: "April 30 mark: a coral loop and a blush loop" },
      { id: "logo-horizontal", alt: "April 30 horizontal logo: the mark beside With in navy and You in coral" },
    ],
    status: "SUPERSEDED",
  },
  {
    date: "May 12, 2026",
    title: "v2 handoff",
    detail: "The second loop turned plum. Plum also became the primary button color, and coral moved to accents.",
    files: [
      { id: "logo-mark-light", alt: "May 12 mark: a plum loop and a coral loop" },
      { id: "logo-horizontal-light", alt: "May 12 horizontal logo with a plum wordmark and You in coral" },
    ],
    status: "SUPERSEDED",
  },
  {
    date: "May 14, 2026",
    title: "Refresh",
    detail: "Coral and navy. The same day, the app stopped importing logo files at all — see chapter 03.",
    files: [
      { id: "mark-refresh-light", alt: "May 14 mark: a coral loop and a navy loop" },
      { id: "wordmark-refresh-light", alt: "May 14 horizontal logo with a navy wordmark and You in coral" },
    ],
    status: "SUPERSEDED",
  },
  {
    date: "May 14, 2026 — today",
    title: "Drawn in code",
    detail: "Logo.tsx draws the mark with react-native-svg from theme tokens: coral and blush again, lifted for dark mode.",
    files: [],
    status: "IMPLEMENTED + INTEGRATED",
  },
];

export const iconFiles: { id: WyBrandId; date: string; caption: string; alt: string; status: WyStatus }[] = [
  { id: "app-icon-source-1024", date: "May 12, 2026", caption: "v2 source: cream and coral loops on a plum gradient", alt: "May 12 app icon source: cream and coral loops on a plum gradient square", status: "SUPERSEDED" },
  { id: "app-icon-refresh-1024", date: "May 14, 2026", caption: "Refresh: coral and navy loops on a cream square", alt: "May 14 app icon refresh: coral and navy loops on a cream square", status: "SUPERSEDED" },
  { id: "notification-icon", date: "May 12, 2026", caption: "Android notification icon: one color, so the system can tint it", alt: "The single-color notification icon: the two loops in one ink", status: "DESIGN SOURCE" },
];

export const palette: {
  name: string;
  token: string;
  hex: string;
  dark?: string;
  role: string;
  contrast: string;
  ink: "light" | "dark";
}[] = [
  { name: "Coral", token: "coral", hex: "#FF6B6B", dark: "#FF8587", role: "Primary action, focus, active tab", contrast: "2.5:1 on Cream — fine for the logotype, too low for small text", ink: "dark" },
  { name: "Blush", token: "blush", hex: "#FFB4A4", dark: "#FFCBC4", role: "The mark's second loop, warm washes", contrast: "10.6:1 on Plum", ink: "dark" },
  { name: "Lavender", token: "lavender", hex: "#A78BFA", dark: "#C4A8FF", role: "Shared-after-both, secondary accent", contrast: "8.9:1 (dark value) on Plum", ink: "dark" },
  { name: "Sage", token: "sage", hex: "#6BB48F", role: "Success and supportive states", contrast: "2.3:1 on Cream — fills and icons, not text", ink: "dark" },
  { name: "Cream", token: "cream", hex: "#FBF4EC", role: "Light page — never pure white", contrast: "Navy ink on Cream 13.4:1", ink: "dark" },
  { name: "Navy ink", token: "navy", hex: "#1D2841", role: "Text and headlines on light", contrast: "13.4:1 on Cream", ink: "light" },
  { name: "Plum", token: "plum", hex: "#1A1422", role: "Dark page — never pure black", contrast: "Warm white on Plum 15.7:1", ink: "light" },
  { name: "Plum surface", token: "plumSurface", hex: "#251D30", role: "Dark cards and navigation", contrast: "Muted text #9C90A8 on it 5.4:1", ink: "light" },
];

export const gradients: { name: string; stops: string[]; use: string }[] = [
  { name: "Sunset", stops: ["#FF6B6B", "#FFB4A4"], use: "Coral moments" },
  { name: "Dusk", stops: ["#A78BFA", "#FFB4A4"], use: "Calm, shared states" },
  { name: "Pair", stops: ["#FFB4A4", "#A78BFA"], use: "Paired avatars" },
  { name: "Plum night", stops: ["#1D2841", "#FF6B6B"], use: "Hero accents, stepper" },
];

export const typeScale: { name: string; spec: string; sample: string; className: string }[] = [
  { name: "Display", spec: "Inter 700 · 42/43 · −1.6", sample: "Stay close, even when life gets busy.", className: "display" },
  { name: "Large title", spec: "Inter 700 · 30/33 · −1", sample: "What do you need from Jordan today?", className: "large" },
  { name: "Section title", spec: "Inter 700 · 22/25 · −0.5", sample: "How the two of you are arriving", className: "section" },
  { name: "Body", spec: "Inter 500 · 14/22 · −0.1", sample: "Pick what feels true. There's no wrong answer.", className: "body" },
  { name: "Button", spec: "Inter 600 · 15/20", sample: "Start check-in", className: "button" },
  { name: "Overline", spec: "JetBrains Mono 600 · 10/13 · +1.4 · caps", sample: "Today · gentle nudge", className: "overline" },
];

export const iconRules = [
  "24 × 24 grid, 1.8 stroke, round caps and joins",
  "Color comes from currentColor, set where the icon is used",
  "Active state is the one weight change: 1.8 → 2.2",
  "No emoji as product icons, no icon font, no third-party set",
];

export const illustrationCaptions: Partial<Record<WyIllustrationId, string>> = {
  "illustration-empty-connect": "Not yet paired",
  "illustration-invite-expired": "Invite expired",
  "illustration-partner-removed": "Partner ended the pairing",
  "illustration-offline": "Offline",
  "illustration-session-expired": "Session expired",
  "illustration-notification-denied": "Notifications off",
  "illustration-permission-denied": "Permission denied",
  "illustration-crisis-support": "Safety and support",
};

// ---------------------------------------------------------------- 01.5 Photography and campaign

export type WyPhotoId = Extract<WyMediaId, `photo-${string}`>;

/** All 36 library photos, in library order (a-01 … a-20, b-01 … b-16). */
export const photoLibrary = (Object.keys(wyMedia) as WyMediaId[]).filter((id): id is WyPhotoId => id.startsWith("photo-"));

export const photography = {
  statement: "Photography is the brand's iconography.",
  lead:
    "The design system says it plainly: use a real couple photo wherever a stock illustration or a gradient would otherwise go. So the photography got the same treatment as the mark — a direction, a library pulled by id, a fixed treatment so type always reads, and named slots the code depends on.",
  placeholder:
    "The 36 photos are AI-generated stand-ins, made so the app and its marketing could show the art direction before there's a real shoot. The brand's own rules say no AI faces in the finished product, so the system was built around ids and slots: commissioned, rights-cleared photography replaces them file for file.",
  source: "Design system export · ui_kits/brand, artboard 03 · May 10, 2026",
};

/** The six photos the brand kit's image-direction board is built from, with its own direction notes. */
export const imageDirection: { photo: WyPhotoId; scene: string; direction: string; alt: string }[] = [
  { photo: "photo-a-06", scene: "Kitchen · prepping food", direction: "Warm · window light · 35mm", alt: "A couple laughing while they chop vegetables together in a home kitchen" },
  { photo: "photo-b-12", scene: "Camper morning · road trip", direction: "Natural · candid · wide", alt: "A couple in winter jackets sharing coffee in the open back of a camper van" },
  { photo: "photo-b-01", scene: "Beach embrace · golden hour", direction: "Backlit · 50mm · intimate", alt: "A couple embracing on a beach at sunset, foreheads close" },
  { photo: "photo-a-07", scene: "Cafe · slow morning", direction: "Window light · domestic", alt: "A couple in sun hats smiling at each other at a table above a hillside harbor town" },
  { photo: "photo-a-15", scene: "Couch · mug in hand", direction: "Soft · warm · interior", alt: "A couple on a couch, his arm around her, both holding mugs and laughing" },
  { photo: "photo-b-16", scene: "Sunset chairs · quiet", direction: "Wide · warm · long view", alt: "A couple seen from behind in camp chairs on a beach, watching the sun set" },
];

export const imageryDo = ["Candid", "Domestic settings", "Diverse couples", "Soft natural light", "One scene", "16:9 hero · 9:16 mobile · 4:5 social"];
export const imageryDont = ["Stock corporate couples", "Collages", "Sexualized imagery", "Over-posed", "Repeating AI faces", "Dating-app pink"];

/** The photo treatment, as specified in the design system and CoupleImage in components.jsx. */
export const photoTreatment: { step: string; title: string; spec: string; note: string }[] = [
  {
    step: "01",
    title: "One scene",
    spec: "object-fit: cover · object-position: center 30%",
    note: "Cropped from 30% down, which keeps faces high and leaves the lower frame free.",
  },
  {
    step: "02",
    title: "Protection gradient",
    spec: "transparent 40% → rgba(29, 40, 65, 0.55)",
    note: "Navy, not black, so a photo darkens toward dusk instead of going grey.",
  },
  {
    step: "03",
    title: "Glass card",
    spec: "rgba(255, 255, 255, 0.18) · blur 20px · 1px white at 25%",
    note: "Blur is allowed in three places: glass over photos, the tab bar and these gradients. Never as decoration.",
  },
];

/** Hero slots and their safe-text zones, from docs/design/source-asset-manifest.md §6. */
export const heroSlots: { file: string; photo: WyPhotoId; screen: string; zone: string; area: "bottom-40" | "bottom-35" | "center-30" | "top-25" }[] = [
  { file: "hero-welcome-couple-01.jpg", photo: "photo-b-01", screen: "Welcome", zone: "Bottom 40% · dusk gradient", area: "bottom-40" },
  { file: "hero-dashboard-couple-01.jpg", photo: "photo-a-06", screen: "Today · light", zone: "Bottom 35%", area: "bottom-35" },
  { file: "hero-dashboard-couple-02-dark.jpg", photo: "photo-b-16", screen: "Today · dark", zone: "Bottom 35%", area: "bottom-35" },
  { file: "hero-paired-success-couple-01.jpg", photo: "photo-a-07", screen: "Paired", zone: "Center 30% · glass card", area: "center-30" },
  { file: "hero-relationship-profile-01.jpg", photo: "photo-a-15", screen: "Shared profile", zone: "Top 25% · couple names", area: "top-25" },
];

export const slotFinding = {
  title: "Fifteen named slots, six photographs",
  detail:
    "Hashed for this page: the five hero files and the ten date-idea files are byte-for-byte copies of the six image-direction photos. date-museum-visit.jpg is b-12, the camper morning; date-ceramics-class.jpg is a-06, the kitchen. The slot names are the contract the code depends on — the pictures are stand-ins until photography is commissioned, and swapping them is a file replacement, not a redesign.",
  status: "COMPUTED FOR THIS PAGE" as WyStatus,
};

export const photoInProduct: WyFigure[] = [
  {
    media: "android-welcome-light",
    alt: "WithYou welcome screen on Android: a full-bleed couple photo with a glass card holding the headline Stay close, even when life gets busy",
    caption: "Welcome: one candid scene, a glass card over the protection gradient, the headline set where it reads.",
    status: "EMULATOR CAPTURE",
    source: "Android emulator, API 35 · May 16, 2026",
  },
  {
    media: "ios-tour-home",
    alt: "WithYou's Today screen on iOS: a couple on a couch behind the names Alex and Jordan, a glass card reading Nothing scheduled, Plan something together, and the check-in card below",
    caption: "Today: the glass card over the photo, then the check-in on cream. Test accounts.",
    status: "SIMULATOR CAPTURE",
    source: "iOS Simulator, iPhone 17 Pro · Maestro tab tour · May 30, 2026",
  },
  {
    media: "ios-tour-us",
    alt: "The Us screen on iOS: You and your partner set large over a couple photo, above counts of check-ins, rounds and moments",
    caption: "Us: display type straight onto the gradient. The softness is a 600-pixel library file on a 3× screen.",
    status: "SIMULATOR CAPTURE",
    source: "iOS Simulator, iPhone 17 Pro · Maestro tab tour · May 30, 2026",
  },
];

export const campaignFigures: { landing: WyFigure; appStore: WyFigure; social: WyFigure } = {
  landing: {
    media: "mk-landing-hero",
    alt: "The WithYou landing page hero: the headline Say what you need. Stay close, always. beside a photo of a couple cooking, with a phone showing the Today screen over it",
    caption: "The landing hero. The voice carries it; the photo and the phone show it.",
    status: "DESIGN SOURCE",
    source: "Design system export · ui_kits/marketing · May 10, 2026",
  },
  appStore: {
    media: "mk-appstore-set",
    alt: "Three App Store screenshot panels on blush, lavender and sage gradients, each a phone screen under a white headline",
    caption: "The App Store set: one brand color per promise — blush for check-ins, lavender for staying close, sage for plans.",
    status: "DESIGN SOURCE",
    source: "Design system export · ui_kits/marketing · May 10, 2026",
  },
  social: {
    media: "mk-social-posts",
    alt: "Three social posts — square, vertical and landscape — each a couple photo under a navy gradient with the WithYou lockup, the line Stay close, even when life gets busy, and a coral Beta badge",
    caption: "Social posts at three sizes: the lockup top left, the line bottom left, the same gradient as the app. The kit defines these but never renders them, so they were rendered for this page from its own component.",
    status: "DESIGN SOURCE",
    source: "marketing.jsx SocialPost, rendered for this page · Oct 25, 2026",
  },
};

export const designSystemFigures: WyFigure[] = [
  {
    media: "brandkit-identity",
    alt: "The WithYou system board: the wordmark on cream and navy, the standalone mark, app icon sizes, the color system, Inter type scale and voice examples",
    caption: "The system board from the design-system export: lockups, app icon sizes, color, type and voice on one artboard.",
    status: "DESIGN SOURCE",
    source: "Design system export · ui_kits/brand · May 10, 2026",
  },
  {
    media: "brandkit-components",
    alt: "Component library artboard: primary, secondary and ghost buttons, chips and tags, inputs with error state, alerts, avatars and pairs, and spacing, radius and elevation scales",
    caption: "The component library every screen draws from: buttons, chips, inputs, alerts, avatars, and the spacing, radius and elevation scales.",
    status: "DESIGN SOURCE",
    source: "Design system export · ui_kits/brand · May 10, 2026",
  },
  {
    media: "ds-platform-ios",
    alt: "iOS platform card: large-title navigation, compact title with blur, grouped settings lists and a medium-detent sheet painted in WithYou colors",
    caption: "One brand, two platforms — iOS: large titles, blurred chrome, grouped lists and sheets, in WithYou warmth.",
    status: "DESIGN SOURCE",
    source: "Design system export · preview/platform-ios · May 10, 2026",
  },
  {
    media: "ds-platform-android",
    alt: "Android platform card: Material 3 top app bar, bottom navigation with pill indicator, destructive dialog and snackbars painted in WithYou colors",
    caption: "Android: Material 3 structure — top app bar, pill indicator, dialogs, snackbars — never default Material purple.",
    status: "DESIGN SOURCE",
    source: "Design system export · preview/platform-android · May 10, 2026",
  },
  {
    media: "ds-colors-dark-mode",
    alt: "Dark mode card titled Never pure black: plum-black surface swatches, text colors and two components rendered on dark",
    caption: "Never pure black: dark mode is plum, borders are solid hairlines rather than alpha, and coral lifts for contrast.",
    status: "DESIGN SOURCE",
    source: "Design system export · preview/colors-dark-mode · May 10, 2026",
  },
  {
    media: "ds-components-widgets",
    alt: "Widgets card titled The pieces that fill home: gentle nudge glass card, quick actions, partner echo, date carousel, profile list, check-in counter, mood read, invite code and privacy toggles",
    caption: "The pieces that fill Home. The nudge is the only place the app interrupts, and it's always an invitation, never a score.",
    status: "DESIGN SOURCE",
    source: "Design system export · preview/components-widgets · May 10, 2026",
  },
  {
    media: "ds-screen-templates",
    alt: "Screen templates card: 29 screens grouped into onboarding, core product, and settings and system, each tagged with the states it must cover",
    caption: "Twenty-nine screen templates, each tagged with the states it has to cover — empty, loading, error, offline — before anyone draws the happy path.",
    status: "DESIGN SOURCE",
    source: "Design system export · preview/screen-templates · May 10, 2026",
  },
  {
    media: "brandkit-handoff",
    alt: "Dev handoff artboard: a tokens.json excerpt, a token naming convention, touch and accessibility rules, and the list of file deliverables",
    caption: "The developer handoff: tokens as JSON, one naming convention, 44 × 44 touch targets, light and dark parity, and never a hardcoded hex.",
    status: "DESIGN SOURCE",
    source: "Design system export · ui_kits/brand · May 10, 2026",
  },
];

// ---------------------------------------------------------------- Chapter 02 · Product

export const productProblem =
  "A check-in can hold a win, something hard, a feeling and a request for support. Those are different facts, and a single share-with-partner switch flattens them. The product had to let one person be honest with themselves first, then decide — field by field — what crosses over.";

export const principles: { id: string; title: string; body: string; note?: string }[] = [
  { id: "P1", title: "The phone is a bridge.", body: "Every flow points back to a real-world conversation. Success is a better talk in person, not minutes in the app." },
  { id: "P2", title: "Two private rooms with a shared door.", body: "Each person has a private space. The shared layer holds only what both people chose to put there. Default is private." },
  { id: "P3", title: "No scoring of human beings.", body: "No labels for your partner, no compatibility scores. Pattern reflection is for the user alone." },
  { id: "P4", title: "Plain words over jargon.", body: "“Wanted, chosen, safe” beats “attachment dimensions.” Names of feelings, not categories of people." },
  { id: "P5", title: "Consent is shaped into UI.", body: "Every shared item carries its own visibility decision. “Shared after both” is a real state, not a preview." },
  {
    id: "P6",
    title: "Safety is not a settings screen.",
    body: "Quick exit and crisis lines are reachable from the top bar of Safety and from any pattern reflection.",
    note: "The May handoff also listed a decoy disguise here. I removed it in October: privacy isn't concealment.",
  },
];

export const navigationEvolution: { when: string; tabs: string[]; note: string; status: WyStatus }[] = [
  { when: "v1.0 prototype · May 2026", tabs: ["Home", "Connect", "Check-in", "Insights", "You"], note: "Check-in in the center; Insights read patterns across both people.", status: "SUPERSEDED" },
  { when: "Design system v4.2.1 · Jun 18, 2026", tabs: ["Home", "Connect", "Gallery", "Us"], note: "Four tabs; tools entered from Connect instead of owning tabs.", status: "SUPERSEDED" },
  { when: "Product rebuild · Oct 1, 2026", tabs: ["Today", "Our Focus", "Connect", "Guidance", "Us"], note: "Gallery retired Oct 5, Insights Oct 10. The privacy rule didn't change.", status: "DEVELOPMENT-STAGE IMPLEMENTATION" },
];

export const flowFigures: WyFigure[] = [
  {
    media: "wfmap-title",
    alt: "Cover of the end-to-end workflow map: phase and legend, a table of contents, and a GitHub reality check comparing repository screens, prototype screens, open beta items and coverage",
    caption: "Before more screens, a map: every screen, state, decision point, modal and recovery path, checked against what was actually in the repository.",
    status: "DESIGN SOURCE",
    source: "WithYou Workflow Map v1.0 · May 2026",
  },
  {
    media: "wfmap-user-flow",
    alt: "End-to-end user flow diagram from first launch through account, pairing and the paired home, with recovery branches for expired invites and errors",
    caption: "The happy path from first launch to daily use, with the branches that matter most when things go wrong.",
    status: "DESIGN SOURCE",
    source: "WithYou Workflow Map v1.0 · section 3",
  },
  {
    media: "flow-graph",
    alt: "WithYou Flow: a screen-transition graph of the whole app arranged in lanes — entry, pairing, paired tabs, check-in, communication tools, profile and journey",
    caption: "The whole app as a screen-transition graph, filterable by lane, with every mocked screen and the code-only ones marked.",
    status: "DESIGN SOURCE",
    source: "WithYou Flow · docs/WithYou_Wireframe · May 2026",
  },
  {
    media: "wireframes-canvas",
    alt: "Mobile wireframe system canvas showing the auth and pairing row: welcome, create account, invite partner and waiting screens",
    caption: "Production-fidelity wireframes: sixteen flows on one canvas, starting with auth and pairing.",
    status: "DESIGN SOURCE",
    source: "WithYou Wireframes · May 2026",
  },
  {
    media: "hifi-entry",
    alt: "The v1.0 hi-fi prototype canvas, Entry section: splash, a photo welcome screen and the pairing invite with a private code",
    caption: "Then the hi-fi prototype: the same entry flow with real type, color, photography and copy.",
    status: "DESIGN SOURCE",
    source: "WithYou Prototype v1.0 · May 2026",
  },
];

export const architectureFigure: WyFigure = {
  media: "architecture-doc",
  alt: "Architecture and workflow reference, version 1: a title, two paragraphs and six product truths held constant — two people by design, AI as a mediator, privacy visible not implied, no scoring, layered disclosure, active beta only",
  caption: "The architecture reference opens with the product truths every screen and service has to respect — before a single box-and-arrow diagram.",
  status: "DESIGN SOURCE",
  source: "WithYou Architecture v1 · May 30, 2026",
};

export const comparisons: { title: string; design: WyFigure; build: WyFigure[]; note: string }[] = [
  {
    title: "Pairing",
    design: {
      media: "ref-ios-pair-invite",
      alt: "Prototype reference of Invite your partner: a six-character private code, copy and share actions, and a waiting-for-partner state",
      caption: "Prototype: a private code that expires, three ways to send it, and what happens next.",
      status: "PROTOTYPE REFERENCE",
      source: "v1.0 prototype · normalized May 13, 2026",
    },
    build: [
      {
        media: "android-pair-invite-light",
        alt: "Android build of Invite your partner in light mode: a private invite card with code 726-B7E, message, share and copy actions, and a what-happens-next list",
        caption: "Built, light.",
        status: "EMULATOR CAPTURE",
        source: "Android emulator, API 35 · May 16, 2026",
      },
      {
        media: "android-pair-invite-dark",
        alt: "The same invite screen on Android in dark mode, on a plum surface",
        caption: "Built, dark.",
        status: "EMULATOR CAPTURE",
        source: "Android emulator, API 35 · May 16, 2026",
      },
    ],
    note: "The build kept the structure and rewrote the copy: “Share this code with your person,” and a closing line that says invites connect accounts only — check-ins and notes keep their own privacy.",
  },
  {
    title: "Home",
    design: {
      media: "ref-ios-home",
      alt: "Prototype reference of the home dashboard: a photo nudge card, a couple status card, and a lavender Gentle insight card saying the partner may need space",
      caption: "Prototype: the nudge, the couple card — and a Gentle insight that read the partner's recent check-ins.",
      status: "PROTOTYPE REFERENCE",
      source: "v1.0 prototype · normalized May 13, 2026",
    },
    build: [
      {
        media: "ios-home-light",
        alt: "iOS build of the home dashboard in light mode: a full-bleed photo with a glass nudge card and today's check-in for both people",
        caption: "Built, light.",
        status: "SIMULATOR CAPTURE",
        source: "iOS Simulator, iPhone 17 Pro · May 16, 2026",
      },
      {
        media: "ios-home-dark",
        alt: "The same home dashboard on iOS in dark mode",
        caption: "Built, dark.",
        status: "SIMULATOR CAPTURE",
        source: "iOS Simulator, iPhone 17 Pro · May 16, 2026",
      },
    ],
    note: "The insight card didn't make it. Telling one person what the other “may need” is the kind of inference principle P3 rules out, and Insights was retired completely in October.",
  },
  {
    title: "Privacy review",
    design: {
      media: "ref-ios-privacy",
      alt: "Prototype reference of Privacy and data: a promise list of what WithYou never does, default toggles, and data export rows",
      caption: "Prototype: a promise first — what we never do — then the defaults.",
      status: "PROTOTYPE REFERENCE",
      source: "v1.0 prototype · normalized May 13, 2026",
    },
    build: [
      {
        media: "onb-impl-privacy",
        alt: "iOS build of onboarding step 7, Privacy and sharing: You decide what's shared, with an empty review and a Confirm, share 0 with your partner button",
        caption: "Built: nothing chosen yet, so nothing to share — and the button says so.",
        status: "SIMULATOR CAPTURE",
        source: "iOS Simulator · PR #80 · Jun 17, 2026",
      },
      {
        media: "onb-impl-partner-card",
        alt: "iOS build of onboarding step 8, Your partner card: a preview of only the parts the user chose to share",
        caption: "Built: the partner card previews only what was shared.",
        status: "SIMULATOR CAPTURE",
        source: "iOS Simulator · PR #80 · Jun 17, 2026",
      },
    ],
    note: "The spec's sticky button reads “Confirm · share N with Jordan,” and nothing changes until it's tapped. The build kept that rule, down to showing zero.",
  },
];

export const sharingFigures: WyFigure[] = [
  {
    media: "ref-ios-checkin-review",
    alt: "Prototype check-in review: a Today you'll share with Taylor card with a short summary and two tags marked Shared with partner, above a Stays only with you card holding the raw note marked Only you can see this",
    caption: "Alex's side: what crosses — a short summary and two tags — sits above what stays. The raw note is labeled “Only you can see this.”",
    status: "PROTOTYPE REFERENCE",
    source: "v1.0 prototype · normalized May 13, 2026",
  },
  {
    media: "ref-ios-partner-summary",
    alt: "Prototype partner view titled Taylor today: a soft summary, not raw words, three ways to show up, and a note that private notes are not shared",
    caption: "The receiving view: a soft summary, not raw words, three small ways to show up — and a plain line about what isn't shown.",
    status: "PROTOTYPE REFERENCE",
    source: "v1.0 prototype · normalized May 13, 2026",
  },
];

export const platformFigures: WyFigure[] = [
  { media: "android-welcome-light", alt: "Android welcome screen in light mode: a full-bleed couple photo, a glass card reading Stay close, even when life gets busy, and Create our space", caption: "Android, light.", status: "EMULATOR CAPTURE", source: "API 35 · May 16, 2026" },
  { media: "android-welcome-dark", alt: "Android welcome screen in dark mode", caption: "Android, dark.", status: "EMULATOR CAPTURE", source: "API 35 · May 16, 2026" },
  { media: "ios-home-light", alt: "iOS home dashboard in light mode", caption: "iOS, light.", status: "SIMULATOR CAPTURE", source: "iPhone 17 Pro · May 16, 2026" },
  { media: "ios-home-dark", alt: "iOS home dashboard in dark mode", caption: "iOS, dark.", status: "SIMULATOR CAPTURE", source: "iPhone 17 Pro · May 16, 2026" },
];

export const handoffFigures: WyFigure[] = [
  {
    media: "handoff-ios-light-welcome",
    alt: "The June 29 design handoff viewer: a list of seven flows, the welcome screen on an iPhone in light mode, and a spec panel listing components, API, test paths, design notes, platform parity and tokens",
    caption: "The handoff engineering built from: every flow on iOS or Android, light or dark, with the components, API call, test paths, platform notes and tokens for each screen.",
    status: "DESIGN SOURCE",
    source: "Design handoff v4.2 · Jun 29, 2026",
  },
  {
    media: "handoff-android-dark-welcome",
    alt: "The same handoff viewer switched to Android, with the spec panel's platform parity notes: full-screen on iOS, edge-to-edge with tinted system bars on Android",
    caption: "Same viewer, switched to Android: the spec panel says what changes per platform — full-screen on iOS, edge-to-edge on Android — and nothing else does.",
    status: "DESIGN SOURCE",
    source: "Design handoff v4.2 · Jun 29, 2026",
  },
];

export const specFigures: WyFigure[] = [
  {
    media: "onbspec-principles",
    alt: "Onboarding build spec, principles and ownership: nine binding design principles and a table of what the user owns versus what the relationship owns",
    caption: "Binding principles, then ownership: the profile belongs to the person and survives an unpairing; shared plans and notes belong to the relationship.",
    status: "DESIGN SOURCE",
    source: "Onboarding build spec · Jun 11, 2026",
  },
  {
    media: "onbspec-privacy-screen",
    alt: "Build spec for screen 07, Privacy and Sharing Review: a phone preview, purpose, layout anatomy, copy variants, fields and storage, states, API and acceptance criteria",
    caption: "One screen, fully specified: copy, fields and where they're stored, states, API, variations and acceptance criteria.",
    status: "DESIGN SOURCE",
    source: "Onboarding build spec · screen 07",
  },
  {
    media: "onbspec-matrix",
    alt: "Privacy boundary test matrix: rows of field visibility — private, shared, partner-safe summary, mediator only, hidden, inferred — against audiences self, partner, mediator, relationship mediator and system, each marked present or absent",
    caption: "The privacy rules as a test matrix: for every visibility and every audience, a field is present or absent. Design wrote the matrix; engineering had to pass it.",
    status: "DESIGN SOURCE",
    source: "Onboarding build spec · section 6",
  },
];

export const onboardingBuild: WyFigure[] = [
  { media: "onb-impl-basic-profile", alt: "Onboarding step 3, About you: an optional photo, display name, pronouns, age range and time zone", caption: "About you — the profile is yours, not the relationship's.", status: "SIMULATOR CAPTURE", source: "PR #80 · Jun 17, 2026" },
  { media: "onb-impl-communication", alt: "Onboarding step 5, How you connect: free-text prompts with sentence starters and a private or shared choice per answer", caption: "Own words first, with a private-or-shared choice on every answer.", status: "SIMULATOR CAPTURE", source: "PR #80 · Jun 17, 2026" },
  { media: "onb-impl-lens", alt: "Onboarding step 6, A lens on how you love: optional chips for conflict style, closeness, what feels like love and processing feelings", caption: "A lens, not a test: every chip is optional and changeable.", status: "SIMULATOR CAPTURE", source: "PR #80 · Jun 17, 2026" },
  { media: "onb-impl-privacy", alt: "Onboarding step 7, You decide what's shared, with an empty review list", caption: "Nothing moves until you confirm.", status: "SIMULATOR CAPTURE", source: "PR #80 · Jun 17, 2026" },
  { media: "onb-impl-partner-card", alt: "Onboarding step 8, Your partner card, previewing only shared parts", caption: "Your card, as your partner will see it.", status: "SIMULATOR CAPTURE", source: "PR #80 · Jun 17, 2026" },
  { media: "onb-impl-pairing", alt: "Onboarding step 9, Bring your partner in: a six-character invite code with copy and share actions", caption: "Then, and only then, the invite.", status: "SIMULATOR CAPTURE", source: "PR #80 · Jun 17, 2026" },
];

// ---------------------------------------------------------------- Chapter 03 · Engineering

export const visibilityLayers: { layer: string; rule: string; source: string; status: WyStatus }[] = [
  { layer: "Storage", rule: "Each sharable profile field has its own visibility row — shared, suggestions only, or private. No row means private.", source: "ProfileFieldVisibility · Prisma schema", status: "IMPLEMENTED + INTEGRATED" },
  { layer: "Service", rule: "One helper applies the rule for every partner read. Pausing sharing collapses everything to “nothing shared.”", source: "partner-legacy-profile.ts · SPK-H", status: "IMPLEMENTED + INTEGRATED" },
  { layer: "API", rule: "The partner check-in query selects a strict subset of fields: win, challenge, feeling and journal text can't reach the partner. No database policy backs it yet.", source: "docs/architecture/04 §2.3 · field-level projection", status: "PARTIAL" },
  { layer: "AI context", rule: "Private journal text never reaches a model. Partner context uses only what the partner already shares.", source: "ai-architecture §8.1 · PRIV-1", status: "IMPLEMENTED + INTEGRATED" },
  { layer: "Interface", rule: "The rule: a privacy tag on every sharable field, and a review that shows exactly what will cross. Emulator QA in June found gaps; they were fixed.", source: "PrivacyTag · #92", status: "IMPLEMENTED + INTEGRATED" },
];

export const codeHighlights: WyCode[] = [
  {
    id: "logo",
    title: "A logo that survives the bundler",
    path: "apps/mobile/src/components/core/Logo.tsx",
    commit: "612da33",
    language: "ts",
    code: `// Two upright interlocking ellipses tilted ±10° forming a "W" silhouette.
function WyMark({ size, coral, blush }: { size: number; coral: string; blush: string }) {
  const sw = Math.max(3, size * 0.088);
  const clipId = React.useId().replace(/:/g, "");
  return (
    <Svg width={size} height={size * 0.93} viewBox="0 0 60 56">
      <Defs>
        <ClipPath id={clipId}>
          <Rect x="30" y="0" width="30" height="56" />
        </ClipPath>
      </Defs>
      <G rotation={10} origin="41,28">
        <Ellipse cx={41} cy={28} rx={16} ry={22} stroke={blush} strokeWidth={sw} fill="none" />
      </G>
      <G rotation={-10} origin="19,28">
        <Ellipse cx={19} cy={28} rx={16} ry={22} stroke={coral} strokeWidth={sw} fill="none" />
      </G>
      <G rotation={10} origin="41,28" clipPath={\`url(#\${clipId})\`}>
        <Ellipse cx={41} cy={28} rx={16} ry={22} stroke={blush} strokeWidth={sw} fill="none" />
      </G>
    </Svg>
  );
}`,
    problem: "On May 14 the iOS build red-screened at launch: Metro couldn't resolve the SVG files the logo, icons and illustrations imported.",
    decision: "Draw the mark from its geometry instead of shipping it as a file. Two ellipses and a clip are cheaper to keep correct than an asset pipeline.",
    implementation: "react-native-svg primitives, colored from theme tokens, so the mark follows light and dark mode with no second file.",
    tradeoff: "The mark no longer comes from a design file, so a geometry change has to happen in code. The SVG masters stay in assets/brand for print and stores.",
    evidence: "Commit 9de6fea (May 14) removed the SVG imports from Logo.tsx, Icon.tsx and NavIcon.tsx and the iOS build booted again. The red screen is below.",
  },
  {
    id: "tokens",
    title: "Dark mode is its own palette",
    path: "apps/mobile/src/theme/tokens.ts",
    commit: "612da33",
    language: "ts",
    code: `dark: {
  background: "#1A1422",   // v4 dark plum
  surface: "#251D30",      // plum surface
  surfaceAlt: "#2F2540",   // elevated plum surface
  primary: "#FF8587",      // v4 coral primary, lifted for dark mode
  primarySoft: "#3C2322",  // dark coral wash
  accent: "#C4A8FF",
  textPrimary: "#F5EFE6",  // warm white
  textSecondary: "#B9AFC2",
  textMuted: "#9C90A8",
  border: "rgba(255,255,255,0.06)",
  …
  blush: "#FFCBC4",
  lavender: "#C4A8FF",
  plum: "#1A1422",
}`,
    problem: "In dark mode, captions, eyebrows and section headers measured 3.4–4.0:1 on plum surfaces — under the 4.5:1 AA needs for normal text.",
    decision: "Fix it in the tokens, not screen by screen: lift the dark text tones and leave every light value alone.",
    implementation: "Screens read color from the theme, never from hex, so one dark value changes every component that uses it.",
    tradeoff: "Two values per role to maintain, and the design files have to show both — light and dark parity became a requirement for every screen.",
    evidence: "Commit 7a02e39 (May 28, #27) lifted the text tokens; #117 (Sep 30) fixed the remaining photo-overlay contrast. Muted text now measures 5.4:1 on Plum surface.",
  },
  {
    id: "visibility",
    title: "One rule for every partner read",
    path: "apps/api/src/services/profile/partner-legacy-profile.ts",
    commit: "612da33",
    language: "ts",
    code: `/**
 * SPK-H: the ONE rule for reading a partner's legacy profile columns.
 *  - A field reaches the partner only when its scope is \`shared\`.
 *  - "Pause sharing with partner" collapses everything to the
 *    same empty result as "nothing shared".
 */
export async function loadPartnerLegacyProfile(partnerId: string, relationshipId: string): Promise<PartnerLegacyProfile> {
  const [partner, contactPaused] = await Promise.all([
    prisma.user.findUnique({
      where: { id: partnerId },
      select: {
        …
        profileFieldVisibility: {
          where: { fieldKey: { in: [...LEGACY_PROFILE_KEYS] }, scope: "shared" },
          select: { fieldKey: true },
        },
      },
    }),
    partnerInfoHidden(relationshipId),
  ]);
  if (!partner) return { found: false, displayName: null, ...NOTHING_SHARED };
  if (partner.sharingPausedAt || contactPaused) return { found: true, displayName: partner.displayName ?? null, ...NOTHING_SHARED };

  const shared = new Set(partner.profileFieldVisibility.map((row) => row.fieldKey));
  const has = (key: LegacyProfileKey) => shared.has(key);
  …
}`,
    problem: "Older profile paths returned a partner's love language, attachment style, conflict style and interests whatever they'd chosen — the legacy gap this case study used to list as open.",
    decision: "Not four patches. One helper owns the rule, and every legacy path — the compare screen, the combined profile and two AI prompts — goes through it.",
    implementation: "The query only selects visibility rows already scoped to shared, so a missing row can't leak; a sharing pause or contact pause returns the same empty shape.",
    tradeoff: "Legacy visibility is still per account, not per relationship space: a field shared by someone in two spaces is shared in both. That's documented, not hidden.",
    evidence: "Merged Oct 12, 2026 (SPK-H, #186) with nine regression tests in partner-profile-visibility.test.ts: default-private, no leaks through comparison flags, sharing pause, and both AI contexts.",
  },
];

export const qaCaught: { date: string; finding: string; source: string }[] = [
  { date: "May 14", finding: "SVG imports red-screened the iOS build at launch. The mark moved into code.", source: "9de6fea" },
  { date: "May 28", finding: "Dark-mode captions and eyebrows measured 3.4–4.0:1. Text tokens lifted to clear 4.5:1.", source: "#27" },
  { date: "Jun 29", finding: "Emulator QA found missing privacy tags, re-render loops and a loading timeout.", source: "#92" },
  { date: "Oct 10", finding: "Tab labels broke mid-word at 200% text size.", source: "#163" },
  { date: "Oct 10", finding: "A finished joint check-in had no way in from anywhere in the app. Added an entry on Today.", source: "BETA_CHECKLIST" },
  { date: "Oct 12", finding: "Five AI switches in Privacy & Data weren't read by any server code. They now do what they say.", source: "PRIV-1 · #191" },
  { date: "Oct 12", finding: "Partner profile fields reached the partner and AI prompts without a visibility check.", source: "SPK-H · #186" },
  { date: "Oct 12", finding: "The shared button announced a stale “busy” state to screen readers.", source: "#187" },
];

export const svgErrorFigure: WyFigure = {
  media: "ios-svg-bundler-error",
  alt: "iOS red error screen: Unable to resolve module ../../assets/illustrations/illustration-service-down.svg from ServiceUnavailableScreen.tsx",
  caption: "May 14: the bundler couldn't resolve the illustration SVGs and the app wouldn't start. It's the reason the logo is drawn in code.",
  status: "SIMULATOR CAPTURE",
  source: "iOS Simulator · May 14, 2026",
};

// ---------------------------------------------------------------- Evidence + reflection

export const contrastFinding = {
  title: "Primary button labels",
  detail:
    "Primary buttons set white 15px Inter 600 on coral. Computed for this page, that's 2.78:1 in light mode — under the 4.5:1 AA needs for text that size. Navy on coral would be 5.28:1; a deeper coral would also work. Found while preparing this page, and next on the list.",
  status: "KNOWN GAP" as WyStatus,
};

export const reflections: { title: string; body: string }[] = [
  {
    title: "Privacy is a consistency property",
    body: base.reflection,
  },
  {
    title: "The geometry held; the colors moved",
    body: "The second loop has been blush, plum, navy and lavender in four sets of files. The two ellipses never moved. That told me which part of the identity was the brand, and it's why moving the mark into code cost nothing.",
  },
  {
    title: "The handoff is where design is proven",
    body: "The style guide says what things look like. The handoff says which component, which API call, which test path and which token each screen needs — and the test matrix says what must never appear. That's the document I'd keep if I could keep one.",
  },
];

export const roadmap: { track: string; items: string[] }[] = [
  {
    track: "Before a public beta",
    items: [
      "Production iOS and Android builds",
      "A real-device, two-person smoke test of pairing, check-ins, chat and notifications",
      "iOS, screen-reader and large-text passes on the rebuilt flows",
    ],
  },
  {
    track: "Design debt",
    items: [
      "Primary button label contrast",
      "Per-space profile visibility",
      "Replace the AI-generated stand-in photos with a real, rights-cleared shoot",
    ],
  },
  {
    track: "Research",
    items: base.proposedMethods,
  },
];
