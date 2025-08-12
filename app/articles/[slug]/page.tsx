import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import Link from 'next/link';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const post = blogPosts.find((post) => post.id === params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found - Earl Hickson Jr.',
    };
  }

  return {
    title: `${post.title} - Earl Hickson Jr.`,
    description: post.excerpt,
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const post = blogPosts.find((post) => post.id === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Blog
            </Link>
          </div>
          
          <div className="flex items-center mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
              {post.category.toUpperCase()}
            </span>
            <span className="ml-4 text-gray-500">{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-600 mb-8">
            <span>{post.author}</span>
            <span className="mx-3">•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>
          
          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">More Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <div key={relatedPost.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {relatedPost.category.toUpperCase()}
                    </span>
                    <span className="ml-auto text-xs text-gray-500">{relatedPost.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3">
                    <Link 
                      href={`/articles/${relatedPost.id}`}
                      className="hover:text-primary-600 transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(relatedPost.publishedAt).toLocaleDateString()}</span>
                    <Link 
                      href={`/articles/${relatedPost.id}`}
                      className="text-primary-600 font-medium hover:text-primary-700"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}