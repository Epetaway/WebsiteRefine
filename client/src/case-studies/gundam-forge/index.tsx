import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { DesignDocCaseStudyTemplate } from "@/components/case-study/DesignDocCaseStudyTemplate";
import { useTheme } from "@/contexts/ThemeContext";
import { gundamForgeDesignDocData } from "./data";

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
      <DesignDocCaseStudyTemplate data={gundamForgeDesignDocData} />
    </>
  );
}
