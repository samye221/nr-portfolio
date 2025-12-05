import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllPortfolioImages } from '@/lib/services/project.service'
import { Header } from '@/components/layout/Header'
import { Initials } from '@/components/layout/Initials'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { PortfolioGridSkeleton } from '@/components/portfolio/PortfolioGridSkeleton'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Complete photography portfolio by Nathan Robin. Browse all images from fashion and luxury shoots.',
  alternates: {
    canonical: '/portfolio',
  },
}

async function PortfolioGridLoader() {
  const images = await getAllPortfolioImages()

  if (images.length === 0) {
    return (
      <p className="opacity-60">
        No images found.
      </p>
    )
  }

  return <PortfolioGrid images={images} />
}

export default function PortfolioPage() {
  return (
    <>
      <Header view="portfolio" />
      <Initials variant="foreground" />
      <main className="relative z-20 min-h-screen px-4 sm:px-8 lg:px-16 pt-16 sm:pt-header-offset pb-24">
        <h1 className="sr-only">Photography Portfolio by Nathan Robin</h1>
        <Suspense fallback={<PortfolioGridSkeleton />}>
          <PortfolioGridLoader />
        </Suspense>
      </main>
    </>
  )
}
