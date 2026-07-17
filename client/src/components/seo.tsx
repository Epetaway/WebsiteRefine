import { Helmet } from "react-helmet-async";

const siteUrl = "https://ehicksonjr.com";

type Props = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>;
  noIndex?: boolean;
};

export default function SEO({
  title,
  description,
  path = "/",
  image = "/assets/brand/social/og-home.svg",
  type = "website",
  jsonLd,
  noIndex = false,
}: Props) {
  const canonical = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Earl Hickson Jr." />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${title} — Earl Hickson Jr.`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
