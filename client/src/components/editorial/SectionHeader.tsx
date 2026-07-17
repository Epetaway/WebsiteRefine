type Props = {
  number?: string;
  label: string;
  title?: string;
  light?: boolean;
};

export function SectionHeader({ number, label, title, light = false }: Props) {
  return (
    <header className={`section-header${light ? " section-header--light" : ""}${number ? "" : " section-header--unnumbered"}`}>
      <div className="section-header__meta">{number && <span>{number}</span>}<span>{label}</span></div>
      {title && <h2>{title}</h2>}
    </header>
  );
}
