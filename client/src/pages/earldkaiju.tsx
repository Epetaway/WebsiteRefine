import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { insertBjjBookingSchema, type InsertBjjBooking, type SocialMediaPost } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

/* Assets */
import kaijuBanner from "@/images/kaiju-banner.png";
import kaijuWordmark from "@/images/kaiju-logo.png";
import earlBjjPhoto from "@/images/earl-bjj-photo.png";
import bjjAccomplishments from "@/data/bjj-accomplishments.json";
import testimonialBg from "@/images/testimonials-bg.jpg";

/* Brand tokens */
const KAijuGreen = "var(--kaiju-green, #86d64a)";
const KAijuGreen20 = "var(--kaiju-green-20, rgba(134,214,74,.2))";



type Testimonial = { name: string; relationship: string; text: string; rating: number };

const testimonials: Testimonial[] = [
  { name: "Alex Johnson", relationship: "Student", text: "Joining Ultra-Jitsu was a game-changer. Private sessions match my pace and sharpen technique.", rating: 5 },
  { name: "Emily Clarke", relationship: "Student", text: "Group sessions are the highlight of my week. Clear instruction + great vibes.", rating: 5 },
  { name: "Linda Thompson", relationship: "Parent of Student", text: "My son’s confidence and discipline skyrocketed. Safe, patient, and fun.", rating: 5 },
  { name: "Carlos Ramirez", relationship: "Student", text: "Strategy, grips, and balance—helped me compete with real confidence.", rating: 4 },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor">
          <path d="M12 17.27l6.18 3.73-1.64-7.03L21.5 9.24l-7.19-.61L12 2 9.69 8.63 2.5 9.24l4.96 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}
// Create a fully-typed placeholder that satisfies SocialMediaPost
function makePlaceholderPost(i: number): SocialMediaPost {
  return {
    id: -(i + 1),                // negative to avoid colliding with real ids
    createdAt: null,             // or new Date() if you prefer
    platform: "youtube",
    postId: `placeholder-${i}`,
    mediaType: "video",
    mediaUrl: null,
    thumbnailUrl: null,
    permalink: "#",
    caption: "Video coming soon",
    timestamp: new Date(),       // must be a Date, not a string
  };
}

function TestimonialsStationary() {
  const [idx, setIdx] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setIdx((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative w-full"
      style={{
        backgroundImage: `url(${testimonialBg || kaijuBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={() => { pausedRef.current = true; }}
      onTouchEnd={() => { pausedRef.current = false; }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mx-auto rounded-2xl bg-white/5 backdrop-blur-md p-6 sm:p-10 shadow-2xl">
          <div className="relative min-h-[220px]">
            {testimonials.map((t, i) => (
              <div
                key={t.name + i}
                className={`absolute inset-0 transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                aria-hidden={i !== idx}
              >
                <div className="flex flex-col items-start">
                  <StarRow rating={t.rating} />
                  <p className="mt-4 text-lg md:text-xl text-white/90 leading-relaxed">“{t.text}”</p>
                  <div className="mt-4 text-sm text-white/70">
                    <span className="font-semibold" style={{ color: KAijuGreen }}>{t.name}</span>
                    <span className="mx-2">•</span>
                    <span>{t.relationship}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous testimonial"
              >
                ‹
              </button>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
                aria-label="Next testimonial"
              >
                ›
              </button>
            </div>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-2.5 bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================== PAGE =================================== */
export default function EarldKaiju() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* --------- Booking form --------- */
  const form = useForm<InsertBjjBooking>({
    resolver: zodResolver(insertBjjBookingSchema),
    defaultValues: { name: "", email: "", phone: "", program: "", goals: "", availability: "", smsConsent: false },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBjjBooking) => (await apiRequest("POST", "/api/bjj-booking", data)).json(),
    onSuccess: () => {
      setIsSubmitted(true);
      toast({ title: "Booking Request Submitted!", description: "I'll text and email you within 24 hours to confirm." });
      form.reset();
    },
    onError: (err: any) => toast({ title: "Submission Failed", description: err?.message ?? "Please try again.", variant: "destructive" }),
    onSettled: () => setIsSubmitting(false),
  });

  const onSubmit = (data: InsertBjjBooking) => { setIsSubmitting(true); bookingMutation.mutate(data); };

  /* --------- Social (YouTube in About) --------- */
  const { data: socialMediaData, isLoading: socialMediaLoading } = useQuery({
    queryKey: ["/api/social-media"],
    refetchInterval: 5 * 60 * 1000,
  });

  const posts: SocialMediaPost[] = (socialMediaData as { posts: SocialMediaPost[] })?.posts || [];
  const youtubePosts = posts.filter((p) => p.platform === "youtube");

  const queryClientRefetch = () => queryClient.invalidateQueries({ queryKey: ["/api/social-media"] });
  const fetchIG = useMutation({ mutationFn: () => apiRequest("POST", "/api/social-media/fetch-instagram", {}), onSuccess: queryClientRefetch });
  const fetchYT = useMutation({ mutationFn: () => apiRequest("POST", "/api/social-media/fetch-youtube", {}), onSuccess: queryClientRefetch });

  useEffect(() => {
    if (!socialMediaLoading && posts.length === 0) { fetchIG.mutate(); fetchYT.mutate(); }
  }, [socialMediaLoading, posts.length]);

  /* --------- medal counts --------- */
  const golds = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Gold").length;
  const silvers = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Silver").length;
  const bronzes = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Bronze").length;

  return (
    <div className="bg-black text-white">
      {/* ===================== HERO (left-aligned) ===================== */}
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url(${kaijuBanner})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <img src={kaijuWordmark} alt="Earl the Kaiju wordmark" className="w-56 sm:w-64 md:w-72 lg:w-80 mb-5" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl">
            Private Brazilian Jiu-Jitsu Coaching with Earl “The Kaiju” Hickson — Parsippany, NJ
          </h1>
          <p className="mt-3 text-base sm:text-lg font-semibold" style={{ color: KAijuGreen }}>
            Black Belt Expertise. First Private Lesson Just $50 (limited-time offer).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="text-black"
              style={{ backgroundColor: KAijuGreen }}
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            >
              <i className="fas fa-calendar-alt mr-2" />
              Book Your Lesson
            </Button>
            <a
              href="mailto:e@ehicksonjr.com"
              className="inline-flex items-center px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <i className="fas fa-envelope mr-2" />
              Email Me
            </a>
          </div>
        </div>
      </section>

      {/* ===================== BOOKING (right after hero) ===================== */}
      <section id="booking" className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-6 sm:p-8 bg-white/[0.06] shadow-2xl shadow-black/40">
            <h2 className="text-xl font-bold mb-4" style={{ color: KAijuGreen }}>Request a Session</h2>

            {isSubmitted ? (
              <div className="py-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: KAijuGreen20 }}>
                  <svg className="w-8 h-8" style={{ color: KAijuGreen }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold">Thanks! I’ll confirm within 24 hours.</p>
                <Button className="mt-4 text-black" style={{ backgroundColor: KAijuGreen }} onClick={() => setIsSubmitted(false)}>
                  Book Another
                </Button>
              </div>
            ) : (
              <Form {...form}>
                {/* Grid: 1 col (mobile) → 2 cols (md) → 3 cols (lg) */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* ===== Column 1 ===== */}
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
                            <SelectItem value="adult-private">Private Lessons (1-on-1) — $60/hr</SelectItem>
                            <SelectItem value="intro-offer">Intro Offer — $50 (one-time)</SelectItem>
                            <SelectItem value="semi-private">Semi-Private (2–4) — $40/person</SelectItem>
                            <SelectItem value="parent-me">Parent & Me (4-week) — $200 total</SelectItem>
                            <SelectItem value="kids-bjj">Kids BJJ — Ask about options</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* ===== Column 2 ===== */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem className="h-full flex flex-col">
                          <FormLabel className="text-white">Goals & Experience</FormLabel>
                          <FormControl className="flex-1">
                            <Textarea
                              className="bg-white/20 text-white placeholder-gray-300 h-full min-h-[180px]"
                              placeholder="Tell me about your goals, any previous experience, injuries, or questions..."
                              rows={10}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              onBlur={field.onBlur}
                              name={field.name}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* ===== Column 3 ===== */}
                  <div className="space-y-4 md:col-span-2 lg:col-span-1">
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Preferred Times</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white/20 text-white placeholder-gray-300"
                              placeholder="e.g., Weekday evenings, Saturday mornings"
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              onBlur={field.onBlur}
                              name={field.name}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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

                    <Button
                      type="submit"
                      disabled={isSubmitting || bookingMutation.isPending}
                      className="w-full text-black"
                      style={{ backgroundColor: KAijuGreen }}
                    >
                      {isSubmitting || bookingMutation.isPending ? "Submitting…" : "Request Session"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      {/* ===================== WHAT I OFFER (services + pricing) ===================== */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 bg-white/[0.06] shadow-xl shadow-black/40">
              <h3 className="font-bold text-lg">Private Lessons (1-on-1)</h3>
              <p className="text-gray-300 text-sm mt-2">Tailored coaching focused on your individual goals.</p>
              <div className="mt-4 text-sm space-y-2">
                <div className="flex justify-between"><span>Price</span><span className="font-semibold">$60 / hour</span></div>
                <div className="flex justify-between"><span>Intro Offer</span><span className="font-semibold">$50 (one-time)</span></div>
              </div>
              <Button className="mt-5 text-black" style={{ backgroundColor: KAijuGreen }} onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>Book</Button>
            </div>

            <div className="rounded-2xl p-6 bg-white/[0.06] shadow-xl shadow-black/40">
              <h3 className="font-bold text-lg">Semi-Private (2–4 people)</h3>
              <p className="text-gray-300 text-sm mt-2">Train with a friend and split the cost.</p>
              <div className="mt-4 text-sm">
                <div className="flex justify-between"><span>Price</span><span className="font-semibold">$40 per person</span></div>
              </div>
              <Button className="mt-5 text-black" style={{ backgroundColor: KAijuGreen }} onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>Book</Button>
            </div>

            <div className="rounded-2xl p-6 bg-white/[0.06] shadow-xl shadow-black/40">
              <h3 className="font-bold text-lg">Parent & Me Package</h3>
              <p className="text-gray-300 text-sm mt-2">Ages 5–8 — 4-week bonding series with your child.</p>
              <div className="mt-4 text-sm">
                <div className="flex justify-between"><span>Price</span><span className="font-semibold">$200 total</span></div>
              </div>
              <Button className="mt-5 text-black" style={{ backgroundColor: KAijuGreen }} onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>Book</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT + compact record + latest videos ===================== */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">About Earl</h2>
            <p className="text-gray-200 leading-relaxed">
              I’m Earl “The Kaiju” Hickson, a Brazilian Jiu-Jitsu Black Belt with over 8 years of teaching experience.
              I specialize in private and small-group lessons for kids, parents, and adults throughout Parsippany.
              My training is personalized, flexible, and designed to build confidence, discipline, and real-world
              self-defense skills in a safe, supportive environment.
            </p>
            <div className="mt-4">
              <p className="text-gray-300">
                My game: establish boundaries early, slow the fight, and create advantages using <strong>lapel guard</strong>, <strong>half guard</strong>, <strong>inversions</strong>, <strong>wrestling</strong> and a touch of <strong>judo</strong>—blending unconventional techniques with size/strength to achieve control.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Lapel Guard", "Half Guard", "Inversions", "Wrestling", "Judo", "Pressure Passing"].map((t) => (
                  <span key={t} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: KAijuGreen, backgroundColor: KAijuGreen20 }}>
                    {t}
                  </span>
                ))}
              </div>

             {/* Latest videos 1×4 mobile, 2×2 desktop */}
{!socialMediaLoading && (
  <div className="mt-8">
    <h3 className="font-semibold mb-3">Latest BJJ Content</h3>

    {(() => {
      const real = youtubePosts.slice(0, 4);
      const padded =
        real.length >= 4
          ? real
          : [...real, ...Array.from({ length: 4 - real.length }, (_, i) => makePlaceholderPost(i))];

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {padded.map((p) => (
            <a
              key={`${p.platform}-${p.postId}`}
              href={p.permalink}
              target={p.permalink === "#" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden bg-white/[0.06] hover:bg-white/[0.1] transition-colors shadow-lg shadow-black/40"
            >
              <div className="aspect-video bg-black/50">
                {p.thumbnailUrl ? (
                  <img
                    src={p.thumbnailUrl}
                    alt={p.caption ?? "YouTube video"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-sm text-white/60">Video</div>
                )}
              </div>
              <div className="p-3 text-sm text-gray-300 line-clamp-2">
                {p.caption ?? "Watch on YouTube"}
              </div>
            </a>
          ))}
        </div>
      );
    })()}

    <div className="mt-3 flex gap-3">
      <a
        className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        href="https://youtube.com/@earldkaiju"
        target="_blank"
        rel="noopener noreferrer"
      >
        YouTube
      </a>
      <a
        className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        href="https://www.instagram.com/earld.kaiju/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
    </div>
  </div>
)}

            </div>
          </div>

          <div>
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <img src={earlBjjPhoto} alt="Earl training BJJ" className="w-full h-auto object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
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
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS (stationary bg, text slider) ===================== */}
      <TestimonialsStationary />

      {/* ===================== SEO JSON-LD ===================== */}
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
              { "@type": "Offer", "name": "Private Lessons (1-on-1)", "price": "60", "priceCurrency": "USD" },
              { "@type": "Offer", "name": "Intro Offer", "price": "50", "priceCurrency": "USD" },
              { "@type": "Offer", "name": "Semi-Private (2–4 people)", "price": "40", "priceCurrency": "USD" },
              { "@type": "Offer", "name": "Parent & Me (4-week)", "price": "200", "priceCurrency": "USD" }
            ]
          })
        }}
      />
    </div>
  );
}
