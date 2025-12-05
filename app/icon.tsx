import { ImageResponse } from 'next/og'
import { getCloudinaryUrl } from '@/lib/cloudinary'
import { SITE } from '@/lib/constants'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  const logoUrl = getCloudinaryUrl(SITE.logo.publicId, 'w_32,h_32,c_fit,e_colorize,co_rgb:100A08,f_png')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFDF8',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt=""
          width={28}
          height={28}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  )
}
