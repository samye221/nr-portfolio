'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import type { FavoriteImage } from '@/types/cloudinary'

const STORAGE_KEY = 'nr-portfolio-favorites'

interface FavoritesContextType {
  favorites: FavoriteImage[]
  isFavorite: (imageId: string) => boolean
  toggleFavorite: (image: Omit<FavoriteImage, 'addedAt'>) => void
  clearFavorites: () => void
  count: number
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

function loadFavorites(): FavoriteImage[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveFavorites(favorites: FavoriteImage[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // localStorage might be full or disabled
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteImage[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setFavorites(loadFavorites())
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      saveFavorites(favorites)
    }
  }, [favorites, isHydrated])

  const isFavorite = useCallback(
    (imageId: string) => favorites.some(f => f.id === imageId),
    [favorites]
  )

  const toggleFavorite = useCallback((image: Omit<FavoriteImage, 'addedAt'>) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === image.id)
      if (exists) {
        return prev.filter(f => f.id !== image.id)
      }
      return [...prev, { ...image, addedAt: Date.now() }]
    })
  }, [])

  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [])

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        clearFavorites,
        count: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
