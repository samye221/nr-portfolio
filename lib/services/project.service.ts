import { unstable_cache } from 'next/cache'
import { cloudinary, CLOUDINARY_FOLDERS } from '@/lib/cloudinary'
import type { CloudinaryResource, Project, ProjectSummary } from '@/types'

const CACHE_REVALIDATE = 60 * 60 * 24 * 7 // 7 days
export const CACHE_TAG = 'cloudinary-data'

function formatTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function extractImageId(publicId: string): string {
  const parts = publicId.split('/')
  return parts[parts.length - 1]
}

const fetchProjectImages = async (projectSlug: string): Promise<CloudinaryResource[]> => {
  const result = await cloudinary.search
    .expression(`folder:${CLOUDINARY_FOLDERS.projects}/${projectSlug} AND -filename:cover`)
    .sort_by('public_id', 'asc')
    .with_field('context')
    .with_field('metadata')
    .max_results(100)
    .execute()

  return result.resources as CloudinaryResource[]
}

const fetchProjectCover = async (projectSlug: string): Promise<CloudinaryResource | null> => {
  const result = await cloudinary.search
    .expression(`folder:${CLOUDINARY_FOLDERS.projects}/${projectSlug} AND filename:cover`)
    .with_field('context')
    .max_results(1)
    .execute()

  return (result.resources[0] as CloudinaryResource) ?? null
}

const fetchProjectFirstImage = async (projectSlug: string): Promise<CloudinaryResource | null> => {
  const result = await cloudinary.search
    .expression(`folder:${CLOUDINARY_FOLDERS.projects}/${projectSlug} AND -filename:cover`)
    .sort_by('public_id', 'asc')
    .max_results(1)
    .execute()

  return (result.resources[0] as CloudinaryResource) ?? null
}

const fetchAllProjectFolders = async (): Promise<{ name: string }[]> => {
  const result = await cloudinary.api.sub_folders(CLOUDINARY_FOLDERS.projects)
  return result.folders
}

export const getProjectImages = unstable_cache(
  fetchProjectImages,
  ['project-images'],
  { revalidate: CACHE_REVALIDATE, tags: [CACHE_TAG] }
)

export const getProjectCover = unstable_cache(
  fetchProjectCover,
  ['project-cover'],
  { revalidate: CACHE_REVALIDATE, tags: [CACHE_TAG] }
)

export const getProjectFirstImage = unstable_cache(
  fetchProjectFirstImage,
  ['project-first-image'],
  { revalidate: CACHE_REVALIDATE, tags: [CACHE_TAG] }
)

const getCachedProjectFolders = unstable_cache(
  fetchAllProjectFolders,
  ['project-folders'],
  { revalidate: CACHE_REVALIDATE, tags: [CACHE_TAG] }
)

export async function getProject(projectSlug: string): Promise<Project | null> {
  try {
    const [images, cover] = await Promise.all([
      getProjectImages(projectSlug),
      getProjectCover(projectSlug),
    ])

    if (images.length === 0 && !cover) {
      return null
    }

    const title = cover?.context?.custom?.alt || formatTitle(projectSlug)

    return {
      slug: projectSlug,
      title,
      cover,
      images,
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getAllProjects(): Promise<ProjectSummary[]> {
  try {
    const folders = await getCachedProjectFolders()

    const projects = await Promise.all(
      folders.map(async (folder) => {
        const [cover, firstImage] = await Promise.all([
          getProjectCover(folder.name),
          getProjectFirstImage(folder.name),
        ])
        return {
          slug: folder.name,
          title: cover?.context?.custom?.alt || formatTitle(folder.name),
          coverUrl: firstImage?.secure_url,
          firstImageId: firstImage ? extractImageId(firstImage.public_id) : undefined,
        }
      })
    )

    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  try {
    const folders = await getCachedProjectFolders()
    return folders.map((folder) => folder.name)
  } catch (error) {
    console.error('Error fetching project slugs:', error)
    return []
  }
}
