export type FactStatus =
  | "verified"
  | "requires-confirmation"
  | "private"
  | "exclude";

export type ClaimType =
  | "verified-fact"
  | "implementation-evidence"
  | "design-rationale"
  | "personal-reflection"
  | "research-claim"
  | "known-gap"
  | "planned-work"
  | "proposed-research";

export type PublicationFact<T> = {
  id: string;
  label: string;
  value: T;
  status: FactStatus;
  source: string;
  publish: boolean;
};
