export type Testimonial = {
  name: string;
  relationship?: string;
  text: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Alex Johnson",
    relationship: "Student",
    text:
      "Joining Ultra-Jitsu was a game-changer for me. The private sessions are tailored to my pace, focusing on technique and strength. The instructors are knowledgeable and patient, making each class a unique learning experience. I've seen a significant improvement in my fitness and skills since I started. The community here is supportive and welcoming.",
    rating: 5,
  },
  {
    name: "Emily Clarke",
    relationship: "Student",
    text:
      "Ultra-Jitsu's group training sessions are the highlight of my week. The energy and enthusiasm in each class are contagious. The instructors blend traditional techniques with modern training methods. I've made great friends and learned so much.",
    rating: 5,
  },
  {
    name: "Linda Thompson",
    relationship: "Parent of Student",
    text:
      "As a parent, I've been thoroughly impressed with Ultra-Jitsu's approach to teaching children. My son's confidence and discipline have grown tremendously in a positive, supportive environment.",
    rating: 5,
  },
  {
    name: "Carlos Ramirez",
    relationship: "Student",
    text:
      "Coaching is top-notch. Strategic advice and on-the-fly adaptations helped me immensely during competition. The support and tactical insights gave me the confidence to perform.",
    rating: 5,
  },
  {
    name: "Mike Tavaglione",
    relationship: "Training Partner",
    text:
      "Even though Earl is higher rank, he always rolls with me and shares tips. He never goes too rough with newer folks, which makes learning feel safe and encouraging.",
    rating: 5,
  },
  {
    name: "Markel Pierre",
    relationship: "Student",
    text:
      "Earl is easygoing and always happy to answer questions. He’ll break down techniques from judo, wrestling, and jiu-jitsu — awesome person to learn from.",
    rating: 5,
  },
  {
    name: "Phil Schochet",
    relationship: "Student",
    text:
      "Professor Earl adapts to a wide range of students. As a middle-aged hobbyist, I learn just as much as the competitors. Tough conditioning + positive energy = consistent progress.",
    rating: 5,
  },
];
