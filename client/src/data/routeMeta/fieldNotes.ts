import type { FieldNote } from "../fieldNotes";
import { author, siteUrl, type RouteMeta } from "./types";

/** Head metadata for one Field Note, derived from its record in data/fieldNotes.ts. */
export function fieldNoteMeta(note: FieldNote): RouteMeta {
  const path = `/field-notes/${note.slug}`;
  const image = `/assets/field-notes/og-${note.slug}.png`;
  return {
    path,
    title: `${note.title} — Earl Hickson Jr.`,
    description: note.summary,
    type: "article",
    publishedTime: note.datePublished,
    image,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: note.title,
      description: note.summary,
      datePublished: note.datePublished,
      author,
      mainEntityOfPage: `${siteUrl}${path}`,
      image: `${siteUrl}${image}`,
    },
  };
}
