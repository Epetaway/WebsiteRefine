import { withYou, withYouRecord } from "../withyou";
import { withYouEngineering } from "../withyouEngineering";
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

export const withYouEngineeringMeta: RouteMeta = {
  path: withYouEngineering.path,
  title: withYouEngineering.title,
  description:
    "Architecture, AI safety pipeline, decision records, testing evidence and real bugs behind WithYou, a React Native and Express relationship app.",
  image: "/assets/projects/withyou/social/og.png",
  type: "article",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: withYouEngineering.title,
    url: `${siteUrl}${withYouEngineering.path}`,
    author,
    about: withYou.name,
    keywords: ["Architecture decision records", "React Native", "Express", "PostgreSQL", "AI safety", "Accessibility testing"],
    isAccessibleForFree: true,
  },
};
