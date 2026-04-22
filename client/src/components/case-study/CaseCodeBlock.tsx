type CaseCodeBlockProps = {
  title: string;
  filePath: string;
  language: string;
  code: string;
  rationale: string;
};

export function CaseCodeBlock({ title, filePath, language, code, rationale }: CaseCodeBlockProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a] text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 px-4 py-3">
        <p className="font-['Space_Grotesk'] text-sm font-semibold">{title}</p>
        <p className="text-xs text-slate-400">{filePath}</p>
      </div>
      <pre className="max-h-[360px] overflow-auto p-4 text-xs leading-relaxed sm:text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <div className="border-t border-slate-700 bg-slate-900/70 px-4 py-3 text-xs text-slate-300 sm:text-sm">
        {rationale}
      </div>
    </article>
  );
}
