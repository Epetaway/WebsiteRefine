import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { fieldNotesIndexMeta } from "@/data/routeMeta/pages";
import { PageIntro } from "@/components/editorial/PageIntro";
import { fieldNotes } from "@/data/fieldNotes";

export default function FieldNotes() {
  return (
    <div className="portfolio-page">
      <SEO {...fieldNotesIndexMeta} />
      <PageIntro label="Field notes / Journal" title={<>A designer, engineer, and teacher <em>thinking carefully in public.</em></>} lead={<p>These notes distinguish personal experience, project facts, interpretation, and research questions. They are working reflections, not generic thought leadership or fabricated academic evidence.</p>} aside={<dl className="page-facts"><div><dt>Published</dt><dd>{fieldNotes.length} notes</dd></div><div><dt>Themes</dt><dd>Learning · Relationships · Decisions</dd></div><div><dt>Evidence</dt><dd>Experience + implementation</dd></div></dl>} />
      <section className="field-note-index section-shell" aria-label="Published field notes">
        {fieldNotes.map((note) => <article key={note.slug} style={{ "--note-accent": note.themeColor } as React.CSSProperties}><div className="field-note-index__meta"><span>{note.number}</span><span>{note.theme}</span><span>{note.readingTime}</span></div><div><h2><Link to={`/field-notes/${note.slug}`}>{note.title}</Link></h2><blockquote>{note.claim}</blockquote><p>{note.summary}</p><div><span>{note.date}</span><Link className="text-link" to={`/field-notes/${note.slug}`}>Read Field Note <span aria-hidden="true">→</span></Link></div></div></article>)}
      </section>
    </div>
  );
}
