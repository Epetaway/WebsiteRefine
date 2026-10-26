export const profile = {
  name: "Earl Hickson Jr.",
  // Matches the résumé headline (Oct 24, 2026). Earl chose this title on Oct 25, 2026.
  publicTitle: "Lead Front-End Engineer",
  specialties: ["Design Systems", "Accessibility", "Healthcare UI"],
  eyebrow: "EARL HICKSON JR. — LEAD FRONT-END ENGINEER",
  headline:
    "Designing and building human-centered systems that help people become more capable.",
  thesis: "I design and build technology that helps people become more capable.",
  belief:
    "Technology should support human capability without unnecessarily replacing human agency.",
  // The résumé summary, word for word. Keep the two in sync.
  summary:
    "Front-end engineer with a BFA in graphic design and 6+ years building production interfaces for healthcare, financial services, and digital media. At Asembia, took a fragmented set of HIPAA-regulated patient and prescriber portals from Bootstrap 3 to a reusable Bootstrap 5 component system, and got those standards adopted by the dev team. At BroadcastMed, led design and front-end delivery, mentored junior designers and developers, and built the email system that cut production time 25%. Outside client work, ships tested, CI-deployed products in React, Next.js, and TypeScript. Best where design, accessibility, and engineering overlap, and at getting a team to build the same way. A Brazilian Jiu-Jitsu black belt who has taught students of all ages since 2021; that coaching carries straight into mentoring engineers.",
  // First-person version of the same positioning, for page intros.
  lead:
    "Front-end engineer with a BFA in graphic design and 6+ years building production interfaces for healthcare, financial services, and digital media. I'm at my best where design, accessibility, and engineering overlap, and at getting a team to build the same way.",
  graduateSummary:
    "Front-end engineer and independent HCI practitioner with a background in graphic design, frontend engineering, and full-stack product development. My work explores how interactive systems can strengthen human capability across relationships, learning, privacy, and complex decision-making without unnecessarily replacing human agency.",
  availability: "Open to full-time lead and senior front-end roles",
  workPreference: "Remote, or hybrid in New Jersey and New York City",
  focusRoles: [
    "Lead Front-End Engineer",
    "Front-End Technical Lead",
    "Senior Front-End Engineer",
    "Lead UI Engineer",
    "Design Engineer",
  ],
  location: "Parsippany, New Jersey",
  trajectory: [
    { discipline: "Graphic design", consequence: "communication" },
    { discipline: "Interaction design", consequence: "behavior" },
    { discipline: "Frontend engineering", consequence: "implementation" },
    { discipline: "Full-stack engineering", consequence: "systems" },
    { discipline: "Human-computer interaction", consequence: "human consequences" },
  ],
  importantPhrase: "Engineering became another creative material.",
} as const;
