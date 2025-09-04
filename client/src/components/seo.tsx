import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  url?: string;          // optional canonical
  image?: string;        // OG image
};

export default function SEO({ title, description, url, image }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {url && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
