import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { LearningItem } from "./types";

type CaseStudyLearningsProps = {
  items: LearningItem[];
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function CaseStudyLearnings({ items }: CaseStudyLearningsProps) {
  return (
    <section id="learnings" className="scroll-mt-24 py-12 border-t border-[var(--cs-border)]">
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--case-accent)" }}
      >
        09 What I Learned
      </motion.p>

      <motion.h2
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.04 }}
        className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[var(--cs-text-primary)] mb-6"
      >
        Key takeaways
      </motion.h2>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="space-y-3"
      >
        {items.map((item, idx) => (
          <motion.li
            key={idx}
            variants={FADE_UP}
            className="flex items-start gap-3 text-sm text-[var(--cs-text-secondary)] leading-relaxed"
          >
            <CheckCircle2
              className="w-4 h-4 mt-0.5 flex-none"
              style={{ color: "var(--case-accent)" }}
            />
            <span>{item.text}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
