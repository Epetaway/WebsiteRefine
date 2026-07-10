import {
  Target,
  Calendar,
  User,
  Monitor,
  Layers,
  Users,
  LayoutDashboard,
  CreditCard,
  Mail,
  MessageSquare,
  Sparkles,
  Search,
  BarChart3,
  LayoutTemplate,
  Network,
} from "lucide-react";
import type { DesignDocCaseStudyData } from "@/components/case-study/types";
import kaijuBanner from "@/images/kaiju-banner.png";
import earlBjjPhoto from "@/images/earl-bjj-photo.png";

export const trainerLaunchDesignDocData: DesignDocCaseStudyData = {
  slug: "trainerlaunch",
  title: "TrainerLaunch",
  category: "Business SaaS Platform",
  subtitle: "Designing a Mobile-First Marketing Platform for Independent Personal Trainers",
  summary:
    "TrainerLaunch is a mobile-first SaaS platform that helps independent personal trainers establish a professional online presence, generate qualified leads, and manage their business without relying solely on social media.",
  repoUrl: "https://github.com/Epetaway/trainerlaunch",
  heroImage: kaijuBanner,

  meta: [
    { icon: <Target size={16} />, label: "Role", value: "Product Design & Full-Stack Dev" },
    { icon: <Calendar size={16} />, label: "Timeline", value: "8–12 weeks (MVP)" },
    { icon: <User size={16} />, label: "Team", value: "Solo" },
    { icon: <Monitor size={16} />, label: "Platform", value: "Mobile-first web app + admin dashboard" },
    { icon: <Layers size={16} />, label: "Project Type", value: "Business SaaS Platform" },
  ],

  overview: {
    description:
      "TrainerLaunch is a mobile-first SaaS platform designed to help independent personal trainers establish a professional online presence, generate qualified leads, and manage their business without relying solely on social media. The project began as a real-world collaboration to help a personal trainer friend who was struggling to attract and convert new clients. Rather than building a one-off website, I expanded the concept into a reusable white-label platform that could serve many trainers while demonstrating full-stack engineering and product design skills.",
    industry: "Health & Fitness / SaaS",
    targetUsers:
      "Independent personal trainers who rely on Instagram, TikTok, and word-of-mouth referrals to find new clients.",
    type: "Business SaaS Platform — mobile-first web app + admin dashboard",
    myRole: "Product Manager, UX Researcher, Product Designer, Frontend Developer, Backend Developer",
    image: earlBjjPhoto,
  },

  problem: {
    description:
      "Independent personal trainers often depend on Instagram, TikTok, Facebook, and word-of-mouth referrals to find new clients. While these channels help build awareness, they rarely provide a structured way to convert visitors into paying customers — and many website builders are either too generic, too expensive, or require more technical knowledge than most trainers possess. The result is a fragmented online presence that makes it harder to establish credibility and grow a sustainable business.",
    problems: [
      "No professional website.",
      "No centralized place to showcase services.",
      "Limited tools for collecting and organizing leads.",
      "Difficulty updating content without technical knowledge.",
      "Inconsistent branding across platforms.",
      "Heavy reliance on third-party social media algorithms.",
    ],
  },

  opportunity: {
    heading: "A digital business toolkit, not another gym website",
    paragraphs: [
      "Instead of creating another generic fitness website, I wanted to build a platform that acts as a digital business toolkit.",
      "The goal became creating a reusable white-label system that allows trainers to quickly launch a premium marketing website while managing leads and content from a simple dashboard.",
      "Rather than replacing social media, TrainerLaunch complements it by serving as the destination where potential clients convert into real business opportunities.",
    ],
  },

  goals: [
    {
      icon: <Target size={18} />,
      title: "Business Goals",
      description:
        "Help trainers generate more qualified leads, improve online credibility, simplify website management, reduce technical barriers, and create one reusable product that can serve multiple trainers.",
    },
    {
      icon: <Users size={18} />,
      title: "Visitor Goals",
      description:
        "Learn about the trainer, understand available services, build trust, view testimonials, and request a consultation in minutes.",
    },
    {
      icon: <LayoutDashboard size={18} />,
      title: "Trainer Goals",
      description:
        "Update website content, add services, manage inquiries, monitor incoming leads, and publish changes without developer assistance.",
    },
  ],

  research: {
    interviewIntro:
      "Initial research focused on conversations with independent personal trainers. These conversations shifted the project from a static marketing site toward a lightweight business platform.",
    quotes: [
      "I don't have time to build a website.",
      "Everything lives on Instagram.",
      "People message me but I lose track of conversations.",
      "Website builders are confusing.",
      "I'm not a designer.",
    ],
    competitiveIntro:
      "I evaluated products including Squarespace, Wix, Trainerize, My PT Hub, Calendly, and Linktree.",
    competitors: ["Squarespace", "Wix", "Trainerize", "My PT Hub", "Calendly", "Linktree"],
    observations: [
      "Squarespace offers beautiful websites but lacks trainer-specific workflows.",
      "Trainerize focuses heavily on coaching and client management but offers limited marketing flexibility.",
      "Linktree organizes links but does not effectively communicate a trainer's value proposition.",
      "No single product effectively combines marketing, branding, and lightweight lead management for solo trainers.",
    ],
  },

  designPrinciples: [
    {
      number: "01",
      title: "Trust First",
      description: "Visitors should immediately perceive the trainer as professional, credible, and approachable.",
    },
    {
      number: "02",
      title: "Mobile First",
      description:
        "Most traffic is expected to come from Instagram, TikTok, QR codes, and social media, making mobile the primary experience.",
    },
    {
      number: "03",
      title: "Simplicity",
      description:
        "Complex configuration options were intentionally avoided. The platform should feel approachable even for non-technical users.",
    },
    {
      number: "04",
      title: "Conversion Focused",
      description: "Every page should naturally guide visitors toward booking a consultation or submitting a lead.",
    },
    {
      number: "05",
      title: "Reusability",
      description:
        "The design system should support multiple trainers through customizable branding while maintaining a consistent user experience.",
    },
  ],

  informationArchitecture: {
    intro:
      "Two connected experiences: a public marketing site for visitors, and a private dashboard for the trainer running it.",
    columns: [
      {
        title: "Public Website",
        items: [
          "Home",
          "About",
          "Services",
          "Program Details",
          "Transformation Gallery",
          "Testimonials",
          "FAQ",
          "Contact",
          "Consultation Request",
        ],
      },
      {
        title: "Trainer Dashboard",
        items: [
          "Dashboard",
          "Leads",
          "Lead Details",
          "Website Editor",
          "Service Management",
          "Media Library",
          "Testimonials",
          "Analytics",
          "Profile Settings",
          "Brand Customization",
          "Publishing",
        ],
      },
    ],
  },

  features: [
    {
      image: kaijuBanner,
      title: "Public Marketing Website",
      description:
        "A responsive marketing experience introducing trainers through storytelling, imagery, testimonials, and service offerings.",
      tag: "Public Site",
    },
    {
      title: "Lead Capture",
      description:
        "Visitors can request consultations using a structured form that stores submissions directly in the trainer dashboard.",
      tag: "Conversion",
    },
    {
      title: "Website Editor",
      description:
        "A simple content management interface lets trainers update text, images, pricing, and services without touching code.",
      tag: "Editor",
    },
    {
      title: "Lead Management",
      description:
        "Incoming inquiries are organized into actionable stages such as New, Contacted, Converted, and Archived.",
      tag: "CRM",
    },
    {
      image: earlBjjPhoto,
      title: "Brand Customization",
      description:
        "Each trainer can personalize colors, typography, logos, imagery, and messaging while maintaining a consistent underlying design system.",
      tag: "Design System",
    },
  ],

  visualDesign: {
    heading: "Positioning the trainer as a premium service provider",
    paragraphs: [
      "The visual identity intentionally avoids stereotypical \"gym\" aesthetics — a warm, slightly-yellow \"paper\" neutral (#F6F4EF) instead of black-and-red, with a single confident emerald accent (#0E9C6E) doing almost all of the branded work.",
      "Manrope carries display type (800-weight headlines running tight, -0.03em tracking) while Inter handles body and UI text — a pairing that reads editorial in headlines but stays efficient in dense dashboard rows.",
      "The goal is to position the trainer as a premium service provider rather than simply someone offering workouts.",
    ],
    tags: [
      "Manrope + Inter pairing",
      "Warm paper neutrals",
      "Single emerald accent",
      "Generous soft rounding",
      "Signature accent glow",
      "Fade-up on scroll",
      "Accessible contrast",
    ],
  },

  techStack: [
    "React / Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "PostgreSQL",
    "JWT Authentication",
    "Vercel",
    "Railway / Render",
    "Supabase",
  ],
  technicalArchitectureIntro:
    "Frontend on React/Next.js with TypeScript, Tailwind, and accessibility-first components. Backend is Node.js/Express with a RESTful API and JWT authentication. PostgreSQL stores Trainers, Services, Leads, Testimonials, and Brand Settings. Frontend deploys to Vercel, the backend to Railway or Render, and the database on Supabase.",

  designSystem: {
    intro:
      "A reusable token library was created to support scalability: a 4px spacing grid, a generous radius scale (10 / 14 / 20 / 26px, plus full-pill for badges and toggles), and warm-tinted elevation shadows with a signature emerald glow reserved for primary CTAs. Indigo marks informational callouts, clay marks pending states — emerald stays the only color that means \"go.\"",
    components: [
      "Button (primary / secondary / tonal / ghost)",
      "Cards",
      "Forms",
      "Navigation",
      "Alerts",
      "Tables",
      "Statistics",
      "Empty states",
      "Loading states",
      "Modals",
      "Mobile navigation",
      "Dashboard widgets",
    ],
  },

  accessibility: [
    { text: "WCAG AA color contrast." },
    { text: "Large touch targets." },
    { text: "Keyboard navigation." },
    { text: "Screen reader labels." },
    { text: "Semantic HTML." },
    { text: "Clear error messaging." },
    { text: "Responsive layouts." },
  ],

  challenges: {
    heading: "Balancing two different experiences",
    paragraphs: [
      "The largest design challenge was balancing two distinct experiences: the public-facing website needed to feel like a premium marketing site focused on storytelling and conversion, while the trainer dashboard needed to prioritize speed, organization, and efficiency.",
      "Creating a cohesive design language that served both experiences without feeling disconnected required a flexible design system and careful information architecture.",
    ],
  },

  outcomes: {
    heading: "From a single favor to a reusable platform",
    paragraphs: [
      "TrainerLaunch demonstrates how thoughtful product design can transform a simple client request into a scalable platform.",
      "The project evolved from building a single website into designing a reusable SaaS product capable of serving many independent trainers.",
      "By focusing on real user needs, scalable architecture, and mobile-first design, the platform provides a strong foundation for future enhancements such as appointment scheduling, online payments, email marketing, and multi-tenant deployments.",
    ],
  },

  reflection: [
    {
      text: "Designing around user workflows rather than individual pages mattered more than expected — building for a real client revealed constraints that don't appear in fictional portfolio projects, including ease of maintenance and simplicity for non-technical users.",
    },
    {
      text: "Treating every project as a product rather than a collection of screens paid off. Approaching TrainerLaunch as a reusable platform pushed design and engineering decisions toward scalability and long-term business value.",
    },
    {
      text: "The public site and trainer dashboard were designed and built without usability testing with real trainers beyond the original client. Next time, I'd validate the dashboard's information architecture with 2-3 other trainers before finalizing it.",
      type: "open",
    },
  ],

  nextSteps: [
    { icon: <Calendar size={14} />, label: "Appointment scheduling" },
    { icon: <CreditCard size={14} />, label: "Stripe-powered payments" },
    { icon: <Mail size={14} />, label: "Email marketing campaigns" },
    { icon: <MessageSquare size={14} />, label: "SMS notifications" },
    { icon: <Sparkles size={14} />, label: "AI-generated marketing copy" },
    { icon: <Search size={14} />, label: "SEO recommendations" },
    { icon: <BarChart3 size={14} />, label: "Analytics dashboards" },
    { icon: <Users size={14} />, label: "Client onboarding flows" },
    { icon: <LayoutTemplate size={14} />, label: "Template marketplace" },
    { icon: <Network size={14} />, label: "Multi-tenant administration" },
  ],

  prototype: {
    url: "/prototypes/trainerlaunch/TrainerLaunch.dc.html",
    label: "TrainerLaunch Prototype",
    description:
      "Click through the public landing page, program pricing, the booking flow, and the trainer's dashboard (leads, lead detail, website editor) exactly as designed. Password-protected.",
  },

  theme: {
    accent: "#0E9C6E",
    glow: "rgba(14,156,110,0.3)",
    badge: "#0A7A57",
    bg: "#F6F4EF",
    surface: "#FFFFFF",
    surface2: "#F2EFE8",
    textPrimary: "#1D1B17",
    textSecondary: "#57534C",
    textMuted: "#8A857D",
    border: "#EDE9E1",
    borderStrong: "#E6E1D8",
  },
};
