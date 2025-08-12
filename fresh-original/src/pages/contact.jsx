import { NextSeo } from 'next-seo';
import { Container } from '@/components/Container';
import ContactForm from '@/components/ContactForm';
import siteMeta from '@/data/siteMeta';

export default function Contact() {
  return (
    <>
      <NextSeo
        title="Contact - Earl Hickson Jr. - Senior Front-End Engineer"
        description="Get in touch with Earl Hickson Jr. for front-end engineering projects, consultation, or collaboration opportunities. Based in Parsippany, NJ."
        canonical="https://ehicksonjr.com/contact"
        openGraph={{
          url: 'https://ehicksonjr.com/contact',
          title: 'Contact Earl Hickson Jr. - Senior Front-End Engineer',
          description: 'Ready to discuss your next front-end project? Let\'s connect and build something great together.',
          images: [
            {
              url: `https://ehicksonjr.com/_next/static/media/me.edd8b1e7.jpeg`,
              width: 1200,
              height: 600,
              alt: 'Contact Earl Hickson Jr.',
            },
          ],
          siteName: 'Earl Hickson Jr.',
        }}
      />

      <Container className="mt-16 sm:mt-32">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl mb-6">
              Let&rsquo;s Build Something Great Together
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-3xl mx-auto">
              Ready to optimize your front-end performance, improve accessibility, or tackle complex engineering challenges? 
              I&rsquo;d love to discuss how we can achieve measurable results for your project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                    Professional Services
                  </h3>
                  <ul className="text-zinc-600 dark:text-zinc-400 space-y-2">
                    <li>• Front-End Development & Architecture</li>
                    <li>• Performance Optimization & Core Web Vitals</li>
                    <li>• WCAG 2.1 Accessibility Implementation</li>
                    <li>• React/Next.js Application Development</li>
                    <li>• Code Reviews & Technical Consultation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                    Response Time
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    I typically respond to inquiries within 24 hours. For urgent projects, 
                    please mention the timeline in your message.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                    Location & Availability
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Based in Parsippany, New Jersey. Available for remote projects and 
                    local consultations throughout the NYC metro area.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                    Direct Contact
                  </h3>
                  <div className="space-y-2">
                    <p className="text-zinc-600 dark:text-zinc-400">
                      <strong>Email:</strong> earl@ehicksonjr.com
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      <strong>LinkedIn:</strong> 
                      <a 
                        href="https://www.linkedin.com/in/earl-hickson-jr/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        /in/earl-hickson-jr
                      </a>
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      <strong>GitHub:</strong> 
                      <a 
                        href="https://github.com/Epetaway" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        @Epetaway
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
              Before You Reach Out
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-zinc-600 dark:text-zinc-400">
              <div>
                <h4 className="font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Project Information</h4>
                <p className="text-sm">
                  Please include details about your project scope, timeline, and specific technical requirements. 
                  This helps me provide more accurate estimates and recommendations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Budget & Timeline</h4>
                <p className="text-sm">
                  Sharing your budget range and deadline helps ensure we&rsquo;re aligned on project expectations 
                  and can deliver the best possible results within your constraints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}