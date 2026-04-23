import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { pageChrome } = useTheme();
  const isLight = pageChrome === "light";

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: isLight ? "#F2F4F8" : "#0D0D0D",
        borderColor: isLight ? "#E5E7EB" : "#20252A",
      }}
    >
      <div className="mx-auto max-w-[1120px] px-5 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div
            className="font-bold tracking-tight text-base mb-2"
            style={{ color: isLight ? "#111827" : "#FFFFFF" }}
          >
            Earl Hickson Jr.
          </div>
          <p className="text-sm mb-1" style={{ color: isLight ? "#6B7280" : "#7A7A7A" }}>
            Frontend Engineer & Product Thinker
          </p>
          <p className="text-sm" style={{ color: isLight ? "#6B7280" : "#7A7A7A" }}>
            React · TypeScript · Accessible UI
          </p>
        </div>

        <nav className="grid gap-2 text-sm">
          {[
            { to: "/projects", label: "Work" },
            { to: "/approach", label: "Approach" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="transition-colors"
              style={{ color: isLight ? "#6B7280" : "#7A7A7A" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = isLight ? "#111827" : "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = isLight ? "#6B7280" : "#7A7A7A")}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="text-sm">
          <a
            href="mailto:e@ehicksonjr.com"
            className="transition-colors"
            style={{ color: isLight ? "#6B7280" : "#7A7A7A" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = isLight ? "#111827" : "#FFFFFF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = isLight ? "#6B7280" : "#7A7A7A")}
          >
            e@ehicksonjr.com
          </a>
          <div className="mt-3 flex flex-wrap gap-4">
            {[
              { href: "https://github.com/Epetaway", label: "GitHub" },
              { href: "https://www.linkedin.com/in/earlhicksonjr", label: "LinkedIn" },
              { href: "https://twitter.com/epetaway", label: "X" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors"
                style={{ color: isLight ? "#6B7280" : "#7A7A7A" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = isLight ? "#111827" : "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isLight ? "#6B7280" : "#7A7A7A")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="border-t py-6 text-center text-xs"
        style={{
          borderColor: isLight ? "#E5E7EB" : "#20252A",
          color: isLight ? "#9CA3AF" : "#5A5A5A",
        }}
      >
        © 2026 Earl Hickson Jr.
      </div>
    </footer>
  );
}
