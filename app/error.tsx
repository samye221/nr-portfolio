'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-mono text-sm uppercase tracking-wider text-muted">
        Something went wrong
      </h1>
      <button
        onClick={reset}
        className="font-mono text-xs uppercase tracking-wider underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        Try again
      </button>
    </div>
  )
}
