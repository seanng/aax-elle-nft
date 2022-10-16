import React, { useCallback, useState, useEffect } from 'react'
import IconBubble from 'components/NFT/shared/misc-icons/bubble'

import { genRandomId } from 'utils/nft'

const TEXT_HEIGHT = 20

const compStyle = {
  position: 'absolute',
  width: '320px',
  height: '320px',
  fontFamily: '"DM Mono", "DMMono"',
  fontWeight: '500',
  fontStyle: 'italic',
  fontSize: '14px',
  boxSizing: 'border-box',
  color: 'black',
  WebkitFilter: 'blur(0px)',
} as React.CSSProperties

const commonOuterContainerStyle = {
  whiteSpace: 'nowrap',
  width: 'calc(100% - 40px)',
  height: `${TEXT_HEIGHT}px`,
  margin: `0 ${TEXT_HEIGHT}px`,
  position: 'absolute',
  transformOrigin: 'top left',
  background: '#55F263',
} as React.CSSProperties

const commonInnerContainerStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  boxSizing: 'content-box',
  paddingBottom: `${TEXT_HEIGHT}px`,
} as React.CSSProperties

const commonTextContainerStyle = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  height: `${TEXT_HEIGHT}px`,
} as React.CSSProperties

const commonTextStyle = {
  display: 'inline-block',
} as React.CSSProperties

const topContainerStyle = {
  ...commonOuterContainerStyle,
  transform: 'rotate(0deg)',
  top: '0',
  left: '0',
} as React.CSSProperties

const rightContainerStyle = {
  ...commonOuterContainerStyle,
  transformOrigin: 'bottom left',
  transform: 'rotate(90deg)',
  top: '0',
  left: 'calc(100% - 40px)',
} as React.CSSProperties

const bottomContainerStyle = {
  ...commonOuterContainerStyle,
  transformOrigin: 'top right',
  transform: 'rotate(180deg)',
  top: '100%',
  left: '-280px',
} as React.CSSProperties

const leftContainerStyle = {
  ...commonOuterContainerStyle,
  transformOrigin: 'bottom left',
  transform: 'rotate(270deg)',
  top: 'calc(100% - 40px)',
  left: '0',
} as React.CSSProperties

interface GetTransformValuesProps {
  cW: number
  tW: number
}

const initTransformValues = {
  totalWidth: 0,
  animationTime: '0',
  emptyWidth: 0,
  transform: { start: 0, end: 0 },
}

const getTransformValues = (widths: GetTransformValuesProps) => {
  const { cW, tW } = widths

  // velocityPerSecond = speed of translateX
  // emptyWidth = total width of empty spaces needed
  // totalWidth = total width of all 3 spans | tW + emptyWidth + tW
  const velocityPerSecond = 100
  const emptyWidth = 10
  const totalWidth = tW * 2 + emptyWidth

  return {
    totalWidth,
    animationTime: (totalWidth / velocityPerSecond).toFixed(1),
    emptyWidth,
    transform: {
      start: -(cW * 0),
      end: -(totalWidth - tW + cW * 0),
    },
  }
}

function CompsNFTAroundText2({
  aroundText,
  optClass = '',
  setIsCompReady = (b: boolean) => {},
  // isImage = false,
}) {
  // Flags
  const [startAnimation, setStartAnimation] = useState(false)
  const [isFontReady, setIsFontReady] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Random ID to prevent marquee from conflicting
  const [randomId] = useState(genRandomId())

  // Animation time & positions
  const [transformValues, setTransformValues] = useState(initTransformValues)

  // Node Refs
  const [containerNode, setContainerNode] = useState<any>(null)
  const [textNode, setTextNode] = useState<any>(null)

  const containerRef = useCallback((node) => {
    if (node) setContainerNode(node)
  }, [])
  const textRef = useCallback((node) => {
    if (node) setTextNode(node)
  }, [])

  useEffect(() => {
    const checkFontsReady = async () => {
      await document.fonts.ready
      setIsFontReady(true)
    }

    checkFontsReady()
  }, [])

  useEffect(() => {
    if (containerNode && textNode && isFontReady && aroundText) {
      setIsReady(true)
      setTransformValues(
        getTransformValues({
          cW: containerNode.offsetWidth,
          tW: textNode.offsetWidth,
        })
      )
    }
  }, [containerNode, textNode, isFontReady, aroundText])

  useEffect(() => {
    if (isFontReady && isReady) {
      setIsCompReady(true)
      setStartAnimation(true)
    }
  }, [isFontReady, isReady])

  const renderText = (key) => {
    if (!isReady) return null

    const animationPlayState = startAnimation ? 'running' : 'paused'
    const animationDuration = transformValues.animationTime
    const animationCSS = `marquee-${randomId} ${animationDuration}s linear infinite ${animationPlayState}`

    return (
      <div style={commonInnerContainerStyle}>
        <div
          id={`${key}-${randomId}`}
          style={{ ...commonTextContainerStyle, animation: animationCSS }}
        >
          <span
            style={{
              ...commonTextStyle,
              lineHeight: '16px',
            }}
          >
            {aroundText}
          </span>
          <span
            style={{
              ...commonTextStyle,
              width: `${transformValues.emptyWidth}px`,
              minWidth: `${transformValues.emptyWidth}px`,
              height: `${TEXT_HEIGHT}px`,
            }}
          />
          <span
            style={{
              ...commonTextStyle,
              lineHeight: '16px',
            }}
          >
            {aroundText}
          </span>
          <span
            style={{
              ...commonTextStyle,
              width: `${transformValues.emptyWidth}px`,
              minWidth: `${transformValues.emptyWidth}px`,
              height: `${TEXT_HEIGHT}px`,
            }}
          />
          <span
            style={{
              ...commonTextStyle,
              lineHeight: '16px',
            }}
          >
            {aroundText}
          </span>
        </div>
      </div>
    )
  }

  const renderStyles = () => {
    if (!isReady) return null
    return (
      <style>
        {`
          #top-${randomId}, #right-${randomId}, #bottom-${randomId}, #left-${randomId} {
            transform: translateX(${transformValues.transform.start}px);
          }

          @keyframes marquee-${randomId} {
            0% {
              transform: translateX(${transformValues.transform.start}px);
            }
            100% {
              transform: translateX(${transformValues.transform.end}px);
            }
          }
        `}
      </style>
    )
  }

  return (
    <div className={optClass} style={compStyle}>
      {/* Reference | Hidden */}
      <div
        ref={containerRef}
        style={{
          ...topContainerStyle,
          visibility: 'hidden',
          overflow: 'hidden',
        }}
      >
        <span id="test" ref={textRef} style={commonTextStyle}>
          {aroundText}
        </span>
      </div>

      <IconBubble optClass="absolute top-2 left-2 h-5 w-5" />
      <IconBubble optClass="absolute top-0 right-0 h-5 w-5" />
      <IconBubble optClass="absolute bottom-0 left-0 h-5 w-5 scale-y-[-1]" />
      <IconBubble optClass="absolute bottom-0 right-0 h-5 w-5 scale-y-[-1]" />

      {/* Top */}
      {/* <div style={topContainerStyle}>{renderText('top')}</div> */}

      {/* Right */}
      {/* <div style={rightContainerStyle}>{renderText('right')}</div> */}

      {/* Bottom */}
      {/* <div style={bottomContainerStyle}>{renderText('bottom')}</div> */}

      {/* Left */}
      {/* <div style={leftContainerStyle}>{renderText('left')}</div> */}

      {renderStyles()}
    </div>
  )
}

export default CompsNFTAroundText2
