export type ProfessionalExperience = {
  company: string;
  role: string;
  dates: string;
  area: string;
  summary: string;
  bullets: string[];
};

export const professionalExperience: ProfessionalExperience[] = [
  {
    company: "AMA Fight Club",
    role: "Front-End Developer & Digital Integration Specialist",
    dates: "Jan 2025 - 2025",
    area: "Fitness / Operations",
    summary:
      "Responsive web experience and digital integrations supporting prospective members, operations, and recruiting.",
    bullets: [
      "Redesigned the responsive website and improved mobile UX.",
      "Integrated Zen Planner lead capture and CRM workflows, recruiting forms, and QR campaigns.",
      "Evaluated platforms and digital tools supporting operations and marketing.",
    ],
  },
  {
    company: "Asembia",
    role: "Front-End Developer",
    dates: "Dec 2023 - Oct 2024",
    area: "Healthcare / Enterprise",
    summary:
      "Reusable component architecture, accessibility practices, and information design across healthcare platforms.",
    bullets: [
      "Developed reusable component and design-system patterns across healthcare platforms.",
      "Migrated Bootstrap 3 interfaces to Bootstrap 5 and improved prescriber-portal information layouts.",
      "Integrated REST APIs in a .NET environment and advanced WCAG 2.1 AA-aligned practices.",
    ],
  },
  {
    company: "BroadcastMed",
    role: "Lead Designer & Front-End Developer",
    dates: "Nov 2021 - Mar 2023",
    area: "Healthcare / Media",
    summary:
      "Design and frontend delivery for healthcare marketing experiences within a proprietary CMS.",
    bullets: [
      "Designed and developed healthcare microsites and landing experiences.",
      "Created a standardized HTML email system and used analytics findings to guide UX work.",
      "Mentored teammates and strengthened code-review and QA practices.",
    ],
  },
  {
    company: "Merck",
    role: "Freelance Front-End Developer",
    dates: "2019",
    area: "Healthcare / Communications",
    summary:
      "Frontend development supporting digital marketing and communications initiatives.",
    bullets: [],
  },
  {
    company: "Verizon Wireless",
    role: "Front-End Developer",
    dates: "2015 - 2016",
    area: "Telecommunications",
    summary: "Consumer-facing digital interfaces and internal tools.",
    bullets: [],
  },
  {
    company: "KBS&P",
    role: "Digital Designer & Front-End Developer",
    dates: "2014 - 2015",
    area: "Advertising / Enterprise",
    summary:
      "Digital design and frontend development for enterprise clients at a New York advertising agency.",
    bullets: [],
  },
];
