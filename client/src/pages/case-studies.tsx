import { projects } from "@/data/projects";
import CaseStudyCard from "@/components/ui/case-study-card";

export default function CaseStudies() {
  const featuredProject = projects.find(p => p.category === 'featured');
  const otherProjects = projects.filter(p => p.category !== 'featured');

  // Flip to false when you’re ready to reveal the page
  const isUnderConstruction = false;

  return (
    <div className="">
      {isUnderConstruction ? (
        <section
          aria-labelledby="uc-title"
          className="relative isolate bg-gradient-to-b from-primary-50/60 via-white to-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Badge */}
            <div className="mx-auto w-fit mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-primary-700 shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-primary-500 animate-pulse" aria-hidden="true" />
                Case Studies
              </span>
            </div>

            {/* Title & Copy */}
            <div className="text-center">
              <h1
                id="uc-title"
                className="text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                data-testid="page-title"
              >
                Coming Soon
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                I’m polishing up detailed front‑end case studies with production code, accessibility notes,
                and performance wins. This page will be back shortly.
              </p>
            </div>

            {/* Progress shimmer (subtle) */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 ring-1 ring-inset ring-gray-200">
                <div className="h-full w-1/3 animate-[shimmer_1.6s_linear_infinite] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              </div>
            </div>

            {/* CTAs (match site style) */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@ehicksonjr.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-sm"
                data-testid="button-contact"
              >
                <i className="fas fa-envelope mr-2" aria-hidden="true" />
                Start a Conversation
              </a>
              <a
                href="/assets/Earl_Hickson_Resume_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-500 transition-colors"
                data-testid="button-resume"
              >
                <i className="fas fa-download mr-2" aria-hidden="true" />
                Download Resume
              </a>
            </div>

            {/* Small note */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Want early access to a case study draft? Email me and I’ll share a preview.
            </p>
          </div>

          {/* Decorative radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center opacity-50"
          >
            <div className="h-48 w-[36rem] rounded-full bg-primary-200 blur-3xl"></div>
          </div>

          {/* Keyframes for shimmer (scoped via arbitrary layer) */}
          <style jsx>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(300%); }
            }
          `}</style>
        </section>
      ) : (
        <>
          {/* Original content (kept, just hidden while under construction) */}
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">Front-End Case Studies</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Real projects, measurable results, production code. Here's how I solve complex front-end challenges 
                  with modern frameworks, accessibility standards, and performance optimization.
                </p>
              </div>
            </div>
          </section>

          {featuredProject && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <CaseStudyCard project={featuredProject} featured={true} />
              </div>
            </section>
          )}

          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-16">
                {otherProjects.slice(0, 2).map((project) => (
                  <CaseStudyCard key={project.id} project={project} />
                ))}
              </div>

              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8" data-testid="section-title-additional">Additional Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherProjects.slice(2).map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h4 className="font-bold mb-2" data-testid={`project-title-${project.id}`}>{project.title}</h4>
                      <p className="text-sm text-gray-600 mb-4" data-testid={`project-description-${project.id}`}>
                        {project.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded" data-testid={`project-stack-${project.id}`}>
                          {project.stack[0]}
                        </span>
                        <div className="flex gap-2">
                          {project.links.demo && (
                            <a 
                              href={project.links.demo} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary-500 text-sm hover:text-primary-600"
                              data-testid={`project-demo-${project.id}`}
                            >
                              Demo
                            </a>
                          )}
                          {project.links.repo && (
                            <a 
                              href={project.links.repo} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-500 text-sm hover:text-gray-700"
                              data-testid={`project-repo-${project.id}`}
                            >
                              Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-primary-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6" data-testid="cta-title">Interested in Working Together?</h2>
              <p className="text-xl text-gray-600 mb-8">
                I'm available for senior front-end development roles and consulting projects. 
                Let's discuss how I can help your team build exceptional user experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:hello@ehicksonjr.com" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
                  data-testid="button-contact"
                >
                  <i className="fas fa-envelope mr-2" aria-hidden="true"></i>
                  Start a Conversation
                </a>
                <a 
                  href="/assets/Earl_Hickson_Resume_2025.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-500 transition-colors"
                  data-testid="button-resume"
                >
                  <i className="fas fa-download mr-2" aria-hidden="true"></i>
                  Download Resume
                </a>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
