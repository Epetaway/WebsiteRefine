import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { projects } from "@/data/projects";

export default function Projects() {
  // Separate core professional demos from side projects
  const professionalProjects = useMemo(() => projects.filter(p => p.category === "featured"), []);
  const sideProjects = useMemo(() => projects.filter(p => p.category === "development"), []);

  const title = "Projects — Earl Hickson Jr. | Front-End Developer";
  const description = "Front-end development projects showcasing React, Angular, Vue, WordPress, and modern JavaScript. Healthcare portals, landing page systems, and accessibility-focused UI.";

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
              Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collection of front-end projects demonstrating real-world experience with modern JavaScript frameworks, accessibility, and performance optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Core Professional Demos */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" data-testid="section-title-professional">
            Core Professional Demos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {professionalProjects.map((project) => (
              <div key={project.id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-3" data-testid={`project-title-${project.id}`}>
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4" data-testid={`project-summary-${project.id}`}>
                  {project.summary || project.description}
                </p>
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags ? project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                      data-testid={`project-tag-${project.id}-${index}`}
                    >
                      {tag}
                    </span>
                  )) : project.stack.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                      data-testid={`project-tech-${project.id}-${index}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-3">
                  {project.slug && (
                    <a
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium text-sm"
                      data-testid={`project-case-study-${project.id}`}
                    >
                      <i className="fas fa-rocket mr-2" />
                      View Case Study
                    </a>
                  )}
                  {project.links?.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-500 hover:text-gray-700 font-medium text-sm"
                      data-testid={`project-repo-${project.id}`}
                    >
                      <i className="fab fa-github mr-2" />
                      View Code
                    </a>
                  )}
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-500 hover:text-gray-700 font-medium text-sm"
                      data-testid={`project-demo-${project.id}`}
                    >
                      <i className="fas fa-external-link-alt mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Side Projects */}
      {sideProjects.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8" data-testid="section-title-side">
              Side Projects
            </h2>
            <p className="text-gray-600 mb-8">
              Practice and hobby projects demonstrating various front-end techniques and JavaScript fundamentals.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sideProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold mb-2" data-testid={`side-project-title-${project.id}`}>
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4" data-testid={`side-project-description-${project.id}`}>
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.stack.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        data-testid={`side-project-tech-${project.id}-${index}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-3">
                    {project.links?.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 text-sm hover:text-primary-600"
                        data-testid={`side-project-demo-${project.id}`}
                      >
                        Demo
                      </a>
                    )}
                    {project.links?.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-sm hover:text-gray-700"
                        data-testid={`side-project-repo-${project.id}`}
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="cta-title">
            Interested in Working Together?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Available for front-end development projects and engineering consultations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:e@ehicksonjr.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
              data-testid="button-contact"
            >
              <i className="fas fa-envelope mr-2" aria-hidden="true" />
              Get In Touch
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-500 transition-colors"
              data-testid="button-projects"
            >
              <i className="fas fa-rocket mr-2" aria-hidden="true" />
              View Case Studies
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}