import React, { useState, useEffect } from 'react';

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
  'HTML5', 'CSS3', 'Tailwind CSS', 'SCSS', 'Git',
  'Responsive Design', 'Accessibility', 'Performance Optimization',
  'RESTful APIs', 'GraphQL', 'Database Design', 'MongoDB', 'PostgreSQL',
  'Brazilian Jiu-Jitsu', 'Teaching', 'Leadership'
];

export default function TreehouseSkills() {
  const [displaySkills, setDisplaySkills] = useState([]);

  useEffect(() => {
    setDisplaySkills(skills.slice(0, 12)); // Show first 12 skills
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-6 w-6 flex-none"
        >
          <path
            d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
            className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
          />
          <path
            d="m4 9 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 9"
            className="stroke-zinc-400 dark:stroke-zinc-500"
          />
        </svg>
        <span className="ml-3">Skills & Technologies</span>
      </h2>
      <div className="mt-4 max-h-48 overflow-y-auto">
        <div className="flex flex-wrap gap-2">
          {displaySkills.map((skill, index) => (
            <span
              key={index}
              className="inline-block bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}