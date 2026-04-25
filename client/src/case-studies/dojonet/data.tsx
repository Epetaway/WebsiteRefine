import {
  Target,
  Calendar,
  User,
  Monitor,
  Layers,
  Palette,
  Zap,
  TrendingUp,
  Smartphone,
  Database,
  Video,
} from "lucide-react";
import type { PremiumCaseStudyData } from "@/components/case-study/types";

export const dojonetPremiumData: PremiumCaseStudyData = {
  slug: "dojonet",
  title: "DojoNet",
  category: "Martial Arts Social Platform",
  subtitle:
    "A local-first web app for martial artists to discover events, track progress, personalize profiles, and find training partners safely.",
  summary:
    "DojoNet is a front-end-heavy martial arts community product that combines social feed patterns, journal workflows, event discovery, direct messaging, and partner matchmaking in one responsive web experience. The product direction mixes MySpace-style profile customization with 2025-grade UI tokens, accessible interaction patterns, and optional backend architecture for future multi-device sync. The current implementation is designed to run locally with persisted demo data while still modeling production-scale features like moderation, notifications, and verification.",
  liveUrl: "https://epetaway.github.io/DojoNet-Prototype-MAX/#/dashboard",
  repoUrl: "https://github.com/Epetaway/DojoNet-Prototype-MAX",
  heroImage: "/images/dojonet/dojonet_hero.png",

  meta: [
    { icon: <Target size={16} />, label: "Role", value: "Lead UI Engineer & Designer" },
    { icon: <Calendar size={16} />, label: "Duration", value: "TBD" },
    { icon: <User size={16} />, label: "Team", value: "Solo" },
    { icon: <Monitor size={16} />, label: "Platform", value: "Responsive web app prototype" },
    { icon: <Layers size={16} />, label: "Tech Stack", value: "React, Vite, Tailwind CSS, Zustand, Framer Motion" },
  ],

  overview: {
    description:
      "DojoNet is a martial arts social network prototype built around community, training identity, and discovery. It supports customizable profiles, social posting, forums, event exploration, training journals, notifications, direct messaging, and a safety-aware partner matching system.",
    industry: "Martial Arts / Social Networking",
    targetUsers:
      "Martial arts practitioners, gym-affiliated members, coaches, competitors, and hobbyists looking to train, connect, and discover events.",
    type: "Local-first web prototype with optional backend architecture",
    myRole: "Lead UI Engineer & Designer",
    image: "/images/dojonet/dojonet_overview.png",
  },

  challenge: {
    description:
      "The application had to prove that a martial arts community product could feel social, expressive, and production-ready without relying on a required backend, while still reflecting discipline-specific workflows and safety constraints.",
    problems: [
      "Generic social products do not capture martial arts identity such as belt rank, discipline, gym affiliation, and training goals.",
      "Finding training partners requires stronger safety controls, especially around age-gating, moderation, and verification.",
      "Practitioners need one place for journals, events, feed activity, messaging, and discussion instead of fragmented tools.",
      "The prototype needed rich interaction design and persistence while remaining runnable locally with no backend dependency.",
    ],
  },

  goals: [
    {
      icon: <Palette size={18} />,
      title: "Make identity expressive",
      description:
        "Bring MySpace-style personalization into a martial arts context through theme presets, profile music, Top 8-style Dojo Circle, and editable profile surfaces.",
    },
    {
      icon: <Zap size={18} />,
      title: "Make discovery useful and safe",
      description:
        "Combine search, event discovery, matchmaking, and messaging with age-gated partner filtering, moderation tools, and verification cues.",
    },
    {
      icon: <TrendingUp size={18} />,
      title: "Validate a scalable product model",
      description:
        "Ship a local-first prototype that demonstrates production-grade breadth across feed, journals, forums, notifications, and optional backend architecture.",
    },
  ],

  process: [
    {
      number: "① Research",
      title: "Research",
      description:
        "Define the product around real martial arts community needs: training logs, rank-based identity, event discovery, safer partner finding, and lightweight verification rather than generic social scaffolding.",
    },
    {
      number: "② Design",
      title: "Design",
      description:
        "Establish a bold but practical UI system using Dojo Red accents, Bebas Neue display type, Inter body text, soft-elevated cards, dark-mode support, and reusable atoms for buttons, badges, modals, and cards.",
    },
    {
      number: "③ Build",
      title: "Build",
      description:
        "Implement the experience in React, Vite, Tailwind, and Zustand with routed pages for home, search, journals, profiles, dashboard, notifications, events, messages, forums, and partner matchmaking.",
    },
    {
      number: "④ Test & Ship",
      title: "Test & Ship",
      description:
        "Validate core behavior with Vitest smoke coverage, persisted local demo data, seeded bot users, reduced-motion support, and an optional Express/Prisma backend path for future expansion.",
    },
  ],

  features: [
    {
      image: "/images/dojonet/dojonet_hero.png",
      title: "Hero Search and Event Discovery",
      description:
        "The home screen leads with a full-width hero, integrated search, and an events rail that pulls upcoming activity into a clear conversion path from exploration to event detail.",
      tag: "Home",
    },
    {
      image: "/images/dojonet/dojonet_partners.png",
      title: "Swipe-Style Partner Matchmaking",
      description:
        "The partner screen adapts dating-app interaction patterns for martial arts by combining swipe gestures, compatibility scoring, belt and discipline context, and hard age-gating for safer discovery.",
      tag: "Partners",
    },
    {
      image: "/images/dojonet/dojonet_journal.png",
      title: "Training Journal Workspace",
      description:
        "The journal experience groups entries, techniques, progress, and goals into a structured training workflow so practitioners can track skills, milestones, and personal development over time.",
      tag: "Journal",
    },
    {
      image: "/images/dojonet/dojonet_profile.png",
      title: "Customizable Martial Arts Profiles",
      description:
        "Profiles turn identity into a feature with visual theme presets, profile music, Dojo Circle Top 8 connections, rank and gym context, and editable layouts that lean into nostalgic social customization.",
      tag: "Profile",
    },
    {
      image: "/images/dojonet/dojonet_events.png",
      title: "Event Detail Actions",
      description:
        "Event pages go beyond listing data by supporting RSVP status, discussion, sharing, reminders, and calendar workflows inside a tabbed detail view.",
      tag: "Events",
    },
    {
      image: "/images/dojonet/dojonet_messages.png",
      title: "Messaging, Notifications, and Community Threads",
      description:
        "The platform rounds out the social loop with conversation lists, unread states, type-based notifications, and forum-style discussion surfaces that connect public community activity with private communication.",
      tag: "Social",
    },
  ],

  techStack: [
    "React",
    "Vite",
    "Tailwind CSS",
    "Zustand",
    "Framer Motion",
    "Lucide React",
    "Express",
    "Prisma",
    "PostgreSQL",
    "Redis",
    "BullMQ",
    "Socket.IO",
  ],

  codeTabs: [
    {
      label: "Theme Tokens",
      filename: "src/index.css",
      language: "css",
      code: `:root {
  /* Background & Surface */
  --color-bg: #F9F9F9;
  --color-surface: #FFFFFF;
  --color-elevation: 0 1px 2px rgba(26,26,26,0.06),
                     0 10px 24px rgba(26,26,26,0.12);

  /* Text */
  --color-text: #1A1A1A;
  --color-text-muted: #4D4D4D;
  --color-border: transparent;

  /* Accent Palette */
  --accent-primary: #B71C1C;   /* Dojo Red */
  --accent-teal: #009688;      /* Success */
  --accent-amber: #F59E0B;     /* Warning */
}

.dark {
  --color-bg: #121418;
  --color-surface: #1A1E24;
  --color-text: #F3F4F6;
  --color-text-muted: #9CA3AF;
  --accent-primary: #EF4444;
}`,
    },
    {
      label: "Hero Search",
      filename: "src/components/Hero.jsx",
      language: "jsx",
      code: `function Hero() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  function onSearch(e) {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? \`/explore?q=\${encodeURIComponent(q)}\` : "/explore");
  }

  return (
    <section className="relative text-center py-12 overflow-hidden
                        rounded-3xl bg-[var(--color-surface)] shadow-sm">
      <div className="absolute inset-0 bg-fallback-dark" aria-hidden />
      {bg && (
        <>
          <img src={bg} alt=""
               className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0
                          bg-gradient-to-t from-black/40 via-black/20
                          to-transparent" />
        </>
      )}
      <form onSubmit={onSearch} className="relative z-10 max-w-xl mx-auto">
        <input
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder="Search dojos, events, practitioners…"
          className="w-full rounded-full px-5 py-3 text-sm shadow-lg
                     bg-white/90 backdrop-blur focus:outline-none
                     focus:ring-2 focus:ring-[var(--accent-primary)]"
        />
      </form>
    </section>
  );
}`,
    },
    {
      label: "Event Card",
      filename: "src/components/EventCard.jsx",
      language: "jsx",
      code: `function EventCard({ evt }) {
  const navigate = useNavigate();
  const dateStr = evt.date ? formatDate(evt.date) : null;

  function handleClick() {
    navigate(\`/events/\${evt.id}\`);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleClick()}
      aria-label={\`Event: \${evt.title}\${dateStr ? \` on \${dateStr}\` : ""}\`}
      className="min-w-[280px] max-w-[320px] h-48 relative rounded-xl
                 overflow-hidden cursor-pointer group shadow-lg
                 transition-transform duration-300
                 hover:scale-[1.01] hover:-translate-y-0.5"
    >
      <img src={evt.image ?? DEFAULT_PLACEHOLDER} alt=""
           className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0
                      bg-gradient-to-t from-black/65 via-black/35
                      to-transparent group-hover:from-black/70
                      transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="text-xs opacity-75 mb-1">{dateStr}</p>
        <h3 className="font-semibold text-sm leading-tight line-clamp-2">
          {evt.title}
        </h3>
      </div>
    </div>
  );
}`,
    },
  ],

  metrics: [
    {
      value: "11",
      label: "Seeded demo users",
      description: "Interconnected bot community with varied ranks, themes, gyms, and friend graphs.",
    },
    {
      value: "4",
      label: "Profile theme presets",
      description: "Default, Tatami, Iron, and Neon themes with dynamic gradients and pattern overlays.",
    },
    {
      value: "7",
      label: "Dashboard widgets",
      description: "Milestones, events, partners, drafts, journals, and quick actions in the right rail.",
    },
    {
      value: "6",
      label: "Onboarding steps",
      description: "Welcome, profile basics, interests, practice claims, theme selection, and review.",
    },
    {
      value: "6",
      label: "Notification types",
      description: "Likes, comments, follows, messages, event shares, and system updates.",
    },
    {
      value: "4",
      label: "Journal tabs",
      description: "Training Journal organized into Entries, Techniques, Progress, and Goals.",
    },
  ],

  learnings: [
    {
      text: "Local-first persistence made it possible to validate a broad social product surface without blocking on backend infrastructure.",
    },
    {
      text: "Safety-sensitive features like partner matching need enforcement in filtering logic and moderation components, not just interface copy.",
    },
    {
      text: "Design tokens and reusable UI atoms were critical for keeping light mode, dark mode, and personalized profile themes visually consistent.",
    },
  ],

  futureItems: [
    { icon: <Smartphone size={14} />, label: "Parent dashboard and approval flows for minor accounts" },
    { icon: <Zap size={14} />, label: "Real-time chat and live activity via WebSockets" },
    { icon: <Database size={14} />, label: "Backend-backed persistence with Prisma, PostgreSQL, and Redis" },
    { icon: <Video size={14} />, label: "Media uploads for posts, messages, and richer training content" },
  ],

  theme: {
    accent: "#B71C1C",
    glow: "rgba(183,28,28,0.15)",
    badge: "#E11D48",
    bg: "#F9F9F9",
    surface: "#FFFFFF",
    surface2: "#F3F4F6",
    textPrimary: "#1A1A1A",
    textSecondary: "#4D4D4D",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    borderStrong: "#D1D5DB",
  },
};
