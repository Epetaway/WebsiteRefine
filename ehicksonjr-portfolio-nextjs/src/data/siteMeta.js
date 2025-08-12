
import logoBroadcastMed from '@/images/logos/BCM_logo.svg'
import logoSelf from '@/images/logos/MyLogo.svg'
import logoProsek from '@/images/logos/ProsekLogo.png'
import logoMerkle from '@/images/logos/MerkleLogo.png'
import logoMerck from '@/images/logos/MerckLogo.png'
import logoNovocent from '@/images/logos/novocent_logo.png'


import logoVerizon from '@/images/logos/verizonLogo.png'

const siteMeta = {
    title: "Earl H.",
    description: "Front-End Developer based in Parsippany, New Jersey. With a passion for creating intuitive and responsive web interfaces, Earl combines technical expertise with creative problem-solving to deliver impactful digital solutions.Earl Hickson Jr., also known as Earl the Kaiju, is a skilled graphic artist, proficient front-end developer, and passionate Jiu-Jitsu competitor and instructor.",
    copyright: "Earl Hickson Jr., ",
    author: {
        name: "Earl Hickson Jr.",
        email: "earlhicksonjr@gmail.com",

        instagram: "https://instagram.com/ehicksonjr",
        github: "https://github.com.com/epetaway",
        linkedin: "https://www.linkedin.com/in/earl-hickson-jr/",

    },
    siteUrl: "https://ehicksonjr.com"
}
export const resume = [
  {
    company: 'Self-Employment',
    title: 'Freelance Developer & Designer',
    logo: logoSelf,
    start: '2024',
    end: {
      label: 'Present',
      dateTime: new Date().getFullYear(),
    },
  },
  {
    company: 'Wealth Creation Innovation',
    title: 'Senior Front-End Developer (Contract)',
    logo: logoSelf,
    start: 'Nov 2024',
    end: 'Dec 2024',
  },
  {
    company: 'Asembia',
    title: 'Frontend Developer',
    logo: logoSelf,
    start: 'Dec 2023',
    end: 'Nov 2024',
  },
  {
    company: 'BroadcastMed',
    title: 'Lead Designer and Developer',
    logo: logoBroadcastMed,
    start: 'Sep 2021',
    end: 'May 2023',
  },
  {
    company: 'Prosek Partners',
    title: 'Freelance Front-End Web Developer',
    logo: logoProsek,
    start: 'Apr 2021',
    end: 'Sep 2021',
  },
  {
    company: 'William R Seide Agency',
    title: 'Frontend Developer',
    logo: logoSelf,
    start: 'Jan 2020',
    end: 'Jun 2020',
  },
  {
    company: 'Merkle Inc',
    title: 'Email Marketing Specialist',
    logo: logoMerkle,
    start: 'Nov 2018',
    end: 'Jul 2019',
  },
  {
    company: 'Merck',
    title: 'Freelance Web Developer',
    logo: logoMerck,
    start: 'Apr 2018',
    end: 'Nov 2018',
  },
  {
    company: 'Novocent',
    title: 'Frontend Web Developer',
    logo: logoNovocent,
    start: 'Mar 2017',
    end: 'Jun 2017',
  },
  {
    company: 'Verizon Wireless',
    title: 'Front-End Developer',
    logo: logoVerizon,
    start: 'Sep 2015',
    end: 'Dec 2016',
  },
  {
    company: 'Second Melody',
    title: 'Web Developer',
    logo: logoSelf,
    start: 'Jun 2015',
    end: 'Sep 2015',
  },
]

export const projects = [
  {
    name: 'MTG Proxy Generator',
    description:
      'A JavaScript-based tool for generating proxy cards for Magic: The Gathering. Demonstrates proficiency in DOM manipulation, dynamic content rendering, and user customization through interactive forms.',
    link: { href: 'https://github.com/Epetaway/mtg-proxy-generator', label: 'JavaScript' },
  },
  {
    name: 'Todolist',
    description:
      'A simple and elegant to-do list application built with React. Showcases component-driven architecture, state management with hooks, and clean UI implementation.',
    link: { href: 'https://github.com/Epetaway/Todolist', label: 'React, JavaScript' },
  },
  {
    name: 'GitHub Portfolio Website',
    description:
      "A fully responsive, developer-focused portfolio site built with Next.js 14, Tailwind CSS, and dynamic metadata for SEO. Features include a light/dark mode toggle, project filtering, OG image generation, custom components, and modular content structure. Built to showcase modern front-end skills, reusable design systems, and personal branding.",
    link: { href: 'https://github.com/epetaway/earldkaiju', label: 'Next.js, Tailwind CSS' },
  },
  {
    name: 'Employee Directory',
    description:
      "In this project, I'm leveraging JavaScript to build an interactive employee directory by integrating data from third-party APIs such as Twitter, Facebook, IMDB, and Wikipedia. It's a dynamic exploration of effective data communication, all wrapped up in a user-friendly web interface.",
    link: { href: 'https://epetaway.github.io/Employee-Directory/', label: 'JavaScript, HTML, CSS' },
  },
  {
    name: 'Movie Rating App',
    description:
      'A small web app that allows the user to rate the latest Marvel movies using vanilla JavaScript. Highlights DOM handling, form inputs, and user interaction.',
    link: { href: 'https://epetaway.github.io/marvel-movie-app/', label: 'JavaScript, HTML, CSS' },
  },
  {
    name: 'Game Show App',
    description:
      "A browser version of 'Wheel of Success', a word guessing game. Built in vanilla JavaScript to demonstrate logic flow, event listeners, and dynamic UI rendering.",
    link: { href: 'https://epetaway.github.io/WHEEL-OF-SUCCESS/', label: 'JavaScript, HTML, CSS' },
  },
];








export default siteMeta;