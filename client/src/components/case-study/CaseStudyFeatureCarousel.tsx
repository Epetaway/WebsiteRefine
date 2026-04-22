import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { FeatureMediaItem } from "./types";

type CaseStudyFeatureCarouselProps = {
  features: FeatureMediaItem[];
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CaseStudyFeatureCarousel({ features }: CaseStudyFeatureCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="features" className="scroll-mt-24 py-12 border-t border-[#1A1A1A]">
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--case-accent)" }}
      >
        05 Key Features
      </motion.p>

      <div className="flex items-end justify-between mb-6">
        <div>
          <motion.h2
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.04 }}
            className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-2"
          >
            Core features and functionality
          </motion.h2>
          <motion.p
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-[#B7B7B7] text-sm max-w-lg"
          >
            Highlight the most important features built and the value they provide.
          </motion.p>
        </div>

        {/* Navigation arrows */}
        <div className="hidden sm:flex items-center gap-2 flex-none ml-4">
          <button
            onClick={scrollPrev}
            aria-label="Previous feature"
            className="w-9 h-9 rounded-full border border-[#20252A] bg-[#111111] flex items-center justify-center text-[#B7B7B7] hover:text-[#F5F5F5] hover:border-[var(--case-accent)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next feature"
            className="w-9 h-9 rounded-full border border-[#20252A] bg-[#111111] flex items-center justify-center text-[#B7B7B7] hover:text-[#F5F5F5] hover:border-[var(--case-accent)] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden -mx-1">
        <div className="flex gap-4 px-1">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex-none w-[85%] sm:w-[46%] lg:w-[31%] rounded-xl border border-[#20252A] bg-[#111111] overflow-hidden hover:-translate-y-0.5 transition-transform duration-200"
            >
              {/* Screenshot */}
              {feature.image ? (
                <div className="w-full aspect-[16/10] bg-[#0D0D0D] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[16/10] bg-gradient-to-br from-[#1A1A1A] to-[#111111] flex items-center justify-center">
                  <span className="text-4xl opacity-30">🖼</span>
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                {feature.tag && (
                  <span
                    className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2"
                    style={{
                      color: "var(--case-accent)",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    {feature.tag}
                  </span>
                )}
                <p className="text-sm font-semibold text-[#F5F5F5] mb-1">{feature.title}</p>
                <p className="text-xs text-[#7A7A7A] leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex sm:hidden items-center justify-center gap-3 mt-5">
        <button
          onClick={scrollPrev}
          aria-label="Previous feature"
          className="w-9 h-9 rounded-full border border-[#20252A] bg-[#111111] flex items-center justify-center text-[#B7B7B7]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next feature"
          className="w-9 h-9 rounded-full border border-[#20252A] bg-[#111111] flex items-center justify-center text-[#B7B7B7]"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
