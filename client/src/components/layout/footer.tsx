import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              <span className="gradient-text">Earl Hickson Jr.</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Senior Front-End Engineer specializing in React, JavaScript, UI/UX, and expanding into full-stack development. Based in Parsippany, New Jersey.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/in/earl-hickson-jr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110"
                data-testid="link-linkedin"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a 
                href="https://github.com/Epetaway" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-500/50 transition-all duration-300 hover:scale-110"
                data-testid="link-github"
              >
                <i className="fab fa-github"></i>
              </a>
              <a 
                href="https://www.instagram.com/earld.kaiju/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/case-studies" className="hover:text-white transition-colors" data-testid="footer-case-studies">Case Studies</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors" data-testid="footer-about">About</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors" data-testid="footer-blog">Blog</Link></li>
              <li><Link href="/earldkaiju" className="hover:text-white transition-colors" data-testid="footer-bjj">BJJ Lessons</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li data-testid="text-location">Parsippany, NJ</li>
              <li>
                <a 
                  href="mailto:e@ehicksonjr.com" 
                  className="hover:text-white transition-colors"
                  data-testid="link-email"
                >
                  e@ehicksonjr.com
                </a>
              </li>
              <li>
                <a 
                  href="/api/resume" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  data-testid="link-resume"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-12 text-center text-gray-400">
          <p data-testid="text-copyright">&copy; 2024 Earl Hickson Jr. All rights reserved. Built with passion and precision.</p>
        </div>
      </div>
    </footer>
  );
}
