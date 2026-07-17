import { experience } from "./professional";

/** @deprecated Import `experience` from `data/professional`. */
export const professionalExperience = experience.map((item) => ({
  company: item.employer,
  role: item.role,
  dates: item.dates,
  area: item.area,
  summary: item.summary,
  bullets: [...item.responsibilities],
}));

export type ProfessionalExperience =
  (typeof professionalExperience)[number];
