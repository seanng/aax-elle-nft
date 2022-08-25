import React, { useRef } from 'react'
import { genImageFile, genHTMLFile } from 'utils/nft'
import CompsNFTBackground from 'components/NFT/shared/Background'
import CompsNFTGridV1 from 'components/NFT/shared/GridV1'
import CompsNFTMessage from 'components/NFT/shared/Message'
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
}

function CompsNFTOpened({
  data: {
    opacity = '0.25',
    background = '#000',
    gridIconColor,
    messageColor = '#fff',
    aroundText,
    message,
  },
  setImage,
  setHTML,
}: Props) {
  const reference = useRef<HTMLDivElement>(null)

  const imageCB = () => {
    reference.current && genImageFile(reference.current, 'opened.png', setImage)
  }

  const htmlCB = () => {
    reference.current &&
      genHTMLFile(reference.current.outerHTML, 'opened.html', setHTML)
  }

  return (
    <div style={compsStyle} ref={reference}>
      <CompsNFTBackground background={background} />
      <CompsNFTGridV1 color={gridIconColor} opacity={opacity as string} />
      <CompsNFTAroundText
        color={gridIconColor}
        aroundText={aroundText}
        imageCB={imageCB}
        htmlCB={htmlCB}
      />
      <CompsNFTMessage color={messageColor} message={message} />
    </div>
  )
}

export default CompsNFTOpened
