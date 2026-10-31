import { dnOg, dojonet, dojonetRecord } from "../dojonet";
import { author, siteUrl, type RouteMeta } from "./types";

export const dojonetMeta: RouteMeta = {
  path: dojonet.path,
  title: "DojoNet — Learning Design, Design System and Front-End Case Study",
  description: dojonetRecord.abstract.product,
  image: dnOg,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: dojonet.name,
    description: dojonetRecord.abstract.product,
    url: `${siteUrl}${dojonet.path}`,
    author,
    genre: "UX and front-end engineering case study",
    keywords: ["Learning design", "Design system", "Interaction design", "Design tokens", ...dojonet.stack],
    isAccessibleForFree: true,
  },
};
