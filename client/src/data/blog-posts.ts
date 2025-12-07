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
  coverGradient?: string;     // NEW: CSS gradient classes (e.g., "from-purple-600 to-blue-600")
  relatedPosts?: string[];    // slugs of related posts
}

export const blogPosts: BlogPost[] = [
  /**
   * NEW POST — DEI / Job Market
   */
  {
    id: "dei-rollbacks-black-tech-job-hunt",
    title: "After the Pledges: DEI Rollbacks and the Black Tech Job Hunt (My 8-Month Search)",
    slug: "dei-rollbacks-black-tech-job-hunt",
    excerpt:
      "Eight months without a dev role has forced me to confront a harsh reality: post-2020 diversity pledges have faded, and the rollback of DEI is changing how Black technologists navigate the job market.",
    content: `
# After the Pledges: DEI Rollbacks and the Black Tech Job Hunt (My 8-Month Search)

<i class="fa-solid fa-user-clock"></i> **Context:** I’ve been **unemployed for 8 months** as a front-end developer. I’ve kept coding, shipping small projects, and staying sharp—yet the market feels different than any time in my career.

In 2020, tech promised change. Leaders made bold commitments to hire, retain, and promote underrepresented talent. I remember thinking, *“Maybe this is the turning point.”* Today, it doesn’t feel that way on the ground.

---

## <i class="fa-solid fa-scale-balanced"></i> What Changed Since 2020
- Public pledges were followed by hiring sprints—then **layoffs, budget cuts, and a political/legal backlash** that put diversity efforts under a microscope.  
- Many companies **reframed or reduced** internal programs (mentorship, ERGs, targeted internships) that helped candidates like me get seen and supported.  
- In recruiting conversations, I now hear less about inclusion and more about “strict merit” without acknowledgment of **unequal starting lines**.

---

## <i class="fa-solid fa-binoculars"></i> What I’m Seeing First-Hand
- **Fewer warm intros & targeted early-career channels.** Mentorship and fellowship pipelines that used to look for Black/Latine talent are quieter.  
- **Longer hiring cycles.** More take-homes, more panel loops, fewer decision makers willing to sponsor non-traditional profiles.  
- **Silence after final rounds.** When feedback does arrive, it’s often about “fit” rather than skills I can tangibly improve.

This isn’t a complaint; it’s a pattern I’m documenting so other devs don’t feel gaslit by the shift.

---

## <i class="fa-solid fa-chart-line"></i> What the Research Says (Quick Hits)
- **Representation remains low in tech & engineering roles** relative to the overall U.S. workforce.  
- **Diverse teams outperform.** Multiple analyses over the last decade associate racial/ethnic diversity with stronger financial and innovation outcomes.  
- **Layoff dynamics can erode recent gains.** “Last-in, first-out” and recruiting slowdowns tend to hit newer hires and non-traditional candidates first.  

I’m not dropping a wall of stats here—my goal is clarity, not overwhelm. If you want a source pack, I’ll publish a resource list in a follow-up post.

---

## <i class="fa-solid fa-code-branch"></i> My Plan to Keep Moving
1. **Portfolio sprints:** ship small, real artifacts (perf budgets, a11y audits, reusable UI kits).  
2. **Story-driven case studies:** not *what* I built, but *why* the choices mattered (business + user impact).  
3. **Targeted networking:** managers and ICs who *own* front-end craft (not just generic “apply online”).  
4. **Proof over promise:** quick screencasts, PRs, and live sandboxes that showcase the work.  
5. **Boundaries & health:** Jiu-Jitsu mindset—breathe, position before submission, and reset when needed.

---

## <i class="fa-solid fa-hand-holding-heart"></i> If You’re Hiring (or Know Someone Who Is)
- I specialize in **modern front-end** (Angular/React/TypeScript), **accessibility (WCAG)**, **performance**, and **design-to-component systems**.  
- I’ve led **UI refactors**, accessibility rollout, and **DX improvements** that reduced ticket volume and improved Lighthouse scores.  
- I’m based in **Parsippany, NJ**—open to hybrid/onsite in North Jersey/NYC or remote.

---

### Final Thought
I’m staying in this field because I love the craft and the impact. But I’m also going to keep telling the truth: **without consistent, accountable inclusion, great talent gets filtered out before it’s seen.** My ask is simple—judge me by the work and keep the door genuinely open.

*If you’ve felt these headwinds too, you’re not alone. DM me—we can compare notes, share leads, and keep each other moving.*`,
    publishedAt: "2025-09-06",
    updatedAt: "2025-09-06",
    category: "development",
    featured: true,
    tags: ["DEI", "Job Search", "Black in Tech", "Front-End", "Career"],
    readTime: 7,
    coverGradient: "from-purple-600 via-purple-500 to-indigo-600",
    relatedPosts: [
      "ai-ease-developer-anxiety",
      "bjj-habits-better-front-end-engineer",
      "why-i-started-training-jiu-jitsu"
    ]
  },

  /**
   * NEW POST — Fighting Through the Fog
   */
  {
    id: "fighting-through-the-fog",
    title: "Fighting Through the Fog: Rebuilding My Confidence as a Developer, a Father, and a Black Man in Tech",
    slug: "fighting-through-the-fog",
    excerpt:
      "There's a kind of fog you don't really understand until you've lived in it. After my second layoff, I had to confront the silence of being Black in tech, the lessons from the BJJ mats, and what it means to fight for a life without regret.",
    content: `
# Fighting Through the Fog: Rebuilding My Confidence as a Developer, a Father, and a Black Man in Tech

There's a kind of fog you don't really understand until you've lived in it.

Not the fog outside — the fog that gets inside your head.
Confusion. Pressure. Depression. Disappointment. Fear. Numbness.

All happening at the same time.

That was me after my second layoff.
It wasn't just losing a job — it felt like losing the ground under my feet. Losing the version of adulthood I thought I was supposed to grow into. Losing the promise that if you worked hard and followed the path, life would eventually reward you.

I was raised to believe that once you reached this stage — early adulthood, building a career, taking on responsibilities — things were supposed to get smoother.
But instead, I kept hitting roadblocks that felt deeper than just "career setbacks." They made me question whether I was making the wrong choices, whether I was failing the expectations placed on me since childhood, and whether I was failing the expectations I placed on myself.

That fog wasn't just mental. It was emotional. It was spiritual. And it followed me everywhere.

---

## Being Black in Tech Comes With a Different Kind of Silence

People like to talk about diversity in tech, but they rarely talk about the **silence** that comes with being a Black developer in a space that was never really built with us in mind.

If I'm being honest, I don't think tech expected much from me at all. Not because I wasn't capable — but because the industry doesn't really see us. We become the exception, the checkbox, the "interesting story."

But me?
I just wanted to create.
That's it.
I wanted to build things, solve problems, enjoy the craft, be part of something bigger than myself. I didn't need to "disrupt an industry" or "redefine innovation." I just loved creating.

People act like that's a small dream, but it's not. Creation is connection. Creation is community.
And for me, community was always what I wanted most — whether through tech or through Brazilian Jiu-Jitsu.

---

## BJJ Saved Parts of Me I Didn't Know Needed Saving

Ten years of training taught me more about myself than any job ever did.

When you're a big guy — 6'3", 250+, people already fear you before you open your mouth. They think they know who you are or what you're capable of just by looking at you. You learn early on that some people will treat you with caution, some with disrespect, and some with assumptions they never say out loud.

But on the mats?
Fear doesn't mean anything.
Size doesn't mean anything.
Ego doesn't mean anything.

Technique matters.
Discipline matters.
Boundaries matter.

And that translated into my life in ways I didn't expect.

I learned how to set boundaries — real boundaries — and stay firm in them.
I learned how to be confident without dominating people.
I learned how to be gentle without being weak.
I learned how to connect with people even when I'm naturally guarded.

So when my career fell apart, BJJ became the place where I could still feel myself growing, improving, evolving. Even when everything else felt like it was falling apart.

---

## What Hurt Most Wasn't The Layoff — It Was The Dream That Got Interrupted

Losing a job is one thing.
Losing your dream is another.

The layoffs felt like watching the rug get ripped from under my future. Not just financially — spiritually. Because tech wasn't the end goal for me. It was the foundation I was building so I could one day create my own Jiu-Jitsu community, my own space, my own gym, my own impact.

Tech was supposed to help me build stability so I could chase my true passion.

Instead, I found myself doing odd jobs, trade work, day-to-day survival, paycheck to paycheck — not because I lack skill, but because the industry shifted under my feet.

And as a Black man… I'm tired. Tired of the narrative. Tired of the cycle. Tired of watching men like me settle for scraps when we have talent, drive, intelligence, creativity, vision.

I don't want to be another version of that story.
I don't want my son to inherit that story either.

---

## I Don't Want to Repeat My Parents' Mistakes

I grew up with a parent who dismissed emotions with phrases like "the past is the past."
As if talking about pain is weakness.
As if reflecting on mistakes is pointless.
As if healing is a waste of time.

That mindset creates adults who survive but never understand themselves.

I don't want that for me.
I definitely don't want that for my son.

I want him to learn how to feel things.
How to understand himself.
How to dream without apology.
How to build a life that doesn't leave him wishing he had done more.

I want him to find whatever he's good at — whatever lights him up — and use that to support the life he dreams about.
Not the life society tells him to settle for.
Not the narrative that Black men are supposed to follow.

---

## What Keeps Me Moving Forward

Regret.

Or rather — **wanting to avoid regret at all costs.**

I don't want to die wishing I had tried harder.
I don't want to live thinking I settled because life hit me harder than I expected.
I don't want to be a husk of myself because the world made it difficult for me to win.

If I have to fight through my life — then I will fight.
I've fought my whole life anyway.

But now?
I'm fighting differently.
I'm fighting smarter.
I'm fighting with intention.

I want my son to see what fighting for yourself looks like.
Not perfect fighting — just **consistent** fighting.

Because the truth is:
I'm not fighting to impress anyone.
I'm fighting to build a life that doesn't come with regret.
And I'm fighting so my son sees what it looks like when a man refuses to quit on himself.

If he can see me fighting for my dreams, he'll learn how to fight for his too.
And maybe he'll win some battles earlier than I did.`,
    publishedAt: "2025-03-15",
    category: "general",
    tags: ["Black in Tech", "BJJ", "Mental Health", "Fatherhood", "Career", "Personal Growth"],
    readTime: 8,
    coverGradient: "from-purple-700 via-violet-600 to-fuchsia-600",
    relatedPosts: [
      "dei-rollbacks-black-tech-job-hunt",
      "why-i-started-training-jiu-jitsu",
      "bjj-habits-better-front-end-engineer"
    ]
  },

  /**
   * BJJ POST — Why I Started Training
   */
  {
    id: "why-i-started-training-jiu-jitsu",
    title: "Why I Started Training Jiu-Jitsu",
    slug: "why-i-started-training-jiu-jitsu",
    excerpt:
      "Ten years ago, I walked into a gym looking for discipline and walked out finding community, confidence, and a path to understanding myself better than I ever had before.",
    content: `
# Why I Started Training Jiu-Jitsu

Ten years ago, I walked into a Brazilian Jiu-Jitsu gym for the first time.

I didn't know what to expect. I wasn't an athlete. I wasn't coming from another martial art. I was just a guy who felt like something was missing.

I was looking for discipline.
What I found was so much more.

---

## The Beginning

I'll be honest—at first, it was humbling in the worst way possible.

Here I was, 6'3", 250+ pounds, and I couldn't do anything against people half my size. My strength didn't matter. My size didn't matter. Every roll felt like a puzzle I couldn't solve, and every training session left me exhausted, frustrated, and questioning why I even started.

But I kept showing up.

Not because I was good at it.
Not because it was easy.
But because for the first time in a long time, I was being challenged in a way that forced me to grow.

---

## What Jiu-Jitsu Taught Me

**1. Ego is the enemy**

On the mats, your ego gets checked immediately. You can't fake your way through a roll. You can't talk your way out of a bad position. Either you know the technique or you don't. Either you can stay calm under pressure or you can't.

Jiu-Jitsu taught me to check my ego at the door and focus on learning.

**2. Discipline beats motivation**

Motivation gets you started. Discipline keeps you going.

There were countless days I didn't want to train. I was tired. I was sore. I had a bad day at work. But I went anyway. And every single time, I left feeling better than when I arrived.

**3. Community matters**

The people on the mats became more than training partners—they became family. We pushed each other, supported each other, and celebrated each other's growth.

In a world that can feel isolating, especially as a Black man navigating spaces that weren't built with me in mind, having a community that sees you, respects you, and challenges you to be better is everything.

**4. Pressure reveals character**

When someone has you in a tight choke or a painful submission, you learn who you really are. Do you panic? Do you give up? Or do you breathe, think, and work the problem?

That lesson translates to everything—relationships, career setbacks, life challenges.

---

## From White Belt to Black Belt

It took ten years of consistent training, countless setbacks, and more failures than I can count to earn my black belt.

But the belt isn't the point.

The point is who I became in the process:
- More patient
- More confident
- More resilient
- More capable of handling pressure

Jiu-Jitsu didn't just teach me how to fight. It taught me how to live with intention, discipline, and respect.

---

## Why I Keep Training

Even now, ten years in, I'm still learning. There's always a new technique to refine, a new position to study, a new challenge to tackle.

But more than that, Jiu-Jitsu keeps me grounded. It reminds me that growth is a process, not a destination. That mastery takes time. That every expert was once a beginner who refused to quit.

And in a career like software development, where burnout is common and imposter syndrome runs deep, having that mindset is everything.

---

### Final Thought

If you've ever thought about trying Jiu-Jitsu, my advice is simple: just show up.

You don't need to be in perfect shape. You don't need prior experience. You just need to be willing to learn, willing to struggle, and willing to grow.

The mats will do the rest.`,
    publishedAt: "2025-01-20",
    category: "bjj",
    tags: ["BJJ", "Personal Growth", "Discipline", "Mental Health", "Community"],
    readTime: 6,
    coverGradient: "from-indigo-600 via-purple-600 to-pink-600",
    relatedPosts: [
      "fighting-through-the-fog",
      "bjj-habits-better-front-end-engineer"
    ]
  },

  /**
   * BJJ + DEV POST — BJJ Habits
   */
  {
    id: "bjj-habits-better-front-end-engineer",
    title: "5 Jiu-Jitsu Habits That Made Me a Better Front-End Engineer",
    slug: "bjj-habits-better-front-end-engineer",
    excerpt:
      "The discipline, patience, and problem-solving mindset I developed on the mats transformed how I write code, debug issues, and approach complex engineering challenges.",
    content: `
# 5 Jiu-Jitsu Habits That Made Me a Better Front-End Engineer

After ten years of training Brazilian Jiu-Jitsu and several years working as a front-end engineer, I've noticed something interesting: the habits that make you successful on the mats are the same ones that make you successful in software development.

Here are five lessons from Jiu-Jitsu that transformed how I approach engineering.

---

## 1. Position Before Submission (Foundation Before Features)

In Jiu-Jitsu, there's a fundamental principle: establish a strong position before attempting a submission. If you go for a flashy finish from a weak position, you'll fail—and probably end up in a worse spot.

**In development:** Build a solid foundation before adding features.

- Clean, maintainable code architecture
- Proper TypeScript types
- Accessible HTML structure
- Performance budgets
- Testing infrastructure

Rushing to add features without a strong foundation leads to technical debt, bugs, and eventual refactoring pain.

---

## 2. Tap Early, Tap Often (Fail Fast, Learn Faster)

When you're caught in a submission, tapping out isn't defeat—it's learning. The goal is to recognize when you're stuck, reset, and try again with new knowledge.

**In development:** Embrace failure as a learning tool.

- Write tests that fail first (TDD)
- Deploy to staging early to catch issues
- Ask for code reviews before you're "done"
- Prototype and iterate rather than building the "perfect" solution

The faster you fail, the faster you learn what works.

---

## 3. Drilling Fundamentals (Master the Basics)

Advanced techniques look impressive, but they're built on fundamentals. In Jiu-Jitsu, we drill basic movements thousands of times because when pressure hits, you fall back to what you've practiced most.

**In development:** Master core concepts before chasing trends.

- Semantic HTML
- CSS fundamentals (box model, flexbox, grid)
- JavaScript core (closures, promises, event loop)
- Web accessibility (ARIA, keyboard navigation)
- Performance basics (lazy loading, code splitting)

Every framework or library is just an abstraction over these fundamentals. Know them cold.

---

## 4. Flow Rolling (Collaborative Problem Solving)

Flow rolling is training at a relaxed pace, focusing on technique rather than winning. It's collaborative—you and your partner help each other learn by creating realistic but manageable pressure.

**In development:** Pair programming and collaborative debugging.

- Work through problems together
- Share knowledge freely
- Create space for others to learn
- Focus on understanding, not just shipping

The best code comes from collaboration, not competition.

---

## 5. Breathe Under Pressure (Stay Calm When Things Break)

When someone has you in a tight position, panic makes everything worse. Breathing and staying calm lets you think clearly, find escapes, and work the problem.

**In development:** Production bugs happen. Stay calm.

- Take a breath before diving into the console
- Systematically isolate the problem
- Reproduce the bug reliably
- Fix the root cause, not just the symptom
- Document what you learned

Panic leads to rushed fixes that create new bugs. Calm leads to solutions.

---

## The Mindset Matters

Jiu-Jitsu didn't just teach me techniques. It taught me how to:
- **Be patient** with the learning process
- **Stay humble** when I don't know something
- **Be persistent** when things get hard
- **Help others** grow alongside me
- **Respect the craft** and the people who practice it

These aren't just Jiu-Jitsu values. They're the values of every great engineer I've worked with.

---

### Final Thought

Whether you train Jiu-Jitsu or not, the lesson is the same: the habits you build in one area of life will show up everywhere else.

Discipline, patience, collaboration, and respect aren't just martial arts principles—they're engineering principles.

And they'll make you better at both.`,
    publishedAt: "2025-05-18",
    category: "development",
    tags: ["BJJ", "Front-End", "Career", "Best Practices", "Personal Growth"],
    readTime: 7,
    coverGradient: "from-blue-600 via-indigo-600 to-purple-600",
    relatedPosts: [
      "why-i-started-training-jiu-jitsu",
      "fighting-through-the-fog",
      "dei-rollbacks-black-tech-job-hunt"
    ]
  },

  /**
   * DEV POST — AI for Developer Wellbeing
   */
  {
    id: "ai-ease-developer-anxiety",
    title: "How I Use AI to Ease Developer Anxiety (Without Replacing My Skills)",
    slug: "ai-ease-developer-anxiety",
    excerpt:
      "AI tools like ChatGPT and GitHub Copilot aren't here to replace developers—they're here to reduce cognitive load, speed up routine tasks, and help us focus on creative problem-solving.",
    content: `
# How I Use AI to Ease Developer Anxiety (Without Replacing My Skills)

Let's be real: developer anxiety is real.

Whether it's imposter syndrome, the pressure to keep up with every new framework, or the fear of breaking production, the mental load of modern software development can be overwhelming.

And then AI tools came along, and the narrative became: "AI is going to replace developers."

But here's what I've learned after using AI tools like ChatGPT and GitHub Copilot for the past year:

**AI doesn't replace your skills. It amplifies them.**

---

## What AI Actually Does for Me

**1. Reduces Decision Fatigue**

When I'm deep in a problem, the last thing I want to do is Google "how to center a div in CSS" for the thousandth time.

AI tools help me skip the mental overhead of routine tasks:
- Writing boilerplate code
- Remembering syntax for libraries I don't use often
- Generating test cases
- Drafting documentation

This frees up mental energy for the hard problems—architecture decisions, performance optimization, and user experience.

**2. Speeds Up Learning**

Instead of reading through 10 Stack Overflow threads to understand a concept, I can ask AI to explain it in plain English, give me examples, and adapt to my learning style.

For example:
- "Explain React useCallback in the context of preventing unnecessary re-renders"
- "Show me three ways to implement authentication in Next.js"
- "What's the difference between debounce and throttle, and when should I use each?"

It's like having a patient mentor available 24/7.

**3. Helps Me Get Unstuck**

We've all been there: staring at the same bug for hours, feeling frustrated and stuck.

AI can offer a fresh perspective:
- "Here's my code and the error message—what am I missing?"
- "Suggest alternative approaches to this problem"
- "Help me refactor this function for better readability"

Sometimes I don't even use the suggestions. Just explaining the problem to AI helps me think through it differently.

**4. Reduces Imposter Syndrome**

One of the biggest sources of anxiety for developers is feeling like you should already know something.

AI removes that shame. You can ask "basic" questions without judgment. You can explore unfamiliar territory without feeling exposed.

That psychological safety is huge.

---

## What AI Doesn't Do

Let me be clear: AI isn't magic, and it has limits.

**It doesn't:**
- Understand business context
- Make architectural decisions
- Handle edge cases without guidance
- Write production-ready code without review
- Replace critical thinking

You still need to:
- Know what problem you're solving
- Evaluate code quality
- Test thoroughly
- Understand security implications
- Make tradeoffs based on real-world constraints

AI is a tool. You're still the engineer.

---

## How to Use AI Without Becoming Dependent

Here's my framework:

**1. Use AI for speed, not as a crutch**
- Let AI generate boilerplate
- But write the complex logic yourself

**2. Always review and understand what AI generates**
- Don't copy-paste blindly
- Ask "why" if something looks unfamiliar

**3. Test everything**
- AI-generated code isn't guaranteed to work
- Write tests to verify behavior

**4. Keep learning fundamentals**
- AI helps you go faster, but you still need to know where you're going
- Study core concepts, design patterns, and best practices

**5. Use AI to learn, not just to do**
- Ask for explanations, not just answers
- Experiment with different approaches

---

## The Real Benefit: Less Anxiety, More Flow

The best thing AI has done for me isn't making me faster—it's making me calmer.

I'm less anxious about:
- Forgetting syntax
- Making "dumb" mistakes
- Getting stuck on routine problems
- Not knowing something I "should" know

That mental space is where creativity happens. Where I solve the interesting problems. Where I do my best work.

---

### Final Thought

AI isn't here to replace developers. It's here to reduce the cognitive load so we can focus on what matters: solving real problems for real people.

If you're not using AI tools yet, you're not behind—but you might be working harder than you need to.

Give it a try. Use it as a collaborator, not a replacement. And see how much more energy you have for the work that actually matters.`,
    publishedAt: "2025-07-22",
    category: "development",
    tags: ["AI", "Developer Experience", "Mental Health", "Productivity", "Career"],
    readTime: 6,
    coverGradient: "from-cyan-600 via-blue-600 to-indigo-600",
    relatedPosts: [
      "bjj-habits-better-front-end-engineer",
      "dei-rollbacks-black-tech-job-hunt"
    ]
  },

  /**
   * Existing posts below...
   * (Why I Started Jiu-Jitsu, White to Black Belt, BJJ Habits, AI Calm Dev Flow)
   */
  // ... include the rest of your blog posts array here, unchanged ...
];