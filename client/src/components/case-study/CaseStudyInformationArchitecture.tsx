import { motion } from "framer-motion";

export type IAColumn = {
  title: string;
  items: string[];
};

type CaseStudyInformationArchitectureProps = {
  id: string;
  eyebrow: string;
  heading: string;
  intro?: string;
  columns: IAColumn[];
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Reusable "Information Architecture" section: N labeled columns of site
 * or app sections (e.g. Public Website vs. Dashboard) for any product
 * case study that started from a sitemap.
 */
export function CaseStudyInformationArchitecture({
  id,
  eyebrow,
  heading,
  intro,
  columns,
}: CaseStudyInformationArchitectureProps) {
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
        className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[var(--cs-text-primary)] mb-2"
      >
        {heading}
      </motion.h2>

      {intro && (
        <motion.p
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-[var(--cs-text-secondary)] text-sm leading-relaxed mb-8 max-w-2xl"
        >
          {intro}
        </motion.p>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className={`grid gap-4 ${columns.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        {columns.map((column) => (
          <motion.div
            key={column.title}
            variants={FADE_UP}
            className="rounded-xl border border-[var(--cs-border)] bg-[var(--cs-surface)] p-5"
          >
            <p className="text-sm font-semibold text-[var(--cs-text-primary)] mb-3">{column.title}</p>
            <ul className="space-y-2">
              {column.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--cs-text-secondary)]">
                  <span className="mt-1.5 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--case-accent)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
