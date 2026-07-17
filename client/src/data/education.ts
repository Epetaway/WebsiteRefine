import professionalFacts from "./professionalFacts.json";

export const education = professionalFacts.education;
export type Education = (typeof education)[number];
