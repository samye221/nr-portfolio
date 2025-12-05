'use client'

interface CarouselDotsProps {
  total: number
  current: number
  onDotClick?: (index: number) => void
}

/**
 * Carousel position indicators (dots).
 * Shows current position in a horizontal image carousel.
 * Clicking a dot scrolls to that image.
 */
export function CarouselDots({ total, current, onDotClick }: CarouselDotsProps) {
  if (total <= 1) return null

  return (
    <div
      className="flex justify-center gap-1.5 py-3"
      role="tablist"
      aria-label="Carousel navigation"
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === current}
          aria-label={`Go to image ${index + 1}`}
          onClick={() => onDotClick?.(index)}
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            index === current ? 'bg-foreground' : 'bg-foreground/30'
          }`}
        />
      ))}
    </div>
  )
}
