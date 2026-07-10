import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { DesignDocCaseStudyTemplate } from "@/components/case-study/DesignDocCaseStudyTemplate";
import { useTheme } from "@/contexts/ThemeContext";
import { trainerLaunchDesignDocData } from "./data";

export default function TrainerLaunchCaseStudy() {
  const { setPageChrome } = useTheme();

  useEffect(() => {
    setPageChrome("light");
    return () => setPageChrome("dark");
  }, [setPageChrome]);

  return (
    <>
      <Helmet>
        <title>TrainerLaunch Case Study | Earl Hickson Jr.</title>
        <meta
          name="description"
          content="Case study for TrainerLaunch: a mobile-first SaaS platform helping independent personal trainers launch a branded marketing site, capture leads, and manage their business from a self-serve dashboard."
        />
      </Helmet>
      <DesignDocCaseStudyTemplate data={trainerLaunchDesignDocData} />
    </>
  );
}
