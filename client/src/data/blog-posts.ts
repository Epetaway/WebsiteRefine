export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  category: 'bjj' | 'development' | 'general';
  featured: boolean;
  tags: string[];
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "white-to-black-belt-journey",
    title: "From White to Black: How Jiu-Jitsu Rewired My Life and Career",
    slug: "white-to-black-belt-life-career",
    excerpt: "Earning my black belt is the most meaningful milestone of my life outside becoming a father. Here's what changed between white, blue, purple, brown, and black—and why these lessons shape how I write code, lead projects, and show up for people.",
    content: `
# From White to Black: How Jiu-Jitsu Rewired My Life and Career

Earning my black belt is the most meaningful milestone of my life outside becoming a father. Here's what changed between white, blue, purple, brown, and black—and why these lessons shape how I write code, lead projects, and show up for people.

## White → Blue: Self-Discovery

I learned I could do hard things consistently. On the mat that meant showing up; at work it meant taking on unfamiliar stacks and shipping anyway.

The white belt phase taught me that progress isn't always visible. Just like debugging a complex issue, sometimes you're making progress even when it doesn't feel like it. Every tap, every failed technique, every moment of confusion was building something deeper.

## Purple: Boundaries & Control

I stopped muscling through problems. I built systems, respected pace, and focused on position over submission—the engineering version is architecture over hacks.

This is where I learned that technique beats strength, just like clean code beats clever hacks. In both BJJ and development, taking time to build proper foundations saves you from having to force solutions later.

## Brown: Service & Leadership

Teaching others made me sharper. I learned to give clear feedback, protect learning time, and create calm in chaos.

As a brown belt, I started coaching others, which directly translated to mentoring junior engineers. Breaking down complex techniques for beginners taught me how to explain technical concepts clearly and create psychological safety for learning.

## Black: Quiet Confidence

Mastery isn't magic—it's repetition. My job now is to make the hard feel simple: in guard, in code, in teams.

The black belt represents not an end, but a new beginning. It's about making the complex look effortless and helping others find their own path to mastery.

## The Developer Connection

Every principle I learned on the mat has made me a better engineer:

- **Breathing under pressure**: When production is down, staying calm leads to better solutions
- **Systems thinking**: Like guard retention, good architecture is about maintaining advantageous positions
- **Continuous learning**: Every roll teaches something new, just like every code review or project retrospective
- **Ego management**: Being willing to tap out (admit when you're wrong) prevents bigger problems

The journey from white to black belt mirrors the progression from junior to senior engineer. It's not about raw talent—it's about showing up consistently, learning from failures, and developing the judgment to know when to push and when to yield.

---

*Want to start your own BJJ journey? Check out my private lesson offerings at [Earl the Kaiju Private Lessons](/earldkaiju).*
    `,
    publishedAt: "2024-01-15",
    category: 'bjj',
    featured: true,
    tags: ['Brazilian Jiu-Jitsu', 'Career Development', 'Personal Growth', 'Leadership'],
    readTime: 6
  },
  {
    id: "bjj-habits-better-engineer",
    title: "Five BJJ Habits That Make Me a Better Front-End Engineer",
    slug: "bjj-habits-better-engineer",
    excerpt: "From breathing under pressure to drilling fundamentals, Brazilian Jiu-Jitsu has taught me invaluable lessons that directly translate to better code, cleaner architecture, and more effective teamwork.",
    content: `
# Five BJJ Habits That Make Me a Better Front-End Engineer

From breathing under pressure to drilling fundamentals, Brazilian Jiu-Jitsu has taught me invaluable lessons that directly translate to better code, cleaner architecture, and more effective teamwork.

## 1. Breathe First, Then Pass

**On the mat**: When someone has you in a tight position, your first instinct is to panic and muscle out. But experienced grapplers know: breathe first, then find your escape.

**In code**: When faced with a critical bug or tight deadline, I pause and breathe before diving in. This prevents hasty decisions that create technical debt. I write the smallest useful PR instead of trying to fix everything at once.

Instead of rushing into panic-driven solutions that break multiple things, I focus on targeted fixes that solve one problem well.

## 2. Position Before Submission

**On the mat**: In BJJ, you secure a dominant position before attempting a submission. Going for the finish too early often leads to losing everything you've worked for.

**In code**: I prioritize solid architecture before adding features. Building accessible components before visual flourish. Getting the foundation right before optimizing.

## 3. Drill to Kill

**On the mat**: Repetition builds muscle memory. We drill basic movements thousands of times so they become automatic under pressure.

**In code**: I repeat patterns until they become second nature - form validation, API error states, focus management. This consistency reduces bugs and improves team velocity.

## 4. Roll With Everyone

**On the mat**: Training with different body types, skill levels, and styles makes you adaptable. Each partner teaches you something new.

**In code**: I pair with designers, QA, backend engineers. Each perspective improves the final product and diversifies my feedback sources.

## 5. Tap, Reset, Improve

**On the mat**: When caught in a submission, tap early, reset, and try again. No ego, just learning.

**In code**: Post-mortems without blame, iterative improvements, calm problem-solving. Every bug is a learning opportunity, not a failure.

---

*Want to experience these principles firsthand? Check out my private BJJ lesson offerings at [Earl the Kaiju Private Lessons](/earldkaiju) or read more development insights in my blog.*
    `,
    publishedAt: "2024-02-01",
    category: 'bjj',
    featured: true,
    tags: ['Brazilian Jiu-Jitsu', 'Career Development', 'Engineering', 'Best Practices'],
    readTime: 4
  }
];
