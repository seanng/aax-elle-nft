import React, { useEffect, useState } from 'react'

import { genRandomId } from 'utils/nft'

const compStyle = {
  position: 'absolute',
  bottom: '35px',
  right: '35px',
  height: '56px',
} as React.CSSProperties

const imgStyle = {
  height: '56px',
  width: 'auto',
}

function CompsNFTSignature({ url, setIsCompReady }) {
  const [randomId, setRandomId] = useState('')

  useEffect(() => {
    setRandomId(genRandomId())
  }, [])

  const onLoad = () => {
    setIsCompReady(true)
  }

  if (!randomId) return null

  return (
    <div style={compStyle}>
      {/* eslint-disable-next-line */}
      <img
        style={imgStyle}
        src={`${url}?randomId=${randomId}`}
        alt="signature"
        onLoad={onLoad}
        crossOrigin="anonymous"
      />
    </div>
  )
}

export default CompsNFTSignature
