/**
 * Case Studies Data Layer
 * Central source of truth for all case study content
 */

export interface CaseStudy {
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

export const caseStudies: CaseStudy[] = [
  {
    slug: "asembia-patient-portal",
    title: "Healthcare Patient Portal UI",
    role: "Front-End Developer",
    impact: "+37% Lead Conversions",
    thumbnail: "/images/case-studies/asembia-portal.jpg",
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
    thumbnail: "/images/case-studies/mobile-opt.jpg",
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
    thumbnail: "/images/case-studies/conversion-opt.jpg",
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
    thumbnail: "/images/case-studies/accessibility.jpg",
    tags: ["Accessibility", "WCAG 2.1", "Lighthouse"],
    description: "Improved Lighthouse accessibility score to 95+ by adding ARIA labels, semantic HTML, and improving keyboard navigation.",
    year: "2022",
    featured: false,
  },
];

/**
 * Get featured case studies for homepage display
 */
export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.featured);
}

/**
 * Get case study by slug
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/**
 * Get all case studies
 */
export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
