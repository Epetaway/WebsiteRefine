export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;        // ISO
  updatedAt?: string;         // ISO
  category: 'bjj' | 'development' | 'general';
  featured?: boolean;         // optional: ignored by UI (newest wins)
  tags: string[];
  readTime: number;
  coverImage?: string;
  coverImageAlt?: string;     // NEW: better a11y
  relatedPosts?: string[];    // slugs of related posts
}

export const blogPosts: BlogPost[] = [
  {
    id: "why-i-started-jiu-jitsu",
    title: "Why I Started Training Jiu-Jitsu — And How It Changed My Life",
    slug: "why-i-started-training-jiu-jitsu",
    excerpt: "In 2015 I tied my first white belt looking for growth. Years later, I found confidence, boundaries, and a blueprint for becoming the man I needed.",
    content: `
# Why I Started Training Jiu-Jitsu — And How It Changed My Life

I still remember tying my first white belt in **2015**. My friends were sprinting into careers; I felt stuck—behind, unsure, and tired of doubting myself. I stepped on the mats because I needed a new story.

This is **Part 1** of my Jiu-Jitsu journey. It’s the why behind the work, and how the Gentle Art became the foundation for everything that followed—including becoming a father and earning my black belt.

## Growing Up Without a Map
I’m an only child raised by strong, independent women. I’m grateful for that. It also meant no healthy male role models to mirror. I loved **martial arts, anime, and mecha**—*Ultraman, Godzilla, Cowboy Bebop, Outlaw Star, Power Rangers, Sailor Moon, Gundam*. Those worlds taught me discipline and philosophy long before I had the words for it. At home, those interests made me the “different one.”

## My First Love: Karate
As a kid I found Karate. I loved the discipline, the friendships, and the way my instructor taught me to move through the world—especially as a big Black kid. He taught **accountability without shame**: be intentional, control your presence, protect your peace.

Eventually people nudged me toward football and basketball—“What position do you play?”—as if that was the only lane for someone my size.

## Searching for Something of My Own
After college I wanted a practice that was mine. I wanted the structure and joy of martial arts back, but with room to grow **as a person**, not just as an athlete. That search led me to Brazilian Jiu-Jitsu.

## Falling in Love with the Gentle Art
From day one BJJ was humbling. Technique and patience could neutralize size and ego. I learned that “gentle” isn’t weak; it’s **precise**—like a faucet. It’s not on/off; it’s the **right pressure, right time**. That became a life lesson, not just a grappling one.

## More Than Technique: Boundaries & Identity
Training didn’t just sharpen self-defense. It sharpened **boundaries**. For years I softened parts of my identity to be “safer.” Jiu-Jitsu—and therapy—helped me stand in my truth **without apology**. I learned control, resilience, and self-respect. I became the father and man I needed growing up.

## The Gentle Art of Becoming Yourself
What started as a way to get unstuck became a blueprint for living: show up, breathe, focus on position, improve a little every day.

**If you’ve ever felt behind, find a practice that lets you rebuild on purpose.** For me, that was Jiu-Jitsu.

---

*Continue the story in [Part 2: From White to Black Belt](/blog/white-to-black-belt-journey-life-career).*
    `,
    publishedAt: "2025-08-14",
    updatedAt: "2025-09-03",
    category: 'bjj',
    featured: true,
    tags: ['Brazilian Jiu-Jitsu', 'Personal Growth', 'Identity', 'Life Lessons'],
    readTime: 6,
    coverImage: "/images/blog/why-i-started-jiu-jitsu.png",
    coverImageAlt: "Black belt resting on a white gi folded on mats",
    relatedPosts: ["white-to-black-belt-journey-life-career"]
  },
  {
    id: "white-to-black-belt-journey",
    title: "From White to Black: How Jiu-Jitsu Rewired My Life and Career",
    slug: "white-to-black-belt-journey-life-career",
    excerpt: "Each belt rewired something: consistency, boundaries, service, and maintenance. The same rules now shape how I code, lead, and live.",
    content: `
# From White to Black: How Jiu-Jitsu Rewired My Life and Career

This is **Part 2**. In [Part 1](/blog/why-i-started-training-jiu-jitsu), I shared why I started. Here’s what each belt taught me—and how those lessons map 1:1 to engineering and leadership.

---

## White → Blue: **Show Up > Show Off**
**On the mat:** Survive, learn the basics, come back tomorrow.  
**In code:** Ship small PRs, ask better questions, build habits.

> *Anecdote:* Early on, I tracked every round and every lesson in a notes app. That same habit later became my lightweight engineering logs—what I tried, what broke, what worked.

**Transferable:** Consistency beats intensity.

---

## Blue → Purple: **Position Before Submission**
**On the mat:** Control first, then attack.  
**In code:** Architecture before features; patterns before premature optimization.

> *Anecdote:* I once paused a release to refactor a brittle CSS architecture. We lost a day, saved a quarter.

**Transferable:** System > sprint.

---

## Purple → Brown: **Lead by Lifting**
**On the mat:** Teaching tightens your own game.  
**At work:** Mentoring juniors, writing clear docs, and creating calm during chaos make teams faster.

> *Anecdote:* I paired with a new dev through a gnarly responsive bug. We fixed it and kept the pairing slot weekly. Their ramp-up time halved.

**Transferable:** Leadership = clarity + calm.

---

## Brown → Black: **Mastery Is Maintenance**
**On the mat:** Black belt isn’t magic—it’s doing the right things longer and cleaner.  
**In code:** Performance budgets, accessibility checks, test health, CI hygiene.

> *Anecdote:* Our Lighthouse scores didn’t jump from one trick. They climbed because we treated performance like a living bill we pay every sprint.

**Transferable:** Mastery is maintenance.

---

**If you lead teams or code UIs, these belt lessons apply:** protect foundation, invest in people, and treat excellence as a daily practice.

*If you haven’t yet, read [Part 1: Why I Started Training Jiu-Jitsu](/blog/why-i-started-training-jiu-jitsu).*
    `,
    publishedAt: "2024-01-15",
    updatedAt: "2025-09-03",
    category: 'bjj',
    featured: true,
    tags: ['Brazilian Jiu-Jitsu', 'Career Development', 'Leadership', 'Engineering'],
    readTime: 6,
    coverImage: "/images/blog/white-to-black-belt.png",
    coverImageAlt: "Row of jiu-jitsu belts from white to black hanging on a wall",
    relatedPosts: ["why-i-started-training-jiu-jitsu"]
  },
  {
    id: "bjj-habits-better-engineer",
    title: "5 BJJ Habits That Quiet My Code Chaos",
    slug: "bjj-habits-better-front-end-engineer",
    excerpt: "Breathing, position, drilling, variety, tap-reset—habits that keep me safe on the mat also keep my front-end work clean, fast, and drama-free.",
    content: `
# 5 BJJ Habits That Quiet My Code Chaos

<i class="fa-solid fa-wind"></i> **1) Breathe First, Then Pass**  
On the mat: settle, frame, slow the heart rate.  
In code: pause before rushing a fix; define the problem, list constraints, then act.  
*Dev moment:* I write a 3-line “what’s broken / why / first experiment” note before touching code.

<i class="fa-solid fa-shield-alt"></i> **2) Position Before Submission**  
Control beats speed.  
*Dev moment:* Establish layout/system tokens and accessibility patterns **before** animations or micro-optimizations.

<i class="fa-solid fa-sync-alt"></i> **3) Drill to Kill**  
Reps build reflexes.  
*Dev moment:* I keep a sandbox repo for repeatable drills—ARIA patterns, test utils, perf budget checks—so they’re muscle memory on real work.

<i class="fa-solid fa-users"></i> **4) Roll With Everyone**  
Variety builds adaptability.  
*Dev moment:* Pair with designers, QA, and back-end. Seeing different “styles” prevents brittle solutions.

<i class="fa-solid fa-undo"></i> **5) Tap, Reset, Improve**  
Mistakes are data.  
*Dev moment:* We do 10-minute blameless post-mortems for UI bugs: what happened, what guardrail we’ll add, and a tiny PR that codifies the lesson.

---

*Want to feel this mindset in action? Book a session: [Earl the Kaiju Private Lessons](/earldkaiju).*
    `,
    publishedAt: "2024-02-01",
    updatedAt: "2025-09-03",
    category: 'bjj',
    featured: false,
    tags: ['Brazilian Jiu-Jitsu', 'Engineering Practices', 'Front-End', 'Mindset'],
    readTime: 4,
    coverImage: "/images/blog/bjj-habits-better-engineer.png",
    coverImageAlt: "Close-up of a gi sleeve next to a laptop on a desk",
    relatedPosts: ["why-i-started-training-jiu-jitsu", "white-to-black-belt-journey-life-career"]
  },
  {
    id: "ai-assisted-calm-developer-flow",
    title: "How I Use AI to Beat Developer Stress (Without Losing Focus)",
    slug: "ai-ease-developer-anxiety",
    excerpt: "AI won’t fix burnout, but it can trim cognitive load so you keep your head when work gets loud. Here’s my personal playbook—plus what the data says.",
    content: `
# How I Use AI to Beat Developer Stress (Without Losing Focus)

Deadlines, reviews, context-switching—the anxiety stack is real. AI won’t replace judgment, but it **can** reduce cognitive load so you stay present for the real work.

## Where AI Actually Helps Me
- <i class="fa-solid fa-book-open"></i> **Explainers on demand:** Ask for a plain-English summary of unfamiliar APIs, then verify with docs.  
- <i class="fa-solid fa-code"></i> **Scaffold & stub:** Generate test skeletons, types, or repetitive glue code so I save energy for tricky logic.  
- <i class="fa-solid fa-lightbulb"></i> **Option surfacing:** Brainstorm 3–4 implementation paths, then I choose and refine.

## Guardrails I Use
1. <i class="fa-solid fa-compress"></i> **Scope small.** Ask narrow questions and iterate.  
2. <i class="fa-solid fa-question-circle"></i> **Demand reasons.** “Explain why this approach is safer/faster/clearer.”  
3. <i class="fa-solid fa-vial"></i> **Never skip tests.** AI can draft, I own correctness.  
4. <i class="fa-solid fa-file-alt"></i> **Document the why.** I paste the chosen approach + tradeoffs into the PR description.

## A Quick Story
I had a sprint where perf work, a design change, and a bug regression collided. I used AI to:  
- draft a performance test harness,  
- summarize a long design thread into key decisions, and  
- propose 2 refactor paths with tradeoffs.  

**Net result:** I kept my head, shipped the fix, and wrote a clearer PR because my mental energy wasn’t burned on scaffolding.

## Reality Check
AI lightens the load; it doesn’t replace **deep focus**. When it’s time to design systems, name things, or make tradeoffs, I slow down and think.

---

*Want a calmer mind and a stronger body? Try a private session: [Earl the Kaiju Private Lessons](/earldkaiju).*
    `,
    publishedAt: "2025-08-14",
    updatedAt: "2025-09-03",
    category: 'development',
    featured: false,
    tags: ['AI', 'Developer Productivity', 'Anxiety Management', 'Workflow'],
    readTime: 5,
    coverImage: "/images/blog/ai-assisted-calm.png",
    coverImageAlt: "Developer desk with notebook and code editor open at night",
    relatedPosts: ["bjj-habits-better-front-end-engineer"]
  }
];
