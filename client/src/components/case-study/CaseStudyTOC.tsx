import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TocSection } from "./types";

type CaseStudyTOCProps = {
  sections: TocSection[];
};

export function CaseStudyTOC({ sections }: CaseStudyTOCProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const intersecting = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            intersecting.delete(entry.target.id);
          }
        });

        if (intersecting.size > 0) {
          const topmost = Array.from(intersecting.entries()).sort(
            ([, a], [, b]) => a - b
          )[0][0];
          setActiveId(topmost);
        }
      },
      { rootMargin: "-10% 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sections]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    setActiveId(id);
  };

  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--cs-text-muted)] mb-4">
        On This Page
      </p>
      <ol className="space-y-1">
        {sections.map((section, idx) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => handleClick(section.id)}
                className={[
                  "relative w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-150",
                  isActive
                    ? "text-[var(--cs-text-primary)] font-medium"
                    : "text-[var(--cs-text-muted)] hover:text-[var(--cs-text-secondary)]",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="toc-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(0,0,0,0.04)" }}
                    transition={
                      prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 36 }
                    }
                  />
                )}
                <span
                  className="relative flex-none text-[10px] font-mono tabular-nums"
                  style={{ color: isActive ? "var(--case-accent)" : "var(--cs-text-muted)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="relative leading-snug">{section.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* CTA card */}
      <div className="mt-8 p-4 rounded-xl border border-[var(--cs-border)] bg-[var(--cs-surface)] space-y-3">
        <p className="text-sm font-semibold text-[var(--cs-text-primary)]">
          Interested in working together?
        </p>
        <p className="text-xs text-[var(--cs-text-muted)] leading-relaxed">
          I'm open to full-time roles, contract work, and product collaborations.
        </p>
        <a
          href="/contact"
          className="block w-full text-center py-2 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "var(--case-accent)" }}
        >
          Let's Connect
        </a>
      </div>
    </nav>
  );
}
