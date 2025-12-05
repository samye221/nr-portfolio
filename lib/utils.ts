export function extractImageId(publicId: string): string {
  const parts = publicId.split('/')
  return parts[parts.length - 1].normalize('NFC')
}

function normalizeUrlParam(param: string): string {
  return decodeURIComponent(param).normalize('NFC')
}

export const normalizeImageId = normalizeUrlParam
export const normalizeSlug = normalizeUrlParam
