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
