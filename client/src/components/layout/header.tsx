import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import profileImage from "@/images/me.png";
import { RESUME_PATH } from "@/data/projects";
import { useTheme } from "@/contexts/ThemeContext";

const nav = [
  { to: "/projects", label: "Work" },
  { to: "/approach", label: "Approach" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pageChrome } = useTheme();
  const isLight = pageChrome === "light";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = isLight
    ? scrolled ? "rgba(247,247,251,0.95)" : "rgba(247,247,251,0.85)"
    : scrolled ? "rgba(13,13,13,0.90)" : "rgba(13,13,13,0.70)";

  const borderColor = isLight
    ? scrolled ? "#E5E7EB" : "transparent"
    : scrolled ? "#20252A" : "transparent";

  return (
    <header
      className="w-full sticky top-0 z-50 ui-transition-soft border-b backdrop-blur-xl"
      style={{
        height: "72px",
        backgroundColor: headerBg,
        borderColor,
        boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="mx-auto max-w-[1120px] h-full px-5">
        <div className="flex items-center justify-between h-full">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="relative h-10 w-10 rounded-full overflow-hidden transition-all"
              style={{ boxShadow: `0 0 0 1px ${isLight ? "#D1D5DB" : "#363C42"}` }}
            >
              <img
                src={profileImage}
                alt="Earl Hickson Jr."
                className="absolute inset-0 w-full h-full object-cover"
                style={{ maskImage: "linear-gradient(rgb(0,0,0) 60%, rgba(0,0,0,0) 100%)" }}
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-base font-medium -tracking-[0.04em] leading-tight"
                style={{ color: isLight ? "#111827" : "#FFFFFF" }}
              >
                Earl Hickson Jr.
              </span>
              <p
                className="text-xs -tracking-[0.02em] leading-[16px]"
                style={{ color: isLight ? "#6B7280" : "#94A3B8" }}
              >
                Frontend Engineer & Product Thinker
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 text-sm font-medium -tracking-[0.03em] transition-colors group ${
                    isActive
                      ? isLight ? "text-[#111827]" : "text-white"
                      : isLight ? "text-[#6B7280] hover:text-[#111827]" : "text-[#7A7A7A] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-violet-500 transition-all duration-200 ${
                        isActive ? "w-4" : "w-0 group-hover:w-3 group-hover:opacity-40"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-4 py-1.5 text-sm font-medium -tracking-[0.03em] transition-colors"
              style={{ color: isLight ? "#6B7280" : "#7A7A7A" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = isLight ? "#111827" : "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = isLight ? "#6B7280" : "#7A7A7A")}
            >
              Resume
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
            >
              Let's Connect
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md px-3 py-2 text-sm transition-colors"
            style={{
              backgroundColor: isLight ? "#F2F4F8" : "#1A1A1A",
              color: isLight ? "#374151" : "#B7B7B7",
            }}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle Navigation"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden backdrop-blur-lg shadow-sm border-t"
          style={{
            backgroundColor: isLight ? "rgba(247,247,251,0.98)" : "rgba(13,13,13,0.98)",
            borderColor: isLight ? "#E5E7EB" : "#20252A",
          }}
        >
          <div className="mx-auto max-w-[1120px] px-5 py-3 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium rounded-lg transition-colors"
                style={{ color: isLight ? "#374151" : "#B7B7B7" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              download
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-sm font-medium rounded-lg transition-colors"
              style={{ color: isLight ? "#374151" : "#B7B7B7" }}
            >
              Resume
            </a>
            <div className="pt-2 pb-1">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
              >
                Let's Connect
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
