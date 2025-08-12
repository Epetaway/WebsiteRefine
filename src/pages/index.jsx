import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';

// Dynamic Imports for Client-Side Components
const TreehouseSkills = dynamic(() => import('@/components/TreehouseSkills'), { ssr: false });
const Resume = dynamic(() => import('@/components/Resume'), { ssr: false });
const LetsConnect = dynamic(() => import('@/components/LetsConnect'), { ssr: false });

function Container({ className, children, ...props }) {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function Card({ as: Component = 'div', className, children, ...props }) {
  return (
    <Component
      className={clsx(className, 'group relative flex flex-col items-start')}
      {...props}
    >
      {children}
    </Component>
  )
}

Card.Link = function CardLink({ children, ...props }) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

Card.Title = function CardTitle({ as: Component = 'h2', href, children }) {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  )
}

Card.Eyebrow = function CardEyebrow({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
        decorate && 'pl-3.5'
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  )
}

Card.Description = function CardDescription({ children }) {
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  )
}

Card.Cta = function CardCta({ children }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="ml-1 h-4 w-4 stroke-current"
      >
        <path
          d="m9.75 9.75 4.5-4.5m0 0h-3.5m3.5 0v3.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function PortfolioCTA() {
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
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <button
          className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none"
          type="submit"
        >
          Join
        </button>
      </div>
    </div>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>{article.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {new Date(article.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

export default function Home({ articles = [] }) {
  return (
    <>
      <NextSeo
        title="Earl H."
        description="Front-End Engineer specializing in user-friendly, responsive web experiences through clean code and innovative designs."
        canonical="https://ehicksonjr.com/"
        openGraph={{
          url: 'https://ehicksonjr.com',
          images: [
            {
              url: `https://og.ehicksonjr.com/api/og?title=Earl H.&desc=Front-End Engineer`,
              width: 1200,
              height: 600,
              alt: 'Earl Hickson Jr. - Front-End Engineer',
            },
          ],
          siteName: 'ehicksonjr',
        }}
      />
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <Image
              src="/images/earl-professional.png"
              alt="Earl Hickson Jr."
              width={400}
              height={400}
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Crafting Engaging Digital Experiences
            </h1>
            <div className="prose mt-6 text-lg text-zinc-600 dark:prose-invert dark:text-zinc-400 space-y-5">
              <p>
                Welcome to the portfolio of Earl Hickson Jr., a Front-End Engineer based in Parsippany, New Jersey. I specialize in crafting user-friendly, responsive web experiences through clean code and innovative designs.
              </p>
              <p>
                Explore my work, learn about my journey, and discover how I bring ideas to life with a blend of creativity and technical skill.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-24 md:mt-28">
        <PortfolioCTA />
      </Container>

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto max-w-5xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6">
          <TreehouseSkills />
          <Resume />
          <LetsConnect />
        </div>
      </Container>

      <Container className="mt-24 md:mt-28">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-8">Latest Writings</h2>
        <div className="flex flex-col gap-16">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))
          ) : (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              No articles available at the moment. Please check back later.
            </p>
          )}
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  try {
    // For now return empty articles array since we need to set up the article system
    return {
      props: {
        articles: [],
      },
    };
  } catch (error) {
    console.error("Error loading articles:", error);
    return {
      props: {
        articles: [],
      },
    };
  }
}