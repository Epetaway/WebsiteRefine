export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  features: string[];
  metrics?: {
    label: string;
    value: string;
    improvement?: string;
  }[];
  links: {
    demo?: string;
    repo?: string;
  };
  category: 'featured' | 'development' | 'design';
  role?: string;
  summary?: string;
  tags?: string[];
  slug?: string;
  devNotes?: string;
  image?: string;
}

// Resume file path constant for consistency
export const RESUME_PATH = "/assets/Earl_Hickson_Jr_Resume.pdf";

// Only these four projects are highlighted site-wide.
// All other work is available at https://github.com/Epetaway
export const projects: Project[] = [
  {
    id: "gundam-forge",
    slug: "gundam-forge",
    title: "Gundam Forge – Deck Builder & Playtest Simulator",
    role: "Full-Stack Developer",
    category: "featured",
    description: "A production-focused deck builder and playtest simulator for the Gundam Card Game, featuring advanced card search, real-time filtering, deck validation, and an interactive zone-based playtester.",
    summary: "Full-stack monorepo app for building and playtesting Gundam Card Game decks. Includes advanced search, contract-driven API patterns, and an interactive simulator with undo/redo and AI-assisted gameplay.",
    problem: "No dedicated tooling existed for organizing, validating, and playtesting Gundam Card Game decks in a single, production-quality interface.",
    solution: "Built a Next.js 14 + Supabase monorepo with shared TypeScript contract packages, deterministic filtering/sorting APIs, runtime schema validation, and a multi-phase playtester featuring zone-based board state, mulligan flow, keyboard shortcuts, and undo/redo history.",
    result: "Delivered a full end-to-end product with a scalable card data pipeline, reliable image-fallback strategy, and strict quality gates—lint, typecheck, build, contract, and smoke tests.",
    stack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Supabase", "Vitest", "Framer Motion", "npm Workspaces"],
    tags: ["Next.js", "TypeScript", "Supabase", "Full-Stack", "Monorepo", "Game Dev"],
    devNotes: "Monorepo with shared contract packages; Supabase backend; Vitest unit/contract tests; deterministic pagination and sorting for reproducible API behavior.",
    features: [
      "Advanced card search with keyword parsing, filters, and autocomplete",
      "Deck construction flow with real-time validation rules",
      "Interactive playtester with zone-based battlefield and game actions",
      "Undo/redo history, mulligan flow, and keyboard shortcuts",
      "AI opponent logic and ability system",
      "Card data sync pipeline with fallback image delivery strategy",
      "Contract-driven API patterns with runtime schema validation",
      "Release smoke checks and contract test workflow",
      "Mobile-responsive and accessibility-aware design"
    ],
    metrics: [
      { label: "Architecture", value: "Monorepo", improvement: "Shared contracts across packages" },
      { label: "Test Coverage", value: "Contract + Smoke", improvement: "Prevents payload drift" },
      { label: "Data Reliability", value: "Image fallback layers", improvement: "Zero broken assets" }
    ],
    links: {
      demo: "https://epetaway.github.io/Gundam-Forge/",
      repo: "https://github.com/Epetaway/Gundam-Forge"
    }
  },

  {
    id: "dojonet-martial-arts-platform",
    slug: "dojonet-martial-arts-platform",
    title: "DojoNet Martial Arts Portal Prototype",
    role: "Lead Front-End Developer & UI/UX Designer",
    category: "featured",
    description: "A prototype membership and class scheduling system for martial arts schools, focused on UX clarity and clean front-end patterns.",
    summary: "A modern membership and scheduling portal for martial arts communities, featuring dynamic forms, event flows, and clean front-end architecture.",
    problem: "Martial arts communities lack a dedicated platform that combines social networking, training journals, partner discovery, and event aggregation in one accessible interface.",
    solution: "Architected a modular React SPA using HashRouter for GitHub Pages compatibility, localStorage persistence, and JSON data simulation. Implemented Tailwind dark-mode design system with swipe-based interactions and accessible UI patterns.",
    result: "Delivered a production-ready prototype demonstrating full-stack thinking with front-end only tools, showcasing component architecture, state management, and modern UX patterns.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "localStorage", "GitHub Pages"],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    devNotes: "React, Next.js, TypeScript, Tailwind CSS, component-driven architecture.",
    features: [
      "Modular features: Feed, ProfileCard, Journal, Events, Partner Finder",
      "Local JSON data simulation + localStorage persistence",
      "SPA routing with HashRouter (GitHub Pages support)",
      "Tailwind-powered dark-mode design system",
      "Swipe-style partner matching UI",
      "Event cards with static scraper logic",
      "Offline journaling with text/photo/video",
      "CSS animation for swipe/interactions",
      "Accessible UI and semantic HTML"
    ],
    metrics: [
      { label: "Architecture", value: "Modular SPA", improvement: "Scalable components" },
      { label: "UX Pattern", value: "Swipe-based", improvement: "Modern interactions" },
      { label: "Accessibility", value: "Semantic HTML", improvement: "WCAG patterns" }
    ],
    links: {
      demo: "https://epetaway.github.io/DojoNet-Prototype-MAX/#/dashboard",
      repo: "https://github.com/epetaway/DojoNet-Prototype-MAX"
    }
  },

  {
    id: "withyou",
    slug: "WithYou",
    title: "WithYou – Relationship Wellness App",
    role: "Full Stack Engineer",
    category: "featured",
    description: "A privacy-first relationship app that encourages meaningful connection through intentional communication.",
    summary: "Full-stack mobile app for couples with behavioral UX design, structured check-ins, shared plans, and real-time sync—prioritizing connection without surveillance.",
    problem: "Couples lacked a dedicated space for intentional, structured communication that respects privacy and encourages genuine connection over performative sharing.",
    solution: "Built a full-stack mobile app with React Native, Node.js, and PostgreSQL, focused on behavioral UX patterns, structured check-ins, shared goal tracking, and real-time sync without surveillance mechanics.",
    result: "Delivered a privacy-first product with a clean, calm UI that prioritizes connection over engagement metrics.",
    stack: ["React Native", "Node.js", "PostgreSQL", "TypeScript"],
    tags: ["React Native", "Privacy", "Behavioral UX"],
    features: [
      "Structured check-in flows for intentional communication",
      "Shared plans and goal tracking",
      "Real-time sync between partners",
      "Privacy-first data architecture",
      "Behavioral UX patterns that encourage connection",
      "Clean, distraction-free mobile UI"
    ],
    metrics: [
      { label: "Architecture", value: "Full-Stack Mobile", improvement: "React Native + Node.js" },
      { label: "Data Privacy", value: "First-class", improvement: "No surveillance mechanics" },
      { label: "UX Focus", value: "Behavioral design", improvement: "Intentional connection" }
    ],
    links: {
      repo: "https://github.com/Epetaway/WithYou"
    }
  },
];
