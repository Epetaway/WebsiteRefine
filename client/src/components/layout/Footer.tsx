import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EH</span>
              </div>
              <span className="font-bold text-xl">Earl Hickson Jr.</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Senior Front-End Engineer specializing in React, JavaScript, and UI/UX. 
              Available for senior engineering roles in the NYC metro area.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Button asChild variant="ghost" size="sm" className="justify-start text-gray-300 hover:text-white p-0">
                <a href="/case-studies">Case Studies</a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="justify-start text-gray-300 hover:text-white p-0">
                <a href="/about">About</a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="justify-start text-gray-300 hover:text-white p-0">
                <a href="/blog">Blog</a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="justify-start text-gray-300 hover:text-white p-0">
                <a href="/earldkaiju">BJJ Lessons</a>
              </Button>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="space-y-2">
              <Button asChild variant="ghost" size="sm" className="justify-start text-gray-300 hover:text-white p-0">
                <a href="https://github.com/EHickson-Jr" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github mr-2"></i>
                  GitHub
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="justify-start text-gray-300 hover:text-white p-0">
                <a href="https://linkedin.com/in/earlhicksonjr" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin mr-2"></i>
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="justify-start text-gray-300 hover:text-white p-0">
                <a href="/contact">
                  <i className="fas fa-envelope mr-2"></i>
                  Contact
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Earl Hickson Jr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}