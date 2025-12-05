import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-serif text-6xl font-bold">404</h1>
      <p className="font-mono text-sm uppercase tracking-wider text-muted">
        Page not found
      </p>
      <Link
        href="/"
        className="mt-4 font-mono text-xs uppercase tracking-wider underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        Back to home
      </Link>
    </div>
  )
}
