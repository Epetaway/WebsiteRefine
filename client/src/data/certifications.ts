import professionalFacts from "./professionalFacts.json";

export const certifications = professionalFacts.certifications;
export type Certification = (typeof certifications)[number];
