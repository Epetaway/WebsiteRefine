import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
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
import kaijuWordmark from "@/images/kaiju-logo.png";
import earlBjjPhoto from "@/images/earl-bjj-photo.png";
import bjjAccomplishments from "@/data/bjj-accomplishments.json";

const KAijuGreen = "var(--kaiju-green, #86d64a)";
const KAijuGreen20 = "var(--kaiju-green-20, rgba(134,214,74,.2))";

type TTestimonial = { name: string; relationship?: string; text: string; rating?: number };
const testimonials: TTestimonial[] = [
  { name: "Alex Johnson", relationship: "Student", text: "Private sessions tailored to pace and technique—supportive community and real progress.", rating: 5 },
  { name: "Emily Clarke", relationship: "Student", text: "High-energy group training with clear instruction and modern drills.", rating: 5 },
  { name: "Linda Thompson", relationship: "Parent", text: "My son's confidence and discipline grew in a safe, positive environment.", rating: 5 },
  { name: "Carlos Ramirez", relationship: "Student", text: "Strategic coaching and on-the-fly adjustments that translated to competition success.", rating: 5 },
];

export default function EarldKaiju() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const { data: socialMediaData, isLoading: socialMediaLoading } = useQuery({
    queryKey: ["/api/social-media"],
    refetchInterval: 5 * 60 * 1000,
  });

  const posts: SocialMediaPost[] = (socialMediaData as { posts: SocialMediaPost[] })?.posts || [];
  const youtubePosts = posts.filter((p) => p.platform === "youtube").map((p) => ({
    ...p,
    caption: p.caption ?? null,
    thumbnailUrl: p.thumbnailUrl ?? null,
  }));

  useEffect(() => {
    if (!socialMediaLoading && posts.length === 0) {
      queryClient.invalidateQueries({ queryKey: ["/api/social-media"] });
    }
  }, [socialMediaLoading, posts.length, queryClient]);

  const golds = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Gold").length;
  const silvers = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Silver").length;
  const bronzes = bjjAccomplishments.tournament_history.filter((t: any) => t.placement === "Bronze").length;

  const title = "Private Brazilian Jiu-Jitsu Lessons – Earl “The Kaiju” Hickson | Parsippany, NJ";
  const description =
    "Black Belt private BJJ coaching in Parsippany, NJ. First private lesson $50 (limited-time). One-on-one, kids, semi-private, and Parent & Me sessions.";

  return (
    <div className="bg-black text-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Private Brazilian Jiu-Jitsu coaching with Earl “The Kaiju” Hickson in Parsippany, NJ. First lesson $50." />
        <meta property="og:title" content="Private BJJ Lessons – Earl “The Kaiju” Hickson" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="relative py-16 md:py-20 text-left">
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
            <Button size="lg" className="text-black" style={{ backgroundColor: KAijuGreen }} onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>
              <i className="fas fa-calendar-alt mr-2" />
              Book Your Lesson
            </Button>
            <a href="mailto:e@ehicksonjr.com" className="inline-flex items-center px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <i className="fas fa-envelope mr-2" />
              Email Me
            </a>
          </div>
        </div>
      </section>

      <section id="booking" className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 rounded-2xl p-8 bg-white/[0.06] shadow-2xl shadow-black/40">
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
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                              <SelectItem value="adult-private">Private Lessons (Adult) – $60/hr</SelectItem>
                              <SelectItem value="intro-offer">Intro Offer – First private $50</SelectItem>
                              <SelectItem value="semi-private">Semi-Private (2–4) – $40/person</SelectItem>
                              <SelectItem value="kids">Kids BJJ</SelectItem>
                              <SelectItem value="parent-me">Parent & Me – 4-week $200</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="goals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Goals & Experience</FormLabel>
                            <FormControl>
                              <Textarea
                                className="bg-white/10 focus:bg-white/15"
                                placeholder="Goals, prior experience, injuries, questions…"
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

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Preferred Times</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-white/10 focus:bg-white/15"
                                placeholder="e.g., Weeknights, Sat mornings"
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
                        control={form.control}
                        name="smsConsent"
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

                      <Button type="submit" disabled={isSubmitting || bookingMutation.isPending} className="w-full text-black" style={{ backgroundColor: KAijuGreen }}>
                        {isSubmitting || bookingMutation.isPending ? "Submitting…" : "Request Session"}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>

            <div className="lg:col-span-2">
              <section id="offer" className="py-0">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="rounded-2xl p-6 shadow-xl shadow-black/40 bg-kaiju-cream">
                    <h3 className="font-bold text-lg text-gray-900">Private Lessons (1-on-1)</h3>
                    <p className="text-sm mt-2 text-gray-700">Tailored coaching for self-defense fundamentals, competition prep, and overall fitness. Technical drills, positional rounds, and video review when helpful.</p>
                    <div className="mt-4 text-sm space-y-2 text-gray-800">
                      <div className="flex justify-between"><span>Price</span><span className="font-semibold">$60 / hour</span></div>
                      <div className="flex justify-between"><span>Intro Offer</span><span className="font-semibold">$50 (one-time)</span></div>
                    </div>
                    <div className="mt-5">
                      <Button className="w-full text-black" style={{ backgroundColor: KAijuGreen }} onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>Book</Button>
                    </div>
                  </div>

                  <div className="rounded-2xl p-6 shadow-xl shadow-black/40 bg-kaiju-cream">
                    <h3 className="font-bold text-lg text-gray-900">Semi-Private (2–4 people)</h3>
                    <p className="text-sm mt-2 text-gray-700">Train with a friend or small group and split the cost. Focus on partner-based situational drills and sparring with coaching feedback.</p>
                    <div className="mt-4 text-sm text-gray-800">
                      <div className="flex justify-between"><span>Price</span><span className="font-semibold">$40 per person</span></div>
                    </div>
                    <div className="mt-5">
                      <Button className="w-full text-black" style={{ backgroundColor: KAijuGreen }} onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>Book</Button>
                    </div>
                  </div>

                  <div className="rounded-2xl p-6 shadow-xl shadow-black/40 bg-kaiju-cream">
                    <h3 className="font-bold text-lg text-gray-900">Parent & Me Package</h3>
                    <p className="text-sm mt-2 text-gray-700">Ages 5–8. A 4-week bonding series introducing balance, grips, safe holds, and playful self-defense fundamentals in a supportive setting.</p>
                    <div className="mt-4 text-sm text-gray-800">
                      <div className="flex justify-between"><span>Price</span><span className="font-semibold">$200 total</span></div>
                    </div>
                    <div className="mt-5">
                      <Button className="w-full text-black" style={{ backgroundColor: KAijuGreen }} onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>Book</Button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="py-14">
                <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-start">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">About Earl</h2>
                    <p className="text-gray-200 leading-relaxed">
                      I’m Earl “The Kaiju” Hickson, a Brazilian Jiu-Jitsu Black Belt with over 8 years of teaching experience in Parsippany.
                      I specialize in private and small-group lessons for kids, parents, and adults. Training is personalized and safe, focused on confidence, discipline, and real-world control.
                    </p>
                    <div className="mt-4">
                      <p className="text-gray-300">
                        Game plan: establish boundaries, slow the fight, and create advantages using <strong>lapel guard</strong>, <strong>half guard</strong>,
                        <strong> inversions</strong>, <strong>wrestling</strong>, and <strong>judo</strong>. Use size and strength intelligently to achieve dominance.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Lapel Guard", "Half Guard", "Inversions", "Wrestling", "Judo", "Pressure Passing"].map((t) => (
                          <span key={t} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: KAijuGreen, backgroundColor: KAijuGreen20 }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {!socialMediaLoading && youtubePosts.length > 0 && (
                      <div className="mt-8">
                        <h3 className="font-semibold mb-3">Latest BJJ Content</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                          {youtubePosts.slice(0, 4).map((p) => (
                            <a key={p.postId} href={p.permalink} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden bg-white/[0.06] hover:bg-white/[0.1] transition-colors shadow-lg shadow-black/40">
                              <div className="aspect-video bg-black/50">
                                {p.thumbnailUrl ? (
                                  <img src={p.thumbnailUrl} alt={p.caption || "YouTube video"} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full grid place-items-center text-sm text-gray-400">Video</div>
                                )}
                              </div>
                              <div className="p-3 text-sm text-gray-300 line-clamp-2">{p.caption || "Watch on YouTube"}</div>
                            </a>
                          ))}
                        </div>
                        <div className="mt-3 flex gap-3">
                          <a className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors" href="https://youtube.com/@earldkaiju" target="_blank" rel="noopener noreferrer">YouTube</a>
                          <a className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors" href="https://www.instagram.com/earld.kaiju/" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                      </div>
                    )}
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

              <section aria-label="Testimonials" className="w-full">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-fixed bg-center bg-cover"
                    style={{ backgroundImage: `url(${kaijuBanner})`, opacity: 0.25 }}
                  />
                  <div className="relative">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {testimonials.map((t, i) => (
                          <div key={i} className="rounded-2xl p-6 bg-black/70 backdrop-blur shadow-xl">
                            <div className="flex items-center gap-2 text-yellow-400 mb-3" aria-label={`${t.rating ?? 5} out of 5 stars`}>
                              {[...Array(t.rating ?? 5)].map((_, idx) => (
                                <i key={idx} className="fas fa-star" />
                              ))}
                            </div>
                            <p className="text-gray-100 text-sm leading-relaxed">“{t.text}”</p>
                            <div className="mt-4 text-sm text-gray-300 font-semibold">
                              {t.name}{t.relationship ? <span className="font-normal text-gray-400"> — {t.relationship}</span> : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "Private Brazilian Jiu-Jitsu Lessons",
                    "description": "One-on-one and small-group BJJ training for adults and kids in Parsippany, NJ",
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
