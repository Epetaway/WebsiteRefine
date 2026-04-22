import { ReactNode } from "react";
import { CaseStudyTheme } from "./types";

type CaseStudyLayoutProps = {
  children: ReactNode;
  theme: CaseStudyTheme;
};

export default function CaseStudyLayout({ children, theme }: CaseStudyLayoutProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{ background: theme.gradients.backdrop }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
