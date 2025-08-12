import { NextSeo } from 'next-seo';
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'
import  siteMeta  from '@/data/siteMeta'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  const headline = 'Ultra-jitsu: blog'
  const intro="Whether you're a fellow martial artist, considering starting Jiu-Jitsu, or simply curious about the sport, I hope my story can inspire, inform, and maybe even entertain you. My journey is not just about mastering techniques or winning fights—it's about personal growth, overcoming challenges, and learning to see the world from new perspectives."

  return (
    <>
    <NextSeo
      title="Ultra-Jitsu - Earl the Kaiju"
      description={siteMeta.description}
      canonical="https://ehicksonjr.com/ultrajitsu"
      openGraph={{
        url: 'https://ehicksonjr.com/ultrajitsu',
        images: [
          {
            url: `https://og.ehicksonjr.com/api/og?title=Ultra-Jitsu&desc=${headline}`,
            width: 1200,
            height: 600,
            alt: 'Og Image Alt',
            type: 'image/jpeg',
          }
        ],
        siteName: 'ehicksonjr.com',
      }}
    />
      <SimpleLayout
        title={headline}
        intro={intro}
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const articles = await getAllArticles();

  articles.forEach(article => {
    if (!article.date) {
      console.error(`Missing date for article: ${article.slug}`);
    } else {
      const date = new Date(article.date);
      if (isNaN(date.getTime())) {
        console.error(`Invalid date for article: ${article.slug}`);
      }
    }
  });

  return {
    props: {
      articles: articles.map(({ component, ...meta }) => meta),
    },
  }
}
