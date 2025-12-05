const CLOUDINARY_BASE = 'https://res.cloudinary.com/db2ycwgpg/image/upload'
const CURSOR_TRANSFORMS_DARK = 'w_32,h_32,c_scale,q_100,fl_sanitize,f_png'
const CURSOR_TRANSFORMS_LIGHT = 'w_32,h_32,c_scale,q_100,fl_sanitize,e_negate,f_png'

export const CURSORS = {
  default: `${CLOUDINARY_BASE}/${CURSOR_TRANSFORMS_DARK}/Cursor_oajq5n`,
  left: `${CLOUDINARY_BASE}/${CURSOR_TRANSFORMS_DARK}/arrow-left_fhnwvc`,
  right: `${CLOUDINARY_BASE}/${CURSOR_TRANSFORMS_DARK}/arrow-right_deh9d3`,
} as const

export const CURSORS_LIGHT = {
  default: `${CLOUDINARY_BASE}/${CURSOR_TRANSFORMS_LIGHT}/Cursor_oajq5n`,
  left: `${CLOUDINARY_BASE}/${CURSOR_TRANSFORMS_LIGHT}/arrow-left_fhnwvc`,
  right: `${CLOUDINARY_BASE}/${CURSOR_TRANSFORMS_LIGHT}/arrow-right_deh9d3`,
} as const

export function getCursorStyle(cursor: string, hotspot: [number, number] = [16, 16]): string {
  return `url(${cursor}) ${hotspot[0]} ${hotspot[1]}, default`
}

export function getPointerCursorStyle(cursor: string, hotspot: [number, number] = [16, 16]): string {
  return `url(${cursor}) ${hotspot[0]} ${hotspot[1]}, pointer`
}

export const SITE = {
  name: 'Nathan Robin',
  title: 'Nathan Robin Photography',
  description: 'Fashion and luxury photography portfolio by Nathan Robin. Discover my projects and collaborations.',
  url: 'https://nathanrobin.fr',
  locale: 'en_US',
  logo: {
    publicId: 'LOGO-NR_ym8wov',
    alt: 'NR Photography',
  },
  social: {
    instagram: 'https://instagram.com/nathanrobin',
  },
} as const
