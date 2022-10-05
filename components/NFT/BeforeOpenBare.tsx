import React from 'react'
import CompsNFTBackground from 'components/NFT/shared/Background'
import CompsNFTGrid from 'components/NFT/shared/Grid'
import CompsNFTAroundText from 'components/NFT/shared/AroundText'
import { NFTParameters } from 'shared/types'

const compsStyle = {
  position: 'relative',
  margin: '0 auto',
  width: '350px',
  height: '350px',
} as React.CSSProperties

interface Props {
  data: NFTParameters
  setImage?: React.Dispatch<React.SetStateAction<null>>
  setHTML?: React.Dispatch<React.SetStateAction<null>>
}

function CompsNFTBeforeOpenBare({
  data: {
    aroundText,
    gridIconTemplate,
    backgroundStyle,
    gridStyle,
    aroundTextColor,
    iconOutlineColor,
    iconFillColor,
    signature,
  },
  setImage,
  setHTML,
}: Props) {
  return (
    <div style={compsStyle}>
      {/* @ts-ignore */}
      <CompsNFTBackground
        isCompReady={true}
        backgroundStyle={backgroundStyle}
      />
      {/* @ts-ignore */}
      <CompsNFTGrid
        isCompReady
        color={gridStyle}
        iconOutlineColor={iconOutlineColor}
        iconFillColor={iconFillColor}
        Template={gridIconTemplate}
      />
      {/* @ts-ignore */}
      <CompsNFTAroundText
        isCompReady
        color={aroundTextColor}
        aroundText={aroundText}
      />
    </div>
  )
}

export default CompsNFTBeforeOpenBare
