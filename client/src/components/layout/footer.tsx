import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card text-textSecondary pt-16 border-t border-border">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-extrabold tracking-tight text-lg mb-2 text-textPrimary">
            Earl Hickson Jr<span className="text-textSecondary">.</span>
          </div>
          <p className="text-sm">
            Front-End Developer • React • Angular • TypeScript
          </p>
          <p className="text-sm mt-2">
            Parsippany, NJ
          </p>
        </div>

        <nav className="grid gap-2 text-sm">
          <Link to="/" className="hover:text-textPrimary transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-textPrimary transition-colors">
            About
          </Link>
          <Link to="/projects" className="hover:text-textPrimary transition-colors">
            Projects
          </Link>
          <Link to="/blog" className="hover:text-textPrimary transition-colors">
            Blog
          </Link>
        </nav>

        <div className="text-sm">
          <a
            href="mailto:e@ehicksonjr.com"
            className="hover:text-textPrimary transition-colors block mb-3"
          >
            e@ehicksonjr.com
          </a>
          <div className="flex gap-4">
            <a
              href="https://github.com/Epetaway"
              target="_blank"
              rel="noreferrer"
              className="hover:text-textPrimary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/earlhicksonjr"
              target="_blank"
              rel="noreferrer"
              className="hover:text-textPrimary transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 py-6 text-center text-xs border-t border-border">
        © 2025 Earl Hickson Jr.
      </div>
    </footer>
  );
}
