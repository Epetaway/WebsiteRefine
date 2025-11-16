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
}

export const projects: Project[] = [
  {
    id: "healthcare-portal-ui-redesign",
    slug: "healthcare-portal-ui-redesign",
    title: "Healthcare Portal UI Redesign",
    role: "Front-End Developer",
    description: "Modernized a patient-facing healthcare portal using Angular and TypeScript, improving accessibility, UI consistency, and performance across key user flows.",
    summary: "Modernized a patient-facing healthcare portal using Angular and TypeScript, improving accessibility, UI consistency, and performance across key user flows.",
    problem: "Inconsistent UI components, accessibility gaps (labels, contrast, keyboard nav), mobile layout issues, and slow initial load times were affecting user experience.",
    solution: "Built reusable Angular components, implemented WCAG 2.1 improvements, optimized bundle loading, and created responsive layouts with proper semantic HTML and ARIA labels.",
    result: "Improved Lighthouse accessibility scores by 18 points, reduced bounce rate by 15%, and created a more maintainable codebase with standardized UI patterns.",
    stack: ["Angular", "TypeScript", "RxJS", "SCSS", "WCAG 2.1"],
    tags: ["Angular", "TypeScript", "WCAG", "Performance", "RxJS"],
    features: [
      "Reusable Angular components",
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
      demo: "https://healthcare-portal-demo.vercel.app",
      repo: "https://github.com/your-username/healthcare-portal-ui-angular"
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
    stack: ["React", "JavaScript", "SCSS", "A/B Testing", "Analytics"],
    tags: ["React", "JavaScript", "A/B Testing", "Analytics"],
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
      demo: "https://landing-system-demo.vercel.app",
      repo: "https://github.com/your-username/react-landing-page-system"
    },
    category: "featured"
  },
  {
    id: "wordpress-donation-plugin",
    slug: "wordpress-donation-plugin",
    title: "WordPress Donation Plugin",
    role: "Front-End Developer",
    description: "Created a custom WordPress plugin for non-profit campaigns, featuring an admin UI for managing goals and a front-end donation progress display.",
    summary: "Created a custom WordPress plugin for non-profit campaigns, featuring an admin UI for managing goals and a front-end donation progress display.",
    problem: "No reusable donation UI, non-technical users couldn't manage campaign data, and needed mobile-friendly donation progress displays for various campaigns.",
    solution: "Built custom post type 'Campaign', created admin meta boxes for goal/current amounts, and developed shortcode for front-end progress bars with clean, modern styling.",
    result: "Enabled non-technical staff to manage campaigns independently, created consistent donation UI across site, and improved mobile donation experience.",
    stack: ["WordPress", "PHP", "JavaScript", "SCSS"],
    tags: ["WordPress", "PHP", "Custom Plugin", "UI"],
    features: [
      "Custom post type",
      "Admin meta boxes",
      "Front-end shortcode",
      "Progress visualization",
      "Mobile-responsive"
    ],
    metrics: [
      { label: "Campaign Management", value: "Self-service", improvement: "Non-technical users" },
      { label: "Mobile Experience", value: "Optimized", improvement: "Responsive design" },
      { label: "UI Consistency", value: "Standardized", improvement: "Across campaigns" }
    ],
    links: {
      demo: "https://donation-plugin-demo.vercel.app",
      repo: "https://github.com/your-username/wp-donation-plugin-demo"
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
