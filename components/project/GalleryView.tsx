'use client'

import { useCallback, useMemo } from 'react'
import type { CloudinaryResource } from '@/types/cloudinary'
import { Header } from '@/components/layout/Header'
import { Gallery, type GalleryImage, type ImageCredits } from '@/components/gallery/Gallery'
import { useGalleryClose } from '@/components/gallery/useGalleryClose'
import { ELEMENT_IDS } from '@/lib/gallery.constants'
import { extractImageId } from '@/lib/utils'

function parseCredits(creditsJson?: string): Record<string, string> | undefined {
  if (!creditsJson) return undefined
  try {
    return JSON.parse(creditsJson)
  } catch {
    return undefined
  }
}

function buildMetadata(context?: CloudinaryResource['context']): ImageCredits | undefined {
  const title = context?.custom?.caption
  const credits = parseCredits(context?.custom?.credits)
  if (!title && !credits) return undefined
  return { title, credits }
}

interface GalleryViewProps {
  images: CloudinaryResource[]
  initialImageId: string
  projectSlug: string
  projectTitle: string
}

export function GalleryView({ images, initialImageId, projectSlug, projectTitle }: GalleryViewProps) {
  const { isVisible, isFadingOut, handleClose } = useGalleryClose({
    gridElementId: ELEMENT_IDS.PROJECT_GRID,
    closeRedirectUrl: '/',
  })

  const galleryImages: GalleryImage[] = useMemo(() =>
    images.map(img => ({
      id: extractImageId(img.public_id),
      secure_url: img.secure_url,
      alt: projectTitle,
      caption: img.context?.custom?.caption,
      metadata: buildMetadata(img.context),
    })),
    [images, projectTitle]
  )

  const buildUrl = useCallback((imageId: string) => `/${projectSlug}/${imageId}`, [projectSlug])

  if (!isVisible) {
    return <Header view="projects" />
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
            closeLabel="View projects"
          />
        </div>
      </section>
    </>
  )
}
