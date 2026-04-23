import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type ProjectLink = {
  slug: string;
  title: string;
};

type CaseStudyBottomCTAProps = {
  prevProject?: ProjectLink;
  nextProject?: ProjectLink;
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CaseStudyBottomCTA({ prevProject, nextProject }: CaseStudyBottomCTAProps) {
  return (
    <div>
      {/* CTA Banner */}
      <motion.div
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="px-4 sm:px-6 lg:px-8 py-16 max-w-[1200px] mx-auto text-center border-t border-[var(--cs-border)]"
      >
        <p className="text-sm text-[var(--cs-text-muted)] mb-3">Like this project?</p>
        <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[var(--cs-text-primary)] mb-3">
          Let's build something amazing together.
        </h2>
        <p className="text-sm text-[var(--cs-text-secondary)] mb-8 max-w-sm mx-auto">
          I'm open to full-time roles, contract work, and product collaborations.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
          style={{ background: "var(--case-accent)" }}
        >
          <Mail className="w-4 h-4" />
          Let's Connect
        </Link>
      </motion.div>

      {/* Prev / Next pagination */}
      {(prevProject || nextProject) && (
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border-t border-[var(--cs-border)]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between gap-4">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-3 text-sm text-[var(--cs-text-muted)] hover:text-[var(--cs-text-primary)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cs-text-muted)] mb-0.5">
                    Previous Project
                  </p>
                  <p className="font-medium text-[var(--cs-text-secondary)] group-hover:text-[var(--cs-text-primary)]">
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-3 text-sm text-[var(--cs-text-muted)] hover:text-[var(--cs-text-primary)] transition-colors text-right"
              >
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cs-text-muted)] mb-0.5">
                    Next Project
                  </p>
                  <p className="font-medium text-[var(--cs-text-secondary)] group-hover:text-[var(--cs-text-primary)]">
                    {nextProject.title}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
