import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPortfolioImages, normalizeImageId } from '@/lib/services/project.service'
import { generateOGImageUrl } from '@/lib/cloudinary'
import { ELEMENT_IDS } from '@/lib/gallery.constants'
import { SITE } from '@/lib/constants'
import { Initials } from '@/components/layout/Initials'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { GalleryView } from '@/components/gallery/GalleryView'
import type { GalleryImage } from '@/components/gallery/Gallery'

interface PortfolioImagePageProps {
  params: Promise<{ imageId: string }>
}

export async function generateMetadata({ params }: PortfolioImagePageProps): Promise<Metadata> {
  const { imageId: rawImageId } = await params
  const imageId = normalizeImageId(rawImageId)
  const allImages = await getAllPortfolioImages()
  const selectedImage = allImages.find((img) => img.id === imageId)

  if (!selectedImage) {
    return { title: 'Not Found' }
  }

  const ogImageUrl = generateOGImageUrl(selectedImage.secure_url)

  return {
    title: `${selectedImage.projectTitle} - Portfolio`,
    description: `${selectedImage.projectTitle} - Photography portfolio by ${SITE.name}`,
    openGraph: {
      title: `${selectedImage.projectTitle} | ${SITE.name}`,
      description: `Fashion and luxury photography by ${SITE.name}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: selectedImage.projectTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${selectedImage.projectTitle} | ${SITE.name}`,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `/portfolio/${imageId}`,
    },
  }
}

export default async function PortfolioImagePage({ params }: PortfolioImagePageProps) {
  const { imageId: rawImageId } = await params
  const imageId = normalizeImageId(rawImageId)
  const allImages = await getAllPortfolioImages()

  const selectedImage = allImages.find((img) => img.id === imageId)

  if (!selectedImage) {
    notFound()
  }

  const galleryImages: GalleryImage[] = allImages.map(img => ({
    id: img.id,
    secure_url: img.secure_url,
    alt: img.projectTitle,
    caption: img.description,
    projectSlug: img.projectSlug,
    projectTitle: img.projectTitle,
  }))

  return (
    <>
      <GalleryView
        key={imageId}
        images={galleryImages}
        initialImageId={imageId}
        gridElementId={ELEMENT_IDS.PORTFOLIO_GRID}
        closeRedirectUrl="/portfolio"
        headerView="portfolio"
        closeLabel="View portfolio"
        urlPattern="/portfolio/{id}"
      />

      <Initials variant="background" />

      <main className="relative z-10 min-h-screen">
        <section id={ELEMENT_IDS.PORTFOLIO_GRID} className="px-4 sm:px-8 lg:px-16 pb-24 pt-16 sm:pt-header-offset">
          <PortfolioGrid images={allImages} />
        </section>
      </main>
    </>
  )
}
