import { Link, useParams } from "react-router-dom";
import SEO from "@/components/seo";
import { fieldNoteMeta } from "@/data/routeMeta/fieldNotes";
import { getFieldNote } from "@/data/fieldNotes";
import NotFound from "@/pages/not-found";
import { FieldNoteFigure } from "@/components/field-notes/FieldNoteFigure";

export default function FieldNotePage() {
  const { slug } = useParams();
  const note = getFieldNote(slug);
  if (!note) return <NotFound />;
  // Figures are numbered in reading order. A note without figures renders as text only.
  let figureCount = 0;
  const numbered = note.sections.map((section) => ({
    section,
    figureNumber: section.figure ? ++figureCount : undefined,
  }));
  return (
    <article className="field-note-page" style={{ "--note-accent": note.themeColor } as React.CSSProperties}>
      <SEO {...fieldNoteMeta(note)} />
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
      <div className={`field-note-layout${figureCount ? " field-note-layout--figures" : ""}`}>
        <aside>
          <span>Evidence note</span>
          <p>Project facts are labeled as implementation. Interpretations remain Earl's reflections. Proposed studies are not presented as completed research.</p>
          <ul>{note.evidenceTypes.map((type) => <li key={type}>{type.replaceAll("-", " ")}</li>)}</ul>
          {figureCount > 0 && (
            <nav className="field-note-figure-index" aria-label="Figures in this note">
              <span>{figureCount} {figureCount === 1 ? "figure" : "figures"}</span>
              <ol>
                {numbered.filter(({ figureNumber }) => figureNumber).map(({ section, figureNumber }) => (
                  <li key={figureNumber}><a href={`#figure-${figureNumber}`}>{String(figureNumber).padStart(2, "0")} · {section.heading ?? note.title}</a></li>
                ))}
              </ol>
            </nav>
          )}
        </aside>
        <div className="field-note-body">
          {numbered.map(({ section, figureNumber }, index) => (
            <section key={section.heading ?? index}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              {section.figure && figureNumber && <FieldNoteFigure figure={section.figure} number={figureNumber} />}
            </section>
          ))}
        </div>
      </div>
      <section className="field-note-footer"><span>Continue the inquiry</span><h2>See how this argument appears in a working system.</h2><Link className="button button--light" to={note.theme === "Learning" ? "/work/dojonet" : note.theme === "Relationships" ? "/work/withyou" : "/work/gundam-forge"}>View the related case study</Link></section>
    </article>
  );
}
