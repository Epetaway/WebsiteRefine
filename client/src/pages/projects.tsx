import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";
import { getPinnedProjects, getAdditionalProjects, GITHUB_USER } from "@/lib/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Get projects from centralized data layer
const pinnedProjects = getPinnedProjects();
const additionalProjectsList = getAdditionalProjects();

export default function Projects() {
  useReveal();

  const title = "Projects & Professional Front-End Demos — Earl Hickson Jr.";
  const description = "Front-end development projects showcasing React, TypeScript, healthcare portals, and accessibility-focused UI.";

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://www.ehicksonjr.com/projects" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Header - Hero-lite with gradient */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
        
        <div className="relative max-w-[1120px] mx-auto px-5">
          <ScrollReveal as="div" className="text-center" animation="slide-up" threshold={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white" data-testid="page-title">
              Projects &amp; Professional Front-End Demos
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              These projects mirror the kind of work I have done in healthcare, nonprofit, and community environments. For privacy and NDAs, many are re-created as shareable demos using the same architecture, patterns, and technical constraints I used in production.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pinned Projects Section - Swiper Carousel */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-[1120px] mx-auto px-5">
          <ScrollReveal animation="fade" delay={100}>
            <Swiper
              spaceBetween={24}
              slidesPerView={1.05}
              breakpoints={{
                640: { slidesPerView: 1.4, spaceBetween: 24 },
                768: { slidesPerView: 2.1, spaceBetween: 24 },
                1024: { slidesPerView: 3.1, spaceBetween: 24 },
              }}
            >
              {pinnedProjects.map((project, idx) => (
                <SwiperSlide key={project.slug} className="h-auto">
                  <article 
                    data-reveal 
                    className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm card-hover h-full flex flex-col max-w-[345px] mx-auto"
                  >
                    {/* Project Preview Image - 16:9 aspect ratio */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                      <img
                        src={`https://opengraph.githubassets.com/1/${GITHUB_USER}/${project.slug}`}
                        alt={`${project.displayTitle} preview`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Project Content */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col">
                      {/* Title - no arrow */}
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight" data-testid={`project-title-${project.slug}`}>
                        {project.displayTitle}
                      </h2>
                      
                      {/* Summary - limited to 100 characters */}
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed" data-testid={`project-summary-${project.slug}`}>
                        {(() => {
                          const txt = project.description;
                          return txt.length > 100 ? txt.slice(0, 97) + "…" : txt;
                        })()}
                      </p>
                      
                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full"
                            data-testid={`project-tag-${project.slug}-${index}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* CTA Links */}
                      <div className="flex flex-wrap gap-2 pt-1 mt-auto">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                            data-testid={`project-demo-${project.slug}`}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Live Demo
                          </a>
                        )}
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-sm"
                          data-testid={`project-repo-${project.slug}`}
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

      {/* Additional Projects Section */}
      {additionalProjectsList.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-[1120px] mx-auto px-5">
            <ScrollReveal as="div" animation="slide-up" threshold={0.1}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                More Public Work
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              {additionalProjectsList.map((project, idx) => (
                <ScrollReveal key={project.slug} animation="slide-up" delay={idx * 60}>
                  <article 
                    data-reveal 
                    className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm card-hover h-full flex flex-col"
                  >
                    {/* Project Preview Image */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                      <img
                        src={`https://opengraph.githubassets.com/1/${GITHUB_USER}/${project.slug}`}
                        alt={`${project.displayTitle} preview`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Project Content - Compact */}
                    <div className="p-3 space-y-2 flex-1 flex flex-col">
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight line-clamp-1">
                        {project.displayTitle}
                      </h2>
                      
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack Tags - Compact */}
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 2).map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* CTA Links - Compact */}
                      <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] rounded-md border border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Demo
                          </a>
                        )}
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 text-[10px] rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-sm"
                        >
                          <Github className="h-3 w-3" />
                          Code
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

      {/* CTA Section - matching Home page gradient */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-emerald-600">
        <div className="max-w-[1120px] mx-auto px-5">
          <ScrollReveal as="div" animation="slide-up" threshold={0.1}>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Let's Build Something Together
              </h2>
              <p className="text-xl text-blue-50 mb-8">
                Interested in working together or learning more about my projects? I'd love to hear from you.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 shadow-lg button-lift">
                  Start a Conversation
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
