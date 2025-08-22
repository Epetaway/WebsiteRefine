// client/src/components/design/marketing-grid.tsx
import type { BrandImage } from "@/data/brand-book-projects";

export default function MarketingGrid({
  applications = [],
  campaigns = [],
}: {
  applications?: BrandImage[];
  campaigns?: BrandImage[];
}) {
  const items = [
    ...applications.map((i) => ({ ...i, group: "Applications" })),
    ...campaigns.map((i) => ({ ...i, group: "Campaigns" })),
  ];
  if (!items.length) return null;

  return (
    <section className="mb-10">
      <h4 className="font-semibold mb-2">Applications & Campaigns</h4>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((img, i) => (
          <figure key={i} className="rounded-xl overflow-hidden border bg-white">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
            <figcaption className="px-3 py-2 text-xs text-gray-600">
              {img.group}{img.notes ? ` — ${img.notes}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
