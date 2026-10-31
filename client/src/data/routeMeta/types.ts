// Shared shape for every page's head metadata. The <SEO> component renders it in the browser,
// and scripts/prerender-route-meta.ts writes the same values into a static HTML file per route
// so crawlers and link previews see them without running JavaScript.

export const siteUrl = "https://ehicksonjr.com";

/** The default share image. Raster (PNG): LinkedIn, Slack, iMessage and X don't render SVG. */
export const defaultShareImage = "/assets/brand/social/og-home.png";

export type RouteMeta = {
  /** Canonical path, root-relative, no trailing slash (except "/"). */
  path: string;
  title: string;
  description: string;
  /** Root-relative path to a PNG or JPG in client/public. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  jsonLd?: Record<string, unknown>;
};

export const author = {
  "@type": "Person",
  name: "Earl Hickson Jr.",
  url: siteUrl,
} as const;

/** "About" becomes "About — Earl Hickson Jr."; titles that already name Earl are left alone. */
export function documentTitle(title: string) {
  return title.includes("Earl Hickson Jr.") ? title : `${title} — Earl Hickson Jr.`;
}

export function absoluteUrl(pathOrUrl: string) {
  return new URL(pathOrUrl, siteUrl).toString();
}

/** Everything the head needs, resolved to absolute URLs. Used by both <SEO> and the prerender. */
export function resolveHead(meta: RouteMeta) {
  const title = documentTitle(meta.title);
  return {
    title,
    description: meta.description,
    canonical: absoluteUrl(meta.path),
    image: absoluteUrl(meta.image ?? defaultShareImage),
    imageAlt: title,
    type: meta.type ?? "website",
    publishedTime: meta.publishedTime,
    jsonLd: meta.jsonLd,
  };
}
