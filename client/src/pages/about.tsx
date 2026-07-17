import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { professionalProfile } from "@/data/professionalProfile";
import { teachingPerspective } from "@/data/teachingAndLeadership";
import bjjPhoto from "@/images/BLKBELT.webp";

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
    <div className="portfolio-page about-page">
      <SEO title="About — Earl Hickson Jr." description="How Earl Hickson Jr. moved from visual communication to UX engineering and human-centered product inquiry." path="/about" image="/assets/brand/social/og-about.svg" />
      <PageIntro label="About" railLabel="About / practitioner" title={<>Code, culture, and discipline.</>} lead={<p>I began in graphic design, where I learned to organize information and communicate visually. Frontend engineering taught me how those ideas become working systems. Accessibility taught me that every technical decision shapes who can participate. Teaching Brazilian Jiu-Jitsu showed me how people learn—through feedback, repetition, trust, and progressive challenge. <strong>Human-computer interaction is where those experiences meet.</strong></p>} />

      <section className="about-foundation"><div><h2>Designer turned engineer, always a student.</h2><p>I graduated from Kean University with a BFA in Graphic Design, then built on that foundation with an IBM Full Stack Software Developer Professional Certificate. That combination shapes how I work—I think about layout, hierarchy, and visual weight the same way I think about component structure and state management.</p><p>The career has spanned media, financial services, nonprofit campaigns, and healthcare portals, but the discipline is the same everywhere: understand who is using the thing before deciding how it should work.</p><blockquote>Brazilian Jiu-Jitsu trained me in a different kind of precision—discipline, patience, refinement under pressure. Teaching it showed me how people actually learn, which is the same lens I bring to interface design.</blockquote></div><figure><span>Fieldwork</span><img src={bjjPhoto} alt="Earl Hickson Jr. teaching Brazilian Jiu-Jitsu" loading="lazy" width="900" height="1600" /><figcaption>Practice, feedback, and progressive instruction</figcaption></figure></section>

      <section className="section-shell about-trajectory"><SectionHeader number="01" label="Career and intellectual progression" title="A sequence of expanding questions." /><div className="about-trajectory__list">{trajectory.map(([stage, question, detail], index) => <article key={stage}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3><blockquote>{question}</blockquote><p>{detail}</p></article>)}</div></section>

      <section className="creative-material"><p className="eyebrow eyebrow--light">A turning point</p><blockquote>“Engineering became another creative material.”</blockquote><div><p>Design and engineering are not separate creative identities in my practice. Code lets an idea behave. Architecture changes which experiences are possible. A schema can protect—or undermine—the consent promised by an interface.</p><p>The closer I moved to the full system, the harder it became to treat design as a visual layer placed on top of technology.</p></div></section>

      <section className="section-shell transition-section"><SectionHeader number="02" label="Current transition" title="The work continues between formal roles." /><div><p>{professionalProfile.careerContext} That transition has not stopped the work. I have continued building independent products across mobile, frontend, backend, accessibility, real-time systems, and product design.</p><p>I describe that period directly because evidence matters more than a seamless career story. The products and this portfolio show the work I have continued to do.</p></div></section>

      <section className="section-shell teaching-section"><SectionHeader number="03" label="Martial arts and teaching" title="Feedback, discipline, and capability are part of the practice." /><div><blockquote>Teaching made one thing unmistakable: understanding a description is not the same as being able to act.</blockquote><p>{teachingPerspective.summary}</p><p className="record-boundary">{teachingPerspective.publicRecordStatus}</p><Link to="/field-notes/teaching-jiu-jitsu-and-ux" className="text-link">Read the Field Note <span aria-hidden="true">→</span></Link></div></section>

      <section className="about-seeking"><p className="eyebrow eyebrow--light">What I am looking for</p><h2>I am looking for full-time work where design and engineering are treated as connected disciplines.</h2><p>{professionalProfile.focus.join(" · ")}</p><div className="button-row"><Link className="button button--light" to="/resume">View resume</Link><Link className="button button--outline-light" to="/contact">Contact me</Link></div></section>
    </div>
  );
}
