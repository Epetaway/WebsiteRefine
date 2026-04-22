import { MetaItem } from "./types";

type CaseStudyMetaStripProps = {
  items: MetaItem[];
};

export function CaseStudyMetaStrip({ items }: CaseStudyMetaStripProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto mt-6">
      <div className="flex flex-wrap gap-x-8 gap-y-4 py-5 px-6 rounded-xl border border-[#20252A] bg-[#111111]">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 min-w-0">
            <span className="text-[#7A7A7A] text-base flex-none" aria-hidden="true">
              {item.icon}
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7A7A7A] leading-none mb-0.5">
                {item.label}
              </p>
              <p className="text-sm text-[#F5F5F5] font-medium truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
