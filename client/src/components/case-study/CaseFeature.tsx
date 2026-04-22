type CaseFeatureProps = {
  title: string;
  description: string;
  whyItMatters: string;
};

export function CaseFeature({ title, description, whyItMatters }: CaseFeatureProps) {
  return (
    <article className="rounded-2xl border border-[#f0d9d8] bg-white p-4 sm:p-5">
      <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-700">{description}</p>
      <p className="mt-3 text-sm text-slate-600">
        <span className="font-semibold text-slate-800">Why it matters:</span> {whyItMatters}
      </p>
    </article>
  );
}
