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
    coverImage: "/images/blog/dei-rollback-black-tech-2025-banner.png",
    coverImageAlt: "A Black male web developer at a desk with a laptop, looking stressed during a job search",
    relatedPosts: [
      "ai-ease-developer-anxiety",
      "bjj-habits-better-front-end-engineer",
      "why-i-started-training-jiu-jitsu"
    ]
  },

  /**
   * Existing posts below...
   * (Why I Started Jiu-Jitsu, White to Black Belt, BJJ Habits, AI Calm Dev Flow)
   */
  // ... include the rest of your blog posts array here, unchanged ...
];