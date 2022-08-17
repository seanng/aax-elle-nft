import React, { useRef } from 'react'
import { genImageFile, genHTMLFile } from 'utils/nft'
import CompsNFTBackground from 'components/NFT/shared/Background'
import CompsNFTGridV2 from 'components/NFT/shared/GridV2'
import CompsNFTAroundText from 'components/NFT/shared/AroundText'

const compsStyle = {
  position: 'relative',
  margin: '0 auto',
  width: '350px',
  height: '350px',
} as React.CSSProperties

interface Props {
  data: {
    background: string
    gridIconColor: string
    aroundText: string
  }
  setImage?: React.Dispatch<React.SetStateAction<null>>
  setHTML?: React.Dispatch<React.SetStateAction<null>>
}

function CompsNFTUnopen({
  data: { background, gridIconColor, aroundText },
  setImage,
  setHTML,
}: Props) {
  const reference = useRef<HTMLDivElement>(null)

  const imageCB = () => {
    genImageFile(reference.current, 'unopen.png', setImage)
  }

  const htmlCB = () => {
    reference.current &&
      genHTMLFile(reference.current.outerHTML, 'unopen.html', setHTML)
  }

  return (
    <div style={compsStyle} ref={reference}>
      <CompsNFTBackground background={background} />
      <CompsNFTGridV2 color={gridIconColor} />
      <CompsNFTAroundText
        color={gridIconColor}
        aroundText={aroundText}
        imageCB={imageCB}
        htmlCB={htmlCB}
      />
    </div>
  )
}

export default CompsNFTUnopen
