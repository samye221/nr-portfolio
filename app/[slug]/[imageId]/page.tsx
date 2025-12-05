import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject, getAllProjectsWithImages, extractImageId, normalizeImageId, normalizeSlug } from '@/lib/services/project.service'
import { generateOGImageUrl } from '@/lib/cloudinary'
import { getDescription } from '@/lib/cloudinary.mapper'
import { ELEMENT_IDS } from '@/lib/gallery.constants'
import { SITE } from '@/lib/constants'
import { Initials } from '@/components/layout/Initials'
import { ProjectGrid } from '@/components/project/ProjectGrid'
import { ProjectGridSkeleton } from '@/components/project/ProjectGridSkeleton'
import { GalleryView } from '@/components/gallery/GalleryView'
import { GallerySkeleton } from '@/components/gallery/GallerySkeleton'
import type { GalleryImage } from '@/components/gallery/Gallery'

interface ImagePageProps {
  params: Promise<{ slug: string; imageId: string }>
}

export async function generateMetadata({ params }: ImagePageProps): Promise<Metadata> {
  const { slug: rawSlug, imageId: rawImageId } = await params
  const slug = normalizeSlug(rawSlug)
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

  const ogImageUrl = generateOGImageUrl(selectedImage.secure_url)

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

async function GalleryViewLoader({ slug, imageId }: { slug: string; imageId: string }) {
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const selectedImage = project.images.find(
    (img) => extractImageId(img.public_id) === imageId
  )

  if (!selectedImage) {
    notFound()
  }

  const galleryImages: GalleryImage[] = project.images.map(img => ({
    id: extractImageId(img.public_id),
    secure_url: img.secure_url,
    alt: project.title,
    caption: getDescription(img.context),
    projectSlug: slug,
    projectTitle: project.title,
  }))

  return (
    <GalleryView
      key={imageId}
      images={galleryImages}
      initialImageId={imageId}
      gridElementId={ELEMENT_IDS.PROJECT_GRID}
      closeRedirectUrl="/"
      headerView="projects"
      closeLabel="View projects"
      urlPattern={`/${slug}/{id}`}
    />
  )
}

async function ProjectGridLoader() {
  const projects = await getAllProjectsWithImages()
  return <ProjectGrid projects={projects} />
}

export default async function ImagePage({ params }: ImagePageProps) {
  const { slug: rawSlug, imageId: rawImageId } = await params
  const slug = normalizeSlug(rawSlug)
  const imageId = normalizeImageId(rawImageId)

  return (
    <>
      <Suspense fallback={<GallerySkeleton />}>
        <GalleryViewLoader slug={slug} imageId={imageId} />
      </Suspense>

      <Initials variant="background" />

      <main className="relative z-10 min-h-screen">
        <section id={ELEMENT_IDS.PROJECT_GRID} className="px-4 sm:px-8 lg:px-16 pb-24 pt-16 sm:pt-header-offset">
          <Suspense fallback={<ProjectGridSkeleton />}>
            <ProjectGridLoader />
          </Suspense>
        </section>
      </main>
    </>
  )
}
