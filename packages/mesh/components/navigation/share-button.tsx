'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'

import Icon from '../icon'
import ShareSheet from '../share-sheet'

export default function ShareButton({ url }: { url: string }) {
  const [shouldShowShareSheet, setShouldShowShareSheet] = useState(false)
  return (
    <>
      <button
        type="button"
        className="flex size-11 items-center justify-center sm:size-6"
        onClick={() => {
          setShouldShowShareSheet(true)
        }}
      >
        <Icon iconName="icon-share" size="l" />
      </button>
      {shouldShowShareSheet &&
        createPortal(
          <ShareSheet
            url={url}
            onClose={() => {
              setShouldShowShareSheet(false)
            }}
          />,
          document.body
        )}
    </>
  )
}
