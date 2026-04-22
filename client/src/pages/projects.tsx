import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { getPinnedProjects, getAdditionalProjects, GITHUB_USER } from "@/lib/projects";
import { resolveCaseStudySlug } from "@/data/caseStudies";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useReveal } from "@/hooks/useReveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const pinnedProjects = getPinnedProjects();
const additionalProjectsList = getAdditionalProjects();

export default function Projects() {
  useReveal();
  const navigate = useNavigate();

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

      {/* ── PINNED PROJECTS ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#111111]">
        <div className="max-w-[1120px] mx-auto px-5">
          <ScrollReveal animation="fade" delay={100}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              loop={true}
              pagination={{ clickable: true }}
              className="project-swiper pb-12"
            >
              {pinnedProjects.map((project) => (
                <SwiperSlide key={project.slug}>
                  <article
                    data-reveal
                      className={`group bg-[#0D0D0D] border border-[#20252A] rounded-2xl overflow-hidden hover:border-violet-500/40 transition-colors h-[420px] flex flex-col ${resolveCaseStudySlug(project.slug) ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                      const caseStudySlug = resolveCaseStudySlug(project.slug);
                      if (caseStudySlug) {
                        navigate(`/projects/${caseStudySlug}`);
                      }
                    }}
                  >
                  <div className="relative aspect-video bg-[#1A1A1A] overflow-hidden flex-shrink-0">
                    <img
                      src={`https://opengraph.githubassets.com/1/${GITHUB_USER}/${project.slug}`}
                      alt={`${project.displayTitle} preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-5 flex-1 flex flex-col gap-3">
                    <h2 className="text-lg font-bold text-white" data-testid={`project-title-${project.slug}`}>
                      {project.displayTitle}
                    </h2>
                    <p className="text-sm text-[#7A7A7A] leading-relaxed flex-1" data-testid={`project-summary-${project.slug}`}>
                      {project.description.length > 100 ? project.description.slice(0, 97) + "…" : project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-xs bg-[#1A1A1A] text-[#B7B7B7] px-2.5 py-1 rounded-full" data-testid={`project-tag-${project.slug}-${i}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto pt-1">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-violet-500/40 hover:bg-violet-500/10 text-violet-400 transition-colors"
                          data-testid={`project-demo-${project.slug}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          View Demo
                        </a>
                      )}
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                        data-testid={`project-repo-${project.slug}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-3.5 w-3.5" />
                        View Code
                      </a>
                    </div>
                  </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ADDITIONAL PROJECTS ──────────────────────────────────────────── */}
      {additionalProjectsList.length > 0 && (
        <section className="py-16 md:py-24 bg-[#0D0D0D]">
          <div className="max-w-[1120px] mx-auto px-5">
            <ScrollReveal animation="slide-up">
              <h2 className="font-display text-2xl font-bold text-white mb-8">More Public Work</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalProjectsList.map((project, idx) => (
                <ScrollReveal key={project.slug} animation="slide-up" delay={idx * 60}>
                  <article
                    data-reveal
                    className={`group bg-[#111111] border border-[#20252A] rounded-2xl overflow-hidden hover:border-violet-500/40 smooth-card h-full flex flex-col ${resolveCaseStudySlug(project.slug) ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                      const caseStudySlug = resolveCaseStudySlug(project.slug);
                      if (caseStudySlug) navigate(`/projects/${caseStudySlug}`);
                    }}
                  >
                    <div className="relative aspect-video bg-[#1A1A1A] overflow-hidden flex-shrink-0">
                      <img
                        src={`https://opengraph.githubassets.com/1/${GITHUB_USER}/${project.slug}`}
                        alt={`${project.displayTitle} preview`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col gap-3">
                      <h2 className="text-lg font-bold text-white">{project.displayTitle}</h2>
                      <p className="text-sm text-[#7A7A7A] leading-relaxed flex-1">
                        {project.description.length > 100 ? project.description.slice(0, 97) + "…" : project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs bg-[#1A1A1A] text-[#B7B7B7] px-2.5 py-1 rounded-full">{tech}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto pt-1">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-violet-500/40 hover:bg-violet-500/10 text-violet-400 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View Demo
                          </a>
                        )}
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-3.5 w-3.5" />
                          View Code
                        </a>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

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
