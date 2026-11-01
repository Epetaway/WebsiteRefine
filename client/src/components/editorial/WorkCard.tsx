import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { KitPicture } from "@/components/case-study-kit/kit";
import type { WorkEntry } from "@/data/work";
import { getWorkCover, workCoverStyle, type WorkCoverPlacement } from "@/data/workCovers";

type Props = {
  project: WorkEntry;
  /** Position in the list: sets the media side (alternating) and loads the first card eagerly. */
  index: number;
  /** Which image pair to show, so Home and /work don't repeat each other. */
  placement: WorkCoverPlacement;
  /** Heading level for the project name: h2 on /work, h3 under Home's section heading. */
  headingLevel: "h2" | "h3";
  /** Labelled facts under the summary; leave empty for the compact Home card. */
  details?: { label: string; value: string }[];
  /** Compact: shorter card with a filled call to action, for Home. */
  compact?: boolean;
};

/**
 * A full-width case-study card on the project's own dark surface. The project name is the card's
 * one link; a stretched ::after makes the whole card its hit area, while the images and copy stay
 * outside the link so its accessible name is just the project name.
 */
export function WorkCard({ project, index, placement, headingLevel: Heading, details = [], compact = false }: Props) {
  const cover = getWorkCover(project.slug);
  const { main, float } = cover[placement];
  const eager = index === 0;

  return (
    <article
      className={`work-card work-card--${index % 2 === 0 ? "media-right" : "media-left"}${compact ? " work-card--compact" : ""}`}
      style={workCoverStyle(cover) as CSSProperties}
      data-testid={`work-card-${project.slug}`}
    >
      <div className="work-card__body">
        <p className="work-card__meta">
          <span>Case study {project.number}</span>
          <span>{project.theme}</span>
        </p>
        <Heading className="work-card__title">
          <Link className="work-card__link" to={project.path}>{project.name}</Link>
        </Heading>
        <p className="work-card__question">{project.question}</p>
        <p className="work-card__summary">{project.summary}</p>
        {details.length > 0 && (
          <dl>
            {details.map((detail) => (
              <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>
            ))}
          </dl>
        )}
        <span className="work-card__cta" aria-hidden="true">{compact ? "Read the case study" : "Open case study"} <i>→</i></span>
      </div>
      <div className="work-card__stage">
        <span className="work-card__status">{project.status}</span>
        <div className="work-card__main">
          <i className="work-card__bar" aria-hidden="true"><b /><b /><b /></i>
          <KitPicture item={main.item} alt={main.alt} sizes="(max-width: 900px) 92vw, 52vw" eager={eager} />
        </div>
        <div className="work-card__float">
          <KitPicture item={float.item} alt={float.alt} sizes="(max-width: 900px) 34vw, 14vw" eager={eager} />
        </div>
      </div>
    </article>
  );
}
