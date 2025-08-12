// TreehouseSkills.jsx
import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import { FaCode } from 'react-icons/fa';

export default function TreehouseSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    async function fetchTreehouseData() {
      try {
        const response = await fetch('https://teamtreehouse.com/profiles/ehicksonjr.json');
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        const data = await response.json();
        setSkills(data.badges || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTreehouseData();
  }, []);

  if (loading) {
    return <div className="text-center text-sm text-zinc-500">Loading skills...</div>;
  }

  if (error) {
    return <div className="text-center text-sm text-red-500">Error loading skills: {error}</div>;
  }

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-zinc-900 flex flex-col gap-4 h-full shadow-md border border-zinc-200 dark:border-zinc-700">
      <h2 className="flex items-center text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        <FaCode className="mr-2 text-teal-500" />
        Coding Skills
      </h2>
      <div className="grid max-h-[400px] w-fit overflow-y-auto grid-cols-4 gap-3 md:grid-cols-3 md:gap-4">
        {skills.map((badge, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedBadge(badge)}
            className="w-fit cursor-pointer transition-transform transform hover:scale-105 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-2 shadow"
          >
            <Image 
              src={badge.icon_url} 
              alt={badge.name} 
              width={64} 
              height={64} 
              className="rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Modal for Badge Details */}
      {selectedBadge && (
        <Dialog open={true} onClose={() => setSelectedBadge(null)} className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" aria-hidden="true" />
          
          <div className="relative bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-xs w-full shadow-lg text-zinc-900 dark:text-zinc-100 z-50">
            <div className="flex flex-col items-center">
              <Image 
                src={selectedBadge.icon_url} 
                alt={selectedBadge.name} 
                width={80} 
                height={80} 
                className="rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-center">{selectedBadge.name}</h3>
              <p className="mt-2 text-sm text-center text-zinc-600 dark:text-zinc-400">
                {selectedBadge.courses && selectedBadge.courses.length > 0 ? (
                  selectedBadge.courses.map((course, index) => (
                    <span key={index} className="block">{course.title}</span>
                  ))
                ) : (
                  "No description available."
                )}
              </p>
              <a 
                href={selectedBadge.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 text-teal-500 hover:text-teal-400"
              >
                View on Treehouse
              </a>
              <button 
                onClick={() => setSelectedBadge(null)} 
                className="mt-4 text-sm text-red-500 hover:text-red-400"
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
