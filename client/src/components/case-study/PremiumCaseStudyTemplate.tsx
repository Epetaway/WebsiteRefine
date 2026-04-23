import { PremiumCaseStudyData, TocSection } from "./types";
import { PremiumCaseStudyLayout } from "./PremiumCaseStudyLayout";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyMetaStrip } from "./CaseStudyMetaStrip";
import { CaseStudyTOC } from "./CaseStudyTOC";
import { CaseStudyMobileTOC } from "./CaseStudyMobileTOC";
import { CaseStudyOverviewSection } from "./CaseStudyOverviewSection";
import { CaseStudyChallenge } from "./CaseStudyChallenge";
import { CaseStudyGoals } from "./CaseStudyGoals";
import { CaseStudyProcess } from "./CaseStudyProcess";
import { CaseStudyFeatureCarousel } from "./CaseStudyFeatureCarousel";
import { CaseStudyTechStack } from "./CaseStudyTechStack";
import { CaseStudyCodeTabs } from "./CaseStudyCodeTabs";
import { CaseStudyMetricsRow } from "./CaseStudyMetricsRow";
import { CaseStudyLearnings } from "./CaseStudyLearnings";
import { CaseStudyFuture } from "./CaseStudyFuture";
import { CaseStudyBottomCTA } from "./CaseStudyBottomCTA";

const TOC_SECTIONS: TocSection[] = [
  { id: "overview",   label: "Overview" },
  { id: "challenge",  label: "The Challenge" },
  { id: "goals",      label: "The Goal" },
  { id: "approach",   label: "My Approach" },
  { id: "features",   label: "Key Features" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "code",       label: "Code Highlights" },
  { id: "impact",     label: "Impact & Results" },
  { id: "learnings",  label: "What I Learned" },
  { id: "next-steps", label: "What's Next" },
];

type Props = {
  data: PremiumCaseStudyData;
};

export function PremiumCaseStudyTemplate({ data }: Props) {
  return (
    <PremiumCaseStudyLayout theme={data.theme}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <CaseStudyHero
        category={data.category}
        title={data.title}
        subtitle={data.subtitle}
        heroImage={data.heroImage}
        liveUrl={data.liveUrl}
        repoUrl={data.repoUrl}
      />

      {/* ── Meta strip ───────────────────────────────────────── */}
      <CaseStudyMetaStrip items={data.meta} />

      {/* ── Mobile TOC (below meta strip) ────────────────────── */}
      <CaseStudyMobileTOC sections={TOC_SECTIONS} />

      {/* ── Main 2-col grid ──────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12 xl:gap-16">

          {/* ── Left: content sections ───────────────────────── */}
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
              description={data.challenge.description}
              problems={data.challenge.problems}
            />

            <CaseStudyGoals goals={data.goals} />

            <CaseStudyProcess steps={data.process} />

            <CaseStudyFeatureCarousel features={data.features} />

            <CaseStudyTechStack stack={data.techStack} />

            <CaseStudyCodeTabs tabs={data.codeTabs} />

            <CaseStudyMetricsRow metrics={data.metrics} />

            <CaseStudyLearnings items={data.learnings} />

            <CaseStudyFuture items={data.futureItems} />
          </main>

          {/* ── Right: sticky TOC rail ────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 pt-12">
              <CaseStudyTOC sections={TOC_SECTIONS} />
            </div>
          </aside>
        </div>
      </div>

      {/* ── Bottom CTA + pagination ───────────────────────────── */}
      <CaseStudyBottomCTA
        prevProject={data.prevProject}
        nextProject={data.nextProject}
      />
    </PremiumCaseStudyLayout>
  );
}
