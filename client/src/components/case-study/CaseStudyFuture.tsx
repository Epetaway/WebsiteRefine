import { motion } from "framer-motion";
import { FutureItem } from "./types";

type CaseStudyFutureProps = {
  items: FutureItem[];
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function CaseStudyFuture({ items }: CaseStudyFutureProps) {
  return (
    <section id="next-steps" className="scroll-mt-24 py-12 border-t border-[#1A1A1A]">
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--case-accent)" }}
      >
        10 What's Next
      </motion.p>

      <motion.h2
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.04 }}
        className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-2"
      >
        Future improvements
      </motion.h2>

      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="text-[#B7B7B7] text-sm leading-relaxed mb-6 max-w-lg"
      >
        Planned features, enhancements, or areas for future iteration.
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="flex flex-wrap gap-3"
      >
        {items.map((item) => (
          <motion.div
            key={item.label}
            variants={FADE_UP}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#20252A] bg-[#111111] text-sm text-[#B7B7B7] hover:border-[var(--case-accent)] hover:text-[#F5F5F5] transition-colors duration-150"
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
