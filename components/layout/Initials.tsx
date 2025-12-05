'use client'

import { useEffect, useState } from 'react'

interface InitialsProps {
  initialVariant: 'foreground' | 'background'
}

export function Initials({ initialVariant }: InitialsProps) {
  const [isAtGrid, setIsAtGrid] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const gridThreshold = window.innerHeight * 0.8
      setIsAtGrid(window.scrollY > gridThreshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const zIndex = initialVariant === 'foreground' || isAtGrid ? 'z-30' : 'z-0'

  return (
    <div className={`pointer-events-none fixed inset-0 flex items-center justify-center ${zIndex}`}>
      <span className="font-script text-[25rem] leading-none text-foreground">
        <span>n</span>
        <span className="inline-block w-96" />
        <span>r</span>
      </span>
    </div>
  )
}
