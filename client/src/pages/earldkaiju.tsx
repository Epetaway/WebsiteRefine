import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertBjjBookingSchema, type InsertBjjBooking } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import kaijuBanner from "@assets/ChatGPT Image Aug 11, 2025, 03_10_18 PM_1754939460671.png";

export default function EarldKaiju() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast({
        title: "Booking Request Submitted!",
        description: "I'll text and email you within 24 hours to confirm your session details.",
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

  return (
    <div className="pt-16">
      {/* Hero Section with Banner */}
      <section className="relative py-20 bg-black text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${kaijuBanner})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#39FF14]/20 backdrop-blur-sm text-[#39FF14] border border-[#39FF14]/30 text-sm font-medium mb-6 shadow-lg shadow-[#39FF14]/20">
              <i className="fas fa-fist-raised mr-2"></i>
              IBJJF Black Belt • Competitor • Coach
            </div>
            
            {/* Kaiju Logo Image */}
            <div className="flex justify-center mb-8">
              <img 
                src={kaijuBanner} 
                alt="Earl the Kaiju Logo" 
                className="w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                data-testid="kaiju-logo"
              />
            </div>
            
            <p className="text-xl lg:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto drop-shadow-lg" data-testid="hero-description">
              One-on-one and small-group training for adults and kids in Morris County, NJ. Build real skills, safely and fast.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#39FF14] hover:bg-[#39FF14]/80 text-black font-bold shadow-lg shadow-[#39FF14]/30 hover:shadow-[#39FF14]/50 transition-all"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-book-lesson"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Book a Lesson
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-black/50 backdrop-blur border-[#39FF14]/50 hover:bg-[#39FF14]/10 text-white hover:border-[#39FF14] transition-all"
                onClick={() => document.getElementById('kids-program')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-kids-program"
              >
                <i className="fas fa-child mr-2"></i>
                See Kids Program
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Rest of Content */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Why Train With Me */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#39FF14] drop-shadow-[0_0_20px_#39FF14]" data-testid="section-title-why-train">Why Train With Earl the Kaiju</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#39FF14]/50 hover:shadow-[#39FF14]/70 transition-all">
                  <i className="fas fa-medal text-black text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold mb-2" data-testid="feature-black-belt">IBJJF Black Belt</h3>
                <p className="text-gray-300 text-sm">Active competitor and experienced coach with proven results</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#39FF14]/50 hover:shadow-[#39FF14]/70 transition-all">
                  <i className="fas fa-heart text-black text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold mb-2" data-testid="feature-beginner-friendly">Beginner-Friendly</h3>
                <p className="text-gray-300 text-sm">Technical, safety-first approach perfect for new practitioners</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#39FF14]/50 hover:shadow-[#39FF14]/70 transition-all">
                  <i className="fas fa-target text-black text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold mb-2" data-testid="feature-customized">Customized Plans</h3>
                <p className="text-gray-300 text-sm">Tailored training for self-defense, fitness, or competition goals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#39FF14]/50 hover:shadow-[#39FF14]/70 transition-all">
                  <i className="fas fa-users text-black text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold mb-2" data-testid="feature-family">Family Options</h3>
                <p className="text-gray-300 text-sm">Parent-and-kid sessions that are engaging and fun</p>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div id="programs" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#39FF14] drop-shadow-[0_0_20px_#39FF14]" data-testid="section-title-programs">Training Programs</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Adults Program */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-4" data-testid="program-adults-title">Adults (60-90 min)</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-[#39FF14] mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-semibold" data-testid="adult-foundations">Foundations</h4>
                      <p className="text-gray-300 text-sm">Posture, frames, escapes, guard retention fundamentals</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-[#39FF14] mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-semibold" data-testid="adult-self-defense">Self-Defense</h4>
                      <p className="text-gray-300 text-sm">Clinch work, trips/throws, control to disengage safely</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-[#39FF14] mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-semibold" data-testid="adult-conditioning">Conditioning</h4>
                      <p className="text-gray-300 text-sm">Movement patterns, drilling, safe intensity building</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Investment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Trial Session</span>
                      <span className="font-semibold" data-testid="price-adult-trial">$80</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Starter Pack (4 sessions)</span>
                      <span className="font-semibold" data-testid="price-adult-starter">$300</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Progress Pack (8 sessions)</span>
                      <span className="font-semibold" data-testid="price-adult-progress">$560</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Kids Program */}
              <div id="kids-program" className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-4" data-testid="program-kids-title">Kids (45-60 min)</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-[#39FF14] mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-semibold" data-testid="kids-play-based">Play-Based Learning</h4>
                      <p className="text-gray-300 text-sm">Games for balance, grip strength, and body awareness</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-[#39FF14] mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-semibold" data-testid="kids-anti-bullying">Anti-Bullying</h4>
                      <p className="text-gray-300 text-sm">Verbal boundaries → defensive grips → safe holds</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-[#39FF14] mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-semibold" data-testid="kids-parent-me">Parent-and-Me</h4>
                      <p className="text-gray-300 text-sm">Special sessions available for family bonding</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Investment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Trial Session</span>
                      <span className="font-semibold" data-testid="price-kids-trial">$70</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Small Group (2-4 kids)</span>
                      <span className="font-semibold" data-testid="price-kids-group">From $40/person</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parent-and-Me</span>
                      <span className="font-semibold" data-testid="price-parent-me">$90/session</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#39FF14] drop-shadow-[0_0_20px_#39FF14]" data-testid="section-title-how-it-works">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-black shadow-lg shadow-[#39FF14]/50">1</div>
                <h3 className="text-lg font-bold mb-2" data-testid="step-1-title">Quick Intake</h3>
                <p className="text-gray-300 text-sm">Discuss goals, any injuries, and preferred schedule</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-black shadow-lg shadow-[#39FF14]/50">2</div>
                <h3 className="text-lg font-bold mb-2" data-testid="step-2-title">Personalized Plan</h3>
                <p className="text-gray-300 text-sm">Custom 2-6 week roadmap based on your objectives</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-black shadow-lg shadow-[#39FF14]/50">3</div>
                <h3 className="text-lg font-bold mb-2" data-testid="step-3-title">Measurable Progress</h3>
                <p className="text-gray-300 text-sm">Track technique list and confidence markers</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-black shadow-lg shadow-[#39FF14]/50">4</div>
                <h3 className="text-lg font-bold mb-2" data-testid="step-4-title">Ongoing Support</h3>
                <p className="text-gray-300 text-sm">Continued guidance and skill development</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#39FF14] drop-shadow-[0_0_20px_#39FF14]" data-testid="section-title-faq">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="experience" className="bg-white/10 backdrop-blur rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-left hover:no-underline" data-testid="faq-experience-trigger">
                    Do I need experience to start?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-6" data-testid="faq-experience-content">
                    No experience necessary! Most of my clients start from zero. I specialize in teaching beginners with a patient, technical approach that prioritizes safety and understanding.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="gi-nogi" className="bg-white/10 backdrop-blur rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-left hover:no-underline" data-testid="faq-gi-trigger">
                    Gi or No-Gi training?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-6" data-testid="faq-gi-content">
                    Either! I'll advise based on your goals. Gi training emphasizes grips and patience, while No-Gi focuses on movement and athleticism. We can do both or focus on your preference.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="location" className="bg-white/10 backdrop-blur rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-left hover:no-underline" data-testid="faq-location-trigger">
                    Where do we train?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-6" data-testid="faq-location-content">
                    Local mats and gym facilities in Morris County, or I can come to your location (travel fee may apply). I'll help coordinate the best training space for your needs.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="equipment" className="bg-white/10 backdrop-blur rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-left hover:no-underline" data-testid="faq-equipment-trigger">
                    What should I bring?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-6" data-testid="faq-equipment-content">
                    Just bring water and comfortable athletic clothes. I can provide a loaner gi if needed. I'll give you a full equipment list after our initial consultation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Instagram Integration */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#39FF14] drop-shadow-[0_0_20px_#39FF14]" data-testid="section-title-instagram">Follow the Journey</h2>
            <div className="text-center mb-8">
              <p className="text-gray-300 mb-6">See recent training sessions, techniques, and student progress on Instagram</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                <div className="aspect-square bg-gradient-to-br from-[#39FF14] to-[#00FF00] rounded-xl flex items-center justify-center">
                  <i className="fas fa-play text-white text-2xl"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-[#39FF14] to-[#00FF00] rounded-xl flex items-center justify-center">
                  <i className="fas fa-image text-white text-2xl"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-[#39FF14] to-[#00FF00] rounded-xl flex items-center justify-center">
                  <i className="fas fa-video text-white text-2xl"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-[#39FF14] to-[#00FF00] rounded-xl flex items-center justify-center md:block hidden">
                  <i className="fas fa-image text-white text-2xl"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-[#39FF14] to-[#00FF00] rounded-xl flex items-center justify-center md:block hidden">
                  <i className="fas fa-play text-white text-2xl"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-[#39FF14] to-[#00FF00] rounded-xl flex items-center justify-center md:block hidden">
                  <i className="fas fa-image text-white text-2xl"></i>
                </div>
              </div>
              
              <Button asChild className="bg-gradient-to-r from-[#39FF14] to-[#00FF00] hover:opacity-90" data-testid="button-instagram">
                <a href="https://www.instagram.com/earld.kaiju/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram mr-2"></i>
                  Watch More on Instagram
                </a>
              </Button>
            </div>
          </div>

          {/* Booking Form */}
          <div id="booking" className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-center mb-8 text-[#39FF14] drop-shadow-[0_0_20px_#39FF14]" data-testid="booking-form-title">Book Your First Session</h2>
              
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
                            <SelectTrigger className="bg-white/20 border-white/30 text-white" data-testid="select-program">
                              <SelectValue placeholder="Select a program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="adult-trial">Adult Trial Session ($80)</SelectItem>
                            <SelectItem value="adult-starter">Adult Starter Pack ($300)</SelectItem>
                            <SelectItem value="kids-trial">Kids Trial Session ($70)</SelectItem>
                            <SelectItem value="parent-child">Parent-and-Me Session ($90)</SelectItem>
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
                            {...field}
                            className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                            placeholder="Tell me about your goals, any previous experience, injuries, or questions..."
                            rows={4}
                            data-testid="textarea-goals"
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
                            {...field}
                            className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                            placeholder="e.g., Weekday evenings, Saturday mornings"
                            data-testid="input-availability"
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
                            I agree to receive text messages about scheduling and training updates. Text messaging originator opt-in data will not be shared with third parties. Reply STOP to opt out.*
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || bookingMutation.isPending}
                    className="w-full py-4 bg-[#39FF14] text-white hover:bg-[#39FF14]/80 disabled:opacity-50"
                    data-testid="button-submit-booking"
                  >
                    {isSubmitting || bookingMutation.isPending ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Request Session
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-sm text-gray-400" data-testid="text-follow-up">
                    I'll text and email you within 24 hours to confirm your session details.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD for BJJ Service */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Private Brazilian Jiu-Jitsu Lessons",
            "description": "One-on-one and small-group BJJ training for adults and kids in Morris County, NJ",
            "provider": {
              "@type": "Person",
              "name": "Earl Hickson Jr.",
              "alternateName": "Earl the Kaiju"
            },
            "areaServed": {
              "@type": "Place",
              "name": "Morris County, NJ"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Adult Trial Session",
                "price": "80",
                "priceCurrency": "USD"
              },
              {
                "@type": "Offer", 
                "name": "Kids Trial Session",
                "price": "70",
                "priceCurrency": "USD"
              }
            ]
          })
        }}
      />
    </div>
  );
}
