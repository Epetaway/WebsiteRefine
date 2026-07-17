import { professionalProfile } from "@/data/professionalProfile";

export default function Footer() {
  const { links } = professionalProfile;
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Earl Hickson Jr. All rights reserved.</span>
      <span className="site-footer__system">Human capability editorial system</span>
      <span className="site-footer__links"><a href={links.github} target="_blank" rel="noreferrer">GitHub</a><a href={`mailto:${links.email}`}>{links.email}</a></span>
    </footer>
  );
}
