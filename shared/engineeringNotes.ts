// Shape of a gated engineering-notes document. The content itself lives only on the server
// (server/access/content.ts) and reaches the browser after an approved sign-in, so it never
// ships in the public JavaScript bundle or the prerendered HTML.

export type QualityStatus = "IMPLEMENTED + INTEGRATED" | "PARTIAL" | "KNOWN GAP";

export type EngineeringDecision = {
  id: string;
  source: string;
  title: string;
  context: string;
  decision: string;
  gaveUp: string;
  revisit?: string;
};

export type EngineeringLesson = {
  id: string;
  title: string;
  happened: string;
  found: string;
  fix: string;
  lesson: string;
};

export type LockedEngineeringNotes = {
  lifecyclePatterns: { id: string; rule: string }[];
  safetyPipeline: { step: string; does: string }[];
  pipelineRules: string[];
  decisions: EngineeringDecision[];
  quality: { status: QualityStatus; items: string[] }[];
  lessons: EngineeringLesson[];
  aiWorkflow: string[];
  nextSteps: string[];
};
