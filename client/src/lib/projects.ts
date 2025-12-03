/**
 * Projects Data Layer
 * Central source of truth for all project content
 * 
 * IMPORTANT: Project titles/descriptions/techStacks should be kept in sync
 * with the corresponding GitHub repos' README content for Epetaway.
 */

/** GitHub username for fetching repos */
export const GITHUB_USER = "Epetaway";

/** 
 * Project type matching the specification for GitHub-sourced project data
 */
export type Project = {
  slug: string;              // e.g. "patient-portal-demo"
  name: string;              // repo name or README title
  displayTitle: string;      // nicer human-readable title
  description: string;       // short summary from README
  longDescription?: string;  // optional fuller text
  techStack: string[];       // parsed list of tech keywords
  repoUrl: string;           // GitHub repo URL
  liveUrl?: string;          // live demo URL
  role?: string;             // e.g. "Front-End", "Healthcare UI"
  tags?: string[];           // e.g. ["Healthcare", "Accessibility"]
  featured?: boolean;        // mark for homepage feature
  pinned?: boolean;          // whether it came from GitHub pinned
};

/**
 * Pinned repositories configuration - matches pinned repos on github.com/Epetaway
 * These serve as the primary data source for projects
 */
export const pinnedRepoSlugs: string[] = [
  "patient-portal-demo",
  "DojoNet-Prototype-MAX",
  "ResumeCraft-ghpages",
  "mtg-proxy-generator",
];

/**
 * Pinned projects with curated metadata derived from README content
 * This serves as the fallback/static data source when API fetching is not used
 */
export const pinnedProjects: Project[] = [
  {
    slug: "patient-portal-demo",
    name: "patient-portal-demo",
    displayTitle: "Patient Engagement Portal – Healthcare UI Demo",
    description: "A full patient portal demo with multi-step onboarding, dashboards, prescription flows, and interface patterns modeled after real healthcare portals.",
    longDescription: "Enterprise-style patient portal demo with multi-step registration, dashboards, and accessible form workflows based on real healthcare patterns.",
    techStack: ["JavaScript", "Bootstrap 5", "SPA Architecture", "WCAG 2.1"],
    repoUrl: `https://github.com/${GITHUB_USER}/patient-portal-demo`,
    liveUrl: "https://epetaway.github.io/patient-portal-demo/#login",
    role: "Front-End Developer",
    tags: ["Healthcare", "Accessibility", "JavaScript", "Bootstrap"],
    featured: true,
    pinned: true,
  },
  {
    slug: "DojoNet-Prototype-MAX",
    name: "DojoNet-Prototype-MAX",
    displayTitle: "DojoNet Martial Arts Portal Prototype",
    description: "A prototype membership and class scheduling system for martial arts schools, focused on UX clarity and clean front-end patterns.",
    longDescription: "A modern membership and scheduling portal for martial arts communities, featuring dynamic forms, event flows, and clean front-end architecture.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    repoUrl: `https://github.com/${GITHUB_USER}/DojoNet-Prototype-MAX`,
    liveUrl: "https://epetaway.github.io/DojoNet-Prototype-MAX/#/dashboard",
    role: "Lead Front-End Developer & UI/UX Designer",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    featured: true,
    pinned: true,
  },
  {
    slug: "ResumeCraft-ghpages",
    name: "ResumeCraft-ghpages",
    displayTitle: "ResumeCraft – AI-Powered Resume Builder",
    description: "Full-stack app that helps users create tailored resumes using AI prompts and parsing tools.",
    longDescription: "Cut time-to-first-resume from ~25 minutes to under 5; simplified editing and export for friction-free iterations.",
    techStack: ["React", "TypeScript", "Node.js", "OpenAI API", "Tailwind CSS"],
    repoUrl: `https://github.com/${GITHUB_USER}/ResumeCraft-ghpages`,
    liveUrl: "https://epetaway.github.io/ResumeCraft-ghpages",
    role: "Full-Stack Developer",
    tags: ["React", "AI", "TypeScript"],
    featured: true,
    pinned: true,
  },
  {
    slug: "mtg-proxy-generator",
    name: "mtg-proxy-generator",
    displayTitle: "MTG Proxy Generator – DOM Manipulation Showcase",
    description: "Interactive card composer demonstrating vanilla JavaScript proficiency and dynamic rendering.",
    longDescription: "Lightweight utility that runs fully client-side, showcasing strong DOM skills and performant rendering without frameworks.",
    techStack: ["Vanilla JavaScript", "HTML5 Canvas", "CSS3", "LocalStorage"],
    repoUrl: `https://github.com/${GITHUB_USER}/mtg-proxy-generator`,
    liveUrl: "https://epetaway.github.io/mtg-proxy-generator/",
    role: "Front-End Developer",
    tags: ["JavaScript", "Canvas API", "No Framework"],
    featured: false,
    pinned: true,
  },
];

/**
 * Additional projects beyond pinned repos - still public on GitHub
 */
export const additionalProjects: Project[] = [
  {
    slug: "WHEEL-OF-SUCCESS",
    name: "WHEEL-OF-SUCCESS",
    displayTitle: "Game Show App – Wheel of Success",
    description: "Browser-based word-guessing game with dynamic state, feedback, and animations.",
    longDescription: "Interactive experience demonstrating logic flow, user feedback, and maintainable vanilla JS structure.",
    techStack: ["JavaScript", "HTML", "CSS"],
    repoUrl: `https://github.com/${GITHUB_USER}/WHEEL-OF-SUCCESS`,
    liveUrl: "https://epetaway.github.io/WHEEL-OF-SUCCESS/",
    role: "Front-End Developer",
    tags: ["JavaScript", "Game Development"],
    featured: false,
    pinned: false,
  },
  {
    slug: "WebsiteRefine",
    name: "WebsiteRefine",
    displayTitle: "Portfolio Website – Full-Stack Implementation",
    description: "Modern engineering portfolio showcasing responsive design, performance optimization, and clear personal branding.",
    longDescription: "95+ Lighthouse scores, sub-1s first load on desktop, and a clearer narrative that improves recruiter engagement.",
    techStack: ["React 18", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion"],
    repoUrl: `https://github.com/${GITHUB_USER}/WebsiteRefine`,
    liveUrl: "https://www.ehicksonjr.com",
    role: "Full-Stack Developer",
    tags: ["React", "TypeScript", "Portfolio"],
    featured: false,
    pinned: false,
  },
];

/**
 * Get all projects - combines pinned and additional projects
 */
export function getAllProjects(): Project[] {
  return [...pinnedProjects, ...additionalProjects];
}

/**
 * Get featured projects for homepage display
 * Returns projects marked as featured (limited to count if provided)
 */
export function getFeaturedProjects(count?: number): Project[] {
  const featured = getAllProjects().filter((project) => project.featured);
  return count ? featured.slice(0, count) : featured;
}

/**
 * Get pinned projects only
 */
export function getPinnedProjects(): Project[] {
  return pinnedProjects;
}

/**
 * Get additional projects (non-pinned)
 */
export function getAdditionalProjects(): Project[] {
  return additionalProjects;
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

// ============================================================================
// README Parsing Utilities (for dynamic fetching from GitHub at build time)
// ============================================================================

/**
 * Extract title and first paragraph from README content
 */
export function extractReadmeMeta(content: string): { title?: string; excerpt?: string } {
  const lines = content.split(/\r?\n/);
  let title: string | undefined;
  let excerpt: string | undefined;
  
  for (const line of lines) {
    const l = line.trim();
    if (!title && l.startsWith("# ")) {
      title = l.replace(/^#\s+/, "").trim();
      continue;
    }
    if (!excerpt && l && !l.startsWith("#")) {
      excerpt = l;
    }
    if (title && excerpt) break;
  }
  
  return { title, excerpt };
}

/**
 * Clean up README paragraph: strip images/badges, code fences, and markdown links
 */
export function cleanupExcerpt(text: string): string {
  let t = text.trim();
  // Strip badges/images ![alt](url)
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  // Strip inline code fences/backticks
  t = t.replace(/```[\s\S]*?```/g, "");
  t = t.replace(/`([^`]*)`/g, "$1");
  // Convert markdown links [label](url) -> label
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
  // Collapse multiple spaces
  t = t.replace(/\s{2,}/g, " ");
  return t.trim();
}

/**
 * Decode base64-encoded README content from GitHub API (with UTF-8 support)
 */
export function decodeReadmeBase64(b64: string): string {
  try {
    const binary = atob(b64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(bytes);
  } catch {
    // Fallback
    try {
      return atob(b64);
    } catch {
      return "";
    }
  }
}
