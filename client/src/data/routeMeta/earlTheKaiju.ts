import { flagship } from "../earlTheKaiju";
import { author, siteUrl, type RouteMeta } from "./types";

export const earlTheKaijuMeta: RouteMeta = {
  path: flagship.path,
  title: "Earl the Kaiju — Brand, Website and Android Case Study",
  description: flagship.summary,
  image: "/assets/projects/earl-the-kaiju/social/og.png",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: flagship.name,
    description: flagship.summary,
    url: `${siteUrl}${flagship.path}`,
    author,
    genre: "Brand identity, UX and engineering case study",
    keywords: ["Brand identity", "UX design", "Next.js", "Cloudflare Workers", "Kotlin", "Jetpack Compose", "Brazilian Jiu-Jitsu"],
    isAccessibleForFree: true,
  },
};
