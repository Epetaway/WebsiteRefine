import { investigations } from "./investigations";
import { professionalLinks } from "./professional";

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
  category: "featured" | "development" | "design";
  role?: string;
  summary?: string;
  tags?: string[];
  slug?: string;
  devNotes?: string;
  image?: string;
}

export const RESUME_PATH = professionalLinks.publicResume;

/**
 * Compatibility export for archived project components.
 * Canonical Work and Investigation routes consume `data/investigations`.
 */
export const projects: Project[] = investigations.map((investigation) => ({
  id: investigation.slug,
  slug: investigation.slug,
  title: investigation.name,
  role: investigation.role,
  category: "featured",
  description: investigation.abstract.product,
  summary: investigation.question,
  problem: investigation.abstract.problem,
  solution: investigation.interactionDecision,
  result: investigation.evidence[0],
  stack: investigation.stack,
  tags: [investigation.theme, "UX Engineering", "Independent investigation"],
  devNotes: `${investigation.status}. ${investigation.limitations[0]}`,
  features: investigation.implementation.map((item) => item.claim),
  links: {},
  image: investigation.previewImage,
}));
