import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { DesignDocCaseStudyTemplate } from "@/components/case-study/DesignDocCaseStudyTemplate";
import { useTheme } from "@/contexts/ThemeContext";
import { dojonetDesignDocData } from "./data";

export default function DojoNetCaseStudy() {
  const { setPageChrome } = useTheme();

  useEffect(() => {
    setPageChrome("light");
    return () => setPageChrome("dark");
  }, [setPageChrome]);

  return (
    <>
      <Helmet>
        <title>DojoNet Case Study | Earl Hickson Jr.</title>
        <meta
          name="description"
          content="Case study for DojoNet: a local-first martial arts social platform with event discovery, training journals, partner matchmaking, and MySpace-style profile customization. Built with React, Vite, Tailwind CSS, Zustand, and Framer Motion."
        />
      </Helmet>
      <DesignDocCaseStudyTemplate data={dojonetDesignDocData} />
    </>
  );
}
