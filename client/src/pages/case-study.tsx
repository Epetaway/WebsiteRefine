import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getCaseStudy } from "@/data/caseStudies";
import { ExternalLink, Github, Code2 } from "lucide-react";

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [loadingScreenshots, setLoadingScreenshots] = useState(true);
  
  const caseStudy = slug ? getCaseStudy(slug) : null;

  // Fetch screenshots dynamically from GitHub
  useEffect(() => {
    const fetchScreenshots = async () => {
      if (!caseStudy?.repo) {
        setLoadingScreenshots(false);
        return;
      }

      // Try multiple possible screenshot locations
      const possiblePaths = [
        'public/assets/screenshots',
        'assets/screenshots',
        'screenshots',
        'src/assets/screenshots'
      ];

      for (const path of possiblePaths) {
        try {
          const apiUrl = `https://api.github.com/repos/Epetaway/${caseStudy.repo}/contents/${path}`;
          const response = await fetch(apiUrl);
          
          if (response.ok) {
            const files = await response.json();
            
            // Filter for image files and get their raw URLs
            const imageUrls = files
              .filter((file: any) => 
                file.type === 'file' && 
                /\.(png|jpg|jpeg|svg|gif|webp)$/i.test(file.name)
              )
              .map((file: any) => 
                `https://raw.githubusercontent.com/Epetaway/${caseStudy.repo}/main/${path}/${file.name}`
              );
            
            if (imageUrls.length > 0) {
              setScreenshots(imageUrls);
              setLoadingScreenshots(false);
              return; // Found screenshots, stop trying other paths
            }
          }
        } catch (error) {
          // Try next path
          continue;
        }
      }
      
      // No screenshots found in any location
      setLoadingScreenshots(false);
    };

    fetchScreenshots();
  }, [caseStudy?.repo]);
  
  if (!slug) {
    return <Navigate to="/projects" replace />;
  }

  if (!caseStudy) {
    return <Navigate to="/projects" replace />;
  }


  return (
    <>
      <Helmet>
        <title>{caseStudy.title} | Case Study - Earl Hickson Jr.</title>
        <meta name="description" content={caseStudy.summary} />
      </Helmet>

      {/* Hero Section */}
      <Section className="min-h-[60vh] flex items-center bg-gradient-to-br from-blue-600 to-emerald-600">
        <div className="space-y-6">
          <ScrollReveal animation="slide-up">
            <Badge className="bg-white/10 text-white border-white/30">
              Case Study
            </Badge>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              {caseStudy.title}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={150}>
            <p className="text-xl text-blue-50 max-w-3xl">
              {caseStudy.subtitle}
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={200}>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technical.techStack.slice(0, 5).map((tech) => (
                <Badge key={tech} variant="outline" className="border-white/30 text-white">
                  {tech}
                </Badge>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Project Overview */}
      <Section className="bg-white dark:bg-slate-950">
        <ScrollReveal animation="slide-up">
          <SectionHeader 
            preLabel="// Overview"
            title="Project Overview"
          />
        </ScrollReveal>
        
        <ScrollReveal animation="fade" delay={100}>
          <Card className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">Summary</h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                  {caseStudy.overview.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">Problem Statement</h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                  {caseStudy.overview.problem}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">High-Level Goals</h3>
                <ul className="space-y-2">
                  {caseStudy.overview.goals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-slate-300">
                      <span className="text-emerald-500 mt-1.5">•</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </Section>

      {/* My Role & Responsibilities */}
      <Section className="bg-gray-50 dark:bg-slate-900">
        <ScrollReveal animation="slide-up">
          <SectionHeader 
            preLabel="// Contributions"
            title="My Role & Responsibilities"
          />
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 gap-6">
          {caseStudy.role.map((item, idx) => (
            <ScrollReveal key={idx} animation="slide-up" delay={idx * 50}>
              <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 p-6 h-full card-hover">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Technical Approach */}
      <Section className="bg-white dark:bg-slate-950">
        <ScrollReveal animation="slide-up">
          <SectionHeader 
            preLabel="// Engineering"
            title="Technical Approach"
          />
        </ScrollReveal>
        
        <ScrollReveal animation="fade" delay={100}>
          <Card className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800 p-8">
            <div className="space-y-8">
              {/* Architecture Overview */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
                  Architecture Overview
                </h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
                  {caseStudy.technical.architecture}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.technical.techStack.map((tech) => (
                    <Badge 
                      key={tech} 
                      className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Implementation Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
                  Implementation Highlights
                </h3>
                <div className="space-y-4">
                  {caseStudy.technical.approach.map((item, idx) => (
                    <div key={idx} className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="font-semibold text-gray-900 dark:text-slate-50 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </Section>

      {/* Project Screenshots Gallery - Bento Grid */}
      {screenshots.length > 0 && (
        <Section className="bg-white dark:bg-slate-950">
          <ScrollReveal animation="slide-up">
            <SectionHeader 
              preLabel="// Gallery"
              title="Project Screenshots"
            />
          </ScrollReveal>
          
          <ScrollReveal animation="fade" delay={100}>
            {/* Bento Grid Layout - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
              {screenshots.map((screenshot, idx) => {
                // Create varied bento grid patterns
                const getBentoClass = (index: number) => {
                  const pattern = index % 6;
                  if (pattern === 0) return 'md:col-span-2 md:row-span-2'; // Large
                  if (pattern === 1) return 'md:row-span-2'; // Tall
                  if (pattern === 2) return 'md:col-span-2'; // Wide
                  return ''; // Standard
                };
                
                return (
                  <div
                    key={idx}
                    className={`group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800 shadow-md hover:shadow-xl transition-all duration-300 ${getBentoClass(idx)}`}
                  >
                    <img
                      src={screenshot}
                      alt={`${caseStudy.title} screenshot ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900">
                              <div class="text-center p-6">
                                <svg class="w-12 h-12 mx-auto mb-2 text-gray-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p class="text-sm text-gray-500 dark:text-slate-400">Screenshot ${idx + 1}</p>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium">View Screenshot</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* Business Outcomes */}
      <Section className="bg-gray-50 dark:bg-slate-900">
        <ScrollReveal animation="slide-up">
          <SectionHeader 
            preLabel="// Impact"
            title="Business Outcomes"
          />
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudy.outcomes.map((outcome, idx) => {
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
              green: 'from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700',
              gold: 'from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700',
            };
            
            return (
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 75}>
                <Card className={`bg-gradient-to-br ${colorClasses[outcome.color]} p-6 border-0 text-white card-hover`}>
                  <div className="text-4xl font-bold mb-2">{outcome.metric}</div>
                  <div className="text-lg font-semibold mb-2">{outcome.label}</div>
                  <div className="text-sm opacity-90">{outcome.description}</div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Section>

      {/* Explore Live Implementation */}
      <Section className="bg-gradient-to-br from-blue-600 to-emerald-600">
        <ScrollReveal animation="slide-up">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Explore Live Implementation
              </h2>
              <p className="text-xl text-blue-50">
                See this project in action and dive into the technical details
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {caseStudy.demoUrl && (
                <a 
                  href={caseStudy.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 shadow-lg button-lift">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View Live Demo
                  </Button>
                </a>
              )}
              
              <Link to={`/projects/${slug}/dev`}>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 shadow-lg button-lift backdrop-blur-sm">
                  <Code2 className="mr-2 h-5 w-5" />
                  Developer View
                </Button>
              </Link>
              
              <a 
                href={caseStudy.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 shadow-lg button-lift backdrop-blur-sm">
                  <Github className="mr-2 h-5 w-5" />
                  View Source Code
                </Button>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Back to Projects */}
      <Section className="bg-white dark:bg-slate-950">
        <ScrollReveal animation="fade">
          <div className="text-center">
            <Link to="/projects">
              <Button variant="outline" size="lg" className="border-gray-300 dark:border-slate-700">
                ← Back to All Projects
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
