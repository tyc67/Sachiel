import Script from 'next/script'

import { ADSENSE_CLIENT } from '@/constants/config'

export default function AdsenseScript() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  )
}
