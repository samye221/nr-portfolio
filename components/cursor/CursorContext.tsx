'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type CursorVariant = 'default' | 'left' | 'right'

interface CursorContextType {
  variant: CursorVariant
  visible: boolean
  setVariant: (variant: CursorVariant) => void
  setVisible: (visible: boolean) => void
}

const CursorContext = createContext<CursorContextType | null>(null)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [visible, setVisible] = useState(true)

  return (
    <CursorContext.Provider value={{ variant, visible, setVariant, setVisible }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
