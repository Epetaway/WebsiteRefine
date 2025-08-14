import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-extrabold tracking-tight text-lg mb-2">Earl Hickson Jr<span className="text-gray-400">.</span></div>
          <p className="text-sm text-gray-600">Senior Front‑End Engineer — Parsippany, New Jersey</p>
        </div>

        <nav className="grid gap-2 text-sm">
          <Link to="/case-studies" className="text-gray-700 hover:text-gray-900">Case Studies</Link>
          <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          <Link to="/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
          <Link to="/earldkaiju" className="text-gray-700 hover:text-gray-900">BJJ Lessons</Link>
        </nav>

        <div className="text-sm">
          <a href="mailto:e@ehicksonjr.com" className="text-gray-700 hover:text-gray-900">e@ehicksonjr.com</a>
          <div className="mt-2 flex gap-3">
            <a href="https://github.com/EHickson-Jr" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900">GitHub</a>
            <a href="https://www.linkedin.com/in/earlhicksonjr" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} Earl Hickson Jr.</div>
    </footer>
  );
}
