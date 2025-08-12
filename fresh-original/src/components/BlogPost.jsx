import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Container } from '@/components/Container'
import { formatDate } from '@/lib/formatDate'
import { Prose } from '@/components/Prose'
import Image from 'next/image'


function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ArticleLayoutComponent = ({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
  bgImg,
  authorImg,
  authorName,
  content
}) => {
  const router = useRouter()

  if (isRssFeed) {
    return children
  }

  // Form the background image path from 'bgImg' and the images directory
  const bgImagePath = `/fixed/${bgImg}`;
  const authorImagePath = `/fixed/UJ_logo.svg`;

  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.description}
        canonical={`https://ehicksonjr.com${router.asPath}`}
        openGraph={{
          url: `https://ehicksonjr.com${router.asPath}`,
          images: [
            {
              url: `https://og.ehicksonjr.com/api/og?title=${meta.title}&desc=${meta.description}`,
              width: 1200,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            }
          ],
          siteName: 'ehicksonjr.com',
        }}
      />

      <div className="max-w-screen-xl mx-auto mt-10">
        <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style={{ height: '24em' }}>
          <div className="absolute left-0 bottom-0 w-full h-full z-10" style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}></div>
          <Image src={bgImagePath} layout="fill" objectFit="cover" alt="Article" />
          <div className="p-4 absolute bottom-0 left-0 z-20">
          <a href="#" onClick={() => router.back()} aria-label="Go back" className="mb-2">
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </a>

            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">{meta.title}</h2>
            <div className="flex mt-3">
            <Image
  src={authorImagePath}
  alt="Author"
  width={60}
  height={60}
  className="rounded-full"
/>
              <div className="ml-4 text-gray-200">
                <p>Earl the Kaiju</p>
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              </div>
            </div>
          </div>
        </div>

        <Container className="mt-10 lg:mt-22">
          <div className="xl:relative">
            <div className="mx-auto max-w-2xl">
              <article>
                <Prose className="mt-3">
                  {content && <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />}
                  {children}
                </Prose>
              </article>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

const ArticleLayout = dynamic(() => Promise.resolve(ArticleLayoutComponent), { ssr: false })

export default ArticleLayout;
