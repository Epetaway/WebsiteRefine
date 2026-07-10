import {
  Target,
  Calendar,
  User,
  Monitor,
  Layers,
  Swords,
  Zap,
  TrendingUp,
  Globe,
  Users,
  BarChart2,
  Smartphone,
  Lock,
  Shuffle,
} from "lucide-react";
import type { DesignDocCaseStudyData } from "@/components/case-study/types";

export const gundamForgeDesignDocData: DesignDocCaseStudyData = {
  slug: "gundam-forge",
  title: "Gundam Forge",
  category: "TCG Deck Building Platform",
  subtitle:
    "Competitive deck-building and playtest simulator for the Gundam Card Game, powered by live tournament meta data.",
  summary:
    "Gundam Forge is a full-stack, statically-exported web platform that lets competitive Gundam Card Game players build decks, browse the card pool, simulate matches against an AI opponent, and track live meta standings from Limitless TCG tournaments. Built as a monorepo with a purpose-built design system, it ships on GitHub Pages with no server required. The project spans a rules-compliant game engine, advanced synergy-scoring card search, and a tokenized UI that reads like a cockpit display.",
  liveUrl: "https://earlhickson.github.io/Gundam-Forge",
  repoUrl: "https://github.com/earlhickson/Gundam-Forge",
  heroImage: "/images/gundam-forge/hero-bg.png",

  meta: [
    { icon: <Target size={16} />, label: "Role", value: "Full-Stack Developer & Systems Designer" },
    { icon: <Calendar size={16} />, label: "Duration", value: "Feb 2026 – Apr 2026 (Active)" },
    { icon: <User size={16} />, label: "Team", value: "Solo" },
    { icon: <Monitor size={16} />, label: "Platform", value: "Web — GitHub Pages (Static Export)" },
    { icon: <Layers size={16} />, label: "Tech Stack", value: "Next.js 14, TypeScript, Tailwind v4, Radix UI, dnd-kit" },
  ],

  overview: {
    description:
      "Gundam Forge is a competitive toolkit for Gundam Card Game players. It provides a split-panel deck builder (Forge), a card browser with advanced synergy filtering, a playtest simulator with an AI opponent running official phase rules, and a live meta dashboard fed by tournament data from Limitless TCG. Everything ships as a fully static export to GitHub Pages — no backend, no latency.",
    industry: "Tabletop / Trading Card Games",
    targetUsers:
      "Competitive GCG players, deck theorycrafters, and tournament-level pilots who want fast iteration tools without paying for a subscription platform.",
    type: "Full-Stack Product — Game Engine + UI Platform",
    image: "/images/gundam-forge/dashboard-hero.png",
    myRole:
      "Sole developer: designed the token-based design system, built the monorepo architecture, implemented the official GCG Comprehensive Rules Ver. 1.5.0 in TypeScript, wired the Limitless TCG meta pipeline, and shipped the site as a static export.",
  },

  problem: {
    description:
      "The Gundam Card Game launched without a mature third-party tooling ecosystem. Players were building decks in spreadsheets, testing rules by hand, and scraping results manually. A platform had to be designed from scratch — with no prior GCG-specific deck builder UX to reference — and still ship as a free, hostable static site with no backend costs.",
    problems: [
      "No existing GCG deck building tools — all UX patterns had to be invented or adapted from MTG and Pokemon analogues.",
      "Official rules (Comprehensive Rules Ver. 1.5.0) use a non-standard phase system and resource deck mechanic that required a purpose-built TypeScript game engine.",
      "Static export constraints meant all filtering, search, and meta ranking had to run 100% client-side without a database or server.",
      "The Limitless TCG API does not expose public decklists — meta inference required color-overlap scoring and archetype detection from tournament placement records alone.",
    ],
  },

  opportunity: {
    heading: "Why this was worth building from scratch",
    paragraphs: [
      "No GCG-specific deck-building tool existed yet — every competitive player was improvising with spreadsheets and manual rules lookups borrowed from unrelated card games. That gap was the bet: build the tool the format didn't have yet, and make it free.",
      "Shipping as a static site — no server, no hosting cost — meant the tool could stay free indefinitely without needing a subscription model to cover infrastructure. That was a deliberate constraint, not a limitation.",
    ],
  },

  goals: [
    {
      icon: <Swords size={18} />,
      title: "Rules-Accurate Game Engine",
      description:
        "Implement official GCG phase flow (start, draw, resource, main, end), shield mechanics, Burst, Breach, and Repair keywords, and a 10-card resource deck as specified in Comprehensive Rules Ver. 1.5.0.",
    },
    {
      icon: <Zap size={18} />,
      title: "Zero-Latency Static Platform",
      description:
        "Ship a fully prerendered site to GitHub Pages with no server dependency — all card search, meta ranking, and deck analysis computed entirely on the client.",
    },
    {
      icon: <TrendingUp size={18} />,
      title: "Live Meta Intelligence",
      description:
        "Pull real tournament data from Limitless TCG and rank archetypes, trending decks, and color distributions using a weighted placement-score and color-overlap engine.",
    },
  ],

  research: {
    interviewIntro:
      "No formal user interviews were conducted — this was a solo project built for a competitive community the developer is already part of, not validated against outside users.",
    quotes: [],
    competitiveIntro:
      "Moxfield and Limitless TCG were studied as direct UX reference points for deck-building and tournament-data patterns, alongside a full read of the official GCG Comprehensive Rules Ver. 1.5.0 document.",
    competitors: ["Moxfield", "Limitless TCG"],
    observations: [
      "Moxfield's deck-builder interaction patterns (search, filter, quantity steppers) translated well to a TCG with no existing tooling.",
      "Limitless TCG's tournament-results format doesn't expose public decklists, which shaped the meta-inference approach described under Design Principles.",
    ],
    notes: [
      {
        tone: "constraint",
        label: "Constraint",
        text: "Static export to GitHub Pages meant no backend and no database — every filtering, search, and meta-ranking computation had to run entirely client-side.",
      },
    ],
  },

  designPrinciples: [
    {
      number: "01",
      title: "Rules Accuracy Is Non-Negotiable",
      description:
        "One wrong phase gate breaks all downstream playtesting trust — the TypeScript game engine was built to match the official Comprehensive Rules document, not a simplified approximation.",
    },
    {
      number: "02",
      title: "One Source of Truth for Every Token",
      description:
        "A purpose-built design-system package — not ad hoc utility classes — means every surface, shadow, and radius value is defined once and consumed everywhere: cobalt-navy palette, Orbitron display type, Exo 2 body type.",
    },
    {
      number: "03",
      title: "No Server Means No Excuses",
      description:
        "Static export forces lean, memoized, client-safe data transformations — meta ranking, card search, and synergy scoring all run in the browser with no backend to lean on.",
    },
    {
      number: "04",
      title: "Accessibility From Day One, Not Retrofitted",
      description:
        "Keyboard navigation and accessible-by-default primitives were built into the component layer from the start, not patched in after the fact.",
    },
  ],

  informationArchitecture: {
    intro: "Three player-facing tools sit on top of a shared card database and design-system package.",
    columns: [
      { title: "Deck Building", items: ["Forge workbench", "Card search & synergy filters", "Import / export"] },
      { title: "Meta Intelligence", items: ["Live archetype standings", "Meta diversity overview", "Deck distribution charts"] },
      { title: "Playtest", items: ["Full battlefield simulator", "AI opponent", "Phase timeline & game log"] },
    ],
  },

  features: [
    {
      image: "/images/gundam-forge/simulator.png",
      title: "Forge Deck Builder",
      description:
        "Split-panel workbench with a live CardSearchPanel featuring synergy scoring chips, keyword filters, and intent builder (Aggro, Board Control, Playstyle). Right panel shows tabbed workbench with Main Deck, Resource Deck, and EX Deck zones. Each card displays quantity multipliers (x2, x3) with zone grouping, autosave indicator, and full JSON import/export support.",
      tag: "Core Feature",
    },
    {
      image: "/images/gundam-forge/design-system.png",
      title: "Meta Snapshot Dashboard",
      description:
        "Home page hero displays Live Archetype Standings ranked by placement score, with win rate, top-8 rate, and meta share for each archetype. Meta Diversity Overview shows overall health with a color distribution pie chart. Deck Distribution by Archetype bar chart reveals which colors dominate the competitive landscape. All data synced from live Limitless TCG tournaments.",
      tag: "Meta Intelligence",
    },
    {
      image: "/images/gundam-forge/dashboard-hero.png",
      title: "Playtest Simulator",
      description:
        "Full GCG battlefield with dual player areas, 6-unit battle zones, shield stacks, resource decks, and a phase timeline (START → DRAW → RESOURCE → MAIN → BATTLE → END). Shows opponent units, your deployed units, game log with turn history, and action panel with phase-valid moves. AI opponent evaluates and executes strategies in real-time.",
      tag: "Game Engine",
    },
    {
      image: "/images/gundam-forge/forge-builder.png",
      title: "Design System & Components",
      description:
        "Purpose-built token-based design system showcasing button variants (Primary, Secondary, Ghost, Destructive) with states (default, hover, active, disabled), chip/badge states, typography hierarchy (Orbitron display, Exo 2 body, JetBrains Mono code), color tokens (core primitives + semantic), elevation & glow effects, radius scale, and icon button palette.",
      tag: "Design System",
    },
  ],

  visualDesign: {
    heading: "A cockpit-display aesthetic, built as tokens",
    paragraphs: [
      "The palette is cobalt-navy and dark, chosen to read like a mobile-suit command interface rather than a generic card-game app. Orbitron carries display type for authority; Exo 2 handles body copy for legibility at smaller sizes; JetBrains Mono marks anything code- or data-like.",
      "Every color, shadow, and radius is a named token in a dedicated design-system package, not a one-off utility class — the same button, chip, and card primitives appear identically across the deck builder, meta dashboard, and simulator.",
    ],
    tags: ["Cobalt-navy palette", "Orbitron display type", "Exo 2 body type", "JetBrains Mono", "Token-based design system"],
  },

  techStack: [
    "Next.js 14 App Router",
    "TypeScript 5",
    "Tailwind CSS v4",
    "Radix UI",
    "class-variance-authority",
    "Zod",
    "dnd-kit",
    "Orbitron + Exo 2",
    "JetBrains Mono",
    "Vitest",
    "GitHub Actions",
    "GitHub Pages",
  ],
  technicalArchitectureIntro:
    "Next.js 14 App Router monorepo (apps/web, packages/shared, packages/design-system), statically exported to GitHub Pages — no server, no database, no cold starts.",

  codeTabs: [
    {
      label: "Design Tokens",
      filename: "packages/design-system/src/tokens.ts",
      language: "typescript",
      code: `export const semanticColorTokens = {
  background:           '#0e1116',
  foreground:           '#e6edf8',
  surface:              '#151a22',
  surfaceMuted:         '#1c2330',
  accent:               '#3b82f6',
  accentForeground:     '#ffffff',
  border:               '#2a3444',
  ring:                 '#3b82f6',
  destructive:          '#ef4444',
  success:              '#22c55e',
  warning:              '#f59e0b',
  textPrimary:          '#e6edf8',
  textSecondary:        '#d5ddeb',
  textMuted:            '#bac6d8',
  textSubtle:           '#9aa9bf',
};

export const colorPrimitives = {
  cobalt: {
    300: '#60a5fa',
    400: '#4c90fa',
    500: '#3b82f6',
    600: '#2f6fd8',
    700: '#2558aa',
  },
};`,
    },
    {
      label: "Button Variants",
      filename: "apps/web/components/ui/Button.tsx",
      language: "tsx",
      code: `const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md border text-sm font-semibold tracking-[0.01em] transition-all duration-150 ease-out outline-none ring-offset-surface focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'border-cobalt-400/80 bg-cobalt-500 text-accent-foreground shadow-[0_10px_24px_rgba(37,99,235,0.34)] hover:-translate-y-px hover:border-cobalt-300 hover:bg-cobalt-400',
        secondary: 'border-cobalt-900/65 bg-surface-interactive text-foreground shadow-sm hover:-translate-y-px hover:border-cobalt-400/45',
        ghost: 'border-transparent text-steel-700 shadow-none hover:bg-steel-200/80 hover:text-foreground',
      },
      size: {
        sm: 'h-10 px-4 text-xs min-h-[44px] min-w-[44px]',
        md: 'h-11 px-4 min-h-[44px]',
        lg: 'h-12 px-6 text-base min-h-[44px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);`,
    },
    {
      label: "Meta Scoring Engine",
      filename: "apps/web/lib/meta/engine.ts",
      language: "typescript",
      code: `function ageWeight(eventDate: string): number {
  const days = Math.max(0, (Date.now() - new Date(eventDate).getTime()) / 86_400_000);
  if (days <= 30)  return 1;
  if (days <= 90)  return 0.75;
  if (days <= 180) return 0.45;
  return 0.2;
}

function placementScore(placement: number): number {
  if (placement === 1)  return 40;
  if (placement === 2)  return 24;
  if (placement === 3)  return 18;
  if (placement <= 8)   return 10;
  if (placement <= 16)  return 5;
  return 2;
}`,
    },
    {
      label: "Game Engine Phase Manager",
      filename: "packages/shared/src/engine/phases.ts",
      language: "typescript",
      code: `export enum GamePhase {
  START = 'start',
  DRAW = 'draw',
  RESOURCE = 'resource',
  MAIN = 'main',
  END = 'end',
}

export const phaseFlow: GamePhase[] = [
  GamePhase.START,
  GamePhase.DRAW,
  GamePhase.RESOURCE,
  GamePhase.MAIN,
  GamePhase.END,
];

export function resolveShields(
  currentShields: Card[],
  damageAmount: number,
): { destroyed: Card[]; remaining: Card[] } {
  const destroyed = currentShields.slice(0, damageAmount);
  const remaining = currentShields.slice(damageAmount);
  return { destroyed, remaining };
}`,
    },
  ],

  designSystem: {
    intro:
      "The design-system package is the single source of truth for tokens and primitives — buttons, chips, badges, elevation, and the full cobalt/steel color scale — consumed identically across every surface in the monorepo.",
    components: [
      "Button variants (primary/secondary/ghost/destructive)",
      "Chip & badge states",
      "Typography scale",
      "Color token system",
      "Elevation & glow effects",
    ],
  },

  accessibility: [
    { text: "Built on Radix UI primitives, which handle keyboard navigation and ARIA semantics by default." },
    { text: "Focus states and 44px minimum touch targets defined at the design-token level rather than per-component." },
  ],
  accessibilityValidation: {
    tone: "assumption",
    label: "Validation status",
    text: "No formal accessibility audit (axe, screen-reader pass) has been run against the live site — Radix's accessible-by-default primitives reduce risk but don't guarantee a WCAG AA pass.",
  },

  challenges: {
    heading: "Inferring a meta without access to real decklists",
    paragraphs: [
      "The Limitless TCG API surfaces tournament placements but not the actual decklists behind them — there's no ground truth for \"what deck won.\" Meta ranking had to be inferred from color-overlap and placement-weighting heuristics instead of reading real decklists directly.",
      "Static export added a second constraint on top of that: the inference engine couldn't run on a schedule server-side, so it had to be cheap enough to compute client-side without noticeable lag.",
    ],
  },
  challengesTradeoff: {
    tone: "tradeoff",
    label: "Tradeoff",
    text: "Age-weighted, color-overlap meta inference is an approximation, not ground truth — it can misjudge archetypes when two very different decks share a color pair. That imprecision was accepted in exchange for a live meta view the API doesn't otherwise make possible.",
  },

  outcomes: {
    heading: "What's shipped, in qualitative terms",
    paragraphs: [
      "The full toolkit — deck builder, card browser, playtest simulator, and meta dashboard — is live and statically hosted with no backend required.",
      "The game engine implements the official Comprehensive Rules Ver. 1.5.0 phase system rather than a simplified approximation. The codebase runs in TypeScript strict mode with an automated test suite, and every deploy goes through a CI gate (lint, build, route validation) before shipping to GitHub Pages.",
    ],
  },

  reflection: [
    {
      text: "A purpose-built design system package pays back in consistency — every surface, shadow, and radius token has one source of truth across the monorepo.",
    },
    {
      text: "Static export constraints force good architecture: when there is no server, every data transformation has to be lean, memoized, and client-safe.",
    },
    {
      text: "Game engine accuracy matters more than completeness — one wrong phase gate breaks all downstream playtesting trust, so rules compliance was non-negotiable from the start.",
    },
    {
      text: "Age-weighting recent tournament results (see the Meta Scoring Engine code tab) is a reasonable heuristic for meta-ranking relevance, but it's untested against any ground-truth measure of what the actual competitive meta looks like.",
      type: "open",
    },
  ],

  nextSteps: [
    { icon: <Globe size={14} />, label: "RK9.gg offline regional tournament integration" },
    { icon: <Users size={14} />, label: "Multiplayer playtest — real-time peer vs peer" },
    { icon: <BarChart2 size={14} />, label: "Deck analytics v2 with consistency index and mulligan simulation" },
    { icon: <Smartphone size={14} />, label: "Progressive Web App with offline card database" },
    { icon: <Lock size={14} />, label: "Supabase auth and cloud deck sync across devices" },
    { icon: <Shuffle size={14} />, label: "Draft and sealed simulator with set-pool picker" },
  ],
  futureValidation: {
    tone: "evidence",
    label: "Future validation",
    text: "Compare the meta-ranking engine's archetype rankings against manually-tracked results from a few real tournaments to see how far the color-overlap heuristic drifts from ground truth.",
  },

  prevProject: { slug: "withyou", title: "WithYou" },
  nextProject: { slug: "dojonet", title: "DojoNet" },

  theme: {
    accent: "#3b82f6",
    glow: "rgba(59,130,246,0.25)",
    badge: "#2f6fd8",
    bg: "#0e1116",
    surface: "#151a22",
    surface2: "#1c2330",
    textPrimary: "#e6edf8",
    textSecondary: "#d5ddeb",
    textMuted: "#bac6d8",
    border: "#2a3444",
    borderStrong: "#3a475c",
  },
};
