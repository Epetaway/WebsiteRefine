'use client'

import CaseStudies from '../../client/src/pages/case-studies'
import ClientOnly from '../components/client-only'

export default function CaseStudiesPage() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <CaseStudies />
    </ClientOnly>
  )
}