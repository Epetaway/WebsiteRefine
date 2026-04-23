import { Heart, Zap, Layers, Bell, MapPin, Moon, Camera, Calendar, Target, Clock, Users, Smartphone, Code2 } from "lucide-react";
import type { PremiumCaseStudyData } from "@/components/case-study/types";

export const withYouPremiumData: PremiumCaseStudyData = {
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
    { icon: <Clock size={16} />, label: "Duration", value: "~4 hours initial build + iterative v1.1 expansion" },
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

  challenge: {
    description:
      "The product needed to support emotionally sensitive couple interactions while avoiding surveillance patterns, coercive UX, or accidental oversharing.",
    problems: [
      "Most relationship tools push direct confrontation instead of low-pressure signaling",
      "Pairing needed strict mutual consent and one-active-relationship integrity",
      "Check-ins needed explicit privacy controls — share optional, not default",
      "Generated ideas had to feel actionable, not generic lists",
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
      title: "Ship a full beta-ready stack quickly",
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

  process: [
    {
      number: "① Research",
      title: "Research",
      description:
        "Defined privacy and consent principles for couple workflows, including explicit share controls and no partner surveillance behaviors.",
    },
    {
      number: "② Design",
      title: "Design",
      description:
        "Implemented a tokenized visual system — color, spacing, typography, radius, elevation — and reusable components for consistent mobile UI across all screens.",
    },
    {
      number: "③ Build",
      title: "Build",
      description:
        "Built monorepo workspaces for API/mobile/shared, implemented all core endpoints and screens in a single focused session, then expanded with v1.1 Mood Ring v2 and plans/calendar export.",
    },
    {
      number: "④ Test & Ship",
      title: "Test & Ship",
      description:
        "Completed lint and type checks, E2E bash test scripts, manual QA documentation with 5 seeded test accounts, and a full beta readiness checklist with deployment guidance.",
    },
  ],

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

  metrics: [
    {
      value: "16",
      label: "Core tasks completed at beta",
      description: "Fully documented in BETA_CHECKLIST.md",
    },
    {
      value: "~3,000",
      label: "Lines of code",
      description: "Across frontend, backend, and shared packages",
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
    {
      value: "4",
      label: "Phase commits in initial build session",
      description: "Monorepo setup → API → Mobile → Docs, all in ~4 hours",
    },
  ],

  learnings: [
    {
      text: "Defaulting check-in sharing to OFF materially supports trust — users opt in, not out.",
    },
    {
      text: "Shared Zod schemas across API and mobile prevented contract drift while moving fast as a solo developer.",
    },
    {
      text: "Simple, explicit pairing rules (one active relationship, mutual consent) prevented ambiguous edge cases.",
    },
    {
      text: "A modular v1 foundation made the v1.1 Mood Ring and plan features additive rather than disruptive.",
    },
  ],

  futureItems: [
    { icon: <Bell size={14} />, label: "Push notifications for partner activity and daily check-in reminders" },
    { icon: <MapPin size={14} />, label: "Nearby discovery mode with Google Places integration and map/filter UI" },
    { icon: <Moon size={14} />, label: "Dark mode hardening and full theme-system centralization" },
    { icon: <Camera size={14} />, label: "Avatar and media sharing support" },
    { icon: <Calendar size={14} />, label: "Native iOS/Android calendar API integration" },
  ],

  prevProject: undefined,
  nextProject: undefined,

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
