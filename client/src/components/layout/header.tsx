import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigation } from "@/data/navigation";
import { professionalProfile } from "@/data/professionalProfile";

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Header() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
    focusables?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-identity" aria-label="Earl Hickson Jr., home">
          <span className="site-identity__name">{professionalProfile.name}</span>
          <span className="site-identity__title">{professionalProfile.title}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `site-nav__link${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          ref={triggerRef}
          type="button"
          className="site-menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Site navigation">
          <button
            className="mobile-nav__backdrop"
            type="button"
            aria-label="Close navigation"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
          />
          <div ref={panelRef} className="mobile-nav__panel" id="mobile-navigation">
            <div className="mobile-nav__header">
              <span className="eyebrow">Navigate</span>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                Close
              </button>
            </div>
            <nav aria-label="Mobile navigation" className="mobile-nav__links">
              {navigation.map((item, index) => (
                <NavLink key={item.to} to={item.to} className="mobile-nav__link">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <p className="mobile-nav__availability">{professionalProfile.availability}</p>
          </div>
        </div>
      )}
    </header>
  );
}
