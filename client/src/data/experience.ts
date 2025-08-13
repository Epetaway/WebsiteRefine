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
    id: "freelance-current",
    company: "Self-Employed",
    position: "Freelance Front-End Developer",
    duration: "Mar 2018 – Present",
    description: "Delivered 20+ websites and applications for clients. Boosted conversion rates by 28% through UI/UX optimization and mobile-first design",
    technologies: ["React", "JavaScript", "Node.js", "MongoDB", "Bootstrap"]
  },
  {
    id: "ama-fight-club",
    company: "AMA Fight Club",
    position: "Front-End Consultant",
    duration: "Jan 2025 – Present",
    description: "Rebuilt site with Bootstrap 5.3 + SCSS, boosting page speed 55% and Lighthouse mobile score from 63 → 97. Integrated Zen Planner API, increasing free trial sign-ups by 37%",
    technologies: ["Bootstrap", "SCSS", "API Integration", "Performance Optimization"]
  },
  {
    id: "asembia",
    company: "Asembia",
    position: "Front-End Developer (Contract)",
    duration: "Dec 2023 – Oct 2024",
    description: "Built modular Razor view components with SCSS and Bootstrap 5 in .NET environment. Created monthly RAG dashboard, improving provider performance tracking by 30%",
    technologies: ["Razor", "SCSS", "Bootstrap", ".NET", "Dashboard Development"]
  },
  {
    id: "renewal-andersen",
    company: "Renewal by Andersen-Affiliated Facility",
    position: "Warehouse Manager",
    duration: "Mar 2020 – Mar 2021",
    description: "Supervised 10+ staff, coordinated 25+ daily deliveries. Reduced dispatch errors by 35% through process improvements",
    technologies: ["Process Management", "Team Leadership", "Logistics Coordination"]
  },
  {
    id: "prosek",
    company: "Prosek Partners",
    position: "Freelance Front-End Web Engineer",
    duration: "2019 - 2020",
    description: "Financial services website development and maintenance",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS"]
  },
  {
    id: "seide",
    company: "William R Seide Agency",
    position: "Frontend Engineer",
    duration: "2018 - 2019",
    description: "Insurance industry web development and digital marketing solutions",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery"]
  },
  {
    id: "merkle",
    company: "Merkle Inc",
    position: "Email Marketing Specialist",
    duration: "2017 - 2018",
    description: "Email campaign development and automation for major brands",
    technologies: ["HTML", "CSS", "Email Templates", "Marketing Automation"]
  },
  {
    id: "merck",
    company: "Merck",
    position: "Freelance Web Engineer",
    duration: "2016 - 2017",
    description: "Pharmaceutical industry web development projects",
    technologies: ["HTML", "CSS", "JavaScript", "CMS"]
  },
  {
    id: "novocent",
    company: "Novocent",
    position: "Frontend Web Engineer",
    duration: "2015 - 2016",
    description: "Healthcare technology frontend development",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"]
  },
  {
    id: "verizon",
    company: "Verizon Wireless",
    position: "Front-End Engineer",
    duration: "2014 - 2015",
    description: "Telecommunications industry web development",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"]
  },
  {
    id: "second-melody",
    company: "Second Melody",
    position: "Web Engineer",
    duration: "2013 - 2014",
    description: "Music industry web development and e-commerce solutions",
    technologies: ["HTML", "CSS", "JavaScript", "E-commerce"]
  }
];
