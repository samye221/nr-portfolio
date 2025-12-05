import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject, getAllProjects, extractImageId, normalizeImageId } from '@/lib/services/project.service'
import { ELEMENT_IDS } from '@/lib/gallery.constants'
import { SITE } from '@/lib/constants'
import { Initials } from '@/components/layout/Initials'
import { ProjectGrid } from '@/components/project/ProjectGrid'
import { GalleryView } from '@/components/project/GalleryView'

interface ImagePageProps {
  params: Promise<{ slug: string; imageId: string }>
}

export async function generateMetadata({ params }: ImagePageProps): Promise<Metadata> {
  const { slug: rawSlug, imageId: rawImageId } = await params
  const slug = decodeURIComponent(rawSlug).normalize('NFC')
  const imageId = normalizeImageId(rawImageId)
  const project = await getProject(slug)

  if (!project) {
    return { title: 'Not Found' }
  }

  const selectedImage = project.images.find(
    (img) => extractImageId(img.public_id) === imageId
  )

  if (!selectedImage) {
    return { title: 'Not Found' }
  }

  const ogImageUrl = selectedImage.secure_url.replace(
    '/upload/',
    '/upload/w_1200,h_630,c_fill,f_jpg,q_auto/'
  )

  return {
    title: project.title,
    description: `${project.title} - Photography by ${SITE.name}`,
    openGraph: {
      title: `${project.title} | ${SITE.name}`,
      description: `${project.title} - Fashion and luxury photography by ${SITE.name}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | ${SITE.name}`,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `/${slug}/${imageId}`,
    },
  }
}

export default async function ImagePage({ params }: ImagePageProps) {
  const { slug: rawSlug, imageId: rawImageId } = await params
  const slug = decodeURIComponent(rawSlug).normalize('NFC')
  const imageId = normalizeImageId(rawImageId)
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

  return (
    <>
      <Initials initialVariant="background" />

      <main className="relative z-10 min-h-screen">
        <GalleryView
          images={project.images}
          initialImageId={imageId}
          projectSlug={slug}
          projectTitle={project.title}
        />

        <section id={ELEMENT_IDS.PROJECT_GRID} className="relative z-20 px-page pb-24 pt-24">
          <ProjectGrid projects={allProjects} />
        </section>
      </main>
    </>
  )
}
