import professionalFacts from "./professionalFacts.json";

export type ProfessionalExperience = (typeof professionalFacts.professionalExperience)[number];

export const professionalExperience: ProfessionalExperience[] = professionalFacts.professionalExperience;
