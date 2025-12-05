import type { ProjectWithImages } from '@/types/cloudinary'
import { ProjectCard } from './ProjectCard'
import { ProjectCarousel } from '@/components/carousel/ProjectCarousel'

interface ProjectGridProps {
  projects: ProjectWithImages[]
}

const ABOVE_FOLD_COUNT = 4

/**
 * Responsive project display component.
 *
 * Mobile: Vertical feed with horizontal carousels per project (Instagram-like).
 * Desktop: 4-column grid showing project covers.
 *
 * Uses CSS-only approach (no JS device detection) for SSR compatibility.
 * Both layouts are rendered, CSS handles visibility.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <>
      {/* Mobile: Carousel feed (hidden on sm+) */}
      <div className="block sm:hidden animate-fade-up">
        {projects.map((project) => (
          <ProjectCarousel
            key={project.slug}
            slug={project.slug}
            title={project.title}
            images={project.images}
          />
        ))}
      </div>

      {/* Desktop: Grid layout (hidden on mobile) */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-x-project-gap-x gap-y-project-gap-y animate-fade-up animate-delay-200">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={index < ABOVE_FOLD_COUNT}
          />
        ))}
      </div>
    </>
  )
}
