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
        className="bg-card border border-border rounded-card p-8 lg:p-12"
        aria-labelledby={`case-title-${id}`}
      >
        <div className="grid lg:grid-cols-5 gap-8">
          <header className="lg:col-span-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-dominant/20 text-dominant text-sm font-semibold mb-4">
              <i className="fas fa-star mr-2" aria-hidden="true" />
              Featured Project
            </span>
            <h3 id={`case-title-${id}`} className="text-2xl lg:text-3xl font-bold mb-3 text-textPrimary" data-testid={`title-${id}`}>
              {title}
            </h3>
            {description ? (
              <p className="text-lg text-textSecondary mb-6" data-testid={`description-${id}`}>
                {description}
              </p>
            ) : null}

            <dl className="space-y-4 mb-8">
              {problem ? (
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-1 mr-3 shrink-0">
                    <i className="fas fa-exclamation-triangle text-accent text-xs" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-semibold text-textPrimary mb-1">Problem</dt>
                    <dd className="text-textSecondary text-sm" data-testid={`problem-${id}`}>{problem}</dd>
                  </div>
                </div>
              ) : null}

              {solution ? (
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-dominant/20 rounded-full flex items-center justify-center mt-1 mr-3 shrink-0">
                    <i className="fas fa-cog text-dominant text-xs" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-semibold text-textPrimary mb-1">Solution</dt>
                    <dd className="text-textSecondary text-sm" data-testid={`solution-${id}`}>{solution}</dd>
                  </div>
                </div>
              ) : null}

              {result ? (
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-dominant/20 rounded-full flex items-center justify-center mt-1 mr-3 shrink-0">
                    <i className="fas fa-chart-line text-dominant text-xs" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-semibold text-textPrimary mb-1">Result</dt>
                    <dd className="text-textSecondary text-sm" data-testid={`result-${id}`}>{result}</dd>
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
                  className="inline-flex items-center text-dominant font-semibold hover:opacity-80"
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
                  className="inline-flex items-center text-textSecondary font-semibold hover:text-textPrimary"
                  data-testid={`link-repo-${id}`}
                >
                  <i className="fab fa-github mr-2" aria-hidden="true" />
                  View Code
                </a>
              )}
            </div>
          </header>

          <aside className="lg:col-span-2">
            <div className="bg-muted border border-border rounded-card p-6">
              <h4 className="font-bold text-textPrimary mb-4">Technical Specification</h4>

              {stack.length > 0 && (
                <div className="space-y-3 text-sm">
                  {stack.map((tech, index) => (
                    <div key={index} className="flex">
                      <span className="text-textSecondary w-24 shrink-0">
                        {index === 0 ? "Framework:" : index === 1 ? "Styling:" : index === 2 ? "APIs:" : "Other:"}
                      </span>
                      <span className="text-textPrimary ml-2" data-testid={`tech-${id}-${index}`}>
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {features.length > 0 && (
                <div className="mt-6 pt-4 border-t border-border">
                  <h5 className="font-semibold text-textPrimary mb-2">Key Features</h5>
                  <ul className="text-xs text-textSecondary space-y-1">
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
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-dominant/20 text-dominant text-sm font-semibold mb-4">
          <i className="fas fa-palette mr-2" aria-hidden="true" />
          {category || "Case Study"}
        </span>

        <h3 id={`case-title-${id}`} className="text-xl lg:text-2xl font-bold mb-2 text-textPrimary" data-testid={`title-${id}`}>
          {title}
        </h3>

        {description ? (
          <p className="text-textSecondary mb-5" data-testid={`description-${id}`}>
            {description}
          </p>
        ) : null}

        <dl className="space-y-3 text-sm">
          {problem ? (
            <div>
              <dt className="font-semibold inline text-textPrimary">Challenge:</dt>{" "}
              <dd className="inline text-textSecondary" data-testid={`problem-${id}`}>{problem}</dd>
            </div>
          ) : null}
          {solution ? (
            <div>
              <dt className="font-semibold inline text-textPrimary">Approach:</dt>{" "}
              <dd className="inline text-textSecondary" data-testid={`solution-${id}`}>{solution}</dd>
            </div>
          ) : null}
          {result ? (
            <div>
              <dt className="font-semibold inline text-textPrimary">Impact:</dt>{" "}
              <dd className="inline text-textSecondary" data-testid={`result-${id}`}>{result}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-4 flex gap-4">
          {hasDemo && (
            <a
              href={links!.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dominant font-medium hover:opacity-80"
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
              className="text-textSecondary font-medium hover:text-textPrimary"
              data-testid={`link-repo-${id}`}
            >
              Repository
            </a>
          )}
        </div>
      </header>

      <aside className="bg-muted border border-border rounded-card p-6">
        <div className="text-sm text-textSecondary mb-3">Tech Stack</div>

        {stack.length > 0 ? (
          <div className="space-y-2">
            {stack.slice(0, 4).map((tech, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm text-textPrimary" data-testid={`tech-${id}-${index}`}>
                  {tech}
                </span>
                <span className="text-xs text-textSecondary">
                  {index === 0 ? "Framework" : index === 1 ? "Styling" : index === 2 ? "Tools" : "Platform"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-textSecondary">Details coming soon.</div>
        )}
      </aside>
    </section>
  );
}
