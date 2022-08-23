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
    message: string
    aroundText: string
    gridIconColor: string
    background?: string
    opacity?: string
    messageColor?: string
  }
  setImage?: React.Dispatch<React.SetStateAction<null>>
  setHTML?: React.Dispatch<React.SetStateAction<null>>
  setPreview?: React.Dispatch<React.SetStateAction<null>>
  setDataURL?: React.Dispatch<React.SetStateAction<null>>
}

function CompsNFTUnopen({
  data: { background = '#000', gridIconColor, aroundText },
  setImage,
  setHTML,
  setPreview,
  setDataURL,
}: Props) {
  const reference = useRef<HTMLDivElement>(null)

  const imageCB = () => {
    reference.current &&
      genImageFile(reference.current, 'unopen.png', setImage, setDataURL)
  }

  const htmlCB = () => {
    reference.current &&
      genHTMLFile(
        reference.current.outerHTML,
        'unopen.html',
        setHTML,
        setPreview
      )
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
