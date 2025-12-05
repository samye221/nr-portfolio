'use client'

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface GalleryContextValue {
  isVisible: boolean
  isFadingOut: boolean
  closeGallery: () => void
  setFadingOut: (value: boolean) => void
}

const GalleryContext = createContext<GalleryContextValue | null>(null)

export function GalleryProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const wasClosedRef = useRef(false)
  const lastPathnameRef = useRef(pathname)

  const isOnGalleryPage = pathname !== '/' && pathname !== '/portfolio'

  useEffect(() => {
    if (pathname !== lastPathnameRef.current) {
      wasClosedRef.current = false
      if (isOnGalleryPage) {
        setIsVisible(true)
      }
      lastPathnameRef.current = pathname
    }
  }, [pathname, isOnGalleryPage])

  const effectiveIsVisible = wasClosedRef.current
    ? false
    : isOnGalleryPage && isVisible

  const closeGallery = useCallback(() => {
    wasClosedRef.current = true
    setIsVisible(false)
    setIsFadingOut(false)
  }, [])

  const setFadingOutCallback = useCallback((value: boolean) => {
    setIsFadingOut(value)
  }, [])

  return (
    <GalleryContext.Provider
      value={{
        isVisible: effectiveIsVisible,
        isFadingOut,
        closeGallery,
        setFadingOut: setFadingOutCallback,
      }}
    >
      {children}
    </GalleryContext.Provider>
  )
}

export function useGalleryContext() {
  const context = useContext(GalleryContext)
  if (!context) {
    throw new Error('useGalleryContext must be used within a GalleryProvider')
  }
  return context
}
