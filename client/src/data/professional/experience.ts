// Public employment chronology. Source: Earl's résumé dated Oct 24, 2026, which is the
// authority for every employer, title, location, date and bullet below. Change the résumé
// and this file together; `npm run content:export` and `npm run documents:generate`
// carry it into resume/content.json and both PDFs.

export type ClientEngagement = {
  client: string;
  role: string;
  dates: string;
  responsibilities: readonly string[];
};

export type ProfessionalExperience = {
  id: string;
  employer: string;
  role: string;
  location: string;
  start: string;
  end: string;
  dates: string;
  area: string;
  summary: string;
  responsibilities: readonly string[];
  /** Separate client engagements grouped under one freelance entry. */
  engagements?: readonly ClientEngagement[];
  factStatus: "verified";
};

export const experience: readonly ProfessionalExperience[] = [
  {
    id: "ama-fight-club",
    employer: "AMA Fight Club",
    role: "Front-End Developer & Brazilian Jiu-Jitsu Professor",
    location: "Cedar Knolls, NJ",
    start: "January 2025",
    end: "Present",
    dates: "Jan 2025 — Present",
    area: "Fitness / Operations",
    summary:
      "Own the gym's website end to end, including a Zen Planner API integration that syncs web leads to the membership CRM, and lead its Brazilian Jiu-Jitsu program.",
    responsibilities: [
      "Own the gym's website end to end: rebuilt it in Wix CMS with custom HTML, CSS, and JavaScript, with responsive layouts, simpler navigation, and SEO-ready structure.",
      "Integrated the Zen Planner API so website leads sync to the gym's membership CRM in real time, working through its authentication and submission requirements.",
      "Built mobile-first registration and lead forms, plus ZipRecruiter form integrations for recruiting campaigns.",
      "Lead the school's Brazilian Jiu-Jitsu program as a black-belt professor: teach youth and adult classes and lead the team at tournaments.",
      "Teach classes built on discipline and determination as much as technique, and push every student toward what they're capable of.",
    ],
    factStatus: "verified",
  },
  {
    id: "independent",
    employer: "Freelance and Contract",
    role: "Independent Front-End Developer",
    location: "Remote",
    start: "November 2024",
    end: "October 2025",
    dates: "Nov 2024 — Oct 2025",
    area: "Nonprofit / Financial services",
    summary:
      "A custom WordPress donation-campaign plugin for Tabby's Place, and React and TypeScript dashboard screens for Wealth Creation Innovation.",
    responsibilities: [],
    engagements: [
      {
        client: "Tabby's Place: A Cat Sanctuary",
        role: "Front-End Developer, Contract",
        dates: "Oct 2025",
        responsibilities: [
          "Designed and built a custom WordPress plugin from scratch for donation campaigns: live donation tracking, progress indicators, and adoptable-cat listings.",
          "Gave non-technical staff an admin screen to run campaigns without touching code, and delivered it from design to deployment on a compressed timeline.",
        ],
      },
      {
        client: "Wealth Creation Innovation",
        role: "Senior Front-End Developer, Contract",
        dates: "Nov — Dec 2024",
        responsibilities: [
          "Built data-driven dashboard screens and reusable components in React, TypeScript, Tailwind CSS, and Stencil, wired to REST APIs.",
        ],
      },
    ],
    factStatus: "verified",
  },
  {
    id: "asembia",
    employer: "Asembia",
    role: "Front-End Developer",
    location: "Florham Park, NJ",
    start: "December 2023",
    end: "October 2024",
    dates: "Dec 2023 — Oct 2024",
    area: "Healthcare / Enterprise",
    summary:
      "Set one component and brand-token standard across HIPAA-regulated patient, provider, and prescriber portals, led the Bootstrap 3 to 5 migration, and got the team building to it.",
    responsibilities: [
      "Took over a front end patched for years across several HIPAA-regulated portals (patient, provider, and a prescriber portal used by healthcare institutions) and set one standard for components, sizing, color, and brand tokens.",
      "Led the Bootstrap 3 to 5 migration and built a reusable component library during it.",
      "Presented the modernization approach to the CEO, won buy-in, and got the component standards adopted across the development team.",
      "Simplified dense prescription data tables for clinical users, which cut clarification requests from partner institutions.",
      "Integrated REST APIs (GET/POST) with the .NET backend team for prescription tracking and provider workflows, and brought key user journeys to WCAG 2.1 AA.",
      "Shipped through Bitbucket and CI/CD alongside UX, QA, and backend engineers, and introduced React into parts of the UI as the team moved toward a modern framework.",
    ],
    factStatus: "verified",
  },
  {
    id: "broadcastmed",
    employer: "BroadcastMed / Conexiant",
    role: "Lead Designer & Front-End Developer",
    location: "Remote",
    start: "August 2021",
    end: "February 2023",
    dates: "Aug 2021 — Feb 2023",
    area: "Healthcare / Media",
    summary:
      "Led design and front-end delivery of healthcare marketing microsites, raised lead-form submissions 18%, and built an email system that cut production time 25%.",
    responsibilities: [
      "Led design and front-end development of healthcare marketing microsites and landing pages in a proprietary CMS, turning stakeholder requests into shipped pages across concurrent projects.",
      "Raised lead-form submissions 18% by reworking layouts, call-to-action placement, and form flow based on Google Analytics and Hotjar data.",
      "Built a standardized HTML email system with reusable modules and design rules, cutting email production time 25%.",
      "Mentored junior designers and developers, and kept builds consistent across projects.",
      "Shipped responsive, cross-device pages inside a locked-down legacy CMS by adapting implementations to its constraints.",
    ],
    factStatus: "verified",
  },
  {
    id: "prosek-partners",
    employer: "Prosek Partners",
    role: "Front-End Developer, Contract",
    location: "Remote",
    start: "April 2021",
    end: "September 2021",
    dates: "Apr 2021 — Sep 2021",
    area: "Communications / Marketing",
    summary:
      "Responsive landing pages and campaign interfaces in React, plus client projects in Vue.js.",
    responsibilities: [
      "Built responsive landing pages and campaign interfaces in React, HTML, CSS, and JavaScript, plus client projects in Vue.js.",
      "Implemented SEO and analytics tracking with mobile-first, accessible markup, working in Git with designers and account stakeholders.",
    ],
    factStatus: "verified",
  },
  {
    id: "william-r-seide-agency",
    employer: "William R. Seide Agency LLC",
    role: "Front-End Developer, Contract",
    location: "New Jersey",
    start: "January 2020",
    end: "June 2020",
    dates: "Jan 2020 — Jun 2020",
    area: "Insurance / Financial services",
    summary:
      "Mobile-first sites for insurance and financial-services clients.",
    responsibilities: [
      "Built mobile-first sites for insurance and financial-services clients, improving form completion and cross-browser rendering.",
    ],
    factStatus: "verified",
  },
  {
    id: "merkle",
    employer: "Merkle",
    role: "Email Marketing Specialist, Contract",
    location: "Remote",
    start: "November 2018",
    end: "July 2019",
    dates: "Nov 2018 — Jul 2019",
    area: "Pharmaceutical marketing",
    summary:
      "Responsive HTML email for pharmaceutical campaigns, tested across email clients.",
    responsibilities: [
      "Coded responsive HTML email for pharmaceutical campaigns, tested it across email clients, and held brand and accessibility standards.",
    ],
    factStatus: "verified",
  },
] as const;

/** The résumé's one-line summary of roles before 2018. */
export const earlierExperience =
  "Earlier: front-end and digital design roles at Kirshenbaum Bond Senecal + Partners and Second Melody, 2013–2017.";
