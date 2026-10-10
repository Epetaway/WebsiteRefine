import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { CapabilityNetwork } from "@/components/editorial/CapabilityNetwork";
import { researchThemes } from "@/data/researchThemes";
import { investigations } from "@/data/investigations";
import { research } from "@/data/professional";

const principles = [
  ["Capability over convenience", "Ask what someone becomes able to do, not only what the tool does for them."],
  ["Agency before automation", "Support judgment without replacing it."],
  ["Evidence before claim", "Do not present what is designed as what is shipped—or what is built as proven."],
  ["Build to find out", "Working software reveals constraints that static mockups cannot."],
];

export default function Research() {
  return (
    <div className="portfolio-page">
      <SEO title="Research — Earl Hickson Jr." description="Independent human-centered product inquiry across relationships, learning, and decision support." path="/research" image="/assets/brand/social/og-research.svg" />
      <PageIntro label="Research / Direction" title={<>I design and build technology that helps people become <em>more capable.</em></>} lead={<p>Building software pushed my questions beyond how an interface should look or work. I became increasingly interested in what the whole system helps a person understand, decide, learn, create, and do.</p>} aside={<div className="research-aside"><span>Working distinction</span><p>Software can function correctly without producing the human outcome its designer hoped for.</p></div>} />

      <section className="section-shell research-origin">
        <SectionHeader number="01" label="Why HCI" title="The question expanded with the medium." />
        <div className="research-origin__grid"><div><p>My formal training is a BFA in Graphic Design: typography, hierarchy, composition, and the visual grammar of communication. Interaction design moved the work into behavior. Frontend engineering made the behavior real. Full-stack development exposed the system beneath the interface.</p><p>Building the whole stack answered whether I could make something work. It did not answer whether the product made a person more capable. That gap is why human-computer interaction interests me: it supplies methods for testing the human consequence instead of treating intention as evidence.</p></div><ol><li>How should it look?</li><li>How should it work?</li><li className="is-current">What does it make someone capable of?</li></ol></div>
      </section>

      <section className="technology-section section-shell">
        <SectionHeader number="02" label="Current themes" title="Three domains for one inquiry." light />
        <CapabilityNetwork />
        <div className="research-theme-grid">{researchThemes.map((theme) => <article key={theme.id} style={{ "--theme-accent": theme.color } as React.CSSProperties}><span>{theme.number}</span><h3>{theme.label}</h3><blockquote>{theme.question}</blockquote><p>{theme.capability}</p><Link to={`/work/${investigations.find((item) => item.theme === theme.label)?.slug}`} className="text-link text-link--light">See the case study <span aria-hidden="true">→</span></Link></article>)}</div>
      </section>

      <section className="section-shell built-proven">
        <SectionHeader number="03" label="Built versus proven" title="Implementation evidence and human evidence are not interchangeable." />
        <div className="built-proven__grid"><div className="built-proven__statement"><blockquote>“I do not equate code existing with a feature being shipped.”</blockquote><blockquote>“I do not equate a type existing with a rule being enforced.”</blockquote><blockquote>“I do not equate deployment configuration with a live product.”</blockquote></div><div><p>These independent case studies are ways of thinking through product questions by building. They are not peer-reviewed studies. Implementation can reveal technical constraints, state transitions, privacy gaps, and model inconsistencies. It cannot by itself establish a human outcome.</p><p>The portfolio therefore labels implementation, design, gaps, and uncertainty separately. That is not a disclaimer around the work; it is part of the work.</p></div></div>
      </section>

      <section className="section-shell research-principles">
        <SectionHeader number="04" label="Working principles" title="A current operating position, open to revision." />
        <div className="research-principles__grid">{principles.map(([title, detail], index) => <article key={title}><span>P·{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
      </section>

      <section className="section-shell research-preparation">
        <SectionHeader number="05" label="Research preparation" title="Methods used and methods sought are different evidence categories." />
        <div className="research-methods">
          <article>
            <span>Methods used in professional or independent practice</span>
            <h3>Applied preparation</h3>
            <ul>{research.methodsUsed.map((method) => <li key={method}>{method}</li>)}</ul>
          </article>
          <article>
            <span>Methods sought through graduate study</span>
            <h3>Proposed learning direction</h3>
            <ul>{research.methodsSought.map((method) => <li key={method}>{method}</li>)}</ul>
          </article>
        </div>
        <p className="research-preparation__boundary">The methods in the second column are not presented as completed research experience. They are the methodological preparation I am seeking in order to evaluate whether technology helps people become more capable.</p>
      </section>

      <section className="research-direction"><p className="eyebrow eyebrow--light">Future direction</p><h2>Methods strong enough to test the human question.</h2><p>Future work includes scope-comprehension testing for WithYou, diary and observational studies for DojoNet, and comparative decision tasks for Gundam Forge. These are proposed directions—not completed studies.</p><div className="button-row"><Link to="/work" className="button button--light">View the case studies</Link><Link to="/contact" className="button button--outline-light">Discuss the work</Link></div></section>
    </div>
  );
}
