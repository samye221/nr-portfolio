'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { generateBlurDataUrl } from '@/lib/cloudinary'
import { CarouselDots } from './CarouselDots'

interface CarouselImage {
  id: string
  url: string
  width: number
  height: number
}

interface ProjectCarouselProps {
  slug: string
  title: string
  images: CarouselImage[]
}

/**
 * Horizontal image carousel for mobile project display.
 * Uses CSS scroll-snap for smooth, native scrolling behavior.
 * Tapping an image navigates to the full gallery view.
 */
export function ProjectCarousel({ slug, title, images }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const scrollLeft = container.scrollLeft
    const itemWidth = container.offsetWidth
    const newIndex = Math.round(scrollLeft / itemWidth)

    setCurrentIndex(Math.min(newIndex, images.length - 1))
  }, [images.length])

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const itemWidth = container.offsetWidth
    container.scrollTo({ left: index * itemWidth, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  if (images.length === 0) return null

  const firstImage = images[0]
  const href = `/${slug}/${firstImage.id}`

  return (
    <article className="mb-12">
      {/* Horizontal scrolling container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((image, index) => (
          <Link
            key={image.id}
            href={`/${slug}/${image.id}`}
            className="relative shrink-0 w-full snap-start px-4"
          >
            <div className="relative aspect-card overflow-hidden">
              <Image
                src={image.url}
                alt={`${title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
                placeholder="blur"
                blurDataURL={generateBlurDataUrl(image.url)}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Dots indicator */}
      <CarouselDots
        total={images.length}
        current={currentIndex}
        onDotClick={scrollToIndex}
      />

      {/* Project title */}
      <Link
        href={href}
        className="block text-label transition-opacity hover:opacity-60"
      >
        {title}
      </Link>
    </article>
  )
}
