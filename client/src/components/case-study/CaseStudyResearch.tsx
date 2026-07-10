import { Quote } from "lucide-react";
import { motion } from "framer-motion";

type CaseStudyResearchProps = {
  id: string;
  eyebrow: string;
  heading: string;
  interviewIntro: string;
  quotes: string[];
  competitiveIntro: string;
  competitors: string[];
  observations: string[];
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Reusable "Research" section for design-doc-sourced case studies: user
 * interview pull-quotes on the left, competitive analysis on the right.
 */
export function CaseStudyResearch({
  id,
  eyebrow,
  heading,
  interviewIntro,
  quotes,
  competitiveIntro,
  competitors,
  observations,
}: CaseStudyResearchProps) {
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
        className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[var(--cs-text-primary)] mb-8"
      >
        {heading}
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* User interviews */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--cs-text-muted)] mb-2">
            User Interviews
          </p>
          <p className="text-[var(--cs-text-secondary)] text-sm leading-relaxed mb-4">
            {interviewIntro}
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="space-y-3"
          >
            {quotes.map((quote, idx) => (
              <motion.div
                key={idx}
                variants={FADE_UP}
                className="flex items-start gap-2.5 rounded-xl border border-[var(--cs-border)] bg-[var(--cs-surface)] p-4"
              >
                <Quote className="w-3.5 h-3.5 mt-0.5 flex-none" style={{ color: "var(--case-accent)" }} />
                <span className="text-sm text-[var(--cs-text-secondary)] italic leading-relaxed">{quote}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Competitive analysis */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--cs-text-muted)] mb-2">
            Competitive Analysis
          </p>
          <p className="text-[var(--cs-text-secondary)] text-sm leading-relaxed mb-4">
            {competitiveIntro}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {competitors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--cs-border)] bg-[var(--cs-surface)] text-[var(--cs-text-secondary)]"
              >
                {c}
              </span>
            ))}
          </div>
          <ul className="space-y-2.5">
            {observations.map((obs, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-[var(--cs-text-secondary)] leading-relaxed">
                <span className="mt-1.5 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--case-accent)" }} />
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
