import { useEffect, useMemo, useRef, useState } from "react";

export type Testimonial = {
  name: string;
  relationship?: string;
  text: string;
  rating?: number; // 1–5
  image?: string;  // optional; not required
};

type Props = {
  /** Optional headline shown above the carousel */
  title?: string;
  /** Autoplay interval in ms (set 0 or undefined to disable) */
  autoPlayMs?: number;
  /** Provide your own items; falls back to the list below */
  items?: Testimonial[];
  /** Stationary background image for the whole section */
  bgImage?: string;
};

/** === YOUR UPDATED TESTIMONIALS (now the defaults) === */
const DEFAULT_ITEMS: Testimonial[] = [
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

/** simple star row (1–5) */
function Stars({ value = 5 }: { value?: number }) {
  const v = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex gap-1" aria-label={`${v} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${i < v ? "text-yellow-400" : "text-white/40"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel({
  title,
  autoPlayMs = 6000,
  items,
  bgImage = "/images/sections/testimonials-bg.jpg", // pass your own to override
}: Props) {
  const slides = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // autoplay (fade)
  useEffect(() => {
    if (!autoPlayMs || paused || slides.length <= 1) return;
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, autoPlayMs);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [autoPlayMs, paused, slides.length, index]);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  if (!slides.length) return null;

  return (
    <section
      className="relative w-full text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={title || "Testimonials"}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      {/* overlay for contrast */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {title && <h2 className="text-2xl sm:text-3xl font-bold mb-8">{title}</h2>}

        <div
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonial carousel"
          aria-live="polite"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
          }}
        >
          {/* fixed height to prevent layout shift */}
          <div className="relative h-[380px] sm:h-[420px] md:h-[460px]">
            {slides.map((t, i) => {
              const active = i === index;
              return (
                <article
                  key={`${t.name}-${i}`}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}`}
                  className={[
                    "absolute inset-0 transition-opacity duration-700 ease-out will-change-opacity",
                    active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                  ].join(" ")}
                >
                  <div className="h-full flex items-center">
                    <div className="max-w-3xl rounded-2xl bg-white/10 backdrop-blur p-6 sm:p-8 shadow-2xl">
                      <Stars value={t.rating ?? 5} />
                      <p className="mt-3 text-lg sm:text-xl leading-relaxed text-gray-100">
                        <span className="block text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: "var(--kaiju-green, #86d64a)" }}>
                          “
                        </span>
                        {t.text}
                        <span className="block text-2xl sm:text-3xl font-extrabold mt-1" style={{ color: "var(--kaiju-green, #86d64a)" }}>
                          ”
                        </span>
                      </p>
                      <div className="mt-6 font-semibold">
                        {t.name}
                        {t.relationship ? <span className="text-gray-300 font-normal"> — {t.relationship}</span> : null}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {slides.length > 1 && (
            <div className="mt-6 flex items-center gap-3">
              <button
                aria-label="Previous testimonial"
                onClick={prev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                aria-label="Next testimonial"
                onClick={next}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* dots */}
              <div className="ml-1 flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => goTo(i)}
                    className={[
                      "h-2.5 rounded-full transition-all",
                      i === index ? "w-6 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
