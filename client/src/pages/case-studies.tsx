import { Helmet } from "react-helmet-async";
import { projects } from "@/data/projects";
import CaseStudyCard from "@/components/ui/case-study-card";

export default function CaseStudies() {
  const engineeringProjects = projects ?? [];
  const isUnderConstruction = false;

  const title = "Projects – Front-End Developer Portfolio | Earl Hickson Jr.";
  const description =
    "A curated selection of front-end projects inspired by real work in healthcare portals, oncology content platforms, marketing landing systems, and non-profit tools.";

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {isUnderConstruction ? (
        <section aria-labelledby="uc-title" className="relative isolate bg-gradient-to-b from-primary-50/60 via-white to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="mx-auto w-fit mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-dominant backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-primary-500 animate-pulse" aria-hidden="true" />
                Case Studies
              </span>
            </div>

            <div className="text-center">
              <h1 id="uc-title" className="text-4xl lg:text-5xl font-bold tracking-tight mb-4" data-testid="page-title">
                Coming Soon
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                I’m polishing up detailed front-end case studies with production code, accessibility notes, and performance wins.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-xl">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 ring-1 ring-inset ring-gray-200">
                <div className="h-full w-1/3 animate-[shimmer_1.6s_linear_infinite] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center opacity-50">
            <div className="h-48 w-[36rem] rounded-full bg-primary-200 blur-3xl" />
          </div>
        </section>
      ) : (
        <>
          <section className="py-20 bg-base">
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-textPrimary" data-testid="page-title">Projects</h1>
                <p className="text-xl text-textSecondary max-w-3xl mx-auto">
                  A curated selection of front-end projects inspired by real-world work across healthcare applications, oncology content platforms, marketing landing pages, and small business interfaces.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted">
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8 text-textPrimary" data-testid="section-title-engineering">Featured Projects</h2>

              <div className="space-y-16">
                {engineeringProjects.slice(0, 2).map((project) => (
                  <CaseStudyCard key={project.id} project={project} />
                ))}
              </div>

              {engineeringProjects.length > 2 && (
                <div className="mt-16">
                  <h3 className="text-xl font-bold mb-8 text-textPrimary" data-testid="section-title-additional">Additional Projects</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {engineeringProjects.slice(2).map((project) => (
                      <div key={project.id} className="bg-card border border-border rounded-card p-6 hover:border-dominant transition-colors duration-300">
                        <h4 className="font-bold mb-2 text-textPrimary" data-testid={`project-title-${project.id}`}>{project.title}</h4>
                        <p className="text-sm text-textSecondary mb-4" data-testid={`project-description-${project.id}`}>{project.description}</p>
                        <div className="flex justify-between items-center">
                          {project.stack?.[0] ? (
                            <span className="text-xs bg-dominant/20 text-dominant px-2 py-1 rounded" data-testid={`project-stack-${project.id}`}>
                              {project.stack[0]}
                            </span>
                          ) : <span />}
                          <div className="flex gap-2">
                            {project.links?.demo && (
                              <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dominant text-sm hover:opacity-80"
                                data-testid={`project-demo-${project.id}`}
                              >
                                Demo
                              </a>
                            )}
                            {project.links?.repo && (
                              <a
                                href={project.links.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-textSecondary text-sm hover:text-textPrimary"
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
              )}
            </div>
          </section>

          <section className="py-20 bg-base">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6 text-textPrimary" data-testid="cta-title">Interested in Working Together?</h2>
              <p className="text-xl text-textSecondary mb-8">Available for front-end development and engineering projects.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:e@ehicksonjr.com"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-card font-semibold hover:opacity-90 transition-opacity"
                  data-testid="button-contact"
                >
                  Start a Conversation
                </a>
                <a
                  href="/assets/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-card border-2 border-border rounded-card font-semibold hover:border-dominant hover:text-dominant transition-colors"
                  data-testid="button-resume"
                >
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
