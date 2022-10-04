import React, { useCallback, useState, useEffect } from 'react'

import { genRandomId } from 'utils/nft'

const compStyle = {
  position: 'absolute',
  width: '350px',
  height: '350px',
  fontFamily: '"DM Mono", "DMMono"',
  fontWeight: '500',
  fontStyle: 'italic',
  fontSize: '25px',
  boxSizing: 'border-box',
  color: 'transparent',
} as React.CSSProperties

const commonOuterContainerStyle = {
  whiteSpace: 'nowrap',
  width: 'calc(100% - 70px)',
  height: '35px',
  margin: '0 35px',
  position: 'absolute',
  transformOrigin: 'top left',
} as React.CSSProperties

const commonInnerContainerStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  boxSizing: 'content-box',
  paddingBottom: '35px',
} as React.CSSProperties

const commonTextContainerStyle = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'end',
  height: '35px',
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
  left: 'calc(100% - 70px)',
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
  top: 'calc(100% - 70px)',
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
  bottom: { start: 0, end: 0 },
  left: { start: 0, end: 0 },
  top: { start: 0, end: 0 },
  right: { start: 0, end: 0 },
}

const getTransformValues = (widths: GetTransformValuesProps) => {
  const { cW, tW } = widths

  // filledBoxes = amount of boxes filled | max 4, min 0
  // emptyBoxes = amount of empty boxes | max 4, min 0
  // extraSpace = spacing between end and start of text to prevent sticking
  // textTakenSpace = Text spaces on last box | 0 boxes are filled
  const velocityPerSecond = 100
  const filledBoxes = Math.min(Math.floor(tW / cW), 4)
  const emptyBoxes = 4 - filledBoxes
  const extraSpace = emptyBoxes ? 0 : 50
  const textTakenSpace = filledBoxes === 4 ? 0 : tW % cW

  // emptyWidth = total width of empty spaces needed
  // totalWidth = total width of all 3 spans | tW + emptyWidth + tW
  const emptyWidth = cW * emptyBoxes - textTakenSpace + extraSpace
  const totalWidth = tW * 2 + emptyWidth

  return {
    totalWidth,
    animationTime: (totalWidth / velocityPerSecond).toFixed(1),
    emptyWidth,
    top: {
      start: -(cW * 0),
      end: -(totalWidth - tW + cW * 0),
    },
    right: {
      start: -(cW * 1),
      end: -(totalWidth - tW + cW * 1),
    },
    bottom: {
      start: -(cW * 2),
      end: -(totalWidth - tW + cW * 2),
    },
    left: {
      start: -(cW * 3),
      end: -(totalWidth - tW + cW * 3),
    },
  }
}

function CompsNFTAroundText({
  color = '#fff',
  aroundText = '',
  isImageCaptured,
  isFontReady,
  isCompReady,
  setIsCompReady,
}) {
  // Random ID to prevent marquee from conflicting
  const [randomId, setRandomId] = useState('')

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
    setRandomId(genRandomId())
  }, [])

  // When all ready, set the dimension
  useEffect(() => {
    if (containerNode && textNode && isFontReady) {
      setTransformValues(
        getTransformValues({
          cW: containerNode.offsetWidth,
          tW: textNode.offsetWidth,
        })
      )
      setIsCompReady(true)
    }
  }, [containerNode, textNode, isFontReady]) // eslint-disable-line

  const renderText = (key) => {
    if (!isCompReady && !randomId) return null

    const animationPlayState = isImageCaptured ? 'running' : 'paused'
    const animationDuration = transformValues.animationTime
    const animationCSS = `marquee-${key}-${randomId} ${animationDuration}s linear infinite ${animationPlayState}`

    return (
      <div style={commonInnerContainerStyle}>
        <div
          id={`${key}-${randomId}`}
          style={{ ...commonTextContainerStyle, animation: animationCSS }}
        >
          <span
            style={{
              ...commonTextStyle,
              lineHeight: isImageCaptured ? '18px' : '16px',
            }}
          >
            {aroundText}
          </span>
          <span
            style={{
              ...commonTextStyle,
              width: `${transformValues.emptyWidth}px`,
              minWidth: `${transformValues.emptyWidth}px`,
              height: '35px',
            }}
          />
          <span
            style={{
              ...commonTextStyle,
              lineHeight: isImageCaptured ? '18px' : '16px',
            }}
          >
            {aroundText}
          </span>
        </div>
      </div>
    )
  }

  const renderStyles = () => {
    if (!isCompReady && !randomId) return null
    return (
      <style>
        {`
            #top-${randomId} {
              transform: translateX(${transformValues.top.start}px);
            }

            #right-${randomId} {
              transform: translateX(${transformValues.right.start}px);
            }

            #bottom-${randomId} {
              transform: translateX(${transformValues.bottom.start}px);
            }

            #left-${randomId} {
              transform: translateX(${transformValues.left.start}px);
            }

            @keyframes marquee-top-${randomId} {
              0% {
                transform: translateX(${transformValues.top.start}px);
              }
              100% {
                transform: translateX(${transformValues.top.end}px);
              }
            }

            @keyframes marquee-right-${randomId} {
              0% {
                transform: translateX(${transformValues.right.start}px);
              }
              100% {
                transform: translateX(${transformValues.right.end}px);
              }
            }

            @keyframes marquee-bottom-${randomId} {
              0% {
                transform: translateX(${transformValues.bottom.start}px);
              }
              100% {
                transform: translateX(${transformValues.bottom.end}px);
              }
            }

            @keyframes marquee-left-${randomId} {
              0% {
                transform: translateX(${transformValues.left.start}px);
              }
              100% {
                transform: translateX(${transformValues.left.end}px);
              }
            }
          `}
      </style>
    )
  }

  return (
    <div style={{ ...compStyle, WebkitTextStroke: `1px ${color}` }}>
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

      {/* Top */}
      <div style={topContainerStyle}>{renderText('top')}</div>

      {/* Right */}
      <div style={rightContainerStyle}>{renderText('right')}</div>

      {/* Bottom */}
      <div style={bottomContainerStyle}>{renderText('bottom')}</div>

      {/* Left */}
      <div style={leftContainerStyle}>{renderText('left')}</div>

      {renderStyles()}
    </div>
  )
}

export default CompsNFTAroundText
