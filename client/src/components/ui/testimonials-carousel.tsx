import { useEffect, useMemo, useRef, useState } from "react";
import { testimonials as defaultItems, type Testimonial } from "@/data/testimonials";

type Props = {
  backgroundImage?: string; // fallback to a sitewide bg if not provided
  items?: Testimonial[];
  autoPlayMs?: number;
};

export default function Testimonials({
  backgroundImage = "/images/testimonials-bg.jpg",
  items,
  autoPlayMs = 6500,
}: Props) {
  const slides = useMemo(() => (items?.length ? items : defaultItems), [items]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!autoPlayMs || paused || slides.length < 2) return;
    timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), autoPlayMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [autoPlayMs, paused, slides.length]);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <section
      className="relative w-full text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Testimonials"
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="sr-only">Testimonials</h2>

        {/* Slide */}
        <div className="max-w-3xl">
          <blockquote className="text-lg md:text-xl leading-relaxed">
            <span className="block text-3xl md:text-4xl font-extrabold text-[var(--kaiju-green,#86d64a)] mb-3">“</span>
            {slides[index].text}
            <span className="block text-3xl md:text-4xl font-extrabold text-[var(--kaiju-green,#86d64a)] mt-1">”</span>
          </blockquote>

          {/* Name + role + stars */}
          <div className="mt-5 flex items-center gap-3">
            <div className="text-sm md:text-base font-semibold">
              {slides[index].name}
              {slides[index].relationship ? (
                <span className="text-gray-300 font-normal"> — {slides[index].relationship}</span>
              ) : null}
            </div>
            <div className="flex" aria-label={`${slides[index].rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                  className={`fa-star ${i < (slides[index].rating ?? 0) ? "fa-solid" : "fa-regular"} text-yellow-400 ml-1`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        {slides.length > 1 && (
          <div className="mt-8 flex items-center gap-3">
            <button
              className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 p-2"
              aria-label="Previous testimonial"
              onClick={() => go(index - 1)}
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button
              className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 p-2"
              aria-label="Next testimonial"
              onClick={() => go(index + 1)}
            >
              <i className="fa-solid fa-chevron-right" />
            </button>

            <div className="ml-2 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-[var(--kaiju-green,#86d64a)]" : "w-2 bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
