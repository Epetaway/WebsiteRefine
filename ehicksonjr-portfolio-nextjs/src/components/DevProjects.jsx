import React from 'react'
import { Card } from '@/components/Card'
import { projects } from '@/data/siteMeta'
import Link from 'next/link'
function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

const recentProjectsCode = (
  <>
{`const recentProjects = [
`}
    {projects.map((project) => (
      <div key={project.name}>
{`{
  name: "${project.name}",
  description:"${project.description}",
  `}
  <span className="text-purple-400">link: </span>
        <Link href={project.link.href} className="text-blue-600 dark:text-teal-400 hover:underline cursor-pointer">
          <span>{project.link.label}</span>
        </Link>
        {`
  },
`}
      </div>
    ))}
    {`];

recentProjects.forEach(p => {
  console.log(p.name);
  // view live project at: p.link
});`}
  </>
);

export function DevProjects({ className = '' }) {
  return (
    <section className={`w-full bg-white dark:bg-zinc-900 py-12 text-zinc-800 dark:text-zinc-200 font-mono  dark:border-zinc-700 ${className}`}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center space-x-2 bg-zinc-200 dark:bg-zinc-800 px-4 py-2 border-b border-zinc-300 dark:border-zinc-700">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400 italic">devProjects.js</span>
          </div>
          <div className="p-6 text-sm leading-relaxed overflow-x-auto">
            <pre className="whitespace-pre-wrap text-left text-orange-300">
              {recentProjectsCode}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DevProjects;
