import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { Container } from '@/components/Container'
import {
  InstagramIcon,
  LinkedInIcon,
  GitHubIcon,
  TwitterIcon,
  YouTubeIcon,
} from '@/components/SocialIcons'
import image1 from '@/images/photos/us.jpeg'
import image2 from '@/images/photos/justMe.png'
import image3 from '@/images/photos/me.jpeg'
import image4 from '@/images/photos/BjjClass.jpg'
import image5 from '@/images/photos/MeBjj_2.jpg'
import siteMeta from '@/data/siteMeta'
import { NextSeo } from 'next-seo'

function SocialLink({ href, icon: Icon, ...props }) {
  if (!href) return null
  return (
    <Link
      href={href}
      className="group -m-1 p-1"
      {...props}
    >
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

export default function About() {
  return (
    <>
      <NextSeo
        title="About - Earl Hickson Jr. - Senior Front-End Engineer"
        description={siteMeta.description}
        canonical="https://ehicksonjr.com/about"
        openGraph={{
          url: 'https://ehicksonjr.com/about',
          images: [
            {
              url: `https://og.ehicksonjr.com/api/og?title=About&desc=${siteMeta.description}`,
              width: 1200,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
          ],
          siteName: 'ehicksonjr.com',
        }}
      />

      {/* Intro Section with Socials */}
      <Container className="mt-9 sm:px-8">
        <div className="mx-auto max-w-2xl text-lg">
          <div className="mx-auto max-w-2xl lg:max-w-5xl text-left">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              More About Me
            </h1>
            <div className="prose prose-lg mt-6 dark:prose-invert text-zinc-600 dark:text-zinc-400 space-y-5">
              <p>
                I&apos;m Earl Hickson Jr., a Senior Front-End Engineer and Graphic Designer based in Parsippany, New Jersey. With 6+ years of experience in HTML, CSS, JavaScript, React, and proficiency in tools like Adobe Creative Suite, I specialize in creating accessible, high-performing web applications with proven results.
              </p>
              <p>
                My journey into martial arts began in 2015 when I discovered Brazilian Jiu-Jitsu. This discipline not only enhanced my physical abilities but also instilled in me a profound sense of confidence, discipline, and community. The concept of the &apos;kaiju&apos;—a powerful force capable of both destruction and great good—resonates deeply with me. It symbolizes the inner strength and potential we all possess, which I&apos;ve learned to harness through Jiu-Jitsu.
              </p>
            </div>

            {/* Instagram + YouTube */}
            <div className="mt-6 flex gap-6">
              <SocialLink
                href="https://www.instagram.com/earld.kaiju/?next=%2F"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://www.youtube.com/@earldkaiju"
                aria-label="Subscribe on YouTube"
                icon={YouTubeIcon}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Photo Collage */}
      <Container className="mt-16 sm:mt-20">
        <div className="-my-4 flex justify-center gap-5  py-4 sm:gap-8">
          {[image1, image2, image3, image4, image5].map((image, imageIndex) => {
            const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
            return (
              <div
                key={image.src}
                className={clsx(
                  'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                  rotations[imageIndex % rotations.length]
                )}
              >
                <Image
                  src={image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  sizes="(min-width: 640px) 18rem, 11rem"
                />
              </div>
            )
          })}
        </div>
      </Container>

      {/* Remaining Bio Paragraphs */}
      <Container className="mt-16 sm:mt-20">
         <div className="mx-auto max-w-2xl text-lg">
         <div className="max-w-3xl prose prose-lg dark:prose-invert text-zinc-600 dark:text-zinc-400 space-y-6">
          <p>
            I hold a Bachelor of Arts in Graphic Design from Kean University and a Tech Degree in Front-End Web Development from Team Treehouse. These qualifications, combined with my dedication to continuous learning, enable me to deliver exceptional digital solutions.
          </p>
          <p>
            When I&apos;m not coding or designing, you can find me on the Jiu-Jitsu mat, channeling my inner kaiju, or spending quality time with my family. I&apos;m passionate about creating digital experiences that not only look great but also provide meaningful user interactions.
          </p>
          <p>
            If you&apos;re seeking a web developer who combines technical proficiency with a unique perspective and a commitment to excellence, let&apos;s connect and create something extraordinary together.
          </p>
        </div>
         </div>
      </Container>
    </>
  )
}
