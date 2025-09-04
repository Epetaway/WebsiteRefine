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
}

export const projects: Project[] = [
  {
    id: "employee-directory",
    title: "Employee Directory – Multi-API Aggregation",
    description: "Transforming API chaos into a streamlined, accessible directory experience.",
    problem:
      "Multiple API sources (Twitter, IMDB, Wikipedia) with inconsistent schemas, slow sequential fetches (2.1s TTI), and confusing search UI causing user frustration.",
    solution:
      "Built normalized data adapters, implemented React Suspense patterns, added skeleton loading states, and comprehensive keyboard navigation with proper ARIA labels.",
    result:
      "44% faster TTI (2.1s → 1.2s), inline error handling, 2× faster profile discovery, and WCAG AA compliance achieved.",
    stack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS"],
    features: [
      "Concurrent API fetching",
      "Real-time search with debouncing",
      "Skeleton loading states",
      "Error boundaries & fallbacks",
      "Keyboard navigation",
      "Mobile-first responsive"
    ],
    metrics: [
      { label: "Time to Interactive", value: "1.2s", improvement: "44% ↓" },
      { label: "Lighthouse (Perf)", value: "93", improvement: "+25 pts" },
      { label: "Accessibility", value: "WCAG 2.1 AA", improvement: "Keyboard + SR flows" }
    ],
    links: {
      repo: "https://github.com/Epetaway/employee-directory"
    },
    category: "featured"
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
