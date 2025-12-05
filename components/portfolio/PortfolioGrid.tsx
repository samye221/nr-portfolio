import type { PortfolioImage } from '@/types/cloudinary'
import { PortfolioCard } from './PortfolioCard'

interface PortfolioGridProps {
  images: PortfolioImage[]
}

export function PortfolioGrid({ images }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-2 gap-grid-gap-sm sm:grid-cols-3 lg:grid-cols-6">
      {images.map((image) => (
        <PortfolioCard key={image.id} image={image} />
      ))}
    </div>
  )
}
