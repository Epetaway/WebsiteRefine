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
    id: "asembia",
    company: "Asembia",
    position: "Front-End / UI Engineer",
    duration: "Nov 2023 – Sep 2024",
    description:
      "Developed and maintained user interfaces with JavaScript, HTML, CSS, and React. Integrated secure REST APIs to retrieve and submit patient prescription data. Contributed to HIPAA-compliant patient and provider platforms. Implemented WCAG 2.1 AA accessibility standards. Worked within a .NET-based environment and utilized Git (Bitbucket) and CI/CD pipelines.",
    technologies: ["JavaScript", "React", "HTML", "CSS", "REST APIs", "WCAG 2.1", ".NET", "Git", "CI/CD"]
  },
  {
    id: "broadcastmed",
    company: "BroadcastMed",
    position: "Lead UI Engineer & Designer",
    duration: "Aug 2021 – Feb 2023",
    description:
      "Led design and front-end development of healthcare marketing microsites and landing pages within a proprietary CMS, supporting HIPAA-compliant digital campaigns. Increased lead submissions by 18% through refined layouts and CTA placement. Reduced HTML email production time by 25% via a structured design system.",
    technologies: ["HTML", "CSS", "JavaScript", "Email Templates", "CMS", "Design Systems", "Healthcare"]
  },
  {
    id: "prosek",
    company: "Prosek Partners",
    position: "Front-End / UI Engineer (Contract)",
    duration: "Mar 2021 – Aug 2021",
    description:
      "Developed responsive landing pages using React, HTML, CSS, JavaScript, and component-based UI patterns for client-facing marketing initiatives. Built projects using Vue.js in a collaborative environment. Implemented SEO best practices and analytics tracking to enhance user engagement.",
    technologies: ["React", "Vue.js", "JavaScript", "HTML", "CSS", "SEO", "Git"]
  },
  {
    id: "seide",
    company: "William R. Seide Agency LLC",
    position: "Front-End / UI Engineer",
    duration: "Dec 2019 – May 2020",
    description:
      "Implemented front-end solutions using HTML, CSS, and JavaScript, increasing usability and form completion rates across devices. Developed and maintained mobile-first, responsive websites for insurance and financial services clients.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design", "Mobile-first"]
  }
];
