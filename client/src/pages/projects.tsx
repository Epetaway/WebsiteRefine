import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useReveal } from "@/hooks/useReveal";

// Get featured projects for display
const professionalProjects = projects.filter(p => p.category === "featured");

export default function Projects() {
  const [viewMode, setViewMode] = useState<"developer" | "portfolio">("portfolio");
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
      <section className="relative py-24 sm:py-32 lg:py-36 bg-gradient-to-b from-gray-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal as="div" className="text-center mb-12" animation="slide-up" threshold={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" data-testid="page-title">
              Projects &amp; Professional Front-End Demos
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              These projects mirror the kind of work I have done in healthcare, nonprofit, and community environments. For privacy and NDAs, many are re-created as shareable demos using the same architecture, patterns, and technical constraints I used in production.
            </p>
          </ScrollReveal>

          {/* Enhanced View Toggle with sliding indicator */}
          <ScrollReveal as="div" className="flex justify-center mt-12" animation="fade" threshold={0.1} delay={100}>
              <div className="relative inline-flex bg-gray-100 dark:bg-gray-800/50 rounded-full p-1.5 shadow-sm border border-gray-200 dark:border-gray-700">
                {/* Sliding indicator background with spring animation */}
                <motion.div
                  className="absolute top-1.5 bottom-1.5 bg-white dark:bg-gray-700 rounded-full shadow-md"
                  initial={false}
                  animate={{
                    left: viewMode === "developer" ? "0.375rem" : "50%",
                    width: "calc(50% - 0.375rem)"
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  style={{ position: "absolute" }}
                />
              
              {/* Developer toggle */}
              <button
                onClick={() => setViewMode("developer")}
                className={`
                  relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${viewMode === "developer" 
                    ? "text-gray-900 dark:text-white" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg font-mono">&lt;/&gt;</span>
                  <span>Developer</span>
                </span>
              </button>
              
              {/* Portfolio toggle */}
              <button
                onClick={() => setViewMode("portfolio")}
                className={`
                  relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${viewMode === "portfolio" 
                    ? "text-gray-900 dark:text-white" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">✦</span>
                  <span>Portfolio</span>
                </span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Professional Demos */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {professionalProjects.map((project, idx) => (
              <ScrollReveal key={project.id} animation="slide-up" delay={idx * 80}>
                <article 
                  data-reveal 
                  className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#10b981]/20"
                >
                  {/* Project Preview Image - 16:9 aspect ratio */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="text-6xl opacity-20">
                          {project.category === 'featured' ? '⚡' : '🚀'}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          Project Preview
                        </p>
                      </div>
                    </div>
                    {/* Image placeholder, zoom and border on hover */}
                    <div className="absolute inset-0 transition-all duration-300 group-hover:scale-105 group-hover:border-4 group-hover:border-purple-500/40 rounded-xl pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Content */}
                  <div className="p-8 space-y-6">
                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight" data-testid={`project-title-${project.id}`}>
                      {project.title}
                    </h2>
                    
                    {/* Summary */}
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed" data-testid={`project-summary-${project.id}`}>
                      {project.summary || project.description}
                    </p>

                    {/* Developer View Notes */}
                    {viewMode === "developer" && project.devNotes && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-l-4 border-blue-500 dark:border-blue-400">
                        <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
                          <span className="font-mono">&lt;/&gt;</span>
                          Developer View Notes
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{project.devNotes}</p>
                      </div>
                    )}
                    
                    {/* Tech Stack Tags with icons and brand-green accents */}
                    <div className="flex flex-wrap gap-2">
                      {(project.tags || []).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 px-3.5 py-1.5 rounded-full ring-1 ring-emerald-200 dark:ring-emerald-800 hover:ring-emerald-400 dark:hover:ring-emerald-600 hover:scale-105 transition-all duration-200"
                          data-testid={`project-tag-${project.id}-${index}`}
                        >
                          <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse" />
                          <span className="mr-1 text-emerald-400 dark:text-emerald-300">✧</span>
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* CTA Links - Enhanced and larger */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary inline-flex items-center gap-2.5"
                          data-testid={`project-demo-${project.id}`}
                        >
                          <i className="fas fa-external-link-alt text-sm" />
                          <span>Live Demo</span>
                          <i className="fas fa-arrow-right text-xs opacity-70 group-hover/cta:translate-x-1 transition-transform" />
                        </a>
                      )}
                      {project.links?.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary inline-flex items-center gap-2.5"
                          data-testid={`project-repo-${project.id}`}
                        >
                          <i className="fab fa-github text-base" />
                          <span>View Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal as="div" animation="fade" threshold={0.1}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Let's Build Something Together
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Interested in working together or learning more about my projects?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:e@ehicksonjr.com"
                className="btn-secondary inline-flex items-center justify-center gap-2"
                data-testid="button-contact"
              >
                <i className="fas fa-envelope" aria-hidden="true" />
                Get In Touch
              </a>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <i className="fas fa-download" aria-hidden="true" />
                Get Resume
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
