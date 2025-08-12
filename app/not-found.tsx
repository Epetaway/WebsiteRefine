import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4" data-testid="error-title">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild data-testid="button-home">
          <Link href="/">
            <i className="fas fa-home mr-2"></i>
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}