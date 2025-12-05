import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'
import { getAllProjects, getAllPortfolioImages, getProject } from '@/lib/services/project.service'
import { extractImageId } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, portfolioImages] = await Promise.all([
    getAllProjects(),
    getAllPortfolioImages(),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const projectImagePages = await Promise.all(
    projects.map(async (project) => {
      const fullProject = await getProject(project.slug)
      if (!fullProject) return []
      return fullProject.images.map((image) => ({
        url: `${SITE.url}/${project.slug}/${extractImageId(image.public_id)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    })
  )

  const portfolioImagePages: MetadataRoute.Sitemap = portfolioImages.map((image) => ({
    url: `${SITE.url}/portfolio/${image.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...projectImagePages.flat(),
    ...portfolioImagePages,
  ]
}
