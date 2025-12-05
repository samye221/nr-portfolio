import type { ProjectSummary } from '@/types/cloudinary'
import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
  projects: ProjectSummary[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-grid-gap sm:grid-cols-2 lg:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
