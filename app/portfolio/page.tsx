import type { Metadata } from 'next'
import { getAllPortfolioImages } from '@/lib/services/project.service'
import { Header } from '@/components/layout/Header'
import { Initials } from '@/components/layout/Initials'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Complete photography portfolio by Nathan Robin. Browse all images from fashion and luxury shoots.',
  alternates: {
    canonical: '/portfolio',
  },
}

export default async function PortfolioPage() {
  const images = await getAllPortfolioImages()

  if (images.length === 0) {
    return (
      <>
        <Header view="portfolio" />
        <Initials initialVariant="foreground" />
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-page pt-24">
          <p className="opacity-60">
            No images found.
          </p>
        </main>
      </>
    )
  }

  return (
    <>
      <Header view="portfolio" />
      <Initials initialVariant="foreground" />
      <main className="relative z-20 min-h-screen px-page pt-24">
        <h1 className="sr-only">Photography Portfolio by Nathan Robin</h1>
        <PortfolioGrid images={images} />
      </main>
    </>
  )
}
