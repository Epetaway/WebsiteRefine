import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getCaseStudy } from "@/data/caseStudies";
import { Code2, Gauge, Accessibility, Package } from "lucide-react";

export default function DeveloperView() {
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
        <title>{caseStudy.title} | Developer View - Earl Hickson Jr.</title>
        <meta name="description" content={`Technical deep dive into ${caseStudy.title}`} />
      </Helmet>

      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white">
        <div className="space-y-6">
          <ScrollReveal animation="slide-up">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Developer View
            </Badge>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {caseStudy.title}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={150}>
            <p className="text-xl text-slate-300 max-w-3xl">
              Technical architecture and design system details for developers and engineering teams
            </p>
          </ScrollReveal>
        </div>
      </Section>

      {/* Project Architecture */}
      <Section className="bg-white dark:bg-slate-950">
        <ScrollReveal animation="slide-up">
          <SectionHeader 
            preLabel="// Architecture"
            title="Project Architecture"
          />
        </ScrollReveal>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Architecture Description */}
          <ScrollReveal animation="fade" delay={100}>
            <Card className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800 p-6 h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-2">
                    System Design
                  </h3>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                    {caseStudy.technical.architecture}
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Tech Stack */}
          <ScrollReveal animation="fade" delay={150}>
            <Card className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800 p-6 h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Package className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
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
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </Section>

      {/* Design System Tokens */}
      <Section className="bg-gray-50 dark:bg-slate-900">
        <ScrollReveal animation="slide-up">
          <SectionHeader 
            preLabel="// Design System"
            title="Design Tokens & System Architecture"
          />
        </ScrollReveal>
        
        <ScrollReveal animation="fade" delay={100}>
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 p-8">
            <div className="space-y-8">
              {/* Color Tokens */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-4">
                  Color Tokens
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="h-20 bg-blue-500 rounded-lg mb-2"></div>
                    <div className="text-sm font-mono text-gray-700 dark:text-slate-300">Primary Blue</div>
                    <div className="text-xs font-mono text-gray-500 dark:text-slate-500">#3B82F6</div>
                  </div>
                  <div>
                    <div className="h-20 bg-emerald-500 rounded-lg mb-2"></div>
                    <div className="text-sm font-mono text-gray-700 dark:text-slate-300">Success Green</div>
                    <div className="text-xs font-mono text-gray-500 dark:text-slate-500">#10B981</div>
                  </div>
                  <div>
                    <div className="h-20 bg-amber-500 rounded-lg mb-2"></div>
                    <div className="text-sm font-mono text-gray-700 dark:text-slate-300">Warning Amber</div>
                    <div className="text-xs font-mono text-gray-500 dark:text-slate-500">#F59E0B</div>
                  </div>
                  <div>
                    <div className="h-20 bg-slate-900 dark:bg-slate-700 rounded-lg mb-2"></div>
                    <div className="text-sm font-mono text-gray-700 dark:text-slate-300">Neutral</div>
                    <div className="text-xs font-mono text-gray-500 dark:text-slate-500">#0F172A</div>
                  </div>
                </div>
              </div>

              {/* Typography Scale */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-4">
                  Typography Scale
                </h3>
                <div className="space-y-3">
                  <div className="text-4xl font-bold text-gray-900 dark:text-slate-50">Heading 1 - 36px Bold</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-slate-50">Heading 2 - 30px Bold</div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-slate-50">Heading 3 - 20px Semibold</div>
                  <div className="text-base text-gray-700 dark:text-slate-300">Body Text - 16px Regular</div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">Small Text - 14px Regular</div>
                </div>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </Section>

      {/* Performance Metrics */}
      <Section className="bg-white dark:bg-slate-950">
        <ScrollReveal animation="slide-up">
          <SectionHeader 
            preLabel="// Metrics"
            title="Performance & Quality Metrics"
          />
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-6">
          <ScrollReveal animation="slide-up" delay={50}>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 border-0 text-white card-hover">
              <div className="flex items-center gap-3 mb-4">
                <Gauge className="h-8 w-8" />
                <h3 className="text-lg font-semibold">Lighthouse Score</h3>
              </div>
              <div className="text-5xl font-bold mb-2">95+</div>
              <div className="text-sm opacity-90">Performance & Best Practices</div>
            </Card>
          </ScrollReveal>

          <ScrollReveal animation="slide-up" delay={100}>
            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 border-0 text-white card-hover">
              <div className="flex items-center gap-3 mb-4">
                <Accessibility className="h-8 w-8" />
                <h3 className="text-lg font-semibold">Accessibility</h3>
              </div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">WCAG 2.1 AA Compliant</div>
            </Card>
          </ScrollReveal>

          <ScrollReveal animation="slide-up" delay={150}>
            <Card className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 border-0 text-white card-hover">
              <div className="flex items-center gap-3 mb-4">
                <Package className="h-8 w-8" />
                <h3 className="text-lg font-semibold">Bundle Size</h3>
              </div>
              <div className="text-5xl font-bold mb-2">Optimized</div>
              <div className="text-sm opacity-90">Code Splitting & Tree Shaking</div>
            </Card>
          </ScrollReveal>
        </div>
      </Section>

      {/* Accessibility Implementation */}
      <Section className="bg-gray-50 dark:bg-slate-900">
        <ScrollReveal animation="slide-up">
          <SectionHeader 
            preLabel="// WCAG"
            title="Accessibility Implementation"
          />
        </ScrollReveal>
        
        <ScrollReveal animation="fade" delay={100}>
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-4">
                  WCAG 2.1 AA Compliance
                </h3>
                <ul className="space-y-3">
                  {[
                    'Semantic HTML5 markup for screen reader compatibility',
                    'Keyboard navigation for all interactive elements',
                    'ARIA labels and roles for complex UI components',
                    'Color contrast ratios meeting 4.5:1 minimum',
                    'Focus indicators with visible outlines',
                    'Skip navigation links for keyboard users',
                    'Alt text for all images and icons',
                    'Form labels and error messages',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span className="text-gray-700 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-4">
                  Navigation Features
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-slate-50 mb-2">Keyboard Shortcuts</h4>
                    <ul className="text-sm text-gray-700 dark:text-slate-300 space-y-1">
                      <li><kbd className="px-2 py-1 bg-white dark:bg-slate-800 rounded border border-gray-300 dark:border-slate-600">Tab</kbd> - Navigate forward</li>
                      <li><kbd className="px-2 py-1 bg-white dark:bg-slate-800 rounded border border-gray-300 dark:border-slate-600">Shift+Tab</kbd> - Navigate backward</li>
                      <li><kbd className="px-2 py-1 bg-white dark:bg-slate-800 rounded border border-gray-300 dark:border-slate-600">Enter</kbd> - Activate element</li>
                      <li><kbd className="px-2 py-1 bg-white dark:bg-slate-800 rounded border border-gray-300 dark:border-slate-600">Esc</kbd> - Close modals</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-slate-50 mb-2">Screen Reader Support</h4>
                    <ul className="text-sm text-gray-700 dark:text-slate-300 space-y-1">
                      <li>✓ Tested with NVDA</li>
                      <li>✓ Tested with JAWS</li>
                      <li>✓ Tested with VoiceOver</li>
                      <li>✓ Live regions for updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </Section>

      {/* Back Navigation */}
      <Section className="bg-white dark:bg-slate-950">
        <ScrollReveal animation="fade">
          <div className="flex justify-center gap-4">
            <Link to={`/projects/${slug}`}>
              <Button variant="outline" size="lg" className="border-gray-300 dark:border-slate-700">
                ← Back to Case Study
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="lg" className="border-gray-300 dark:border-slate-700">
                All Projects
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
