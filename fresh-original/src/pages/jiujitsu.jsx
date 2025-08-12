// src/pages/jiujitsu.jsx
import { useEffect } from 'react';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import { Container } from '@/components/Container';
import JumbotronCarousel from '@/components/JumbotronCarousel';

export default function JiuJitsuPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return (
    <>
      <Head>
        <title>Earl the Kaiju – Jiu-Jitsu</title>
        <meta
          name="description"
          content="Explore Earl the Kaiju’s Brazilian Jiu-Jitsu journey, accolades, and availability for private training."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Protest+Revolution&display=swap"
          rel="stylesheet"
        />
      </Head>

      <JumbotronCarousel className="mt-25" />

      <Container className=" text-white bg-[#000000]">
        <div className="space-y-24">
          <div className="max-w-2xl">
            <h1
              className="text-4xl font-bold tracking-tight text-[#39FF14] sm:text-5xl"
              style={{ fontFamily: '"Protest Revolution", sans-serif' }}
            >
              Brazilian Jiu-Jitsu Journey
            </h1>
            <p className="mt-6 text-base text-[#e9e6bd] font-sans">
              Earl the Kaiju is a seasoned Brazilian Jiu-Jitsu practitioner and competitor, proudly representing Morris County, NJ. With years of experience and a strong dedication to the art, Earl brings both ferocity and technical precision to the mat.
            </p>
          </div>

          <div className="max-w-3xl">
            <h2
              className="text-3xl text-[#39FF14]"
              style={{ fontFamily: '"Protest Revolution", sans-serif' }}
            >
              Accolades
            </h2>
            <ul className="mt-4 list-disc list-inside text-[#e9e6bd] space-y-2 font-sans">
              <li>Brown Belt under AMA Fight Club</li>
              <li>Multiple-time IBJJF Open Medalist</li>
              <li>2023 NJ State Champion (Adult Division)</li>
              <li>Competed nationally and regionally since 2015</li>
            </ul>
          </div>

          <div className="max-w-3xl">
            <h2
              className="text-3xl text-[#39FF14]"
              style={{ fontFamily: '"Protest Revolution", sans-serif' }}
            >
              Private Training Available
            </h2>
            <p className="mt-4 text-[#e9e6bd] font-sans">
              Ready to level up your grappling game? Earl is available for 1-on-1 or small group private training sessions for adults and kids of all levels. Training focuses on fundamentals, competition prep, and self-defense.
            </p>
            <p className="mt-4">
              <a
                href="mailto:e@ehicksonjr.com"
                className="inline-block rounded-md bg-[#39FF14] px-5 py-2 mt-4 text-sm font-bold text-black shadow hover:brightness-110 font-sans"
              >
                Book a Private Session
              </a>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
