export const research = {
  interests: [
    "Human-computer interaction",
    "Learning technologies",
    "Privacy and consent",
    "Decision support",
    "Information architecture",
    "Accessibility",
    "Human agency and automation",
  ],
  methodsUsed: [
    "Analytics review",
    "Hotjar-informed evaluation",
    "Accessibility auditing",
    "Interaction prototyping",
    "Design-system evaluation",
    "Implementation analysis",
    "Technical usability review",
  ],
  methodsSought: [
    "Semi-structured interviews",
    "Usability testing",
    "Diary studies",
    "Contextual inquiry",
    "Observation",
    "Qualitative coding",
    "Experimental design",
    "Mixed methods",
    "Research ethics",
  ],
  selectedWriting: [
    {
      title: "Teaching Jiu-Jitsu Changed the Way I Think About UX",
      path: "/field-notes/teaching-jiu-jitsu-and-ux",
    },
    {
      title: "Designing Consent Into Digital Products",
      path: "/field-notes/designing-consent",
    },
    {
      title:
        "What Trading Card Games Teach Us About Information Architecture",
      path: "/field-notes/information-architecture-and-card-games",
    },
  ],
  projects: {
    withyou: {
      status: "Functional beta-oriented implementation",
      claimType: "implementation-evidence",
    },
    dojonet: {
      status: "Active development",
      claimType: "implementation-evidence",
    },
    "gundam-forge": {
      status: "Functional beta-oriented implementation",
      claimType: "implementation-evidence",
    },
  },
} as const;
