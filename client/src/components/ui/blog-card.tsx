import { Link } from "wouter";
import { BlogPost } from "@/data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const categoryColors = {
    bjj: "bg-purple-100 text-purple-700",
    development: "bg-blue-100 text-blue-700",
    general: "bg-gray-100 text-gray-700"
  };

  const featuredColors = {
    bjj: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200",
    development: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
    general: "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200"
  };

  const linkColors = {
    bjj: "text-purple-600 hover:text-purple-700",
    development: "text-blue-600 hover:text-blue-700",
    general: "text-gray-600 hover:text-gray-700"
  };

  if (featured && post.featured) {
    return (
      <article className={`${featuredColors[post.category]} rounded-2xl p-6 border`}>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4">
          <i className="fas fa-star mr-1"></i>
          NEW POST
        </div>
        <h3 className="text-xl font-bold mb-3">
          <Link 
            href={`/articles/${post.slug}`} 
            className={`hover:${linkColors[post.category]} transition-colors`}
            data-testid={`link-${post.id}`}
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 text-sm" data-testid={`excerpt-${post.id}`}>
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500" data-testid={`date-${post.id}`}>{post.publishedAt}</span>
          <Link 
            href={`/articles/${post.slug}`} 
            className={`${linkColors[post.category]} font-medium text-sm transition-colors`}
            data-testid={`read-more-${post.id}`}
          >
            Read More →
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-gray-50 rounded-2xl p-6">
      <div className={`inline-flex items-center px-2 py-1 rounded-full ${categoryColors[post.category]} text-xs font-medium mb-3`}>
        {post.category.toUpperCase()}
      </div>
      <h3 className="text-lg font-bold mb-3">
        <Link 
          href={`/articles/${post.slug}`} 
          className="hover:text-primary-500 transition-colors"
          data-testid={`link-${post.id}`}
        >
          {post.title}
        </Link>
      </h3>
      <p className="text-gray-600 mb-4 text-sm" data-testid={`excerpt-${post.id}`}>
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500" data-testid={`date-${post.id}`}>{post.publishedAt}</span>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500" data-testid={`read-time-${post.id}`}>{post.readTime} min read</span>
          <Link 
            href={`/articles/${post.slug}`} 
            className="text-primary-500 font-medium text-sm hover:text-primary-600 transition-colors"
            data-testid={`read-more-${post.id}`}
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
