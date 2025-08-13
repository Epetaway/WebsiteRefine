import { projects } from "@/data/projects";
import CaseStudyCard from "@/components/ui/case-study-card";

export default function CaseStudies() {
  const featuredProject = projects.find(p => p.category === 'featured');
  const otherProjects = projects.filter(p => p.category !== 'featured');

  // Flip to false when you’re ready to reveal the page
  const isUnderConstruction = true;

  return (
    <div className="pt-16">
      {isUnderConstruction ? (
        <section
          aria-labelledby="uc-title"
          className="relative isolate bg-gradient-to-b from-primary-50/60 via-white to-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Badge */}
            <div className="mx-auto w-fit mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-primary-700 shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-primary-500 animate-pulse" aria-hidden="true" />
                Case Studies
              </span>
            </div>

            {/* Title & Copy */}
            <div className="text-center">
              <h1
                id="uc-title"
                className="text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                data-testid="page-title"
              >
                Coming Soon
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                I’m polishing up detailed front‑end case studies with production code, accessibility notes,
                and performance wins. This page will be back shortly.
              </p>
            </div>

            {/* Progress shimmer (subtle) */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 ring-1 ring-inset ring-gray-200">
                <div className="h-full w-1/3 animate-[shimmer_1.6s_linear_infinite] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              </div>
            </div>

            {/* CTAs (match site style) */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@ehicksonjr.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-sm"
                data-testid="button-contact"
              >
                <i className="fas fa-envelope mr-2" aria-hidden="true" />
                Start a Conversation
              </a>
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-500 transition-colors"
                data-testid="button-resume"
              >
                <i className="fas fa-download mr-2" aria-hidden="true" />
                Download Resume
              </a>
            </div>

            {/* Small note */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Want early access to a case study draft? Email me and I’ll share a preview.
            </p>
          </div>

          {/* Decorative radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center opacity-50"
          >
            <div className="h-48 w-[36rem] rounded-full bg-primary-200 blur-3xl"></div>
          </div>

          {/* Keyframes for shimmer (scoped via arbitrary layer) */}
          <style jsx>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(300%); }
            }
          `}</style>
        </section>
      ) : (
        <>
          {/* Original content (kept, just hidden while under construction) */}
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">Front-End Case Studies</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Real projects, measurable results, production code. Here's how I solve complex front-end challenges 
                  with modern frameworks, accessibility standards, and performance optimization.
                </p>
              </div>
            </div>
          </section>

          {featuredProject && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <CaseStudyCard project={featuredProject} featured={true} />
              </div>
            </section>
          )}

          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-16">
