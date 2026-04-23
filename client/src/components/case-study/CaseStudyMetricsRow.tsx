import { motion } from "framer-motion";
import { MetricItem } from "./types";

type CaseStudyMetricsRowProps = {
  metrics: MetricItem[];
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CaseStudyMetricsRow({ metrics }: CaseStudyMetricsRowProps) {
  if (metrics.length === 0) return null;

  return (
    <section id="impact" className="scroll-mt-24 py-12 border-t border-[var(--cs-border)]">
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--case-accent)" }}
      >
        08 Impact &amp; Results
      </motion.p>

      <motion.h2
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.04 }}
        className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[var(--cs-text-primary)] mb-6"
      >
        The impact
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            variants={FADE_UP}
            className="rounded-xl border border-[var(--cs-border)] bg-[var(--cs-surface)] p-5 text-center hover:-translate-y-0.5 transition-transform duration-200"
          >
            <p
              className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold mb-1"
              style={{ color: "var(--case-accent)" }}
            >
              {metric.value}
            </p>
            <p className="text-sm font-semibold text-[var(--cs-text-primary)] mb-1">{metric.label}</p>
            {metric.description && (
              <p className="text-xs text-[var(--cs-text-muted)]">{metric.description}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
