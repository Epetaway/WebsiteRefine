import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  CaseCodeBlock,
  CaseFeature,
  CaseGrid,
  CaseHero,
  CaseOverview,
  CaseSection,
  CaseStudyLayout,
} from "@/components/case-study";
import { withYouTheme } from "./theme";
import { withYouCodeHighlights, withYouContent, withYouFeatures, withYouOverview } from "./data";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#f16464]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function WithYouCaseStudy() {
  return (
    <>
      <Helmet>
        <title>WithYou Case Study | Earl Hickson Jr.</title>
        <meta
          name="description"
          content="Portfolio case study for WithYou: a mobile-first relationship wellness app focused on intentional communication and privacy-first product decisions."
        />
      </Helmet>

      <CaseStudyLayout theme={withYouTheme}>
        <CaseHero
          title={withYouContent.title}
          subtitle={withYouContent.subtitle}
          image={withYouContent.heroImage}
          theme={withYouTheme}
          eyebrow="Relationship Wellness App"
        />

        <CaseOverview items={withYouOverview} />

        <CaseSection title="Problem" kicker="01">
          <p>{withYouContent.oneLiner}</p>
          <BulletList items={withYouContent.problem} />
        </CaseSection>

        <CaseSection title="Approach and Product Thinking" kicker="02">
          <BulletList items={withYouContent.approach} />
        </CaseSection>

        <CaseSection title="Design System and UI" kicker="03">
          <BulletList items={withYouContent.designSystem} />
        </CaseSection>

        <CaseSection title="Key Features" kicker="04">
          <CaseGrid columns={3}>
            {withYouFeatures.map((feature) => (
              <CaseFeature
                key={feature.title}
                title={feature.title}
                description={feature.description}
                whyItMatters={feature.whyItMatters}
              />
            ))}
          </CaseGrid>
        </CaseSection>

        <CaseSection title="Engineering Highlights" kicker="05">
          <div className="space-y-4">
            {withYouCodeHighlights.map((snippet) => (
              <CaseCodeBlock key={snippet.title} {...snippet} />
            ))}
          </div>
        </CaseSection>

        <CaseSection title="Mobile-first Strategy" kicker="06">
          <BulletList items={withYouContent.mobileFirst} />
        </CaseSection>

        <CaseSection title="Results and Impact" kicker="07">
          <BulletList items={withYouContent.impact} />
        </CaseSection>

        <CaseSection title="Reflection" kicker="08">
          <BulletList items={withYouContent.reflection} />
        </CaseSection>

        <CaseSection title="Template System Notes" kicker="09">
          <BulletList items={withYouContent.implementationNotes} />
          <div className="pt-4">
            <Link
              to="/projects"
              className="inline-flex items-center rounded-lg border border-[#e9d0cb] bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-[#fff1ee]"
            >
              Back to Projects
            </Link>
          </div>
        </CaseSection>
      </CaseStudyLayout>
    </>
  );
}
