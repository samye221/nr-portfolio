export function extractImageId(publicId: string): string {
  const parts = publicId.split('/')
  return parts[parts.length - 1].normalize('NFC')
}

export function normalizeImageId(imageId: string): string {
  return decodeURIComponent(imageId).normalize('NFC')
}
