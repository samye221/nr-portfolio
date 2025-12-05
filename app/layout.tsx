import type { Metadata } from 'next'
import { Fragment_Mono, Pinyon_Script } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { CacheButton } from '@/components/admin/CacheButton'
import { CursorProvider } from '@/components/cursor/CursorContext'
import { CustomCursor } from '@/components/cursor/CustomCursor'
import { FavoritesProvider } from '@/components/favorites/FavoritesContext'
import { SITE } from '@/lib/constants'
import { getCloudinaryUrl } from '@/lib/cloudinary'

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

const ogImageUrl = getCloudinaryUrl(SITE.logo.publicId, 'w_1200,h_630,c_pad,b_rgb:FFFDF8,f_jpg')

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['photography', 'luxury', 'fashion', 'photographer', 'portfolio', 'Nathan Robin'],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.title,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: SITE.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE.url,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': `${SITE.url}/#person`,
      name: SITE.name,
      url: SITE.url,
      image: ogImageUrl,
      jobTitle: 'Photographer',
      sameAs: [SITE.social.instagram],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fragmentMono.variable} ${pinyonScript.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CursorProvider>
          <FavoritesProvider>
            <CustomCursor />
            {children}
            <Suspense fallback={null}>
              <CacheButton />
            </Suspense>
          </FavoritesProvider>
        </CursorProvider>
      </body>
    </html>
  )
}
