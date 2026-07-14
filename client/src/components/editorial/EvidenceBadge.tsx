import type { EvidenceStatus } from "@/data/investigations";

export function EvidenceBadge({ status }: { status: EvidenceStatus }) {
  const tone = status === "KNOWN GAP" || status === "PARTIAL" ? "caution" :
    status === "DESIGNED" || status === "PLANNED" ? "planned" : "evidence";
  return <span className={`evidence-badge evidence-badge--${tone}`}>{status}</span>;
}
