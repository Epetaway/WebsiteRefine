import type { ReactNode } from "react";
import { motion } from "framer-motion";

type CaseStudyProseProps = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  tags?: string[];
  children?: ReactNode;
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Generic eyebrow + heading + prose section, reused for the narrative-only
 * parts of a design-doc case study (Opportunity, Visual Design, Challenges,
 * Outcomes, Reflection, etc.) so each doesn't need a bespoke component.
 */
export function CaseStudyProse({ id, eyebrow, heading, paragraphs, tags, children }: CaseStudyProseProps) {
  return (
    <section id={id} className="scroll-mt-24 py-12 border-t border-[var(--cs-border)]">
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--case-accent)" }}
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.04 }}
        className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[var(--cs-text-primary)] mb-4 max-w-2xl"
      >
        {heading}
      </motion.h2>

      <div className="space-y-4 max-w-2xl">
        {paragraphs.map((paragraph, idx) => (
          <motion.p
            key={idx}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.06 + idx * 0.04 }}
            className="text-[var(--cs-text-secondary)] text-sm leading-relaxed"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {tags && tags.length > 0 && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="flex flex-wrap gap-2.5 mt-6"
        >
          {tags.map((tag) => (
            <motion.span
              key={tag}
              variants={FADE_UP}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--cs-border)] bg-[var(--cs-surface)] text-[var(--cs-text-secondary)]"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      )}

      {children && <div className="mt-6 max-w-2xl">{children}</div>}
    </section>
  );
}
