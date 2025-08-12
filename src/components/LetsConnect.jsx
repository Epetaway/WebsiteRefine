import React from 'react';

export default function LetsConnect() {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/ehicksonjr', icon: 'fab fa-linkedin' },
    { name: 'GitHub', url: 'https://github.com/Epetaway', icon: 'fab fa-github' },
    { name: 'Instagram', url: 'https://instagram.com/earld.kaiju', icon: 'fab fa-instagram' },
    { name: 'YouTube', url: 'https://youtube.com/@earldkaiju', icon: 'fab fa-youtube' },
  ];

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
            d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
            className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
          />
          <path
            d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
            className="stroke-zinc-400 dark:stroke-zinc-500"
          />
        </svg>
        <span className="ml-3">Let&apos;s Connect</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Follow me on social media and let&apos;s connect professionally.
      </p>
      <div className="mt-6 flex flex-col space-y-3">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
          >
            <i className={`${link.icon} mr-3 text-lg`}></i>
            {link.name}
          </a>
        ))}
      </div>
      <div className="mt-6">
        <a
          href="mailto:e@ehicksonjr.com"
          className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 w-full"
        >
          <i className="fas fa-envelope"></i>
          Contact Me
        </a>
      </div>
    </div>
  );
}