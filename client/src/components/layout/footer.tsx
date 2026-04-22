import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="mx-auto max-w-[1120px] px-5 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-bold tracking-tight text-base mb-2 text-white">
            Earl Hickson Jr.
          </div>
          <p className="text-sm text-slate-400 mb-1">Frontend Engineer & Product Thinker</p>
          <p className="text-sm text-slate-500">React · TypeScript · Accessible UI</p>
        </div>

        <nav className="grid gap-2 text-sm">
          <Link to="/projects" className="text-slate-400 hover:text-white transition-colors">Work</Link>
          <Link to="/approach" className="text-slate-400 hover:text-white transition-colors">Approach</Link>
          <Link to="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
        </nav>

        <div className="text-sm">
          <a
            href="mailto:e@ehicksonjr.com"
            className="text-slate-400 hover:text-white transition-colors"
          >
            e@ehicksonjr.com
          </a>
          <div className="mt-3 flex flex-wrap gap-4">
            <a href="https://github.com/Epetaway" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/earlhicksonjr" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="https://twitter.com/epetaway" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">X</a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-600">
        © 2026 Earl Hickson Jr.
      </div>
    </footer>
  );
}
