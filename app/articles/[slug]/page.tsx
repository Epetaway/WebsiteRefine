import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

// Mock data for the blog post
const blogPosts = [
  {
    slug: "white-belt-to-black-belt-engineering-lessons",
    title: "From White Belt to Black Belt: Engineering Lessons from the Mat",
    content: `
# From White Belt to Black Belt: Engineering Lessons from the Mat

Brazilian Jiu-Jitsu has fundamentally shaped how I approach software engineering. The parallels between progressing through belt ranks and advancing as an engineer are striking and instructive.

## The White Belt Mindset: Embracing the Unknown

When I first stepped onto the mat, everything felt overwhelming. Simple movements were difficult, and I had no idea what I was doing. This mirrors exactly how I felt when I wrote my first lines of JavaScript.

**Engineering Parallel**: Junior developers often feel lost in large codebases. The key is accepting that confusion is temporary and focusing on fundamentals.

## Blue Belt: Building Fundamentals

At blue belt, you start to understand basic positions and transitions. You're no longer just surviving—you're beginning to think strategically.

**Engineering Parallel**: Mid-level engineers start to see patterns in code architecture and understand how different parts of an application work together.

## Purple Belt: Teaching and Leadership

Purple belts often start teaching newer students. This requires breaking down complex techniques into digestible pieces.

**Engineering Parallel**: Senior engineers must mentor juniors, breaking down complex systems and explaining architectural decisions clearly.

## Brown Belt: Refining and Innovating

Brown belts develop their own style and start to innovate within the traditional framework.

**Engineering Parallel**: Staff engineers begin to shape technical direction and create new solutions while respecting established patterns.

## Black Belt: Mastery and Continuous Learning

The black belt isn't the end—it's the beginning of true understanding. You realize how much more there is to learn.

**Engineering Parallel**: Principal engineers understand that technology constantly evolves, and they must remain students throughout their careers.

## Key Lessons Applied Daily

1. **Leverage over strength**: Write elegant code that uses existing patterns rather than brute-forcing solutions
2. **Pressure and timing**: Know when to push hard on a feature and when to take a step back
3. **Respect your training partners**: Code reviews are like rolling—help each other improve
4. **Focus on fundamentals**: Clean code principles matter more than flashy frameworks

The mat taught me patience, problem-solving, and the value of consistent practice. These lessons make me a better engineer every day.
    `,
    category: "bjj",
    readTime: "8 min read",
    date: "December 2024",
    excerpt: "How the journey through Brazilian Jiu-Jitsu belt ranks mirrors the progression from junior to senior engineer."
  }
]

const categoryColors: Record<string, string> = {
  bjj: "bg-red-100 text-red-700",
  development: "bg-blue-100 text-blue-700",
  accessibility: "bg-green-100 text-green-700",
  performance: "bg-purple-100 text-purple-700"
}

interface Props {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${post.title} - Earl Hickson Jr.`,
    description: post.excerpt,
  }
}

export default function Article({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-16">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-6" data-testid="button-back">
              <Link href="/blog">
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Blog
              </Link>
            </Button>
            
            <div className={`inline-flex items-center px-3 py-1 rounded-full ${categoryColors[post.category]} text-sm font-medium mb-4`}>
              {post.category.toUpperCase()}
            </div>
            
            <h1 className="text-4xl font-bold mb-4" data-testid="article-title">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-500 text-sm mb-8">
              <span>{post.readTime}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
          </div>

          <article className="prose prose-lg max-w-none" data-testid="article-content">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
          </article>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild data-testid="button-back-bottom">
                <Link href="/blog">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Blog
                </Link>
              </Button>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Share this article:</span>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}