type Props = {
  className?: string;
  /** Accessible name. Omit when the mark sits next to visible text (decorative). */
  title?: string;
};

/**
 * Earl Hickson Jr. logo mark: a folded triangle in two brand tones.
 * Colors come from CSS custom properties so the mark can follow dark or light surfaces.
 */
export default function LogoMark({ className, title }: Props) {
  const ring = "var(--logo-ring, #F2EDE3)";
  const accent = "var(--logo-accent, #F6B51D)";
  const shade = "#6C4700";
  return (
    <svg
      className={className}
      viewBox="73 191 1107 947"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d="M93 211H1160L895 655L820 528L935 339H322L397 465H243Z" fill={ring} />
      <path d="M312 596H473L697 978L618 1118Z" fill={ring} />
      <path d="M820 528L895 655L880 540Z" fill={shade} fillOpacity=".55" />
      <path d="M618 840L697 714L778 851L697 978Z" fill={accent} />
      <path d="M618 840L697 978L697 905Z" fill={shade} fillOpacity=".55" />
      <path d="M619 465H780L895 655L815 793Z" fill={accent} />
      <path d="M150 465H548L625 596H227Z" fill={accent} />
      <path d="M473 596H625L515 662Z" fill={shade} fillOpacity=".55" />
    </svg>
  );
}
