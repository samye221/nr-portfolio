import { getAllProjects } from '@/lib/services/project.service'
import { Header } from '@/components/layout/Header'
import { Initials } from '@/components/layout/Initials'
import { ProjectGrid } from '@/components/project'

export default async function Home() {
  const projects = await getAllProjects()

  if (projects.length === 0) {
    return (
      <>
        <Header />
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
      <Header />
      <Initials initialVariant="foreground" />
      <main className="relative z-20 min-h-screen px-page pt-24">
        <ProjectGrid projects={projects} />
      </main>
    </>
  )
}
