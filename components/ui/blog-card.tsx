import Link from "next/link";
import { BlogPost } from "@/data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border">
        <div className="flex items-center mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
            {post.category.toUpperCase()}
          </span>
          <span className="ml-auto text-sm text-gray-500">{post.readTime}</span>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 hover:text-primary-600 transition-colors" data-testid={`title-${post.id}`}>
          <Link href={`/articles/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed" data-testid={`excerpt-${post.id}`}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <span data-testid={`author-${post.id}`}>{post.author}</span>
            <span className="mx-2">•</span>
            <span data-testid={`date-${post.id}`}>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          
          <Link 
            href={`/articles/${post.id}`}
            className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
            data-testid={`read-more-${post.id}`}
          >
            Read More →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border">
      <div className="flex items-center mb-3">
        <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium">
          {post.category.toUpperCase()}
        </span>
        <span className="ml-auto text-xs text-gray-500">{post.readTime}</span>
      </div>
      
      <h4 className="text-lg font-bold mb-3 hover:text-primary-600 transition-colors" data-testid={`title-${post.id}`}>
        <Link href={`/articles/${post.id}`}>
          {post.title}
        </Link>
      </h4>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3" data-testid={`excerpt-${post.id}`}>
        {post.excerpt}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span data-testid={`date-${post.id}`}>{new Date(post.publishedAt).toLocaleDateString()}</span>
        <Link 
          href={`/articles/${post.id}`}
          className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
          data-testid={`read-more-${post.id}`}
        >
          Read →
        </Link>
      </div>
    </div>
  );
}