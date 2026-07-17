import { Helmet } from "react-helmet-async";

const siteUrl = "https://ehicksonjr.com";

type Props = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  jsonLd?: Record<string, unknown>;
};

export default function SEO({
  title,
  description,
  path = "/",
  image = "/assets/brand/social/og-home.svg",
  type = "website",
  publishedTime,
  jsonLd,
}: Props) {
  const canonical = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();
  const documentTitle = title.includes("Earl Hickson Jr.")
    ? title
    : `${title} — Earl Hickson Jr.`;

  return (
    <Helmet>
      <title>{documentTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={documentTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      <meta property="og:site_name" content="Earl Hickson Jr." />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={documentTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={documentTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={documentTitle} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
