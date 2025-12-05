import Link from 'next/link'

interface HeaderProps {
  breadcrumb?: string
}

export function Header({ breadcrumb = 'Projets / Overview' }: HeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-background px-page py-4">
      <span className="italic">{breadcrumb}</span>
      <Link href="mailto:contact@nathanrobin.fr" className="transition-opacity hover:opacity-60">
        contact
      </Link>
    </header>
  )
}
