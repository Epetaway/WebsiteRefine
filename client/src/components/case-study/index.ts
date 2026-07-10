// ── Legacy components (used by WithYou) ──────────────────────────────────────
export { default as CaseStudyLayout } from "./CaseStudyLayout";
export { CaseHero } from "./CaseHero";
export { CaseOverview } from "./CaseOverview";
export { CaseSection } from "./CaseSection";
export { CaseGrid } from "./CaseGrid";
export { CaseCodeBlock } from "./CaseCodeBlock";
export { CaseFeature } from "./CaseFeature";

// ── Premium template system ───────────────────────────────────────────────────
export { PremiumCaseStudyTemplate } from "./PremiumCaseStudyTemplate";
export { PremiumCaseStudyLayout } from "./PremiumCaseStudyLayout";
export { CaseStudyHero } from "./CaseStudyHero";
export { CaseStudyMetaStrip } from "./CaseStudyMetaStrip";
export { CaseStudyTOC } from "./CaseStudyTOC";
export { CaseStudyMobileTOC } from "./CaseStudyMobileTOC";
export { CaseStudyOverviewSection } from "./CaseStudyOverviewSection";
export { CaseStudyChallenge } from "./CaseStudyChallenge";
export { CaseStudyGoals } from "./CaseStudyGoals";
export { CaseStudyProcess } from "./CaseStudyProcess";
export { CaseStudyFeatureCarousel } from "./CaseStudyFeatureCarousel";
export { CaseStudyTechStack } from "./CaseStudyTechStack";
export { CaseStudyCodeTabs } from "./CaseStudyCodeTabs";
export { CaseStudyMetricsRow } from "./CaseStudyMetricsRow";
export { CaseStudyLearnings } from "./CaseStudyLearnings";
export { CaseStudyFuture } from "./CaseStudyFuture";
export { CaseStudyBottomCTA } from "./CaseStudyBottomCTA";
export { ProtectedPrototypeButton } from "./ProtectedPrototypeButton";

// ── Design-doc template system ────────────────────────────────────────────────
export { DesignDocCaseStudyTemplate } from "./DesignDocCaseStudyTemplate";
export { CaseStudyProse } from "./CaseStudyProse";
export { CaseStudyResearch } from "./CaseStudyResearch";
export { CaseStudyInformationArchitecture } from "./CaseStudyInformationArchitecture";
export { CaseStudyCallout } from "./CaseStudyCallout";

// ── Types ─────────────────────────────────────────────────────────────────────
export type {
  CaseStudyTheme,
  OverviewItem,
  FeatureItem,
  CodeHighlight,
  // Premium types
  DarkCaseStudyTheme,
  PremiumCaseStudyData,
  TocSection,
  MetaItem,
  GoalItem,
  ProcessStep,
  FeatureMediaItem,
  MetricItem,
  LearningItem,
  FutureItem,
  CodeTab,
  // Design-doc types
  DesignDocCaseStudyData,
  ProseSectionData,
  ResearchData,
  IAColumn,
  CalloutNote,
} from "./types";
