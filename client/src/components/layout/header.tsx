import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { X } from "lucide-react";
import profileImage from "@/images/me.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
];

const titles = ["Front-End Engineer", "UI Designer", "Digital Creator", "Web Developer"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
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
    <header className={`w-full sticky top-0 z-50 ui-transition-soft ${
      scrolled 
        ? "bg-white/80 backdrop-blur-lg shadow-sm" 
        : "bg-gray-50"
    }`}>
      {/* Top Banner */}
      {bannerVisible && (
        <div className="relative flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-4 text-center">
          <p className="text-sm text-white">
            Now open to front-end roles and collaborations for 2025 (remote &amp; hybrid, NJ/NYC).
          </p>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-80 ui-transition-soft"
            aria-label="Close banner"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}

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
              <span className="text-base font-medium text-gray-900 -tracking-[0.04em] leading-tight">
                Earl Hickson Jr.
              </span>
              <div className="h-[18px] overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-out"
                  style={{ transform: `translateY(-${currentTitle * 18}px)` }}
                >
                  {titles.map((title, idx) => (
                    <p key={idx} className="text-sm text-gray-500 -tracking-[0.02em] leading-[18px]">
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
                    isActive ? "text-gray-900" : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/about"
              className="px-4 py-2 text-sm font-normal -tracking-[0.02em] text-gray-900 bg-gradient-to-b from-gray-200 to-gray-200 rounded-full shadow-[0_1px_0_0_rgba(99,106,126,0.6)] ui-transition-soft button-lift"
            >
              Get In Touch
            </Link>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-normal -tracking-[0.02em] text-white bg-gradient-to-b from-purple-400 to-purple-600 rounded-full shadow-[0_1px_0_0_rgba(99,106,126,0.6)] ui-transition-soft button-lift"
            >
              Get Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-full px-3 py-2 text-sm bg-gray-200 ui-transition-soft"
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
        <div id="mobile-nav" className="md:hidden bg-white/95 backdrop-blur-lg shadow-sm border-t border-gray-200">
          <div className="mx-auto max-w-[1040px] px-4 py-3 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 ui-transition-soft"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="rounded-full px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-200 ui-transition-soft"
            >
              Get In Touch
            </Link>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-3 py-2 text-sm font-semibold text-white bg-gradient-to-b from-purple-400 to-purple-600 ui-transition-soft"
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
