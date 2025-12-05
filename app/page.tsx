import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllProjectsWithImages } from '@/lib/services/project.service'
import { Header } from '@/components/layout/Header'
import { Initials } from '@/components/layout/Initials'
import { ProjectGrid } from '@/components/project/ProjectGrid'
import { ProjectGridSkeleton } from '@/components/project/ProjectGridSkeleton'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore photography projects by Nathan Robin. Fashion, luxury, and editorial photography.',
  alternates: {
    canonical: '/',
  },
}

async function ProjectGridLoader() {
  const projects = await getAllProjectsWithImages()

  if (projects.length === 0) {
    return (
      <p className="opacity-60">
        No projects found. Add images to /projects/ folder in Cloudinary.
      </p>
    )
  }

  return <ProjectGrid projects={projects} />
}

export default function Home() {
  return (
    <>
      <Header view="projects" />
      <Initials variant="foreground" />
      <main className="relative z-20 min-h-screen px-4 sm:px-8 lg:px-16 pt-16 sm:pt-header-offset pb-24">
        <h1 className="sr-only">Photography Projects by Nathan Robin</h1>
        <Suspense fallback={<ProjectGridSkeleton />}>
          <ProjectGridLoader />
        </Suspense>
      </main>
    </>
  )
}
