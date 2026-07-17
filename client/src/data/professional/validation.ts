import type { PublicationFact } from "./types";

export const publicationFacts = [
  {
    id: "identity-name",
    label: "Public name",
    value: "Earl Hickson Jr.",
    status: "verified",
    source: "Canonical professional record",
    publish: true,
  },
  {
    id: "identity-title",
    label: "Public title",
    value: "UX Engineer",
    status: "verified",
    source: "Portfolio positioning decision",
    publish: true,
  },
  {
    id: "ama-public-range",
    label: "AMA Fight Club conservative public date range",
    value: "Jan 2025 — 2025",
    status: "verified",
    source: "Existing professional record; exact end month omitted",
    publish: true,
  },
] satisfies readonly PublicationFact<string>[];

export const factsRequiringConfirmation = [
  "AMA Fight Club exact end month and year",
  "Whether AMA Fight Club should still be listed as current",
  "Current flagger employer",
  "Official flagger job title",
  "Flagger start month and year",
  "Whether the flagger position belongs on the public resume",
  "Whether the flagger position belongs only on the graduate CV",
  "Canonical LinkedIn URL",
  "Tabby's Place role and date",
  "Prosek Partners role and date",
  "William R. Seide Agency role and date",
  "Merkle role and date",
  "Second Melody role and date",
  "Earlier KBS&P dates and whether the roles were internships",
  "Every numerical professional metric",
  "Every public test-count claim",
  "Every deployment-status claim",
] as const;

export function assertPublicationSafe(
  facts: readonly PublicationFact<unknown>[] = publicationFacts,
) {
  const blocked = facts.filter(
    (fact) => fact.publish && fact.status !== "verified",
  );
  if (blocked.length) {
    throw new Error(
      `Blocked publication facts: ${blocked.map((fact) => fact.id).join(", ")}`,
    );
  }
}
