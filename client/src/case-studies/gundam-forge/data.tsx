import {
  Target,
  Calendar,
  User,
  Monitor,
  Layers,
  Zap,
  TrendingUp,
  Swords,
  Globe,
  Users,
  BarChart2,
  Smartphone,
  Lock,
  Shuffle,
} from "lucide-react";
import type { PremiumCaseStudyData } from "@/components/case-study/types";

export const gundamForgePremiumData: PremiumCaseStudyData = {
  slug: "gundam-forge",
  title: "Gundam Forge",
  category: "TCG Deck Building Platform",
  subtitle:
    "Competitive deck-building and playtest simulator for the Gundam Card Game, powered by live tournament meta data.",
  summary:
    "Gundam Forge is a full-stack, statically-exported web platform that lets competitive Gundam Card Game players build decks, browse 471+ cards, simulate matches against an AI opponent, and track live meta standings from Limitless TCG tournaments. Built as a monorepo with a purpose-built design system, it ships zero-latency on GitHub Pages with no server required. The project spans a rules-compliant game engine, advanced synergy-scoring card search, and a tokenized UI that reads like a cockpit display.",
  liveUrl: "https://earlhickson.github.io/Gundam-Forge",
  repoUrl: "https://github.com/earlhickson/Gundam-Forge",
  heroImage: "/images/gundam-forge/dashboard-hero.png",

  meta: [
    { icon: <Target size={16} />, label: "Role", value: "Full-Stack Developer & Systems Designer" },
    { icon: <Calendar size={16} />, label: "Duration", value: "Feb 2026 – Apr 2026 (Active)" },
    { icon: <User size={16} />, label: "Team", value: "Solo" },
    { icon: <Monitor size={16} />, label: "Platform", value: "Web — GitHub Pages (Static Export)" },
    { icon: <Layers size={16} />, label: "Tech Stack", value: "Next.js 14, TypeScript, Tailwind v4, Radix UI, dnd-kit" },
  ],

  overview: {
    description:
      "Gundam Forge is a competitive toolkit for Gundam Card Game players. It provides a split-panel deck builder (Forge), a 471-card browser with advanced synergy filtering, a playtest simulator with an AI opponent running official phase rules, and a live meta dashboard fed by tournament data from Limitless TCG. Everything ships as a fully static export to GitHub Pages — no backend, no latency.",
    industry: "Tabletop / Trading Card Games",
    targetUsers:
      "Competitive GCG players, deck theorycrafters, and tournament-level pilots who want fast iteration tools without paying for a subscription platform.",
    type: "Full-Stack Product — Game Engine + UI Platform",
    myRole:
      "Sole developer: designed the token-based design system, built the monorepo architecture, implemented official GCG Comprehensive Rules v1.5.0 in TypeScript, wired the Limitless TCG meta pipeline, and shipped 241 prerendered static routes.",
  },

  challenge: {
    description:
      "The Gundam Card Game launched without a mature third-party tooling ecosystem. Players were building decks in spreadsheets, testing rules by hand, and scraping results manually. A platform had to be designed from scratch — with no prior GCG-specific deck builder UX to reference — and still ship as a free, hostable static site with no backend costs.",
    problems: [
      "No existing GCG deck building tools — all UX patterns had to be invented or adapted from MTG and Pokemon analogues.",
      "Official rules (Comprehensive Rules Ver. 1.5.0) use a non-standard phase system and resource deck mechanic that required a purpose-built TypeScript game engine.",
      "Static export constraints meant all filtering, search, and meta ranking had to run 100% client-side without a database or server.",
      "The Limitless TCG API does not expose public decklists — meta inference required color-overlap scoring and archetype detection from tournament placement records alone.",
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
        "Ship 241 prerendered routes to GitHub Pages with no server dependency — all card search, meta ranking, and deck analysis computed entirely on the client.",
    },
    {
      icon: <TrendingUp size={18} />,
      title: "Live Meta Intelligence",
      description:
        "Pull real tournament data from Limitless TCG and rank archetypes, trending decks, and color distributions using a weighted placement-score and color-overlap engine.",
    },
  ],

  process: [
    {
      number: "01",
      title: "Research",
      description:
        "Studied the official GCG Comprehensive Rules Ver. 1.5.0 document in full. Analyzed Moxfield and Limitless TCG as UX reference points. Mapped the Limitless public API to understand what tournament signals were actually accessible and which had to be inferred.",
    },
    {
      number: "02",
      title: "Design",
      description:
        "Built a purpose-built design system package with a full HSL token architecture, Orbitron display font for authority, Exo 2 for body legibility, and a cobalt-navy palette designed to evoke a mobile-suit command interface. Established the monorepo structure (apps/web, packages/shared, packages/design-system) before writing a single feature component.",
    },
    {
      number: "03",
      title: "Build",
      description:
        "Implemented the TypeScript game engine (phase-manager, combat resolution, keyword parsing, autoplayer AI) in packages/shared. Built the Forge workbench with a split-panel layout, CardStackTile grid with physical stack depth effect, import and export, and per-zone grouping. Wired the Limitless TCG meta pipeline with age-weighted scoring and color-Jaccard overlap for catalog deck ranking.",
    },
    {
      number: "04",
      title: "Test & Ship",
      description:
        "Achieved 0 TypeScript errors and 75 of 84 passing tests. CI validates 241 prerendered routes, basePath injection, and image asset integrity before every deploy. Production ships via GitHub Actions to GitHub Pages on every main branch push, with a QA gate (lint, build, route validation) blocking broken deploys.",
    },
  ],

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
        "Home page hero displays Live Archetype Standings ranked by placement score, with win rate, top-8 rate, and meta share for each archetype. Meta Diversity Overview shows overall health (78.6%) with color distribution pie chart. Deck Distribution by Archetype bar chart reveals which colors dominate the competitive landscape. All data synced from live Limitless TCG tournaments.",
      tag: "Meta Intelligence",
    },
    {
      image: "/images/gundam-forge/dashboard-hero.png",
      title: "Playtest Simulator",
      description:
        "Full GCG battlefield with dual player areas, 6-unit battle zones, shield stacks (6/6 shown), resource decks, and a phase timeline (START → DRAW → RESOURCE → MAIN → BATTLE → END). Shows opponent units (Freedom Gundam, Justice Gundam, Zaku II Char, GM), your deployed units, game log with turn history, and action panel with phase-valid moves. AI opponent evaluates and executes strategies in real-time.",
      tag: "Game Engine",
    },
    {
      image: "/images/gundam-forge/forge-builder.png",
      title: "Design System & Components",
      description:
        "Purpose-built token-based design system showcasing button variants (Primary, Secondary, Ghost, Destructive) with states (default, hover, active, disabled), chip/badge states (Archetype: Cobalt, Success: Emerald, Warning: Amber, Status: Slate), typography hierarchy (Orbitron display, Exo 2 body, JetBrains Mono code), color tokens (core primitives + semantic), elevation & glow effects, radius scale, and icon button palette.",
      tag: "Design System",
    },
  ],

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

  metrics: [
    { value: "471+", label: "Cards in Pool", description: "Full GCG card database with price data, keywords, and legality fields" },
    { value: "241", label: "Static Routes", description: "All routes prerendered at build time — zero server cold starts" },
    { value: "0", label: "TypeScript Errors", description: "Strict mode across the full monorepo" },
    { value: "4", label: "Dev Phases Shipped", description: "Research, Design System, Game Engine, Production Hardening" },
    { value: "v1.5", label: "Rules Compliance", description: "Implements official GCG Comprehensive Rules Ver. 1.5.0 phase system" },
  ],

  learnings: [
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
      text: "Age-weighting tournament data (30d at 1.0, 90d at 0.75, 180d at 0.45) dramatically improves meta ranking relevance without requiring real-time data access.",
    },
    {
      text: "Keyboard navigation and WCAG AA accessibility built into primitives from day one saved significant late-stage rework compared to retrofitting.",
    },
  ],

  futureItems: [
    { icon: <Globe size={14} />, label: "RK9.gg offline regional tournament integration" },
    { icon: <Users size={14} />, label: "Multiplayer playtest — real-time peer vs peer" },
    { icon: <BarChart2 size={14} />, label: "Deck analytics v2 with consistency index and mulligan simulation" },
    { icon: <Smartphone size={14} />, label: "Progressive Web App with offline card database" },
    { icon: <Lock size={14} />, label: "Supabase auth and cloud deck sync across devices" },
    { icon: <Shuffle size={14} />, label: "Draft and sealed simulator with set-pool picker" },
  ],

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
