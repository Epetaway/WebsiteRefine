import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Brain, Eye, Layers, ArrowRight, Search, Lightbulb, Hammer, RefreshCw } from "lucide-react";

export default function Approach() {
  return (
    <>
      <Helmet>
        <title>Approach | Earl Hickson Jr. — Frontend Engineer & Product Thinker</title>
        <meta
          name="description"
          content="How I think about users, systems, and interfaces. A product-minded, HCI-focused approach to frontend engineering that prioritizes behavior, clarity, and long-term value."
        />
        <link rel="canonical" href="https://www.ehicksonjr.com/approach" />
      </Helmet>

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section className="bg-[#0D0D0D] py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] w-full px-5">
          <ScrollReveal animation="slide-up">
            <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">My Approach</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white -tracking-[0.03em] leading-[1.1] max-w-3xl mb-6">
              Designing for people, not just screens.
            </h1>
            <p className="text-xl text-[#B7B7B7] max-w-2xl leading-relaxed">
              I'm a frontend engineer with a product-thinker mindset. I don't just translate designs into code — I think about why the interface exists, who it's for, and how it shapes behavior.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── HOW I THINK ABOUT USERS ──────────────────────────────────────── */}
      <section className="bg-[#0D0D0D] py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] w-full px-5">
        <ScrollReveal animation="slide-up">
          <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">User-Centered Thinking</p>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-display text-4xl font-bold text-white -tracking-[0.03em] leading-[1.1] mb-6">
                How I think about users
              </h2>
              <p className="text-[#B7B7B7] text-lg leading-relaxed mb-4">
                Most UX thinking stops at clicks and flows. I go deeper — into how interfaces influence the decisions people make, the trust they build, and the habits they form.
              </p>
              <p className="text-[#7A7A7A] leading-relaxed">
                I'm especially interested in how design shapes behavior — not just engagement, but decision-making, trust, and long-term value. That's the lens I bring to every product I build.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Brain, title: "Behavior over clicks", desc: "Understanding what users are actually trying to accomplish — not just what they tap." },
                { icon: Eye, title: "Cognitive load", desc: "Reducing the mental effort required to use a system so users can focus on their goals." },
                { icon: Layers, title: "Decision-making", desc: "Designing flows that guide users toward good decisions without manipulation or friction." },
                { icon: Search, title: "Trust by default", desc: "Building interfaces where users feel in control, informed, and respected at every step." },
              ].map(({ icon: Icon, title, desc }, idx) => (
                <ScrollReveal key={idx} animation="slide-up" delay={idx * 60}>
                  <div className="bg-[#0D0D0D] border border-[#20252A] rounded-xl p-5 hover:border-violet-500/40 smooth-card">
                    <Icon className="w-5 h-5 text-violet-400 mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
                    <p className="text-xs text-[#7A7A7A] leading-relaxed">{desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
        </div>
      </section>

      {/* ── DESIGN PHILOSOPHY ────────────────────────────────────────────── */}
      <section className="bg-[#0D0D0D] py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] w-full px-5">
        <ScrollReveal animation="slide-up">
          <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">Design Philosophy</p>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl font-bold text-white -tracking-[0.03em] leading-[1.1] mb-8">
              My design philosophy
            </h2>
            <blockquote className="border-l-2 border-violet-500 pl-6 mb-8">
              <p className="text-2xl text-[#E5E5E5] font-medium leading-relaxed italic">
                "Technology shouldn't trap users — it should help them think clearly, act intentionally, and feel in control."
              </p>
            </blockquote>
            <p className="text-[#B7B7B7] text-lg leading-relaxed mb-4">
              I believe the best interfaces are invisible. They get out of the way of what the user is trying to do. They don't add friction, create anxiety, or exploit attention. They work with the user — not against them.
            </p>
            <p className="text-[#7A7A7A] leading-relaxed">
              That philosophy drives every decision I make: from how I structure a component hierarchy, to how I name UI states, to how I think about what a loading spinner communicates to a user who's waiting.
            </p>
          </div>
        </ScrollReveal>
        </div>
      </section>

      {/* ── SYSTEMS THINKING ─────────────────────────────────────────────── */}
      <section className="bg-[#0D0D0D] py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] w-full px-5">
        <ScrollReveal animation="slide-up">
          <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">Systems Thinking</p>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-display text-4xl font-bold text-white -tracking-[0.03em] leading-[1.1] mb-6">
                I build systems, not just screens
              </h2>
              <p className="text-[#B7B7B7] text-lg leading-relaxed mb-4">
                Every interface I build exists inside a larger system — a team, a product, an organization, and a set of user expectations. I think at all of those levels at once.
              </p>
              <p className="text-[#7A7A7A] leading-relaxed">
                That mindset comes directly from real-world experience building under constraints that matter.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  company: "Asembia — Healthcare UX",
                  detail: "Built HIPAA-compliant patient portals where every UX decision carried real-world consequence. Accessibility wasn't a checkbox — it was a patient's ability to manage their prescriptions.",
                },
                {
                  company: "BroadcastMed — Marketing Systems",
                  detail: "Designed and built healthcare marketing microsites at scale. Reduced email production time by 25% and increased lead submissions by 18% through a structured design system.",
                },
              ].map(({ company, detail }, idx) => (
                <ScrollReveal key={idx} animation="slide-up" delay={idx * 60}>
                  <div className="bg-[#0D0D0D] border border-[#20252A] rounded-xl p-5 hover:border-violet-500/40 smooth-card">
                    <p className="text-sm font-semibold text-violet-400 mb-2">{company}</p>
                    <p className="text-sm text-[#7A7A7A] leading-relaxed">{detail}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0D0D0D] py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] w-full px-5">
        <ScrollReveal animation="slide-up">
          <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">Process</p>
          <h2 className="font-display text-4xl font-bold text-white -tracking-[0.03em] leading-[1.1] mb-10 max-w-xl">
            How I move from problem to product
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: Search,
              step: "01",
              title: "Understand",
              desc: "I research users, contexts, and behaviors to uncover real problems — not assumed ones.",
            },
            {
              icon: Lightbulb,
              step: "02",
              title: "Think",
              desc: "I translate insights into flows, systems, and interface strategies before writing a line of code.",
            },
            {
              icon: Hammer,
              step: "03",
              title: "Build",
              desc: "I engineer accessible, performant, and scalable frontend solutions with clean architecture.",
            },
            {
              icon: RefreshCw,
              step: "04",
              title: "Iterate",
              desc: "I measure, learn, and refine to continuously improve impact — shipping isn't the end.",
            },
          ].map(({ icon: Icon, step, title, desc }, idx) => (
            <ScrollReveal key={idx} animation="slide-up" delay={idx * 80}>
              <div className="bg-[#111111] border border-[#20252A] rounded-xl p-6 hover:border-violet-500/40 smooth-card h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-violet-500">{step}</span>
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#7A7A7A] leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0D0D0D] via-violet-950/30 to-[#0D0D0D]">
        <div className="mx-auto max-w-[1120px] w-full px-5 py-20">
          <ScrollReveal animation="slide-up">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-bold text-white -tracking-[0.03em] leading-[1.1] mb-4">
                Let's work together
              </h2>
              <p className="text-[#B7B7B7] text-lg leading-relaxed mb-8">
                If you're building a product that needs a thoughtful engineer — someone who thinks about users, systems, and impact — I'd love to connect.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
                >
                  Get In Touch <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#363C42] hover:border-violet-500/60 text-[#B7B7B7] hover:text-white font-medium transition-colors"
                >
                  See My Work <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
