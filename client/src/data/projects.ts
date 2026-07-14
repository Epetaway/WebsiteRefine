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

// Canonical public resume path. Legacy pages retain this constant while the
// active portfolio routes use the same PDF directly.
export const RESUME_PATH = "/assets/Earl-Hickson-Jr-Resume.pdf";

// Only these four projects are highlighted site-wide.
// All other work is available at https://github.com/Epetaway
export const projects: Project[] = [
  {
    id: "gundam-forge",
    slug: "gundam-forge",
    title: "Gundam Forge – Deck Builder & Meta Analysis Tool",
    role: "Front-End Developer & Designer",
    category: "featured",
    description: "A competitive deck-building and meta-analysis tool for the Gundam Card Game with an active player community — live card data via external API, advanced filtering, deck management with local saves, and a working rules-accurate play tester.",
    summary: "A real product, not a side project. Component-driven React application with API integration, client-side state management, and UX thinking applied to an active competitive card game community. Split-panel deck builder, synergy-scoring card browser, rules-accurate playtest simulator, and live meta dashboard sourced from tournament data.",
    problem: "Competitive Gundam Card Game players had no dedicated tooling — they were building decks in spreadsheets, testing rules by hand, and scraping tournament results manually. A production-quality platform had to be designed and built from scratch.",
    solution: "Built a Next.js monorepo with a purpose-built design system, a TypeScript game engine implementing official GCG Comprehensive Rules v1.5.0, a split-panel deck builder with synergy scoring, and a live meta dashboard fed by tournament placement data. Ships as a fully static export — no server required.",
    result: "A fully functional platform used by the active GCG player community: live card data, working play tester, local deck saves, and tournament meta rankings — all running client-side from a static GitHub Pages deployment.",
    stack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vitest", "GitHub Actions", "GitHub Pages"],
    tags: ["React", "TypeScript", "Next.js", "Front-End", "Game Dev"],
    devNotes: "Monorepo with shared contract packages; static export to GitHub Pages; Vitest unit/contract tests; deterministic pagination and sorting for reproducible behavior.",
    features: [
      "Live card data via external API — 471+ cards with search and synergy filtering",
      "Split-panel deck builder with real-time validation and JSON import/export",
      "Rules-accurate playtest simulator implementing official GCG Comprehensive Rules v1.5.0",
      "AI opponent with phase-valid move evaluation",
      "Live meta dashboard with tournament placement rankings and archetype scoring",
      "Purpose-built design system with full token architecture",
      "Zero-latency static deployment — all filtering and meta ranking runs client-side",
      "WCAG-aware accessible component primitives"
    ],
    metrics: [
      { label: "Card Pool", value: "471+", improvement: "Live data via external API" },
      { label: "Deployment", value: "Static Export", improvement: "Zero server cold starts" },
      { label: "Rules Compliance", value: "v1.5.0", improvement: "Official GCG Comprehensive Rules" }
    ],
    links: {
      repo: "https://github.com/Epetaway/Gundam-Forge"
    }
  },

  {
    id: "dojonet-martial-arts-platform",
    slug: "dojonet-martial-arts-platform",
    title: "DojoNet Martial Arts Portal Prototype",
    role: "Lead UI Engineer & Designer",
    category: "featured",
    description: "A prototype membership and class scheduling system for martial arts schools, focused on UX clarity and clean front-end patterns.",
    summary: "A modern membership and scheduling portal for martial arts communities, featuring dynamic forms, event flows, and clean front-end architecture.",
    problem: "Martial arts communities lack a dedicated platform that combines social networking, training journals, partner discovery, and event aggregation in one accessible interface.",
    solution: "Architected a modular React SPA using HashRouter for GitHub Pages compatibility, localStorage persistence, and JSON data simulation. Implemented Tailwind dark-mode design system with swipe-based interactions and accessible UI patterns.",
    result: "Delivered a production-ready prototype demonstrating full-stack thinking with front-end only tools, showcasing component architecture, state management, and modern UX patterns.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "localStorage", "GitHub Pages"],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    devNotes: "React, TypeScript, Tailwind CSS, Vite, component-driven architecture.",
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
    role: "Front-End Developer",
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
