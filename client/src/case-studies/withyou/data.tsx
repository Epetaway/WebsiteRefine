import { Heart, Zap, Layers, Bell, MapPin, Moon, Camera, Calendar, Target, Clock, Users, Smartphone, Code2 } from "lucide-react";
import type { DesignDocCaseStudyData } from "@/components/case-study/types";

export const withYouDesignDocData: DesignDocCaseStudyData = {
  slug: "withyou",
  title: "WithYou",
  category: "Relationship Communication & Planning App",
  subtitle:
    "A privacy-first mobile app that helps couples communicate needs and plan intentional connection without pressure.",
  summary:
    "WithYou is a mobile-first couples app focused on consent-based pairing, indirect communication, and private emotional check-ins. The product includes auth, pairing, dashboard, check-ins, preferences, and idea generation, with v1.1 adding Mood Ring v2 and plan/calendar workflows. The codebase is a TypeScript monorepo with Expo React Native, Express API, Prisma, and shared schemas/types.",
  repoUrl: "https://github.com/Epetaway/withyou",
  heroImage: "/images/withyou/withyou_hero.png",

  meta: [
    { icon: <Target size={16} />, label: "Role", value: "Lead Developer — Earl Hickson" },
    { icon: <Clock size={16} />, label: "Duration", value: "Initial build + iterative v1.1 expansion" },
    { icon: <Users size={16} />, label: "Team", value: "Solo (1 developer)" },
    { icon: <Smartphone size={16} />, label: "Platform", value: "iOS & Android mobile app + REST API backend" },
    { icon: <Code2 size={16} />, label: "Tech Stack", value: "Expo React Native, TypeScript, Express, Prisma, PostgreSQL, Zod, JWT" },
  ],

  overview: {
    description:
      "WithYou helps couples share mood and preferences in a low-pressure way, then turns those signals into actionable connection ideas and plans. The architecture separates mobile UI, API, and shared contracts to keep behavior consistent and type-safe.",
    industry: "Consumer Relationship Wellness",
    targetUsers: "Couples seeking intentional connection tools with strong privacy controls",
    type: "Mobile SaaS Application (Beta v1 with v1.1 feature expansion)",
    myRole:
      "End-to-end product engineering: architecture, backend APIs, mobile UX flows, shared types/schemas, testing and documentation",
    image: "/images/withyou/withyou_dashboard.png",
  },

  problem: {
    description:
      "The product needed to support emotionally sensitive couple interactions while avoiding surveillance patterns, coercive UX, or accidental oversharing.",
    problems: [
      "Most relationship tools push direct confrontation instead of low-pressure signaling",
      "Pairing needed strict mutual consent and one-active-relationship integrity",
      "Check-ins needed explicit privacy controls — share optional, not default",
      "Generated ideas had to feel actionable, not generic lists",
    ],
  },

  opportunity: {
    heading: "Why consent-first mattered enough to build",
    paragraphs: [
      "Most relationship and habit-tracking apps default to maximum visibility — read receipts, streaks, shared locations — because that's what drives engagement metrics. WithYou bets the opposite: that couples want a tool that respects boundaries by default, even if that means fewer visible signals.",
      "The opportunity wasn't a new UI pattern — it was proving that a consent-first architecture (explicit opt-in sharing, no partner surveillance, one active relationship enforced at the API level) could still deliver a full, usable product: pairing, check-ins, activity ideas, and shared planning.",
    ],
  },

  goals: [
    {
      icon: <Heart size={18} />,
      title: "Build a calm, trust-centered UX",
      description:
        "Use soft card-based UI, clear labels, and non-judgmental copy for emotionally safe interaction.",
    },
    {
      icon: <Zap size={18} />,
      title: "Ship a full beta-ready stack",
      description:
        "Deliver auth, pairing, dashboard, check-ins, preferences, ideas, docs, and CI with strict typing and validation.",
    },
    {
      icon: <Layers size={18} />,
      title: "Create a scalable product foundation",
      description:
        "Use shared schemas/types and modular APIs so v1.1 features like Mood Ring v2 and plans could be added without breaking v1.",
    },
  ],

  research: {
    interviewIntro:
      "No formal user interviews were conducted before this build. Privacy and consent decisions came from reasoning about known failure modes in relationship-tracking products — read receipts, streaks, and shared-location features that quietly pressure users into performing engagement — not from field research.",
    quotes: [],
    competitiveIntro: "No formal competitive audit was conducted either — this was a solo build under real time constraints.",
    competitors: [],
    observations: [],
    notes: [
      {
        tone: "assumption",
        label: "Assumption — needs validation",
        text: "Defaulting check-in sharing to off is assumed to read as \"more in control\" to users. That's untested — the first thing worth validating with real couples.",
      },
      {
        tone: "constraint",
        label: "Constraint",
        text: "Built solo, without a design or research budget — scope and process decisions reflect that.",
      },
    ],
  },

  designPrinciples: [
    {
      number: "01",
      title: "Consent by Default",
      description:
        "Defined privacy and consent principles for couple workflows before writing code — explicit share controls, no partner surveillance, one active relationship enforced at the API level.",
    },
    {
      number: "02",
      title: "Consistent by System, Not by Habit",
      description:
        "A tokenized visual system — color, spacing, typography, radius, elevation — and reusable components kept every screen consistent without re-deciding style choices screen by screen.",
    },
    {
      number: "03",
      title: "Ship a Real Foundation, Not a Demo",
      description:
        "Monorepo workspaces for API/mobile/shared with all core endpoints and screens fully implemented — not stubbed — so v1.1 features (Mood Ring v2, plans/calendar) could build on working infrastructure.",
    },
    {
      number: "04",
      title: "Ship Nothing Unvalidated",
      description:
        "Every endpoint has a Zod schema and passes lint/type checks; manual QA against seeded test accounts and a full beta-readiness checklist gated what counted as done.",
    },
  ],

  informationArchitecture: {
    intro: "The mobile app groups into onboarding/pairing flows, the paired daily experience, and account settings.",
    columns: [
      { title: "Getting Paired", items: ["Auth (sign up / log in)", "Invite code generation", "Pairing acceptance"] },
      { title: "Paired Experience", items: ["Dashboard", "Mood check-ins", "Mood Ring v2 reveal", "Activity ideas", "Plans & calendar export"] },
      { title: "Settings", items: ["Preferences", "Privacy & sharing controls"] },
    ],
  },

  features: [
    {
      image: "/images/withyou/withyou_pairing.png",
      title: "Consent-Based Pairing",
      description:
        "Invite code generation and acceptance flows enforce mutual opt-in. One active relationship per user is enforced at the API level with clear error messaging.",
      tag: "Trust & Safety",
    },
    {
      image: "/images/withyou/withyou_consent.png",
      title: "Privacy-First Check-Ins",
      description:
        "Mood check-ins support optional notes and an explicit share toggle (OFF by default). Partner dashboard only surfaces entries where shared is true.",
      tag: "Core UX",
    },
    {
      image: "/images/withyou/withyou_lifestyle.png",
      title: "Mood Ring v2 Reveal Logic",
      description:
        "Users select a mood color, emotion label, and energy level. Partner mood blend with gradient visualization and contextual tips only reveals after both partners check in.",
      tag: "v1.1 Feature",
    },
    {
      image: "/images/withyou/withyou_ideas.png",
      title: "Preferences-Driven Activity Ideas",
      description:
        "Activity ideas are generated from user preferences with a searchable, chip-filtered presentation. Budget and activity style inform suggestions.",
      tag: "Personalization",
    },
    {
      image: "/images/withyou/withyou_ideas.png",
      title: "Plan Management + Calendar Export",
      description:
        "Users save date plans with address, schedule, and notes. Plans export as ICS files compatible with Apple Calendar, Google Calendar, and Outlook.",
      tag: "v1.1 Feature",
    },
    {
      image: "/images/withyou/withyou_dashboard.png",
      title: "Guided Dashboard Flow",
      description:
        "Home screen prioritizes daily connection CTA with a hero card, up-next action list, and lightweight relationship insights panel.",
      tag: "Navigation",
    },
  ],

  visualDesign: {
    heading: "A tokenized visual system built for calm, not urgency",
    paragraphs: [
      "The palette leans warm and soft — coral primary, violet accent, muted secondary blue — deliberately avoiding the high-saturation reds and greens that read as alerts or gamified streaks elsewhere in the relationship-app category.",
      "Every color, radius, and type size is a named token (see the Theme Tokens tab under Technical Architecture), not a one-off value, so the mobile app and any future web surface stay visually consistent by construction.",
    ],
    tags: ["Coral primary #FF686B", "Violet accent #A78BFA", "Inter typeface", "Soft 10–12px radii"],
  },

  prototype: {
    url: "/prototypes/withyou-maestro/Prototype.dc.html",
    label: "Maestro Prototype",
    description:
      "Interactive click-through of the Maestro flow — home rail, check-ins, and mood-ring reveal — built from the same design tokens as the production app. Password-protected.",
  },

  techStack: [
    "TypeScript",
    "Expo + React Native",
    "React Navigation",
    "Express.js",
    "Prisma ORM",
    "PostgreSQL",
    "Zod",
    "JWT + bcrypt",
    "Expo SecureStore",
    "LinearGradient (expo-linear-gradient)",
    "Inter font (via @expo-google-fonts)",
  ],
  technicalArchitectureIntro:
    "TypeScript monorepo — Expo React Native mobile app, Express API, Prisma/PostgreSQL, shared Zod schemas and types across both.",

  codeTabs: [
    {
      label: "Theme Tokens",
      filename: "apps/mobile/src/theme/tokens.ts",
      language: "typescript",
      code: `export const colorTokens = {
  light: {
    background: "#F7F8FB",
    surface: "#FFFFFF",
    surfaceAlt: "#F2F4F8",
    primary: "#FF686B",
    primarySoft: "#FFB4AA",
    accent: "#A78BFA",
    secondary: "#6BA6BF",
    textPrimary: "#111827",
    textSecondary: "#374151",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    accentPale: "#F2ECFF",
    secondaryLight: "#E8F2F6",
    overlayStrong: "rgba(17,24,39,0.22)",
  }
};

export const radius = {
  sm: 10, md: 12, lg: 12, pill: 999
};

export const typography = {
  display1: { fontSize: 28, lineHeight: 34, fontFamily: "Inter_700Bold" },
  h1:       { fontSize: 22, lineHeight: 28, fontFamily: "Inter_600SemiBold" },
  body:     { fontSize: 16, lineHeight: 22, fontFamily: "Inter_400Regular" },
  caption:  { fontSize: 13, lineHeight: 18, fontFamily: "Inter_400Regular" },
};`,
    },
    {
      label: "Pairing Integrity",
      filename: "apps/api/src/routes/relationship.ts",
      language: "typescript",
      code: `router.post("/relationship/accept", jwtMiddleware, async (req, res, next) => {
  const invite = await prisma.relationshipInvite.findUnique({
    where: { code: inviteCode }
  });
  if (!invite)
    return next(new AppError("Invite code is not valid", 400, "INVALID_INVITE"));
  if (new Date() > invite.expiresAt)
    return next(new AppError("This invite code has expired", 400, "INVITE_EXPIRED"));

  const accepterHasActiveRelationship = await prisma.relationship.findFirst({
    where: { OR: [{ userAId: userId }, { userBId: userId }], status: "active" },
  });
  if (accepterHasActiveRelationship)
    return next(new AppError("You must end your current pairing first", 400, "SELF_ALREADY_PAIRED"));

  const relationship = await prisma.relationship.create({
    data: { userAId: invite.inviterId, userBId: userId, status: "active", stage: "dating" },
  });
  res.status(201).json({ relationshipId: relationship.id, status: relationship.status });
});`,
    },
    {
      label: "Mood Ring v2 Reveal",
      filename: "apps/mobile/src/screens/paired/CheckInV2Screen.tsx",
      language: "tsx",
      code: `const showGradient =
  todayData?.gradient && todayData.userCheckin && todayData.partnerCheckin;

{showGradient ? (
  <MoodGradient
    userColor={todayData.userCheckin.moodColor as MoodColor}
    partnerColor={todayData.partnerCheckin.moodColor as MoodColor}
    insight={todayData.gradient.insight}
    tips={todayData.gradient.tips}
  />
) : todayData?.userCheckin && !todayData?.partnerCheckin ? (
  <ThemedCard color="surface">
    <ThemedText color="secondary">
      ✓ You've checked in! Waiting for your partner to reveal the mood blend.
    </ThemedText>
  </ThemedCard>
) : null}`,
    },
    {
      label: "Privacy Guard — Dashboard",
      filename: "apps/api/src/routes/core.ts",
      language: "typescript",
      code: `// Only the partner's explicitly shared check-ins are ever surfaced
const lastSharedCheckIn = await prisma.checkin.findFirst({
  where: {
    userId: partnerId,
    relationshipId: relationship.id,
    shared: true, // ← private check-ins are never readable by the other user
  },
  orderBy: { createdAt: "desc" },
});`,
    },
  ],

  designSystem: {
    intro:
      "A small, focused design-system layer sits on top of the Expo/React Native primitives: shared theme tokens, reusable themed components, and secure local storage patterns — not a sprawling component library, since the product is 10 screens, not 100.",
    components: [
      "Themed components (ThemedCard, ThemedText)",
      "Expo SecureStore auth pattern",
      "LinearGradient mood visualizations",
      "Inter font system",
    ],
  },

  accessibility: [
    { text: "Semantic component structure via ThemedText/ThemedCard, not raw styled Views, throughout the mobile app." },
  ],
  accessibilityValidation: {
    tone: "assumption",
    label: "Validation status",
    text: "No formal accessibility audit or screen-reader testing has been run. This is real, unaddressed future work — not yet a WCAG-level claim this project can make.",
  },

  challenges: {
    heading: "Privacy rules that don't feel like friction",
    paragraphs: [
      "The hardest design tension was enforcing real privacy guarantees — sharing off by default, private check-ins genuinely unreadable by a partner — without the app feeling cold or transactional. A relationship app that feels like a permissions dialog defeats its own purpose.",
      "The Mood Ring reveal logic (mutual check-in required before either partner sees the blended result) took several passes to get the partial-state messaging right: what a user sees while waiting on their partner, and whether it reads as anticipation or as being left on read.",
    ],
  },
  challengesTradeoff: {
    tone: "tradeoff",
    label: "Tradeoff",
    text: "Requiring mutual check-in before revealing the Mood Ring blend adds a real wait state to the core loop, in exchange for never letting one partner's mood become surveillance data the other can check unilaterally. Worth it for the trust model; it costs some of the daily-engagement stickiness a simpler design would have.",
  },

  outcomes: {
    heading: "What's actually built, and what isn't proven yet",
    paragraphs: [
      "The beta-scope feature set is complete and internally QA'd: auth, pairing, dashboard, check-ins, preferences, ideas, plans, and calendar export, all backed by a typed API and Zod-validated contracts end to end.",
      "What hasn't happened yet is real users. Every number below is about what was built and verified internally — not about how couples actually experience it.",
    ],
  },
  metrics: [
    {
      value: "16",
      label: "Core tasks completed at beta",
      description: "Fully documented in BETA_CHECKLIST.md",
    },
    {
      value: "10+",
      label: "API endpoints",
      description: "Auth, pairing, check-ins, preferences, ideas, plans, calendar, health",
    },
    {
      value: "10",
      label: "Primary mobile screens",
      description: "Auth, unpaired, paired, and settings flows fully implemented",
    },
  ],

  reflection: [
    {
      text: "Shared Zod schemas across API and mobile prevented contract drift while moving fast as a solo developer.",
    },
    {
      text: "Simple, explicit pairing rules (one active relationship, mutual consent) prevented ambiguous edge cases.",
    },
    {
      text: "A modular v1 foundation made the v1.1 Mood Ring and plan features additive rather than disruptive.",
    },
    {
      text: "Defaulting sharing to off encodes a consent-first product principle. Whether it actually reads as \"more in control\" to real users is untested — that's the first thing I'd validate with usability testing.",
      type: "open",
    },
  ],

  nextSteps: [
    { icon: <Bell size={14} />, label: "Push notifications for partner activity and daily check-in reminders" },
    { icon: <MapPin size={14} />, label: "Nearby discovery mode with Google Places integration and map/filter UI" },
    { icon: <Moon size={14} />, label: "Dark mode hardening and full theme-system centralization" },
    { icon: <Camera size={14} />, label: "Avatar and media sharing support" },
    { icon: <Calendar size={14} />, label: "Native iOS/Android calendar API integration" },
  ],
  futureValidation: {
    tone: "evidence",
    label: "Future validation",
    text: "Run moderated usability sessions with 4-6 real couples on the check-in sharing default and the Mood Ring reveal wait state — the two places this case study flags as unvalidated assumptions.",
  },

  nextProject: { slug: "gundam-forge", title: "Gundam Forge" },

  theme: {
    accent: "#FF686B",
    glow: "rgba(255,104,107,0.25)",
    badge: "#A78BFA",
    bg: "#F7F7FB",
    surface: "#FFFFFF",
    surface2: "#F2F4F8",
    textPrimary: "#111827",
    textSecondary: "#374151",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    borderStrong: "#D1D5DB",
  },
};
