import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
];

const KAIJU_GREEN = "var(--kaiju-green, #86d64a)";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) =>
    location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  const linkBase =
    "inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500";

  const activeDefault = "text-gray-900 bg-gray-100";
  const idle = "text-gray-700 hover:text-gray-900 hover:bg-gray-100";

  const isKaijuPage = location.pathname.startsWith("/earldkaiju");

  const desktopLinkProps = (path: string, rrActive: boolean) => {
    const active = rrActive || isActivePath(path);
    if (path === "/earldkaiju" && active) {
      return { className: `${linkBase} text-black/90`, style: { color: KAIJU_GREEN } as Record<string, string> };
    }
    return { className: `${linkBase} ${active ? activeDefault : idle}` };
  };

  const mobileLinkProps = (path: string) => {
    const active = isActivePath(path);
    if (path === "/earldkaiju" && active) {
      return { className: "rounded-lg px-3 py-2 text-sm font-semibold bg-black/5", style: { color: KAIJU_GREEN } };
    }
    return {
      className: `rounded-lg px-3 py-2 text-sm font-semibold ${active ? "bg-gray-100 text-gray-900" : "text-gray-800 hover:bg-gray-100"}`,
    };
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-extrabold tracking-tight gradient-text text-lg">
          Earl Hickson Jr<span className="text-gray-400">.</span>
        </Link>

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
            href={`mailto:e@ehicksonjr.com?subject=${encodeURIComponent(isKaijuPage ? "BJJ Lesson Inquiry" : "Engineering Opportunity")}`}
            className="ml-2 inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold text-black transition-colors hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
            style={{ backgroundColor: isKaijuPage ? KAIJU_GREEN : "var(--primary, #6366f1)" }}
          >
            Contact
          </a>
        </nav>

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

      {open && (
        <div id="mobile-nav" className="md:hidden bg-white shadow-sm">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            {nav.map((item) => {
              const p = mobileLinkProps(item.to);
              return (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={p.className} style={p.style}>
                  {item.label}
                </Link>
              );
            })}
            <a
              href={`mailto:e@ehicksonjr.com?subject=${encodeURIComponent(isKaijuPage ? "BJJ Lesson Inquiry" : "Engineering Opportunity")}`}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-black"
              style={{ backgroundColor: isKaijuPage ? KAIJU_GREEN : "var(--primary, #6366f1)" }}
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
