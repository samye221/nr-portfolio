'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import { useGalleryContext } from './GalleryContext'
import { LAYOUT } from '@/lib/gallery.constants'

interface UseGalleryCloseOptions {
  gridElementId: string
  closeRedirectUrl: string
}

interface UseGalleryCloseReturn {
  isVisible: boolean
  isFadingOut: boolean
  handleClose: () => void
}

export function useGalleryClose({
  gridElementId,
  closeRedirectUrl,
}: UseGalleryCloseOptions): UseGalleryCloseReturn {
  const { isVisible, isFadingOut, closeGallery, setFadingOut } = useGalleryContext()
  const [isClosing, setIsClosing] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (isVisible) {
      setIsClosing(false)
    }
  }, [isVisible])

  const handleClose = useCallback(() => {
    if (isClosing) return
    setIsClosing(true)

    const grid = document.getElementById(gridElementId)
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [isClosing, gridElementId])

  useEffect(() => {
    if (!isClosing) return

    const grid = document.getElementById(gridElementId)
    if (!grid) return

    const rootMargin = `-${LAYOUT.HEADER_HEIGHT}px 0px 0px 0px`

    let scrollEndTimer: ReturnType<typeof setTimeout> | null = null

    const handleScrollEnd = () => {
      if (scrollEndTimer) clearTimeout(scrollEndTimer)
      scrollEndTimer = setTimeout(() => {
        window.history.replaceState(null, '', closeRedirectUrl)
        closeGallery()
        setIsClosing(false)
        window.scrollTo({ top: 0, behavior: 'instant' })
      }, 50)
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observerRef.current?.disconnect()
          window.addEventListener('scroll', handleScrollEnd, { passive: true })
          handleScrollEnd()
        }
      },
      { rootMargin, threshold: 0 }
    )

    observerRef.current.observe(grid)

    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener('scroll', handleScrollEnd)
      if (scrollEndTimer) clearTimeout(scrollEndTimer)
    }
  }, [isClosing, gridElementId, closeRedirectUrl, closeGallery, setFadingOut])

  return { isVisible, isFadingOut, handleClose }
}
