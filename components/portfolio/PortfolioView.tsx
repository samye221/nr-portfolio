'use client'

import { useCallback, useMemo } from 'react'
import type { PortfolioImage } from '@/types/cloudinary'
import { Header } from '@/components/layout/Header'
import { Gallery, type GalleryImage } from '@/components/gallery/Gallery'
import { useGalleryClose } from '@/components/gallery/useGalleryClose'
import { ELEMENT_IDS } from '@/lib/gallery.constants'

interface PortfolioViewProps {
  images: PortfolioImage[]
  initialImageId: string
}

export function PortfolioView({ images, initialImageId }: PortfolioViewProps) {
  const { isVisible, isFadingOut, handleClose } = useGalleryClose({
    gridElementId: ELEMENT_IDS.PORTFOLIO_GRID,
    closeRedirectUrl: '/portfolio',
  })

  const galleryImages: GalleryImage[] = useMemo(() =>
    images.map(img => ({
      id: img.id,
      secure_url: img.secure_url,
      alt: img.projectTitle,
    })),
    [images]
  )

  const buildUrl = useCallback((imageId: string) => `/portfolio/${imageId}`, [])

  if (!isVisible) {
    return <Header view="portfolio" />
  }

  return (
    <>
      <Header onClose={handleClose} />
      <section
        className={`flex min-h-screen flex-col items-center justify-center px-page pt-16 transition-opacity duration-200 ${
          isFadingOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="relative z-20">
          <Gallery
            images={galleryImages}
            initialImageId={initialImageId}
            buildUrl={buildUrl}
            onClose={handleClose}
            closeLabel="View portfolio"
          />
        </div>
      </section>
    </>
  )
}
