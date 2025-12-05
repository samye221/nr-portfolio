'use server'

import { revalidateTag } from 'next/cache'
import { CACHE_TAG } from '@/lib/services/project.service'

const ADMIN_SECRET = process.env.ADMIN_SECRET

export async function revalidateCache(secret: string): Promise<{ success: boolean; message: string }> {
  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    revalidateTag(CACHE_TAG)
    return { success: true, message: 'Cache invalidated' }
  } catch {
    return { success: false, message: 'Failed to invalidate cache' }
  }
}
