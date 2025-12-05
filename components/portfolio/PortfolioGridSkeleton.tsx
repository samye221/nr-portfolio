import { Skeleton } from '@/components/ui/Skeleton'

interface PortfolioGridSkeletonProps {
  count?: number
}

/**
 * Skeleton loader for PortfolioGrid.
 * Matches responsive layout: single column on mobile, 6 columns on desktop.
 */
export function PortfolioGridSkeleton({ count = 18 }: PortfolioGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-grid-gap lg:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="aspect-portfolio w-full" />
      ))}
    </div>
  )
}
