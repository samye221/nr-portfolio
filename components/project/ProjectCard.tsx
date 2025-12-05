import Link from 'next/link'
import Image from 'next/image'
import type { ProjectSummary } from '@/types'

interface ProjectCardProps {
  project: ProjectSummary
}

export function ProjectCard({ project }: ProjectCardProps) {
  const href = project.firstImageId
    ? `/${project.slug}/${project.firstImageId}`
    : `/${project.slug}`

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-card overflow-hidden">
        {project.coverUrl && (
          <Image
            src={project.coverUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
      </div>
      <p className="mt-label-gap transition-opacity group-hover:opacity-60">
        {project.title}
      </p>
    </Link>
  )
}
