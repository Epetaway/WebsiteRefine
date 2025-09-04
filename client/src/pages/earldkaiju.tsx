import { useEffect, useMemo, useRef, useState } from "react";
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

import kaijuBanner from "@/images/kaiju-banner.png";
import kaijuWordmark from "@/images/kaiju-logo.png";
import earlBjjPhoto from "@/images/earl-bjj-photo.png";
import bjjAccomplishments from "@/data/bjj-accomplishments.json";

/* Brand tokens - rely on CSS vars set in :root (index.css) */
const KAijuGreen = "var(--kaiju-green, #86d64a)";
const KAijuGreen20 = "var(--kaiju-green-20, rgba(134,214,74,.2))";

/* ---------------- Testimonials (stationary bg, text-only w/ ratings) ---------------- */
type Testimonial = { name: string; relationship?: string; text: string; rating?: number };

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex Johnson",
    relationship: "Student",
    text:
      "Joining Ultra-Jitsu was a game-changer for me. The private sessions are tailored to my pace, focusing on technique and strength. The instructors are knowledgeable and patient, making each class a unique learning experience. I've seen a significant improvement in my fitness and skills since I started. The community here is supportive and welcoming.",
    rating: 5,
  },
  {
    name: "Emily Clarke",
    relationship: "Student",
    text:
      "Ultra-Jitsu's group training sessions are the highlight of my week. The energy and enthusiasm in each class are contagious. The instructors blend traditional techniques with modern training methods. I've made great friends and learned so much.",
    rating: 5,
  },
  {
    name: "Linda Thompson",
    relationship: "Parent of Student",
    text:
      "As a parent, I've been thoroughly impressed with Ultra-Jitsu's approach to teaching children. My son's confidence and discipline have grown tremendously in a positive, supportive environment.",
    rating: 5,
  },
  {
    name: "Carlos Ramirez",
    relationship: "Student",
    text:
      "Coaching is top-notch. Strategic advice and on-the-fly adaptations helped me immensely during competition. The support and tactical insights gave me the confidence to perform.",
    rating: 5,
  },
  {
    name: "Mike Tavaglione",
    relationship: "Training Partner",
    text:
      "Even though Earl is higher rank, he always rolls with me and shares tips. He never goes too rough with newer folks, which makes learning feel safe and encouraging.",
    rating: 5,
  },
  {
    name: "Markel Pierre",
    relationship: "Student",
    text:
      "Earl is easygoing and always happy to answer questions. He’ll break down techniques from judo, wrestling, and jiu-jitsu — awesome person to learn from.",
    rating: 5,
  },
  {
    name: "Phil Schochet",
    relationship: "Student",
    text:
      "Professor Earl adapts to a wide range of students. As a middle-aged hobbyist, I learn just as much as the competitors. Tough conditioning + positive energy = consistent progress.",
    rating: 5,
  },
];

function StarRow({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="w-4 h-4"
          style={{ color: KAijuGreen }}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.897l-7.335 3.869 1.401-8.168L.132 9.211l8.2-1.193z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialsSliderStationaryBG({
  title = "What Students & Parents Say",
  background = kaijuBanner,
  items = TESTIMONIALS,
  autoPlayMs = 6000,
}: {
  title?: string;
  background?: string;
  items?: Testimonial[];
  autoPlayMs?: number;
}) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);
  const safeItems = items && items.length ? items : TESTIMONIALS;
  useEffect(() => {
    if (!autoPlayMs || safeItems.length <= 1) return;
    timer.current = window.setInterval(() => setIdx((i) => (i + 1) % safeItems.length), autoPlayMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
      timer.current = null;
    };
  }, [autoPlayMs, safeItems.length]);

  const go = (n: number) => setIdx((n + safeItems.length) % safeItems.length);
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  return (
    <section
      className="relative w-full py-16 sm:py-20"
      aria-label={title}
      style={{ backgroundColor: "black" }}
    >
      {/* Stationary background image */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover opacity-25"
        style={{ backgroundImage: `url(${background})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: KAijuGreen }}>
          {title}
        </h2>

        {/* Card */}
        <div className="relative rounded-2xl bg-white/[0.06] shadow-2xl shadow-black/50 p-6 sm:p-8">
          <blockquote key={idx} className="transition-opacity">
            <div className="flex items-center gap-3 mb-3">
              <StarRow n={safeItems[idx].rating ?? 5} />
              <span className="text-xs text-gray-300">5.0</span>
            </div>
            <p className="text-gray-100 leading-relaxed text-base sm:text-lg">
              “{safeItems[idx].text}”
            </p>
            <footer className="mt-4 text-sm">
              <span className="font-semibold text-white">{safeItems[idx].name}</span>
              {safeItems[idx].relationship ? (
                <span className="text-gray-400"> — {safeItems[idx].relationship}</span>
              ) : null}
            </footer>
          </blockquote>

          {safeItems.length > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-2"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-2"
              >
                ›
              </button>

              <div className="mt-6 flex gap-2">
                {safeItems.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => go(i)}
                    className={[
                      "h-1.5 rounded-full transition-all",
                      i === idx ? "bg-white w-6" : "bg-white/40 w-2 hover:bg-white/70",
                    ].join(" ")}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Page --------------------------------- */
export default function EarldKaiju() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- Booking form
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

  const onSubmit = (data: InsertBjjBooking) => {
    setIsSubmitting(true);
    bookingMutation.mutate(data);
  };

  // --- Social: latest YouTube posts for the grid (max 4, 2x2 desktop)
  const { data: socialMediaData, isLoading: socialMediaLoading } = useQuery({
    queryKey: ["/api/social-media"],
    refetchInterval: 5 * 60 * 1000,
  });

  const posts: SocialMediaPost[] = (socialMediaData as { posts: SocialMediaPost[] })?.posts || [];
  // If your SocialMediaPost type differs, map it here to avoid TS conflicts:
  const normalized: SocialMediaPost[] = useMemo(
    () =>
      posts.map((p: any) => ({
        id: p.id ?? 0,
        createdAt: p.createdAt ?? null,
        platform: p.platform,
        postId: p.postId,
        mediaType: p.mediaType ?? "video",
        mediaUrl: p.mediaUrl ?? null,
        thumbnailUrl: p.thumbnailUrl ?? null,
        permalink: p.permalink,
        caption: p.caption ?? null,
        timestamp: p.timestamp ? new Date(p.timestamp) : new Date(),
      })),
    [posts]
  );
  const youtubePosts = normalized.filter((p) => p.platform === "youtube").slice(0, 4);

  // --- Medal counts
  const golds = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Gold").length;
  const silvers = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Silver").length;
  const bronzes = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Bronze").length;

  return (
    <div className="bg-black text-white">
      {/* ===================== HERO ===================== */}
      <section className="relative py-16 md:py-20">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${kaijuBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src={kaijuWordmark}
            alt="Earl the Kaiju wordmark"
            className="w-56 sm:w-64 md:w-72 lg:w-80 mb-5"
          />
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
              onClick={() =>
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
              }
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

      {/* ===================== BOOKING (3 / 2 / 1 responsive) ===================== */}
      <section id="booking" className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 bg-white/[0.06] shadow-2xl shadow-black/40">
            <h2 className="text-xl font-bold mb-4" style={{ color: KAijuGreen }}>
              Request a Session
            </h2>

            {isSubmitted ? (
              <div className="py-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: KAijuGreen20 }}
                >
                  <svg
                    className="w-8 h-8"
                    style={{ color: KAijuGreen }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold">Thanks! I’ll confirm within 24 hours.</p>
                <Button
                  className="mt-4 text-black"
                  style={{ backgroundColor: KAijuGreen }}
                  onClick={() => setIsSubmitted(false)}
                >
                  Book Another
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                  {/* Col 1: name/email/phone/program */}
                  <div className="space-y-5">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Full Name *</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-white/10 focus:bg-white/15" placeholder="Your name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              className="bg-white/10 focus:bg-white/15"
                              placeholder="you@email.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="phone"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone *</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              {...field}
                              className="bg-white/10 focus:bg-white/15"
                              placeholder="(555) 123-4567"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="program"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Program</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/10">
                                <SelectValue placeholder="Choose an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="adult-trial">Private (Adult) – Trial $80</SelectItem>
                              <SelectItem value="adult-pack-4">Private (Adult) – 4 sessions $300</SelectItem>
                              <SelectItem value="kids-trial">Kids – Trial $70</SelectItem>
                              <SelectItem value="parent-me">Parent & Me – $90/session</SelectItem>
                              <SelectItem value="small-group">Semi-Private (2–4) – from $40/person</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Col 2: goals */}
                  <div className="space-y-5">
                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem className="h-full">
                          <FormLabel className="text-white">Goals & Experience</FormLabel>
                          <FormControl>
                            <Textarea
                              className="bg-white/10 focus:bg-white/15 text-white placeholder-gray-300 min-h-[220px]"
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

                  {/* Col 3: availability + consent + submit pinned bottom */}
                  <div className="flex flex-col">
                    <div className="space-y-5">
                      <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Preferred Times</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-white/10 focus:bg-white/15 text-white placeholder-gray-300"
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

                      <FormField
                        name="smsConsent"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex items-start space-x-3">
                            <FormControl>
                              <Checkbox checked={!!field.value} onCheckedChange={field.onChange} className="bg-white/10" />
                            </FormControl>
                            <FormLabel className="text-sm text-gray-300">
                              I agree to receive texts about scheduling and training updates. Reply STOP to opt out.
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-auto pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting || bookingMutation.isPending}
                        className="w-full text-black"
                        style={{ backgroundColor: KAijuGreen }}
                      >
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

      {/* ===================== WHAT I OFFER (services + pricing) ===================== */}
      <section id="offer" className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Private */}
            <div className="rounded-2xl p-6 bg-white/[0.06] shadow-xl shadow-black/40 flex flex-col">
              <h3 className="font-bold text-lg text-gray-100">Private Lessons (1-on-1)</h3>
              <p className="text-gray-300 text-sm mt-2">
                Personalized coaching to match your goals—self-defense, fitness, or competition. Technical instruction with
                safety-first progressions and detailed feedback.
              </p>
              <div className="mt-4 text-sm space-y-2 text-gray-200">
                <div className="flex justify-between"><span>Price</span><span className="font-semibold">$60 / hour</span></div>
                <div className="flex justify-between"><span>Intro Offer</span><span className="font-semibold">$50 (one-time)</span></div>
              </div>
              <div className="mt-auto pt-5">
                <Button
                  className="w-full text-black"
                  style={{ backgroundColor: KAijuGreen }}
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Book
                </Button>
              </div>
            </div>

            {/* Semi-Private */}
            <div className="rounded-2xl p-6 bg-white/[0.06] shadow-xl shadow-black/40 flex flex-col">
              <h3 className="font-bold text-lg text-gray-100">Semi-Private (2–4 people)</h3>
              <p className="text-gray-300 text-sm mt-2">
                Train with a friend or family. Shared drills and situational sparring, with partner-based feedback to
                accelerate learning and accountability.
              </p>
              <div className="mt-4 text-sm text-gray-200">
                <div className="flex justify-between"><span>Price</span><span className="font-semibold">$40 per person</span></div>
              </div>
              <div className="mt-auto pt-5">
                <Button
                  className="w-full text-black"
                  style={{ backgroundColor: KAijuGreen }}
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Book
                </Button>
              </div>
            </div>

            {/* Parent & Me */}
            <div className="rounded-2xl p-6 bg-white/[0.06] shadow-xl shadow-black/40 flex flex-col">
              <h3 className="font-bold text-lg text-gray-100">Parent & Me Package</h3>
              <p className="text-gray-300 text-sm mt-2">
                Ages 5–8. A 4-week bonding series that introduces safe fundamentals, boundaries, and confidence. Learn
                together in a supportive, fun environment.
              </p>
              <div className="mt-4 text-sm text-gray-200">
                <div className="flex justify-between"><span>Price</span><span className="font-semibold">$200 total</span></div>
              </div>
              <div className="mt-auto pt-5">
                <Button
                  className="w-full text-black"
                  style={{ backgroundColor: KAijuGreen }}
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT + compact record + latest videos ===================== */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-start">
          {/* Copy left */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">About Earl</h2>
            <p className="text-gray-200 leading-relaxed">
              BJJ Black Belt with 8+ years teaching private & small-group lessons across Parsippany. I teach a technical,
              safety-first system that builds confidence and real-world control.
            </p>
            <div className="mt-4">
              <p className="text-gray-300">
                My game: establish boundaries early, slow the fight, and create advantages using{" "}
                <strong>lapel guard</strong>, <strong>half guard</strong>, <strong>inversions</strong>,{" "}
                <strong>wrestling</strong> and a touch of <strong>judo</strong>. Big-guy pressure with intelligent grips.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Lapel Guard", "Half Guard", "Inversions", "Wrestling", "Judo", "Pressure Passing"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ color: KAijuGreen, backgroundColor: KAijuGreen20 }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Latest videos grid: desktop 2x2 (max 4), mobile 1 column */}
            {!socialMediaLoading && youtubePosts.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold mb-3">Latest BJJ Content</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {youtubePosts.slice(0, 4).map((p) => (
                    <a
                      key={p.postId}
                      href={p.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl overflow-hidden bg-white/[0.06] hover:bg-white/[0.1] transition-colors shadow-lg shadow-black/40"
                    >
                      <div className="aspect-video bg-black/50">
                        <img
                          src={p.thumbnailUrl || ""}
                          alt={p.caption || "YouTube video"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 text-sm text-gray-300 line-clamp-2">
                        {p.caption || "Watch on YouTube"}
                      </div>
                    </a>
                  ))}
                </div>
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

          {/* Photo + compact record card */}
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

      {/* ===================== TESTIMONIALS (stationary background) ===================== */}
      <TestimonialsSliderStationaryBG />

      {/* ===================== SEO JSON-LD ===================== */}
      <script
        type="application/ld+json"
        // Note: for SPA, this is fine. If you server-render, move to a head manager.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Private Brazilian Jiu-Jitsu Lessons",
            description:
              "One-on-one and small-group BJJ training for adults and kids in Morris County, NJ",
            provider: { "@type": "Person", name: "Earl Hickson Jr.", alternateName: "Earl the Kaiju" },
            areaServed: { "@type": "Place", name: "Parsippany, NJ" },
            offers: [
              { "@type": "Offer", name: "Private BJJ", price: "60", priceCurrency: "USD" },
              { "@type": "Offer", name: "Intro Offer", price: "50", priceCurrency: "USD" },
              { "@type": "Offer", name: "Semi-Private", price: "40", priceCurrency: "USD" },
              { "@type": "Offer", name: "Parent & Me (4-week)", price: "200", priceCurrency: "USD" },
            ],
          }),
        }}
      />
    </div>
  );
}
