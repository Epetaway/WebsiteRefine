/**
 * Project Case Study Data
 * Centralized case study content for all projects
 */

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  overview: {
    description: string;
    problem: string;
    goals: string[];
  };
  role: Array<{
    title: string;
    description: string;
  }>;
  technical: {
    architecture: string;
    techStack: string[];
    approach: Array<{
      title: string;
      description: string;
    }>;
  };
  outcomes: Array<{
    metric: string;
    label: string;
    description: string;
    color: 'blue' | 'green' | 'gold';
  }>;
  screenshots?: string[];
  demoUrl?: string;
  prototype?: {
    url: string;
    label?: string;
    description?: string;
  };
  codeUrl: string;
  repo: string;
};

export const caseStudyData: Record<string, ProjectCaseStudy> = {
  'WithYou': {
    slug: 'WithYou',
    title: 'WithYou',
    subtitle: 'Designing a privacy-first relationship platform focused on intentional communication and behavioral UX',
    summary: 'A mobile-first application designed to help couples communicate without pressure using structured check-ins, shared preferences, and intentional planning systems.',
    overview: {
      description: 'WithYou is a mobile-first application designed to help couples communicate without pressure using structured check-ins, shared preferences, and intentional planning systems. Built as a full-stack product system with React Native frontend, Express backend, and PostgreSQL database, it demonstrates thoughtful product design that prioritizes user well-being over engagement metrics.',
      problem: 'Most relationship apps optimize for engagement and retention rather than user well-being. Existing tools often create pressure to communicate constantly, lack structure for meaningful connection, or fail to preserve privacy. Couples need a system that encourages intentional communication without friction or surveillance.',
      goals: [
        'Design a system that encourages communication without pressure',
        'Require mutual participation to prevent one-sided interactions',
        'Preserve privacy with end-to-end encryption and zero tracking',
        'Support real-world connection through structured intentionality',
        'Create healthy digital behavior patterns through UX design',
      ],
    },
    role: [
      {
        title: 'Product Strategy & UX Design',
        description: 'Designed behavioral systems that discourage addictive patterns while encouraging intentional connection. Built wireframes, flows, and interaction patterns focused on mutual participation and consent.',
      },
      {
        title: 'Full-Stack Engineering',
        description: 'Architected monorepo with React Native frontend (Expo), Express API backend, PostgreSQL database with Prisma ORM, and shared TypeScript types for type safety across boundaries.',
      },
      {
        title: 'Security & Privacy Engineering',
        description: 'Implemented JWT authentication, bcrypt password hashing, Zod validation, per-relationship data isolation, and privacy-first architecture with zero tracking or monetization.',
      },
      {
        title: 'System Architecture',
        description: 'Built production-ready infrastructure with clean separation of concerns, validation-first API design, error handling, and patterns that scale without introducing complexity.',
      },
    ],
    technical: {
      architecture: 'Full-stack monorepo with React Native (Expo) mobile frontend communicating with Express API backend. Shared TypeScript types and validation schemas (Zod) enforce consistency across client and server. PostgreSQL database with Prisma ORM handles relational data. Architecture prioritizes type safety, validation at boundaries, and clean separation between presentation and business logic.',
      techStack: ['React Native', 'Expo', 'TypeScript', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Zod', 'JWT Authentication', 'bcrypt'],
      approach: [
        {
          title: 'Monorepo Structure',
          description: 'Shared packages for types, validation schemas, and utilities. Separate apps for mobile and backend ensure clear boundaries while maintaining consistency through shared contracts.',
        },
        {
          title: 'Validation-First API',
          description: 'All endpoints validate input with Zod schemas before processing. Type-safe request/response contracts prevent mismatches between client and server expectations.',
        },
        {
          title: 'Privacy by Design',
          description: 'No tracking pixels, analytics cookies, or monetization logic. Data is encrypted in transit and at rest. Each relationship exists in isolated database contexts.',
        },
        {
          title: 'Behavioral UX Systems',
          description: 'Reveal logic prevents information asymmetry. Mood check-ins use multi-dimensional data to reflect emotional complexity. Planning flows require mutual action to prevent unilateral pressure.',
        },
      ],
    },
    outcomes: [
      {
        metric: '100%',
        label: 'Privacy First',
        description: 'Zero tracking, zero monetization',
        color: 'blue',
      },
      {
        metric: '6',
        label: 'Core Features',
        description: 'Pairing, check-ins, shared plans, chat, real-time sync, journey',
        color: 'green',
      },
      {
        metric: 'Production-Ready',
        label: 'Status',
        description: 'Full-stack system, beta-tested',
        color: 'gold',
      },
    ],
    screenshots: [
      '/images/withyou/maestro/tour-00-home.png',
      '/images/withyou/maestro/tour-01-connect.png',
      '/images/withyou/maestro/tour-02-gallery.png',
      '/images/withyou/maestro/tour-03-us.png',
      '/images/withyou/maestro/ci-00-home.png',
      '/images/withyou/maestro/ci-04-feeling-selected.png',
      '/images/withyou/maestro/hms-01-input.png',
      '/images/withyou/maestro/hms-03-output.png',
    ],
    demoUrl: undefined,
    codeUrl: 'https://github.com/Epetaway/WithYou',
    repo: 'WithYou',
  },
  'patient-portal-demo': {
    slug: 'patient-portal-demo',
    title: 'Patient Engagement Portal – Healthcare UI Demo',
    subtitle: 'Enterprise-grade patient portal with multi-step onboarding and accessible workflows',
    summary: 'A full patient portal demo with multi-step onboarding, dashboards, prescription flows, and interface patterns modeled after real healthcare portals.',
    overview: {
      description: 'This project demonstrates a complete patient engagement platform designed to mirror the complexity and accessibility requirements of enterprise healthcare systems. Built with WCAG 2.1 compliance in mind, it showcases multi-step registration, dashboard interfaces, prescription management, and appointment scheduling.',
      problem: 'Healthcare portals often struggle with balancing regulatory requirements, accessibility standards, and user experience. Patients need intuitive interfaces while healthcare providers need comprehensive data capture.',
      goals: [
        'Create WCAG 2.1 AA compliant user interfaces',
        'Implement multi-step forms with proper validation and error handling',
        'Design accessible dashboard patterns for health data visualization',
        'Demonstrate best practices for healthcare UI/UX',
      ],
    },
    role: [
      {
        title: 'Front-End Architecture',
        description: 'Designed component structure, state management patterns, and routing logic for SPA architecture',
      },
      {
        title: 'Accessibility & WCAG',
        description: 'Implemented comprehensive keyboard navigation, ARIA labels, and screen reader optimization',
      },
      {
        title: 'Form Engineering',
        description: 'Built multi-step registration flows with validation, error handling, and progress tracking',
      },
      {
        title: 'UI/UX Design',
        description: 'Created wireframes and high-fidelity mockups aligned with healthcare design patterns',
      },
    ],
    technical: {
      architecture: 'Single Page Application (SPA) with hash routing for GitHub Pages compatibility. Component-based architecture with modular, reusable form controls and data visualization widgets.',
      techStack: ['JavaScript', 'Bootstrap 5', 'SPA Architecture', 'WCAG 2.1'],
      approach: [
        {
          title: 'Component Design',
          description: 'Modular components following single responsibility principle with clear separation between presentation and logic',
        },
        {
          title: 'Accessibility First',
          description: 'Built with keyboard navigation, screen reader support, and proper ARIA attributes from the ground up',
        },
        {
          title: 'Progressive Enhancement',
          description: 'Core functionality works without JavaScript, enhanced features layer on top',
        },
      ],
    },
    outcomes: [
      {
        metric: '100%',
        label: 'WCAG 2.1 AA',
        description: 'Full accessibility compliance',
        color: 'blue',
      },
      {
        metric: '95+',
        label: 'Lighthouse Score',
        description: 'Performance & best practices',
        color: 'green',
      },
      {
        metric: '< 500ms',
        label: 'Load Time',
        description: 'First contentful paint',
        color: 'gold',
      },
    ],
    demoUrl: 'https://epetaway.github.io/patient-portal-demo/#login',
    codeUrl: 'https://github.com/Epetaway/patient-portal-demo',
    repo: 'patient-portal-demo',
  },
  'mtg-proxy-generator': {
    slug: 'mtg-proxy-generator',
    title: 'MTG Proxy Generator – DOM Manipulation Showcase',
    subtitle: 'Interactive card composer demonstrating vanilla JavaScript proficiency',
    summary: 'Interactive card composer demonstrating vanilla JavaScript proficiency and dynamic rendering.',
    overview: {
      description: 'A lightweight, client-side utility for creating custom Magic: The Gathering proxy cards. Built entirely with vanilla JavaScript, it showcases strong DOM manipulation skills, performant rendering without frameworks, and creative use of the HTML5 Canvas API.',
      problem: 'Players need custom cards for playtesting and casual formats, but existing tools are often bloated, require server-side processing, or have limited customization options.',
      goals: [
        'Create a zero-dependency, client-side solution',
        'Demonstrate vanilla JavaScript proficiency',
        'Implement performant Canvas rendering',
        'Provide intuitive customization interface',
      ],
    },
    role: [
      {
        title: 'Front-End Development',
        description: 'Built entire application using vanilla JavaScript with no framework dependencies',
      },
      {
        title: 'Canvas Engineering',
        description: 'Implemented complex rendering logic using HTML5 Canvas API for high-quality output',
      },
      {
        title: 'DOM Manipulation',
        description: 'Created dynamic, responsive interface with efficient DOM updates and event handling',
      },
      {
        title: 'State Management',
        description: 'Implemented custom state management using LocalStorage for persistence',
      },
    ],
    technical: {
      architecture: 'Pure vanilla JavaScript application with no build tools or frameworks. Uses HTML5 Canvas for rendering, LocalStorage for state persistence, and CSS3 for styling. Fully client-side with no server dependencies.',
      techStack: ['Vanilla JavaScript', 'HTML5 Canvas', 'CSS3', 'LocalStorage API'],
      approach: [
        {
          title: 'Zero Dependencies',
          description: 'No frameworks or libraries - showcases core JavaScript competency',
        },
        {
          title: 'Canvas Rendering',
          description: 'High-performance Canvas API usage for complex graphics rendering',
        },
        {
          title: 'Event-Driven Architecture',
          description: 'Efficient event handling with delegation and debouncing for smooth UX',
        },
      ],
    },
    outcomes: [
      {
        metric: '< 50KB',
        label: 'Bundle Size',
        description: 'Extremely lightweight',
        color: 'blue',
      },
      {
        metric: '100%',
        label: 'Client-Side',
        description: 'No server required',
        color: 'green',
      },
      {
        metric: 'Zero',
        label: 'Dependencies',
        description: 'Pure vanilla JavaScript',
        color: 'gold',
      },
    ],
    demoUrl: 'https://epetaway.github.io/mtg-proxy-generator/',
    codeUrl: 'https://github.com/Epetaway/mtg-proxy-generator',
    repo: 'mtg-proxy-generator',
  },
  'gundam-forge': {
    slug: 'gundam-forge',
    title: 'Gundam Forge',
    subtitle: 'Competitive deck-building and playtest simulator for the Gundam Card Game',
    summary: 'A full-stack, statically-exported web platform for competitive Gundam Card Game players with deck building, 471+ card browser, playtest simulator with AI, and live meta standings.',
    overview: {
      description: 'Gundam Forge is a competitive toolkit for Gundam Card Game players with deck builder, card browser, playtest simulator, and live meta dashboard.',
      problem: 'No existing GCG deck building tools with a rules-accurate engine and meta data integration.',
      goals: [
        'Build a rules-accurate game engine implementing GCG Comprehensive Rules v1.5.0',
        'Create a zero-latency static platform with 241 prerendered routes',
        'Integrate live tournament meta data from Limitless TCG',
      ],
    },
    role: [
      {
        title: 'Full-Stack Developer',
        description: 'Designed and built complete platform from game engine to UI',
      },
      {
        title: 'Systems Designer',
        description: 'Created purpose-built design system and monorepo architecture',
      },
    ],
    technical: {
      architecture: 'Static-export Next.js monorepo with shared packages for game engine, design system, and utilities. All filtering, search, and meta ranking run 100% client-side on GitHub Pages.',
      techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS v4', 'Radix UI', 'dnd-kit', 'Vitest'],
      approach: [
        {
          title: 'Rules-Compliant Game Engine',
          description: 'Implemented official GCG phase flow, shield mechanics, keywords in TypeScript',
        },
        {
          title: 'Static-First Architecture',
          description: 'Zero backend - all 471+ cards and meta data prerendered at build time',
        },
        {
          title: 'Design System',
          description: 'Token-based design with Orbitron/Exo 2 fonts and cobalt-navy palette',
        },
      ],
    },
    outcomes: [
      {
        metric: '471+',
        label: 'Cards',
        description: 'Full GCG database with keywords and legality',
        color: 'blue',
      },
      {
        metric: '241',
        label: 'Static Routes',
        description: 'All routes prerendered at build time',
        color: 'green',
      },
      {
        metric: '0',
        label: 'TypeScript Errors',
        description: 'Strict mode across monorepo',
        color: 'gold',
      },
    ],
    demoUrl: undefined,
    codeUrl: 'https://github.com/Epetaway/Gundam-Forge',
    repo: 'Gundam-Forge',
  },
  'dojonet': {
    slug: 'dojonet',
    title: 'DojoNet',
    subtitle: 'A local-first martial arts social platform with event discovery, partner matchmaking, training journals, and customizable profiles.',
    summary: 'DojoNet is a front-end-heavy martial arts community prototype combining social feed patterns, journal workflows, event discovery, and partner matchmaking in one responsive web experience.',
    overview: {
      description: 'DojoNet is a martial arts social network prototype built around community, training identity, and discovery. It supports customizable profiles, social posting, forums, event exploration, training journals, notifications, direct messaging, and a safety-aware partner matching system.',
      problem: 'Generic social products do not capture martial arts identity such as belt rank, discipline, gym affiliation, and training goals — and finding training partners requires stronger safety controls than existing platforms provide.',
      goals: [
        'Bring expressive identity tools (theme presets, Dojo Circle, rank context) into a martial arts social context',
        'Combine event discovery, partner matchmaking, and messaging with safety-first age-gating and moderation',
        'Validate a production-grade social product surface using only local-first persistence',
      ],
    },
    role: [
      {
        title: 'Lead UI Engineer',
        description: 'Built the complete React + Vite + Tailwind application with Zustand state management and Framer Motion animations across all feature surfaces.',
      },
      {
        title: 'UI/UX Designer',
        description: 'Designed the full DojoNet UI system including the Dojo Red token palette, Bebas Neue display typography, component atoms, and profile theme presets.',
      },
    ],
    technical: {
      architecture: 'Local-first React SPA using Vite for builds, Zustand for persisted demo state, and Framer Motion for interaction polish. Optional Express/Prisma backend path is architecturally documented for future multi-device sync.',
      techStack: ['React', 'Vite', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'Express', 'Prisma', 'PostgreSQL'],
      approach: [
        {
          title: 'Local-First Persistence',
          description: 'Seeded demo data and bot users allow full feature exploration without a running backend.',
        },
        {
          title: 'Safety-First Partner Matching',
          description: 'Age-gating, moderation hooks, and verification cues are enforced in filtering logic, not just UI copy.',
        },
        {
          title: 'Token-Based Design System',
          description: 'CSS custom properties drive light mode, dark mode, and four profile theme presets from a single token layer.',
        },
      ],
    },
    outcomes: [
      {
        metric: '11',
        label: 'Seeded demo users',
        description: 'Interconnected bot community with varied ranks, themes, and gyms',
        color: 'blue',
      },
      {
        metric: '4',
        label: 'Profile theme presets',
        description: 'Default, Tatami, Iron, and Neon with dynamic gradients',
        color: 'green',
      },
      {
        metric: '6',
        label: 'Feature surfaces',
        description: 'Feed, events, partners, journals, messaging, and forums',
        color: 'gold',
      },
    ],
    demoUrl: 'https://epetaway.github.io/DojoNet-Prototype-MAX/#/dashboard',
    prototype: {
      url: 'https://epetaway.github.io/DojoNet-Prototype-MAX/#/dashboard',
      label: 'Launch Interactive Prototype',
      description: 'A fully functional local-first prototype with seeded demo data — browse the feed, partner matchmaking, training journals, event discovery, and messaging without any backend.',
    },
    codeUrl: 'https://github.com/Epetaway/DojoNet-Prototype-MAX',
    repo: 'DojoNet-Prototype-MAX',
  },
};

function normalizeSlug(value: string): string {
  return value.trim().toLowerCase();
}

function buildSlugIndex(): Map<string, string> {
  const index = new Map<string, string>();

  for (const [key, caseStudy] of Object.entries(caseStudyData)) {
    const variants = [
      key,
      caseStudy.slug,
      caseStudy.repo,
      caseStudy.title,
    ];

    for (const variant of variants) {
      index.set(normalizeSlug(variant), key);
    }
  }

  return index;
}

const caseStudySlugIndex = buildSlugIndex();

export function resolveCaseStudySlug(slug: string): string | undefined {
  const exact = caseStudyData[slug];
  if (exact) {
    return exact.slug;
  }

  const canonicalKey = caseStudySlugIndex.get(normalizeSlug(slug));
  if (!canonicalKey) {
    return undefined;
  }

  return caseStudyData[canonicalKey]?.slug;
}

/**
 * Get case study data by slug
 */
export function getCaseStudy(slug: string): ProjectCaseStudy | undefined {
  const canonicalSlug = resolveCaseStudySlug(slug);
  return canonicalSlug ? caseStudyData[canonicalSlug] : undefined;
}

/**
 * Check if a project has case study data
 */
export function hasCaseStudy(slug: string): boolean {
  return Boolean(resolveCaseStudySlug(slug));
}

/**
 * Get all case study slugs
 */
export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudyData);
}
