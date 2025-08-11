import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { insertBjjBookingSchema, type InsertBjjBooking, type SocialMediaPost } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { OAuthConnect } from "@/components/oauth-connect";
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

  // Fetch social media posts automatically
  const { data: socialMediaData, isLoading: socialMediaLoading } = useQuery({
    queryKey: ['/api/social-media'],
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  const socialMediaPosts = socialMediaData?.posts || [];
  const instagramPosts = socialMediaPosts.filter((post: SocialMediaPost) => post.platform === 'instagram');
  const youtubePosts = socialMediaPosts.filter((post: SocialMediaPost) => post.platform === 'youtube');

  // Auto-fetch Instagram posts on load
  const fetchInstagramMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/social-media/fetch-instagram', {}),
    onSuccess: () => {
      // Refetch social media posts after successful Instagram fetch
      queryClient.invalidateQueries({ queryKey: ['/api/social-media'] });
    },
  });

  // Auto-fetch YouTube posts on load
  const fetchYoutubeMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/social-media/fetch-youtube', {}),
    onSuccess: () => {
      // Refetch social media posts after successful YouTube fetch
      queryClient.invalidateQueries({ queryKey: ['/api/social-media'] });
    },
  });

  // Automatically fetch content when the component loads and when data is empty
  useEffect(() => {
    // Only fetch if we don't have data yet
    if (!socialMediaLoading && socialMediaPosts.length === 0) {
      console.log('No posts found, triggering fetch...');
      fetchInstagramMutation.mutate();
      fetchYoutubeMutation.mutate();
    }
  }, [socialMediaData, socialMediaLoading]);



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
                  <i className="fas fa-bullseye text-black text-2xl"></i>
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

          {/* Auto-Updating Gallery */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#39FF14] drop-shadow-[0_0_20px_#39FF14]" data-testid="section-title-gallery">Training Gallery</h2>
            <p className="text-center text-gray-300 mb-8">Latest training sessions, techniques, and content automatically updated from @earld.kaiju and @earldkaiju</p>
            
            {socialMediaLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#39FF14] mb-4"></div>
                <p className="text-gray-300">Loading latest content...</p>
              </div>
            ) : (
              <>


                {/* Instagram Content */}
                {instagramPosts.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-center mb-8 text-white">Instagram Posts</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {instagramPosts.slice(0, 6).map((post: SocialMediaPost) => (
                        <div key={post.id} className="bg-white/5 backdrop-blur rounded-xl overflow-hidden border border-white/10 hover:border-[#39FF14]/30 transition-all group">
                          <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block">
                            {post.thumbnailUrl || post.mediaUrl ? (
                              <div className="aspect-square bg-black/20 relative overflow-hidden">
                                <img 
                                  src={post.thumbnailUrl || post.mediaUrl} 
                                  alt="Instagram post" 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                {post.mediaType === 'video' && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black/70 rounded-full p-4 shadow-lg">
                                      <svg 
                                        className="w-6 h-6 text-white ml-1" 
                                        fill="currentColor" 
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M8 5v14l11-7z"/>
                                      </svg>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="aspect-square bg-gradient-to-br from-[#39FF14]/20 to-black/40 flex items-center justify-center">
                                <i className="fab fa-instagram text-[#39FF14] text-4xl"></i>
                              </div>
                            )}
                            <div className="p-4">
                              <p className="text-gray-300 text-sm line-clamp-3">
                                {post.caption || 'Check out this post on Instagram'}
                              </p>
                              <p className="text-[#39FF14] text-xs mt-2">
                                {new Date(post.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* YouTube Content */}
                {youtubePosts.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-center mb-8 text-white">YouTube Videos</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {youtubePosts.slice(0, 6).map((post: SocialMediaPost) => (
                        <div key={post.id} className="bg-white/5 backdrop-blur rounded-xl overflow-hidden border border-white/10 hover:border-[#39FF14]/30 transition-all group">
                          <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block">
                            <div className="aspect-video bg-black/20 relative overflow-hidden">
                              {post.thumbnailUrl ? (
                                <img 
                                  src={post.thumbnailUrl} 
                                  alt="YouTube video thumbnail" 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-red-600/20 to-black/40 flex items-center justify-center">
                                  <i className="fab fa-youtube text-red-500 text-4xl"></i>
                                </div>
                              )}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-red-600/90 rounded-full p-4 shadow-lg">
                                  <svg 
                                    className="w-8 h-8 text-white ml-1" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <p className="text-gray-300 text-sm line-clamp-2">
                                {post.caption || 'Watch this video on YouTube'}
                              </p>
                              <p className="text-[#39FF14] text-xs mt-2">
                                {new Date(post.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Media CTAs */}
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href="https://instagram.com/earld.kaiju" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.65-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                    </svg>
                    Follow on Instagram
                  </a>
                  <a 
                    href={`https://youtube.com/@earldkaiju`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Subscribe on YouTube
                  </a>
                </div>

                {/* Accolades Section */}
                <section className="mt-16">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Competition Record
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      Brazilian Jiu-Jitsu competition results and achievements tracked from major tournaments.
                    </p>
                  </div>

                  {/* Accolades will be populated here */}
                  <div className="mb-8 text-center p-6 bg-yellow-900/20 rounded-lg border border-yellow-600/30">
                    <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <h3 className="text-yellow-500 font-semibold mb-2">Competition Tracking</h3>
                    <p className="text-gray-300 text-sm">
                      Setting up automatic tracking of competition results from SmoothComp and IBJJF for Earl D Hickson Jr.
                      Results will appear here once configured.
                    </p>
                  </div>
                </section>



                {/* YouTube Videos Grid */}
                {youtubePosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {youtubePosts.map((post, index) => (
                      <div 
                        key={post.postId} 
                        className={`group ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                      >
                        <a 
                          href={post.permalink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block bg-gradient-to-br from-black/60 to-black/80 rounded-xl overflow-hidden border border-purple-600/30 hover:border-[#39FF14]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-[1.03] hover:-translate-y-2"
                        >
                          <div className={`relative ${index === 0 ? 'aspect-[16/10]' : 'aspect-video'} bg-black/60 overflow-hidden`}>
                            <img 
                              src={post.thumbnailUrl} 
                              alt={post.caption || 'YouTube video thumbnail'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-red-600/90 hover:bg-red-500 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                  <svg 
                                    className="w-8 h-8 text-white ml-1" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
                                Video
                              </div>
                            </div>
                          </div>
                          <div className="p-6">
                            <p className={`text-gray-300 ${index === 0 ? 'text-lg' : 'text-sm'} line-clamp-3 mb-3`}>
                              {post.caption || 'Watch this video on YouTube'}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-[#39FF14] text-xs font-semibold">
                                {new Date(post.timestamp).toLocaleDateString()}
                              </p>
                              <div className="flex items-center gap-2 text-gray-400 text-xs">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                YouTube
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {/* No content state */}
                {youtubePosts.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-400 mb-4">No content available yet</p>
                    <p className="text-gray-500 text-sm">Content will appear automatically when API keys are configured</p>
                  </div>
                )}
              </>
            )}
            
            {/* Social Media Links */}
            <div className="flex justify-center gap-8">
              <a 
                href="https://www.instagram.com/ultrajiujitsu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram text-3xl text-[#39FF14] group-hover:scale-110 transition-transform"></i>
                <div>
                  <h3 className="font-bold text-lg">Instagram</h3>
                  <p className="text-gray-300 text-sm">@ultrajiujitsu</p>
                </div>
              </a>
              
              <a 
                href="https://www.youtube.com/@earldkaiju" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
                data-testid="link-youtube"
              >
                <i className="fab fa-youtube text-3xl text-[#39FF14] group-hover:scale-110 transition-transform"></i>
                <div>
                  <h3 className="font-bold text-lg">YouTube</h3>
                  <p className="text-gray-300 text-sm">@earldkaiju</p>
                </div>
              </a>
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
