import type { ImageCredits } from './Gallery'

interface ImageCaptionProps {
  metadata?: ImageCredits
  caption?: string
  fadeIn: boolean
  transitionDuration: number
}

export function ImageCaption({ metadata, caption, fadeIn, transitionDuration }: ImageCaptionProps) {
  if (!metadata && !caption) return null

  return (
    <div
      className="absolute bottom-4 left-4 z-40 max-w-caption-max text-xs leading-none pointer-events-none text-foreground"
      style={{
        opacity: fadeIn ? 1 : 0,
        transition: `opacity ${transitionDuration / 2}ms ease-out`,
      }}
    >
      {metadata?.title && <p>{metadata.title}</p>}
      {metadata?.credits && (
        <p>
          {Object.entries(metadata.credits).map(([role, name], index) => (
            <span key={role}>
              {index > 0 && ' '}
              <span className="underline">{role}</span>: {name}
            </span>
          ))}
        </p>
      )}
      {!metadata && caption && <p>{caption}</p>}
    </div>
  )
}
