import { motion } from "framer-motion";

type CaseStudyTechStackProps = {
  stack: string[];
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CaseStudyTechStack({ stack }: CaseStudyTechStackProps) {
  return (
    <section id="tech-stack" className="scroll-mt-24 py-12 border-t border-[var(--cs-border)]">
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--case-accent)" }}
      >
        06 Tech Stack
      </motion.p>

      <motion.h2
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.04 }}
        className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[var(--cs-text-primary)] mb-6"
      >
        Technologies used
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
        className="flex flex-wrap gap-2.5"
      >
        {stack.map((tech) => (
          <motion.span
            key={tech}
            variants={FADE_UP}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--cs-border)] bg-[var(--cs-surface)] text-[var(--cs-text-secondary)] hover:border-[var(--case-accent)] hover:text-[var(--cs-text-primary)] transition-colors duration-150"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
