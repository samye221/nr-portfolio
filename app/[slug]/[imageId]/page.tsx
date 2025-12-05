import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProject, getAllProjects, extractImageId } from '@/lib/services/project.service'
import { Header } from '@/components/layout/Header'
import { Initials } from '@/components/layout/Initials'
import { ProjectGrid } from '@/components/project'

interface ImagePageProps {
  params: Promise<{ slug: string; imageId: string }>
}

export default async function ImagePage({ params }: ImagePageProps) {
  const { slug, imageId } = await params
  const [project, allProjects] = await Promise.all([
    getProject(slug),
    getAllProjects(),
  ])

  if (!project) {
    notFound()
  }

  const selectedImage = project.images.find(
    (img) => extractImageId(img.public_id) === imageId
  )

  if (!selectedImage) {
    notFound()
  }

  const description = selectedImage.context?.custom?.caption

  return (
    <>
      <Header breadcrumb={`Home / ${project.title}`} />
      <Initials initialVariant="background" />

      <main className="relative z-10 min-h-screen">
        <section className="flex min-h-screen flex-col items-center justify-center px-page pt-16">
          <div className="relative z-20 w-full max-w-[433px] aspect-card">
            <Image
              src={selectedImage.secure_url}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="433px"
            />
          </div>

          {description && (
            <p className="relative z-20 mt-8 max-w-prose px-page text-left">
              {description}
            </p>
          )}
        </section>

        <section className="relative z-20 px-page pb-24 pt-48">
          <ProjectGrid projects={allProjects} />
        </section>
      </main>
    </>
  )
}
