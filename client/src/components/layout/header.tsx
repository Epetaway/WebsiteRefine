import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/earldkaiju", label: "BJJ Lessons" },
];

const KAIJU_GREEN = "var(--kaiju-green, #86d64a)";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) =>
    location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  const linkBase =
    "inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dominant";

  const activeDefault = "text-textPrimary bg-muted";
  const idle = "text-textSecondary hover:text-textPrimary hover:bg-muted";

  const isKaijuPage = location.pathname.startsWith("/earldkaiju");

  const desktopLinkProps = (path: string, rrActive: boolean) => {
    const active = rrActive || isActivePath(path);
    if (path === "/earldkaiju" && active) {
      return { className: `${linkBase}`, style: { color: KAIJU_GREEN } as Record<string, string> };
    }
    return { className: `${linkBase} ${active ? activeDefault : idle}` };
  };

  const mobileLinkProps = (path: string) => {
    const active = isActivePath(path);
    if (path === "/earldkaiju" && active) {
      return { className: "rounded-lg px-3 py-2 text-sm font-semibold bg-muted", style: { color: KAIJU_GREEN } };
    }
    return {
      className: `rounded-lg px-3 py-2 text-sm font-semibold ${active ? "bg-muted text-textPrimary" : "text-textSecondary hover:bg-muted"}`,
    };
  };

  return (
    <header className="sticky top-0 z-40 bg-base/80 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div>
          <Link to="/" className="font-extrabold tracking-tight text-lg text-textPrimary">
            Earl Hickson Jr<span className="text-textSecondary">.</span>
          </Link>
          <div className="text-xs text-textSecondary">Senior Front-End Engineer • BJJ Black Belt</div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => desktopLinkProps(item.to, isActive).className}
              style={({ isActive }) => desktopLinkProps(item.to, isActive).style}
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="/assets/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold text-white bg-dominant hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dominant"
          >
            Download Resume
          </a>
          <a
            href={`mailto:e@ehicksonjr.com?subject=${encodeURIComponent(isKaijuPage ? "BJJ Lesson Inquiry" : "Engineering Opportunity")}`}
            className="ml-2 inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: isKaijuPage ? KAIJU_GREEN : "var(--color-accent, #B02244)" }}
          >
            Hire Me
          </a>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm bg-muted"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle Navigation"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden bg-base border-b border-border">
          <div className="mx-auto max-w-content px-4 py-3 flex flex-col gap-2">
            {nav.map((item) => {
              const p = mobileLinkProps(item.to);
              return (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={p.className} style={p.style}>
                  {item.label}
                </Link>
              );
            })}
            <a
              href="/assets/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-white bg-dominant"
              onClick={() => setOpen(false)}
            >
              Download Resume
            </a>
            <a
              href={`mailto:e@ehicksonjr.com?subject=${encodeURIComponent(isKaijuPage ? "BJJ Lesson Inquiry" : "Engineering Opportunity")}`}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: isKaijuPage ? KAIJU_GREEN : "var(--color-accent, #B02244)" }}
              onClick={() => setOpen(false)}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
