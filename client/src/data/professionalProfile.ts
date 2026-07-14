export const professionalProfile = {
  name: "Earl Hickson Jr.",
  title: "UX Engineer",
  tagline:
    "Designing and building human-centered systems that help people become more capable.",
  descriptor:
    "I work across interaction design, frontend engineering, and full-stack product development.",
  thesis: "I design and build technology that helps people become more capable.",
  belief:
    "Technology should support human capability without unnecessarily replacing human agency.",
  availability: "Open to full-time opportunities",
  focus: [
    "UX Engineering",
    "Design Engineering",
    "Product Engineering",
    "Frontend Product Development",
  ],
  links: {
    website: "https://ehicksonjr.com",
    linkedin: "https://linkedin.com/in/earlhicksonjr",
    github: "https://github.com/Epetaway",
    email: "e@ehicksonjr.com",
    resume: "/assets/Earl-Hickson-Jr-Resume.pdf",
  },
  location: "Open to remote and hybrid opportunities",
} as const;

export type ProfessionalProfile = typeof professionalProfile;
