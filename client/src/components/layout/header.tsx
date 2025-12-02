import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import profileImage from "@/images/me.png";
import { useTheme } from "@/contexts/ThemeContext";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
];

const titles = ["Front-End Engineer", "UI Designer", "Digital Creator", "Web Developer"];

export default function Header() {
    const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Cycle through titles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll position for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 ui-transition-soft ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
          : "bg-gray-50 dark:bg-black"
      }`}
    >
      {/* Main Navbar */}
      <div className="mx-auto max-w-[1040px] px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo with Profile */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 shadow-[inset_0_20px_12px_12px_rgba(255,255,255,0.2),0_0_4px_0_rgba(229,225,253,1),inset_0_-4px_8px_0_rgba(229,225,253,1)] overflow-hidden">
              <img
                src={profileImage}
                alt="Earl Hickson Jr."
                className="absolute inset-0 w-full h-full object-cover"
                style={{ maskImage: "linear-gradient(rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0) 100%)" }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-900 dark:text-gray-100 -tracking-[0.04em] leading-tight">
                Earl Hickson Jr.
              </span>
              <div className="h-[18px] overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-out"
                  style={{ transform: `translateY(-${currentTitle * 18}px)` }}
                >
                  {titles.map((title, idx) => (
                    <p key={idx} className="text-sm text-gray-500 dark:text-gray-400 -tracking-[0.02em] leading-[18px]">
                      {title}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-1 text-sm font-medium -tracking-[0.04em] ui-transition-soft link-underline ${
                    isActive
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ui-transition-soft"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            <Link to="/about" className="btn-secondary">
              Get In Touch
            </Link>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md px-3 py-2 text-sm bg-gray-200 dark:bg-gray-800 ui-transition-soft"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle Navigation"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm border-t border-gray-200 dark:border-gray-800"
        >
          <div className="mx-auto max-w-[1040px] px-4 py-3 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ui-transition-soft"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleTheme();
                setOpen(false);
              }}
              className="rounded-full px-3 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ui-transition-soft flex items-center gap-2"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </>
              )}
            </button>
            <Link to="/about" onClick={() => setOpen(false)} className="btn-secondary">
              Get In Touch
            </Link>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              onClick={() => setOpen(false)}
            >
              Get Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
