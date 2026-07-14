import { Link } from "react-router-dom";
import { navigation } from "@/data/navigation";
import { professionalProfile } from "@/data/professionalProfile";

export default function Footer() {
  const { links } = professionalProfile;
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="eyebrow eyebrow--light">Earl Hickson Jr. / UX Engineer</p>
          <p className="site-footer__thesis">Technology should leave people more capable.</p>
        </div>
        <nav aria-label="Footer navigation" className="site-footer__nav">
          {navigation.map((item) => (
            <Link key={item.to} to={item.to}>{item.label}</Link>
          ))}
        </nav>
        <div className="site-footer__contact">
          <a href={`mailto:${links.email}`}>{links.email}</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <div className="site-footer__base">
        <span>© {new Date().getFullYear()} Earl Hickson Jr.</span>
        <span>Built on an evolving system for documenting design, engineering, and inquiry.</span>
      </div>
    </footer>
  );
}
