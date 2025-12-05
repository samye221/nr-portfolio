import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { LightboxContent } from './LightboxContent'

export const metadata: Metadata = {
  title: 'Lightbox',
  description: `Your saved images from ${SITE.name}'s portfolio`,
  robots: { index: false, follow: false },
}

export default function LightboxPage() {
  return <LightboxContent />
}
