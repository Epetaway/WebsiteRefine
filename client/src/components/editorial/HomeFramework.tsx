import { Link } from "react-router-dom";
import { investigations } from "@/data/investigations";

const branchDescriptions = {
  withyou: "Private relationship application",
  dojonet: "Martial arts training journal",
  "gundam-forge": "Deck builder and playtest simulator",
} as const;

const workingPrinciples = [
  {
    title: "Capability over convenience",
    detail: "The goal is what someone becomes able to do, not just what the tool does for them.",
  },
  {
    title: "Agency before automation",
    detail: "Support human decision-making; do not replace it.",
  },
  {
    title: "Evidence before claim",
    detail: "Do not present what is designed as what is shipped.",
  },
  {
    title: "Build to find out",
    detail: "Working software reveals what mockups cannot.",
  },
];

export function HomeFramework() {
  return (
    <section className="home-framework" aria-labelledby="home-framework-title">
      <header className="home-framework__header">
        <div>
          <span>The framework</span>
          <h2 id="home-framework-title">One thesis, four working principles.</h2>
        </div>
        <Link to="/research">Read the research statement →</Link>
      </header>

      <div className="home-framework__grid">
        <figure className="framework-network" aria-labelledby="framework-network-title">
          <header><span id="framework-network-title">Capability network</span><span>Fig. 04</span></header>
          <div className="framework-network__body">
            <div className="framework-network__root">
              <i aria-hidden="true" />
              <span><strong>Human capability — the thesis</strong><small>Technology should expand what a person becomes able to do.</small></span>
            </div>
            <nav className="framework-network__branches" aria-label="Investigations branching from the human capability thesis">
              {investigations.map((project) => (
                <Link key={project.slug} to={`/work/${project.slug}`} className="framework-branch" style={{ "--project-accent": project.accent } as React.CSSProperties}>
                  <i className="framework-branch__line" aria-hidden="true" />
                  <i className="framework-branch__node" aria-hidden="true" />
                  <span>
                    <b>{project.number} / {project.theme}</b>
                    <strong>{project.name} — {branchDescriptions[project.slug]}</strong>
                    <small>{project.status} · {project.stack[0]}</small>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <figcaption>Three investigations branch from one thesis — select a node to open its study.</figcaption>
        </figure>

        <div className="framework-principles">
          <span className="framework-principles__label">Working principles</span>
          <ol>
            {workingPrinciples.map((principle, index) => (
              <li key={principle.title}>
                <span>P·{String(index + 1).padStart(2, "0")}</span>
                <strong>{principle.title}</strong>
                <p>{principle.detail}</p>
              </li>
            ))}
          </ol>
          <aside className="framework-boundary">
            <i aria-hidden="true" />
            <p><span>Preliminary — </span>These independent investigations use working software to make human-centered questions concrete. They are informed by HCI principles but have not yet undergone formal research evaluation.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
