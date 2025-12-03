import type { BrandProject } from "@/data/brand-book-projects";
// import MarketingGrid from "./marketing-grid"; // optional; safe to remove if unused

function Title({ children }: { children: React.ReactNode }) {
  return <h4 className="font-semibold mb-2">{children}</h4>;
}

export default function BrandBook({ project }: { project: BrandProject }) {
  const {
    title,
    role,
    year,
    overview,
    logos,
    colors,
    typography,
    usage,
    applications,
    campaigns,
    principles,
    grid,
    accessibility,
    motion,
    voice,
  } = project;

  return (
    <article className="max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
        <p className="text-sm text-gray-500">
          {role}
          {year ? ` · ${year}` : ""}
        </p>
      </header>

      {/* Overview */}
      {(overview?.summary ||
        overview?.industry ||
        overview?.audience ||
        overview?.personality?.length) && (
        <section className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <Title>Overview</Title>
            {overview?.summary && (
              <p className="text-gray-700">{overview.summary}</p>
            )}
            <ul className="mt-4 text-sm text-gray-600 space-y-1">
              {overview?.industry && (
                <li>
                  <strong>Industry:</strong> {overview.industry}
                </li>
              )}
              {overview?.audience && (
                <li>
                  <strong>Audience:</strong> {overview.audience}
                </li>
              )}
              {overview?.personality?.length ? (
                <li>
                  <strong>Personality:</strong>{" "}
                  {overview.personality.join(", ")}
                </li>
              ) : null}
            </ul>
          </div>

          {/* Cover image (optional) */}
          {overview?.cover?.src && (
            <div className="rounded-xl overflow-hidden border bg-gray-50">
              <img
                src={overview.cover.src}
                alt={overview.cover.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </section>
      )}

      {/* Logo System */}
      {logos?.images?.length ? (
        <section className="mb-10">
          <Title>Logo System</Title>
          {logos?.rationale && (
            <p className="text-gray-700 mb-4">{logos.rationale}</p>
          )}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {logos.images.map((img, i) => (
              <figure
                key={i}
                className="rounded-xl overflow-hidden border bg-white p-4 flex items-center justify-center"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="max-h-48 object-contain"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* Color Palette (code-only swatches) */}
      {colors?.palette?.length ? (
        <section className="mb-10">
          <Title>Color Palette</Title>
          {colors?.rationale && (
            <p className="text-gray-700 mb-4">{colors.rationale}</p>
          )}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {colors.palette.map((c, i) => (
              <div key={i} className="rounded-xl border bg-white">
                <div
                  className="h-20 w-full rounded-t-xl border-b"
                  style={{ background: c.hex }}
                  aria-label={`${c.name} swatch`}
                />
                <div className="p-3 text-sm">
                  <div className="font-semibold">{c.name}</div>
                  {c.hex && (
                    <div className="font-mono text-xs text-gray-600">
                      {c.hex}
                    </div>
                  )}
                  {c.rgb && (
                    <div className="font-mono text-xs text-gray-600">
                      rgb({c.rgb})
                    </div>
                  )}
                  {c.cmyk && (
                    <div className="font-mono text-xs text-gray-600">
                      cmyk({c.cmyk})
                    </div>
                  )}
                  {c.usage && (
                    <div className="text-xs text-gray-500 mt-1">{c.usage}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Typography (code-only samples, using actual Google Fonts) */}
      {typography?.fonts?.length ? (
        <section className="mb-10">
          <Title>Typography</Title>
          {typography?.rationale && (
            <p className="text-gray-700 mb-4">{typography.rationale}</p>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            {typography.fonts.map((f, i) => {
              const weights = f.weights?.length ? f.weights : [400];
              return (
                <div key={i} className="rounded-xl border bg-white p-4">
                  <div className="text-xs uppercase tracking-wide text-gray-500">
                    {f.role}
                  </div>
                  <div className="font-semibold">{f.family}</div>

                  {/* Render a sample line for each declared weight */}
                  {f.example && (
                    <div className="mt-3 space-y-1">
                      {weights.map((w) => (
                        <p
                          key={w}
                          className="text-lg leading-relaxed"
                          style={{ fontFamily: f.family, fontWeight: w }}
                        >
                          {f.example} <span className="text-xs text-gray-500">({w})</span>
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 text-xs text-gray-500 space-y-1">
                    {f.trackingNote ? (
                      <div>Tracking: {f.trackingNote}</div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Tip: make sure the Google Fonts are loaded globally so these samples render correctly.
          </p>
        </section>
      ) : null}

      {/* Usage & Rules */}
      {usage?.notes?.length || usage?.examples?.length ? (
        <section className="mb-10">
          <Title>Usage & Rules</Title>
          {usage?.notes?.length ? (
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              {usage.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          ) : null}
          {usage?.examples?.length ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {usage.examples.map((img, i) => (
                <figure
                  key={i}
                  className="rounded-xl overflow-hidden border bg-white"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Applications / Campaigns (optional images) */}
      {applications?.images?.length || campaigns?.images?.length ? (
        <section className="mb-10">
          <Title>Applications & Campaigns</Title>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(applications?.images ?? []).map((img, i) => (
              <figure
                key={`app-${i}`}
                className="rounded-xl overflow-hidden border bg-white"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </figure>
            ))}
            {(campaigns?.images ?? []).map((img, i) => (
              <figure
                key={`camp-${i}`}
                className="rounded-xl overflow-hidden border bg-white"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* Principles & Specs */}
      {principles?.bullets?.length || grid || accessibility?.contrast?.length ? (
        <section className="mt-10 grid lg:grid-cols-2 gap-6">
          {principles?.bullets?.length ? (
            <div className="rounded-xl border bg-white p-5">
              <Title>Design Principles</Title>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {principles.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="rounded-xl border bg-white p-5 space-y-4">
            {grid ? (
              <div>
                <Title>Grid</Title>
                <p className="text-gray-700 text-sm">
                  {grid.columns}-column · {grid.gutter}px gutter · {grid.margin}px
                  {" "}margin
                </p>
              </div>
            ) : null}

            {accessibility?.contrast?.length ? (
              <div>
                <Title>Accessibility</Title>
                <ul className="text-sm text-gray-700 space-y-1">
                  {accessibility.contrast.map((c, i) => (
                    <li key={i}>
                      <span className="font-mono">{c.fg}</span> on{" "}
                      <span className="font-mono">{c.bg}</span> → {c.ratio}
                      {c.note ? ` (${c.note})` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Voice & Motion */}
      {voice?.adjectives?.length ||
      voice?.headlineRules?.length ||
      voice?.microcopyRules?.length ||
      motion?.rules?.length ? (
        <section className="mt-10 rounded-xl border bg-white p-5">
          <Title>Voice & Tone</Title>
          <div className="text-sm text-gray-700 space-y-2">
            {voice?.adjectives?.length ? (
              <p>
                <strong>Adjectives:</strong> {voice.adjectives.join(", ")}
              </p>
            ) : null}
            {voice?.headlineRules?.length ? (
              <p>
                <strong>Headline rules:</strong>{" "}
                {voice.headlineRules.join(" · ")}
              </p>
            ) : null}
            {voice?.microcopyRules?.length ? (
              <p>
                <strong>Microcopy rules:</strong>{" "}
                {voice.microcopyRules.join(" · ")}
              </p>
            ) : null}
            {motion?.rules?.length ? (
              <p>
                <strong>Motion:</strong> {motion.rules.join(" · ")}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}
    </article>
  );
}
