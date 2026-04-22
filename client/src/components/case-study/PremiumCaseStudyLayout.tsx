import { ReactNode } from "react";
import { DarkCaseStudyTheme } from "./types";

type PremiumCaseStudyLayoutProps = {
  children: ReactNode;
  theme: DarkCaseStudyTheme;
};

export function PremiumCaseStudyLayout({ children, theme }: PremiumCaseStudyLayoutProps) {
  return (
    <div
      className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]"
      style={
        {
          "--case-accent": theme.accent,
          "--case-glow": theme.glow,
          "--case-badge": theme.badge,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
