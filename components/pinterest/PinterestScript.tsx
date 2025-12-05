'use client'

import Script from 'next/script'

export function PinterestScript() {
  return (
    <Script
      src="https://assets.pinterest.com/js/pinit.js"
      strategy="lazyOnload"
      data-pin-hover="true"
      data-pin-tall="true"
      data-pin-round="true"
    />
  )
}
