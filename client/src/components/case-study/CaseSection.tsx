import { ReactNode } from "react";

type CaseSectionProps = {
  title: string;
  kicker?: string;
  children: ReactNode;
};

export function CaseSection({ title, kicker, children }: CaseSectionProps) {
  return (
    <section className="mb-10 rounded-3xl border border-white/20 bg-white/75 p-5 backdrop-blur sm:p-8">
      {kicker && <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e85c5c]">{kicker}</p>}
      <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-semibold text-slate-950 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">{children}</div>
    </section>
  );
}
