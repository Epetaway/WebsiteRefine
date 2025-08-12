import React from 'react';
import Image from 'next/image';

export function Gallery({ images }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 dark:scrollbar-thumb-gray-300 dark:scrollbar-track-gray-700">
      {images.map((image) => (
        <div key={image.src}>
          <div className="grid gap-4">
            <Image
              src={image.src}
              className="h-auto max-w-full rounded-lg"
              alt={image.caption}
            />
            {/* <figcaption className="text-zinc-800 dark:text-zinc-200">{image.caption}</figcaption> */}
          </div>
        </div>
      ))}
      <style>{`
        :root {
          --scrollbar-track-color: #d1d5db; /* Light mode track color */
          --scrollbar-thumb-color: #4b5563; /* Light mode thumb color */
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --scrollbar-track-color: #374151; /* Dark mode track color */
            --scrollbar-thumb-color: #9ca3af; /* Dark mode thumb color */
          }
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background-color: var(--scrollbar-track-color);
        }

        ::-webkit-scrollbar-thumb {
          background-color: var(--scrollbar-thumb-color);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
