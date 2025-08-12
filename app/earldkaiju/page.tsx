'use client'

import EarldKaiju from '../../client/src/pages/earldkaiju'
import ClientOnly from '../components/client-only'

export default function EarldKaijuPage() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <EarldKaiju />
    </ClientOnly>
  )
}