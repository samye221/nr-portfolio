import type { CSSProperties } from 'react'

interface SkeletonProps {
  className?: string
  style?: CSSProperties
}

/**
 * Skeleton loading placeholder with pulse animation.
 * Used as fallback during data loading.
 */
export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-neutral-200 ${className ?? ''}`}
      style={style}
    />
  )
}
