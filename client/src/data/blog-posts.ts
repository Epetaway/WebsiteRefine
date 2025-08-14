export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  category: 'bjj' | 'development' | 'general';
  featured: boolean;
  tags: string[];
  readTime: number;
  coverImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "white-to-black-belt-journey",
    title: "From White to Black: How Jiu-Jitsu Rewired My Life and Career",
    slug: "white-to-black-belt-journey-life-career",
    excerpt: "Earning my black belt is the most meaningful milestone of my life outside becoming a father. Here's what changed between belts—and why these lessons shape how I write code, lead projects, and show up for people.",
    content: `
# From White to Black: How Jiu-Jitsu Rewired My Life and Career

Earning my black belt is the most meaningful milestone of my life outside becoming a father. Here's what changed between white, blue, purple, brown, and black—and why these lessons shape how I write code, lead projects, and show up for people.

## White → Blue: Self-Discovery
I learned I could do hard things consistently. On the mat that meant showing up; at work it meant taking on unfamiliar stacks and shipping anyway.

The white belt phase taught me that progress isn't always visible. Just like debugging a complex issue, sometimes you're making progress even when it doesn't feel like it.

## Purple: Boundaries & Control
I stopped muscling through problems. I built systems, respected pace, and focused on position over submission—the engineering version is architecture over hacks.

## Brown: Service & Leadership
Teaching others made me sharper. I learned to give clear feedback, protect learning time, and create calm in chaos.

## Black: Quiet Confidence
Mastery isn't magic—it's repetition. My job now is to make the hard feel simple: in guard, in code, in teams.

## The Developer Connection
Every principle I learned on the mat has made me a better engineer:
- **Breathing under pressure**
- **Systems thinking**
- **Continuous learning**
- **Ego management**

---

*Want to start your own BJJ journey? Check out my private lesson offerings at [Earl the Kaiju Private Lessons](/earldkaiju).*
    `,
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15",
    category: 'bjj',
    featured: true,
    tags: ['Brazilian Jiu-Jitsu', 'Career Development', 'Personal Growth', 'Leadership'],
    readTime: 6,
    coverImage: "/images/blog/white-to-black-belt.png"
  },
  {
    id: "bjj-habits-better-engineer",
    title: "Five BJJ Habits That Make Me a Better Front-End Engineer",
    slug: "bjj-habits-better-front-end-engineer",
    excerpt: "From breathing under pressure to drilling fundamentals, Brazilian Jiu-Jitsu has taught me invaluable lessons that directly translate to better code, cleaner architecture, and more effective teamwork.",
    content: `
# Five BJJ Habits That Make Me a Better Front-End Engineer

## 1. Breathe First, Then Pass
**On the mat**: Stay calm under pressure.  
**In code**: Pause before rushing into fixes.

## 2. Position Before Submission
**On the mat**: Secure dominant position first.  
**In code**: Build a solid foundation before optimizing.

## 3. Drill to Kill
Repetition builds instinct in both BJJ and coding patterns.

## 4. Roll With Everyone
Variety builds adaptability—partners or teammates.

## 5. Tap, Reset, Improve
Learn from mistakes without ego.

---

*Want to experience these principles firsthand? Check out my private BJJ lesson offerings at [Earl the Kaiju Private Lessons](/earldkaiju).*
    `,
    publishedAt: "2024-02-01",
    updatedAt: "2024-02-01",
    category: 'bjj',
    featured: true,
    tags: ['Brazilian Jiu-Jitsu', 'Career Development', 'Engineering', 'Best Practices'],
    readTime: 4,
    coverImage: "/images/blog/bjj-habits-better-engineer.png"
  },
  {
    id: "ai-assisted-calm-developer-flow",
    title: "When AI Screens the Anxiety: How Smart Tools Soothe Developer Stress",
    slug: "ai-ease-developer-anxiety",
    excerpt: "Explore how AI-powered assistants can reduce cognitive load and stress in development workflows—backed by research, curiosity, and practical mindfulness-informed strategies.",
    content: `
# When AI Screens the Anxiety: How Smart Tools Soothe Developer Stress

Developer anxiety is real. Tight deadlines, bugs, and context switching can spiral into pressure. What if part of the solution isn’t harder work—but smarter tools?

## The Cognitive Edge: AI as a Calm Companion
Studies show AI can boost productivity while preserving mental energy. GitHub Copilot users report 87% felt it helped “preserve mental effort” by handling repetitive tasks.

## Beyond Code: AI and Mental Well-Being
Workplace studies link AI adoption to *reduced stress*, especially in knowledge-heavy roles. AI tools can lighten repetitive cognitive burdens.

## Anxiety Meets AI: Balanced and Curious
This isn’t about replacing mindfulness or collaboration, but exploring:
- **Cognitive offloading**
- **Emotional safety net**
- **Mindful pairing**

## Grounded Strategies for Developers
- **Start small**
- **Reflect after the fact**
- **Use AI as a non-judgmental partner**
- **Pair AI use with resilience practices**

---

*Curious to build this curiosity together? Reach out—or try out my private BJJ lessons at [Earl the Kaiju Private Lessons](/earldkaiju).*
    `,
    publishedAt: "2025-08-14",
    updatedAt: "2025-08-14",
    category: 'development',
    featured: false,
    tags: ['AI', 'Developer Anxiety', 'Productivity', 'Mindfulness'],
    readTime: 5,
    coverImage: "/images/blog/ai-assisted-calm.png"
  }
];
