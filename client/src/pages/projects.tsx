import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getPinnedProjects, GITHUB_USER } from "@/lib/projects";
import { resolveCaseStudySlug } from "@/data/caseStudies";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useReveal } from "@/hooks/useReveal";
import { ProjectCardFeaturedRow, ProjectCardStandard, ProjectCardCTA } from "@/components/ui/ProjectCard";

// ── Build card data list from pinned projects ─────────────────────────────────
const pinnedProjects = getPinnedProjects();

function toCardData(p: ReturnType<typeof getPinnedProjects>[number]) {
  return {
    slug: p.slug,
    displayTitle: p.displayTitle,
    description: p.longDescription ?? p.description,
    techStack: p.techStack,
    repoUrl: p.repoUrl,
    liveUrl: p.liveUrl,
    role: p.role,
    category: p.tags?.[0] ?? p.role ?? undefined,
    githubUser: GITHUB_USER,
    image: p.image,
    caseStudySlug: resolveCaseStudySlug(p.slug),
  };
}

// Map outcome metrics for each pinned project
const METRICS: Record<string, { metric: string; metricLabel: string }> = {
  "WithYou": { metric: "+100%", metricLabel: "privacy-first — zero tracking" },
  "ama-fight-club": { metric: "+156%", metricLabel: "organic traffic growth" },
  "DojoNet-Prototype-MAX": { metric: "98", metricLabel: "Lighthouse score" },
  "Gundam-Forge": { metric: "3000+", metricLabel: "lines of shared TypeScript" },
};

// First three pinned projects become premium feature rows
const featureRows = pinnedProjects.slice(0, 3).map((p) => ({
  ...toCardData(p),
  ...(METRICS[p.slug] ?? {}),
}));

// All four pinned projects in the compact card row (homepage-style preview on /projects)
const allCardProjects = pinnedProjects.map(toCardData);

export default function Projects() {
  useReveal();

  return (
    <>
      <Helmet>
        <title>Work — Earl Hickson Jr. | React · TypeScript · Front-End Engineering</title>
        <meta name="description" content="Front-end projects by Earl Hickson Jr. showcasing React, TypeScript, healthcare portals, WCAG 2.1 AA accessibility, and REST API integrations." />
        <link rel="canonical" href="https://www.ehicksonjr.com/projects" />
        <meta property="og:title" content="Work — Earl Hickson Jr. | Front-End Engineering" />
        <meta property="og:description" content="Front-end projects by Earl Hickson Jr. showcasing React, TypeScript, healthcare portals, WCAG 2.1 AA accessibility, and REST API integrations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ehicksonjr.com/projects" />
        <meta property="og:image" content="/assets/og/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/assets/og/og-image.jpg" />
      </Helmet>

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#0D0D0D]">
        <div className="max-w-[1120px] mx-auto px-5">
          <ScrollReveal animation="slide-up">
            <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">Selected Work</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white -tracking-[0.03em] leading-[1.1] mb-6" data-testid="page-title">
              Projects & Front-End Demos
            </h1>
            <p className="text-xl text-[#B7B7B7] max-w-2xl leading-relaxed">
              These projects reflect real work done in healthcare, nonprofit, and community environments — rebuilt as shareable demos using the same architecture and constraints I used in production.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── COMPACT CARD PREVIEW ROW (3 project + 1 CTA) ─────────────────── */}
      <section className="pb-8 bg-[#0D0D0D]">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allCardProjects.slice(0, 3).map((project, idx) => (
              <ScrollReveal key={project.slug} animation="slide-up" delay={idx * 60}>
                <ProjectCardStandard project={project} />
              </ScrollReveal>
            ))}
            <ScrollReveal animation="slide-up" delay={3 * 60}>
              <ProjectCardCTA
                headline="Want the full story?"
                subline="Each project below includes a deep-dive case study with architecture, decisions, and outcomes."
                ctaLabel="See Case Studies"
                ctaHref="#case-studies"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECT (primary, full-width) ────────────────────────── */}
      <section id="case-studies" className="py-20 md:py-28 bg-[#111111]">
        <div className="max-w-[1120px] mx-auto px-5">
          <ScrollReveal animation="slide-up">
            <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-2">Featured Project</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white -tracking-[0.03em] mb-12">
              Flagship Work
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade" delay={100}>
            <ProjectCardFeaturedRow project={{ ...featureRows[0] }} imageRight isPrimary />
          </ScrollReveal>
        </div>
      </section>

      {/* ── FEATURE ROWS (stacked, alternating) ──────────────────────────── */}
      {featureRows.slice(1).map((project, idx) => (
        <section
          key={project.slug}
          className={`py-16 md:py-24 ${idx % 2 === 0 ? "bg-[#0D0D0D]" : "bg-[#111111]"}`}
        >
          <div className="max-w-[1120px] mx-auto px-5">
            {/* Divider with label */}
            <ScrollReveal animation="slide-up">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs tracking-widest uppercase text-[#7A7A7A] font-medium">
                  Project {String(idx + 2).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px bg-[#20252A]" />
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade" delay={80}>
              <ProjectCardFeaturedRow
                project={project}
                imageRight={idx % 2 !== 0}
                isPrimary={false}
              />
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0D0D0D] via-violet-950/30 to-[#0D0D0D] border-t border-[#20252A]">
        <div className="max-w-[1120px] mx-auto px-5 py-20">
          <ScrollReveal animation="slide-up">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h2 className="font-display text-4xl font-bold text-white -tracking-[0.03em] leading-[1.1]">
                  Let's build something together.
                </h2>
                <p className="text-[#B7B7B7] text-lg leading-relaxed">
                  Interested in working together or learning more about my projects? I'd love to hear from you.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
                >
                  Start a Conversation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
