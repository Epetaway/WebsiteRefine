export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: 'bjj' | 'development' | 'general';
  featured: boolean;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'accessibility-first-development',
    title: 'Accessibility-First Development: Why It Matters',
    excerpt: 'Building inclusive web experiences from the ground up, not as an afterthought.',
    content: 'Accessibility is not a feature to be added later—it\'s a fundamental aspect of good web development...',
    author: 'Earl Hickson Jr.',
    publishedAt: '2024-03-15',
    readTime: '5 min read',
    category: 'development',
    featured: true,
    tags: ['accessibility', 'wcag', 'inclusive-design', 'frontend']
  },
  {
    id: 'bjj-mindset-in-coding',
    title: 'The BJJ Mindset: Applying Martial Arts Philosophy to Code',
    excerpt: 'How Brazilian Jiu-Jitsu principles of continuous improvement and problem-solving translate to software engineering.',
    content: 'In Brazilian Jiu-Jitsu, we say "position before submission." This principle has profound applications in software development...',
    author: 'Earl Hickson Jr.',
    publishedAt: '2024-03-10',
    readTime: '7 min read',
    category: 'bjj',
    featured: true,
    tags: ['bjj', 'mindset', 'problem-solving', 'philosophy']
  },
  {
    id: 'react-performance-optimization',
    title: 'React Performance: Beyond the Basics',
    excerpt: 'Advanced techniques for optimizing React applications including bundle splitting and rendering strategies.',
    content: 'Performance optimization in React goes far beyond memo and useMemo. Let\'s explore advanced techniques...',
    author: 'Earl Hickson Jr.',
    publishedAt: '2024-03-05',
    readTime: '8 min read',
    category: 'development',
    featured: false,
    tags: ['react', 'performance', 'optimization', 'javascript']
  },
  {
    id: 'design-systems-scale',
    title: 'Building Design Systems That Scale',
    excerpt: 'Lessons learned from building and maintaining component libraries across multiple teams and applications.',
    content: 'A successful design system is more than just a collection of components. It\'s a living system that evolves...',
    author: 'Earl Hickson Jr.',
    publishedAt: '2024-02-28',
    readTime: '6 min read',
    category: 'development',
    featured: false,
    tags: ['design-systems', 'components', 'scalability', 'frontend']
  },
  {
    id: 'teaching-bjj-parallels',
    title: 'Teaching BJJ and Mentoring Developers: Surprising Parallels',
    excerpt: 'What I\'ve learned about education and growth from both the mats and the office.',
    content: 'Teaching Brazilian Jiu-Jitsu and mentoring junior developers share more similarities than you might expect...',
    author: 'Earl Hickson Jr.',
    publishedAt: '2024-02-20',
    readTime: '5 min read',
    category: 'general',
    featured: false,
    tags: ['teaching', 'mentoring', 'bjj', 'leadership']
  },
  {
    id: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for React',
    excerpt: 'Leveraging TypeScript\'s type system to build more robust and maintainable React applications.',
    content: 'TypeScript offers powerful features that go beyond basic type annotations. Here are advanced patterns...',
    author: 'Earl Hickson Jr.',
    publishedAt: '2024-02-15',
    readTime: '9 min read',
    category: 'development',
    featured: false,
    tags: ['typescript', 'react', 'patterns', 'types']
  }
];