import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ui/ScrollReveal";
import aboutImage from "@/images/BLKBELT.png";

export default function About() {
  return (
    <div>
      <Helmet>
        <title>About — Earl Hickson Jr. | Front-End Developer</title>
        <meta
          name="description"
          content="Front-End Developer in Parsippany, NJ. Building accessible, performance-focused user interfaces with React, TypeScript, and modern JavaScript. BJJ black belt and mentor."
        />
        <link rel="canonical" href="https://www.ehicksonjr.com/about" />
        <meta property="og:title" content="About — Earl Hickson Jr." />
        <meta
          property="og:description"
          content="Front-End Developer focused on React, accessibility and performance. BJJ black belt and mentor."
        />
        <meta property="og:type" content="profile" />
      </Helmet>

      {/* Header - Hero with subtle background motif */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
        
        {/* Spotlight effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-[1120px] mx-auto px-5">
          <ScrollReveal animation="slide-up" className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100 tracking-tight font-serif" data-testid="page-title">
              <span className="block text-purple-600 dark:text-purple-400">Code, Culture,</span>
              <span className="block">and Discipline.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light italic">
              I am a front-end developer based in Parsippany, NJ with over six years of experience building modern, accessible interfaces.<br />
              My background in graphic design and Brazilian Jiu-Jitsu gives me a structured, disciplined approach to UI engineering.<br />
              I have contributed to healthcare platforms, nonprofit campaigns, and community-focused brands—always with a focus on clarity and maintainability.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="slide-up">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight" data-testid="section-title-background">
                  Background
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  I started in graphic design before moving into front-end development, where I discovered how much I enjoy building interfaces that do not just look good—they feel good to use. My work spans healthcare, nonprofits, membership systems, and community brands.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Years of Brazilian Jiu-Jitsu training shaped my mindset: discipline, patience, refinement. The same approach fuels how I write code, architect components, and collaborate with teams.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={100}>
              <div className="relative group">
                {/* Photo card with enhanced styling */}
                <div className="relative overflow-hidden rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-purple-500/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-4 border-transparent group-hover:border-purple-500/40">
                  <img
                    src={aboutImage}
                    alt="Earl Hickson Jr. training Brazilian Jiu-Jitsu"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-105"
                    data-testid="about-image"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium flex items-center gap-2"><span className="text-purple-400">✦</span>Black Belt, Brazilian Jiu-Jitsu</p>
                    <p className="text-xs opacity-90">Discipline in training, precision in code</p>
                  </div>
                </div>
                
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-2xl -z-10" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section - with contact info and social links */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-[1120px] mx-auto px-5">
          <ScrollReveal animation="slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-900 dark:text-gray-100 tracking-tight text-center" data-testid="section-title-contact">
              Get In Touch
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contact Info Card */}
            <ScrollReveal animation="slide-up" delay={0}>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm card-hover border border-gray-200 dark:border-gray-700 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">✉️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Contact Information</h3>
                </div>
                <div className="space-y-4">
                  <a 
                    href="mailto:e@ehicksonjr.com" 
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <span className="text-lg">📧</span>
                    <span className="font-medium">e@ehicksonjr.com</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-lg">📍</span>
                    <span className="font-medium">Parsippany, NJ</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Social Links Card */}
            <ScrollReveal animation="slide-up" delay={60}>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm card-hover border border-gray-200 dark:border-gray-700 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-xl">🔗</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Connect With Me</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="https://github.com/Epetaway" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <span>💻</span>
                    <span className="font-medium text-sm">GitHub</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/earlhicksonjr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>💼</span>
                    <span className="font-medium text-sm">LinkedIn</span>
                  </a>
                  <a 
                    href="https://twitter.com/epetaway" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <span>🐦</span>
                    <span className="font-medium text-sm">X (Twitter)</span>
                  </a>
                  <a 
                    href="https://instagram.com/earld.kaiju" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                  >
                    <span>📸</span>
                    <span className="font-medium text-sm">Instagram</span>
                  </a>
                  <a 
                    href="https://youtube.com/@earldkaiju" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <span>🎬</span>
                    <span className="font-medium text-sm">YouTube</span>
                  </a>
                  <a 
                    href="https://dribbble.com/earldkaiju" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                  >
                    <span>🎨</span>
                    <span className="font-medium text-sm">Dribbble</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section - matches Home page gradient CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-emerald-600">
        <div className="max-w-[1120px] mx-auto px-5 text-center">
          <ScrollReveal animation="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Ready to bring your project to life with clean code and thoughtful design?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:e@ehicksonjr.com" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20">
                Get In Touch
              </a>
              <Link to="/projects" className="btn-primary bg-white text-blue-600 hover:bg-slate-50">
                View Projects
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
