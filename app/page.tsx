'use client'

import Home from '../client/src/pages/home'
import ClientOnly from './components/client-only'

export default function HomePage() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <Home />
    </ClientOnly>
  )
}