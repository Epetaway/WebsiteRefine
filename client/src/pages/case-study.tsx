import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
  
  if (!slug) {
    return <Navigate to="/projects" replace />;
  }

  const caseStudy = getCaseStudy(slug);

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
      <Section className="min-h-[60vh] flex items-center bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-purple-950/30">
        <div className="space-y-6">
          <ScrollReveal animation="slide-up">
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
              Case Study
            </Badge>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-slate-50 tracking-tight">
              {caseStudy.title}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={150}>
            <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl">
              {caseStudy.subtitle}
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={200}>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technical.techStack.slice(0, 5).map((tech) => (
                <Badge key={tech} variant="outline" className="border-gray-300 dark:border-slate-700">
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
