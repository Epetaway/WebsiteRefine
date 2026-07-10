import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { DesignDocCaseStudyTemplate } from "@/components/case-study/DesignDocCaseStudyTemplate";
import { useTheme } from "@/contexts/ThemeContext";
import { withYouDesignDocData } from "./data";

export default function WithYouCaseStudy() {
  const { setPageChrome } = useTheme();

  useEffect(() => {
    setPageChrome("light");
    return () => setPageChrome("dark");
  }, [setPageChrome]);

  return (
    <>
      <Helmet>
        <title>WithYou Case Study | Earl Hickson Jr.</title>
        <meta
          name="description"
          content="Case study for WithYou: a privacy-first couples app with consent-based pairing, mood check-ins, and activity planning. Built with Expo React Native, Express, Prisma, and PostgreSQL."
        />
      </Helmet>
      <DesignDocCaseStudyTemplate data={withYouDesignDocData} />
    </>
  );
}
