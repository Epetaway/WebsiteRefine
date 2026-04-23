import { ReactNode } from "react";
import { DarkCaseStudyTheme } from "./types";

type PremiumCaseStudyLayoutProps = {
  children: ReactNode;
  theme: DarkCaseStudyTheme;
};

export function PremiumCaseStudyLayout({ children, theme }: PremiumCaseStudyLayoutProps) {
  return (
    <div
      className="min-h-screen"
      style={
        {
          backgroundColor: theme.bg ?? "#0D0D0D",
          color: theme.textPrimary ?? "#F5F5F5",
          "--case-accent": theme.accent,
          "--case-glow": theme.glow,
          "--case-badge": theme.badge,
          "--cs-bg": theme.bg ?? "#0D0D0D",
          "--cs-surface": theme.surface ?? "#111111",
          "--cs-surface-2": theme.surface2 ?? "#1A1A1A",
          "--cs-text-primary": theme.textPrimary ?? "#F5F5F5",
          "--cs-text-secondary": theme.textSecondary ?? "#B7B7B7",
          "--cs-text-muted": theme.textMuted ?? "#7A7A7A",
          "--cs-border": theme.border ?? "#20252A",
          "--cs-border-strong": theme.borderStrong ?? "#363C42",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
