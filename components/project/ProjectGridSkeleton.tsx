import { Skeleton } from '@/components/ui/Skeleton'

interface ProjectGridSkeletonProps {
  count?: number
}

/**
 * Skeleton loader for ProjectGrid.
 * Matches responsive layout: carousel feed on mobile, grid on desktop.
 */
export function ProjectGridSkeleton({ count = 4 }: ProjectGridSkeletonProps) {
  return (
    <>
      {/* Mobile: Carousel skeleton (hidden on sm+) */}
      <div className="block sm:hidden space-y-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-card w-full" />
            <div className="flex justify-center gap-1.5 py-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-1.5 w-1.5 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-[11px] w-24" />
          </div>
        ))}
      </div>

      {/* Desktop: Grid skeleton (hidden on mobile) */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-x-project-gap-x gap-y-project-gap-y">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-card w-full" />
            <Skeleton className="mt-label-gap h-[11px] w-24" />
          </div>
        ))}
      </div>
    </>
  )
}
