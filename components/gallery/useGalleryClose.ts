'use client'

import { useState, useCallback, useEffect } from 'react'
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
  const [isClosing, setIsClosing] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

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

    const checkScrollComplete = () => {
      const grid = document.getElementById(gridElementId)
      if (!grid) return

      const gridRect = grid.getBoundingClientRect()

      if (gridRect.top <= LAYOUT.HEADER_HEIGHT + LAYOUT.SCROLL_TOLERANCE) {
        setIsFadingOut(true)

        setTimeout(() => {
          setIsVisible(false)
          window.history.replaceState(null, '', closeRedirectUrl)
          window.scrollTo({ top: 0, behavior: 'instant' })
        }, LAYOUT.FADE_DURATION)
      } else {
        requestAnimationFrame(checkScrollComplete)
      }
    }

    requestAnimationFrame(checkScrollComplete)
  }, [isClosing, gridElementId, closeRedirectUrl])

  return { isVisible, isFadingOut, handleClose }
}
