import React, { useCallback, useState, useEffect } from 'react'
import { genImageFile, genHTMLFile } from 'utils/nft'
import CompsNFTBackground from 'components/NFT/shared/Background'
import CompsNFTGrid from 'components/NFT/shared/Grid'
import CompsNFTBlinkingIcons from 'components/NFT/shared/BlinkingIcons'
import CompsNFTAroundText from 'components/NFT/shared/AroundText'
import CompsNFTSignature from 'components/NFT/shared/Signature'
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

function CompsNFTBeforeOpen({
  data: {
    aroundText,
    backgroundStyle,
    gridIconStyle1,
    gridIconTemplate1,
    aroundTextColor,
    signature,
  },
  setImage,
  setHTML,
}: Props) {
  const [compNode, setCompNode] = useState<any>(null)
  const [isBackgroundReady, setIsBackgroundReady] = useState(false)
  const [isGridReady, setIsGridReady] = useState(false)
  const [isFontReady, setIsFontReady] = useState(false)
  const [isDimensionReady, setIsDimensionReady] = useState(false)
  const [isIconsReady, setIsIconsReady] = useState(false)
  const [isSignatureReady, setIsSignatureReady] = useState(!signature)
  const [isImageCaptured, setIsImageCaptured] = useState(false)

  // Set Comp Node
  const compRef = useCallback((node) => {
    if (node) setCompNode(node)
  }, [])

  // Check Fonts are ready
  useEffect(() => {
    const checkFontsReady = async () => {
      await document.fonts.ready
      setIsFontReady(true)
    }
    checkFontsReady()
  }, [])

  // When all ready, capture image
  useEffect(() => {
    if (
      compNode &&
      isBackgroundReady &&
      isGridReady &&
      isFontReady &&
      isDimensionReady &&
      isIconsReady &&
      isSignatureReady
    ) {
      const getImage = async () => {
        await genImageFile(compNode, 'before-open.png', setImage)
        setIsImageCaptured(true)
      }
      getImage()
    }
  }, [
    compNode,
    isBackgroundReady,
    isGridReady,
    isFontReady,
    isDimensionReady,
    isIconsReady,
    isSignatureReady,
    setImage,
  ])

  useEffect(() => {
    if (isImageCaptured) {
      return genHTMLFile(compNode.outerHTML, 'before-open.html', setHTML)
    }
  }, [compNode, isImageCaptured, setHTML])

  return (
    <div style={compsStyle} ref={compRef}>
      <CompsNFTBackground
        backgroundStyle={backgroundStyle}
        isCompReady={isBackgroundReady}
        setIsCompReady={setIsBackgroundReady}
      />
      <CompsNFTGrid
        color={gridIconStyle1}
        Template={gridIconTemplate1}
        isCompReady={isGridReady}
        setIsCompReady={setIsGridReady}
      />
      <CompsNFTBlinkingIcons
        isImageCaptured={isImageCaptured}
        isCompReady={isIconsReady}
        setIsCompReady={setIsIconsReady}
      />
      <CompsNFTAroundText
        color={aroundTextColor}
        aroundText={aroundText}
        isImageCaptured={isImageCaptured}
        isFontReady={isFontReady}
        isCompReady={isDimensionReady}
        setIsCompReady={setIsDimensionReady}
      />
      {signature && (
        <CompsNFTSignature
          url={signature}
          setIsCompReady={setIsSignatureReady}
        />
      )}
    </div>
  )
}

export default CompsNFTBeforeOpen
