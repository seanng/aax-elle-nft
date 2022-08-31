import React, { useEffect, useState } from 'react'

import { urlRegex, genRandomId } from 'utils/nft'

const compStyle = {
  position: 'absolute',
  width: '350px',
  height: '350px',
} as React.CSSProperties

function CompsNFTBackground({ backgroundStyle, isCompReady, setIsCompReady }) {
  const [randomId, setRandomId] = useState('')
  const [isBackgroundLink] = useState(urlRegex.test(backgroundStyle))

  useEffect(() => {
    setRandomId(genRandomId())
  }, [])

  useEffect(() => {
    if (!isCompReady && randomId) {
      if (isBackgroundLink) {
        const image = new Image()

        image.addEventListener('load', () => {
          setIsCompReady(true)
        })

        image.src = `${backgroundStyle}?randomId=${randomId}`
      } else {
        setIsCompReady(true)
      }
    }
  }, [isCompReady, randomId, isBackgroundLink, backgroundStyle, setIsCompReady])

  if (!isCompReady) return null

  return (
    <div
      style={{
        ...compStyle,
        background: isBackgroundLink
          ? `url(${backgroundStyle}?randomId=${randomId})`
          : backgroundStyle,
        backgroundSize: '350px 350px',
      }}
    />
  )
}

export default CompsNFTBackground
