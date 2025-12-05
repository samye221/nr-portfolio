'use client'

import type { PortfolioImage } from '@/types/cloudinary'
import { ImageCard } from '@/components/gallery/ImageCard'

interface PortfolioCardProps {
  image: PortfolioImage
  priority?: boolean
}

export function PortfolioCard({ image, priority = false }: PortfolioCardProps) {
  return (
    <ImageCard
      href={`/portfolio/${image.id}`}
      src={image.secure_url}
      alt={image.projectTitle}
      aspectRatio="portfolio"
      priority={priority}
    />
  )
}
