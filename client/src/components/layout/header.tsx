import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import profileImage from "@/images/me.png";
import { RESUME_PATH } from "@/data/projects";

const nav = [
  { to: "/projects", label: "Work" },
  { to: "/approach", label: "Approach" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 ui-transition-soft border-b backdrop-blur-xl ${
        scrolled
          ? "bg-[#0D0D0D]/90 shadow-sm border-[#20252A]"
          : "bg-[#0D0D0D]/70 border-transparent"
      }`}
      style={{ height: '72px' }}
    >
      <div className="mx-auto max-w-[1120px] h-full px-5">
        <div className="flex items-center justify-between h-full">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-full overflow-hidden ring-1 ring-[#363C42] group-hover:ring-violet-500/50 transition-all">
              <img
                src={profileImage}
                alt="Earl Hickson Jr."
                className="absolute inset-0 w-full h-full object-cover"
                style={{ maskImage: "linear-gradient(rgb(0,0,0) 60%, rgba(0,0,0,0) 100%)" }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium text-white -tracking-[0.04em] leading-tight">
                Earl Hickson Jr.
              </span>
              <p className="text-xs text-slate-400 -tracking-[0.02em] leading-[16px]">
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
                    isActive ? "text-white" : "text-[#7A7A7A] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-violet-500 transition-all duration-200 ${isActive ? "w-4" : "w-0 group-hover:w-3 group-hover:opacity-40"}`} />
                  </>
                )}
              </NavLink>
            ))}
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-4 py-1.5 text-sm font-medium -tracking-[0.03em] transition-colors text-[#7A7A7A] hover:text-white"
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
            className="md:hidden inline-flex items-center justify-center rounded-md px-3 py-2 text-sm bg-[#1A1A1A] text-[#B7B7B7] hover:bg-[#363C42] transition-colors"
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
          className="md:hidden bg-[#0D0D0D]/98 backdrop-blur-lg shadow-sm border-t border-[#20252A]"
        >
          <div className="mx-auto max-w-[1120px] px-5 py-3 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-[#B7B7B7] hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors"
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
              className="px-3 py-2.5 text-sm font-medium text-[#B7B7B7] hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors"
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
