import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 pt-16">
      <div className="mx-auto max-w-[1120px] px-5 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-extrabold tracking-tight text-lg mb-2 text-gray-900 dark:text-white">
            Earl Hickson Jr<span className="text-gray-400 dark:text-gray-500">.</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            // Front-End · Healthcare · Systems
          </p>
          <p className="text-sm mt-1">
            Front-End Developer · React · TypeScript · Accessible UI Engineering
          </p>
        </div>

        <nav className="grid gap-2 text-sm">
          <Link to="/projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft">
            Projects
          </Link>
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft">
            About
          </Link>
          <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft">
            Blog
          </Link>
          <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft">
            Contact
          </Link>
        </nav>

        <div className="text-sm">
          <a
            href="mailto:e@ehicksonjr.com"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft"
          >
            e@ehicksonjr.com
          </a>
          <div className="mt-3 flex flex-wrap gap-4">
            <a
              href="https://instagram.com/earld.kaiju"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com/epetaway"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft"
              aria-label="X (Twitter)"
            >
              X
            </a>
            <a
              href="https://youtube.com/@earldkaiju"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft"
              aria-label="YouTube"
            >
              YouTube
            </a>
            <a
              href="https://github.com/Epetaway"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/earlhicksonjr"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://dribbble.com/earldkaiju"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft"
              aria-label="Dribbble"
            >
              Dribbble
            </a>
            <a
              href="https://behance.net/earldkaiju"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ui-transition-soft"
              aria-label="Behance"
            >
              Behance
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 py-6 text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800">
        © 2025 Earl Hickson Jr.
      </div>
    </footer>
  );
}
