'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { revalidateCache } from '@/lib/actions/cache'

export function CacheButton() {
  const searchParams = useSearchParams()
  const adminSecret = searchParams.get('admin')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  if (!adminSecret) return null

  const handleClick = async () => {
    setStatus('loading')
    const result = await revalidateCache(adminSecret)
    setStatus(result.success ? 'success' : 'error')
    if (result.success) {
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } else {
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === 'loading'}
      className="fixed bottom-4 right-4 z-50 rounded bg-foreground px-3 py-2 text-xs text-background transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {status === 'idle' && 'Refresh Cache'}
      {status === 'loading' && 'Refreshing...'}
      {status === 'success' && '✓ Done'}
      {status === 'error' && '✗ Error'}
    </button>
  )
}
