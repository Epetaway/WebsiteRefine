import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    project: "",
    budget: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Build the message from form fields
      const message = `Company: ${formData.company || 'Not specified'}
Project: ${formData.project || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}`;
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: message,
          type: 'general'
        }),
      });
      
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setFormData({ fullName: '', email: '', company: '', project: '', budget: '', timeline: '' });
      } else {
        const errorData = await response.json();
        setSubmitStatus({ type: 'error', message: errorData.message || 'Failed to submit form. Please try again.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contact — Earl Hickson Jr. | Front-End Developer | React · TypeScript · NJ</title>
        <meta
          name="description"
          content="Hire Earl Hickson Jr. — Front-End Developer in Parsippany, NJ with 6+ years in React, TypeScript, Next.js, and WCAG 2.1 AA accessible UIs. Open to full-time roles and contract work."
        />
        <link rel="canonical" href="https://www.ehicksonjr.com/contact" />
        <meta property="og:title" content="Contact — Earl Hickson Jr. | Front-End Developer" />
        <meta
          property="og:description"
          content="Hire Earl Hickson Jr. — Front-End Developer in Parsippany, NJ. React, TypeScript, Next.js, WCAG 2.1 AA. Open to full-time and contract roles."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ehicksonjr.com/contact" />
        <meta property="og:image" content="/assets/og/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact — Earl Hickson Jr. | Front-End Developer" />
        <meta name="twitter:description" content="Hire Earl Hickson Jr. — React, TypeScript, Next.js developer in Parsippany, NJ. Open to full-time and contract roles." />
        <meta name="twitter:image" content="/assets/og/og-image.jpg" />
      </Helmet>

      {/* Header */}
      <section className="py-16 md:py-24 bg-[#0D0D0D]">
        <div className="max-w-[1120px] mx-auto px-5">
          <ScrollReveal animation="slide-up" className="max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">Contact</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white -tracking-[0.03em] leading-[1.1] mb-6">
              Let's build something that actually works.
            </h1>
            <p className="text-xl text-[#B7B7B7] leading-relaxed">
              Open to front-end roles, contract work, and collaborations on products that care about accessibility, performance, and clarity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 bg-[#111111]">
        <div className="max-w-2xl mx-auto px-5">
          <ScrollReveal animation="fade">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#B7B7B7] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#363C42] rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-[#1A1A1A] text-white placeholder-[#5A5A5A]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#B7B7B7] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#363C42] rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-[#1A1A1A] text-white placeholder-[#5A5A5A]"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-[#B7B7B7] mb-2">
                Company or Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#363C42] rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-[#1A1A1A] text-white placeholder-[#5A5A5A]"
              />
            </div>

            <div>
              <label htmlFor="project" className="block text-sm font-medium text-[#B7B7B7] mb-2">
                What Are You Building?
              </label>
              <textarea
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-[#363C42] rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-[#1A1A1A] text-white placeholder-[#5A5A5A]"
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-[#B7B7B7] mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#363C42] rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-[#1A1A1A] text-white"
              >
                <option value="">Select a range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-50k">$15,000 - $50,000</option>
                <option value="50k-plus">$50,000+</option>
                <option value="full-time">Full-time Role</option>
              </select>
            </div>

            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-[#B7B7B7] mb-2">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#363C42] rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-[#1A1A1A] text-white"
              >
                <option value="">Select a timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-month">Within 1 month</option>
                <option value="1-3-months">1-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
            </div>
            
            {submitStatus && (
              <div className={`mt-4 p-4 rounded-lg ${
                submitStatus.type === 'success'
                  ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800'
                  : 'bg-red-950/50 text-red-300 border border-red-800'
              }`}>
                {submitStatus.message}
              </div>
            )}
          </form>

          <p className="text-center text-[#7A7A7A] mt-8">
            You can also reach me directly at{" "}
            <a href="mailto:e@ehicksonjr.com" className="text-violet-400 hover:text-violet-300 hover:underline">
              e@ehicksonjr.com
            </a>
            .
          </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
