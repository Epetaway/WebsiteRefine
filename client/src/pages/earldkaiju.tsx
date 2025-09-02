import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
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

import TestimonialsCarousel from "@/components/ui/testimonials-carousel";

import kaijuBanner from "@/images/kaiju-banner.png";
import kaijuLogo from "@/images/kaiju-logo.png";
import earlBjjPhoto from "@/images/earl-bjj-photo.png";
import bjjAccomplishments from "@/data/bjj-accomplishments.json";

export default function EarldKaiju() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- SEO (title + meta description) ---
  useEffect(() => {
    document.title =
      "Earl the Kaiju | Private BJJ Lessons – Parsippany, NJ";
    const meta =
      document.querySelector('meta[name="description"]') ||
      (() => {
        const el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
        return el;
      })();
    meta.setAttribute(
      "content",
      'Private Brazilian Jiu-Jitsu coaching in Parsippany, NJ with Black Belt instructor Earl “The Kaiju” Hickson. First lesson just $50. Serving kids, parents & adults.'
    );
  }, []);

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
    mutationFn: async (data: InsertBjjBooking) => {
      const response = await apiRequest("POST", "/api/bjj-booking", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Booking Request Submitted!",
        description:
          "I'll text and email you within 24 hours to confirm your session details.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or contact me directly.",
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

  // --- Social content fetch (safe if API keys missing) ---
  const { data: socialMediaData, isLoading: socialMediaLoading } = useQuery({
    queryKey: ["/api/social-media"],
    refetchInterval: 5 * 60 * 1000,
  });

  const socialMediaPosts: SocialMediaPost[] =
    (socialMediaData as { posts: SocialMediaPost[] })?.posts || [];
  const instagramPosts = socialMediaPosts.filter(
    (p) => p.platform === "instagram"
  );
  const youtubePosts = socialMediaPosts.filter((p) => p.platform === "youtube");

  const fetchInstagramMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/social-media/fetch-instagram", {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-media"] });
    },
  });

  const fetchYoutubeMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/social-media/fetch-youtube", {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-media"] });
    },
  });

  useEffect(() => {
    if (!socialMediaLoading && socialMediaPosts.length === 0) {
      fetchInstagramMutation.mutate();
      fetchYoutubeMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socialMediaData, socialMediaLoading]);

  return (
    <div className="">
      {/* ========================= HERO ========================= */}
      <section className="relative py-20 bg-black text-white overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${kaijuBanner})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#39FF14]/20 backdrop-blur-sm text-[#39FF14] border border-[#39FF14]/30 text-sm font-medium mb-6 shadow-lg shadow-[#39FF14]/20">
              <i className="fas fa-fist-raised mr-2" />
              Black Belt • Private Coaching • Parsippany, NJ
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-3">
              Private Brazilian Jiu-Jitsu Coaching with Earl “The Kaiju”
              Hickson — Parsippany, NJ
            </h1>
            <p className="text-lg sm:text-xl text-[#B7FFB0] mb-8">
              Black Belt Expertise. <strong>First Private Lesson Just $50</strong>{" "}
              (limited-time offer).
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#39FF14] hover:bg-[#39FF14]/85 text-black font-bold shadow-lg shadow-[#39FF14]/30"
                onClick={() =>
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                }
                data-testid="button-book-lesson-hero"
              >
                <i className="fas fa-calendar-alt mr-2" />
                Book Your Lesson
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-black/50 backdrop-blur border-[#39FF14]/50 hover:bg-[#39FF14]/10 text-white hover:border-[#39FF14]"
                onClick={() =>
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </Button>
            </div>

            {/* Logo */}
            <div className="flex justify-center mt-10">
              <img
                src={kaijuLogo}
                alt="Earl the Kaiju Logo"
                className="w-44 h-44 sm:w-56 sm:h-56 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================= ABOUT ========================= */}
      <section id="about" className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">About Earl</h2>
          <p className="text-gray-300 leading-relaxed">
            I’m Earl “The Kaiju” Hickson, a Brazilian Jiu-Jitsu Black Belt with
            over 8 years of teaching experience. I specialize in private and
            small-group lessons for kids, parents, and adults throughout
            Parsippany. My training is personalized, flexible, and designed to
            build confidence, discipline, and real-world self-defense skills in
            a safe, supportive environment.
          </p>
        </div>
      </section>

      {/* ================= WHY TRAIN / PROGRAMS / PROFILE ================= */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Why Train With Me */}
          <div className="mb-16">
            <h2
              className="text-3xl font-bold text-center mb-10 text-[#39FF14]"
              data-testid="section-title-why-train"
            >
              Why Train With Earl the Kaiju
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                ["fa-medal", "IBJJF Black Belt", "Active competitor & experienced coach"],
                ["fa-heart", "Beginner-Friendly", "Safety-first, patient technical approach"],
                ["fa-bullseye", "Customized Plans", "Self-defense, fitness, competition"],
                ["fa-users", "Family Options", "Engaging parent-and-kid sessions"],
              ].map(([icon, title, desc], i) => (
                <div className="text-center" key={i}>
                  <div className="w-16 h-16 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#39FF14]/50">
                    <i className={`fas ${icon} text-black text-2xl`} />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{title}</h3>
                  <p className="text-gray-300 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Services & Pricing (simple table + CTAs) */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#39FF14]">
              Services & Pricing
            </h2>

            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
              <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {[
                  {
                    title: "Private Lessons (1-on-1)",
                    desc: "Tailored coaching focused on your individual goals",
                    price: "$60 / hour",
                  },
                  {
                    title: "Intro Offer",
                    desc: "Your first private session at a discounted rate",
                    price: "$50 (one-time)",
                  },
                  {
                    title: "Semi-Private (2–4 people)",
                    desc: "Train with a friend and split the cost",
                    price: "$40 per person",
                  },
                  {
                    title: "Parent & Me Package",
                    desc: "Ages 5–8 — 4-week bonding series with your child",
                    price: "$200 total",
                  },
                ].map((row, i) => (
                  <div key={i} className="p-5 flex flex-col gap-3">
                    <div>
                      <h3 className="font-semibold">{row.title}</h3>
                      <p className="text-sm text-gray-300">{row.desc}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-[#39FF14] font-semibold">{row.price}</span>
                      <Button
                        size="sm"
                        className="bg-[#39FF14] text-black hover:bg-[#39FF14]/85"
                        onClick={() =>
                          document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        Book / Inquire
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fighter Profile (mimics referenced layout, mobile-first) */}
          <section className="mb-16">
            <div className="bg-black/80 rounded-2xl p-6 sm:p-8 border border-[#39FF14]/20 shadow-xl overflow-hidden">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold">EARL D HICKSON JR</h3>
                <div className="text-[#39FF14] font-semibold">
                  Brazilian Jiu-Jitsu Black Belt
                </div>
                <div className="text-gray-300 text-sm">AMA Fight Club • Parsippany, NJ</div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="bg-white/5 rounded-xl p-4 border border-[#39FF14]/20 h-full flex items-center justify-center min-h-[320px]">
                    <img
                      src={earlBjjPhoto}
                      alt="Earl Hickson Jr. in BJJ gi"
                      className="max-w-full max-h-[420px] object-contain rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-5 border border-[#39FF14]/20">
                    <h4 className="font-bold mb-3">About Earl</h4>
                    <p className="text-gray-300">
                      Brazilian Jiu-Jitsu black belt known for technical precision and competitive
                      success. Medaled at IBJJF, NAGA, and Grappling Industries events. Specializes
                      in personalized coaching across gi & no-gi for all levels.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-5 border border-[#39FF14]/20">
                    <h4 className="font-bold mb-3">Skills & Expertise</h4>
                    {[
                      ["Technique Mastery", 95],
                      ["Competition Experience", 88],
                      ["Teaching Ability", 92],
                      ["Adaptability", 90],
                    ].map(([label, pct], i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-200">{label}</span>
                          <span className="text-[#39FF14] font-medium">{pct}%</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                          <div
                            className="bg-[#39FF14] h-2 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/5 rounded-lg p-4 border border-yellow-500/20 text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-1">
                    {bjjAccomplishments.tournament_history.filter(
                      (t: any) => t.placement === "Gold"
                    ).length}
                  </div>
                  <div className="text-xs text-gray-300 uppercase tracking-wide">
                    Gold Medals
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-gray-300/20 text-center">
                  <div className="text-3xl font-bold text-gray-300 mb-1">
                    {bjjAccomplishments.tournament_history.filter(
                      (t: any) => t.placement === "Silver"
                    ).length}
                  </div>
                  <div className="text-xs text-gray-300 uppercase tracking-wide">
                    Silver Medals
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-orange-600/20 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {bjjAccomplishments.tournament_history.filter(
                      (t: any) => t.placement === "Bronze"
                    ).length}
                  </div>
                  <div className="text-xs text-gray-300 uppercase tracking-wide">
                    Bronze Medals
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-[#39FF14]/20 text-center">
                  <div className="text-3xl font-bold text-[#39FF14] mb-1">10+</div>
                  <div className="text-xs text-gray-300 uppercase tracking-wide">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===================== TESTIMONIALS (Carousel) ===================== */}
          <div className="mb-16 -mx-4 sm:mx-0">
            <TestimonialsCarousel title="What Our Students Say" autoPlayMs={7000} />
          </div>

          {/* ========================= VIDEOS ========================= */}
          <div className="mb-16">
            {socialMediaLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#39FF14] mb-4" />
                <p className="text-gray-300">Loading latest content...</p>
              </div>
            ) : (
              <>
                {youtubePosts.length > 0 && (
                  <div className="mb-12">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                        Latest BJJ Content
                      </h2>
                      <p className="text-gray-400">
                        Check out my latest techniques and training videos
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {youtubePosts.slice(0, 4).map((post) => (
                        <a
                          key={post.postId}
                          href={post.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group bg-gradient-to-br from-black/60 to-black/80 rounded-xl overflow-hidden border border-purple-600/30 hover:border-[#39FF14]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/30"
                        >
                          <div className="relative aspect-video bg-black/60 overflow-hidden">
                            <img
                              src={post.thumbnailUrl || ""}
                              alt={post.caption || "YouTube video thumbnail"}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-red-600/90 rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                <svg
                                  className="w-8 h-8 text-white ml-1"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="p-6">
                            <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                              {post.caption || "Watch on YouTube"}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-[#39FF14] text-xs font-semibold">
                                {new Date(post.timestamp).toLocaleDateString()}
                              </p>
                              <span className="text-gray-400 text-xs">YouTube</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="text-center mt-8">
                      <a
                        href="https://youtube.com/@earldkaiju"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200"
                      >
                        Watch More on YouTube
                      </a>
                    </div>
                  </div>
                )}

                {youtubePosts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No video content available yet.</p>
                    <p className="text-gray-500 text-sm">
                      Content will appear automatically when API keys are configured.
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="text-center">
              <a
                href="https://www.instagram.com/earld.kaiju/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-200"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram text-2xl" />
                Follow on Instagram
              </a>
            </div>
          </div>

          {/* ========================= HOW IT WORKS ========================= */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-[#39FF14]">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                ["Quick Intake", "Discuss goals, any injuries, and preferred schedule"],
                ["Personalized Plan", "Custom 2–6 week roadmap based on your objectives"],
                ["Measurable Progress", "Track technique list and confidence markers"],
                ["Ongoing Support", "Continued guidance and skill development"],
              ].map(([t, d], i) => (
                <div className="text-center" key={i}>
                  <div className="w-12 h-12 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-black shadow-lg shadow-[#39FF14]/50">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{t}</h3>
                  <p className="text-gray-300 text-sm">{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ========================= BOOKING & CONTACT ========================= */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#39FF14]">
              Ready to take the next step?
            </h2>
            <div className="text-center text-gray-300 mb-6 space-y-1">
              <p>
                Email:{" "}
                <a href="mailto:e@ehicksonjr.com" className="underline">
                  e@ehicksonjr.com
                </a>
              </p>
              <p>
                Text or Call:{" "}
                <a href="tel:19732241068" className="underline">
                  973-224-1068
                </a>
              </p>
              <p>Prefer to book online? Reserve your session instantly:</p>
              <Button
                size="lg"
                className="mt-3 bg-[#39FF14] text-black hover:bg-[#39FF14]/85"
                onClick={() =>
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book Your Lesson
              </Button>
            </div>
          </div>

          {/* ========================= BOOKING FORM ========================= */}
          <div id="booking" className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <h2
                className="text-2xl font-bold text-center mb-8 text-[#39FF14]"
                data-testid="booking-form-title"
              >
                Book Your First Session
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12" data-testid="booking-success">
                  <div className="w-20 h-20 bg-[#39FF14]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-[#39FF14]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#39FF14] mb-2">Thank You!</h3>
                  <p className="text-white mb-1 text-lg">
                    Your booking request has been submitted.
                  </p>
                  <p className="text-gray-300 mb-6">
                    I’ll contact you within 24 hours to confirm details.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black font-semibold px-8 py-2"
                    data-testid="button-book-another"
                  >
                    Book Another Session
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                                placeholder="Your name"
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                                placeholder="your.email@example.com"
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone Number *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                              placeholder="(555) 123-4567"
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="program"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Interested Program</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger
                                className="bg-white/20 border-white/30 text-white"
                                data-testid="select-program"
                              >
                                <SelectValue placeholder="Select a program" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="adult-trial">Adult Trial Session ($80)</SelectItem>
                              <SelectItem value="adult-starter">Adult Starter Pack ($300)</SelectItem>
                              <SelectItem value="kids-trial">Kids Trial Session ($70)</SelectItem>
                              <SelectItem value="parent-child">
                                Parent-and-Me Session ($90)
                              </SelectItem>
                              <SelectItem value="small-group">Small Group Training</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Goals & Experience</FormLabel>
                          <FormControl>
                            <Textarea
                              className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                              placeholder="Tell me about your goals, any previous experience, injuries, or questions..."
                              rows={4}
                              data-testid="textarea-goals"
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Preferred Times</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                              placeholder="e.g., Weekday evenings, Saturday mornings"
                              data-testid="input-availability"
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="smsConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="bg-white/20 border-white/30"
                              data-testid="checkbox-sms-consent"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-gray-300 leading-relaxed">
                              I agree to receive text messages about scheduling and training
                              updates. Text messaging originator opt-in data will not be shared with
                              third parties. Reply STOP to opt out.*
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting || bookingMutation.isPending}
                      className="w-full py-4 bg-[#39FF14] text-black hover:bg-[#39FF14]/85 disabled:opacity-50"
                      data-testid="button-submit-booking"
                    >
                      {isSubmitting || bookingMutation.isPending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2" />
                          Request Session
                        </>
                      )}
                    </Button>

                    <p className="text-center text-sm text-gray-400" data-testid="text-follow-up">
                      I’ll text and email you within 24 hours to confirm your session details.
                    </p>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Private Brazilian Jiu-Jitsu Lessons",
            description:
              "One-on-one and small-group BJJ training for adults and kids in Morris County, NJ",
            provider: {
              "@type": "Person",
              name: "Earl Hickson Jr.",
              alternateName: "Earl the Kaiju",
            },
            areaServed: { "@type": "Place", name: "Morris County, NJ" },
            offers: [
              { "@type": "Offer", name: "Adult Trial Session", price: "80", priceCurrency: "USD" },
              { "@type": "Offer", name: "Kids Trial Session", price: "70", priceCurrency: "USD" },
            ],
          }),
        }}
      />
    </div>
  );
}
