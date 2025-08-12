'use client'

import About from '../../client/src/pages/about'
import ClientOnly from '../components/client-only'

export default function AboutPage() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <About />
    </ClientOnly>
  )
}