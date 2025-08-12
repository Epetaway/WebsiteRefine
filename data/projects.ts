export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  category: 'featured' | 'web-app' | 'component-library' | 'other';
  links: {
    demo?: string;
    repo?: string;
  };
}

export const projects: Project[] = [
  {
    id: 'employee-directory',
    title: 'Employee Directory Redesign',
    description: 'Complete redesign and performance optimization of a React-based employee directory serving 5,000+ users',
    problem: 'Legacy application had slow load times (2.1s TTI), poor accessibility compliance, and outdated UI patterns that hindered user productivity',
    solution: 'Implemented React 18 with Suspense, normalized API adapters, skeleton loading states, and comprehensive WCAG 2.1 compliance updates',
    result: '44% faster time-to-interactive, achieved AA accessibility compliance, and improved user satisfaction scores by 78%',
    stack: ['React 18', 'TypeScript', 'Styled Components', 'React Query', 'Jest'],
    category: 'featured',
    links: {
      demo: 'https://employee-directory-demo.vercel.app',
    }
  },
  {
    id: 'design-system',
    title: 'Component Library & Design System',
    description: 'Built and maintained a comprehensive design system used across 12+ applications in the organization',
    problem: 'Inconsistent UI patterns, duplicated code, and lengthy development cycles due to lack of standardized components',
    solution: 'Created a scalable component library with Storybook documentation, automated testing, and semantic versioning',
    result: 'Reduced development time by 40%, improved design consistency, and enabled faster feature delivery across teams',
    stack: ['React', 'TypeScript', 'Storybook', 'Rollup', 'Chromatic'],
    category: 'component-library',
    links: {
      demo: 'https://design-system-storybook.vercel.app',
      repo: 'https://github.com/company/design-system'
    }
  },
  {
    id: 'analytics-dashboard',
    title: 'Real-time Analytics Dashboard',
    description: 'Interactive dashboard displaying real-time business metrics with customizable widgets and data visualization',
    problem: 'Stakeholders needed real-time insights but existing tools were slow and lacked customization options',
    solution: 'Built with Next.js and D3.js for dynamic charts, implemented WebSocket connections for live data, and created drag-and-drop dashboard builder',
    result: 'Enabled real-time decision making, reduced report generation time from hours to seconds, and improved data accessibility',
    stack: ['Next.js', 'D3.js', 'WebSockets', 'PostgreSQL', 'Vercel'],
    category: 'web-app',
    links: {
      demo: 'https://analytics-dashboard-demo.vercel.app'
    }
  },
  {
    id: 'e-commerce-platform',
    title: 'E-commerce Platform Frontend',
    description: 'High-performance e-commerce frontend with advanced filtering, search, and checkout optimization',
    problem: 'Previous platform had high cart abandonment rates and poor mobile experience affecting conversion rates',
    solution: 'Implemented progressive web app features, optimized checkout flow, and added advanced product filtering with search functionality',
    result: '25% increase in conversion rates, 60% improvement in mobile performance scores, and reduced cart abandonment by 35%',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Stripe', 'Algolia'],
    category: 'web-app',
    links: {
      demo: 'https://ecommerce-demo.vercel.app'
    }
  },
  {
    id: 'accessibility-audit-tool',
    title: 'Accessibility Audit Automation',
    description: 'Browser extension and CLI tool for automated accessibility testing integrated into CI/CD pipelines',
    problem: 'Manual accessibility testing was time-consuming and often missed in development cycles',
    solution: 'Created automated testing suite with axe-core integration, custom rule sets, and detailed reporting dashboards',
    result: 'Reduced accessibility issues in production by 85%, enabled continuous compliance monitoring, and improved team awareness',
    stack: ['JavaScript', 'Node.js', 'axe-core', 'Playwright', 'GitHub Actions'],
    category: 'other',
    links: {
      repo: 'https://github.com/company/a11y-audit-tool'
    }
  },
  {
    id: 'video-streaming-ui',
    title: 'Video Streaming Interface',
    description: 'Custom video player with adaptive streaming, captions, and accessibility features for educational platform',
    problem: 'Standard video players lacked required accessibility features and custom branding for educational content',
    solution: 'Built custom HTML5 video player with keyboard navigation, screen reader support, and adaptive bitrate streaming',
    result: 'Improved video engagement by 45%, achieved full WCAG compliance, and enhanced learning experience for disabled users',
    stack: ['React', 'Video.js', 'HLS.js', 'WCAG 2.1', 'CSS3'],
    category: 'other',
    links: {
      demo: 'https://video-player-demo.vercel.app'
    }
  }
];