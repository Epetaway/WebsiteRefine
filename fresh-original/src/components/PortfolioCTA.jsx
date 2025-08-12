import Link from 'next/link'

export function PortfolioCTA() {
  return (
    <section className="w-full bg-white dark:bg-zinc-900 py-16 md:py-24 lg:py-32 text-zinc-800 dark:text-zinc-200 font-mono">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Text editor frame */}
        <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden">
          
          {/* Editor header */}
          <div className="flex items-center space-x-2 bg-zinc-200 dark:bg-zinc-800 px-4 py-2 border-b border-zinc-300 dark:border-zinc-700">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400 italic">portfolio.js</span>
          </div>

          {/* Code block */}
          <div className="p-6 text-sm leading-relaxed">
            <pre className="whitespace-pre-wrap text-left">
            {
              `// Highlighting my work through code
const portfolio = {
name: "Earl Hickson Jr.",
title: "Front-End Developer",
focus: "Modern UI Development",
projects: () => {
  stack: ["Next.js", "Tailwind", "React"],
  // explore projects I've built
  return `}
<Link href="/projects">
  <span className="text-blue-600 dark:text-teal-400 hover:underline cursor-pointer">
      viewPortfolio(&quot;/projects&quot;)
  </span>
</Link> {`;
}
};`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
