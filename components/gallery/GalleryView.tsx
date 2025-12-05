'use client'

import { useCallback } from 'react'
import { Header, type HeaderView } from '@/components/layout/Header'
import { Gallery, type GalleryImage } from '@/components/gallery/Gallery'
import { useGalleryClose } from '@/components/gallery/useGalleryClose'

interface GalleryViewProps {
  images: GalleryImage[]
  initialImageId: string
  gridElementId: string
  closeRedirectUrl: string
  headerView: HeaderView
  closeLabel: string
  urlPattern: string
}

export function GalleryView({
  images,
  initialImageId,
  gridElementId,
  closeRedirectUrl,
  headerView,
  closeLabel,
  urlPattern,
}: GalleryViewProps) {
  const { isVisible, handleClose } = useGalleryClose({
    gridElementId,
    closeRedirectUrl,
  })

  const buildUrl = useCallback(
    (imageId: string) => urlPattern.replace('{id}', imageId),
    [urlPattern]
  )

  return (
    <>
      {isVisible ? (
        <Header onClose={handleClose} />
      ) : (
        <Header view={headerView} />
      )}
      {isVisible && (
        <section
          className="relative z-20 flex min-h-screen flex-col items-center justify-center px-header-offset"
        >
          <Gallery
            images={images}
            initialImageId={initialImageId}
            buildUrl={buildUrl}
            onClose={handleClose}
            closeLabel={closeLabel}
          />
        </section>
      )}
    </>
  )
}
