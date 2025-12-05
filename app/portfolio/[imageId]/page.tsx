import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPortfolioImages, normalizeImageId } from '@/lib/services/project.service'
import { ELEMENT_IDS } from '@/lib/gallery.constants'
import { SITE } from '@/lib/constants'
import { Initials } from '@/components/layout/Initials'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { PortfolioView } from '@/components/portfolio/PortfolioView'

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

  const ogImageUrl = selectedImage.secure_url.replace(
    '/upload/',
    '/upload/w_1200,h_630,c_fill,f_jpg,q_auto/'
  )

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

  return (
    <>
      <Initials initialVariant="background" />

      <main className="relative z-10 min-h-screen">
        <PortfolioView
          images={allImages}
          initialImageId={imageId}
        />

        <section id={ELEMENT_IDS.PORTFOLIO_GRID} className="relative z-20 px-page pb-24 pt-24">
          <PortfolioGrid images={allImages} />
        </section>
      </main>
    </>
  )
}
