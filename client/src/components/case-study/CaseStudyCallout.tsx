import { motion } from "framer-motion";
import { CalloutNote } from "./types";

const TONE_COLORS: Record<CalloutNote["tone"], string> = {
  evidence: "#7DB5A5",
  assumption: "#F6C63F",
  constraint: "#6BA6BF",
  tradeoff: "#D94A66",
};

const FADE_UP = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

type CaseStudyCalloutProps = CalloutNote;

/**
 * Flagged-content box for unverified/qualified claims — evidence,
 * assumptions still needing validation, constraints, and tradeoffs.
 * Nested inside an existing numbered section (Research, Accessibility,
 * Challenges, Next Steps); it is not its own TOC entry.
 */
export function CaseStudyCallout({ tone, label, text }: CaseStudyCalloutProps) {
  const color = TONE_COLORS[tone];

  return (
    <motion.div
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35 }}
      className="rounded-r-[10px] py-3.5 px-[18px]"
      style={{
        borderLeft: `3px solid ${color}`,
        backgroundColor: `${color}14`,
      }}
    >
      <p
        className="font-mono text-[11px] font-semibold uppercase tracking-widest mb-1.5"
        style={{ color }}
      >
        {label}
      </p>
      <p className="text-sm text-[var(--cs-text-secondary)] leading-relaxed">{text}</p>
    </motion.div>
  );
}
