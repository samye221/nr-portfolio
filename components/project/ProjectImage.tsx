import Image from 'next/image'
import type { CloudinaryResource } from '@/types'

interface ProjectImageProps {
  image: CloudinaryResource
  priority?: boolean
}

export function ProjectImage({ image, priority = false }: ProjectImageProps) {
  const caption = image.context?.custom?.caption
  const alt = image.context?.custom?.alt || caption || ''

  return (
    <div className="group relative aspect-square overflow-hidden">
      <Image
        src={image.secure_url}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
      />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="font-mono text-xs text-white">{caption}</p>
        </div>
      )}
    </div>
  )
}
