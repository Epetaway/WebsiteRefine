import { Button } from '@/components/Button';
import { FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function LetsConnect() {
  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-zinc-900 flex flex-col gap-4 h-full shadow-md border border-zinc-200 dark:border-zinc-700">
      <h2 className="flex items-center text-xl font-bold text-zinc-900 dark:text-zinc-100">
        <FaEnvelope className="mr-2 text-teal-500" />
        Let's Connect
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Ready to discuss your next front-end project? Let's connect and build something great together.
      </p>
      <div className="space-y-3 mt-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          <strong>Email:</strong> earl@ehicksonjr.com
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          <strong>Response:</strong> Within 24 hours
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          <strong>Services:</strong> Front-end development, performance optimization, accessibility compliance
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Link href="/contact">
          <Button className="w-full bg-teal-500 text-white hover:bg-teal-400 transition">
            Send Message
          </Button>
        </Link>
        <a 
          href="mailto:earl@ehicksonjr.com"
          className="text-center text-sm text-teal-600 dark:text-teal-400 hover:underline"
        >
          Or email directly
        </a>
      </div>
    </div>
  );
}