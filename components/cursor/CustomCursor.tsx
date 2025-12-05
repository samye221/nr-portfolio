'use client'

import { useEffect, useState } from 'react'
import { useCursor } from './CursorContext'

const CURSOR_SIZE = 24

export function CustomCursor() {
  const { variant, theme, visible } = useCursor()
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isOnScreen, setIsOnScreen] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isOnScreen) setIsOnScreen(true)
    }

    const handleMouseLeave = () => setIsOnScreen(false)
    const handleMouseEnter = () => setIsOnScreen(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isOnScreen])

  const circleColor = theme === 'dark' ? '#100A08' : '#FFFDF8'
  const arrowColor = theme === 'dark' ? '#FFFDF8' : '#100A08'

  return (
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: position.x - CURSOR_SIZE / 2,
        top: position.y - CURSOR_SIZE / 2,
        opacity: isOnScreen && visible ? 1 : 0,
        transition: 'opacity 0.15s ease',
      }}
    >
      <svg
        width={CURSOR_SIZE}
        height={CURSOR_SIZE}
        viewBox="0 0 66.36 66.36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="33.18"
          cy="33.18"
          r="32.18"
          fill={circleColor}
        />
        {variant === 'left' && (
          <polygon
            points="38,22 26,33.18 38,44.36"
            fill={arrowColor}
          />
        )}
        {variant === 'right' && (
          <polygon
            points="28,22 40,33.18 28,44.36"
            fill={arrowColor}
          />
        )}
      </svg>
    </div>
  )
}
