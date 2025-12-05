'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { generateBlurDataUrl, optimizeGalleryUrl } from '@/lib/cloudinary'
import { GALLERY, ELEMENT_IDS } from '@/lib/gallery.constants'
import { useCursor } from '@/components/cursor/CursorContext'
import { FavoriteButton } from '@/components/favorites/FavoriteButton'
import { PinterestSaveButton } from '@/components/pinterest/PinterestSaveButton'
import { SITE } from '@/lib/constants'

export interface ImageCredits {
  title?: string
  credits?: Record<string, string>
}

export interface GalleryImage {
  id: string
  secure_url: string
  alt: string
  caption?: string
  metadata?: ImageCredits
  projectSlug: string
  projectTitle: string
}

interface GalleryProps {
  images: GalleryImage[]
  initialImageId: string
  buildUrl: (imageId: string) => string
  onClose?: () => void
  closeLabel?: string
}

export function Gallery({
  images,
  initialImageId,
  buildUrl,
  onClose,
  closeLabel = 'Close',
}: GalleryProps) {
  const { setVariant, setTheme } = useCursor()
  const initialIndex = images.findIndex(img => img.id === initialImageId)
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0)

  const currentImage = images[currentIndex]
  const isFirstImage = currentIndex === 0
  const isLastImage = currentIndex === images.length - 1

  const updateUrl = useCallback((imageId: string) => {
    window.history.replaceState(null, '', buildUrl(imageId))
  }, [buildUrl])

  const goToPrevious = useCallback(() => {
    if (isFirstImage) return
    const newIndex = currentIndex - 1
    setCurrentIndex(newIndex)
    updateUrl(images[newIndex].id)
  }, [currentIndex, isFirstImage, images, updateUrl])

  const goToNext = useCallback(() => {
    if (isLastImage) {
      onClose?.()
      return
    }
    const newIndex = currentIndex + 1
    setCurrentIndex(newIndex)
    updateUrl(images[newIndex].id)
  }, [currentIndex, isLastImage, images, updateUrl, onClose])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  useEffect(() => {
    const addedLinks: HTMLLinkElement[] = []

    for (let i = 1; i <= GALLERY.PRELOAD_COUNT; i++) {
      const nextIdx = currentIndex + i
      const prevIdx = currentIndex - i

      if (nextIdx < images.length) {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = optimizeGalleryUrl(images[nextIdx].secure_url)
        document.head.appendChild(link)
        addedLinks.push(link)
      }

      if (prevIdx >= 0) {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = optimizeGalleryUrl(images[prevIdx].secure_url)
        document.head.appendChild(link)
        addedLinks.push(link)
      }
    }

    return () => {
      addedLinks.forEach(link => link.remove())
    }
  }, [currentIndex, images])

  const nextLabel = isLastImage ? closeLabel : 'Next image'

  const resetCursor = () => {
    setVariant('default')
    setTheme('dark')
  }

  return (
    <>
      {!isFirstImage && (
        <button
          onClick={goToPrevious}
          onMouseEnter={() => { setVariant('left'); setTheme('dark') }}
          onMouseLeave={resetCursor}
          className="fixed left-0 top-0 h-full z-20 bg-transparent"
          style={{ width: GALLERY.SIDE_BUTTON_WIDTH }}
          aria-label="Previous image"
        />
      )}

      <button
        onClick={goToNext}
        onMouseEnter={() => { setVariant('right'); setTheme('dark') }}
        onMouseLeave={resetCursor}
        className="fixed right-0 top-0 h-full z-20 bg-transparent"
        style={{ width: GALLERY.SIDE_BUTTON_WIDTH }}
        aria-label={nextLabel}
      />

      <div className="relative">
        <div
          id={ELEMENT_IDS.SELECTED_IMAGE}
          className="relative"
          style={{ width: GALLERY.IMAGE_WIDTH, height: GALLERY.IMAGE_HEIGHT }}
          onMouseEnter={() => setTheme('light')}
          onMouseLeave={() => setTheme('dark')}
        >
          <Image
            src={optimizeGalleryUrl(currentImage.secure_url)}
            alt={currentImage.alt}
            fill
            className="object-cover"
            priority
            unoptimized
            placeholder="blur"
            blurDataURL={generateBlurDataUrl(currentImage.secure_url)}
          />

          {!isFirstImage && (
            <button
              onClick={goToPrevious}
              onMouseEnter={() => { setVariant('left'); setTheme('light') }}
              onMouseLeave={() => setVariant('default')}
              className="absolute left-0 top-0 h-full w-1/2 z-30 bg-transparent"
              aria-label="Previous image"
            />
          )}

          <button
            onClick={goToNext}
            onMouseEnter={() => { setVariant('right'); setTheme('light') }}
            onMouseLeave={() => setVariant('default')}
            className="absolute right-0 top-0 h-full w-1/2 z-30 bg-transparent"
            aria-label={nextLabel}
          />
          {(currentImage.metadata || currentImage.caption) && (
            <div className="absolute bottom-4 left-4 z-40 max-w-[280px] text-sm leading-tight text-background pointer-events-none">
              {currentImage.metadata?.title && (
                <p>{currentImage.metadata.title}</p>
              )}
              {currentImage.metadata?.credits && (
                <p>
                  {Object.entries(currentImage.metadata.credits).map(([role, name], index) => (
                    <span key={role}>
                      {index > 0 && ' '}
                      <span className="underline">{role}</span>: {name}
                    </span>
                  ))}
                </p>
              )}
              {!currentImage.metadata && currentImage.caption && (
                <p>{currentImage.caption}</p>
              )}
            </div>
          )}
          <div className="absolute bottom-4 right-4 z-40 flex items-center gap-2">
            <PinterestSaveButton
              imageUrl={currentImage.secure_url}
              pageUrl={`${SITE.url}${buildUrl(currentImage.id)}`}
              description={`${currentImage.projectTitle} - Photography by ${SITE.name}`}
            />
            <FavoriteButton
              image={{
                id: currentImage.id,
                secure_url: currentImage.secure_url,
                projectSlug: currentImage.projectSlug,
                projectTitle: currentImage.projectTitle,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
