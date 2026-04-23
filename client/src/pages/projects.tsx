import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getPinnedProjects, GITHUB_USER } from "@/lib/projects";
import { resolveCaseStudySlug } from "@/data/caseStudies";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useReveal } from "@/hooks/useReveal";
import { ProjectCardFeaturedHero, ProjectCardTile } from "@/components/ui/ProjectCard";

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
    shortTitle: p.shortTitle,
    subtitle: p.subtitle,
    caseStudySlug: resolveCaseStudySlug(p.slug),
  };
}

const METRICS: Record<string, { metric: string; metricLabel: string }> = {
  "WithYou": { metric: "+100%", metricLabel: "privacy-first — zero tracking" },
  "ama-fight-club": { metric: "+156%", metricLabel: "organic traffic growth" },
  "DojoNet-Prototype-MAX": { metric: "98", metricLabel: "Lighthouse score" },
  "Gundam-Forge": { metric: "3000+", metricLabel: "lines of shared TypeScript" },
};

// First pinned project = featured hero (full-width)
const featuredProject = {
  ...toCardData(pinnedProjects[0]),
  ...(METRICS[pinnedProjects[0].slug] ?? {}),
};

// Remaining projects for the tile grid
const tileProjects = pinnedProjects.slice(1).map((p) => ({
  ...toCardData(p),
  ...(METRICS[p.slug] ?? {}),
}));

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

      {/* ── FEATURED PROJECT — full-width bg-image hero ───────────────────── */}
      <ScrollReveal animation="fade">
        <ProjectCardFeaturedHero project={featuredProject} />
      </ScrollReveal>

      {/* ── PROJECT TILE GRID — 2-col + 1 full-width ─────────────────────── */}
      {/* The section bg acts as a 1px hairline border between tiles */}
      <section className="bg-[#1A1F24]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {/* Row 1: two equal tiles */}
          {tileProjects.slice(0, 2).map((project, idx) => (
            <ScrollReveal key={project.slug} animation="fade" delay={idx * 60}>
              <ProjectCardTile project={project} />
            </ScrollReveal>
          ))}

          {/* Row 2: one full-width tile */}
          {tileProjects[2] && (
            <div className="md:col-span-2">
              <ScrollReveal animation="fade" delay={120}>
                <ProjectCardTile project={tileProjects[2]} wide />
              </ScrollReveal>
            </div>
          )}
        </div>
      </section>

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
