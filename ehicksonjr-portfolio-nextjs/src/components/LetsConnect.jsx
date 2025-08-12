// LetsConnect.jsx
import { Button } from '@/components/Button';
import { FaEnvelope } from 'react-icons/fa';

export default function LetsConnect() {
  return (
    <form
      action="mailto:e@ehicksonjr.com"
      method="POST"
      encType="text/plain"
      className="rounded-2xl p-6 bg-white dark:bg-zinc-900 flex flex-col gap-4 h-full shadow-md border border-zinc-200 dark:border-zinc-700"
    >
      <h2 className="flex items-center text-xl font-bold text-zinc-900 dark:text-zinc-100">
        <FaEnvelope className="mr-2 text-teal-500" />
        Let’s Connect
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Have a project in mind? Feel free to reach out.
      </p>
      <input
        type="text"
        name="email"
        placeholder="Your email"
        className="w-full rounded-md border px-3 py-2 focus:outline-none dark:bg-zinc-800 dark:text-zinc-200"
        required
      />
      <textarea
        name="message"
        rows="4"
        placeholder="Your message"
        className="w-full rounded-md border px-3 py-2 focus:outline-none dark:bg-zinc-800 dark:text-zinc-200 resize-none"
      ></textarea>
      <Button 
        type="submit" 
        className="mt-4 bg-teal-500 text-white hover:bg-teal-400 transition"
      >
        Send Message
      </Button>
    </form>
  );
}
