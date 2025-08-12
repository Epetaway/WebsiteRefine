'use client';

import { useState } from "react";

export default function EarldKaiju() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: '',
    availability: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would integrate with your backend API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitMessage('Thank you! I\'ll get back to you within 24 hours to discuss training.');
      setContactForm({
        name: '',
        email: '',
        phone: '',
        experience: '',
        goals: '',
        availability: ''
      });
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again or email me directly.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="pt-16 bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium mb-6">
                <i className="fas fa-fist-raised mr-2"></i>
                Brazilian Jiu-Jitsu Black Belt
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-white">Earl</span>
                <span className="text-green-400"> "the Kaiju"</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                15+ years on the mats • Competition tested • Proven instruction methods
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-medal text-green-400 mr-3"></i>
                  <span>Black Belt under Professor Marcus "Buchecha" Almeida lineage</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-trophy text-green-400 mr-3"></i>
                  <span>Active competitor with multiple tournament wins</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-users text-green-400 mr-3"></i>
                  <span>5+ years teaching experience, all skill levels welcome</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-green-900/30 to-gray-900/30 rounded-3xl border-2 border-green-400/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-black text-4xl mb-4 mx-auto">
                    <i className="fas fa-fist-raised"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Earl "the Kaiju" Hickson</h3>
                  <p className="text-green-400 font-medium">BJJ Black Belt & Instructor</p>
                  <p className="text-gray-400 text-sm mt-2">Parsippany, New Jersey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Training Options</h2>
            <p className="text-xl text-gray-400">Personalized instruction for your BJJ journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-green-400/20 hover:border-green-400/40 transition-colors">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <i className="fas fa-user text-green-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Private Lessons</h3>
              <p className="text-gray-300 mb-6">
                One-on-one instruction tailored to your specific goals and skill level. Perfect for accelerated learning.
              </p>
              <div className="text-green-400 font-bold text-lg">$80/hour</div>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-green-400/20 hover:border-green-400/40 transition-colors">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <i className="fas fa-users text-green-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Semi-Private (2-3 people)</h3>
              <p className="text-gray-300 mb-6">
                Small group training with friends or teammates. Great for drilling techniques and positional sparring.
              </p>
              <div className="text-green-400 font-bold text-lg">$50/person/hour</div>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-green-400/20 hover:border-green-400/40 transition-colors">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <i className="fas fa-video text-green-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Video Analysis</h3>
              <p className="text-gray-300 mb-6">
                Send me your competition or training footage for detailed breakdown and improvement suggestions.
              </p>
              <div className="text-green-400 font-bold text-lg">$40/session</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Ready to Level Up Your BJJ?</h2>
            <p className="text-xl text-gray-400">
              Let's discuss your goals and create a training plan that works for you.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-3xl p-8 border border-green-400/20">
            {submitMessage && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-400/30 text-green-400">
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  BJJ Experience *
                </label>
                <select
                  required
                  value={contactForm.experience}
                  onChange={(e) => setContactForm({...contactForm, experience: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:border-green-400 focus:outline-none"
                >
                  <option value="">Select your experience level</option>
                  <option value="complete-beginner">Complete Beginner</option>
                  <option value="some-classes">A few classes</option>
                  <option value="white-belt">White Belt (0-2 years)</option>
                  <option value="blue-belt">Blue Belt (2-4 years)</option>
                  <option value="purple-belt">Purple Belt (4-6 years)</option>
                  <option value="brown-black">Brown/Black Belt (6+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Training Goals *
                </label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.goals}
                  onChange={(e) => setContactForm({...contactForm, goals: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none resize-none"
                  placeholder="What are you looking to achieve? (e.g., self-defense, competition, fitness, technique improvement)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Availability
                </label>
                <textarea
                  rows={3}
                  value={contactForm.availability}
                  onChange={(e) => setContactForm({...contactForm, availability: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none resize-none"
                  placeholder="When are you typically available for training? (days, times, frequency)"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 px-8 rounded-xl transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-paper-plane mr-2"></i>
                    Send Message
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Training Location</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-green-400 mt-1 mr-3"></i>
                  <div>
                    <p className="text-gray-300">Parsippany, New Jersey</p>
                    <p className="text-gray-400 text-sm">Private gym and academy partnerships available</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-clock text-green-400 mt-1 mr-3"></i>
                  <div>
                    <p className="text-gray-300">Flexible scheduling</p>
                    <p className="text-gray-400 text-sm">Early morning, evening, and weekend sessions</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-envelope text-green-400 mr-3"></i>
                  <a href="mailto:earl@ehicksonjr.com" className="text-gray-300 hover:text-green-400 transition-colors">
                    earl@ehicksonjr.com
                  </a>
                </div>
                <div className="flex items-center">
                  <i className="fab fa-instagram text-green-400 mr-3"></i>
                  <a href="https://instagram.com/earld.kaiju" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">
                    @earld.kaiju
                  </a>
                </div>
                <div className="flex items-center">
                  <i className="fab fa-youtube text-green-400 mr-3"></i>
                  <a href="https://youtube.com/@earldkaiju" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">
                    @earldkaiju
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}