import { DesignDocCaseStudyData, TocSection } from "./types";
import { PremiumCaseStudyLayout } from "./PremiumCaseStudyLayout";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyMetaStrip } from "./CaseStudyMetaStrip";
import { CaseStudyTOC } from "./CaseStudyTOC";
import { CaseStudyMobileTOC } from "./CaseStudyMobileTOC";
import { CaseStudyOverviewSection } from "./CaseStudyOverviewSection";
import { CaseStudyChallenge } from "./CaseStudyChallenge";
import { CaseStudyProse } from "./CaseStudyProse";
import { CaseStudyGoals } from "./CaseStudyGoals";
import { CaseStudyResearch } from "./CaseStudyResearch";
import { CaseStudyProcess } from "./CaseStudyProcess";
import { CaseStudyInformationArchitecture } from "./CaseStudyInformationArchitecture";
import { CaseStudyFeatureCarousel } from "./CaseStudyFeatureCarousel";
import { CaseStudyTechStack } from "./CaseStudyTechStack";
import { CaseStudyLearnings } from "./CaseStudyLearnings";
import { CaseStudyFuture } from "./CaseStudyFuture";
import { CaseStudyBottomCTA } from "./CaseStudyBottomCTA";

// Canonical, numbered section order. A project's prototype link (if any)
// renders as a password-gated CTA button in the hero, not a numbered
// section — see CaseStudyHero / ProtectedPrototypeButton.
const TOC_SECTIONS: TocSection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "opportunity", label: "The Opportunity" },
  { id: "goals", label: "Goals" },
  { id: "research", label: "Research" },
  { id: "design-principles", label: "Design Principles" },
  { id: "information-architecture", label: "Information Architecture" },
  { id: "features", label: "Key Features" },
  { id: "visual-design", label: "Visual Design" },
  { id: "technical-architecture", label: "Technical Architecture" },
  { id: "design-system", label: "Design System" },
  { id: "accessibility", label: "Accessibility" },
  { id: "challenges", label: "Challenges" },
  { id: "outcomes", label: "Outcomes" },
  { id: "reflection", label: "Reflection" },
  { id: "next-steps", label: "What's Next" },
];

function eyebrowFor(id: string, label: string): string {
  const idx = TOC_SECTIONS.findIndex((s) => s.id === id);
  const number = String(idx + 1).padStart(2, "0");
  return `${number} ${label}`;
}

type Props = {
  data: DesignDocCaseStudyData;
};

/**
 * Template for case studies sourced from a full claude.ai design-doc export
 * (Overview -> Problem -> Opportunity -> Goals -> Research -> Design
 * Principles -> IA -> Key Features -> Visual Design -> Technical
 * Architecture -> Design System -> Accessibility -> Challenges -> Outcomes
 * -> Reflection -> Next Steps). Reuses the Premium template's shared pieces
 * (Hero, MetaStrip, TOC, FeatureCarousel, TechStack, Learnings, Future,
 * Prototype, BottomCTA) plus a handful of design-doc-specific sections.
 */
export function DesignDocCaseStudyTemplate({ data }: Props) {
  return (
    <PremiumCaseStudyLayout theme={data.theme}>
      <CaseStudyHero
        category={data.category}
        title={data.title}
        subtitle={data.subtitle}
        heroImage={data.heroImage}
        liveUrl={data.liveUrl}
        repoUrl={data.repoUrl}
        prototype={data.prototype}
      />

      <CaseStudyMetaStrip items={data.meta} />

      <CaseStudyMobileTOC sections={TOC_SECTIONS} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12 xl:gap-16">
          <main className="min-w-0">
            <CaseStudyOverviewSection
              description={data.overview.description}
              industry={data.overview.industry}
              targetUsers={data.overview.targetUsers}
              type={data.overview.type}
              myRole={data.overview.myRole}
              image={data.overview.image}
            />

            <CaseStudyChallenge
              id="problem"
              eyebrow={eyebrowFor("problem", "The Problem")}
              heading="The problem to solve"
              description={data.problem.description}
              problems={data.problem.problems}
            />

            <CaseStudyProse
              id="opportunity"
              eyebrow={eyebrowFor("opportunity", "The Opportunity")}
              heading={data.opportunity.heading}
              paragraphs={data.opportunity.paragraphs}
              tags={data.opportunity.tags}
            />

            <CaseStudyGoals
              id="goals"
              eyebrow={eyebrowFor("goals", "Goals")}
              heading="What success looked like"
              intro="What the business needed and what visitors and users needed — both had to be true at once."
              goals={data.goals}
            />

            <CaseStudyResearch
              id="research"
              eyebrow={eyebrowFor("research", "Research")}
              heading="Understanding the real problem"
              interviewIntro={data.research.interviewIntro}
              quotes={data.research.quotes}
              competitiveIntro={data.research.competitiveIntro}
              competitors={data.research.competitors}
              observations={data.research.observations}
            />

            <CaseStudyProcess
              id="design-principles"
              eyebrow={eyebrowFor("design-principles", "Design Principles")}
              heading="Principles that guided the design"
              intro="Five principles kept the interface honest as the product grew from a single site into a platform."
              steps={data.designPrinciples}
            />

            <CaseStudyInformationArchitecture
              id="information-architecture"
              eyebrow={eyebrowFor("information-architecture", "Information Architecture")}
              heading="Two experiences, one system"
              intro={data.informationArchitecture.intro}
              columns={data.informationArchitecture.columns}
            />

            <CaseStudyFeatureCarousel
              id="features"
              eyebrow={eyebrowFor("features", "Key Features")}
              heading="Core features and functionality"
              intro="What visitors and trainers can actually do with the product."
              features={data.features}
            />

            <CaseStudyProse
              id="visual-design"
              eyebrow={eyebrowFor("visual-design", "Visual Design")}
              heading={data.visualDesign.heading}
              paragraphs={data.visualDesign.paragraphs}
              tags={data.visualDesign.tags}
            />

            <CaseStudyTechStack
              id="technical-architecture"
              eyebrow={eyebrowFor("technical-architecture", "Technical Architecture")}
              heading="Frontend, backend, and deployment"
              intro={data.technicalArchitectureIntro}
              stack={data.techStack}
            />

            <CaseStudyTechStack
              id="design-system"
              eyebrow={eyebrowFor("design-system", "Design System")}
              heading="A reusable component library"
              intro={data.designSystem.intro}
              stack={data.designSystem.components}
            />

            <CaseStudyLearnings
              id="accessibility"
              eyebrow={eyebrowFor("accessibility", "Accessibility")}
              heading="Built in, not bolted on"
              items={data.accessibility}
            />

            <CaseStudyProse
              id="challenges"
              eyebrow={eyebrowFor("challenges", "Challenges")}
              heading={data.challenges.heading}
              paragraphs={data.challenges.paragraphs}
            />

            <CaseStudyProse
              id="outcomes"
              eyebrow={eyebrowFor("outcomes", "Outcomes")}
              heading={data.outcomes.heading}
              paragraphs={data.outcomes.paragraphs}
            />

            <CaseStudyProse
              id="reflection"
              eyebrow={eyebrowFor("reflection", "Reflection")}
              heading={data.reflection.heading}
              paragraphs={data.reflection.paragraphs}
            />

            <CaseStudyFuture
              id="next-steps"
              eyebrow={eyebrowFor("next-steps", "What's Next")}
              heading="Future improvements"
              intro="The MVP intentionally excluded these to keep scope focused on immediate value."
              items={data.nextSteps}
            />
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-24 pt-12">
              <CaseStudyTOC sections={TOC_SECTIONS} />
            </div>
          </aside>
        </div>
      </div>

      <CaseStudyBottomCTA prevProject={data.prevProject} nextProject={data.nextProject} />
    </PremiumCaseStudyLayout>
  );
}
