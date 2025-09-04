import type { Project } from "@/data/projects";

interface CaseStudyCardProps {
  project: Project;
  featured?: boolean;
}

export default function CaseStudyCard({ project, featured = false }: CaseStudyCardProps) {
  const { id, title, description, problem, solution, result, links, stack = [], features = [], category } = project || {};
  const hasDemo = Boolean(links?.demo);
  const hasRepo = Boolean(links?.repo);

  if (featured) {
    return (
      <section
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12"
        aria-labelledby={`case-title-${id}`}
      >
        <div className="grid lg:grid-cols-5 gap-8">
          <header className="lg:col-span-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
              <i className="fas fa-star mr-2" aria-hidden="true" />
              Featured Project
            </span>
            <h3 id={`case-title-${id}`} className="text-2xl lg:text-3xl font-bold mb-3" data-testid={`title-${id}`}>
              {title}
            </h3>
            {description ? (
              <p className="text-lg text-gray-700 mb-6" data-testid={`description-${id}`}>
                {description}
              </p>
            ) : null}

            <dl className="space-y-4 mb-8">
              {problem ? (
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1 mr-3 shrink-0">
                    <i className="fas fa-exclamation-triangle text-red-600 text-xs" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 mb-1">Problem</dt>
                    <dd className="text-gray-700 text-sm" data-testid={`problem-${id}`}>{problem}</dd>
                  </div>
                </div>
              ) : null}

              {solution ? (
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3 shrink-0">
                    <i className="fas fa-cog text-blue-600 text-xs" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 mb-1">Solution</dt>
                    <dd className="text-gray-700 text-sm" data-testid={`solution-${id}`}>{solution}</dd>
                  </div>
                </div>
              ) : null}

              {result ? (
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3 shrink-0">
                    <i className="fas fa-chart-line text-green-600 text-xs" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 mb-1">Result</dt>
                    <dd className="text-gray-700 text-sm" data-testid={`result-${id}`}>{result}</dd>
                  </div>
                </div>
              ) : null}
            </dl>

            <div className="flex flex-wrap gap-4">
              {hasDemo && (
                <a
                  href={links!.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700"
                  data-testid={`link-demo-${id}`}
                >
                  <i className="fas fa-external-link-alt mr-2" aria-hidden="true" />
                  Live Demo
                </a>
              )}
              {hasRepo && (
                <a
                  href={links!.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-700 font-semibold hover:text-gray-900"
                  data-testid={`link-repo-${id}`}
                >
                  <i className="fab fa-github mr-2" aria-hidden="true" />
                  View Code
                </a>
              )}
            </div>
          </header>

          <aside className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">Technical Specification</h4>

              {stack.length > 0 && (
                <div className="space-y-3 text-sm">
                  {stack.map((tech, index) => (
                    <div key={index} className="flex">
                      <span className="text-gray-500 w-24 shrink-0">
                        {index === 0 ? "Framework:" : index === 1 ? "Styling:" : index === 2 ? "APIs:" : "Other:"}
                      </span>
                      <span className="text-gray-900 ml-2" data-testid={`tech-${id}-${index}`}>
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {features.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h5 className="font-semibold text-gray-900 mb-2">Key Features</h5>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {features.map((feature, index) => (
                      <li key={index} data-testid={`feature-${id}-${index}`}>
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    );
  }

  return (
    <section className="grid lg:grid-cols-3 gap-8 items-start" aria-labelledby={`case-title-${id}`}>
      <header className="lg:col-span-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
          <i className="fas fa-palette mr-2" aria-hidden="true" />
          {category || "Case Study"}
        </span>

        <h3 id={`case-title-${id}`} className="text-xl lg:text-2xl font-bold mb-2" data-testid={`title-${id}`}>
          {title}
        </h3>

        {description ? (
          <p className="text-gray-700 mb-5" data-testid={`description-${id}`}>
            {description}
          </p>
        ) : null}

        <dl className="space-y-3 text-sm">
          {problem ? (
            <div>
              <dt className="font-semibold inline">Challenge:</dt>{" "}
              <dd className="inline text-gray-700" data-testid={`problem-${id}`}>{problem}</dd>
            </div>
          ) : null}
          {solution ? (
            <div>
              <dt className="font-semibold inline">Approach:</dt>{" "}
              <dd className="inline text-gray-700" data-testid={`solution-${id}`}>{solution}</dd>
            </div>
          ) : null}
          {result ? (
            <div>
              <dt className="font-semibold inline">Impact:</dt>{" "}
              <dd className="inline text-gray-700" data-testid={`result-${id}`}>{result}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-4 flex gap-4">
          {hasDemo && (
            <a
              href={links!.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 font-medium hover:text-primary-700"
              data-testid={`link-demo-${id}`}
            >
              Live Site
            </a>
          )}
          {hasRepo && (
            <a
              href={links!.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 font-medium hover:text-gray-900"
              data-testid={`link-repo-${id}`}
            >
              Repository
            </a>
          )}
        </div>
      </header>

      <aside className="bg-gray-50 rounded-2xl p-6">
        <div className="text-sm text-gray-600 mb-3">Tech Stack</div>

        {stack.length > 0 ? (
          <div className="space-y-2">
            {stack.slice(0, 4).map((tech, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm" data-testid={`tech-${id}-${index}`}>
                  {tech}
                </span>
                <span className="text-xs text-gray-500">
                  {index === 0 ? "Framework" : index === 1 ? "Styling" : index === 2 ? "Tools" : "Platform"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">Details coming soon.</div>
        )}
      </aside>
    </section>
  );
}
