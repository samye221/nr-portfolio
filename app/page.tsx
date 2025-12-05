import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/services/project.service'
import { Header } from '@/components/layout/Header'
import { Initials } from '@/components/layout/Initials'
import { ProjectGrid } from '@/components/project/ProjectGrid'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore photography projects by Nathan Robin. Fashion, luxury, and editorial photography.',
  alternates: {
    canonical: '/',
  },
}

export default async function Home() {
  const projects = await getAllProjects()

  if (projects.length === 0) {
    return (
      <>
        <Header view="projects" />
        <Initials initialVariant="foreground" />
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-page pt-24">
          <p className="opacity-60">
            No projects found. Add images to /projects/ folder in Cloudinary.
          </p>
        </main>
      </>
    )
  }

  return (
    <>
      <Header view="projects" />
      <Initials initialVariant="foreground" />
      <main className="relative z-20 min-h-screen px-page pt-24">
        <h1 className="sr-only">Photography Projects by Nathan Robin</h1>
        <ProjectGrid projects={projects} />
      </main>
    </>
  )
}
