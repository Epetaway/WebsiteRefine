import { gfOg, gundamForge, gundamForgeRecord } from "../gundamForge";
import { author, siteUrl, type RouteMeta } from "./types";

export const gundamForgeMeta: RouteMeta = {
  path: gundamForge.path,
  title: "Gundam Forge — Decision Support, Interface System and Rules Engine Case Study",
  description: gundamForgeRecord.abstract.product,
  image: gfOg,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: gundamForge.name,
    description: gundamForgeRecord.abstract.product,
    url: `${siteUrl}${gundamForge.path}`,
    author,
    genre: "UX and front-end engineering case study",
    keywords: ["Decision support", "Design system", "Interaction design", "Validation", ...gundamForge.stack],
    isAccessibleForFree: true,
  },
};
