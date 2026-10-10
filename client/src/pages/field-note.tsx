import { Link, useParams } from "react-router-dom";
import SEO from "@/components/seo";
import { getFieldNote } from "@/data/fieldNotes";
import NotFound from "@/pages/not-found";

export default function FieldNotePage() {
  const { slug } = useParams();
  const note = getFieldNote(slug);
  if (!note) return <NotFound />;
  const path = `/field-notes/${note.slug}`;
  return (
    <article className="field-note-page" style={{ "--note-accent": note.themeColor } as React.CSSProperties}>
      <SEO title={`${note.title} — Earl Hickson Jr.`} description={note.summary} path={path} type="article" publishedTime={note.datePublished} image={`/assets/field-notes/og-${note.slug}.svg`} jsonLd={{ "@context": "https://schema.org", "@type": "Article", headline: note.title, description: note.summary, datePublished: note.datePublished, author: { "@type": "Person", name: "Earl Hickson Jr.", url: "https://ehicksonjr.com" }, mainEntityOfPage: `https://ehicksonjr.com${path}`, image: `https://ehicksonjr.com/assets/field-notes/og-${note.slug}.svg` }} />
      <section className="field-note-hero">
        <div className="field-note-hero__rail">
          <Link to="/field-notes" className="case-link case-link--light">← All notes</Link>
          <span>{note.number} / {note.theme}</span>
        </div>
        <div className="field-note-hero__title">
          <p className="signal-label"><span /> Field note / {note.theme}</p>
          <h1>{note.title}</h1>
        </div>
        <aside className="field-note-hero__context">
          <blockquote>{note.claim}</blockquote>
          <div><span>{note.date}</span><span>{note.readingTime} read</span><span>Personal reflection + product inquiry</span></div>
        </aside>
      </section>
      <div className="field-note-layout"><aside><span>Evidence note</span><p>Project facts are labeled as implementation. Interpretations remain Earl's reflections. Proposed studies are not presented as completed research.</p><ul>{note.evidenceTypes.map((type) => <li key={type}>{type.replaceAll("-", " ")}</li>)}</ul></aside><div className="field-note-body">{note.sections.map((section, index) => <section key={section.heading ?? index}>{section.heading && <h2>{section.heading}</h2>}{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</section>)}</div></div>
      <section className="field-note-footer"><span>Continue the inquiry</span><h2>See how this argument appears in a working system.</h2><Link className="button button--light" to={note.theme === "Learning" ? "/work/dojonet" : note.theme === "Relationships" ? "/work/withyou" : "/work/gundam-forge"}>View the related case study</Link></section>
    </article>
  );
}
