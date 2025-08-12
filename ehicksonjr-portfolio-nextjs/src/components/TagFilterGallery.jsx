import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Gallery } from '@/components/Gallery';

const loadImages = async () => {
  const images = [];

  // Fetch images from folder 1
  const folder1Images = require.context('src/images/illustrations', false, /\.(png|jpe?g|svg)$/);
  folder1Images.keys().forEach((filename) => {
    const image = folder1Images(filename);
    const tags = ['Illustrations']; // Replace with desired tags for folder 1

    images.push({
      src: image.default,
      caption: 'Digital Art',
      tags: tags,
    });
  });

  // Fetch images from folder 2
  const folder3Images = require.context('src/images/designs', false, /\.(png|jpe?g|svg)$/);
  folder3Images.keys().forEach((filename) => {
    const image = folder3Images(filename);
    const tags = ['Design']; // Replace with desired tags for folder 3

    images.push({
      src: image.default,
      caption: 'Design',
      tags: tags,
    });
  });

  return images;
};

const TagFilterGallery = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const loadedImages = await loadImages();
      setImages(loadedImages);
    };

    fetchImages();
  }, []);

  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
  };

  let filteredImages;
  if (selectedTag === 'All') {
    // Shuffle the images when "All categories" tag is selected
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    filteredImages = shuffledImages;
  } else {
    filteredImages = images.filter((image) => image.tags.includes(selectedTag));
  }

  return (
    <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
      {/* Tag buttons */}
      <button
        type="button"
        className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800 ${
          selectedTag === 'All' ? 'bg-blue-500 text-white' : ''
        }`}
        onClick={() => handleTagFilter('All')}
      >
        All categories
      </button>
      <button
        type="button"
        className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800 ${
          selectedTag === 'Illustrations' ? 'bg-blue-500 text-white' : ''
        }`}
        onClick={() => handleTagFilter('Illustrations')}
      >
        Illustrations
      </button>
      <button
        type="button"
        className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800 ${
          selectedTag === 'Design' ? 'bg-blue-500 text-white' : ''
        }`}
        onClick={() => handleTagFilter('Design')}
      >
        Design
      </button>

      {/* Image gallery */}
      <div className="">
        <Gallery images={filteredImages} />
      </div>
    </div>
  );
};

export default TagFilterGallery;
