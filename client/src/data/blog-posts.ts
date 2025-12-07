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
   * Existing posts below...
   * (Why I Started Jiu-Jitsu, White to Black Belt, BJJ Habits, AI Calm Dev Flow)
   */
  // ... include the rest of your blog posts array here, unchanged ...
];