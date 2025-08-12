import { NextSeo } from 'next-seo';
import { SimpleLayout } from '@/components/SimpleLayout';
import { Card } from '@/components/Card';
import siteMeta from '@/data/siteMeta';

const caseStudies = [
  {
    id: 'employee-directory',
    title: 'Employee Directory Performance Optimization',
    description: 'Reduced Time to Interactive by 44% through normalized API adapters, suspense-friendly fetch patterns, and skeleton states.',
    metrics: {
      before: '2.1s TTI',
      after: '1.2s TTI',
      improvement: '44% faster'
    },
    technologies: ['Next.js', 'React', 'TypeScript', 'Performance Optimization'],
    challenges: [
      'Large employee dataset causing slow initial loads',
      'Complex filtering and search functionality',
      'Mobile performance on slower networks'
    ],
    solutions: [
      'Implemented virtual scrolling for large lists',
      'Added suspense boundaries with skeleton states',
      'Normalized API response structure',
      'Optimized bundle splitting and lazy loading'
    ],
    results: [
      'Time to Interactive reduced from 2.1s to 1.2s (44% improvement)',
      'First Contentful Paint improved by 32%',
      'User engagement increased 28%',
      'Mobile performance scores improved to 95+'
    ]
  },
  {
    id: 'accessibility-compliance',
    title: 'WCAG 2.1 AA Compliance Implementation',
    description: 'Achieved full WCAG 2.1 AA compliance across enterprise application with comprehensive accessibility patterns.',
    metrics: {
      before: 'Multiple violations',
      after: 'AA Level compliant',
      improvement: '100% compliant'
    },
    technologies: ['ARIA', 'axe-core', 'WAVE', 'VoiceOver', 'NVDA'],
    challenges: [
      'Complex data tables without proper structure',
      'Form validation lacking screen reader support',
      'Color-only information indicators',
      'Missing keyboard navigation patterns'
    ],
    solutions: [
      'Implemented comprehensive ARIA labeling system',
      'Added focus management for dynamic content',
      'Created accessible color palette with 4.5:1 contrast ratios',
      'Built custom keyboard navigation components',
      'Added screen reader optimized form validation'
    ],
    results: [
      'Achieved WCAG 2.1 AA compliance certification',
      'Zero accessibility violations in automated testing',
      'Positive feedback from users with disabilities',
      'Company avoided potential ADA compliance issues'
    ]
  },
  {
    id: 'bundle-optimization',
    title: 'Bundle Size Optimization',
    description: 'Reduced initial bundle size by 73% through code splitting, tree shaking, and dynamic imports across portfolio projects.',
    metrics: {
      before: '1.2MB initial bundle',
      after: '320KB initial bundle',
      improvement: '73% reduction'
    },
    technologies: ['Webpack', 'Vite', 'Bundle Analyzer', 'Tree Shaking'],
    challenges: [
      'Large third-party library dependencies',
      'Monolithic bundle affecting load times',
      'Unused code being included in production builds',
      'Complex dependency chains'
    ],
    solutions: [
      'Implemented dynamic imports for route-based code splitting',
      'Configured tree shaking to eliminate dead code',
      'Replaced heavy libraries with lighter alternatives',
      'Created custom bundle analysis dashboard',
      'Set up automated bundle size monitoring'
    ],
    results: [
      'Initial bundle reduced from 1.2MB to 320KB (73% smaller)',
      'Page load times improved by 65%',
      'Lighthouse performance score increased to 98',
      'Reduced hosting costs due to lower bandwidth usage'
    ]
  }
];

function CaseStudyCard({ study }) {
  return (
    <Card as="div" className="border border-zinc-200 dark:border-zinc-700">
      <Card.Title>{study.title}</Card.Title>
      <Card.Description className="mt-4">{study.description}</Card.Description>
      
      {/* Metrics */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <div className="text-sm text-red-600 dark:text-red-400 font-medium">Before</div>
          <div className="text-lg font-bold text-red-800 dark:text-red-300">{study.metrics.before}</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <div className="text-sm text-green-600 dark:text-green-400 font-medium">After</div>
          <div className="text-lg font-bold text-green-800 dark:text-green-300">{study.metrics.after}</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Improvement</div>
          <div className="text-lg font-bold text-blue-800 dark:text-blue-300">{study.metrics.improvement}</div>
        </div>
      </div>

      {/* Technologies */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Technologies Used</h4>
        <div className="flex flex-wrap gap-2">
          {study.technologies.map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Challenges & Solutions */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Key Challenges</h4>
          <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
            {study.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                {challenge}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Solutions Implemented</h4>
          <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
            {study.solutions.map((solution, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                {solution}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Measurable Results</h4>
        <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
          {study.results.map((result, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              {result}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default function CaseStudies() {
  const headline = "Front-End Engineering Case Studies";
  const intro = "Real-world projects showcasing measurable improvements in performance, accessibility, and user experience. Each case study demonstrates technical problem-solving with quantified results.";

  return (
    <>
      <NextSeo
        title="Case Studies - Earl Hickson Jr."
        description="Front-End Engineering case studies with proven results: 44% performance improvements, WCAG 2.1 AA compliance, and 73% bundle size optimization."
        canonical="https://ehicksonjr.com/case-studies"
        openGraph={{
          url: 'https://ehicksonjr.com/case-studies',
          title: 'Front-End Engineering Case Studies - Earl Hickson Jr.',
          description: 'Real-world projects with measurable improvements in performance, accessibility, and optimization.',
          images: [
            {
              url: `https://ehicksonjr.com/_next/static/media/me.edd8b1e7.jpeg`,
              width: 1200,
              height: 600,
              alt: 'Earl Hickson Jr. - Case Studies',
            },
          ],
          siteName: 'Earl Hickson Jr.',
        }}
      />
      
      <SimpleLayout title={headline} intro={intro}>
        <div className="space-y-12">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
              Let&rsquo;s Build Something Great Together
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto">
              Ready to optimize your front-end performance, improve accessibility, or tackle complex engineering challenges? 
              I&rsquo;d love to discuss how we can achieve measurable results for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:earl@ehicksonjr.com" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Start a Conversation
              </a>
              <a 
                href="/api/resume" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}