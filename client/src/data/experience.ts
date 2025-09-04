export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description?: string;
  logo?: string;
  technologies?: string[];
}

export const workExperience: WorkExperience[] = [
  {
    id: "ama-fight-club",
    company: "AMA Fight Club",
    position: "Front-End Consultant",
    duration: "Jan 2025 – Present",
    description:
      "Rebuilt marketing site in Bootstrap 5.3 + SCSS, improving page speed by 55% and Lighthouse mobile score 63 → 97. Integrated Zen Planner API, driving a 37% lift in free-trial sign-ups.",
    technologies: ["Bootstrap", "SCSS", "API Integration", "Performance Optimization"]
  },
  {
    id: "freelance-current",
    company: "Self-Employed",
    position: "Freelance Front-End Developer",
    duration: "Mar 2018 – Present",
    description:
      "Delivered 20+ responsive web apps/sites. Increased client conversion rates by 28% through UX refinements, accessibility fixes, and mobile-first layouts.",
    technologies: ["React", "TypeScript", "JavaScript", "Node.js", "MongoDB"]
  },
  {
    id: "asembia",
    company: "Asembia",
    position: "Front-End Developer (Contract)",
    duration: "Dec 2023 – Oct 2024",
    description:
      "Built modular Razor view components with SCSS + Bootstrap 5 in a .NET stack. Shipped monthly RAG dashboard that improved provider performance tracking by 30%.",
    technologies: ["Razor", "SCSS", "Bootstrap", ".NET", "Data Visualization"]
  },
  {
    id: "renewal-andersen",
    company: "Renewal by Andersen (Affiliated Facility)",
    position: "Warehouse Manager",
    duration: "Mar 2020 – Mar 2021",
    description:
      "Led 10+ staff and coordinated 25+ daily deliveries; reduced dispatch errors by 35% via process standardization and better handoffs.",
    technologies: ["Process Management", "Team Leadership", "Logistics Coordination"]
  },
  {
    id: "prosek",
    company: "Prosek Partners",
    position: "Freelance Front-End Web Engineer",
    duration: "2019 – 2020",
    description:
      "Developed and maintained finance-sector sites with reusable components and performance-minded theming.",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS"]
  },
  {
    id: "seide",
    company: "William R. Seide Agency",
    position: "Frontend Engineer",
    duration: "2018 – 2019",
    description:
      "Shipped insurance landing pages and quote flows; tightened CLS and improved form completion rates.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery"]
  },
  {
    id: "merkle",
    company: "Merkle",
    position: "Email Marketing Specialist",
    duration: "2017 – 2018",
    description:
      "Built responsive, accessible email templates and automated campaigns for enterprise brands.",
    technologies: ["HTML", "CSS", "Email Templates", "Marketing Automation"]
  },
  {
    id: "merck",
    company: "Merck",
    position: "Freelance Web Engineer",
    duration: "2016 – 2017",
    description:
      "Implemented content updates and front-end features within a regulated CMS environment.",
    technologies: ["HTML", "CSS", "JavaScript", "CMS"]
  },
  {
    id: "novocent",
    company: "Novocent",
    position: "Frontend Web Engineer",
    duration: "2015 – 2016",
    description:
      "Developed patient-facing UIs with a focus on responsive layouts and clear information hierarchy.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"]
  },
  {
    id: "verizon",
    company: "Verizon Wireless",
    position: "Front-End Engineer",
    duration: "2014 – 2015",
    description:
      "Supported telecom web properties; optimized responsive components and improved accessibility.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"]
  },
  {
    id: "second-melody",
    company: "Second Melody",
    position: "Web Engineer",
    duration: "2013 – 2014",
    description:
      "Built music-industry ecommerce and promo pages; standardized component styles for faster iteration.",
    technologies: ["HTML", "CSS", "JavaScript", "E-commerce"]
  }
];
