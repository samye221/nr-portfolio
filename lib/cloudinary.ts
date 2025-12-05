const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/db2ycwgpg/image/upload'

export function getCloudinaryUrl(publicId: string, transforms?: string): string {
  const transformPart = transforms ? `${transforms}/` : ''
  return `${CLOUDINARY_BASE_URL}/${transformPart}${publicId}`
}

export function optimizeGalleryUrl(url: string): string {
  return url.replace('/upload/', '/upload/f_auto,q_auto,w_866,c_fill/')
}

export function generateBlurDataUrl(url: string): string {
  return url.replace('/upload/', '/upload/w_10,q_10,e_blur:1000/')
}
