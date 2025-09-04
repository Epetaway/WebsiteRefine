import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-extrabold tracking-tight text-lg mb-2 text-white">
            Earl Hickson Jr<span className="text-gray-500">.</span>
          </div>
          <p className="text-sm">
            Senior Front-End / UI Engineer — Parsippany, New Jersey
          </p>
        </div>

        <nav className="grid gap-2 text-sm">
          <Link to="/case-studies" className="hover:text-white transition-colors">
            Case Studies
          </Link>
          <Link to="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link to="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <Link to="/earldkaiju" className="hover:text-white transition-colors">
            BJJ Lessons
          </Link>
        </nav>

        <div className="text-sm">
          <a
            href="mailto:e@ehicksonjr.com"
            className="hover:text-white transition-colors"
          >
            e@ehicksonjr.com
          </a>
          <div className="mt-3 flex gap-4">
            <a
              href="https://github.com/Epetaway"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/earlhicksonjr"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 py-6 text-center text-xs text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} Earl Hickson Jr.
      </div>
    </footer>
  );
}
