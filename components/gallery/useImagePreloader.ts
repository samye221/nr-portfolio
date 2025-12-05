import { useEffect } from 'react'
import { optimizeGalleryUrl } from '@/lib/cloudinary'
import { GALLERY } from '@/lib/gallery.constants'

interface UseImagePreloaderOptions {
  images: { secure_url: string }[]
  currentIndex: number
}

export function useImagePreloader({ images, currentIndex }: UseImagePreloaderOptions) {
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
}
