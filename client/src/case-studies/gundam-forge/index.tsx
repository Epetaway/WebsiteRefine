import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PremiumCaseStudyTemplate } from "@/components/case-study/PremiumCaseStudyTemplate";
import { useTheme } from "@/contexts/ThemeContext";
import { gundamForgePremiumData } from "./data";

export default function GundamForgeCaseStudy() {
  const { setPageChrome } = useTheme();

  useEffect(() => {
    setPageChrome("dark");
    return () => setPageChrome("dark");
  }, [setPageChrome]);

  return (
    <>
      <Helmet>
        <title>Gundam Forge Case Study | Earl Hickson Jr.</title>
        <meta
          name="description"
          content="Case study for Gundam Forge: a competitive TCG deck-building platform for the Gundam Card Game with live meta data, rules-accurate game engine, and 471+ card browser. Built with Next.js 14, TypeScript, and shipped as static export to GitHub Pages."
        />
      </Helmet>
      <PremiumCaseStudyTemplate data={gundamForgePremiumData} />
    </>
  );
}
