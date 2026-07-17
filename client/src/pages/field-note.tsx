import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "@/components/seo";
import { getFieldNote } from "@/data/fieldNotes";
import bjjPhoto from "@/images/BLKBELT.webp";

const noteCovers: Record<string, { src: string; width: number; height: number; label: string }> = {
  "teaching-jiu-jitsu-and-ux": { src: bjjPhoto, width: 900, height: 1600, label: "Teaching practice — implementation context" },
  "designing-consent": { src: "/assets/projects/withyou/preview.webp", width: 1200, height: 864, label: "WithYou — relationship and consent context" },
  "information-architecture-and-card-games": { src: "/assets/projects/gundam-forge/preview.webp", width: 1200, height: 800, label: "Gundam Forge — decision-support context" },
} as const;

export default function FieldNotePage() {
  const { slug } = useParams();
  const note = getFieldNote(slug);
  if (!note) return <Navigate to="/field-notes" replace />;
  const path = `/field-notes/${note.slug}`;
  const cover = noteCovers[note.slug] ?? noteCovers["teaching-jiu-jitsu-and-ux"];
  return (
    <article className="field-note-page" style={{ "--note-accent": note.themeColor } as React.CSSProperties}>
      <SEO title={`${note.title} — Earl Hickson Jr.`} description={note.summary} path={path} type="article" image={`/assets/field-notes/og-${note.slug}.svg`} jsonLd={{ "@context": "https://schema.org", "@type": "Article", headline: note.title, description: note.summary, datePublished: note.datePublished, author: { "@type": "Person", name: "Earl Hickson Jr.", url: "https://ehicksonjr.com" }, mainEntityOfPage: `https://ehicksonjr.com${path}` }} />
      <header className="field-note-hero"><div className="field-note-hero__inner"><Link to="/field-notes" className="text-link">← All Field Notes</Link><p className="eyebrow">N·{note.number} · {note.datePublished} · {note.theme} · {note.readingTime}</p><h1>{note.title}</h1><blockquote>{note.claim}</blockquote></div></header>
      <figure className="field-note-cover"><span><img src={cover.src} alt="" loading="eager" width={cover.width} height={cover.height} /></span><figcaption><span>{cover.label}</span><b>N·{note.number}</b></figcaption></figure>
      <div className="field-note-layout"><aside><span>Evidence note</span><p>Project facts, personal experience, interpretation, and proposed research are labeled separately. External references appear only where a research claim requires them.</p></aside><div className="field-note-body">{note.sections.map((section, index) => <section key={section.heading ?? index}><span className="article-evidence-type">{section.kind}</span>{section.heading && <h2>{section.heading}</h2>}{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}{section.references?.length ? <div className="article-references"><h3>References</h3><ul>{section.references.map((reference) => <li key={reference.href}><a href={reference.href} target="_blank" rel="noreferrer">{reference.label}</a></li>)}</ul></div> : null}</section>)}</div></div>
      <footer className="field-note-footer"><span>Continue the inquiry</span><h2>See how this argument appears in a working system.</h2><Link className="button button--light" to={note.theme === "Learning" ? "/work/dojonet" : note.theme === "Relationships" ? "/work/withyou" : "/work/gundam-forge"}>View the related investigation</Link></footer>
    </article>
  );
}
