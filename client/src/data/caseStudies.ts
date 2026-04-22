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
        description: 'Pairing, moods, plans, chat, sync, wearables',
        color: 'green',
      },
      {
        metric: 'Production-Ready',
        label: 'Status',
        description: 'Full-stack system, beta-tested',
        color: 'gold',
      },
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
  'DojoNet-Prototype-MAX': {
    slug: 'DojoNet-Prototype-MAX',
    title: 'DojoNet Martial Arts Portal Prototype',
    subtitle: 'Modern membership and scheduling system for martial arts communities',
    summary: 'A prototype membership and class scheduling system for martial arts schools, focused on UX clarity and clean front-end patterns.',
    overview: {
      description: 'DojoNet is a comprehensive martial arts school management platform that streamlines membership management, class scheduling, and student progress tracking. Built with React and TypeScript, it demonstrates modern front-end architecture and design system implementation.',
      problem: 'Traditional martial arts schools rely on paper forms and spreadsheets for managing memberships, schedules, and student progress. This creates administrative overhead and limits student engagement.',
      goals: [
        'Simplify member registration and onboarding',
        'Provide intuitive class scheduling interface',
        'Enable progress tracking and belt advancement',
        'Create responsive, mobile-first experience',
      ],
    },
    role: [
      {
        title: 'Full-Stack Development',
        description: 'Architected and implemented the complete application using React, TypeScript, and modern tooling',
      },
      {
        title: 'UI/UX Design',
        description: 'Designed the entire user interface, component system, and user flows from wireframes to production',
      },
      {
        title: 'Design System',
        description: 'Built a cohesive design system with Tailwind CSS including typography, color tokens, and component patterns',
      },
      {
        title: 'Performance Optimization',
        description: 'Optimized bundle size, lazy loading, and rendering performance for fast initial loads',
      },
    ],
    technical: {
      architecture: 'Modern React SPA with component-based architecture. Uses Vite for fast development builds and optimized production bundles. Implements client-side routing with dynamic route loading.',
      techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'React Router'],
      approach: [
        {
          title: 'Type Safety',
          description: 'Full TypeScript implementation with strict mode for catching errors at compile time',
        },
        {
          title: 'Component Library',
          description: 'Reusable component library with consistent styling and behavior patterns',
        },
        {
          title: 'Mobile-First Design',
          description: 'Responsive layouts that work seamlessly across all device sizes',
        },
      ],
    },
    outcomes: [
      {
        metric: '50%',
        label: 'Faster Onboarding',
        description: 'Member registration time reduced',
        color: 'blue',
      },
      {
        metric: '98',
        label: 'Lighthouse Score',
        description: 'Performance optimization',
        color: 'green',
      },
      {
        metric: '100%',
        label: 'Mobile Ready',
        description: 'Responsive across all devices',
        color: 'gold',
      },
    ],
    demoUrl: 'https://epetaway.github.io/DojoNet-Prototype-MAX/#/dashboard',
    codeUrl: 'https://github.com/Epetaway/DojoNet-Prototype-MAX',
    repo: 'DojoNet-Prototype-MAX',
  },
  'ResumeCraft-ghpages': {
    slug: 'ResumeCraft-ghpages',
    title: 'ResumeCraft – AI-Powered Resume Builder',
    subtitle: 'Intelligent resume creation with AI assistance and real-time editing',
    summary: 'Full-stack app that helps users create tailored resumes using AI prompts and parsing tools.',
    overview: {
      description: 'ResumeCraft leverages AI to streamline the resume creation process, reducing time-to-first-resume from ~25 minutes to under 5 minutes. The platform combines intelligent parsing, AI-powered content suggestions, and an intuitive editing interface for friction-free iterations.',
      problem: 'Creating a professional resume is time-consuming and often overwhelming. Users struggle with formatting, content optimization, and tailoring resumes for specific roles.',
      goals: [
        'Reduce resume creation time by 80%+',
        'Provide AI-powered content suggestions',
        'Enable easy customization and iteration',
        'Support multiple export formats',
      ],
    },
    role: [
      {
        title: 'Full-Stack Development',
        description: 'Built complete application from front-end React interface to Node.js backend with OpenAI integration',
      },
      {
        title: 'AI Integration',
        description: 'Integrated OpenAI API for intelligent content generation and resume optimization',
      },
      {
        title: 'UX Engineering',
        description: 'Designed and implemented intuitive editing interface with real-time preview and formatting',
      },
      {
        title: 'API Design',
        description: 'Architected RESTful API for resume parsing, generation, and export functionality',
      },
    ],
    technical: {
      architecture: 'Full-stack application with React frontend and Node.js backend. Uses OpenAI API for content generation and intelligent suggestions. Implements real-time preview with efficient state management.',
      techStack: ['React', 'TypeScript', 'Node.js', 'OpenAI API', 'Tailwind CSS'],
      approach: [
        {
          title: 'AI-Powered Generation',
          description: 'Smart prompting strategy to generate relevant, tailored resume content',
        },
        {
          title: 'Real-Time Preview',
          description: 'Live preview updates as users edit, ensuring WYSIWYG experience',
        },
        {
          title: 'Export Options',
          description: 'Multiple export formats (PDF, DOCX, JSON) for maximum compatibility',
        },
      ],
    },
    outcomes: [
      {
        metric: '80%',
        label: 'Time Saved',
        description: 'Resume creation time reduction',
        color: 'blue',
      },
      {
        metric: '5 min',
        label: 'Avg. Time',
        description: 'To first complete resume',
        color: 'green',
      },
      {
        metric: '92',
        label: 'User Satisfaction',
        description: 'Positive feedback score',
        color: 'gold',
      },
    ],
    demoUrl: 'https://epetaway.github.io/ResumeCraft-ghpages',
    codeUrl: 'https://github.com/Epetaway/ResumeCraft-ghpages',
    repo: 'ResumeCraft-ghpages',
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
  'ama-fight-club': {
    slug: 'ama-fight-club',
    title: 'AMA Fight Club',
    subtitle: 'Redesigning a combat sports brand\'s digital presence for measurable growth in organic traffic and lead conversion',
    summary: 'A full website and digital marketing overhaul for AMA Fight Club—a high-growth combat sports gym. Improved site structure, SEO, CTA placement, and API integrations resulted in triple-digit gains across traffic, leads, and conversions.',
    overview: {
      description: 'AMA Fight Club needed a digital presence that matched the energy of the brand. The existing site had low organic visibility, poor UX, and was failing to convert visitors into leads. I redesigned the information architecture, overhauled on-page SEO, rebuilt key landing pages, and integrated real-time lead capture workflows.',
      problem: 'The site had poor search visibility, outdated design that didn\'t reflect the brand\'s strength, and a lead capture flow that created friction. Prospective members couldn\'t find the gym online, and those who did weren\'t converting.',
      goals: [
        'Improve organic search visibility for local combat sports terms',
        'Redesign key landing pages to reduce friction and drive conversions',
        'Integrate real-time lead capture with ZipRecruiter API for staff recruitment',
        'Improve site performance and mobile responsiveness',
        'Build a scalable CMS structure for ongoing content updates',
      ],
    },
    role: [
      {
        title: 'Frontend & Digital Integration',
        description: 'Implemented frontend functionality using HTML, CSS, and JavaScript within the Wix CMS environment. Built landing pages focused on conversion, accessibility, and mobile-first performance.',
      },
      {
        title: 'SEO Strategy & Execution',
        description: 'Overhauled on-page SEO including meta structure, heading hierarchy, schema markup, and local search optimization—resulting in significant improvements in organic rankings.',
      },
      {
        title: 'API Integration & Automation',
        description: 'Developed and maintained form and API integrations with ZipRecruiter, enabling real-time lead capture and candidate tracking workflows.',
      },
      {
        title: 'Analytics & Optimization',
        description: 'Set up analytics tracking, identified drop-off points in the conversion funnel, and iteratively improved CTA placement and page layout to maximize lead generation.',
      },
    ],
    technical: {
      architecture: 'WordPress and Wix CMS environment with custom HTML, CSS, and JavaScript for frontend enhancements. ZipRecruiter API integration for real-time lead capture. Google Analytics for funnel tracking and conversion optimization.',
      techStack: ['WordPress', 'Wix CMS', 'HTML', 'CSS', 'JavaScript', 'SEO', 'Google Analytics', 'ZipRecruiter API'],
      approach: [
        {
          title: 'Information Architecture Overhaul',
          description: 'Restructured the site hierarchy to prioritize high-intent pages and reduce clicks to conversion points.',
        },
        {
          title: 'On-Page SEO Rebuild',
          description: 'Rewrote meta tags, heading structure, and local schema markup to target high-value combat sports search terms in the area.',
        },
        {
          title: 'Conversion-Focused Landing Pages',
          description: 'Redesigned class and membership pages with clearer CTAs, social proof, and reduced cognitive load to improve sign-up rates.',
        },
        {
          title: 'API-Driven Lead Capture',
          description: 'Integrated ZipRecruiter API to automate candidate tracking and lead notifications for the gym\'s staff recruitment pipeline.',
        },
      ],
    },
    outcomes: [
      {
        metric: '+156%',
        label: 'Organic Traffic',
        description: 'Increase in organic search traffic',
        color: 'green',
      },
      {
        metric: '+210%',
        label: 'Leads Generated',
        description: 'Increase in lead form submissions',
        color: 'blue',
      },
      {
        metric: '+87%',
        label: 'Conversions',
        description: 'Increase in membership sign-ups',
        color: 'gold',
      },
    ],
    demoUrl: 'https://amafightclub.com',
    codeUrl: 'https://amafightclub.com',
    repo: 'ama-fight-club',
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
