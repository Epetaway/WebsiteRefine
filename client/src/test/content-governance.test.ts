import { describe, expect, it } from "vitest";
import { investigations } from "@/data/investigations";
import {
  assertPublicationSafe,
  capabilities,
  confirmedCurrentRoles,
  experience,
  profile,
} from "@/data/professional";

describe("content governance", () => {
  it("publishes one identity and only verified employment entries", () => {
    expect(profile.publicTitle).toBe("Lead Front-End Engineer");
    expect(() => assertPublicationSafe()).not.toThrow();
    expect(experience.every((item) => item.factStatus === "verified")).toBe(true);
    const current = experience.filter((item) => /\bpresent\b/i.test(item.dates)).map((item) => item.id);
    expect(current).toEqual([...confirmedCurrentRoles]);
  });

  it("matches the résumé chronology, newest first", () => {
    expect(experience.map((item) => item.employer)).toEqual([
      "AMA Fight Club",
      "Freelance and Contract",
      "Asembia",
      "BroadcastMed / Conexiant",
      "Prosek Partners",
      "William R. Seide Agency LLC",
      "Merkle",
    ]);
    expect(experience.map((item) => item.employer).join(" ")).not.toMatch(/Merck|Verizon/);
  });

  it("groups skills the way the résumé does", () => {
    expect(capabilities.map((group) => group.label)).toEqual([
      "Production",
      "Shipped in independent products",
      "Design and UX",
      "Measurement and platforms",
    ]);
  });

  it("uses governed project statuses and evidence boundaries", () => {
    expect(investigations.map((item) => [item.slug, item.status])).toEqual([
      ["withyou", "Functional beta-oriented implementation"],
      ["gundam-forge", "Functional beta-oriented implementation"],
      ["dojonet", "Active development"],
    ]);
    for (const investigation of investigations) {
      expect(investigation.limitations.length).toBeGreaterThan(0);
      expect(investigation.proposedMethods.length).toBeGreaterThan(0);
      expect(investigation.testingEvidence.length).toBeGreaterThan(0);
    }
  });
});
