import { fieldNotes } from "./fieldNotes";

// Old URLs and where they live now. App.tsx renders these as client-side redirects, and
// scripts/prerender-route-meta.ts writes a small static redirect page for each one, so a crawler
// or link preview that hits an old URL is pointed at the canonical page instead of a 404.

/** Fixed paths that moved. */
export const legacyPaths: { from: string; to: string }[] = [
  { from: "/projects", to: "/work" },
  { from: "/investigations", to: "/work" },
  { from: "/case-studies", to: "/work" },
  { from: "/how-i-think", to: "/research" },
  { from: "/approach", to: "/research" },
  { from: "/blog", to: "/field-notes" },
  { from: "/writing", to: "/field-notes" },
  { from: "/case-study-preview", to: "/work" },
  // The archived Earl d. Kaiju microsite stays archived; its old addresses (matched
  // case-insensitively by the client router, so /EarldKaiju too) lead to the case study.
  { from: "/earldkaiju", to: "/work/earl-the-kaiju" },
  { from: "/earl-the-kaiju", to: "/work/earl-the-kaiju" },
];

/** /projects/:slug (and /projects/:slug/dev). Unknown slugs fall back to /work. */
export const legacyProjects: Record<string, string> = {
  withyou: "/work/withyou",
  "dojonet-prototype-max": "/work/dojonet",
  dojonet: "/work/dojonet",
  "gundam-forge": "/work/gundam-forge",
  "earl-the-kaiju": "/work/earl-the-kaiju",
  earldkaiju: "/work/earl-the-kaiju",
};

/** /blog/:slug and /writing/:slug for retired post slugs. Current note slugs map to themselves. */
export const legacyWriting: Record<string, string> = {
  "bjj-habits-better-front-end-engineer": "/field-notes/teaching-jiu-jitsu-and-ux",
};

/** Every known legacy URL, expanded, for the static build. */
export const legacyRedirects: { from: string; to: string }[] = [
  ...legacyPaths,
  ...Object.entries(legacyProjects).flatMap(([slug, to]) => [
    { from: `/projects/${slug}`, to },
    { from: `/projects/${slug}/dev`, to },
  ]),
  ...[
    ...Object.entries(legacyWriting),
    ...fieldNotes.map((note) => [note.slug, `/field-notes/${note.slug}`] as const),
  ].flatMap(([slug, to]) => [
    { from: `/blog/${slug}`, to },
    { from: `/writing/${slug}`, to },
  ]),
];
