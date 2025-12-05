export const CLOUDINARY_CONFIG = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  apiKey: process.env.CLOUDINARY_API_KEY!,
  apiSecret: process.env.CLOUDINARY_API_SECRET!,
} as const

export const CLOUDINARY_FOLDERS = {
  projects: 'projects',
} as const

export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload`

export function getCloudinaryUrl(publicId: string, transforms?: string): string {
  const transformPart = transforms ? `${transforms}/` : ''
  return `${CLOUDINARY_BASE_URL}/${transformPart}${publicId}`
}
