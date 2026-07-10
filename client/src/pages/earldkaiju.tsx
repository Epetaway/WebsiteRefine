import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  insertBjjBookingSchema,
  type InsertBjjBooking,
  type SocialMediaPost,
} from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import kaijuBanner from "@/images/kaiju-banner.png";
import kaijuWordmark from "@/images/kaiju-logo.png";
import earlBjjPhoto from "@/images/earl-bjj-photo.png";
import bjjAccomplishments from "@/data/bjj-accomplishments.json";

import Testimonials from "@/components/ui/testimonials-carousel";

const KAIJU_GREEN = "var(--kaiju-green, #86d64a)";
const KAIJU_GREEN_20 = "var(--kaiju-green-20, rgba(134,214,74,.2))";

// Public-site sections, mirroring the IA a TrainerLaunch trainer site publishes:
// Home -> Services -> Program Details -> Gallery -> About -> Testimonials -> FAQ -> Book
const SITE_NAV = [
  { id: "services", label: "Services" },
  { id: "program", label: "Program" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
];

const FOCUS_AREAS = ["Lapel Guard", "Half Guard", "Inversions", "Wrestling", "Judo", "Pressure Passing"];

const FAQS = [
  {
    q: "Do I need any prior experience?",
    a: "No experience required. Sessions are private or small-group, so they're built around your pace instead of a fixed curriculum — total beginners and active competitors both get real training time.",
  },
  {
    q: "What should I wear to my first lesson?",
    a: "Comfortable athletic clothes (shorts or leggings plus a rash guard or t-shirt) are fine to start. If a session calls for gi work, I'll let you know beforehand — no need to buy gear before your first lesson.",
  },
  {
    q: "What ages do you coach?",
    a: "Kids as young as 5 (see the Parent & Me package), teens, and adults. Programs are matched to age and goals rather than one class for everyone.",
  },
  {
    q: "Where do lessons happen?",
    a: "Private and semi-private sessions are based in the Parsippany, NJ area. Exact location details are confirmed once you book.",
  },
  {
    q: "How does booking actually work?",
    a: "Fill out the form below with your goals and availability. I text and email every request back within 24 hours to confirm a time.",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function EarldKaiju() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Booking form
  const form = useForm<InsertBjjBooking>({
    resolver: zodResolver(insertBjjBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      program: "",
      goals: "",
      availability: "",
      smsConsent: false,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBjjBooking) =>
      (await apiRequest("POST", "/api/bjj-booking", data)).json(),
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Booking Request Submitted!",
        description: "I'll text and email you within 24 hours to confirm.",
      });
      form.reset();
    },
    onError: (err: any) =>
      toast({
        title: "Submission Failed",
        description: err?.message ?? "Please try again.",
        variant: "destructive",
      }),
    onSettled: () => setIsSubmitting(false),
  });
  const onSubmit = (data: InsertBjjBooking) => { setIsSubmitting(true); bookingMutation.mutate(data); };

  // Social media (YouTube)
  const { data: socialMediaData, isLoading: socialMediaLoading } = useQuery({
    queryKey: ["/api/social-media"],
    refetchInterval: 5 * 60 * 1000,
  });
  const posts: SocialMediaPost[] = (socialMediaData as any)?.posts || [];
  const youtubePosts = posts.filter((p) => p.platform === "youtube");
  const fetchIG = useMutation({
    mutationFn: () => apiRequest("POST", "/api/social-media/fetch-instagram", {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/social-media"] }),
  });
  const fetchYT = useMutation({
    mutationFn: () => apiRequest("POST", "/api/social-media/fetch-youtube", {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/social-media"] }),
  });
  const hasAttemptedSocialFetch = useRef(false);
  useEffect(() => {
    if (socialMediaLoading || posts.length > 0 || hasAttemptedSocialFetch.current) return;
    hasAttemptedSocialFetch.current = true;
    fetchIG.mutate();
    fetchYT.mutate();
  }, [socialMediaLoading, posts.length, fetchIG, fetchYT]);

  // medals
  const golds = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Gold").length;
  const silvers = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Silver").length;
  const bronzes = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Bronze").length;

  return (
    <div className="bg-black text-white">
      <Helmet>
        <title>Earl the Kaiju | Private BJJ Lessons – Parsippany, NJ</title>
        <meta
          name="description"
          content="Private Brazilian Jiu-Jitsu coaching in Parsippany, NJ with Black Belt instructor Earl “The Kaiju” Hickson. First lesson just $50. Serving kids, parents & adults."
        />
      </Helmet>

      {/* HERO */}
      <section id="home" className="relative py-16 md:py-20">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url(${kaijuBanner})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src={kaijuWordmark}
            alt="Earl the Kaiju wordmark"
            className="w-56 sm:w-64 md:w-72 lg:w-80 mb-5"
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl">
            Private Brazilian Jiu-Jitsu Coaching with Earl “The Kaiju” Hickson — Parsippany, NJ
          </h1>
          <p className="mt-3 text-base sm:text-lg font-semibold" style={{ color: KAIJU_GREEN }}>
            Black Belt Expertise. First Private Lesson Just $50 (limited-time offer).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="text-black"
              style={{ backgroundColor: KAIJU_GREEN }}
              onClick={() => scrollToId("booking")}
            >
              <i className="fa-solid fa-calendar-days mr-2" />
              Book Your Lesson
            </Button>
            <a href="mailto:e@ehicksonjr.com" className="inline-flex items-center px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <i className="fa-regular fa-envelope mr-2" />
              Email Me
            </a>
          </div>
        </div>
      </section>

      {/* SITE NAV — mirrors a TrainerLaunch public-site nav (Services / Program / Gallery / About / Testimonials / FAQ) */}
      <nav aria-label="Page sections" className="border-y border-white/10 bg-black/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-gray-300">
          {SITE_NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToId("booking")}
            className="ml-auto inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold text-black"
            style={{ backgroundColor: KAIJU_GREEN }}
          >
            Book Now
          </button>
        </div>
      </nav>

      {/* BOOKING FORM / CONSULTATION REQUEST */}
      <section id="booking" className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 bg-white/[0.06] shadow-2xl shadow-black/40">
            <h2 className="text-xl font-bold mb-6" style={{ color: KAIJU_GREEN }}>Request a Session</h2>

            {isSubmitted ? (
              <div className="py-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: KAIJU_GREEN_20 }}>
                  <i className="fa-solid fa-check text-3xl" style={{ color: KAIJU_GREEN }} />
                </div>
                <p className="text-lg font-semibold">Thanks! I’ll confirm within 24 hours.</p>
                <Button className="mt-4 text-black" style={{ backgroundColor: KAIJU_GREEN }} onClick={() => setIsSubmitted(false)}>
                  Book Another
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-3">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <FormField name="name" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Full Name *</FormLabel>
                        <FormControl><Input {...field} className="bg-white/10 focus:bg-white/15" placeholder="Your name" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="email" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email *</FormLabel>
                        <FormControl><Input type="email" {...field} className="bg-white/10 focus:bg-white/15" placeholder="you@email.com" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="phone" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Phone *</FormLabel>
                        <FormControl><Input type="tel" {...field} className="bg-white/10 focus:bg-white/15" placeholder="(555) 123-4567" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="program" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Program</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/10">
                              <SelectValue placeholder="Choose an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="adult-1on1">Private (Adult) — $60/hr</SelectItem>
                            <SelectItem value="adult-intro">Intro Offer — First session $50</SelectItem>
                            <SelectItem value="semi-private">Semi-Private (2–4) — from $40/person</SelectItem>
                            <SelectItem value="kids">Kids — Trial $70</SelectItem>
                            <SelectItem value="parent-me">Parent & Me — $200 (4 weeks)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    <FormField name="goals" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Goals & Experience</FormLabel>
                        <FormControl>
                          <Textarea
                            className="bg-white/10 focus:bg-white/15"
                            placeholder="Tell me about your goals, previous experience, injuries, or questions..."
                            rows={10}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            onBlur={field.onBlur}
                            name={field.name}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-4 flex flex-col">
                    <FormField name="availability" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Preferred Times</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white/10 focus:bg-white/15"
                            placeholder="e.g., Weekday evenings, Saturday mornings"
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            onBlur={field.onBlur}
                            name={field.name}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="smsConsent" control={form.control} render={({ field }) => (
                      <FormItem className="flex items-start space-x-3">
                        <FormControl>
                          <Checkbox checked={!!field.value} onCheckedChange={field.onChange} className="bg-white/10" />
                        </FormControl>
                        <FormLabel className="text-sm text-gray-300">
                          I agree to receive texts about scheduling and training updates. Reply STOP to opt out.
                        </FormLabel>
                      </FormItem>
                    )} />
                    <div className="mt-auto">
                      <Button type="submit" disabled={isSubmitting || bookingMutation.isPending} className="w-full text-black" style={{ backgroundColor: KAIJU_GREEN }}>
                        {isSubmitting || bookingMutation.isPending ? "Submitting…" : "Request Session"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: KAIJU_GREEN }}>Services</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Pick the format that fits you</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: "Private Lessons (1-on-1)",
                copy:
                  "Tailored coaching focused on self-defense fundamentals, positional awareness, and technique progression. Great for beginners, hobbyists, and competitors.",
                rows: [
                  ["Price", "$60 / hour"],
                  ["Intro Offer", "$50 (one-time)"],
                ],
              },
              {
                title: "Semi-Private (2–4 people)",
                copy:
                  "Train with a friend or small group. You’ll share drilling time, get individualized feedback, and split the cost.",
                rows: [["Price", "$40 per person"]],
              },
              {
                title: "Parent & Me Package",
                copy:
                  "Ages 5–8. A 4-week bonding series that introduces safety, confidence, and fun movement patterns you can practice together.",
                rows: [["Price", "$200 total"]],
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 bg-white border border-black/5 shadow-sm flex flex-col"
              >
                <h3 className="font-bold text-lg text-slate-900">{card.title}</h3>
                <p className="text-sm mt-2 text-slate-700">{card.copy}</p>

                <div className="mt-4 text-sm space-y-2">
                  {card.rows.map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-600">{k}</span>
                      <span className="font-semibold text-slate-900">{v}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="mt-auto text-black"
                  style={{ backgroundColor: KAIJU_GREEN }}
                  onClick={() => scrollToId("booking")}
                >
                  Book
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM DETAILS */}
      <section id="program" className="py-14 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: KAIJU_GREEN }}>Program Details</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How training works</h2>
            <ul className="space-y-4 text-gray-200">
              <li className="flex gap-3">
                <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: KAIJU_GREEN }} />
                <span><strong className="text-white">Format:</strong> 1-on-1 or small-group (2–4), scheduled around your availability — no fixed class times to work around.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: KAIJU_GREEN }} />
                <span><strong className="text-white">Who it's for:</strong> total beginners, hobbyists, and active competitors prepping for tournaments.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: KAIJU_GREEN }} />
                <span><strong className="text-white">What you'll build:</strong> technical fundamentals, live-rolling confidence, and a game plan suited to your body type and goals.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: KAIJU_GREEN }} />
                <span><strong className="text-white">Coaching style:</strong> establish boundaries early, slow the fight down, and create advantages before adding speed.</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: KAIJU_GREEN }}>Focus Areas</p>
            <h3 className="text-lg font-semibold mb-4">What we drill</h3>
            <div className="flex flex-wrap gap-2">
              {FOCUS_AREAS.map((t) => (
                <span key={t} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: KAIJU_GREEN, backgroundColor: KAIJU_GREEN_20 }}>
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-4 text-gray-300 leading-relaxed">
              My game: establish boundaries early, slow the fight, and create advantages using <strong>lapel guard</strong>, <strong>half guard</strong>, <strong>inversions</strong>, <strong>wrestling</strong>, and a touch of <strong>judo</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* RESULTS & TRAINING GALLERY */}
      <section id="gallery" className="py-14 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: KAIJU_GREEN }}>Gallery</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Results & training gallery</h2>

          <div className="grid grid-cols-3 gap-3 max-w-md mb-8">
            <div className="rounded-xl p-4 text-center bg-white/[0.06] shadow-lg shadow-black/40">
              <div className="text-2xl font-bold text-yellow-400">{golds}</div>
              <div className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">Gold</div>
            </div>
            <div className="rounded-xl p-4 text-center bg-white/[0.06] shadow-lg shadow-black/40">
              <div className="text-2xl font-bold text-gray-200">{silvers}</div>
              <div className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">Silver</div>
            </div>
            <div className="rounded-xl p-4 text-center bg-white/[0.06] shadow-lg shadow-black/40">
              <div className="text-2xl font-bold text-orange-500">{bronzes}</div>
              <div className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">Bronze</div>
            </div>
          </div>

          {!socialMediaLoading && youtubePosts.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Latest BJJ Content</h3>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {youtubePosts.slice(0, 4).map((p) => (
                  <a
                    key={p.postId}
                    href={p.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl overflow-hidden bg-white/[0.06] hover:bg-white/[0.1] transition-colors shadow-lg shadow-black/40"
                  >
                    <div className="aspect-video bg-black/50">
                      <img src={p.thumbnailUrl || ""} alt={p.caption || "YouTube video"} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 text-sm text-gray-300 line-clamp-2">{p.caption || "Watch on YouTube"}</div>
                  </a>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                <a className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors" href="https://youtube.com/@earldkaiju" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors" href="https://www.instagram.com/earld.kaiju/" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: KAIJU_GREEN }}>About</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">About Earl</h2>
            <p className="text-gray-200 leading-relaxed">
              BJJ Black Belt with 8+ years teaching private & small-group lessons across Parsippany. I teach a technical, safety-first system that builds confidence and real-world control.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <img src={earlBjjPhoto} alt="Earl training BJJ" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (stationary bg + overlay slider) */}
      <div id="testimonials">
        <Testimonials backgroundImage="/images/testimonials-bg.jpg" />
      </div>

      {/* FAQ */}
      <section id="faq" className="py-14 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: KAIJU_GREEN }}>FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="border-white/10">
                <AccordionTrigger className="text-left text-white hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Private Brazilian Jiu-Jitsu Lessons",
            "description": "One-on-one and small-group BJJ training for adults and kids in Morris County, NJ",
            "provider": { "@type": "Person", "name": "Earl Hickson Jr.", "alternateName": "Earl the Kaiju" },
            "areaServed": { "@type": "Place", "name": "Parsippany, NJ" },
            "offers": [
              { "@type": "Offer", "name": "Private BJJ", "price": "60", "priceCurrency": "USD" },
              { "@type": "Offer", "name": "Intro Offer", "price": "50", "priceCurrency": "USD" },
              { "@type": "Offer", "name": "Semi-Private", "price": "40", "priceCurrency": "USD" },
              { "@type": "Offer", "name": "Parent & Me (4-week)", "price": "200", "priceCurrency": "USD" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map((item) => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": { "@type": "Answer", "text": item.a },
            })),
          })
        }}
      />
    </div>
  );
}
