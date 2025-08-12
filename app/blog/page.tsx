'use client'

import Blog from '../../client/src/pages/blog'
import ClientOnly from '../components/client-only'

export default function BlogPage() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <Blog />
    </ClientOnly>
  )
}