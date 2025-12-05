'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCursor } from '@/components/cursor/CursorContext'
import { getCloudinaryUrl } from '@/lib/cloudinary'
import { SITE } from '@/lib/constants'

export type HeaderView = 'projects' | 'portfolio'

type HeaderProps =
  | { view: HeaderView; onClose?: never }
  | { view?: never; onClose: () => void }

export function Header(props: HeaderProps) {
  const { setVisible } = useCursor()
  const logoUrl = getCloudinaryUrl(SITE.logo.publicId, 'f_svg')

  const renderNavigation = () => {
    if (props.view) {
      const isProjects = props.view === 'projects'

      return (
        <>
          {/* Mobile: show only the other page link */}
          <Link
            href={isProjects ? '/portfolio' : '/'}
            className="transition-opacity hover:opacity-60 sm:hidden"
          >
            {isProjects ? 'portfolio' : 'projects'}
          </Link>
          {/* Desktop: show both links */}
          <span className="hidden sm:inline">
            <Link
              href="/"
              className={`transition-opacity hover:opacity-60 ${isProjects ? 'italic' : ''}`}
            >
              projects
            </Link>
            <span className="mx-separator">|</span>
            <Link
              href="/portfolio"
              className={`transition-opacity hover:opacity-60 ${!isProjects ? 'italic' : ''}`}
            >
              portfolio
            </Link>
          </span>
        </>
      )
    }

    if (props.onClose) {
      return (
        <button
          onClick={props.onClose}
          className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground transition-opacity hover:opacity-60"
          aria-label="Close"
        >
          <svg
            width="8"
            height="8"
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
      className="cursor-auto fixed left-0 right-0 top-0 z-50 flex h-header-height items-center justify-between px-4 sm:px-8 lg:px-16 text-label animate-fade-up"
      onMouseEnter={() => setVisible(false)}
      onMouseLeave={() => setVisible(true)}
    >
      <nav aria-label="Main navigation">
        {renderNavigation()}
      </nav>

      {/* Mobile: Initials logo centered */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
        <div className="relative h-8 w-16">
          <Image
            src={logoUrl}
            alt={SITE.logo.alt}
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>

      <nav aria-label="Actions">
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
