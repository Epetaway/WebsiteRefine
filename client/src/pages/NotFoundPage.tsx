import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <i className="fas fa-exclamation-triangle text-6xl text-gray-400 mb-4"></i>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-xl text-gray-600">
            Sorry, the page you're looking for doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild size="lg">
            <Link href="/">
              <i className="fas fa-home mr-2"></i>
              Go Home
            </Link>
          </Button>
          
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/case-studies">Case Studies</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}