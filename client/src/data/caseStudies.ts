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
};

/**
 * Get case study data by slug
 */
export function getCaseStudy(slug: string): ProjectCaseStudy | undefined {
  return caseStudyData[slug];
}

/**
 * Check if a project has case study data
 */
export function hasCaseStudy(slug: string): boolean {
  return slug in caseStudyData;
}

/**
 * Get all case study slugs
 */
export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudyData);
}
