'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Initials } from '@/components/layout/Initials'
import { useFavorites } from '@/components/favorites/FavoritesContext'
import { useCursor } from '@/components/cursor/CursorContext'
import { optimizeGalleryUrl, generateBlurDataUrl } from '@/lib/cloudinary'

export function LightboxContent() {
  const { favorites, toggleFavorite, clearFavorites, count } = useFavorites()
  const { setVisible } = useCursor()

  if (count === 0) {
    return (
      <>
        <Initials initialVariant="foreground" />
        <Header view="projects" />
        <main className="flex min-h-screen flex-col items-center justify-center px-page">
          <div className="text-center">
            <p className="mb-4 text-lg">Your lightbox is empty</p>
            <p className="text-sm opacity-60">
              Browse the portfolio and click the heart icon to save images
            </p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Initials initialVariant="foreground" />
      <Header view="projects" />
      <main className="min-h-screen px-page pb-24 pt-24">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-lg">
            Lightbox <span className="opacity-60">({count})</span>
          </h1>
          <button
            onClick={clearFavorites}
            className="cursor-auto text-sm opacity-60 transition-opacity hover:opacity-100"
            onMouseEnter={() => setVisible(false)}
            onMouseLeave={() => setVisible(true)}
          >
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {favorites.map(image => (
            <div key={image.id} className="group relative aspect-[3/4]">
              <Link href={`/${image.projectSlug}/${image.id}`}>
                <Image
                  src={optimizeGalleryUrl(image.secure_url)}
                  alt={image.projectTitle}
                  fill
                  className="object-cover transition-opacity group-hover:opacity-90"
                  placeholder="blur"
                  blurDataURL={generateBlurDataUrl(image.secure_url)}
                  unoptimized
                />
              </Link>
              <button
                onClick={() => toggleFavorite(image)}
                className="cursor-auto absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove from favorites"
                onMouseEnter={() => setVisible(false)}
                onMouseLeave={() => setVisible(true)}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M1 1L9 9M9 1L1 9" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-xs text-white">{image.projectTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
