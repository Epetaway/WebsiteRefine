import { Router as WouterRouter, Switch, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import CaseStudies from "@/pages/case-studies";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import EarldKaiju from "@/pages/earldkaiju";
import Article from "@/pages/article";
import NotFound from "@/pages/not-found";

function AppRouter() {
  useAnalytics();
  const [location, setLocation] = useHashLocation();

  return (
    <WouterRouter hook={() => [location, setLocation]}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/case-studies" component={CaseStudies} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/earldkaiju" component={EarldKaiju} />
            <Route path="/articles/:slug" component={Article} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </WouterRouter>
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
      <TooltipProvider>
        <AppRouter />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
