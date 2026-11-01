import { WyMark } from "@/components/withyou/WyMark";
import type { NoteBrand } from "@/data/noteBrands";
import { publicPath } from "@/lib/publicPath";

/** A project's own lockup, drawn the way its case study draws it. Decorative: the name is in text nearby. */
function ProjectMark({ brand }: { brand: NoteBrand }) {
  switch (brand.key) {
    case "withyou":
      return (
        <span className="nb-mark nb-mark--withyou" aria-hidden="true">
          <WyMark size={34} coral="var(--nb-accent)" blush="var(--nb-accent-2)" />
          <span>With<b>You</b></span>
        </span>
      );
    case "dojonet":
      return <span className="nb-mark nb-mark--dojonet" aria-hidden="true">DojoNet</span>;
    case "gundam-forge":
      return (
        <span className="nb-mark nb-mark--gundam-forge" aria-hidden="true">
          <span className="nb-mark__badge">GF</span>
          <span>Gundam Forge</span>
        </span>
      );
    case "earl-the-kaiju":
      return (
        <img
          className="nb-mark nb-mark--earl-the-kaiju"
          src={publicPath("/assets/projects/earl-the-kaiju/brand/earl-the-kaiju-lockup-horizontal-full-color.svg")}
          alt=""
          aria-hidden="true"
        />
      );
    default:
      return null;
  }
}

/**
 * The note's co-brand: the portfolio monogram, then "×" and the project's lockup when the note
 * discusses a project. Screen readers get one sentence instead of the marks.
 */
export function NoteLockup({ brand, number }: { brand: NoteBrand; number: string }) {
  const project = brand.key !== "portfolio";
  return (
    <p className={`nb-lockup${project ? "" : " nb-lockup--portfolio"}`}>
      <span className="sr-only">
        {project ? `Field Note ${number}, about ${brand.name}` : `Field Note ${number}`}
      </span>
      <span className="nb-lockup__eh" aria-hidden="true">EH</span>
      {project && (
        <>
          <span className="nb-lockup__x" aria-hidden="true">×</span>
          <ProjectMark brand={brand} />
        </>
      )}
    </p>
  );
}
