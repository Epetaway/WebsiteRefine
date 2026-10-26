import { Link } from "react-router-dom";
import { navigation } from "@/data/navigation";
import { professionalLinks, profile } from "@/data/professional";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="eyebrow eyebrow--light">Earl Hickson Jr. / {profile.publicTitle}</p>
          <p className="site-footer__thesis">Design the experience. Build the behavior.</p>
          <p className="site-footer__availability"><span /> {profile.availability}</p>
        </div>
        <nav aria-label="Footer navigation" className="site-footer__nav">
          {navigation.map((item) => (
            <Link key={item.to} to={item.to}>{item.label}</Link>
          ))}
        </nav>
        <div className="site-footer__contact">
          <Link to="/research">Research direction</Link>
          <Link to="/graduate-review">Graduate review</Link>
          <a href={`mailto:${professionalLinks.email}`}>{professionalLinks.email}</a>
          <a href={professionalLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={professionalLinks.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <div className="site-footer__base">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed and built from interface to implementation.</span>
      </div>
    </footer>
  );
}
