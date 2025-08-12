import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../client/src/index.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Earl Hickson Jr - Front-End Engineer & BJJ Black Belt',
  description: 'Professional portfolio of Earl Hickson Jr, Senior Front-End Engineer specializing in React, TypeScript, and modern web development. Also offering Brazilian Jiu-Jitsu training in Morris County, NJ.',
  keywords: 'Front-End Engineer, React Developer, TypeScript, JavaScript, Brazilian Jiu-Jitsu, BJJ, Web Development, Morris County NJ',
  authors: [{ name: 'Earl Hickson Jr' }],
  openGraph: {
    title: 'Earl Hickson Jr - Front-End Engineer & BJJ Black Belt',
    description: 'Professional portfolio and BJJ training services',
    url: 'https://ehicksonjr.com',
    siteName: 'Earl Hickson Jr Portfolio',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}