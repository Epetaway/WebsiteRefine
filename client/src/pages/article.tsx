import { useMemo } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { Button } from "@/components/ui/button";

export default function Article() {
  const [, params] = useRoute("/articles/:slug");
  const slug = params?.slug;
  
  const post = useMemo(() => blogPosts.find(p => p.slug === slug), [slug]);

  if (!post) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="error-title">Article Not Found</h1>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild data-testid="button-back-to-blog">
            <Link href="/blog">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const categoryColors = {
    bjj: "bg-purple-100 text-purple-700",
    development: "bg-blue-100 text-blue-700",
    general: "bg-gray-100 text-gray-700"
  };

  const relatedPosts = useMemo(
    () => blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2),
    [post.id, post.category]
  );

  return (
    <div className="">
      {/* Header */}
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
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" data-testid="article-title">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <img 
                  src="https://www.ehicksonjr.com/_next/static/media/me.edd8b1e7.jpeg" 
                  alt="Earl Hickson Jr." 
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">Earl Hickson Jr.</span>
              </div>
              <span data-testid="article-date">{post.publishedAt}</span>
              <span data-testid="article-read-time">{post.readTime} min read</span>
            </div>
            
            {/* Featured Image for BJJ posts */}
            {post.category === 'bjj' && (
              <div className="mb-8">
                <img 
                  src="https://www.ehicksonjr.com/_next/static/media/MeBjj_2.6bf53e95.jpg" 
                  alt="Earl Hickson Jr. Brazilian Jiu-Jitsu training" 
                  className="w-full rounded-xl shadow-lg"
                  data-testid="article-featured-image"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed"
              data-testid="article-content"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
            />
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    data-testid={`tag-${index}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
            <div className="text-center">
              {post.category === 'bjj' ? (
                <>
                  <h3 className="text-2xl font-bold mb-4" data-testid="cta-bjj-title">
                    Ready to Start Your BJJ Journey?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Book a private lesson and experience the transformative power of Brazilian Jiu-Jitsu.
                  </p>
                  <Button asChild size="lg" className="bg-purple-500 hover:bg-purple-600" data-testid="button-bjj-lessons">
                    <Link href="/earldkaiju">
                      <i className="fas fa-fist-raised mr-2"></i>
                      Book Private Lessons
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-4" data-testid="cta-dev-title">
                    Let's Work Together
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Interested in collaborating on a project or discussing development opportunities?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" data-testid="button-contact">
                      <a href="mailto:hello@ehicksonjr.com">
                        <i className="fas fa-envelope mr-2"></i>
                        Get In Touch
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" data-testid="button-projects">
                      <Link href="/projects">
                        <i className="fas fa-code mr-2"></i>
                        View Case Studies
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8" data-testid="related-posts-title">More Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id} 
                    href={`/articles/${relatedPost.slug}`}
                    className="block p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
                    data-testid={`related-post-${relatedPost.id}`}
                  >
                    <h4 className="font-bold mb-2">{relatedPost.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{relatedPost.excerpt}</p>
                    <div className="text-xs text-gray-500">{relatedPost.publishedAt}</div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
