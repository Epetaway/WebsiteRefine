import type { Investigation } from "@/data/investigations";
import { publicPath } from "@/lib/publicPath";

type HeroMedia = {
  src: string;
  alt: string;
  presentation: "mobile" | "desktop";
};

const heroMedia: Record<Investigation["slug"], HeroMedia> = {
  withyou: {
    src: "/assets/projects/withyou/implementation/hero.png",
    alt: "WithYou mobile product home screen",
    presentation: "mobile",
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

export function getCaseStudyView(project: Investigation) {
  return {
    heroMedia: {
      ...heroMedia[project.slug],
      src: publicPath(heroMedia[project.slug].src),
    },
    challenge: project.abstract.problem,
    contribution: project.role,
    implementation: project.abstract.built,
    decision: project.interactionDecision,
    evidenceBoundary: project.evidence[project.evidence.length - 1],
  };
}
