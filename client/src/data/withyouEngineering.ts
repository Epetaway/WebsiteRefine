// Public part of the WithYou engineering notes: the hero, facts, stack and architecture overview.
// The rest (decisions, safety pipeline, quality evidence, lessons) is gated and lives only on the
// server in server/access/content.ts, so it isn't in the public bundle or the prerendered HTML.

export const withYouEngineering = {
  path: "/work/withyou/engineering",
  title: "WithYou — Engineering notes",
  claim:
    "The architecture, AI safety pipeline, trade-offs and real bugs behind the WithYou case study. Written for the engineer who wants to see how I think, not just what it looks like.",
  date: "November 2026",
  readingTime: "14 min",
  repository: "TerrianAi/withyou (private) · commit 612da33",
  facts: [
    { label: "Workspaces", value: "Mobile, API, shared contracts" },
    { label: "Screens", value: "89" },
    { label: "API route files", value: "53" },
    { label: "Prisma models", value: "131" },
    { label: "Test files", value: "98" },
    { label: "Commits", value: "560+ since Jan 2026" },
  ],
  stack: ["Expo / React Native", "TypeScript", "Express", "PostgreSQL", "Prisma", "Zod", "Socket.IO", "node-cron", "Sentry"],
};

export const architectureLayers: { layer: string; owns: string }[] = [
  {
    layer: "Mobile app · Expo / React Native",
    owns: "Screens, navigation, theming, accessibility and visible workflow state. It never decides on its own whether sensitive data may be shared.",
  },
  {
    layer: "@withyou/shared · Zod schemas and types",
    owns: "One contract for both apps. If the API changes a payload shape, the mobile app fails to type-check instead of breaking at runtime.",
  },
  {
    layer: "API · Express modular monolith",
    owns: "Validation, auth, relationship access control, consent, business workflows, AI routing, notifications and rate limits, organized as 13 domain modules in one process.",
  },
  {
    layer: "PostgreSQL via Prisma",
    owns: "Accounts, relationship spaces, approved shared content, goals and sessions. Sensitive free text is encrypted at the field level with AES-256-GCM.",
  },
  {
    layer: "Realtime and scheduled work",
    owns: "Socket.IO pushes relationship events to the partner's phone. About a dozen node-cron jobs run reminders, retries, cleanup and the 30-day account purge.",
  },
];
