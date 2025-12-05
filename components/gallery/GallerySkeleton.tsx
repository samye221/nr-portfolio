import { Skeleton } from '@/components/ui/Skeleton'

export function GallerySkeleton() {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className="relative flex items-center justify-center"
        style={{ width: '90vw', maxWidth: '1600px', height: '85vh' }}
      >
        <Skeleton className="absolute inset-0" />
      </div>
    </div>
  )
}
