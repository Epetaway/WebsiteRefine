import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type CaseStudyHeroProps = {
  category: string;
  title: string;
  subtitle: string;
  heroImage: string;
  liveUrl?: string;
  repoUrl?: string;
};

export function CaseStudyHero({
  category,
  title,
  subtitle,
  heroImage,
  liveUrl,
  repoUrl,
}: CaseStudyHeroProps) {
  return (
    <section className="px-4 pt-8 pb-0 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
      {/* Back link */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-[var(--cs-text-secondary)] hover:text-[var(--cs-text-primary)] transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        All Projects
      </Link>

      {/* Category label */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
        style={{ color: "var(--case-accent)" }}
      >
        {category}
      </motion.p>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--cs-text-primary)] leading-tight max-w-3xl mb-4"
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="text-base sm:text-lg max-w-2xl mb-6 leading-relaxed"
        style={{ color: "var(--cs-text-secondary)" }}
      >
        {subtitle}
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: "var(--case-accent)",
              boxShadow: "0 0 0 0 var(--case-glow)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 8px 24px var(--case-glow)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 0 0 var(--case-glow)")
            }
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[var(--cs-text-primary)] border border-[var(--cs-border-strong)] bg-[var(--cs-surface)] transition-all hover:-translate-y-0.5 hover:border-[var(--case-accent)] hover:shadow-lg"
          >
            <Github className="w-4 h-4" />
            View Code
          </a>
        )}
      </motion.div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full rounded-2xl overflow-hidden border border-[var(--cs-border)] bg-[var(--cs-surface)]"
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.12)" }}
      >
        <img
          src={heroImage}
          alt={`${title} product screenshot`}
          className="w-full object-cover object-top"
          style={{ maxHeight: "560px" }}
          loading="eager"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
            const parent = el.parentElement;
            if (parent) {
              parent.innerHTML = `<div class="flex items-center justify-center h-64 text-sm" style="color:var(--cs-text-muted)">No preview available</div>`;
            }
          }}
        />
      </motion.div>
    </section>
  );
}
