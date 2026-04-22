import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#20252A]">
      <div className="mx-auto max-w-[1120px] px-5 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-bold tracking-tight text-base mb-2 text-white">
            Earl Hickson Jr.
          </div>
          <p className="text-sm text-[#7A7A7A] mb-1">Frontend Engineer & Product Thinker</p>
          <p className="text-sm text-[#7A7A7A]">React · TypeScript · Accessible UI</p>
        </div>

        <nav className="grid gap-2 text-sm">
          <Link to="/projects" className="text-[#7A7A7A] hover:text-white transition-colors">Work</Link>
          <Link to="/approach" className="text-[#7A7A7A] hover:text-white transition-colors">Approach</Link>
          <Link to="/about" className="text-[#7A7A7A] hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="text-[#7A7A7A] hover:text-white transition-colors">Contact</Link>
        </nav>

        <div className="text-sm">
          <a
            href="mailto:e@ehicksonjr.com"
            className="text-[#7A7A7A] hover:text-white transition-colors"
          >
            e@ehicksonjr.com
          </a>
          <div className="mt-3 flex flex-wrap gap-4">
            <a href="https://github.com/Epetaway" target="_blank" rel="noreferrer" className="text-[#7A7A7A] hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/earlhicksonjr" target="_blank" rel="noreferrer" className="text-[#7A7A7A] hover:text-white transition-colors">LinkedIn</a>
            <a href="https://twitter.com/epetaway" target="_blank" rel="noreferrer" className="text-[#7A7A7A] hover:text-white transition-colors">X</a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#20252A] py-6 text-center text-xs text-[#5A5A5A]">
        © 2026 Earl Hickson Jr.
      </div>
    </footer>
  );
}
