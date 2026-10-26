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
    value: "Lead Front-End Engineer",
    status: "verified",
    source: "Résumé headline, Oct 24, 2026; Earl's positioning decision, Oct 25, 2026",
    publish: true,
  },
  {
    id: "ama-public-range",
    label: "AMA Fight Club date range",
    value: "Jan 2025 — Present",
    status: "verified",
    source: "Résumé, Oct 24, 2026: the role is current",
    publish: true,
  },
  {
    id: "broadcastmed-lead-forms",
    label: "BroadcastMed lead-form submissions",
    value: "18% increase",
    status: "verified",
    source: "Earl's confirmation during the 2026 résumé rebuild; résumé, Oct 24, 2026",
    publish: true,
  },
  {
    id: "broadcastmed-email-production",
    label: "BroadcastMed email production time",
    value: "25% reduction",
    status: "verified",
    source: "Earl's confirmation during the 2026 résumé rebuild; résumé, Oct 24, 2026",
    publish: true,
  },
  {
    id: "linkedin-url",
    label: "Canonical LinkedIn URL",
    value: "https://www.linkedin.com/in/earl-hickson-jr",
    status: "verified",
    source: "Live LinkedIn profile, checked Oct 26, 2026 (/in/earlhicksonjr returns LinkedIn's 404); matches the résumé",
    publish: true,
  },
] satisfies readonly PublicationFact<string>[];

/** Roles Earl has confirmed are current. Only these may use "Present". */
export const confirmedCurrentRoles = ["ama-fight-club"] as const;

export const factsRequiringConfirmation = [
  "Current flagger employer",
  "Official flagger job title",
  "Flagger start month and year",
  "Whether the flagger position belongs on the public resume",
  "Whether the flagger position belongs only on the graduate CV",
  "Separate KBS&P and Second Melody titles, dates, and internship status (published only as one 2013–2017 line)",
  "Any numerical professional metric other than the two BroadcastMed figures",
  "Any test-count claim other than the dated Gundam Forge résumé figure",
  "Every deployment-status claim not on the résumé",
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
