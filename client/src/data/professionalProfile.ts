import { professionalLinks, profile } from "./professional";

/** @deprecated Import `profile` and `professionalLinks` from `data/professional`. */
export const professionalProfile = {
  ...profile,
  title: profile.publicTitle,
  tagline: profile.headline,
  descriptor:
    "I work across interaction design, frontend engineering, and full-stack product development.",
  focus: profile.focusRoles,
  links: {
    ...professionalLinks,
    resume: professionalLinks.publicResume,
  },
} as const;

export type ProfessionalProfile = typeof professionalProfile;
