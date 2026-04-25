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
    position: "Front-End Developer & Digital Integration Specialist",
    duration: "Jan 2025 – Present",
    description:
      "Ongoing freelance engagement. Modernized the club's digital presence with responsive layouts, improved navigation, and an SEO-forward site structure built in Wix CMS. Implemented a Zen Planner API integration for real-time lead capture and CRM synchronization. Built ZipRecruiter form integrations for recruitment campaigns. Designed branded digital marketing assets including QR-linked flyers and social media templates. Advises leadership on scalable digital strategy.",
    technologies: ["Wix CMS", "Zen Planner API", "ZipRecruiter API", "JavaScript", "CSS", "SEO", "Digital Marketing"]
  },
  {
    id: "tabbys-place",
    company: "Tabby's Place: A Cat Sanctuary",
    position: "Frontend Developer",
    duration: "Oct 2025 (Contract)",
    description:
      "Short-term freelance contract. Designed and built a fully custom WordPress donation and campaign management plugin from scratch — including dynamic donation tracking, progress indicators, adoptable animal listings, and an admin interface requiring no technical knowledge to operate. Built responsive UI components using HTML, CSS, JavaScript, and PHP. Implemented accessibility standards throughout. Delivered the full system from design to deployment within a compressed timeline.",
    technologies: ["WordPress", "PHP", "JavaScript", "HTML", "CSS", "WCAG 2.1"]
  },
  {
    id: "asembia",
    company: "Asembia",
    position: "Front-End Developer",
    duration: "Dec 2023 – Oct 2024",
    description:
      "Walked into a fragmented enterprise front-end codebase across multiple HIPAA-compliant healthcare platforms — including a prescriber portal used by healthcare institutions — and systematically modernized it. Audited the codebase, established a design system by standardizing component patterns, button sizing, color usage, and brand token application, and upgraded the platform from Bootstrap 3 to Bootstrap 5, building a modular reusable component library in the process. Simplified complex tabular data layouts in the prescriber portal, reducing inbound clarification requests from clinical users. Integrated REST APIs (GET/POST) within a .NET environment for prescription tracking and provider workflow management. Implemented WCAG 2.1 AA accessibility standards. Collaborated directly with the CEO to secure organizational buy-in for the modernized architecture — resulting in component standards being adopted across the development team.",
    technologies: ["JavaScript", "React", "HTML", "CSS/SCSS", "Bootstrap 5", "REST APIs", "WCAG 2.1", ".NET", "Git", "Bitbucket", "CI/CD"]
  },
  {
    id: "broadcastmed",
    company: "BroadcastMed",
    position: "Lead Designer & Front-End Developer",
    duration: "Aug 2021 – Feb 2023",
    description:
      "Led design and front-end development of healthcare marketing microsites and landing pages within a proprietary CMS, supporting HIPAA-compliant digital campaigns. Increased lead form submissions by 18% through targeted layout and UX improvements. Reduced HTML email template production time by 25% by building a standardized HTML email system. Used Google Analytics and Hotjar to drive data-informed design decisions. Mentored junior developers and designers.",
    technologies: ["HTML", "CSS", "JavaScript", "Email Templates", "CMS", "Design Systems", "Google Analytics", "Hotjar", "Healthcare"]
  },
  {
    id: "prosek",
    company: "Prosek Partners",
    position: "Front-End Developer",
    duration: "Apr 2021 – Sep 2021",
    description:
      "Built responsive landing pages and campaign interfaces using React, Vue.js, HTML, CSS, and JavaScript for client-facing marketing initiatives — including the Verizon Motorola Droid product launch. Implemented SEO best practices and analytics tracking, contributing to a 12% reduction in bounce rates.",
    technologies: ["React", "Vue.js", "JavaScript", "HTML", "CSS", "SEO", "Git"]
  },
  {
    id: "seide",
    company: "William R. Seide Agency LLC",
    position: "Front-End Developer",
    duration: "Jan 2020 – Jun 2020",
    description:
      "Developed mobile-first responsive websites for insurance and financial services clients. Improved form completion rates and cross-browser rendering consistency across devices.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design", "Mobile-First"]
  },
  {
    id: "merkle",
    company: "Merkle",
    position: "Email Marketing Specialist",
    duration: "Nov 2018 – Jul 2019",
    description:
      "Built responsive HTML email templates using inline CSS for pharmaceutical product campaigns. Ensured accessibility compliance and brand consistency across deployments. Analyzed campaign performance metrics.",
    technologies: ["HTML Email", "Inline CSS", "Salesforce Marketing Cloud", "Responsive Email", "Accessibility"]
  },
  {
    id: "second-melody",
    company: "Second Melody",
    position: "Front-End Developer & Designer",
    duration: "2016 – 2017",
    description:
      "Front-end development and design work for an early-stage media brand.",
    technologies: ["HTML", "CSS", "JavaScript", "Design"]
  },
  {
    id: "kbs",
    company: "Kirshenbaum Bond Senecal + Partners (KBS)",
    position: "Front-End Developer Intern / Digital Studio Intern",
    duration: "2013 – 2015",
    description:
      "Digital studio internship and front-end developer internship at a major independent advertising agency.",
    technologies: ["HTML", "CSS", "JavaScript", "Digital Advertising"]
  }
];
