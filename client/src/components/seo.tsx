import { Helmet } from "react-helmet-async";
import { resolveHead, type RouteMeta } from "@/data/routeMeta/types";

// Pages pass their entry from client/src/data/routeMeta/. The same entries are written into
// static HTML at build time (scripts/prerender-route-meta.ts), so what crawlers read and what
// this component renders can't drift apart.
export default function SEO(meta: RouteMeta) {
  const head = resolveHead(meta);

  return (
    <Helmet>
      <title>{head.title}</title>
      <meta name="description" content={head.description} />
      <link rel="canonical" href={head.canonical} />
      <meta property="og:title" content={head.title} />
      <meta property="og:description" content={head.description} />
      <meta property="og:url" content={head.canonical} />
      <meta property="og:type" content={head.type} />
      {head.publishedTime && <meta property="article:published_time" content={head.publishedTime} />}
      <meta property="og:site_name" content="Earl Hickson Jr." />
      <meta property="og:image" content={head.image} />
      <meta property="og:image:alt" content={head.imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={head.title} />
      <meta name="twitter:description" content={head.description} />
      <meta name="twitter:image" content={head.image} />
      <meta name="twitter:image:alt" content={head.imageAlt} />
      {head.jsonLd && (
        <script type="application/ld+json">{JSON.stringify(head.jsonLd)}</script>
      )}
    </Helmet>
  );
}
