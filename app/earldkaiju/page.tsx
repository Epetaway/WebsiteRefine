import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Brazilian Jiu-Jitsu Private Lessons - Earl Hickson Jr.',
  description: 'Learn Brazilian Jiu-Jitsu from a black belt instructor. Private lessons focused on fundamental techniques, self-defense, and competition preparation.',
}

export default function EarldKaiju() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-6">
                <i className="fas fa-medal mr-2"></i>
                Brazilian Jiu-Jitsu Black Belt
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                <span className="text-gray-900">Private BJJ Lessons</span>
                <span className="block text-gray-700">with Earl Hickson Jr.</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Learn Brazilian Jiu-Jitsu from an experienced black belt instructor. 
                Personalized training focused on fundamental techniques, self-defense, and your specific goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="#booking"
                  className="inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <i className="fas fa-calendar-check mr-2"></i>
                  Book a Session
                </a>
                <a 
                  href="#about"
                  className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="fas fa-user mr-2"></i>
                  About the Instructor
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">Black Belt</div>
                  <div className="text-sm text-gray-600">Brazilian Jiu-Jitsu</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">8+ Years</div>
                  <div className="text-sm text-gray-600">Training Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">Private</div>
                  <div className="text-sm text-gray-600">One-on-One Focus</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-200 rounded-3xl h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <i className="fas fa-fist-raised text-6xl mb-4"></i>
                  <p>BJJ Training Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-white" id="curriculum">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive Brazilian Jiu-Jitsu instruction tailored to your skill level and goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-shield-alt text-red-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fundamental Positions</h3>
              <p className="text-gray-600">
                Master the basic positions: guard, mount, side control, back control, and transitions between them.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-fist-raised text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Submission Techniques</h3>
              <p className="text-gray-600">
                Learn effective submissions including chokes, joint locks, and when to apply them safely.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-running text-green-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Self-Defense</h3>
              <p className="text-gray-600">
                Practical self-defense techniques for real-world situations, emphasizing leverage over strength.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-brain text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Strategy & Concepts</h3>
              <p className="text-gray-600">
                Understand the mental game: timing, pressure, and strategic thinking that makes BJJ effective.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-heartbeat text-orange-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Conditioning</h3>
              <p className="text-gray-600">
                Build functional strength, flexibility, and cardiovascular endurance specific to grappling.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-trophy text-indigo-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Competition Prep</h3>
              <p className="text-gray-600">
                Prepare for tournaments with sport-specific techniques, rules, and competitive strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Instructor */}
      <section className="py-20 bg-gray-50" id="about">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">About Your Instructor</h2>
              <p className="text-gray-700 mb-6">
                Earl Hickson Jr. brings a unique perspective to Brazilian Jiu-Jitsu instruction, 
                combining technical precision with the analytical mindset of a Senior Front-End Engineer.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <i className="fas fa-medal text-red-600 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-semibold">Black Belt Certification</h4>
                    <p className="text-sm text-gray-600">Awarded after 8+ years of dedicated training and competition</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-users text-blue-600 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-semibold">Teaching Experience</h4>
                    <p className="text-sm text-gray-600">Experienced in breaking down complex techniques for beginners</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-code text-green-600 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-semibold">Problem-Solving Approach</h4>
                    <p className="text-sm text-gray-600">Engineering background brings systematic approach to learning</p>
                  </div>
                </div>
              </div>

              <blockquote className="border-l-4 border-red-500 pl-6 italic text-gray-700">
                "BJJ taught me that there's always a solution—you just need to stay calm, 
                analyze the situation, and apply the right technique. The same principles 
                apply whether you're debugging code or escaping a submission."
              </blockquote>
            </div>

            <div className="bg-gray-200 rounded-3xl h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <i className="fas fa-user-circle text-6xl mb-4"></i>
                <p>Instructor Photo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-white" id="booking">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Book Your Private Session</h2>
            <p className="text-xl text-gray-600">
              Ready to start your Brazilian Jiu-Jitsu journey? Schedule a private lesson today.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Session Details</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <i className="fas fa-clock text-green-600 mr-3"></i>
                    60-90 minute sessions
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-user text-blue-600 mr-3"></i>
                    One-on-one instruction
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-calendar text-purple-600 mr-3"></i>
                    Flexible scheduling
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-red-600 mr-3"></i>
                    Parsippany, NJ area
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-600 mr-3"></i>
                    Personalized curriculum
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-600 mr-3"></i>
                    Progress tracking
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-600 mr-3"></i>
                    Training notes & homework
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-600 mr-3"></i>
                    Equipment guidance
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <a 
                href="mailto:e@ehicksonjr.com?subject=BJJ Private Lesson Inquiry"
                className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
              >
                <i className="fas fa-envelope mr-3"></i>
                Contact for Booking
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Or email directly at e@ehicksonjr.com with your experience level and goals
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}