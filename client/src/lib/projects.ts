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
  image?: string;            // override image URL for cards
  shortTitle?: string;       // compact name for card h3 e.g. "Gundam Forge"
  subtitle?: string;         // one-line type label e.g. "Deck Builder & Simulator"
  featured?: boolean;        // mark for homepage feature
  pinned?: boolean;          // whether it came from GitHub pinned
};

/**
 * Pinned repositories configuration - matches pinned repos on github.com/Epetaway
 * These serve as the primary data source for projects
 */
export const pinnedRepoSlugs: string[] = [
  "Gundam-Forge",
  "DojoNet-Prototype-MAX",
  "WithYou",
  "ama-fight-club",
];

/**
 * Pinned projects with curated metadata derived from README content
 * This serves as the fallback/static data source when API fetching is not used
 */
export const pinnedProjects: Project[] = [
  {
    slug: "Gundam-Forge",
    name: "Gundam-Forge",
    displayTitle: "Gundam Forge – Deck Builder & Meta Analysis Tool",
    description: "A competitive deck-building and meta-analysis tool for the Gundam Card Game — live card data via external API, advanced card search and filtering, deck construction and management, local saves, and a working play tester with an active player community.",
    longDescription: "A real product with architectural depth: component-driven React application with API integration, client-side state management, and UX thinking applied to an active competitive card game community. Features a split-panel deck builder, synergy-scoring card browser, rules-accurate playtest simulator, and live meta dashboard pulled from tournament data.",
    techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vitest"],
    repoUrl: `https://github.com/${GITHUB_USER}/Gundam-Forge`,
    liveUrl: "https://epetaway.github.io/Gundam-Forge/",
    role: "Front-End Developer & Designer",
    tags: ["React", "TypeScript", "Next.js", "Front-End", "Game Dev"],
    image: "/images/gundam-forge/gundam_card.png",
    shortTitle: "Gundam Forge",
    subtitle: "Deck Builder & Meta Analysis Tool",
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
    image: "/images/dojonet/dojonet_card.png",
    shortTitle: "DojoNet",
    subtitle: "Martial Arts Portal",
    role: "Lead Front-End Developer & UI/UX Designer",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    featured: true,
    pinned: true,
  },
  {
    slug: "WithYou",
    name: "WithYou",
    displayTitle: "WithYou – Relationship Wellness App",
    description: "A privacy-first relationship app that encourages meaningful connection through intentional communication.",
    longDescription: "Full-stack mobile app for couples with behavioral UX design, structured check-ins, shared plans, and real-time sync—prioritizing connection without surveillance.",
    techStack: ["React Native", "Node.js", "PostgreSQL", "TypeScript"],
    repoUrl: `https://github.com/${GITHUB_USER}/WithYou`,
    role: "Front-End Developer",
    tags: ["React Native", "Privacy", "Behavioral UX"],
    image: "/images/withyou/withyou_card.png",
    shortTitle: "WithYou",
    subtitle: "Relationship Wellness App",
    featured: true,
    pinned: true,
  },
  {
    slug: "ama-fight-club",
    name: "ama-fight-club",
    displayTitle: "AMA Fight Club – Digital Presence & Integration",
    description: "Modernized a martial arts gym's digital presence with responsive layouts, SEO-forward site structure, and API integrations for real-time lead capture, CRM synchronization, and recruitment.",
    longDescription: "Responsive site redesign within Wix CMS with Zen Planner API integration for real-time lead capture and CRM sync, ZipRecruiter form integrations for recruitment campaigns, and branded digital marketing assets including QR-linked flyers and social media templates.",
    techStack: ["Wix CMS", "Zen Planner API", "ZipRecruiter API", "JavaScript", "CSS"],
    repoUrl: `https://github.com/${GITHUB_USER}/ama-fight-club`,
    liveUrl: "https://www.amafightclub.com",
    role: "Front-End Developer & Digital Integration Specialist",
    tags: ["Freelance", "CMS", "API Integration", "Digital Marketing"],
    image: "/images/ama-fight-club/ama_card.png",
    shortTitle: "AMA Fight Club",
    subtitle: "Digital Presence & Integration",
    featured: true,
    pinned: true,
  },
];

/**
 * Additional projects beyond pinned repos - see full list on GitHub
 */
export const additionalProjects: Project[] = [];

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
