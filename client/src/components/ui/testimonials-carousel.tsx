import { useEffect, useMemo, useRef, useState } from "react";

export type Testimonial = {
  name: string;
  relationship?: string;
  text: string;
  image?: string; // used as a background
};

type Props = {
  /** Optional headline shown above the carousel */
  title?: string;
  /** Autoplay interval in ms (set 0 or undefined to disable) */
  autoPlayMs?: number;
  /** Provide your own items; falls back to sensible defaults */
  items?: Testimonial[];
};

const DEFAULT_ITEMS: Testimonial[] = [
  {
    name: "Alex Johnson",
    relationship: "Student",
    text:
      "Joining Ultra-Jitsu was a game-changer for me. The private sessions are tailored to my pace, focusing on technique and strength.",
    image: "/assets/images/testimonial1.jpg",
  },
  {
    name: "Emily Clarke",
    relationship: "Student",
    text:
      "Ultra-Jitsu's group training sessions are the highlight of my week. The energy and enthusiasm in each class are contagious.",
    image: "/assets/images/testimonial2.jpg",
  },
  {
    name: "Linda Thompson",
    relationship: "Parent of Student",
    text:
      "My son has been attending Ultra-Jitsu classes for over a year, and the transformation in his confidence is remarkable.",
    image: "/assets/images/testimonial3.jpg",
  },
  {
    name: "Carlos Ramirez",
    relationship: "Student",
    text:
      "Ultra-Jitsu's coaching is top-notch. Their ability to analyze opponents and adapt strategies helped me immensely during my tournament.",
    image: "/assets/images/testimonial4.jpg",
  },
];

export default function TestimonialsCarousel({
  title,
  autoPlayMs = 6000,
  items,
}: Props) {
  const slides = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Autoplay
  useEffect(() => {
    if (!autoPlayMs || paused || slides.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, autoPlayMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [autoPlayMs, paused, slides.length]);

  const goTo = (i: number) => {
    if (slides.length === 0) return;
    const next = (i + slides.length) % slides.length;
    setIndex(next);
  };
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  if (!slides.length) return null;

  return (
    <section
      className="w-full bg-black text-white py-12 sm:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={title || "Testimonials"}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#39FF14]">
            {title}
          </h2>
        )}
      </div>

      {/* Slider viewport */}
      <div className="relative overflow-hidden">
        {/* Slides wrapper (translateX) */}
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((t, i) => (
            <article
              key={i}
              className="min-w-full"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              {/* Full-width panel with background image */}
              <div
                className="relative h-[420px] sm:h-[460px] md:h-[520px] w-full"
                style={{
                  backgroundImage: t.image ? `url(${t.image})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                {/* Content */}
                <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                  <div className="max-w-3xl">
                    <p className="text-lg sm:text-xl leading-relaxed text-gray-100">
                      <span className="block text-[#39FF14] text-2xl sm:text-3xl font-extrabold mb-3">
                        “
                      </span>
                      {t.text}
                      <span className="block text-[#39FF14] text-2xl sm:text-3xl font-extrabold mt-1">
                        ”
                      </span>
                    </p>
                    <div className="mt-6">
                      <div className="font-semibold text-white">
                        {t.name}
                        {t.relationship ? (
                          <span className="text-gray-300 font-normal"> — {t.relationship}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Arrows */}
        {slides.length > 1 && (
          <>
            <button
              aria-label="Previous testimonial"
              onClick={prev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 p-2 backdrop-blur"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 p-2 backdrop-blur"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={[
                  "h-2 w-2 rounded-full transition-all",
                  i === index ? "bg-[#39FF14] w-6" : "bg-white/40 hover:bg-white/70",
                ].join(" ")}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
