import { motion } from "framer-motion";
import { GoalItem } from "./types";

type CaseStudyGoalsProps = {
  goals: GoalItem[];
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CaseStudyGoals({ goals }: CaseStudyGoalsProps) {
  return (
    <section id="goals" className="scroll-mt-24 py-12 border-t border-[#1A1A1A]">
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--case-accent)" }}
      >
        03 The Goal
      </motion.p>

      <motion.h2
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.04 }}
        className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-2"
      >
        What success looked like
      </motion.h2>

      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="text-[#B7B7B7] text-sm leading-relaxed mb-8 max-w-lg"
      >
        Define the objectives and what success would mean for users and the business.
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid sm:grid-cols-3 gap-4"
      >
        {goals.map((goal, idx) => (
          <motion.div
            key={goal.title}
            variants={FADE_UP}
            className="rounded-xl border border-[#20252A] bg-[#111111] p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform duration-200"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #20252A" }}
            >
              {goal.icon}
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7A7A7A] mb-1">
                Goal {String(idx + 1).padStart(2, "0")}
              </p>
              <p className="text-sm font-semibold text-[#F5F5F5] mb-1">{goal.title}</p>
              <p className="text-xs text-[#7A7A7A] leading-relaxed">{goal.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
