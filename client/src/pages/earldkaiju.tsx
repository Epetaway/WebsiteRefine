import { useEffect, useMemo, useRef, useState } from "react";
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

import kaijuBanner from "@/images/kaiju-banner.png";
import kaijuWordmark from "@/images/earl-the-kaiju-logo.png";
import earlBjjPhoto from "@/images/earl-bjj-photo.png";
import bjjAccomplishments from "@/data/bjj-accomplishments.json";

/* Brand tokens */
const KAijuGreen = "var(--kaiju-green, #86d64a)";
const KAijuGreen20 = "var(--kaiju-green-20, rgba(134,214,74,.2))";

export type Testimonial = {
  name: string;
  relationship?: string;
  text: string;
  rating?: number;
};

const testimonials: Testimonial[] = [
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

function TestimonialsCarousel({
  title,
  autoPlayMs = 6000,
  items,
}: {
  title?: string;
  autoPlayMs?: number;
  items?: Testimonial[];
}) {
  const slides = useMemo(() => (items?.length ? items : testimonials), [items]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Autoplay
  useEffect(() => {
    if (!autoPlayMs || paused || slides.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, autoPlayMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [autoPlayMs, paused, slides.length]);

  const goTo = (i: number) => {
    if (slides.length === 0) return;
    const next = (i + slides.length) % slides.length;
    setIndex(next);
  };
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  if (!slides.length) return null;

  return (
    <section
      className="w-full bg-black text-white py-12 sm:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={title || "Testimonials"}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: KAijuGreen }}>
            {title}
          </h2>
        )}
      </div>

      {/* Slider viewport */}
      <div className="relative overflow-hidden">
        {/* Slides wrapper (translateX) */}
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((t, i) => (
            <article
              key={i}
              className="min-w-full"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              {/* Full-width panel with fixed background image */}
              <div
                className="relative h-[420px] sm:h-[460px] md:h-[520px] w-full flex flex-col justify-center"
                style={{
                  backgroundImage: "url('/images/testimonial-bg.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/80" />
                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-lg sm:text-xl text-gray-100 leading-relaxed">
                    <span
                      className="block text-3xl sm:text-4xl mb-3"
                      style={{ color: KAijuGreen }}
                    >
                      “
                    </span>
                    {t.text}
                    <span
                      className="block text-3xl sm:text-4xl mt-2"
                      style={{ color: KAijuGreen }}
                    >
                      ”
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="font-semibold text-white">{t.name}</span>
                    {t.relationship && (
                      <span className="text-gray-300">— {t.relationship}</span>
                    )}
                  </div>
                  {typeof t.rating === "number" && (
                    <div className="mt-3 flex gap-1">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <svg
                          key={j}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Arrows */}
        {slides.length > 1 && (
          <>
            <button
              aria-label="Previous testimonial"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 p-2 backdrop-blur"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 p-2 backdrop-blur"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={[
                  "h-2 rounded-full transition-all",
                  i === index
                    ? "bg-[#39FF14] w-6"
                    : "bg-white/40 hover:bg-white/70 w-2",
                ].join(" ")}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function EarldKaiju() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* Booking form */
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
        description:
          "I'll text and email you within 24 hours to confirm your session details.",
      });
      form.reset();
    },
    onError: (err: any) => {
      toast({
        title: "Submission Failed",
        description: err?.message ?? "Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertBjjBooking) => {
    setIsSubmitting(true);
    bookingMutation.mutate(data);
  };

  /* Social posts */
  const { data: socialMediaData, isLoading: socialMediaLoading } = useQuery({
    queryKey: ["/api/social-media"],
    refetchInterval: 5 * 60 * 1000,
  });

  const posts: SocialMediaPost[] =
    (socialMediaData as { posts: SocialMediaPost[] })?.posts || [];
  const youtubePosts = posts.filter(
    (post: SocialMediaPost) => post.platform === "youtube"
  );

  /* Auto-fetch Instagram/YouTube on load */
  const fetchIG = useMutation({
    mutationFn: () =>
      apiRequest("POST", "/api/social-media/fetch-instagram", {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-media"] });
    },
  });
  const fetchYT = useMutation({
    mutationFn: () =>
      apiRequest("POST", "/api/social-media/fetch-youtube", {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-media"] });
    },
  });

  useEffect(() => {
    if (!socialMediaLoading && posts.length === 0) {
      fetchIG.mutate();
      fetchYT.mutate();
    }
  }, [socialMediaData, socialMediaLoading]);

  /* Medal counts */
  const golds = bjjAccomplishments.tournament_history.filter(
    (t: any) => t.placement === "Gold"
  ).length;
  const silvers = bjjAccomplishments.tournament_history.filter(
    (t: any) => t.placement === "Silver"
  ).length;
  const bronzes = bjjAccomplishments.tournament_history.filter(
    (t: any) => t.placement === "Bronze"
  ).length;

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
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
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
                document.getElementById("booking")?.scrollIntoView({
                  behavior: "smooth",
                })
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

      {/* ===================== BOOKING (3-column) ===================== */}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-lg font-semibold">
                  Thanks! I’ll confirm within 24 hours.
                </p>
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
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-6 md:grid-cols-3"
                >
                  {/* Column 1 */}
                  <div className="space-y-4 flex flex-col">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormLabel className="text-white">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-white/10 focus:bg-white/15"
                              placeholder="Your name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormLabel className="text-white">
                            Email *
                          </FormLabel>
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
                        <FormItem className="flex-grow">
                          <FormLabel className="text-white">
                            Phone *
                          </FormLabel>
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
                        <FormItem className="flex-grow">
                          <FormLabel className="text-white">
                            Program
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-white/10">
                                <SelectValue placeholder="Choose an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="adult-private">
                                Private (Adult)
                              </SelectItem>
                              <SelectItem value="semi-private">
                                Semi-Private (2–4)
                              </SelectItem>
                              <SelectItem value="parent-me">
                                Parent & Me
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4 flex flex-col">
                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem className="flex flex-col flex-grow">
                          <FormLabel className="text-white">
                            Goals & Experience
                          </FormLabel>
                          <FormControl className="flex-grow flex flex-col">
                            <Textarea
                              className="bg-white/10 flex-grow focus:bg-white/15"
                              placeholder="Tell me about your goals, any previous experience, injuries, or questions..."
                              rows={8}
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

                  {/* Column 3 */}
                  <div className="space-y-4 flex flex-col">
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormLabel className="text-white">
                            Preferred Times
                          </FormLabel>
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
                      )}
                    />
                    <FormField
                      name="smsConsent"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              className="bg-white/10"
                            />
                          </FormControl>
                          <FormLabel className="text-sm text-gray-300">
                            I agree to receive texts about scheduling and training
                            updates. Reply STOP to opt out.
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting || bookingMutation.isPending}
                      className="mt-auto text-black"
                      style={{ backgroundColor: KAijuGreen }}
                    >
                      {isSubmitting || bookingMutation.isPending
                        ? "Submitting…"
                        : "Request Session"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      {/* ===================== WHAT I OFFER (services & pricing) ===================== */}
      <section id="offer" className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Private */}
            <div className="rounded-2xl p-6 bg-white/[0.06] shadow-xl shadow-black/40 flex flex-col">
              <h3 className="font-bold text-lg text-black">
                Private Lessons (1-on-1)
              </h3>
              <p className="text-sm text-gray-700 mt-2">
                Tailored coaching focused on your individual goals and learning
                style.
              </p>
              <div className="mt-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-800">Price</span>
                  <span className="font-semibold text-gray-900">$60 / hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Intro Offer</span>
                  <span className="font-semibold text-gray-900">
                    $50 (one-time)
                  </span>
                </div>
              </div>
              <Button
                className="mt-auto text-black"
                style={{ backgroundColor: KAijuGreen }}
                onClick={() =>
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book
              </Button>
            </div>

            {/* Semi-Private */}
            <div className="rounded-2xl p-6 bg-white/[0.06] shadow-xl shadow-black/40 flex flex-col">
              <h3 className="font-bold text-lg text-black">
                Semi-Private (2–4 people)
              </h3>
              <p className="text-sm text-gray-700 mt-2">
                Train with friends or family and split the cost. Personalized
                attention with group dynamics.
              </p>
              <div className="mt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-800">Price</span>
                  <span className="font-semibold text-gray-900">
                    $40 per person
                  </span>
                </div>
              </div>
              <Button
                className="mt-auto text-black"
                style={{ backgroundColor: KAijuGreen }}
                onClick={() =>
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book
              </Button>
            </div>

            {/* Parent & Me */}
            <div className="rounded-2xl p-6 bg-white/[0.06] shadow-xl shadow-black/40 flex flex-col">
              <h3 className="font-bold text-lg text-black">
                Parent & Me Package
              </h3>
              <p className="text-sm text-gray-700 mt-2">
                Ages 5–8 — 4-week bonding series with your child focusing on
                fundamentals and fun drills.
              </p>
              <div className="mt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-800">Price</span>
                  <span className="font-semibold text-gray-900">$200 total</span>
                </div>
              </div>
              <Button
                className="mt-auto text-black"
                style={{ backgroundColor: KAijuGreen }}
                onClick={() =>
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT + RECORDS + VIDEOS ===================== */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-start">
          {/* Copy left */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">About Earl</h2>
            <p className="text-gray-200 leading-relaxed">
              I’m a Brazilian Jiu-Jitsu Black Belt with over 8 years of teaching experience,
              specializing in private and small-group lessons for kids, parents, and adults across Parsippany.
              My training is personalized, flexible, and designed to build confidence, discipline, and real-world self-defense skills in a safe, supportive environment.
            </p>
            <div className="mt-4">
              <p className="text-gray-300">
                My game is all about creating space and maintaining control—lapel guard, half guard, inversions,
                wrestling, and a touch of judo. As a bigger athlete, I teach how to use leverage and pressure intelligently rather than relying on brute force.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Lapel Guard","Half Guard","Inversions","Wrestling","Judo","Pressure Passing"].map((t) => (
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

            {/* Latest videos inline */}
            {!socialMediaLoading && youtubePosts.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold mb-3">Latest BJJ Content</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {youtubePosts.slice(0, 4).map((post: SocialMediaPost) => (
                    <a
                      key={post.postId}
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl overflow-hidden bg-white/[0.06] hover:bg-white/[0.1] transition-colors shadow-lg shadow-black/40"
                    >
                      <div className="aspect-video bg-black/50">
                        <img
                          src={post.thumbnailUrl || ""}
                          alt={post.caption || "YouTube video"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 text-sm text-gray-300 line-clamp-2">
                        {post.caption || "Watch on YouTube"}
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

          {/* Photo + records right */}
          <div>
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <img
                src={earlBjjPhoto}
                alt="Earl training BJJ"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl p-4 text-center bg-white/[0.06] shadow-lg shadow-black/40">
                <div className="text-2xl font-bold text-yellow-400">{golds}</div>
                <div className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">
                  Gold
                </div>
              </div>
              <div className="rounded-xl p-4 text-center bg-white/[0.06] shadow-lg shadow-black/40">
                <div className="text-2xl font-bold text-gray-200">{silvers}</div>
                <div className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">
                  Silver
                </div>
              </div>
              <div className="rounded-xl p-4 text-center bg-white/[0.06] shadow-lg shadow-black/40">
                <div className="text-2xl font-bold text-orange-500">{bronzes}</div>
                <div className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">
                  Bronze
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <TestimonialsCarousel
        title="What Students Are Saying"
        autoPlayMs={6000}
        items={testimonials}
      />

      {/* ===================== SEO JSON-LD ===================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Private Brazilian Jiu-Jitsu Lessons",
            description:
              "One-on-one and small-group BJJ training for adults and kids in Parsippany, NJ",
            provider: {
              "@type": "Person",
              name: "Earl Hickson Jr.",
              alternateName: "Earl the Kaiju",
            },
            areaServed: {
              "@type": "Place",
              name: "Parsippany, NJ",
            },
            offers: [
              {
                "@type": "Offer",
                name: "Private Lessons",
                price: "60",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                name: "Intro Offer",
                price: "50",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                name: "Semi-Private",
                price: "40",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                name: "Parent & Me (4-week)",
                price: "200",
                priceCurrency: "USD",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
