import { Helmet } from "react-helmet-async";
import { DesignDocCaseStudyTemplate } from "@/components/case-study";
import { DesignDocCaseStudyData } from "@/components/case-study/types";

const PREVIEW_DATA: DesignDocCaseStudyData = {
  slug: "preview",
  title: "Project Title Goes Here",
  category: "Full-Stack Web App",
  subtitle: "One line value proposition that explains what the project is and the impact it created.",
  summary:
    "A working reference for the 16-section case-study template — evidence/assumption callouts, progressive disclosure for code and metrics, and the confirmed/open reflection split.",
  liveUrl: "https://example.com",
  repoUrl: "https://github.com",
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",

  meta: [
    { icon: "🎯", label: "Role", value: "Full-Stack Design & Frontend Engineer" },
    { icon: "📅", label: "Duration", value: "Jan 2024 – Present (8 months)" },
    { icon: "👥", label: "Team", value: "2 Developers, 1 Designer, 1 PM" },
    { icon: "💻", label: "Platform", value: "Web Application (Responsive)" },
    { icon: "⚙️", label: "Tech Stack", value: "React, TypeScript, Tailwind, Node.js" },
  ],

  overview: {
    description:
      "A short overview of the project, the problem space, and who it's built for. This should set the stage for the rest of the case study — written so a recruiter or admissions reviewer understands the project without reading any code.",
    industry: "SaaS / B2B",
    targetUsers: "Teams 50–200",
    type: "Web App",
    myRole: "Design + Frontend",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },

  problem: {
    description:
      "Describe the core problem, user pain points, and any constraints. Why was this project necessary? Lead with who is struggling and what it costs them — not the missing feature.",
    problems: [
      "Problem statement goes here",
      "Another key challenge faced",
      "A technical or UX experience gap",
      "Performance or scalability issues",
    ],
  },

  opportunity: {
    heading: "Why this was worth building",
    paragraphs: [
      "Make the case explicit: what becomes possible if the problem is solved, and why now. This section turns the problem into a thesis the rest of the case study defends.",
      "Name the bet you made — the angle competitors or existing tools were missing — in one or two sentences.",
    ],
  },

  goals: [
    { icon: "🎨", title: "Improve User Experience", description: "Make the product easier and more intuitive to use." },
    { icon: "⚡", title: "Increase Efficiency", description: "Reduce time on task and improve workflows." },
    { icon: "📈", title: "Drive Business Impact", description: "Increase engagement, conversions, and retention." },
  ],

  research: {
    interviewIntro:
      "State what you actually knew and how you knew it: user feedback, analytics, desk research, domain knowledge. If no formal research happened, say so — and log the judgments you made as explicit assumptions instead of findings.",
    quotes: ["A representative user quote goes here, if a real interview happened."],
    competitiveIntro: "Name what you actually compared against, even if it was informal.",
    competitors: ["Competitor A", "Competitor B"],
    observations: ["What the competitive scan actually told you — a gap, a pattern, a thing worth copying or avoiding."],
    notes: [
      {
        tone: "evidence",
        label: "Evidence",
        text: "A verifiable input — analytics, support tickets, documented workflows, competitive teardown. Cite where it lives.",
      },
      {
        tone: "assumption",
        label: "Assumption — needs validation",
        text: "A judgment you designed around but haven't tested with users yet. Name the test that would validate it.",
      },
      {
        tone: "constraint",
        label: "Constraint",
        text: "A hard boundary the design had to respect — platform, timeline, compliance, team size.",
      },
    ],
  },

  designPrinciples: [
    {
      number: "P1",
      title: "State a rule you held",
      description: "e.g. \"Every destructive action is reversible\" — then one sentence on what it cost or ruled out.",
    },
    {
      number: "P2",
      title: "A second standing value",
      description: "e.g. \"Ship nothing unvalidated — every endpoint has a schema and a manual QA pass before merge.\"",
    },
    {
      number: "P3",
      title: "A third principle",
      description: "Tie it to a concrete mechanism in the product so it reads as practice, not aspiration.",
    },
  ],

  informationArchitecture: {
    intro: "Map the routes, screens, or flows — grouped by user state or job, not by folder structure. Derivable from the codebase's route list.",
    columns: [
      { title: "Flow group A", items: ["Screen name A1", "Screen name A2", "Screen name A3"] },
      { title: "Flow group B", items: ["Screen name B1", "Screen name B2"] },
      { title: "Flow group C", items: ["Screen name C1", "Screen name C2", "Screen name C3"] },
      { title: "Flow group D", items: ["Screen name D1"] },
    ],
  },

  features: [
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      title: "Real-time Overview",
      description: "Users get a snapshot of key metrics and activity in real time.",
      tag: "Dashboard",
    },
    {
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600&q=80",
      title: "Task & Project Management",
      description: "Organize, prioritize, and manage work efficiently.",
      tag: "Management",
    },
    {
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
      title: "Insights & Analytics",
      description: "Data-driven insights to help users make informed decisions.",
      tag: "Analytics",
    },
    {
      image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&q=80",
      title: "Collaboration Tools",
      description: "Real-time collaboration and communication features.",
      tag: "Collaboration",
    },
  ],

  visualDesign: {
    heading: "The visual language",
    paragraphs: [
      "Show the tokens, type scale, and surfaces — and say what each choice does for the user (legibility, calm, hierarchy), not just what it looks like.",
    ],
    tags: ["accent · #7B3DDB", "base · #0D0D0D", "text · #F5F5F5", "display · Space Grotesk", "body · Inter"],
  },

  techStack: [
    "React", "TypeScript", "Tailwind CSS", "Node.js", "Express",
    "MongoDB", "Zustand", "React Query", "Vite", "Git / GitHub",
    "Docker", "AWS",
  ],
  technicalArchitectureIntro:
    "The system at a glance — what talks to what, and which decisions carry the product's values. Deep detail lives below, behind progressive disclosure.",

  codeTabs: [
    {
      label: "Component Logic",
      filename: "src/hooks/useProjectData.ts",
      language: "typescript",
      code: `export function useProjectData(projectId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProject(projectId),
    staleTime: 1000 * 60 * 5,
  });

  const tasks = useMemo(
    () => data?.tasks.filter((t) => !t.archived) ?? [],
    [data?.tasks]
  );

  return { project: data, tasks, isLoading };
}`,
    },
    {
      label: "API Integration",
      filename: "src/api/projects.ts",
      language: "typescript",
      code: `export async function fetchProject(id: string): Promise<Project> {
  const res = await api.get(\`/projects/\${id}\`);
  return projectSchema.parse(res.data);
}

export async function updateTask(
  projectId: string,
  taskId: string,
  patch: Partial<Task>
) {
  const res = await api.patch(
    \`/projects/\${projectId}/tasks/\${taskId}\`,
    patch
  );
  return taskSchema.parse(res.data);
}`,
    },
    {
      label: "Custom Hook",
      filename: "src/hooks/useScrollSpy.ts",
      language: "typescript",
      code: `export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}`,
    },
  ],

  designSystem: {
    intro:
      "Separate the design-system pieces from framework choices: tokens (color, spacing, type, radius, elevation), primitives (buttons, inputs, cards, badges), and composites (data tables, dashboards, flows) — and how they kept the product consistent as it grew.",
    components: ["Tokens", "Primitives", "Composites"],
  },

  accessibility: [
    { text: "Semantic HTML landmarks throughout." },
    { text: "Visible focus states on every interactive element." },
    { text: "Color contrast checked against WCAG AA at design time." },
  ],
  accessibilityValidation: {
    tone: "assumption",
    label: "Validation status",
    text: "Foundations implemented; formal audit not yet run — scheduled with beta usability testing.",
  },

  challenges: {
    heading: "Where it got hard",
    paragraphs: [
      "The honest middle of the story: the edge case that broke the model, the tradeoff that hurt, the decision you'd contest. One tradeoff told well is worth five feature lists.",
    ],
  },
  challengesTradeoff: {
    tone: "tradeoff",
    label: "Tradeoff",
    text: "What you gave up, what you got, and why the exchange was right at the time.",
  },

  outcomes: {
    heading: "What verifiably changed",
    paragraphs: [
      "Label each outcome by type — verified fact, implementation evidence, or unvalidated hypothesis. Only cite numbers with a source, a date, and a method behind them.",
      "Sample values below — every published metric needs an evidence-ledger entry: source, date, method.",
    ],
  },
  metrics: [
    { value: "+42%", label: "Increase in user engagement", description: "Across all active teams" },
    { value: "-28%", label: "Reduction in time on task", description: "Average session length" },
    { value: "+18%", label: "Increase in conversions", description: "Trial to paid upgrade" },
    { value: "99.9%", label: "Uptime & system reliability", description: "Over 12-month period" },
  ],

  reflection: [
    { text: "Strengthened my skills in scalable component architecture." },
    { text: "Learned the importance of performance optimization early in development." },
    { text: "Improved collaboration with designers and product stakeholders." },
    { text: "Next time, I would focus more on user testing earlier in the process.", type: "open" },
  ],

  nextSteps: [
    { icon: "📱", label: "Mobile App Companion" },
    { icon: "🤖", label: "AI-Powered Recommendations" },
    { icon: "📊", label: "Advanced Analytics" },
    { icon: "📴", label: "Offline Mode & PWA Support" },
  ],
  futureValidation: {
    tone: "evidence",
    label: "Future validation",
    text: "Name the specific study that would test this project's core assumption — who you'd recruit, what you'd measure.",
  },

  prevProject: { slug: "withyou", title: "WithYou" },
  nextProject: { slug: "gundam-forge", title: "Gundam Forge" },
  theme: {
    accent: "#7B3DDB",
    glow: "rgba(123, 61, 219, 0.3)",
    badge: "#7B3DDB",
  },
};

export default function CaseStudyPreview() {
  return (
    <>
      <Helmet>
        <title>Case Study Template Preview | Earl Hickson Jr.</title>
      </Helmet>
      <DesignDocCaseStudyTemplate data={PREVIEW_DATA} />
    </>
  );
}
