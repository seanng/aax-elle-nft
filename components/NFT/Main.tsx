import React, { useState, useEffect } from 'react'

import CompsNFTBeforeOpen from 'components/NFT/BeforeOpen'
import CompsNFTOpened from 'components/NFT/Opened'
import CompsNFTUnopen from 'components/NFT/Unopen'
import { Files, NFTParameters } from 'shared/types'

interface Props {
  data: NFTParameters
  assetsCB?: (f: Files) => void
}

function CompsNFTMain({ data, assetsCB }: Props) {
  // Image File
  const [beforeOpenImg, setBeforeOpenImg] = useState(null)
  const [openedImg, setOpenedImg] = useState(null)
  const [unopenImg, setUnopenImg] = useState(null)

  // HTML File
  const [beforeOpenHTML, setBeforeOpenHTML] = useState(null)
  const [openedHTML, setOpenedHTML] = useState(null)
  const [unopenHTML, setUnopenHTML] = useState(null)

  useEffect(() => {
    const imagesReady = beforeOpenImg && openedImg && unopenImg
    const htmlsReady = beforeOpenHTML && openedHTML && unopenHTML

    if (imagesReady && htmlsReady && assetsCB) {
      assetsCB({
        beforeOpenImage: beforeOpenImg,
        beforeOpenHtml: beforeOpenHTML,
        afterOpenImage: openedImg,
        afterOpenHtml: openedHTML,
        neverOpenedImage: unopenImg,
        neverOpenedHtml: unopenHTML,
      })
    }
  }, [
    beforeOpenImg,
    openedImg,
    unopenImg,
    beforeOpenHTML,
    openedHTML,
    unopenHTML,
  ])

  return (
    <>
      <CompsNFTBeforeOpen
        data={data}
        setImage={setBeforeOpenImg}
        setHTML={setBeforeOpenHTML}
      />
      <CompsNFTOpened
        data={data}
        setImage={setOpenedImg}
        setHTML={setOpenedHTML}
      />
      <CompsNFTUnopen
        data={data}
        setImage={setUnopenImg}
        setHTML={setUnopenHTML}
      />
    </>
  )
}

export default CompsNFTMain
