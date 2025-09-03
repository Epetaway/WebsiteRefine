import { useEffect, useMemo, useRef, useState } from "react";

export type Testimonial = {
  name: string;
  relationship?: string;
  text: string;
  image?: string; // optional; not required for this version
};

type Props = {
  /** Optional headline shown above the carousel */
  title?: string;
  /** Autoplay interval in ms (set 0 or undefined to disable) */
  autoPlayMs?: number;
  /** Provide your own items; falls back to sensible defaults */
  items?: Testimonial[];
  /** Stationary background image for the whole section */
  bgImage?: string;
};

const DEFAULT_ITEMS: Testimonial[] = [
  {
    name: "Alex Johnson",
    relationship: "Student",
    text:
      "Joining Ultra-Jitsu was a game-changer for me. The private sessions are tailored to my pace, focusing on technique and strength.",
  },
  {
    name: "Emily Clarke",
    relationship: "Student",
    text:
      "Ultra-Jitsu's group training sessions are the highlight of my week. The energy and enthusiasm in each class are contagious.",
  },
  {
    name: "Linda Thompson",
    relationship: "Parent of Student",
    text:
      "My son has been attending Ultra-Jitsu classes for over a year, and the transformation in his confidence is remarkable.",
  },
  {
    name: "Carlos Ramirez",
    relationship: "Student",
    text:
      "Ultra-Jitsu's coaching is top-notch. Their ability to analyze opponents and adapt strategies helped me immensely during my tournament.",
  },
];

export default function TestimonialsCarousel({
  title,
  autoPlayMs = 6000,
  items,
  bgImage = "/images/sections/testimonials-bg.jpg", // change or pass your own
}: Props) {
  const slides = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Autoplay (fade)
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

  const goTo = (i: number) => {
    if (!slides.length) return;
    const next = (i + slides.length) % slides.length;
    setIndex(next);
  };
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  if (!slides.length) return null;

  return (
    <section
      className="relative w-full text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={title || "Testimonials"}
      // Stationary background for the whole section
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll", // stays put; no parallax-induced jank
      }}
    >
      {/* dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {title && (
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
          </div>
        )}

        {/* Fade carousel container (fixed height to avoid layout shift) */}
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
          {/* viewport height: comfy on mobile, roomy on desktop */}
          <div className="relative h-[380px] sm:h-[420px] md:h-[460px]">
            {slides.map((t, i) => {
              const active = i === index;
              return (
                <article
                  key={i}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}`}
                  className={[
                    "absolute inset-0 transition-opacity duration-600 ease-out will-change-opacity",
                    active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                  ].join(" ")}
                >
                  <div className="h-full flex items-center">
                    {/* Content card */}
                    <div className="max-w-3xl rounded-2xl bg-white/10 backdrop-blur p-6 sm:p-8 shadow-2xl">
                      <p className="text-lg sm:text-xl leading-relaxed text-gray-100">
                        <span className="block text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: "var(--kaiju-green, #86d64a)" }}>
                          “
                        </span>
                        {t.text}
                        <span className="block text-2xl sm:text-3xl font-extrabold mt-1" style={{ color: "var(--kaiju-green, #86d64a)" }}>
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
                </article>
              );
            })}
          </div>

          {/* Controls */}
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

              {/* Dots */}
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
