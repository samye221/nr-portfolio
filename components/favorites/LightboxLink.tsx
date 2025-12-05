'use client'

import Link from 'next/link'
import { useFavorites } from './FavoritesContext'

export function LightboxLink() {
  const { count } = useFavorites()

  if (count === 0) return null

  return (
    <Link
      href="/lightbox"
      className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="text-xs">{count}</span>
    </Link>
  )
}
