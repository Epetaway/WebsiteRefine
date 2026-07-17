import professionalFacts from "./professionalFacts.json";

export const unresolvedProfessionalFacts = professionalFacts.unresolvedProfessionalFacts;

export function assertNoUnresolvedProfessionalFacts() {
  if (unresolvedProfessionalFacts.length) {
    throw new Error(`Professional facts require confirmation: ${unresolvedProfessionalFacts.join("; ")}`);
  }
}
