import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { profile, teaching } from "@/data/professional";

const trajectory = [
  ["Art", "How do I express an idea?", "Drawing and visual thinking taught me to see before learning to communicate."],
  ["Graphic design", "How do I communicate an idea?", "A BFA at Kean University established typography, hierarchy, composition, and purpose."],
  ["Interaction design", "How does someone experience the idea?", "The static frame became a sequence of choices and responses."],
  ["Frontend engineering", "How does the experience behave?", "HTML and CSS became composition; JavaScript became behavior; React became systems."],
  ["Full-stack development", "What makes that behavior possible?", "APIs, schemas, authentication, real-time state, and deployment expanded the design material."],
  ["HCI", "What are the consequences?", "The current direction asks how to evaluate what technology makes people capable of."],
];

export default function About() {
  return (
    <div className="portfolio-page">
      <SEO title="About — Earl Hickson Jr." description="How Earl Hickson Jr. moved from visual communication to UX engineering and human-centered product inquiry." path="/about" image="/assets/brand/social/og-about.svg" />
      <PageIntro label="About / Trajectory" title={<>I began with visual communication. Engineering expanded the medium. HCI expanded the <em>question.</em></>} lead={<p>I am a UX Engineer with a graphic-design foundation, a product-engineering practice, and a continuing interest in how systems shape human capability.</p>} aside={<dl className="page-facts"><div><dt>Foundation</dt><dd>BFA, Graphic Design</dd></div><div><dt>Practice</dt><dd>Design + engineering</dd></div><div><dt>Direction</dt><dd>Human-centered technology</dd></div></dl>} />

      <section className="section-shell about-trajectory"><SectionHeader number="01" label="Career and intellectual progression" title="A sequence of expanding questions." /><div className="about-trajectory__list">{trajectory.map(([stage, question, detail], index) => <article key={stage}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3><blockquote>{question}</blockquote><p>{detail}</p></article>)}</div></section>

      <section className="creative-material"><p className="eyebrow eyebrow--light">A turning point</p><blockquote>“Engineering became another creative material.”</blockquote><div><p>Design and engineering are not separate creative identities in my practice. Code lets an idea behave. Architecture changes which experiences are possible. A schema can protect—or undermine—the consent promised by an interface.</p><p>The closer I moved to the full system, the harder it became to treat design as a visual layer placed on top of technology.</p></div></section>

      <section className="section-shell transition-section"><SectionHeader number="02" label="Current transition" title="The work continues between formal roles." /><div><p>I am currently in a professional transition, working outside technology while actively pursuing a return to full-time product work. That gap has not stopped the work. I have continued building independent products across mobile, frontend, backend, accessibility, real-time systems, and product design.</p><p>I describe that period directly because evidence matters more than a seamless career story. The products and this portfolio show the work I have continued to do.</p></div></section>

      <section className="section-shell teaching-section"><SectionHeader number="03" label="Martial arts and teaching" title="Feedback, discipline, and capability are part of the practice." /><div><blockquote>Teaching made one thing unmistakable: understanding a description is not the same as being able to act.</blockquote><p>{teaching.summary}</p><p>{teaching.evidenceBoundary}</p><Link to="/field-notes/teaching-jiu-jitsu-and-ux" className="text-link">Read the Field Note <span aria-hidden="true">→</span></Link></div></section>

      <section className="about-seeking"><p className="eyebrow eyebrow--light">What I am looking for</p><h2>I am looking for full-time work where design and engineering are treated as connected disciplines.</h2><p>{profile.focusRoles.join(" · ")}</p><div className="button-row"><Link className="button button--light" to="/resume">View resume</Link><Link className="button button--outline-light" to="/contact">Contact me</Link></div></section>
    </div>
  );
}
