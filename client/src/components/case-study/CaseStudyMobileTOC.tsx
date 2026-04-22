import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TocSection } from "./types";

type CaseStudyMobileTOCProps = {
  sections: TocSection[];
};

export function CaseStudyMobileTOC({ sections }: CaseStudyMobileTOCProps) {
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    setOpen(false);
  };

  return (
    <div className="lg:hidden px-4 sm:px-6 mt-4 max-w-[1200px] mx-auto">
      <div className="border border-[#20252A] rounded-xl overflow-hidden bg-[#111111]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-toc-list"
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[#B7B7B7]"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7A7A7A]">
            On This Page
          </span>
          <ChevronDown
            className={[
              "w-4 h-4 transition-transform duration-200",
              open ? "rotate-180" : "",
            ].join(" ")}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ol
              id="mobile-toc-list"
              key="toc"
              initial={prefersReduced ? {} : { height: 0, opacity: 0 }}
              animate={prefersReduced ? {} : { height: "auto", opacity: 1 }}
              exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden border-t border-[#20252A] divide-y divide-[#20252A]"
            >
              {sections.map((section, idx) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleNav(section.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#B7B7B7] hover:text-[#F5F5F5] hover:bg-white/5 transition-colors text-left"
                  >
                    <span
                      className="text-[10px] font-mono tabular-nums flex-none"
                      style={{ color: "var(--case-accent)" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {section.label}
                  </button>
                </li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
