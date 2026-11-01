import type { FieldNoteFigure as Figure } from "@/data/fieldNotes";
import { publicPath } from "@/lib/publicPath";

type Props = { figure: Figure; number: number };

/**
 * A phone screen beside its caption. The image carries alt text describing what is on screen;
 * the caption, read after it, says why the screen matters. On narrow screens they stack.
 */
export function FieldNoteFigure({ figure, number }: Props) {
  const label = `Figure ${String(number).padStart(2, "0")}`;
  const full = publicPath(`${figure.src}-1080.webp`);
  return (
    <figure className="field-note-figure" id={`figure-${number}`}>
      <div className="field-note-figure__frame">
        <img
          src={publicPath(`${figure.src}-600.webp`)}
          srcSet={`${publicPath(`${figure.src}-600.webp`)} 600w, ${full} 1080w`}
          sizes="(max-width: 700px) min(78vw, 320px), 280px"
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
