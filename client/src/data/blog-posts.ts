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
    excerpt: "In 2015, I stepped onto the mats looking for personal growth. Eight years later, I’ve gained more than technique — I’ve rewritten my story, built confidence, and become the man I never had as a role model.",
    content: `
# Why I Started Training Jiu-Jitsu — And How It Changed My Life

This is **Part 1** of my Jiu-Jitsu journey. It’s the story of how I found the Gentle Art and why it became the foundation for everything that came after — including my black belt.

I started training Brazilian Jiu-Jitsu in 2015, right after graduating college.  
It was supposed to be a new chapter, but I felt completely overwhelmed. My friends seemed confident in their career paths while I felt stuck — behind, uncertain, and lacking belief in myself. I wanted that to change. I needed it to change.

## Growing Up Without a Map
I’m an only child, raised in a family of strong, independent women. While I’m grateful for that upbringing, it also meant I didn’t have healthy male role models to lean on. The sports and activities I was pushed toward often had little to do with my true passions.

Like Wu-Tang, I grew up loving Asian culture — martial arts, anime, giant robots, and philosophical storytelling. My world was shaped by shows like *Ultraman*, *Godzilla*, *Cowboy Bebop*, *Outlaw Star*, *Power Rangers*, *Sailor Moon*, and *Gundam*. They sparked a love for mythology and the human experience. But at home, those interests weren’t shared — they often marked me as the “different one.”

## My First Love: Karate
The one time I found a sport I truly loved was when I trained in Karate as a kid. I loved the friendships, the discipline, and the wisdom my instructor shared — especially about how the world would perceive me.

As a big Black kid, I was taught early that my presence could be intimidating whether I meant it to be or not. My instructor’s lessons on accountability weren’t about blame — they were about being intentional, knowing how to protect my peace, and moving through the world with awareness.

But like many kids my size, I was eventually pushed toward football and basketball because “that’s what you’re supposed to do.” I still remember how often people would ask, “What position do you play?” — as if that was the only lane available to me.

## Searching for Something of My Own
I’ve always been aware of my size, careful with my strength, and conscious of how others saw me. Raised by women, I didn’t have the typical roughhousing or brotherly rivalries other boys experienced. It was just me.

After college, stepping into adulthood, I decided to do something purely for myself. I wanted the discipline, challenge, and joy of martial arts back in my life. That search led me to Brazilian Jiu-Jitsu.

## Falling in Love with the Gentle Art
From my first class, I was hooked. Jiu-Jitsu was humbling — an equal playing field where size, strength, and ego could be neutralized by technique and patience. Over the past 8+ years, I’ve learned the “gentle” in Gentle Art isn’t just about physical control.

It’s like a faucet — it’s not about turning your strength fully on or off, but about finding the right flow, the right pressure, at the right time. Jiu-Jitsu taught me that same balance applies to life.

## More Than Just Technique
Training didn’t just make me better at self-defense — it reshaped my boundaries with the world. It made me see where I was letting others define me and where I needed to stand firm.

For years, I avoided connecting with my identity as a Black man because I was warned that being “too Black” could be dangerous. I let people disrespect that part of me for their amusement, and it cost me trust in friendships and in myself.

Through Jiu-Jitsu — and with help from therapy — I learned how to stand in my truth without apology. I learned control, resilience, and self-respect. I became the father and the man I wish I’d had growing up.

## The Gentle Art of Becoming Yourself
What started as a search for personal growth became a blueprint for living. Jiu-Jitsu didn’t just teach me how to fight — it taught me how to show up in life with confidence, humility, and purpose.

I stepped onto the mats looking for a way forward. I found a way home.

---
*Continue the story in [Part 2: From White to Black Belt](/blog/white-to-black-belt-journey-life-career).*
    `,
    publishedAt: "2025-08-14",
    updatedAt: "2025-08-14",
    category: 'bjj',
    featured: true,
    tags: ['Brazilian Jiu-Jitsu', 'Personal Growth', 'Identity', 'Life Lessons'],
    readTime: 7,
    coverImage: "/images/blog/why-i-started-jiu-jitsu.png",
    relatedPosts: ["white-to-black-belt-journey"]
  },
  {
    id: "white-to-black-belt-journey",
    title: "From White to Black: How Jiu-Jitsu Rewired My Life and Career",
    slug: "white-to-black-belt-journey-life-career",
    excerpt: "Part 2 of my Jiu-Jitsu journey — each belt brought lessons in patience, control, service, and quiet confidence that now shape the way I code, lead, and live.",
    content: `
# From White to Black: How Jiu-Jitsu Rewired My Life and Career

This is **Part 2** of my Jiu-Jitsu journey. In [Part 1](/blog/why-i-started-training-jiu-jitsu), I shared how I found the Gentle Art. Here’s what happened across the belts — and how each phase rewired how I approach life and my career.

Earning my black belt is the most meaningful milestone of my life outside becoming a father. Each belt wasn’t just a rank — it was a transformation, personally and professionally.

## White → Blue: Learning to Show Up
Coming from my early days in Karate and my search for personal growth after college, the white belt phase was about consistency. On the mat: survive, learn, and return. At work: tackle unfamiliar stacks, push PRs, ask better questions. Progress was invisible but real.

**Transferable skill:** consistency beats intensity.

## Purple: Boundaries and Control
Like my Karate instructor taught me years ago, boundaries protect your peace. On the mat: position before submission. In code: architecture over hacks, pace over panic.

**Transferable skill:** system > sprint.

## Brown: Leading by Lifting Others
Teaching sharpened my skills. Whether helping a white belt escape mount or guiding a junior dev through a refactor, I learned that clear feedback and calm environments grow strong teams.

**Transferable skill:** leadership = clarity + calm.

## Black: Mastery Through Maintenance
Black belt isn’t magic — it’s years of deliberate practice. Now my job is to make the hard feel simple: in guard, in code, in teams.

**Transferable skill:** mastery is maintenance.

---
*If you haven’t yet, read [Part 1: Why I Started Training Jiu-Jitsu](/blog/why-i-started-training-jiu-jitsu) to see how this journey began.*
    `,
    publishedAt: "2024-01-15",
    updatedAt: "2025-08-14",
    category: 'bjj',
    featured: true,
    tags: ['Brazilian Jiu-Jitsu', 'Career Development', 'Personal Growth', 'Leadership'],
    readTime: 6,
    coverImage: "/images/blog/white-to-black-belt.png",
    relatedPosts: ["why-i-started-jiu-jitsu"]
  },
  {
    id: "bjj-habits-better-engineer",
    title: "5 BJJ Habits That Quiet My Code Chaos",
    slug: "bjj-habits-better-front-end-engineer",
    excerpt: "Breathing, position, drilling, variety, tap-reset — the habits that keep me safe on the mat keep my front-end work clean, fast, and drama-free.",
    content: `
# 5 BJJ Habits That Quiet My Code Chaos

## 1) Breathe First, Then Pass
On the mat: settle, frame, slow the heart rate.  
In code: pause before rushing into a fix.

## 2) Position Before Submission
Secure control; let opportunities open naturally. In code: set solid patterns before optimizing.

## 3) Drill to Kill
Reps build reflexes — whether it’s passing guard or writing tests.

## 4) Roll With Everyone
Variety builds adaptability — train with all styles, pair with all disciplines.

## 5) Tap, Reset, Improve
Mistakes are only fatal if you refuse to learn from them.

---
*Want to feel this mindset in action? Book a session: [Earl the Kaiju Private Lessons](/earldkaiju).*
    `,
    publishedAt: "2024-02-01",
    updatedAt: "2025-08-14",
    category: 'bjj',
    featured: false,
    tags: ['Brazilian Jiu-Jitsu', 'Career Development', 'Engineering', 'Best Practices'],
    readTime: 4,
    coverImage: "/images/blog/bjj-habits-better-engineer.png"
  },
  {
    id: "ai-assisted-calm-developer-flow",
    title: "Tame the Panic: How I Use AI to Lower Dev Stress",
    slug: "ai-ease-developer-anxiety",
    excerpt: "AI won’t fix burnout — but used well, it trims cognitive load, keeps me in flow, and frees focus for the real work. Here’s my playbook + research.",
    content: `
# Tame the Panic: How I Use AI to Lower Dev Stress

Deadlines, reviews, context-switching — the anxiety stack is real. AI won’t replace skill or judgment, but it **can** reduce cognitive load so you keep your head when work gets loud.

## What the Research Says
- GitHub: 87% of Copilot users said it preserved mental effort.  
- EY/Microsoft: 87% reported reduced mental energy on repetitive tasks.  
- Stack Overflow 2024: strong adoption, positive sentiment.

## My Rules
1. Scope small.  
2. Demand explanations.  
3. Never skip tests.  
4. Document the why.

---
*Want a calmer mind and a stronger body? Try a private session: [Earl the Kaiju Private Lessons](/earldkaiju).*
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
