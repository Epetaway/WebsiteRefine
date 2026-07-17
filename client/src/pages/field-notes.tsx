import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { fieldNotes } from "@/data/fieldNotes";
import bjjPhoto from "@/images/BLKBELT.webp";

const noteImages = [
  { src: bjjPhoto, width: 900, height: 1600 },
  { src: "/assets/projects/withyou/preview.webp", width: 1200, height: 864 },
  { src: "/assets/projects/gundam-forge/preview.webp", width: 1200, height: 800 },
];

export default function FieldNotes() {
  return (
    <div className="portfolio-page field-notes-page">
      <SEO title="Field Notes — Earl Hickson Jr." description="Editorial notes on learning, relationships, consent, decision support, design, and engineering." path="/field-notes" image="/assets/field-notes/og-writing.svg" />
      <PageIntro label="Field notes" railLabel="Field notes" title={<>Field notes and shorter essays.</>} lead={<p>The working notebook alongside the longer investigations—on engineering, learning, relationships, and decision support. {fieldNotes.length} notes, published in full below.</p>} />
      <section className="field-note-index section-shell" aria-label="Published field notes">
        {fieldNotes.map((note, index) => <article key={note.slug} style={{ "--note-accent": note.themeColor } as React.CSSProperties}><figure><img src={noteImages[index].src} alt="" loading="lazy" width={noteImages[index].width} height={noteImages[index].height} /><figcaption>N·{note.number}</figcaption></figure><div><div className="field-note-index__meta"><span>{note.datePublished}</span><span>{note.theme}</span><span>{note.readingTime}</span></div><h2><Link to={`/field-notes/${note.slug}`}>{note.title}</Link></h2><Link className="field-note-index__link" to={`/field-notes/${note.slug}`}>Read the note →</Link></div></article>)}
      </section>
    </div>
  );
}
