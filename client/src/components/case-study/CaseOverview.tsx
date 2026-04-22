import { OverviewItem } from "./types";

type CaseOverviewProps = {
  items: OverviewItem[];
};

export function CaseOverview({ items }: CaseOverviewProps) {
  return (
    <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border bg-white/80 p-4 backdrop-blur dark:bg-black/20"
          style={{ borderColor: "rgba(255,255,255,0.25)" }}
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
