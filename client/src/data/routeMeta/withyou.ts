import { withYou, withYouRecord } from "../withyou";
import { author, siteUrl, type RouteMeta } from "./types";

export const withYouMeta: RouteMeta = {
  path: withYou.path,
  title: "WithYou — Brand, Product and Privacy Engineering Case Study",
  description: withYouRecord.abstract.product,
  image: "/assets/projects/withyou/social/og.png",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: withYou.name,
    description: withYouRecord.abstract.product,
    url: `${siteUrl}${withYou.path}`,
    author,
    genre: "Brand, UX and engineering case study",
    keywords: ["Brand identity", "Design system", "UX design", "React Native", "Privacy by design", ...withYou.stack],
    isAccessibleForFree: true,
  },
};
