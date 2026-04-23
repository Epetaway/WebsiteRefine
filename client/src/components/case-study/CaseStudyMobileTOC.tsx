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
      <div className="border border-[var(--cs-border)] rounded-xl overflow-hidden bg-[var(--cs-surface)]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-toc-list"
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[var(--cs-text-secondary)]"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--cs-text-muted)]">
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
              className="overflow-hidden border-t border-[var(--cs-border)] divide-y divide-[var(--cs-border)]"
            >
              {sections.map((section, idx) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleNav(section.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[var(--cs-text-secondary)] hover:text-[var(--cs-text-primary)] hover:bg-black/[0.03] transition-colors text-left"
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
