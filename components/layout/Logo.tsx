import Image from 'next/image'
import { getCloudinaryUrl } from '@/lib/cloudinary'
import { SITE } from '@/lib/constants'

interface LogoProps {
  variant: 'foreground' | 'background'
  className?: string
}

export function Logo({ variant, className = '' }: LogoProps) {
  const baseClasses = variant === 'foreground'
    ? 'fixed inset-0 z-10 pointer-events-none'
    : 'fixed inset-0 z-0 opacity-10 pointer-events-none'

  const logoUrl = getCloudinaryUrl(SITE.logo.publicId, 'f_auto,q_auto')

  return (
    <div className={`${baseClasses} ${className}`}>
      <Image
        src={logoUrl}
        alt={SITE.logo.alt}
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}
