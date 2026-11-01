import type { FieldNoteFigure as Figure } from "@/data/fieldNotes";
import { publicPath } from "@/lib/publicPath";

type Props = { figure: Figure; number: number };

/**
 * A screen with its caption. Phone screens sit beside the caption; desktop screens (wider than
 * tall) span the reading column with the caption below. The image's alt text describes what is
 * on screen; the caption, read after it, says why the screen matters.
 */
export function FieldNoteFigure({ figure, number }: Props) {
  const label = `Figure ${String(number).padStart(2, "0")}`;
  const desktop = figure.width > figure.height;
  const url = (width: number) => publicPath(`${figure.src}-${width}.webp`);
  const full = url(figure.widths[figure.widths.length - 1]);
  return (
    <figure className={`field-note-figure field-note-figure--${desktop ? "desktop" : "phone"}`} id={`figure-${number}`}>
      <div className="field-note-figure__frame">
        {desktop && <span className="field-note-figure__chrome" aria-hidden="true"><i /><i /><i /></span>}
        <img
          src={url(figure.widths[0])}
          srcSet={figure.widths.map((width) => `${url(width)} ${width}w`).join(", ")}
          sizes={desktop ? "(max-width: 900px) 92vw, 760px" : "(max-width: 700px) min(78vw, 320px), 280px"}
          width={figure.width}
          height={figure.height}
          alt={figure.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption>
        <span className="field-note-figure__label">{label}</span>
        <p>{figure.caption}</p>
        <small>{figure.source}</small>
        <a href={full} target="_blank" rel="noreferrer">
          Full size<span className="sr-only">: {label}</span> <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
