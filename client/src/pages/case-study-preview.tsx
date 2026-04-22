import { Helmet } from "react-helmet-async";
import { PremiumCaseStudyTemplate } from "@/components/case-study";
import { PremiumCaseStudyData } from "@/components/case-study/types";

const PREVIEW_DATA: PremiumCaseStudyData = {
  slug: "preview",
  title: "Project Title Goes Here",
  category: "Full-Stack Web App",
  subtitle: "One line value proposition that explains what the project is and the impact it created.",
  summary: "A production-quality demonstration of the premium case study template.",
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
      "A short overview of the project, the problem space, and who it's built for. This should set the stage for the rest of the case study.",
    industry: "SaaS / B2B",
    targetUsers: "Teams 50–200",
    type: "Web App",
    myRole: "Design + Frontend",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  challenge: {
    description:
      "Describe the core problem, user pain points, and any constraints. Why was this project necessary?",
    problems: [
      "Problem statement goes here",
      "Another key challenge faced",
      "A technical or UX experience gap",
      "Performance or scalability issues",
    ],
  },
  goals: [
    {
      icon: "🎨",
      title: "Improve User Experience",
      description: "Make the product easier and more intuitive to use.",
    },
    {
      icon: "⚡",
      title: "Increase Efficiency",
      description: "Reduce time on task and improve workflows.",
    },
    {
      icon: "📈",
      title: "Drive Business Impact",
      description: "Increase engagement, conversions, and retention.",
    },
  ],
  process: [
    {
      number: "① Research",
      title: "Research",
      description: "User research, competitor analysis, and requirements gathering.",
    },
    {
      number: "② Design",
      title: "Design",
      description: "Wireframes, user flows, UI design, and interaction planning.",
    },
    {
      number: "③ Build",
      title: "Build",
      description: "Component architecture, frontend development, and integrations.",
    },
    {
      number: "④ Test & Iterate",
      title: "Test & Iterate",
      description: "Testing, feedback loops, and continuous improvements.",
    },
  ],
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
  techStack: [
    "React", "TypeScript", "Tailwind CSS", "Node.js", "Express",
    "MongoDB", "Zustand", "React Query", "Vite", "Git / GitHub",
    "Docker", "AWS",
  ],
  codeTabs: [
    {
      label: "Component Logic",
      filename: "src/hooks/useProjectData.ts",
      language: "TypeScript",
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
      language: "TypeScript",
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
      language: "TypeScript",
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
  metrics: [
    { value: "+42%", label: "Increase in user engagement", description: "Across all active teams" },
    { value: "-28%", label: "Reduction in time on task", description: "Average session length" },
    { value: "+18%", label: "Increase in conversions", description: "Trial to paid upgrade" },
    { value: "99.9%", label: "Uptime & system reliability", description: "Over 12-month period" },
  ],
  learnings: [
    { text: "Strengthened my skills in scalable component architecture." },
    { text: "Learned the importance of performance optimization early in development." },
    { text: "Improved collaboration with designers and product stakeholders." },
    { text: "Next time, I would focus more on user testing earlier in the process." },
  ],
  futureItems: [
    { icon: "📱", label: "Mobile App Companion" },
    { icon: "🤖", label: "AI-Powered Recommendations" },
    { icon: "📊", label: "Advanced Analytics" },
    { icon: "📴", label: "Offline Mode & PWA Support" },
  ],
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
      <PremiumCaseStudyTemplate data={PREVIEW_DATA} />
    </>
  );
}
