/**
 * Projects Data Layer
 * Central source of truth for all project content
 */

export interface Project {
  slug: string;
  title: string;
  role: string;
  impact: string;
  thumbnail: string;
  tags: string[];
  description?: string;
  year?: string;
  company?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "asembia-patient-portal",
    title: "Healthcare Patient Portal UI",
    role: "Front-End Developer",
    impact: "+37% Lead Conversions",
    thumbnail: "/images/projects/asembia-portal.jpg",
    tags: ["React", "TypeScript", "Healthcare UI", "Accessibility"],
    description: "Built healthcare patient portal UIs with complex multi-step flows, accessibility, and enterprise patterns.",
    year: "2023-2024",
    company: "Asembia",
    featured: true,
  },
  {
    slug: "mobile-optimization",
    title: "Mobile Performance Optimization",
    role: "Senior Front-End Engineer",
    impact: "+75% Livestream Engagement",
    thumbnail: "/images/projects/mobile-opt.jpg",
    tags: ["Performance", "Mobile", "Optimization"],
    description: "Reduced layout shift and improved mobile responsiveness by optimizing CSS bundles across key user flows.",
    year: "2023",
    featured: true,
  },
  {
    slug: "lead-conversion-optimization",
    title: "Lead Conversion Rate Optimization",
    role: "UI/UX Engineer",
    impact: "+25% Organic Traffic",
    thumbnail: "/images/projects/conversion-opt.jpg",
    tags: ["A/B Testing", "UX", "Conversion"],
    description: "Supported marketing teams with A/B testing implementations that reduced bounce rate and increased form completion rates.",
    year: "2022-2023",
    featured: false,
  },
  {
    slug: "accessibility-audit",
    title: "WCAG 2.1 AA Accessibility Implementation",
    role: "Accessibility Engineer",
    impact: "Lighthouse Score +18 points",
    thumbnail: "/images/projects/accessibility.jpg",
    tags: ["Accessibility", "WCAG 2.1", "Lighthouse"],
    description: "Improved Lighthouse accessibility score to 95+ by adding ARIA labels, semantic HTML, and improving keyboard navigation.",
    year: "2022",
    featured: false,
  },
];

/**
 * Get featured projects for homepage display
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  return projects;
}
