import { useState, useMemo, useCallback, useEffect } from 'react'
import { classNames } from 'utils/helpers'
import { genRandomId } from 'utils/nft'

const LEFT = 'left'

interface GetTransformValuesProps {
  cW: number
  tW: number
}

const getTransformValues = (
  widths: GetTransformValuesProps,
  velocity: number,
  direction: string
) => {
  const { cW, tW } = widths

  // velocity = speed of translateX
  // emptyWidth = total width of empty spaces needed
  // totalWidth = total width of all 3 spans | tW + emptyWidth + tW
  const totalWidth = tW * 2

  const leftStart = 0
  const leftEnd = -(totalWidth - tW + cW * 0)

  return {
    totalWidth,
    animationTime: (totalWidth / velocity).toFixed(1),
    transform: {
      start: direction === LEFT ? leftStart : leftEnd,
      end: direction === LEFT ? leftEnd : leftStart,
    },
  }
}

export function Marquee({
  className = '',
  children,
  velocity = 100,
  direction = LEFT,
}) {
  const randomId = useMemo(() => genRandomId(), [])

  // from nextjs.org's landing page
  const [isReady, setIsReady] = useState(false)
  const [transformValues, setTransformValues] = useState({
    totalWidth: 0,
    animationTime: '0',
    transform: { start: 0, end: 0 },
  })

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
    if (containerNode && textNode) {
      setIsReady(true)
      setTransformValues(
        getTransformValues(
          {
            cW: containerNode.offsetWidth,
            tW: textNode.offsetWidth,
          },
          velocity,
          direction
        )
      )
    }
  }, [containerNode, textNode])

  const renderStyles = () =>
    isReady && (
      <style>
        {`
      @-moz-keyframes slide-${randomId} {
        from {
          -moz-transform: translateX(${transformValues.transform.start}px);
        }
        to {
          -moz-transform: translateX(${transformValues.transform.end}px);
        }
      }
      @-webkit-keyframes slide-${randomId} {
        from {
          -webkit-transform: translate(${transformValues.transform.start}px, 0);
        }
        to {
          -webkit-transform: translate(${transformValues.transform.end}px, 0);
        }
      }

      @keyframes slide-${randomId} {
        from {
          -moz-transform: translate(${transformValues.transform.start}px, 0);
          -webkit-transform: translate(${transformValues.transform.start}px, 0);
          transform: translate(${transformValues.transform.start}px, 0);
        }
        to {
          -moz-transform: translate(${transformValues.transform.end}px, 0);
          -webkit-transform: translate(${transformValues.transform.end}px, 0);
          transform: translate(${transformValues.transform.end}px, 0);
        }
      }
      `}
      </style>
    )

  const animation = `slide-${randomId} ${transformValues.animationTime}s linear infinite`

  return (
    <div
      className={classNames(
        className,
        'w-full overflow-hidden whitespace-nowrap'
      )}
    >
      {/* Reference | Hidden */}
      <div
        ref={containerRef}
        style={{
          whiteSpace: 'nowrap',
          position: 'absolute',
          visibility: 'hidden',
          overflow: 'hidden',
          top: '0',
          left: '0',
        }}
      >
        <div id="test" ref={textRef} className="inline-block">
          {children}
        </div>
      </div>

      {/* Actual showing */}
      <div
        style={{
          animation,
          transform: `translateX(${
            transformValues.transform[direction === LEFT ? 'start' : 'end']
          }px)`,
        }}
      >
        <div className="inline-block relative">{children}</div>
        <div className="inline-block relative">{children}</div>
      </div>
      {renderStyles()}
    </div>
  )
}
