import type { PortfolioImage } from '@/types/cloudinary'
import { PortfolioCard } from './PortfolioCard'

interface PortfolioGridProps {
  images: PortfolioImage[]
}

const ABOVE_FOLD_COUNT = 6

/**
 * Responsive portfolio image grid.
 *
 * Mobile: Single column vertical feed (Instagram-like).
 * Desktop: 6-column grid for efficient browsing.
 */
export function PortfolioGrid({ images }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-grid-gap lg:grid-cols-6 animate-fade-up animate-delay-200">
      {images.map((image, index) => (
        <PortfolioCard
          key={image.id}
          image={image}
          priority={index < ABOVE_FOLD_COUNT}
        />
      ))}
    </div>
  )
}
