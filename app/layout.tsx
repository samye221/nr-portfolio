import type { Metadata } from 'next'
import { Fragment_Mono, Pinyon_Script } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { CacheButton } from '@/components/admin/CacheButton'

const fragmentMono = Fragment_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nathan Robin - Photography',
  description: 'Luxury & fashion photography portfolio',
  keywords: ['photography', 'luxury', 'fashion', 'mode', 'photographie', 'design'],
  authors: [{ name: 'Nathan Robin' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Nathan Robin Photography',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${fragmentMono.variable} ${pinyonScript.variable}`}>
      <body>
        {children}
        <Suspense fallback={null}>
          <CacheButton />
        </Suspense>
      </body>
    </html>
  )
}
