import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";

// Get featured projects for display
const professionalProjects = projects.filter(p => p.category === "featured");

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

      {/* Professional Demos */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {professionalProjects.map((project, idx) => (
              <ScrollReveal key={project.id} animation="slide-up" delay={idx * 60}>
                <article 
                  data-reveal 
                  className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm card-hover h-full flex flex-col"
                >
                  {/* Project Preview Image - 16:9 aspect ratio */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="text-4xl opacity-20">
                            {project.category === 'featured' ? '⚡' : '🚀'}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            Preview
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Content */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col">
                    {/* Title with arrow */}
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2" data-testid={`project-title-${project.id}`}>
                      {project.title}
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 text-gray-400">→</span>
                    </h2>
                    
                    {/* Summary - limited to 100 characters */}
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed" data-testid={`project-summary-${project.id}`}>
                      {(() => {
                        const txt = project.summary || project.description;
                        return txt.length > 100 ? txt.slice(0, 97) + "…" : txt;
                      })()}
                    </p>
                    
                    {/* Read More Link */}
                    {project.links?.demo && (
                      <a 
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                    
                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {(project.tags || []).slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full"
                          data-testid={`project-tag-${project.id}-${index}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* CTA Links */}
                    <div className="flex flex-wrap gap-2 pt-1 mt-auto">
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs px-3 py-1.5"
                          data-testid={`project-demo-${project.id}`}
                        >
                          Live Demo
                        </a>
                      )}
                      {project.links?.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-xs px-3 py-1.5"
                          data-testid={`project-repo-${project.id}`}
                        >
                          View Code
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
