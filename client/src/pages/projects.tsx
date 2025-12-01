import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

// Get featured projects for display
const professionalProjects = projects.filter(p => p.category === "featured");

export default function Projects() {
  const [viewMode, setViewMode] = useState<"developer" | "portfolio">("portfolio");

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

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">
              Projects &amp; Professional Front-End Demos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These projects mirror the kind of work I have done in healthcare, nonprofit, and community environments. For privacy and NDAs, many are re-created as shareable demos using the same architecture, patterns, and technical constraints I used in production.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={viewMode === "developer" ? "primary" : "secondary"}
              onClick={() => setViewMode("developer")}
              className={viewMode === "developer" ? "bg-dominant text-white" : ""}
            >
              Developer View
            </Button>
            <Button
              variant={viewMode === "portfolio" ? "primary" : "secondary"}
              onClick={() => setViewMode("portfolio")}
              className={viewMode === "portfolio" ? "bg-dominant text-white" : ""}
            >
              Portfolio View
            </Button>
          </div>
        </div>
      </section>

      {/* Professional Demos */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {professionalProjects.map((project) => (
              <div key={project.id} className="bg-white border rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-bold mb-4" data-testid={`project-title-${project.id}`}>
                  {project.title}
                </h2>
                
                <p className="text-gray-600 mb-6 text-lg" data-testid={`project-summary-${project.id}`}>
                  {project.summary || project.description}
                </p>

                {/* Developer View Notes */}
                {viewMode === "developer" && project.devNotes && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-dominant">
                    <h3 className="font-semibold text-sm text-gray-700 mb-2">Developer View Notes:</h3>
                    <p className="text-gray-600 text-sm">{project.devNotes}</p>
                  </div>
                )}
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(project.tags || []).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                      data-testid={`project-tag-${project.id}-${index}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-4">
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-dominant hover:text-blue-700 font-medium"
                      data-testid={`project-demo-${project.id}`}
                    >
                      <i className="fas fa-external-link-alt mr-2" />
                      Live Demo
                    </a>
                  )}
                  {project.links?.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-500 hover:text-gray-700 font-medium"
                      data-testid={`project-repo-${project.id}`}
                    >
                      <i className="fab fa-github mr-2" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:e@ehicksonjr.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-dominant text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              data-testid="button-contact"
            >
              <i className="fas fa-envelope mr-2" aria-hidden="true" />
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
