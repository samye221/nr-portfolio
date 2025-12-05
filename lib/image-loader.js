'use client'

export default function cloudinaryLoader({ src, width, quality }) {
  const params = [
    'f_auto',
    'c_limit',
    `w_${width}`,
    `q_${quality || 'auto:good'}`,
    'dpr_auto',
  ]

  if (src.includes('/upload/')) {
    return src.replace('/upload/', `/upload/${params.join(',')}/`)
  }

  return src
}
