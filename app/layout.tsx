import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { QueryClient } from '@tanstack/react-query'
import { Providers } from './providers'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Earl Hickson Jr. - Senior Front-End Engineer | React • JavaScript • UI/UX • Full-Stack',
  description: 'Senior Front-End Engineer specializing in React, JavaScript, UI/UX, and expanding into full-stack development. Based in Parsippany, NJ. Available for senior engineering roles.',
  openGraph: {
    title: 'Earl Hickson Jr. - Senior Front-End Engineer',
    description: 'Senior Front-End Engineer specializing in React, JavaScript, UI/UX, and expanding into full-stack development.',
    type: 'website',
    url: 'https://www.ehicksonjr.com',
  },
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <TooltipProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}