import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';

export default function EarldKaiju() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: '',
    availability: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For GitHub Pages, you'll need to integrate with a form service like Formspree
    // For now, we'll simulate a successful submission
    
    try {
      // Formspree endpoint for BJJ bookings
      const response = await fetch('https://formspree.io/f/xdknqgka', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          experience: formData.experience,
          goals: formData.goals,
          availability: formData.availability,
          subject: 'BJJ Private Lesson Booking Request',
          _replyto: formData.email,
          _subject: 'New BJJ Private Lesson Request',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          goals: '',
          availability: ''
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <NextSeo
        title="BJJ Private Lessons - Earl Hickson Jr."
        description="Book private Brazilian Jiu-Jitsu lessons with Earl 'Kaiju' Hickson Jr., BJJ Black Belt competitor. Personalized training for all skill levels in Parsippany, NJ area."
        canonical="https://ehicksonjr.com/earldkaiju"
      />

      <Container className="mt-16 sm:mt-32">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl mb-6">
              Private BJJ Lessons with Earl "Kaiju" Hickson Jr.
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              BJJ Black Belt • NAGA Competitor • Personalized Training
            </p>
          </div>

          {/* Tournament Record */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Competition Record</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">🥇</div>
                <div className="text-lg font-semibold">Gold Medals</div>
                <div className="text-2xl font-bold">3</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-400">🥈</div>
                <div className="text-lg font-semibold">Silver Medals</div>
                <div className="text-2xl font-bold">2</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">🥉</div>
                <div className="text-lg font-semibold">Bronze Medals</div>
                <div className="text-2xl font-bold">4</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">🏆</div>
                <div className="text-lg font-semibold">Total Medals</div>
                <div className="text-2xl font-bold">9</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* About Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Train with a Competitor</h2>
              <div className="prose prose-zinc dark:prose-invert">
                <p>
                  With over a decade of Brazilian Jiu-Jitsu experience and active competition at the highest levels, 
                  I bring both technical expertise and real-world application to every private lesson.
                </p>
                <p>
                  My approach focuses on fundamental techniques, strategic thinking, and building confidence on the mats. 
                  Whether you're a complete beginner or looking to refine advanced techniques, each session is tailored 
                  to your specific goals and learning style.
                </p>
                
                <h3>What You'll Learn:</h3>
                <ul>
                  <li>Fundamental positions and escapes</li>
                  <li>Submission techniques and setups</li>
                  <li>Guard passing and retention</li>
                  <li>Competition strategy and mindset</li>
                  <li>Self-defense applications</li>
                </ul>
                
                <h3>Training Details:</h3>
                <ul>
                  <li><strong>Location:</strong> Parsippany, NJ area</li>
                  <li><strong>Duration:</strong> 60-90 minute sessions</li>
                  <li><strong>Equipment:</strong> Mats and training gear provided</li>
                  <li><strong>All skill levels welcome</strong></li>
                </ul>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Book Your Private Lesson</h2>
              
              {submitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    Request Submitted Successfully!
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    Thank you for your interest in private BJJ lessons. I'll review your request and get back to you 
                    within 24 hours to discuss scheduling and next steps.
                  </p>
                  <Button 
                    onClick={() => setSubmitted(false)} 
                    className="mt-4"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      BJJ Experience Level *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                    >
                      <option value="">Select your experience level</option>
                      <option value="complete-beginner">Complete Beginner (No experience)</option>
                      <option value="white-belt">White Belt (0-2 years)</option>
                      <option value="blue-belt">Blue Belt (2-4 years)</option>
                      <option value="purple-belt">Purple Belt (4-6 years)</option>
                      <option value="brown-belt">Brown Belt (6+ years)</option>
                      <option value="black-belt">Black Belt</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="goals" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Training Goals *
                    </label>
                    <textarea
                      id="goals"
                      name="goals"
                      required
                      rows={4}
                      value={formData.goals}
                      onChange={handleChange}
                      placeholder="What would you like to focus on? (e.g., fundamentals, competition prep, specific techniques, self-defense)"
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Preferred Availability
                    </label>
                    <textarea
                      id="availability"
                      name="availability"
                      rows={3}
                      value={formData.availability}
                      onChange={handleChange}
                      placeholder="Let me know your preferred days/times for training sessions"
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Lesson Request
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}