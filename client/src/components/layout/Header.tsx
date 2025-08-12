import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2" data-testid="logo">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EH</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Earl Hickson Jr.</span>
            </a>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button asChild variant={isActive('/') ? 'default' : 'ghost'} size="sm">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant={isActive('/about') ? 'default' : 'ghost'} size="sm">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant={isActive('/case-studies') ? 'default' : 'ghost'} size="sm">
              <Link href="/case-studies">Case Studies</Link>
            </Button>
            <Button asChild variant={isActive('/blog') ? 'default' : 'ghost'} size="sm">
              <Link href="/blog">Blog</Link>
            </Button>
            <Button asChild variant={isActive('/earldkaiju') ? 'default' : 'ghost'} size="sm">
              <Link href="/earldkaiju">BJJ Lessons</Link>
            </Button>
            <Button asChild variant={isActive('/contact') ? 'default' : 'ghost'} size="sm">
              <Link href="/contact">Contact</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <i className="fas fa-bars"></i>
          </Button>
        </div>
      </div>
    </header>
  );
}