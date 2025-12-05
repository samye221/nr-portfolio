import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { cloudinary, CLOUDINARY_FOLDERS } from '@/lib/cloudinary.server'
import { getTitle, getDescription, getDisplayOrder, getProjectOrder } from '@/lib/cloudinary.mapper'
import { extractImageId, normalizeImageId, normalizeSlug } from '@/lib/utils'
import type { CloudinaryResource, Project, ProjectSummary, ProjectWithImages, PortfolioImage } from '@/types/cloudinary'

export { extractImageId, normalizeImageId, normalizeSlug }

const CACHE_REVALIDATE = 60 * 60 * 24
export const CACHE_TAG = 'cloudinary-data'

function escapeForCloudinarySearch(value: string): string {
  return value.replace(/([[\](){}:^~*?\\!])/g, '\\$1')
}

function formatSlugAsTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const sortByDisplayOrder = (resources: CloudinaryResource[]): CloudinaryResource[] => {
  return [...resources].sort((a, b) => {
    const orderA = getDisplayOrder(a.metadata, a.context)
    const orderB = getDisplayOrder(b.metadata, b.context)
    if (orderA !== orderB) return orderA - orderB
    return a.public_id.localeCompare(b.public_id, undefined, { numeric: true, sensitivity: 'base' })
  })
}

const MAX_RESULTS_PER_PAGE = 100

async function fetchAllPages(
  expression: string,
  sortField: string
): Promise<CloudinaryResource[]> {
  const allResources: CloudinaryResource[] = []
  let nextCursor: string | undefined

  do {
    const search = cloudinary.search
      .expression(expression)
      .with_field('context')
      .with_field('metadata')
      .sort_by(sortField, 'asc')
      .max_results(MAX_RESULTS_PER_PAGE)

    if (nextCursor) {
      search.next_cursor(nextCursor)
    }

    const result = await search.execute()
    allResources.push(...(result.resources as CloudinaryResource[]))
    nextCursor = result.next_cursor
  } while (nextCursor)

  return allResources
}

const fetchProjectImages = async (projectSlug: string): Promise<CloudinaryResource[]> => {
  const escapedSlug = escapeForCloudinarySearch(projectSlug)
  const expression = `folder:${CLOUDINARY_FOLDERS.projects}/${escapedSlug}`

  try {
    return await fetchAllPages(expression, 'metadata.display_order')
  } catch {
    const resources = await fetchAllPages(expression, 'public_id')
    return sortByDisplayOrder(resources)
  }
}

const findCoverImage = (images: CloudinaryResource[]): CloudinaryResource | null => {
  const coverByProjectOrder = images.find(
    (img) => img.metadata?.project_order !== undefined && img.metadata.project_order < 999
  )
  if (coverByProjectOrder) return coverByProjectOrder

  return images[0] ?? null
}

const fetchAllProjectFolders = async (): Promise<{ name: string }[]> => {
  const result = await cloudinary.api.sub_folders(CLOUDINARY_FOLDERS.projects)
  return result.folders
}

const getProjectImages = unstable_cache(
  fetchProjectImages,
  ['project-images'],
  { revalidate: CACHE_REVALIDATE, tags: [CACHE_TAG] }
)

const getCachedProjectFolders = unstable_cache(
  fetchAllProjectFolders,
  ['project-folders'],
  { revalidate: CACHE_REVALIDATE, tags: [CACHE_TAG] }
)

export async function resolveSlug(urlSlug: string): Promise<string | null> {
  const folders = await getCachedProjectFolders()
  const normalized = urlSlug.toLowerCase().normalize('NFC')
  const folder = folders.find((f) => f.name.toLowerCase().normalize('NFC') === normalized)
  return folder?.name ?? null
}

async function fetchProject(projectSlug: string): Promise<Project | null> {
  const resolvedSlug = await resolveSlug(projectSlug)
  if (!resolvedSlug) {
    return null
  }

  try {
    const images = await getProjectImages(resolvedSlug)

    if (images.length === 0) {
      return null
    }

    const cover = findCoverImage(images)

    return {
      slug: resolvedSlug,
      title: getTitle(cover?.context, formatSlugAsTitle(resolvedSlug)),
      cover,
      images,
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export const getProject = cache(fetchProject)

async function fetchAllProjects(): Promise<ProjectSummary[]> {
  try {
    const folders = await getCachedProjectFolders()

    const projects = await Promise.all(
      folders.map(async (folder) => {
        const images = await getProjectImages(folder.name)
        const cover = findCoverImage(images)
        const firstImage = images[0]
        return {
          slug: folder.name,
          title: getTitle(cover?.context, formatSlugAsTitle(folder.name)),
          coverUrl: firstImage?.secure_url,
          firstImageId: firstImage ? extractImageId(firstImage.public_id) : undefined,
          order: getProjectOrder(cover?.metadata, cover?.context),
        }
      })
    )

    return projects.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export const getAllProjects = cache(fetchAllProjects)

/**
 * Fetches all projects with their complete image lists.
 * Used for mobile carousel display where each project shows all its images.
 */
async function fetchAllProjectsWithImages(): Promise<ProjectWithImages[]> {
  try {
    const folders = await getCachedProjectFolders()

    const projects = await Promise.all(
      folders.map(async (folder) => {
        const images = await getProjectImages(folder.name)
        const cover = findCoverImage(images)
        return {
          slug: folder.name,
          title: getTitle(cover?.context, formatSlugAsTitle(folder.name)),
          order: getProjectOrder(cover?.metadata, cover?.context),
          images: images.map((img) => ({
            id: extractImageId(img.public_id),
            url: img.secure_url,
            width: img.width,
            height: img.height,
          })),
        }
      })
    )

    return projects.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Error fetching projects with images:', error)
    return []
  }
}

export const getAllProjectsWithImages = cache(fetchAllProjectsWithImages)

export async function getProjectSlugs(): Promise<string[]> {
  try {
    const folders = await getCachedProjectFolders()
    return folders.map((folder) => folder.name)
  } catch (error) {
    console.error('Error fetching project slugs:', error)
    return []
  }
}

async function fetchAllPortfolioImages(): Promise<PortfolioImage[]> {
  try {
    const folders = await getCachedProjectFolders()

    const projectsData = await Promise.all(
      folders.map(async (folder) => {
        const images = await getProjectImages(folder.name)
        const cover = findCoverImage(images)
        return {
          folder: folder.name,
          images,
          cover,
          projectOrder: getProjectOrder(cover?.metadata, cover?.context),
        }
      })
    )

    const sortedProjects = projectsData.sort((a, b) => a.projectOrder - b.projectOrder)

    const allImages = sortedProjects.flatMap(({ folder, images, cover }) => {
      const projectTitle = getTitle(cover?.context, formatSlugAsTitle(folder))
      return images.map((image) => ({
        id: extractImageId(image.public_id),
        public_id: image.public_id,
        secure_url: image.secure_url,
        projectSlug: folder,
        projectTitle,
        width: image.width,
        height: image.height,
        description: getDescription(image.context),
      }))
    })

    return allImages
  } catch (error) {
    console.error('Error fetching portfolio images:', error)
    return []
  }
}

export const getAllPortfolioImages = cache(fetchAllPortfolioImages)
