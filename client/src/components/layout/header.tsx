import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <>
      {/* Top Banner */}
      <div className="w-full bg-primary text-white py-2 px-4 text-center">
        <p className="text-sm">
          Available for Senior Front-End roles & select freelance projects.
        </p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border-subtle">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <span className="font-semibold text-base text-textPrimary">
              Earl Hickson Jr.
            </span>
            <span className="text-xs text-textSecondary">
              Front-End Developer · React · Angular · TypeScript
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive || isActivePath(item.to)
                      ? "text-primary"
                      : "text-textSecondary hover:text-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center rounded-pill px-4 py-2 text-sm font-medium border border-primary text-primary hover:bg-primary/10 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="https://framer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-pill px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors shadow-md"
            >
              Get Template
            </a>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm bg-black/5"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle Navigation"
          >
            <span className="block w-5 h-0.5 bg-current mb-1"></span>
            <span className="block w-5 h-0.5 bg-current"></span>
          </button>
        </div>

        {open && (
          <div
            id="mobile-nav"
            className="md:hidden bg-white shadow-sm border-t border-border-subtle"
          >
            <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    isActivePath(item.to)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="#contact"
                className="rounded-lg px-3 py-2 text-sm font-semibold border border-primary text-primary"
                onClick={() => setOpen(false)}
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
