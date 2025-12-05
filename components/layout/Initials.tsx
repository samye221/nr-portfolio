'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getCloudinaryUrl } from '@/lib/cloudinary'
import { SITE } from '@/lib/constants'

interface InitialsProps {
  initialVariant: 'foreground' | 'background'
}

export function Initials({ initialVariant }: InitialsProps) {
  const [isAtGrid, setIsAtGrid] = useState(false)

  useEffect(() => {
    if (initialVariant === 'foreground') return

    const handleScroll = () => {
      const selectedImage = document.getElementById('selected-image')

      if (selectedImage) {
        const imageRect = selectedImage.getBoundingClientRect()
        const viewportCenter = window.innerHeight / 2
        setIsAtGrid(imageRect.bottom < viewportCenter)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [initialVariant])

  const getZIndex = () => {
    if (initialVariant === 'foreground') return 'z-30'
    return isAtGrid ? 'z-30' : 'z-0'
  }

  const logoUrl = getCloudinaryUrl(SITE.logo.publicId, 'f_svg')

  return (
    <div
      className={`pointer-events-none fixed inset-0 flex items-center justify-center transition-none ${getZIndex()}`}
    >
      <div className="relative h-[400px] w-[600px]">
        <Image
          src={logoUrl}
          alt={SITE.logo.alt}
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>
    </div>
  )
}
