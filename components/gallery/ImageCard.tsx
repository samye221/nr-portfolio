'use client'

import Link from 'next/link'
import Image from 'next/image'
import { generateBlurDataUrl } from '@/lib/cloudinary'
import { useCursor } from '@/components/cursor/CursorContext'

type AspectRatio = 'card' | 'portfolio'

const ASPECT_CLASSES: Record<AspectRatio, string> = {
  card: 'aspect-card',
  portfolio: 'aspect-portfolio',
}

const DEFAULT_SIZES: Record<AspectRatio, string> = {
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  portfolio: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw',
}

interface ImageCardProps {
  href: string
  src: string
  alt: string
  title?: string
  aspectRatio?: AspectRatio
  sizes?: string
}

export function ImageCard({
  href,
  src,
  alt,
  title,
  aspectRatio = 'card',
  sizes,
}: ImageCardProps) {
  const { setTheme } = useCursor()

  return (
    <Link
      href={href}
      className="group block"
      onMouseEnter={() => setTheme('light')}
      onMouseLeave={() => setTheme('dark')}
    >
      <div className={`relative ${ASPECT_CLASSES[aspectRatio]} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes={sizes ?? DEFAULT_SIZES[aspectRatio]}
          placeholder="blur"
          blurDataURL={generateBlurDataUrl(src)}
        />
      </div>
      {title && (
        <p className="mt-label-gap text-label transition-opacity group-hover:opacity-60">
          {title}
        </p>
      )}
    </Link>
  )
}
