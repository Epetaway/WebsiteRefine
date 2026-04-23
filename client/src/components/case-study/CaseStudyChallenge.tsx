import { X } from "lucide-react";
import { motion } from "framer-motion";

type CaseStudyChallengeProps = {
  description: string;
  problems: string[];
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CaseStudyChallenge({ description, problems }: CaseStudyChallengeProps) {
  return (
    <section id="challenge" className="scroll-mt-24 py-12 border-t border-[var(--cs-border)]">
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--case-accent)" }}
      >
        02 The Challenge
      </motion.p>

      <div className="grid xl:grid-cols-2 gap-8 items-start">
        {/* Left: narrative */}
        <div>
          <motion.h2
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.04 }}
            className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[var(--cs-text-primary)] mb-3"
          >
            The problem to solve
          </motion.h2>
          <motion.p
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-[var(--cs-text-secondary)] text-sm leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* Right: problem cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="rounded-xl border border-[var(--cs-border)] bg-[var(--cs-surface)] p-5 space-y-3"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--cs-text-muted)] mb-2">
            Key Problems
          </p>
          {problems.map((problem) => (
            <motion.div
              key={problem}
              variants={FADE_UP}
              className="flex items-start gap-2.5 text-sm text-[var(--cs-text-secondary)]"
            >
              <X className="w-3.5 h-3.5 mt-0.5 flex-none text-red-400" />
              <span>{problem}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
