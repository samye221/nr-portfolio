import { redirect, notFound } from 'next/navigation'
import { getProject, extractImageId, normalizeSlug } from '@/lib/services/project.service'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug: rawSlug } = await params
  const slug = normalizeSlug(rawSlug)
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const firstImage = project.images[0]

  if (!firstImage) {
    notFound()
  }

  const firstImageId = extractImageId(firstImage.public_id)
  redirect(`/${slug}/${firstImageId}`)
}
