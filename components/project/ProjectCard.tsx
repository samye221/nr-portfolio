'use client'

import type { ProjectSummary } from '@/types/cloudinary'
import { ImageCard } from '@/components/gallery/ImageCard'

interface ProjectCardProps {
  project: ProjectSummary
}

export function ProjectCard({ project }: ProjectCardProps) {
  if (!project.coverUrl) return null

  const href = project.firstImageId
    ? `/${project.slug}/${project.firstImageId}`
    : `/${project.slug}`

  return (
    <ImageCard
      href={href}
      src={project.coverUrl}
      alt={project.title}
      title={project.title}
      aspectRatio="card"
    />
  )
}
