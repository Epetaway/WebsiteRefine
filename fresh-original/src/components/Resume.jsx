import React from 'react';
import Image from 'next/image';
import { FaBriefcase } from 'react-icons/fa';
import siteMeta, { resume } from '@/data/siteMeta';

export default function Resume() {
  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-zinc-900 flex flex-col gap-4 h-full shadow-md border border-zinc-200 dark:border-zinc-700">
      <h2 className="flex items-center text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        <FaBriefcase className="mr-2 text-teal-500" />
        Work Experience
      </h2>
      <ol className="mt-4 space-y-4 max-h-[320px] overflow-y-auto pr-2">
        {resume?.map((role, index) => (
          <li key={index} className="flex gap-4 items-center">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full shadow-md bg-zinc-100 dark:bg-zinc-800">
              <Image src={role.logo} alt={role.company} width={40} height={40} className="rounded-full" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{role.company}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{role.title}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex justify-center">
        <a 
          href="https://www.linkedin.com/in/earl-hickson-jr/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-teal-500 hover:text-teal-400 transition"
        >
          View Full Resume on LinkedIn
        </a>
      </div>
    </div>
  );
}
