// components/JumbotronCarousel.jsx
'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const slides = [
  {
    src: 'https://via.placeholder.com/1600x600/1E1E2F/FFFFFF?text=Earl+The+Kaiju+Training',
    alt: 'Jiu-Jitsu Training',
    caption: 'Private Jiu-Jitsu Training With Earl the Kaiju',
  },
  {
    src: 'https://via.placeholder.com/1600x600/111/fff?text=Champion+Mindset',
    alt: 'Champion Mindset',
    caption: 'Building Champions On and Off the Mat',
  },
  {
    src: 'https://via.placeholder.com/1600x600/222/0f0?text=The+Kaiju+Way',
    alt: 'Kaiju Method',
    caption: 'The Kaiju Method – Train Hard. Stay Humble.',
  },
];

export default function JumbotronCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
        setTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-black mb-0">
      <div
        className={clsx(
          'absolute inset-0 w-full h-full transition-all duration-700 ease-in-out',
          transitioning ? 'animate-shake' : ''
        )}
        key={activeIndex}
      >
        <Image
          src={slides[activeIndex].src}
          alt={slides[activeIndex].alt}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h2 className="text-white text-3xl md:text-5xl font-extrabold text-center px-4 max-w-3xl">
            {slides[activeIndex].caption}
          </h2>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={clsx(
              'h-2 w-2 rounded-full transition-all duration-300',
              idx === activeIndex ? 'bg-white scale-125' : 'bg-zinc-500'
            )}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-3px) rotate(-1deg); }
          50% { transform: translateX(3px) rotate(1deg); }
          75% { transform: translateX(-2px) rotate(-1deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
