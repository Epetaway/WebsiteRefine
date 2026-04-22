import { motion } from "framer-motion";

type OverviewMeta = {
  label: string;
  value: string;
};

type CaseStudyOverviewSectionProps = {
  description: string;
  industry: string;
  targetUsers: string;
  type: string;
  myRole: string;
  image?: string;
  title?: string;
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CaseStudyOverviewSection({
  description,
  industry,
  targetUsers,
  type,
  myRole,
  image,
  title = "What is this project?",
}: CaseStudyOverviewSectionProps) {
  const chips: OverviewMeta[] = [
    { label: "Industry", value: industry },
    { label: "Target Users", value: targetUsers },
    { label: "Type", value: type },
    { label: "My Role", value: myRole },
  ];

  return (
    <section id="overview" className="scroll-mt-24 py-12">
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--case-accent)" }}
      >
        01 Overview
      </motion.p>

      <motion.h2
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.04 }}
        className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-3"
      >
        {title}
      </motion.h2>

      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="text-[#B7B7B7] text-sm leading-relaxed mb-6 max-w-xl"
      >
        {description}
      </motion.p>

      {/* Meta chips */}
      <motion.div
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="grid grid-cols-2 gap-3 mb-6"
      >
        {chips.map((chip) => (
          <div
            key={chip.label}
            className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg border border-[#20252A] bg-[#111111]"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7A7A7A]">
              {chip.label}
            </span>
            <span className="text-sm text-[#F5F5F5] font-medium">{chip.value}</span>
          </div>
        ))}
      </motion.div>

      {/* Optional screenshot */}
      {image && (
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="rounded-xl overflow-hidden border border-[#20252A] bg-[#111827]"
        >
          <img
            src={image}
            alt="Project overview screenshot"
            className="w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      )}
    </section>
  );
}
