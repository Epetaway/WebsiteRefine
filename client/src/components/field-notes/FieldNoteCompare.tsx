import { useState } from "react";
import type { FieldNoteCompare as Compare } from "@/data/fieldNotes";
import { publicPath } from "@/lib/publicPath";

type Props = { compare: Compare; number: number };

/**
 * A before/after slider. A transparent range input covers the image, so dragging, touch, arrow keys,
 * Home/End and screen-reader value changes all come from the browser's own control. The picture
 * underneath is the current version clipped to the left of the handle; the original shows to its right.
 */
export function FieldNoteCompare({ compare, number }: Props) {
  const [percent, setPercent] = useState(50);
  const label = `Figure ${String(number).padStart(2, "0")}`;
  const url = (src: string, width: number) => publicPath(`${src}-${width}.webp`);
  const largest = compare.widths[compare.widths.length - 1];
  const sizes = "(max-width: 900px) 92vw, 760px";
  const image = (side: Compare["before"], className?: string) => (
    <img
      className={className}
      src={url(side.src, compare.widths[0])}
      srcSet={compare.widths.map((width) => `${url(side.src, width)} ${width}w`).join(", ")}
      sizes={sizes}
      width={compare.width}
      height={compare.height}
      alt={side.alt}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
  return (
    <figure className="field-note-figure field-note-figure--desktop field-note-compare" id={`figure-${number}`}>
      <div className="field-note-figure__frame">
        <div
          className="field-note-compare__stage"
          style={{ "--p": percent / 100, "--w": compare.width, "--h": compare.height } as React.CSSProperties}
        >
          {image(compare.before)}
          {image(compare.after, "field-note-compare__after")}
          <span className="field-note-compare__line" aria-hidden="true" />
          <span className="field-note-compare__handle" aria-hidden="true">◂ ▸</span>
          <span className="field-note-compare__tag field-note-compare__tag--after" aria-hidden="true">{compare.after.label}</span>
          <span className="field-note-compare__tag field-note-compare__tag--before" aria-hidden="true">{compare.before.label}</span>
          <input
            className="field-note-compare__input"
            type="range"
            min={0}
            max={100}
            step={1}
            value={percent}
            onChange={(event) => setPercent(Number(event.target.value))}
            aria-label={compare.control}
            aria-valuetext={`${percent}% of the ${compare.after.label.toLowerCase()} version showing`}
          />
        </div>
      </div>
      <figcaption>
        <span className="field-note-figure__label">{label} · Drag to compare</span>
        <p>{compare.caption}</p>
        <small>{compare.source}</small>
        <a href={url(compare.after.src, largest)} target="_blank" rel="noreferrer">
          Current, full size<span className="sr-only">: {label}</span> <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
