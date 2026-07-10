import type React from "react";

export type CaseStudyTheme = {
  name: string;
  colors: {
    background: string;
    surface: string;
    panel: string;
    primary: string;
    secondary: string;
    text: string;
    muted: string;
    border: string;
  };
  gradients: {
    hero: string;
    backdrop: string;
  };
};

export type OverviewItem = {
  label: string;
  value: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  whyItMatters: string;
};

export type CodeHighlight = {
  title: string;
  filePath: string;
  language: string;
  code: string;
  rationale: string;
};

// ─── Premium Case Study Types ────────────────────────────────────────────────

export type MetaItem = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export type GoalItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type FeatureMediaItem = {
  image?: string;
  title: string;
  description: string;
  tag?: string;
};

export type MetricItem = {
  value: string;
  label: string;
  description?: string;
};

export type LearningItem = {
  text: string;
  /** "confirmed" (default) renders a teal check; "open" renders an amber arrow for a self-critical/next-step item. */
  type?: "confirmed" | "open";
};

export type FutureItem = {
  icon: React.ReactNode;
  label: string;
};

export type CodeTab = {
  label: string;
  filename: string;
  language: string;
  code: string;
};

export type DarkCaseStudyTheme = {
  accent: string;
  glow: string;
  badge: string;
  // Optional light-mode surface overrides (defaults to dark in PremiumCaseStudyLayout)
  bg?: string;
  surface?: string;
  surface2?: string;
  textPrimary?: string;
  textSecondary?: string;
  textMuted?: string;
  border?: string;
  borderStrong?: string;
};

export type TocSection = {
  id: string;
  label: string;
};

export type PremiumCaseStudyData = {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  summary: string;
  liveUrl?: string;
  repoUrl?: string;
  heroImage: string;
  meta: MetaItem[];
  overview: {
    description: string;
    industry: string;
    targetUsers: string;
    type: string;
    myRole: string;
    image?: string;
  };
  challenge: {
    description: string;
    problems: string[];
  };
  goals: GoalItem[];
  process: ProcessStep[];
  features: FeatureMediaItem[];
  techStack: string[];
  codeTabs: CodeTab[];
  metrics: MetricItem[];
  learnings: LearningItem[];
  futureItems: FutureItem[];
  /** Password-gated link, rendered as a CTA button in the hero (see ProtectedPrototypeButton). */
  prototype?: {
    url: string;
    /** Button text. Defaults to "View Prototype". */
    label?: string;
    /** Optional hover tooltip with extra context. */
    description?: string;
  };
  prevProject?: { slug: string; title: string };
  nextProject?: { slug: string; title: string };
  theme: DarkCaseStudyTheme;
};

// ─── Design-Doc Case Study Types ─────────────────────────────────────────────
// For case studies sourced from a full claude.ai design-doc export (Overview,
// Problem, Opportunity, Goals, Research, Design Principles, Information
// Architecture, Key Features, Visual Design, Technical Architecture, Design
// System, Accessibility, Challenges, Outcomes, Reflection, Next Steps).

export type ProseSectionData = {
  heading: string;
  paragraphs: string[];
  tags?: string[];
};

export type ResearchData = {
  interviewIntro: string;
  quotes: string[];
  competitiveIntro: string;
  competitors: string[];
  observations: string[];
  /** Evidence/assumption/constraint callouts — omit or pass [] if none apply. */
  notes?: CalloutNote[];
};

export type IAColumn = {
  title: string;
  items: string[];
};

/** Flagged-content note rendered by CaseStudyCallout — evidence, an unvalidated assumption, a constraint, or a tradeoff. */
export type CalloutNote = {
  tone: "evidence" | "assumption" | "constraint" | "tradeoff";
  label: string;
  text: string;
};

export type DesignDocCaseStudyData = {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  summary: string;
  liveUrl?: string;
  repoUrl?: string;
  heroImage: string;
  meta: MetaItem[];
  overview: {
    description: string;
    industry: string;
    targetUsers: string;
    type: string;
    myRole: string;
    image?: string;
  };
  problem: {
    description: string;
    problems: string[];
  };
  opportunity: ProseSectionData;
  goals: GoalItem[];
  research: ResearchData;
  designPrinciples: ProcessStep[];
  informationArchitecture: {
    intro?: string;
    columns: IAColumn[];
  };
  features: FeatureMediaItem[];
  visualDesign: ProseSectionData;
  techStack: string[];
  technicalArchitectureIntro?: string;
  /** Nested inside Technical Architecture, behind progressive disclosure — no TOC entry of its own. */
  codeTabs?: CodeTab[];
  designSystem: {
    intro: string;
    components: string[];
  };
  accessibility: LearningItem[];
  /** Nested "Validation status" callout inside Accessibility. */
  accessibilityValidation?: CalloutNote;
  challenges: ProseSectionData;
  /** Nested "Tradeoff" callout inside Challenges. */
  challengesTradeoff?: CalloutNote;
  outcomes: ProseSectionData;
  /** Nested inside Outcomes, no TOC entry of its own. */
  metrics?: MetricItem[];
  reflection: ProseSectionData;
  nextSteps: FutureItem[];
  /** Nested "Future validation" callout inside Next Steps. */
  futureValidation?: CalloutNote;
  /** Password-gated link, rendered as a CTA button in the hero (see ProtectedPrototypeButton). */
  prototype?: {
    url: string;
    /** Button text. Defaults to "View Prototype". */
    label?: string;
    /** Optional hover tooltip with extra context. */
    description?: string;
  };
  prevProject?: { slug: string; title: string };
  nextProject?: { slug: string; title: string };
  theme: DarkCaseStudyTheme;
};
