import { describe, expect, it } from "vitest";
import { investigations } from "@/data/investigations";
import {
  assertPublicationSafe,
  experience,
  profile,
} from "@/data/professional";

describe("content governance", () => {
  it("publishes one identity and only verified employment entries", () => {
    expect(profile.publicTitle).toBe("UX Engineer");
    expect(() => assertPublicationSafe()).not.toThrow();
    expect(experience.every((item) => item.factStatus === "verified")).toBe(true);
    expect(experience.some((item) => /\bpresent\b/i.test(item.dates))).toBe(false);
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
