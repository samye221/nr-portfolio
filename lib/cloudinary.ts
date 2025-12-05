const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/db2ycwgpg/image/upload'

export function getCloudinaryUrl(publicId: string, transforms?: string): string {
  const transformPart = transforms ? `${transforms}/` : ''
  return `${CLOUDINARY_BASE_URL}/${transformPart}${publicId}`
}

export function optimizeGalleryUrl(url: string): string {
  return url.replace('/upload/', '/upload/f_auto,q_auto,w_1600,c_limit/')
}

export function optimizeThumbnailUrl(url: string, width: number = 500): string {
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_fill,g_auto/`)
}

export function generateBlurDataUrl(url: string): string {
  return url.replace('/upload/', '/upload/w_10,q_10,e_blur:1000/')
}

export function generateOGImageUrl(url: string): string {
  return url.replace('/upload/', '/upload/w_1200,h_630,c_fill,f_jpg,q_auto/')
}
