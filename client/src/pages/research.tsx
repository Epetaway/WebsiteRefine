import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { CapabilityNetwork } from "@/components/editorial/CapabilityNetwork";
import { researchThemes } from "@/data/researchThemes";
import { investigations } from "@/data/investigations";
import { researchPreparation } from "@/data/researchInterests";
import { professionalProfile } from "@/data/professionalProfile";

const principles = [
  ["Capability over convenience", "Ask what someone becomes able to do, not only what the tool does for them."],
  ["Agency before automation", "Support judgment without replacing it."],
  ["Evidence before claim", "Do not present what is designed as what is shipped—or what is built as proven."],
  ["Build to find out", "Working software reveals constraints that static mockups cannot."],
];

export default function Research() {
  return (
    <div className="portfolio-page research-page">
      <SEO title="Research — Earl Hickson Jr." description="Independent human-centered product inquiry across relationships, learning, and decision support." path="/research" image="/assets/brand/social/og-research.svg" />
      <PageIntro label="Research" railLabel="Research / statement" title={<>My career began with how something should look. It became how something should work.</>} lead={<p>Today, the question I care most about is what that technology helps a person become capable of doing.</p>} aside={<div className="research-situation"><span>Current situation</span><dl className="page-facts"><div><dt>Now</dt><dd>Working independently across the full product stack</dd></div><div><dt>Seeking</dt><dd>{professionalProfile.focus.slice(0, 2).join(" / ")}</dd></div><div><dt>Weighing</dt><dd>Graduate study in HCI—methods and an intellectual foundation</dd></div></dl></div>} />

      <section className="reference-chapter research-origin">
        <div className="reference-chapter__index"><strong>01</strong><span>Why HCI</span><i /></div>
        <div className="reference-chapter__body"><p>I started with a BFA in Graphic Design. Early in my career, the work was visual communication—hierarchy, typography, composition, branding. I still think of it as a form of art, but art that has to do something.</p><p>Over time, I became increasingly unsatisfied stopping at the mockup. I wanted to understand what happened after handoff—why interfaces behaved the way they did, how accessibility shaped the experience, and how technical constraints altered the final product.</p><p>That curiosity pulled me into the frontend. HTML and CSS felt like composition; JavaScript introduced behavior; React introduced systems; APIs helped me understand what sat underneath the interface.</p><blockquote>What is this supposed to help someone do, and how should the entire system support that purpose?</blockquote></div>
        <aside className="reference-chapter__aside"><span>The question, expanding</span><ol><li>How should it look?</li><li>How should it work?</li><li>What does it make someone capable of?</li></ol></aside>
      </section>

      <section className="technology-section section-shell">
        <SectionHeader number="02" label="Current themes" title="Three domains for one inquiry." light />
        <CapabilityNetwork />
        <div className="research-theme-grid">{researchThemes.map((theme) => <article key={theme.id} style={{ "--theme-accent": theme.color } as React.CSSProperties}><span>{theme.number}</span><h3>{theme.label}</h3><blockquote>{theme.question}</blockquote><p>{theme.capability}</p><Link to={`/work/${investigations.find((item) => item.theme === theme.label)?.slug}`} className="text-link text-link--light">See the investigation <span aria-hidden="true">→</span></Link></article>)}</div>
      </section>

      <section className="section-shell built-proven">
        <SectionHeader number="03" label="Built versus proven" title="Implementation evidence and human evidence are not interchangeable." />
        <div className="built-proven__grid"><div className="built-proven__statement"><blockquote>“I do not equate code existing with a feature being shipped.”</blockquote><blockquote>“I do not equate a type existing with a rule being enforced.”</blockquote><blockquote>“I do not equate deployment configuration with a live product.”</blockquote></div><div><p>These independent investigations are ways of thinking through product questions by building. They are not peer-reviewed studies. Implementation can reveal technical constraints, state transitions, privacy gaps, and model inconsistencies. It cannot by itself establish a human outcome.</p><p>The portfolio therefore labels implementation, design, gaps, and uncertainty separately. That is not a disclaimer around the work; it is part of the work.</p></div></div>
      </section>

      <section className="section-shell research-principles">
        <SectionHeader number="04" label="Working principles" title="A current operating position, open to revision." />
        <div>{principles.map(([title, detail], index) => <article key={title}><span>P·{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
      </section>

      <section className="section-shell research-preparation">
        <SectionHeader number="05" label="Research preparation" title="Current practice and formal training goals are different evidence categories." />
        <div className="method-columns">
          <article><span>Methods I have used</span><ul>{researchPreparation.used.map((method) => <li key={method}>{method}</li>)}</ul></article>
          <article><span>Methods I am seeking formal training in</span><ul>{researchPreparation.seeking.map((method) => <li key={method}>{method}</li>)}</ul></article>
        </div>
        <p className="methods-boundary">The second column describes proposed learning and evaluation directions. It is not presented as completed research experience.</p>
      </section>

      <section className="research-direction"><p className="eyebrow eyebrow--light">Future direction</p><h2>Methods strong enough to test the human question.</h2><p>Future work includes scope-comprehension testing for WithYou, diary and observational studies for DojoNet, and comparative decision tasks for Gundam Forge. These are proposed directions—not completed studies.</p><div className="button-row"><Link to="/work" className="button button--light">View the investigations</Link><Link to="/contact" className="button button--outline-light">Discuss the work</Link></div></section>
    </div>
  );
}
