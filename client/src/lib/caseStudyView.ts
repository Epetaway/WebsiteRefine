import type { Investigation } from "@/data/investigations";
import { publicPath } from "@/lib/publicPath";

type HeroMedia = {
  src: string;
  srcSet?: string;
  alt: string;
  presentation: "mobile" | "desktop";
};

const heroMedia: Record<Investigation["slug"], HeroMedia> = {
  withyou: {
    src: "/assets/projects/withyou/media/preview-1440.webp",
    srcSet:
      "/assets/projects/withyou/media/preview-480.webp 480w, /assets/projects/withyou/media/preview-800.webp 800w, /assets/projects/withyou/media/preview-1440.webp 1440w",
    alt: "The WithYou logo beside the app's pairing invite on Android and its home screen on iOS in dark and light mode",
    presentation: "desktop",
  },
  dojonet: {
    src: "/assets/projects/dojonet/implementation/hero.png",
    alt: "DojoNet training community dashboard",
    presentation: "desktop",
  },
  "gundam-forge": {
    src: "/assets/projects/gundam-forge/implementation/hero.png",
    alt: "Gundam Forge deck-building dashboard",
    presentation: "desktop",
  },
};

const withBase = (srcSet: string) =>
  srcSet
    .split(", ")
    .map((entry) => {
      const [url, descriptor] = entry.split(" ");
      return `${publicPath(url)} ${descriptor}`;
    })
    .join(", ");

export function getCaseStudyView(project: Investigation) {
  const media = heroMedia[project.slug];
  return {
    heroMedia: {
      ...media,
      src: publicPath(media.src),
      srcSet: media.srcSet ? withBase(media.srcSet) : undefined,
    },
    challenge: project.abstract.problem,
    contribution: project.role,
    implementation: project.abstract.built,
    decision: project.interactionDecision,
    evidenceBoundary: project.evidence[project.evidence.length - 1],
  };
}
