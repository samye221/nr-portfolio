'use client'

import type { ProjectWithImages } from '@/types/cloudinary'
import { ImageCard } from '@/components/gallery/ImageCard'

interface ProjectCardProps {
  project: ProjectWithImages
  priority?: boolean
}

/**
 * Desktop project card showing the cover image.
 * Links to the gallery view of the first image.
 */
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const firstImage = project.images[0]
  if (!firstImage) return null

  const href = `/${project.slug}/${firstImage.id}`

  return (
    <ImageCard
      href={href}
      src={firstImage.url}
      alt={project.title}
      title={project.title}
      aspectRatio="card"
      priority={priority}
    />
  )
}
