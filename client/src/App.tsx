import { Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { ThemeProvider } from "@/contexts/ThemeContext";

import Header from "@/components/layout/header";
import ScrollReveal from '@/components/ui/ScrollReveal';
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import CaseStudy from "@/pages/case-study";
import DeveloperView from "@/pages/developer-view";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import EarldKaiju from "@/pages/earldkaiju";
import Article from "@/pages/article";
import Approach from "@/pages/approach";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import ThemeDemo from "@/pages/theme-demo";
import CaseStudyPreview from "@/pages/case-study-preview";

function AppShell() {
  useAnalytics();

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D] text-[#F5F5F5] font-body">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<Projects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/projects/:slug/dev" element={<DeveloperView />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/earldkaiju" element={<EarldKaiju />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/theme-demo" element={<ThemeDemo />} />
          <Route path="/case-study-preview" element={<CaseStudyPreview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ScrollReveal animation="slide-up" threshold={0.05} once>
        <Footer />
      </ScrollReveal>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn("Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID");
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
      <TooltipProvider>
        <AppShell />
        <Toaster />
      </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
