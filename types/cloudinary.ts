export interface CloudinaryResource {
  public_id: string
  secure_url: string
  url: string
  format: string
  width: number
  height: number
  resource_type: string
  created_at: string
  bytes: number
  context?: CloudinaryContext
  metadata?: Record<string, unknown>
}

export interface CloudinaryContext {
  custom?: {
    caption?: string
    alt?: string
    order?: string
  }
}

export interface CloudinaryFolder {
  name: string
  path: string
}

export interface CloudinarySearchResult {
  resources: CloudinaryResource[]
  total_count: number
  next_cursor?: string
}

export interface CloudinaryFoldersResult {
  folders: CloudinaryFolder[]
  total_count: number
}

export interface Project {
  slug: string
  title: string
  cover: CloudinaryResource | null
  coverUrl?: string
  images: CloudinaryResource[]
}

export interface ProjectSummary {
  slug: string
  title: string
  coverUrl?: string
  firstImageId?: string
}

export interface ImageTransformOptions {
  width?: number
  height?: number
  crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'limit'
  gravity?: 'auto' | 'center' | 'face' | 'faces'
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | number
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
}
