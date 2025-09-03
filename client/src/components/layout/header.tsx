import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const nav = [
  { to: "/", label: "Home" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/earldkaiju", label: "BJJ Lessons" },
];

const KAIJU_GREEN = "var(--kaiju-green, #86d64a)"; // set this CSS var in :root for perfect brand match

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  const linkBase =
    "inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition-colors";

  // Default active/idle styles
  const activeDefault = "text-gray-900 bg-gray-100";
  const idle = "text-gray-700 hover:text-gray-900 hover:bg-gray-100";

  // Special active look for the Kaiju page
  const isKaiju = location.pathname.startsWith("/earldkaiju");

  // Compute desktop link classes + optional inline style for Kaiju green
  const desktopLinkClasses = (path: string, rrActive: boolean) => {
    const active = rrActive || isActive(path);
    // If THIS link is /earldkaiju and it is active → green text, no bg
    if (path === "/earldkaiju" && active) {
      return {
        className: `${linkBase} text-black/90`,
        style: { color: KAIJU_GREEN } as React.CSSProperties,
      };
    }
    // Otherwise standard active/idle
    return {
      className: `${linkBase} ${active ? activeDefault : idle}`,
      style: undefined,
    };
  };

  // Compute mobile link classes + style similarly
  const mobileLinkClasses = (path: string) => {
    const active = isActive(path);
    if (path === "/earldkaiju" && active) {
      return {
        className:
          "rounded-lg px-3 py-2 text-sm font-semibold bg-black/5",
        style: { color: KAIJU_GREEN } as React.CSSProperties,
      };
    }
    return {
      className: `rounded-lg px-3 py-2 text-sm font-semibold ${
        active ? "bg-gray-100 text-gray-900" : "text-gray-800 hover:bg-gray-100"
      }`,
      style: undefined,
    };
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-extrabold tracking-tight gradient-text text-lg">
          Earl Hickson Jr<span className="text-gray-400">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {nav.map((item) => {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive: rrActive }) =>
                  desktopLinkClasses(item.to, rrActive).className
                }
                style={({ isActive: rrActive }) =>
                  desktopLinkClasses(item.to, rrActive).style
                }
              >
                {item.label}
              </NavLink>
            );
          })}
          {/* Contact */}
          <a
            href={`mailto:e@ehicksonjr.com?subject=${encodeURIComponent(
              isKaiju ? "BJJ Lesson Inquiry" : "Engineering Opportunity"
            )}`}
            className="ml-2 inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold text-black"
            style={{
              backgroundColor: isKaiju ? KAIJU_GREEN : "var(--primary, #6366f1)",
              // Fallback hover via opacity tweak so we don’t need borders
              opacity: 1,
            }}
          >
            Contact
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm bg-black/5"
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
        <div id="mobile-nav" className="md:hidden bg-white shadow-sm">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            {nav.map((item) => {
              const cfg = mobileLinkClasses(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cfg.className}
                  style={cfg.style}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={`mailto:e@ehicksonjr.com?subject=${encodeURIComponent(
                isKaiju ? "BJJ Lesson Inquiry" : "Engineering Opportunity"
              )}`}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-black"
              style={{ backgroundColor: isKaiju ? KAIJU_GREEN : "var(--primary, #6366f1)" }}
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
