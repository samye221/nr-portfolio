'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { generateBlurDataUrl } from '@/lib/cloudinary'
import { GALLERY, ELEMENT_IDS } from '@/lib/gallery.constants'
import { useCursor } from '@/components/cursor/CursorContext'
import { ImageCaption } from './ImageCaption'
import { useImagePreloader } from './useImagePreloader'

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

const SWIPE_THRESHOLD = 50
const TRANSITION_DURATION = 300

export function Gallery({
  images,
  initialImageId,
  buildUrl,
  onClose,
  closeLabel = 'Close',
}: GalleryProps) {
  const { setVariant } = useCursor()
  const initialIndex = images.findIndex(img => img.id === initialImageId)
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0)
  const [displayIndex, setDisplayIndex] = useState(initialIndex >= 0 ? initialIndex : 0)
  const [fadeIn, setFadeIn] = useState(true)
  const touchStartX = useRef<number | null>(null)

  const displayImage = images[displayIndex]
  const isFirstImage = currentIndex === 0
  const isLastImage = currentIndex === images.length - 1

  const updateUrl = useCallback((imageId: string) => {
    window.history.replaceState(null, '', buildUrl(imageId))
  }, [buildUrl])

  const transitionTo = useCallback((newIndex: number) => {
    if (!fadeIn) return
    setFadeIn(false)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setDisplayIndex(newIndex)
      updateUrl(images[newIndex].id)
      setFadeIn(true)
    }, TRANSITION_DURATION / 2)
  }, [fadeIn, images, updateUrl])

  const goToPrevious = useCallback(() => {
    if (isFirstImage || !fadeIn) return
    transitionTo(currentIndex - 1)
  }, [currentIndex, isFirstImage, fadeIn, transitionTo])

  const goToNext = useCallback(() => {
    if (!fadeIn) return
    if (isLastImage) {
      onClose?.()
      return
    }
    transitionTo(currentIndex + 1)
  }, [currentIndex, isLastImage, fadeIn, transitionTo, onClose])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext, onClose])

  useImagePreloader({ images, currentIndex })

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
    touchStartX.current = null
  }

  const nextLabel = isLastImage ? closeLabel : 'Next image'

  const resetCursor = () => {
    setVariant('default')
  }

  return (
    <>
      {!isFirstImage && (
        <button
          onClick={goToPrevious}
          onMouseEnter={() => setVariant('left')}
          onMouseLeave={resetCursor}
          className="fixed left-0 top-0 h-full w-1/2 z-30 bg-transparent hidden md:block"
          aria-label="Previous image"
        />
      )}

      <button
        onClick={goToNext}
        onMouseEnter={() => setVariant('right')}
        onMouseLeave={resetCursor}
        className="fixed right-0 top-0 h-full w-1/2 z-30 bg-transparent hidden md:block"
        aria-label={nextLabel}
      />

      <div
        className="relative flex flex-col items-center animate-fade-up"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          id={ELEMENT_IDS.SELECTED_IMAGE}
          className="relative flex items-center justify-center"
          style={{
            width: GALLERY.CONTAINER_WIDTH,
            maxWidth: `${GALLERY.CONTAINER_MAX_WIDTH}px`,
            height: GALLERY.CONTAINER_HEIGHT,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              opacity: fadeIn ? 1 : 0,
              transition: `opacity ${TRANSITION_DURATION / 2}ms ease-out`,
            }}
          >
            <Image
              key={displayImage.id}
              src={displayImage.secure_url}
              alt={displayImage.alt}
              fill
              className="object-contain"
              sizes={GALLERY.SIZES}
              priority
              placeholder="blur"
              blurDataURL={generateBlurDataUrl(displayImage.secure_url)}
            />
          </div>

          <ImageCaption
            metadata={displayImage.metadata}
            caption={displayImage.caption}
            fadeIn={fadeIn}
            transitionDuration={TRANSITION_DURATION}
          />
        </div>
      </div>
    </>
  )
}
