'use client'

import Image from 'next/image'
import { getCloudinaryUrl } from '@/lib/cloudinary'
import { SITE } from '@/lib/constants'

interface InitialsProps {
  variant: 'foreground' | 'background'
}

export function Initials({ variant }: InitialsProps) {
  const logoUrl = getCloudinaryUrl(SITE.logo.publicId, 'f_svg')
  const zIndex = variant === 'foreground' ? 'z-30' : 'z-[15]'

  return (
    <div
      className={`pointer-events-none fixed inset-0 hidden md:flex items-center justify-center ${zIndex} animate-fade-up`}
    >
      <div className="relative h-initials-sm w-initials-sm">
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
