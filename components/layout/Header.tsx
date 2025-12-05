'use client'

import Link from 'next/link'
import { useCursor } from '@/components/cursor/CursorContext'
import { LightboxLink } from '@/components/favorites/LightboxLink'

type HeaderProps =
  | { view: 'projects' | 'portfolio'; onClose?: never }
  | { view?: never; onClose: () => void }

export function Header(props: HeaderProps) {
  const { setVisible } = useCursor()

  const renderLeft = () => {
    if (props.view) {
      const linkText = props.view === 'projects' ? 'portfolio' : 'projects'
      const linkHref = props.view === 'projects' ? '/portfolio' : '/'

      return (
        <Link
          href={linkHref}
          className="transition-opacity hover:opacity-60"
        >
          {linkText}
        </Link>
      )
    }

    if (props.onClose) {
      return (
        <button
          onClick={props.onClose}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-foreground transition-opacity hover:opacity-60"
          aria-label="Close"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L9 9M9 1L1 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )
    }

    return null
  }

  return (
    <header
      className="cursor-auto fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-background px-page py-4"
      onMouseEnter={() => setVisible(false)}
      onMouseLeave={() => setVisible(true)}
    >
      <nav aria-label="Main navigation">
        <span className="italic">{renderLeft()}</span>
      </nav>
      <nav className="flex items-center gap-4" aria-label="Actions">
        <LightboxLink />
        <Link
          href="mailto:contact@nathanrobin.fr"
          className="transition-opacity hover:opacity-60"
        >
          contact
        </Link>
      </nav>
    </header>
  )
}
