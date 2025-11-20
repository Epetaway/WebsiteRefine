import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
];

const KAIJU_GREEN = "var(--kaiju-green, #86d64a)";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (path: string) =>
    location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  const linkBase =
    "relative inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500";

  const activeDefault = "text-gray-900";
  const idle = "text-gray-600 hover:text-gray-900";

  const isKaijuPage = location.pathname.startsWith("/earldkaiju");

  const desktopLinkProps = (path: string, rrActive: boolean) => {
    const active = rrActive || isActivePath(path);
    if (path === "/earldkaiju" && active) {
      return { 
        className: `${linkBase} text-black/90`, 
        style: { color: KAIJU_GREEN } as Record<string, string> 
      };
    }
    return { className: `${linkBase} ${active ? activeDefault : idle}` };
  };

  const mobileLinkProps = (path: string) => {
    const active = isActivePath(path);
    if (path === "/earldkaiju" && active) {
      return { 
        className: "rounded-xl px-4 py-3 text-base font-semibold bg-black/5", 
        style: { color: KAIJU_GREEN } 
      };
    }
    return {
      className: `rounded-xl px-4 py-3 text-base font-semibold transition-colors ${active ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-100"}`,
    };
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-display font-bold tracking-tight text-xl md:text-2xl bg-gradient-to-r from-dominant to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          Earl Hickson Jr<span className="text-gray-400">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => {
                const active = isActive || isActivePath(item.to);
                return `${desktopLinkProps(item.to, isActive).className}`;
              }}
              style={({ isActive }) => desktopLinkProps(item.to, isActive).style}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {(isActive || isActivePath(item.to)) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-dominant rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`mailto:e@ehicksonjr.com?subject=${encodeURIComponent(isKaijuPage ? "BJJ Lesson Inquiry" : "Engineering Opportunity")}`}
            className="ml-3 inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
            style={{ backgroundColor: isKaijuPage ? KAIJU_GREEN : "var(--color-dominant)" }}
          >
            Contact
          </motion.a>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle Navigation"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200"
          >
            <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-2">
              {nav.map((item) => {
                const p = mobileLinkProps(item.to);
                return (
                  <Link 
                    key={item.to} 
                    to={item.to} 
                    onClick={() => setOpen(false)} 
                    className={p.className} 
                    style={p.style}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={`mailto:e@ehicksonjr.com?subject=${encodeURIComponent(isKaijuPage ? "BJJ Lesson Inquiry" : "Engineering Opportunity")}`}
                className="rounded-xl px-4 py-3 text-base font-semibold text-white text-center"
                style={{ backgroundColor: isKaijuPage ? KAIJU_GREEN : "var(--color-dominant)" }}
                onClick={() => setOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
