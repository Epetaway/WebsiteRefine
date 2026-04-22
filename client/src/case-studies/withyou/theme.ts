import { CaseStudyTheme } from "@/components/case-study";

export const withYouTheme: CaseStudyTheme = {
  name: "WithYou",
  colors: {
    background: "#f6efed",
    surface: "#fff7f5",
    panel: "#ffffff",
    primary: "#f16464",
    secondary: "#ffb08a",
    text: "#1a2233",
    muted: "#5b6270",
    border: "#e9d0cb",
  },
  gradients: {
    hero: "linear-gradient(140deg, rgba(255,113,113,0.55), rgba(255,194,164,0.45) 45%, rgba(248,241,232,0.2))",
    backdrop: "radial-gradient(1200px 600px at 10% -20%, rgba(255,113,113,0.2), transparent 55%), radial-gradient(1000px 500px at 100% 0%, rgba(255,193,154,0.25), transparent 50%)",
  },
};
