import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { aboutMeta } from "@/data/routeMeta/pages";
import { Reveal } from "@/components/motion/Reveal";
import { PageIntro } from "@/components/editorial/PageIntro";
import { profile, teaching } from "@/data/professional";
import portrait from "@/images/me.webp";
import trainingPhoto from "@/images/BLKBELT.png";

const trajectory = [
  ["01", "Graphic design", "Typography, hierarchy, composition, and purposeful visual communication."],
  ["02", "Interaction design", "The static frame became a sequence of choices, feedback, and response."],
  ["03", "Frontend engineering", "Code became a way to shape behavior—not merely reproduce a comp."],
  ["04", "Product systems", "APIs, schemas, accessibility, state, and deployment expanded the design material."],
  ["05", "Human-centered inquiry", "The question became what the entire system enables a person to understand and do."],
] as const;

export default function About() {
  return (
    <div className="portfolio-page about-page">
      <SEO {...aboutMeta} />
      <PageIntro
        dark
        label="About / Practice"
        title={<>I learned to design the message. Then I learned to build the <em>behavior.</em></>}
        lead={<p>I’m a lead front-end engineer with a graphic-design foundation. I work where interface craft, accessibility, and implementation meet, and I’m at my best getting a team to build the same way.</p>}
        aside={<figure className="about-portrait"><img src={portrait} alt="Portrait of Earl Hickson Jr." width="533" height="667" /><figcaption>Earl Hickson Jr. / {profile.publicTitle}</figcaption></figure>}
      />

      <section className="about-story" aria-labelledby="about-story-title">
        <header className="home-section-heading">
          <p className="signal-label"><span /> 01 / An expanding medium</p>
          <h2 id="about-story-title">Every step added another layer of responsibility.</h2>
          <p>The throughline is not a series of career pivots. It is a steadily expanding understanding of what design includes.</p>
        </header>
        <ol className="about-timeline">
          {trajectory.map(([number, stage, detail]) => (
            <li key={stage}><span>{number}</span><h3>{stage}</h3><p>{detail}</p></li>
          ))}
        </ol>
        <blockquote className="about-statement">Engineering became another creative material.</blockquote>
      </section>

      <section className="about-craft" aria-labelledby="about-craft-title">
        <Reveal className="about-craft__copy">
          <p className="signal-label"><span /> 02 / Current practice</p>
          <h2 id="about-craft-title">The interface and the system behind it have to agree.</h2>
          <p>A clear screen can still hide a broken rule. A clean component can still create an inaccessible workflow. That is why I move between visual hierarchy, interaction states, component architecture, APIs, and testing instead of treating design and engineering as separate handoffs.</p>
          <p>Most of that work has happened inside teams. At BroadcastMed I led design and front-end delivery and mentored junior designers and developers. At Asembia I set one component standard across several healthcare portals and got the development team building to it.</p>
          <p>I’m open to full-time lead and senior front-end roles, and I keep shipping independent products while I look for that next team.</p>
          <Link className="case-link case-link--light" to="/work">See the case studies <span aria-hidden="true">↗</span></Link>
        </Reveal>
        <div className="about-craft__principles">
          <div><span>01</span><h3>Make the behavior legible</h3><p>People should understand what happened, what changed, and what they can do next.</p></div>
          <div><span>02</span><h3>Build the real constraint</h3><p>Implementation reveals the states, data rules, and edge cases that static frames cannot.</p></div>
          <div><span>03</span><h3>Name the evidence</h3><p>Working software demonstrates implementation; human outcomes require evaluation.</p></div>
        </div>
      </section>

      <section className="about-discipline" aria-labelledby="about-discipline-title">
        <Reveal className="about-discipline__visual"><img src={trainingPhoto} alt="Earl teaching a young Brazilian Jiu-Jitsu student" loading="lazy" width="4032" height="2268" /><span>Teaching / observation / feedback</span></Reveal>
        <Reveal className="about-discipline__body" delay={0.05}>
          <p className="signal-label"><span /> 03 / Practice beyond technology</p>
          <h2 id="about-discipline-title">Teaching changed how I think about capability.</h2>
          <p>{teaching.summary}</p>
          <p>On the mat, a technically correct explanation is only the start. You observe, adapt the instruction, and help someone act under pressure. Product work asks for the same humility: what I intended is not the same as what another person can actually do.</p>
          <p>I've also built my own Jiu-Jitsu brand around that teaching — an identity, an instructor website and a private Android app for running class.</p>
          <div className="about-discipline__links">
            <Link className="case-link" to="/field-notes/teaching-jiu-jitsu-and-ux">Read the related note <span aria-hidden="true">↗</span></Link>
            <Link className="case-link" to="/work/earl-the-kaiju">See the Earl the Kaiju case study <span aria-hidden="true">↗</span></Link>
          </div>
        </Reveal>
      </section>

      <section className="about-direction">
        <p className="signal-label"><span /> Human-centered direction</p>
        <h2>Building the system is where the next question begins.</h2>
        <p>{profile.belief} My HCI direction develops the methods needed to evaluate that belief rather than treating it as a product claim.</p>
        <div><Link className="button button--accent" to="/research">Explore the research direction</Link><Link className="button button--ghost" to="/contact">Contact me</Link></div>
      </section>
    </div>
  );
}
