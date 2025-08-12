import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Earl Hickson Jr. - Senior Front-End Engineer',
  description: 'Professional portfolio of Earl Hickson Jr., a Senior Front-End Engineer specializing in React, TypeScript, and modern web development. Based in Parsippany, New Jersey.',
  keywords: 'Earl Hickson Jr, Front-End Engineer, React Developer, TypeScript, JavaScript, UI/UX, Web Development, Parsippany NJ',
  authors: [{ name: 'Earl Hickson Jr.' }],
  openGraph: {
    title: 'Earl Hickson Jr. - Senior Front-End Engineer',
    description: 'Professional portfolio showcasing modern web development expertise and Brazilian Jiu-Jitsu coaching.',
    url: 'https://ehicksonjr.com',
    siteName: 'Earl Hickson Jr. Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Earl Hickson Jr. - Senior Front-End Engineer',
    description: 'Professional portfolio showcasing modern web development expertise.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  )
}