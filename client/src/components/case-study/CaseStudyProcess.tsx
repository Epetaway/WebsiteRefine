import { motion } from "framer-motion";
import { ProcessStep } from "./types";

type CaseStudyProcessProps = {
  steps: ProcessStep[];
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CaseStudyProcess({ steps }: CaseStudyProcessProps) {
  return (
    <section id="approach" className="scroll-mt-24 py-12 border-t border-[#1A1A1A]">
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--case-accent)" }}
      >
        04 My Approach
      </motion.p>

      <motion.h2
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.04 }}
        className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-2"
      >
        How I approached it
      </motion.h2>

      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="text-[#B7B7B7] text-sm leading-relaxed mb-8 max-w-lg"
      >
        High-level overview of the process, research, and development decisions.
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            variants={FADE_UP}
            className="relative rounded-xl border border-[#20252A] bg-[#111111] p-5"
          >
            {/* Connector line (except last) */}
            {idx < steps.length - 1 && (
              <div
                className="hidden lg:block absolute top-8 right-0 w-4 h-px"
                style={{ background: "#20252A", transform: "translateX(100%)" }}
              />
            )}

            <span
              className="text-[10px] font-semibold uppercase tracking-widest block mb-3"
              style={{ color: "var(--case-accent)" }}
            >
              {step.number}
            </span>
            <p className="text-sm font-semibold text-[#F5F5F5] mb-2">{step.title}</p>
            <p className="text-xs text-[#7A7A7A] leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
