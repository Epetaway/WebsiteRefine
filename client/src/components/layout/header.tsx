import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const nav = [
  { to: "/", label: "Home" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/earldkaiju", label: "BJJ Lessons" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  const linkBase =
    "inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition-colors";
  const active =
    "text-white bg-gray-900";
  const idle =
    "text-gray-700 hover:text-gray-900 hover:bg-gray-100";

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-extrabold tracking-tight gradient-text text-lg">
          Earl Hickson Jr<span className="text-gray-400">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive: rrActive }) =>
                [
                  linkBase,
                  rrActive || isActive(item.to) ? active : idle,
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
          {/* Contact (mail link can stay <a> since it’s external) */}
          <a
            href="mailto:e@ehicksonjr.com?subject=Engineering%20Opportunity"
            className="ml-2 inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold bg-primary-500 text-white hover:bg-primary-600"
          >
            Contact
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle Navigation"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-nav" className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={[
                  "rounded-lg px-3 py-2 text-sm font-semibold",
                  isActive(item.to) ? "bg-gray-900 text-white" : "text-gray-800 hover:bg-gray-100",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="mailto:e@ehicksonjr.com?subject=Engineering%20Opportunity"
              className="rounded-lg px-3 py-2 text-sm font-semibold bg-primary-500 text-white hover:bg-primary-600"
              onClick={() => setOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
