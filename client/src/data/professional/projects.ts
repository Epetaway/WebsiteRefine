// The résumé's "Selected Projects" section (Oct 24, 2026), used by the online résumé and the
// PDF. Case-study pages keep their own governed records in data/investigations.ts.
// Checked against the local repositories on Oct 25, 2026: Gundam Forge has 27 Vitest test
// files, a 623-card catalog, MAX_HISTORY = 100 in the playtest engine, and a deploy workflow
// that runs `npm run qa` (lint + build) before the Pages build. The DojoNet demo URL loaded
// on Oct 25, 2026.

export type SelectedProject = {
  slug: "gundam-forge" | "withyou" | "dojonet";
  name: string;
  descriptor: string;
  stack: readonly string[];
  status: string;
  live: { label: string; url: string } | null;
  highlights: readonly string[];
};

export const selectedProjects: readonly SelectedProject[] = [
  {
    slug: "gundam-forge",
    name: "Gundam Forge",
    descriptor: "Deck Builder and Playtest Simulator",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vitest"],
    // The résumé says "Public beta · epetaway.github.io/Gundam-Forge", but on Oct 25, 2026 that
    // URL returned GitHub Pages' 404 ("There isn't a GitHub Pages site here"). No live link or
    // "public" claim until the Pages site is back up.
    status: "Beta",
    live: null,
    highlights: [
      "Built as a typed monorepo: a Next.js app plus shared packages for game rules and deck validation, a design system, and card-data sync.",
      "Maintains a 623-card catalog pulled from the official card site by a Playwright sync script and validated with Zod, with search, filters, and a validation engine that flags deck errors and warnings as you build.",
      "Playtester with a zone-based battlefield, 100-move undo/redo, keyboard shortcuts, and a computer opponent.",
      "27 Vitest test files cover the rules engine, filters, API contracts, and replay storage; a GitHub Actions workflow gates every deploy on lint and build.",
    ],
  },
  {
    slug: "withyou",
    name: "WithYou",
    descriptor: "Couples Communication App",
    stack: ["Expo React Native", "TypeScript", "Node.js", "Express", "PostgreSQL (Prisma)", "Socket.IO"],
    status: "In development",
    live: null,
    highlights: [
      "Designed privacy-first: each person owns their profile, invite-code pairing links accounts without merging private data, and sharing is opt-in field by field.",
      "Private check-ins and real-time messaging over Socket.IO with reconnection handling; sensitive data kept in secure on-device storage.",
      "Defined the boundary for a planned AI mediator: it works only from privacy-filtered context and never exposes one partner's private data to the other.",
    ],
  },
  {
    slug: "dojonet",
    name: "DojoNet",
    descriptor: "Martial Arts Training and Community App",
    stack: ["React", "Vite", "Tailwind CSS", "Zustand"],
    status: "Prototype",
    live: {
      label: "Live demo",
      url: "https://epetaway.github.io/DojoNet-Prototype-MAX/",
    },
    highlights: [
      "Training journal with session logging, technique progression, goals, and sparring stats, plus partner matchmaking with compatibility scoring and age-gated safety rules.",
      "Runs fully static on GitHub Pages with localStorage demo data; Express, Prisma, and Socket.IO server scaffolded for the full build.",
    ],
  },
] as const;
