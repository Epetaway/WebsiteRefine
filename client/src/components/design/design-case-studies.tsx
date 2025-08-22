import type { DesignProject } from "@/data/design-projects";
import BrandIdentityViewer from "@/components/design/brand-identity-viewer";
import MarketingGrid from "@/components/design/marketing-grid";

export default function DesignCaseStudies({ projects }: { projects: DesignProject[] }) {
  if (!projects || projects.length === 0) {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold gradient-text">Design & Branding</h2>
          <p className="mt-2 text-gray-600">Coming soon — brand identity and campaign design case studies.</p>
        </div>
      </section>
    );
  }

  return (
    <div className="border-t">
      {projects.map((p) => (
        <div key={p.id} className="border-b">
          <BrandIdentityViewer project={p} />
          <MarketingGrid project={p} />
        </div>
      ))}
    </div>
  );
}
