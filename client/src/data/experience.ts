import { experience } from "./professional";

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description?: string;
  logo?: string;
  technologies?: string[];
}

/**
 * Compatibility export for archived page components.
 * Canonical routes import `experience` from `data/professional` directly.
 */
export const workExperience: WorkExperience[] = experience.map((item) => ({
  id: item.id,
  company: item.employer,
  position: item.role,
  duration: item.dates,
  description: item.summary,
}));
