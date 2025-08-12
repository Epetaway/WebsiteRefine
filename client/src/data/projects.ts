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
    problem: "Multiple API sources (Twitter, IMDB, Wikipedia) with inconsistent schemas, slow sequential fetches (2.1s TTI), and confusing search UI causing user frustration.",
    solution: "Built normalized data adapters, implemented React Suspense patterns, added skeleton loading states, and comprehensive keyboard navigation with proper ARIA labels.",
    result: "44% faster TTI (2.1s → 1.2s), inline error handling, 2× faster profile discovery, and WCAG AA compliance achieved.",
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
      { label: "Lighthouse Score", value: "93", improvement: "+25 points" },
      { label: "Accessibility", value: "WCAG AA", improvement: "100% compliant" }
    ],
    links: {
      demo: "https://employee-directory.ehicksonjr.com",
      repo: "https://github.com/ehicksonjr/employee-directory"
    },
    category: 'featured'
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website – Full-Stack Implementation",
    description: "Modern engineering portfolio showcasing responsive design, performance optimization, and personal branding.",
    problem: "Create a memorable portfolio that balances technical depth with visual appeal and loads fast on all devices.",
    solution: "Next.js 14 with dynamic metadata, Tailwind for design systems, OG image generation, and comprehensive SEO optimization.",
    result: "95+ Lighthouse score, sub-1s load time, improved conversion rate for project inquiries.",
    stack: ["Next.js 14", "Tailwind CSS", "Framer Motion", "Vercel"],
    features: [
      "Dynamic OG image generation",
      "Design system architecture", 
      "Performance optimization",
      "SEO optimization",
      "Responsive design",
      "Contact form integration"
    ],
    links: {
      demo: "https://www.ehicksonjr.com",
      repo: "https://github.com/ehicksonjr/portfolio"
    },
    category: 'development'
  },
  {
    id: "mtg-proxy-generator",
    title: "MTG Proxy Generator – DOM Manipulation Showcase",
    description: "Interactive card generation tool demonstrating vanilla JavaScript proficiency and dynamic content rendering.",
    problem: "Magic: The Gathering players needed a tool to create proxy cards for testing decks before purchasing expensive cards.",
    solution: "Pure JavaScript DOM manipulation, form validation, image processing, and local storage implementation with real-time preview capabilities.",
    result: "Clean demonstration of JavaScript fundamentals, event handling optimization, and performance without frameworks.",
    stack: ["Vanilla JavaScript", "HTML5 Canvas", "CSS3", "LocalStorage"],
    features: [
      "Event delegation patterns",
      "Canvas API integration",
      "LocalStorage persistence",
      "Form validation logic",
      "Responsive CSS Grid",
      "Performance profiling"
    ],
    links: {
      demo: "https://mtg-proxy.ehicksonjr.com",
      repo: "https://github.com/ehicksonjr/mtg-proxy-generator"
    },
    category: 'development'
  },
  {
    id: "todo-list-app",
    title: "Todo List App",
    description: "React hooks, state management, local persistence with clean UI implementation.",
    problem: "Create a task management solution that demonstrates modern React patterns and state management.",
    solution: "React hooks for state management, localStorage for persistence, and clean component architecture.",
    result: "Demonstrates mastery of React fundamentals and modern development patterns.",
    stack: ["React", "JavaScript", "CSS3"],
    features: [
      "React hooks pattern",
      "Local state management", 
      "Data persistence",
      "Component composition",
      "Responsive design"
    ],
    links: {
      demo: "https://todo.ehicksonjr.com",
      repo: "https://github.com/ehicksonjr/react-todo"
    },
    category: 'development'
  },
  {
    id: "movie-rating-app",
    title: "Movie Rating App",
    description: "Vanilla JavaScript for Marvel movie ratings with form handling and user interactions.",
    problem: "Demonstrate vanilla JavaScript proficiency through interactive form handling and user input validation.",
    solution: "DOM manipulation, form validation, local storage, and dynamic UI updates without framework dependencies.",
    result: "Clean implementation showcasing JavaScript fundamentals and DOM API mastery.",
    stack: ["JavaScript", "HTML", "CSS"],
    features: [
      "Form validation",
      "DOM manipulation",
      "Event handling",
      "Local storage",
      "Responsive layout"
    ],
    links: {
      demo: "https://movie-rating.ehicksonjr.com",
      repo: "https://github.com/ehicksonjr/movie-rating-app"
    },
    category: 'development'
  },
  {
    id: "game-show-app",
    title: "Game Show App",
    description: "Browser-based \"Wheel of Success\" word guessing game with dynamic UI rendering.",
    problem: "Create an engaging word-guessing game that demonstrates game logic implementation and state management.",
    solution: "Vanilla JavaScript for game logic, DOM manipulation for UI updates, and CSS animations for user feedback.",
    result: "Interactive game demonstrating complex state management and user experience design.",
    stack: ["JavaScript", "HTML", "CSS"],
    features: [
      "Game state management",
      "Dynamic UI rendering",
      "CSS animations",
      "Event listeners",
      "Logic flow control"
    ],
    links: {
      demo: "https://wheel-of-success.ehicksonjr.com",
      repo: "https://github.com/ehicksonjr/game-show-app"
    },
    category: 'development'
  }
];
