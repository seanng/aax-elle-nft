import React, { useEffect, useState } from 'react'

import { genRandomId } from 'utils/nft'

import Icon01 from 'components/NFT/shared/icons-small/01'
import Icon02 from 'components/NFT/shared/icons-small/02'
import Icon03 from 'components/NFT/shared/icons-small/03'

const compStyle = {
  position: 'absolute',
  width: '350px',
  height: '350px',
  padding: '37.5px',
} as React.CSSProperties

const innerWrapperStyle = {
  width: '100%',
  height: '100%',
}

const ROWS = 7
const COLS = 7
const GROUPS = 16
const ICONS_PER_GROUP = 3
const OFFSET_PERCENTAGE = 0.01
const BLINKS_ANIMATION_AMOUNT = 3
const GROUP_ANIMATION_DURATION = 2
const TOTAL_ANIMATION_DURATION = GROUPS * GROUP_ANIMATION_DURATION

const iconProps = {
  width: 275 / ROWS,
  height: 275 / COLS,
}

const initIcons = [
  [
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
  ],
  [
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
  ],
  [
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
  ],
  [
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
  ],
  [
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
  ],
  [
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
  ],
  [
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
    { id: '', Icon: Icon02 },
    { id: '', Icon: Icon03 },
    { id: '', Icon: Icon01 },
  ],
]

function CompsNFTBlinkingIcons({
  isImageCaptured,
  isCompReady,
  setIsCompReady,
}) {
  const [icons, setIcons] = useState(initIcons)

  useEffect(() => {
    if (!isCompReady) {
      setIcons(
        icons.map((row) => row.map((icon) => ({ ...icon, id: genRandomId() })))
      )
      setIsCompReady(true)
    }
  }, [icons, isCompReady, setIsCompReady])

  if (!isCompReady) return null

  const ids = icons
    .map((row) => row.map((icon) => `#${icon.id}`))
    .flat()
    .sort()
  const groupedIds = new Array(GROUPS)
    .fill(0)
    .map((_, i) =>
      ids.slice(i * ICONS_PER_GROUP, i * ICONS_PER_GROUP + ICONS_PER_GROUP)
    )

  return (
    <>
      <div
        id="comp-blinking-icons"
        className={isImageCaptured ? 'image-is-captured' : 'image-not-captured'}
        style={compStyle}
      >
        <div style={innerWrapperStyle}>
          {icons.map((row, i) => (
            <div key={i} style={{ display: 'flex' }}>
              {row.map(({ id, Icon }, j) => (
                <Icon key={`${i}${j}`} id={id} {...iconProps} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          #comp-blinking-icons svg {
            opacity: 0;
          }

          #comp-blinking-icons.image-is-captured svg {
            animation-play-state: running;
          }

          #comp-blinking-icons.image-not-captured svg {
            animation-play-state: paused;
          }

          ${groupedIds
            .map(
              (group, i) => `
                ${
                  i === 0
                    ? `
                    ${group
                      .map((id) => `.image-not-captured ${id}`)
                      .join(', ')} {
                      opacity: 1 !important;
                    }
                  `
                    : ''
                }

                ${group.join(', ')} {
                  animation: blink${i} ${TOTAL_ANIMATION_DURATION}s linear infinite;
                }
              `
            )
            .join('')}

          ${groupedIds
            .map((group, i) => {
              const animationTime = 100 / GROUPS
              const groupStartTime = i * animationTime
              const groupEndTime = groupStartTime + animationTime

              const blinkTime = animationTime / BLINKS_ANIMATION_AMOUNT

              return `
                @keyframes blink${i} {
                  ${groupStartTime}% { opacity: 0; }
                  ${Array(BLINKS_ANIMATION_AMOUNT)
                    .fill(0)
                    .map((_, j) => {
                      const groupShowTime =
                        groupStartTime + OFFSET_PERCENTAGE + j * blinkTime
                      const groupHideTime =
                        groupStartTime -
                        OFFSET_PERCENTAGE +
                        j * blinkTime +
                        blinkTime

                      return `
                        ${groupShowTime}% { opacity: 1; }
                        ${groupHideTime}% { opacity: 0; }
                      `
                    })
                    .join('')}
                  ${groupEndTime}% { opacity: 0; }
                }
              `
            })
            .join('')}
        `}
      </style>
    </>
  )
}

export default CompsNFTBlinkingIcons
