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
  icon: string;
  label: string;
  value: string;
};

export type GoalItem = {
  icon: string;
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
};

export type FutureItem = {
  icon: string;
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
  prevProject?: { slug: string; title: string };
  nextProject?: { slug: string; title: string };
  theme: DarkCaseStudyTheme;
};
