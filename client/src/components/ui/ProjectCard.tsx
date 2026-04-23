import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

/** Minimal data shape consumed by ProjectCard — decoupled from full Project type */
export interface ProjectCardData {
  slug: string;
  displayTitle: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  role?: string;
  /** GitHub user for OpenGraph image fallback */
  githubUser?: string;
  /** Override image URL */
  image?: string;
  /** Short category label shown on the card */
  category?: string;
  /** Compact name for the card h3 e.g. "Gundam Forge" */
  shortTitle?: string;
  /** One-line type label beneath the title e.g. "Deck Builder & Simulator" */
  subtitle?: string;
  /** Key metric or outcome to surface on feature rows */
  metric?: string;
  metricLabel?: string;
  caseStudySlug?: string;
}

// Shared text-shadow style applied to all headings over images
const titleShadow: React.CSSProperties = {
  textShadow: "0 2px 16px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,0.9)",
};
const bodyShadow: React.CSSProperties = {
  textShadow: "0 1px 8px rgba(0,0,0,0.95)",
};

// ─── Standard Card ────────────────────────────────────────────────────────────
// Full-bleed image background, gradient overlay, short title + subtitle +
// tech pills pinned to the bottom. Used on the home page 3-card grid.

interface StandardCardProps {
  project: ProjectCardData;
}

export function ProjectCardStandard({ project }: StandardCardProps) {
  const {
    displayTitle,
    shortTitle,
    subtitle,
    description,
    techStack,
    repoUrl,
    liveUrl,
    githubUser,
    image,
    category,
    caseStudySlug,
    slug,
  } = project;

  const headingText = shortTitle ?? displayTitle;

  const imgSrc =
    image ??
    (githubUser
      ? `https://opengraph.githubassets.com/1/${githubUser}/${slug}`
      : null);

  const cardContent = (
    <article className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#111] cursor-pointer select-none">
      {/* Background image */}
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={`${headingText} preview`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 to-[#0D0D0D]" />
      )}

      {/* Gradient overlay — deepened mid for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10" />

      {/* Hover shimmer */}
      <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/8 transition-colors duration-300" />

      {/* Content pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2">
        {category && (
          <span className="self-start text-[10px] font-semibold tracking-widest uppercase text-violet-300 bg-violet-900/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-violet-700/40">
            {category}
          </span>
        )}

        <div>
          <h3
            className="font-display text-2xl font-bold text-white leading-tight -tracking-[0.03em]"
            style={titleShadow}
          >
            {headingText}
          </h3>
          {subtitle && (
            <p
              className="text-xs text-white/60 mt-0.5 font-medium tracking-wide"
              style={bodyShadow}
            >
              {subtitle}
            </p>
          )}
        </div>

        <p
          className="text-xs text-white/85 leading-relaxed line-clamp-2"
          style={bodyShadow}
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-0.5">
          {techStack.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] bg-black/65 backdrop-blur-sm text-white/90 px-2 py-0.5 rounded-full border border-white/20"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {caseStudySlug && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-violet-300" style={bodyShadow}>
              View Case Study <ArrowRight className="w-3 h-3" />
            </span>
          )}
          {liveUrl && !caseStudySlug && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-medium text-violet-300 hover:text-violet-200"
            >
              <ExternalLink className="w-3 h-3" /> Demo
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-medium text-white/70 hover:text-white"
          >
            <Github className="w-3 h-3" /> Code
          </a>
        </div>
      </div>
    </article>
  );

  if (caseStudySlug) {
    return <Link to={`/projects/${caseStudySlug}`}>{cardContent}</Link>;
  }

  return cardContent;
}

// ─── CTA Card ─────────────────────────────────────────────────────────────────

interface CTACardProps {
  headline?: string;
  subline?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function ProjectCardCTA({
  headline = "Ready to build something great?",
  subline = "Browse the full project archive or let's start a conversation about your next product.",
  ctaLabel = "See All Work",
  ctaHref = "/projects",
}: CTACardProps) {
  return (
    <article className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-violet-950 via-[#1a0a2e] to-[#0D0D0D] flex flex-col justify-between p-6 border border-violet-800/30">
      <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-800/20 rounded-full blur-2xl translate-y-6 -translate-x-6 pointer-events-none" />

      <div className="relative z-10 w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
        <ArrowRight className="w-5 h-5 text-violet-400" />
      </div>

      <div className="relative z-10 space-y-4">
        <h3 className="font-display text-2xl font-bold text-white leading-snug -tracking-[0.02em]">
          {headline}
        </h3>
        <p className="text-sm text-white/65 leading-relaxed">{subline}</p>
        <Link
          to={ctaHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
        >
          {ctaLabel} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

// ─── Featured Hero (Projects Page — full-width top block) ────────────────────

export function ProjectCardFeaturedHero({ project }: { project: ProjectCardData }) {
  const {
    displayTitle,
    shortTitle,
    subtitle,
    description,
    techStack,
    repoUrl,
    liveUrl,
    githubUser,
    image,
    category,
    metric,
    metricLabel,
    caseStudySlug,
    slug,
  } = project;

  const headingText = shortTitle ?? displayTitle;

  const imgSrc =
    image ??
    (githubUser
      ? `https://opengraph.githubassets.com/1/${githubUser}/${slug}`
      : null);

  const inner = (
    <div className="group relative w-full min-h-[62vh] flex items-end overflow-hidden bg-[#0D0D0D] cursor-pointer">
      {imgSrc && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${imgSrc})` }}
        />
      )}
      {!imgSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 to-[#0D0D0D]" />
      )}

      {/* Dual overlay for strong legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/65 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-5 py-14 md:py-20">
        <div className="max-w-2xl flex flex-col gap-4">
          {category && (
            <span className="self-start text-[10px] font-semibold tracking-widest uppercase text-violet-300 bg-violet-900/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-violet-700/40">
              {category}
            </span>
          )}

          <div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white -tracking-[0.03em] leading-[1.05]"
              style={titleShadow}
            >
              {headingText}
            </h2>
            {subtitle && (
              <p
                className="text-base text-white/60 mt-1 font-medium tracking-wide"
                style={bodyShadow}
              >
                {subtitle}
              </p>
            )}
          </div>

          <p
            className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl"
            style={bodyShadow}
          >
            {description}
          </p>

          {metric && (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-violet-400" style={titleShadow}>{metric}</span>
              {metricLabel && <span className="text-sm text-white/60" style={bodyShadow}>{metricLabel}</span>}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {techStack.slice(0, 5).map((t) => (
              <span
                key={t}
                className="text-xs bg-black/65 backdrop-blur-sm border border-white/20 text-white/90 px-3 py-1.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {caseStudySlug && (
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors">
                View Case Study <ArrowRight className="w-4 h-4" />
              </span>
            )}
            {liveUrl && !caseStudySlug && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/25 hover:border-white/50 text-white/80 hover:text-white text-sm font-medium backdrop-blur-sm transition-colors"
            >
              <Github className="w-4 h-4" /> View Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (caseStudySlug) {
    return <Link to={`/projects/${caseStudySlug}`}>{inner}</Link>;
  }

  return inner;
}

// ─── Tile Card (Projects Page Grid) ──────────────────────────────────────────
// Full-bleed background, content pinned to bottom. 2+1 grid on /projects.

export function ProjectCardTile({
  project,
  wide = false,
}: {
  project: ProjectCardData;
  wide?: boolean;
}) {
  const {
    displayTitle,
    shortTitle,
    subtitle,
    description,
    techStack,
    repoUrl,
    liveUrl,
    githubUser,
    image,
    category,
    metric,
    metricLabel,
    caseStudySlug,
    slug,
  } = project;

  const headingText = shortTitle ?? displayTitle;

  const imgSrc =
    image ??
    (githubUser
      ? `https://opengraph.githubassets.com/1/${githubUser}/${slug}`
      : null);

  const card = (
    <article
      className={`group relative overflow-hidden bg-[#0D0D0D] cursor-pointer w-full ${
        wide ? "min-h-[380px] md:min-h-[420px]" : "min-h-[380px]"
      }`}
    >
      {imgSrc ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${imgSrc})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 to-[#0D0D0D]" />
      )}

      {/* Deepened gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/97 via-black/60 to-black/10 group-hover:via-black/65 transition-all duration-300" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col gap-3">
        {category && (
          <span className="self-start text-[10px] font-semibold tracking-widest uppercase text-violet-300 bg-violet-900/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-violet-700/40">
            {category}
          </span>
        )}

        <div>
          <h3
            className={`font-display font-bold text-white -tracking-[0.03em] leading-tight ${
              wide ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            }`}
            style={titleShadow}
          >
            {headingText}
          </h3>
          {subtitle && (
            <p
              className="text-xs text-white/55 mt-0.5 font-medium tracking-wide"
              style={bodyShadow}
            >
              {subtitle}
            </p>
          )}
        </div>

        <p
          className="text-sm text-white/82 leading-relaxed line-clamp-2 max-w-lg"
          style={bodyShadow}
        >
          {description}
        </p>

        {metric && (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-violet-400" style={titleShadow}>{metric}</span>
            {metricLabel && <span className="text-xs text-white/60" style={bodyShadow}>{metricLabel}</span>}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {techStack.slice(0, wide ? 5 : 3).map((t) => (
            <span
              key={t}
              className="text-[10px] bg-black/65 backdrop-blur-sm border border-white/20 text-white/90 px-2 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {caseStudySlug && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300" style={bodyShadow}>
              View Case Study <ArrowRight className="w-3.5 h-3.5" />
            </span>
          )}
          {liveUrl && !caseStudySlug && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-300 hover:text-violet-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/65 hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5" /> Code
          </a>
        </div>
      </div>
    </article>
  );

  if (caseStudySlug) {
    return <Link to={`/projects/${caseStudySlug}`}>{card}</Link>;
  }

  return card;
}
