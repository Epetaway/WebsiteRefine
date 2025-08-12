import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface BJJBookingForm {
  name: string;
  email: string;
  phone: string;
  experience: string;
  goals: string;
  availability: string;
  message?: string;
}

export default function BJJPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BJJBookingForm>({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: '',
    availability: '',
    message: '',
  });

  const bookingMutation = useMutation({
    mutationFn: (data: BJJBookingForm) => apiRequest('/bjj-booking', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      toast({
        title: 'Booking Submitted!',
        description: 'Thank you for your interest. I\'ll contact you within 24 hours.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        goals: '',
        availability: '',
        message: '',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to submit booking. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingMutation.mutate(formData);
  };

  const handleChange = (field: keyof BJJBookingForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">EarldKaiju BJJ Lessons</h1>
          <p className="text-xl text-gray-600 mb-8">
            Private Brazilian Jiu-Jitsu coaching with a black belt instructor
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <i className="fas fa-fist-raised text-red-600 text-3xl mr-3"></i>
              <span className="text-lg font-semibold text-red-800">Black Belt Instructor</span>
            </div>
            <p className="text-red-700">
              Learn from years of competition experience and proven teaching methods
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Book Your Private Lesson</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  data-testid="input-name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  data-testid="input-email"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
                data-testid="input-phone"
              />
            </div>

            <div>
              <Label htmlFor="experience">BJJ Experience Level *</Label>
              <Select value={formData.experience} onValueChange={(value) => handleChange('experience', value)} required>
                <SelectTrigger data-testid="select-experience">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complete-beginner">Complete Beginner</SelectItem>
                  <SelectItem value="some-experience">Some Experience (6 months - 2 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                  <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goals">Training Goals *</Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => handleChange('goals', e.target.value)}
                placeholder="What would you like to achieve? (e.g., self-defense, competition, fitness, technique improvement)"
                required
                data-testid="textarea-goals"
              />
            </div>

            <div>
              <Label htmlFor="availability">Preferred Days/Times *</Label>
              <Textarea
                id="availability"
                value={formData.availability}
                onChange={(e) => handleChange('availability', e.target.value)}
                placeholder="When are you typically available for training? (e.g., weekday evenings, weekend mornings)"
                required
                data-testid="textarea-availability"
              />
            </div>

            <div>
              <Label htmlFor="message">Additional Notes</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Any questions, specific techniques you want to work on, or other information?"
                data-testid="textarea-message"
              />
            </div>

            <Button
              type="submit"
              disabled={bookingMutation.isPending}
              className="w-full bg-red-600 hover:bg-red-700"
              data-testid="button-submit-booking"
            >
              {bookingMutation.isPending ? 'Submitting...' : 'Book Private Lesson'}
            </Button>
          </form>
        </div>

        {/* Pricing & Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-dollar-sign text-red-600 text-xl"></i>
            </div>
            <h3 className="font-semibold mb-2">Pricing</h3>
            <p className="text-gray-600">$80/hour for private lessons<br />Package deals available</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-map-marker-alt text-red-600 text-xl"></i>
            </div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-gray-600">Parsippany, NJ area<br />Travel options available</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-clock text-red-600 text-xl"></i>
            </div>
            <h3 className="font-semibold mb-2">Duration</h3>
            <p className="text-gray-600">60-90 minute sessions<br />Flexible scheduling</p>
          </div>
        </div>
      </div>
    </div>
  );
}