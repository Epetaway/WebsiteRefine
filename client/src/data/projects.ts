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
}

// Resume file path constant for consistency
export const RESUME_PATH = "/assets/Earl_Hickson_Jr_FrontEnd_Engineer.docx";

export const projects: Project[] = [
  {
    id: "patient-engagement-portal",
    slug: "patient-engagement-portal",
    title: "Patient Engagement Portal – Healthcare UI Demo",
    role: "Front-End Developer",
    category: "featured",
    description: "A full patient portal demo with multi-step onboarding, dashboards, prescription flows, and interface patterns modeled after real healthcare portals.",
    summary: "Enterprise-style patient portal demo with multi-step registration, dashboards, and accessible form workflows based on real healthcare patterns.",
    problem: "Healthcare portals need complex multi-step workflows, session-style authentication, responsive dashboards, and WCAG-compliant interfaces without overengineered frameworks.",
    solution: "Built a lightweight SPA using ES6+ modules with an MVC-inspired controller/service architecture. Implemented modular components, localStorage-based state, History API routing, and comprehensive WCAG compliance patterns.",
    result: "Delivered a production-ready demo that demonstrates scalable front-end patterns, accessible form handling, and real-world healthcare UI workflows.",
    stack: ["JavaScript (ES6+)", "Bootstrap 5", "SPA Architecture", "Form Validation", "Responsive UI", "WCAG 2.1"],
    tags: ["JavaScript", "Bootstrap", "Accessibility", "Healthcare", "SPA"],
    devNotes: "Vanilla JavaScript (ES6 modules), Bootstrap, custom validation system, multi-step form flows, localStorage-backed state, SPA-style routing.",
    features: [
      "4-step registration wizard with validation + persistent form state",
      "Session-style login & protected routing system",
      "Modular dashboard with prescriptions, status cards, and quick actions",
      "Refill workflow with confirmation and toast notifications",
      "Profile + consent pages with accessible, WCAG-friendly form elements",
      "Information request submission & tracking",
      "Bootstrap-based responsive layout with custom healthcare theme",
      "SPA routing using History API with hash fallback support",
      "CI/CD deployment to GitHub Pages"
    ],
    metrics: [
      { label: "Accessibility", value: "WCAG 2.1 AA", improvement: "Compliant" },
      { label: "Architecture", value: "MVC-inspired", improvement: "Scalable" },
      { label: "Responsiveness", value: "Mobile-first", improvement: "All devices" }
    ],
    links: {
      demo: "https://epetaway.github.io/patient-portal-demo/#login",
      repo: "https://github.com/epetaway/patient-portal-demo"
    }
  },
  {
    id: "healthcare-portal-ui-redesign",
    slug: "patient-engagement-portal",
    title: "Healthcare Portal UI Redesign",
    role: "Front-End Developer",
    description: "Modernized a patient-facing healthcare portal using modern JavaScript patterns, improving accessibility, UI consistency, and performance across key user flows.",
    summary: "Modernized a patient-facing healthcare portal using modern JavaScript patterns, improving accessibility, UI consistency, and performance across key user flows.",
    problem: "Inconsistent UI components, accessibility gaps (labels, contrast, keyboard nav), mobile layout issues, and slow initial load times were affecting user experience.",
    solution: "Built reusable components, implemented WCAG 2.1 improvements, optimized bundle loading, and created responsive layouts with proper semantic HTML and ARIA labels.",
    result: "Improved Lighthouse accessibility scores by 18 points, reduced bounce rate by 15%, and created a more maintainable codebase with standardized UI patterns.",
    stack: ["JavaScript (ES6+)", "Bootstrap 5", "SPA Architecture", "WCAG 2.1"],
    tags: ["JavaScript", "Bootstrap", "WCAG", "Performance", "Healthcare"],
    features: [
      "Reusable UI components",
      "WCAG 2.1 AA compliance",
      "Responsive layouts",
      "Performance optimization",
      "Semantic HTML and ARIA"
    ],
    metrics: [
      { label: "Accessibility Score", value: "+18 pts", improvement: "Lighthouse" },
      { label: "Bounce Rate", value: "15%", improvement: "Reduction" },
      { label: "Mobile Performance", value: "Optimized", improvement: "Responsive" }
    ],
    links: {
      demo: "https://epetaway.github.io/patient-portal-demo/#login",
      repo: "https://github.com/epetaway/patient-portal-demo"
    },
    category: "featured"
  },
  {
    id: "marketing-landing-page-system",
    slug: "marketing-landing-page-system",
    title: "Marketing Landing Page System",
    role: "Front-End Developer",
    description: "Built a React-based component system for marketing landing pages, supporting A/B test variations, analytics insights, and faster page creation.",
    summary: "Built a React-based component system for marketing landing pages, supporting A/B test variations, analytics insights, and faster page creation.",
    problem: "Slow page creation process, no reusable components, need for A/B test variations, and lack of analytics insights were hindering marketing team efficiency.",
    solution: "Created a React component library with Hero, CTA, Feature Grid, and Form components. Implemented A/B testing support and structured analytics tracking.",
    result: "Reduced landing page build time by 60%, improved conversion rates through A/B testing, and provided marketing team with self-service page creation tools.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Analytics"],
    tags: ["React", "TypeScript", "Landing Pages", "Marketing"],
    features: [
      "Component library",
      "A/B test variations",
      "Analytics tracking",
      "Self-service creation",
      "Mobile optimization"
    ],
    metrics: [
      { label: "Build Time", value: "60%", improvement: "Faster" },
      { label: "Conversion Rate", value: "12%", improvement: "Increase" },
      { label: "A/B Testing", value: "Enabled", improvement: "Data-driven" }
    ],
    links: {
      demo: "/earldkaiju",
      repo: "https://github.com/Epetaway/WebsiteRefine"
    },
    category: "featured"
  },

  {
    id: "vue-react-microsites",
    slug: "vue-react-microsites",
    title: "Vue & React Microsites",
    role: "Front-End Developer",
    description: "Delivered fast, consistent microsite experiences in both Vue.js and React, ensuring brand consistency and responsiveness across devices.",
    summary: "Delivered fast, consistent microsite experiences in both Vue.js and React, ensuring brand consistency and responsiveness across devices.",
    problem: "Needed consistent design across different JavaScript frameworks, fast turnaround requirements, and performance optimization for mobile users.",
    solution: "Created matching microsites in Vue.js and React with shared design tokens, optimized performance, and ensured responsive layouts work consistently across frameworks.",
    result: "Demonstrated framework flexibility while maintaining design consistency, achieved fast load times, and delivered projects ahead of schedule.",
    stack: ["Vue.js", "React", "JavaScript", "Responsive Design"],
    tags: ["Vue.js", "React", "Responsive UI"],
    features: [
      "Cross-framework consistency",
      "Shared design tokens",
      "Performance optimization",
      "Mobile-first responsive",
      "Fast deployment"
    ],
    metrics: [
      { label: "Framework Flexibility", value: "Vue + React", improvement: "Consistent UX" },
      { label: "Load Performance", value: "Optimized", improvement: "Mobile-first" },
      { label: "Delivery Time", value: "Ahead of schedule", improvement: "Efficiency" }
    ],
    links: {
      demo: "https://microsites-demo.vercel.app",
      repo: "https://github.com/your-username/vue-react-microsites"
    },
    category: "featured"
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
    id: "healthcare-workflow-ux-demo",
    slug: "healthcare-workflow-ux-demo",
    title: "Healthcare Workflow UX Demo",
    role: "Front-End Developer",
    category: "featured",
    description: "A UI demo modeling secure, multi-step healthcare workflows with a focus on accessibility, semantics, and clear hierarchical structure.",
    summary: "A reconstructed healthcare workflow demo focused on secure UI, accessible multi-step tasks, and enterprise-ready UX patterns.",
    problem: "Healthcare workflows require secure, accessible interfaces with clear task flows and error handling.",
    solution: "Built accessible forms with ARIA integration, semantic HTML structure, and comprehensive error-state UX patterns.",
    result: "Delivered a demo showcasing enterprise-ready healthcare UX patterns with full accessibility compliance.",
    stack: ["HTML5", "CSS3", "JavaScript", "ARIA", "Semantic HTML"],
    tags: ["Healthcare", "UX", "Accessibility", "ARIA"],
    devNotes: "Accessible forms, ARIA integration, semantic HTML, error-state UX patterns.",
    features: [
      "Accessible multi-step forms",
      "ARIA integration for screen readers",
      "Semantic HTML structure",
      "Error-state UX patterns",
      "Secure UI patterns"
    ],
    metrics: [
      { label: "Accessibility", value: "WCAG 2.1 AA", improvement: "Compliant" },
      { label: "Semantics", value: "Full HTML5", improvement: "Screen reader friendly" }
    ],
    links: {
      repo: "#"
    }
  },

  {
    id: "resume-craft",
    title: "ResumeCraft – AI-Powered Resume Builder",
    description:
      "Full-stack app that helps users create tailored resumes using AI prompts and parsing tools.",
    problem:
      "Job seekers needed a faster way to generate targeted, properly formatted resumes without wrestling with templates or writing from scratch.",
    solution:
      "Shipped AI-driven text generation with edit-in-place, a parser that extracts skills/roles, and clean export to PDF/DOCX. Built a focused React UI with keyboard shortcuts and autosave.",
    result:
      "Cut time-to-first-resume from ~25 minutes to under 5; simplified editing and export for friction-free iterations.",
    stack: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "OpenAI API"],
    features: [
      "AI-generated content (role-aware prompts)",
      "Resume parsing & section management",
      "Autosave + keyboard shortcuts",
      "Theming & customizable templates",
      "PDF and DOCX export",
      "Responsive mobile-first design"
    ],
    metrics: [
      { label: "Time to First Draft", value: "< 5 min", improvement: "4–5× faster" },
      { label: "Export Success", value: "~99%", improvement: "Stability ↑" },
      { label: "Lighthouse (Perf)", value: "90–95", improvement: "+18 pts" }
    ],
    links: {
      demo: "https://epetaway.github.io/ResumeCraft-ghpages",
      repo: "https://github.com/Epetaway/ResumeCraft-ghpages"
    },
    category: "development"
  },

  {
    id: "portfolio-website",
    title: "Portfolio Website – Full-Stack Implementation",
    description:
      "Modern engineering portfolio showcasing responsive design, performance optimization, and clear personal branding.",
    problem:
      "Build a memorable portfolio that balances technical depth with visual clarity and loads fast on all devices.",
    solution:
      "Vite/React build with structured content, route-level SEO, `<Helmet>` meta, OG image coverage, and Tailwind-driven design tokens. Pruned dependencies and optimized images.",
    result:
      "95+ Lighthouse scores, sub-1s first load on desktop, and a clearer narrative that improves recruiter engagement.",
    stack: ["React 18", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    features: [
      "Route-level SEO & social cards",
      "Design-system tokens & components",
      "Image optimization & lazy-loading",
      "A11y passes for nav/landmarks",
      "Blog & case-study structure",
      "Contact & CTAs across pages"
    ],
    metrics: [
      { label: "Lighthouse (Perf)", value: "95–99", improvement: "+20 pts" },
      { label: "Initial Bundle", value: "< 350 KB", improvement: "Code-split" },
      { label: "First Contentful Paint", value: "~0.9s", improvement: "Consistent sub-1s (desktop)" }
    ],
    links: {
      demo: "https://www.ehicksonjr.com",
      repo: "https://github.com/Epetaway/WebsiteRefine"
    },
    category: "development"
  },

  {
    id: "mtg-proxy-generator",
    title: "MTG Proxy Generator – DOM Manipulation Showcase",
    description:
      "Interactive card composer demonstrating vanilla JavaScript proficiency and dynamic rendering.",
    problem:
      "Players wanted to prototype decks with quick proxy cards before committing to costly purchases.",
    solution:
      "Built a no-framework tool using the Canvas API for live previews, form validation, image compositing, and local storage for draft persistence.",
    result:
      "Lightweight utility that runs fully client-side, showcasing strong DOM skills and performant rendering without frameworks.",
    stack: ["Vanilla JavaScript", "HTML5 Canvas", "CSS3", "LocalStorage"],
    features: [
      "Canvas compositing pipeline",
      "Real-time preview & layout",
      "LocalStorage persistence",
      "Form validation & errors",
      "Responsive CSS Grid",
      "Keyboard shortcuts"
    ],
    metrics: [
      { label: "Bundle Size", value: "~0 KB runtime", improvement: "No framework" },
      { label: "Render Latency", value: "< 16 ms", improvement: "60 FPS preview" }
    ],
    links: {
      demo: "https://epetaway.github.io/mtg-proxy-generator/",
      repo: "https://github.com/Epetaway/mtg-proxy-generator"
    },
    category: "development"
  },

  {
    id: "movie-rating-app",
    title: "Movie Rating App",
    description:
      "Vanilla JavaScript app for rating Marvel movies with validated forms and persistent state.",
    problem:
      "Demonstrate robust JS fundamentals—form handling, validation, and state—without a framework.",
    solution:
      "DOM-driven UI with accessible forms, inline validation messages, and LocalStorage for ratings history; modular JS for clarity.",
    result:
      "Clear, framework-free implementation that highlights event handling, state, and semantic markup.",
    stack: ["JavaScript", "HTML", "CSS"],
    features: [
      "Accessible form patterns",
      "Inline validation & hints",
      "LocalStorage persistence",
      "Filter/sort interactions",
      "Responsive layout"
    ],
    metrics: [
      { label: "Lighthouse (A11y)", value: "100", improvement: "Form semantics" },
      { label: "JS Payload", value: "< 30 KB", improvement: "No deps" }
    ],
    links: {
      repo: "https://github.com/Epetaway/movie-rating-app"
    },
    category: "development"
  },

  {
    id: "game-show-app",
    title: "Game Show App",
    description:
      "Browser-based “Wheel of Success” word-guessing game with dynamic state, feedback, and animations.",
    problem:
      "Showcase state management and UX feedback loops in a single-page, framework-free game.",
    solution:
      "Built a state machine for rounds/guesses, animated transitions with CSS, and keyboard/gamepad input handling for accessibility.",
    result:
      "Interactive experience demonstrating logic flow, user feedback, and maintainable vanilla JS structure.",
    stack: ["JavaScript", "HTML", "CSS"],
    features: [
      "Finite-state game engine",
      "Dynamic UI rendering",
      "CSS animations & sounds",
      "Keyboard input & focus mgmt",
      "Score & streak logic"
    ],
    metrics: [
      { label: "Frame Budget", value: "< 16 ms", improvement: "Smooth animations" },
      { label: "Bundle", value: "≈ 25 KB", improvement: "Lean, no build step" }
    ],
    links: {
      demo: "https://epetaway.github.io/WHEEL-OF-SUCCESS/",
      repo: "https://github.com/Epetaway/game-show-app"
    },
    category: "development"
  }
];
