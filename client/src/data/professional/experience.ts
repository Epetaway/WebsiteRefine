export type ProfessionalExperience = {
  id: string;
  employer: string;
  role: string;
  start: string;
  end: string;
  dates: string;
  area: string;
  summary: string;
  responsibilities: readonly string[];
  factStatus: "verified";
};

export const experience: readonly ProfessionalExperience[] = [
  {
    id: "ama-fight-club",
    employer: "AMA Fight Club",
    role: "Front-End Developer & Digital Integration Specialist",
    start: "January 2025",
    end: "2025",
    dates: "Jan 2025 — 2025",
    area: "Fitness / Operations",
    summary:
      "Responsive web experience and digital integrations supporting prospective members, operations, and recruiting.",
    responsibilities: [
      "Redesigned the responsive website and improved its mobile experience.",
      "Integrated Zen Planner lead-capture and CRM workflows, recruiting forms, and QR campaigns.",
      "Evaluated platforms and digital tools supporting operations and marketing.",
    ],
    factStatus: "verified",
  },
  {
    id: "asembia",
    employer: "Asembia",
    role: "Front-End Developer",
    start: "December 2023",
    end: "October 2024",
    dates: "Dec 2023 — Oct 2024",
    area: "Healthcare / Enterprise",
    summary:
      "Reusable component architecture, accessibility practices, and information design across healthcare platforms.",
    responsibilities: [
      "Developed reusable component and design-system patterns across healthcare platforms.",
      "Migrated Bootstrap 3 interfaces to Bootstrap 5 and improved prescriber-portal information layouts.",
      "Integrated REST APIs in a .NET environment and applied accessibility practices to regulated workflows.",
      "Presented component architecture and product value to executive leadership.",
    ],
    factStatus: "verified",
  },
  {
    id: "broadcastmed",
    employer: "BroadcastMed",
    role: "Lead Designer & Front-End Developer",
    start: "November 2021",
    end: "March 2023",
    dates: "Nov 2021 — Mar 2023",
    area: "Healthcare / Media",
    summary:
      "Design and frontend delivery for healthcare marketing experiences within a proprietary CMS.",
    responsibilities: [
      "Designed and developed healthcare microsites and responsive landing experiences.",
      "Created a standardized HTML email system and used Analytics and Hotjar findings to guide UX work.",
      "Mentored teammates and strengthened code-review and QA practices.",
    ],
    factStatus: "verified",
  },
  {
    id: "merck",
    employer: "Merck",
    role: "Freelance Front-End Developer",
    start: "2019",
    end: "2019",
    dates: "2019",
    area: "Healthcare / Communications",
    summary:
      "Frontend development supporting digital marketing and communications initiatives.",
    responsibilities: [],
    factStatus: "verified",
  },
  {
    id: "verizon-wireless",
    employer: "Verizon Wireless",
    role: "Front-End Developer",
    start: "2015",
    end: "2016",
    dates: "2015 — 2016",
    area: "Telecommunications",
    summary: "Consumer-facing digital interfaces and internal tools.",
    responsibilities: [],
    factStatus: "verified",
  },
] as const;
