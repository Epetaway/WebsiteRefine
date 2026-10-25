// The ordered list of case studies shown on Home, Work and in next-case-study navigation.
// The three product investigations keep their own data model (investigations.ts);
// Earl the Kaiju is a separate flagship case study with its own page. Display order is
// set by `displayOrder` below, and each entry's number matches its position.

import { investigations } from "./investigations";
import { flagship, media } from "./earlTheKaiju";
import { getCaseStudyView } from "@/lib/caseStudyView";
import { publicPath } from "@/lib/publicPath";

export type WorkEntry = {
  slug: string;
  path: string;
  number: string;
  name: string;
  theme: string;
  question: string;
  status: string;
  role: string;
  summary: string;
  built: string;
  decision: string;
  stack: readonly string[];
  accent: string;
  heroMedia: {
    src: string;
    srcSet?: string;
    alt: string;
    presentation: "mobile" | "desktop";
  };
};

const preview = media.preview;

const displayOrder = ["withyou", "earl-the-kaiju", "gundam-forge", "dojonet"] as const;

const entries: WorkEntry[] = [
  ...investigations.map((project) => {
    const view = getCaseStudyView(project);
    return {
      slug: project.slug,
      path: `/work/${project.slug}`,
      number: project.number,
      name: project.name,
      theme: project.theme,
      question: project.question,
      status: project.status,
      role: project.role,
      summary: project.abstract.product,
      built: project.abstract.built,
      decision: project.interactionDecision,
      stack: project.stack,
      accent: project.accent,
      heroMedia: view.heroMedia,
    };
  }),
  {
    slug: flagship.slug,
    path: flagship.path,
    number: flagship.number,
    name: flagship.name,
    theme: flagship.theme,
    question: flagship.question,
    status: flagship.status,
    role: flagship.role,
    summary: flagship.summary,
    built: flagship.built,
    decision: flagship.decision,
    stack: flagship.stack,
    accent: flagship.accent,
    heroMedia: {
      src: publicPath(preview.fallback),
      srcSet: preview.webp
        .split(", ")
        .map((entry) => {
          const [url, width] = entry.split(" ");
          return `${publicPath(url)} ${width}`;
        })
        .join(", "),
      alt: flagship.previewAlt,
      presentation: "desktop",
    },
  },
];

export const workEntries: WorkEntry[] = displayOrder.map((slug) => {
  const entry = entries.find((item) => item.slug === slug);
  if (!entry) throw new Error(`Unknown case study in displayOrder: ${slug}`);
  return entry;
});

export const getNextWorkEntry = (slug: string) => {
  const index = workEntries.findIndex((entry) => entry.slug === slug);
  return workEntries[(index + 1) % workEntries.length];
};
