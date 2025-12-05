import type { CloudinaryContext, CloudinaryMetadata } from '@/types/cloudinary'

export function getTitle(context?: CloudinaryContext, fallback?: string): string {
  return context?.caption || context?.custom?.caption || fallback || ''
}

export function getDescription(context?: CloudinaryContext): string | undefined {
  return context?.alt || context?.custom?.alt
}

export function getDisplayOrder(metadata?: CloudinaryMetadata, context?: CloudinaryContext): number {
  if (metadata?.display_order !== undefined) {
    return metadata.display_order
  }
  return parseInt(context?.custom?.order || '999', 10)
}

export function getProjectOrder(metadata?: CloudinaryMetadata, context?: CloudinaryContext): number {
  if (metadata?.project_order !== undefined) {
    return metadata.project_order
  }
  return parseInt(context?.custom?.order || '999', 10)
}

/** @deprecated Use getDisplayOrder instead */
export function getOrder(context?: CloudinaryContext): number {
  return parseInt(context?.custom?.order || '999', 10)
}
