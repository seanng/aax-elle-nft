import React, { useEffect, useState } from 'react'

import { genRandomId } from 'utils/nft'

import Icon01 from 'components/NFT/shared/icons-small/01'
import Icon02 from 'components/NFT/shared/icons-small/02'
import Icon03 from 'components/NFT/shared/icons-small/03'
import Icon04 from 'components/NFT/shared/icons-small/04'
import Icon05 from 'components/NFT/shared/icons-small/05'
import Icon06 from 'components/NFT/shared/icons-small/06'
import Icon07 from 'components/NFT/shared/icons-small/07'
import Icon08 from 'components/NFT/shared/icons-small/08'
import Icon09 from 'components/NFT/shared/icons-small/09'
import Icon10 from 'components/NFT/shared/icons-small/10'
import Icon11 from 'components/NFT/shared/icons-small/11'
import Icon12 from 'components/NFT/shared/icons-small/12'
import Icon13 from 'components/NFT/shared/icons-small/13'
import Icon14 from 'components/NFT/shared/icons-small/14'
import Icon15 from 'components/NFT/shared/icons-small/15'
import Icon16 from 'components/NFT/shared/icons-small/16'
import Icon17 from 'components/NFT/shared/icons-small/17'
import Icon18 from 'components/NFT/shared/icons-small/18'
import Icon19 from 'components/NFT/shared/icons-small/19'
import Icon20 from 'components/NFT/shared/icons-small/20'
import Icon21 from 'components/NFT/shared/icons-small/21'
import Icon22 from 'components/NFT/shared/icons-small/22'
import Icon23 from 'components/NFT/shared/icons-small/23'
import Icon24 from 'components/NFT/shared/icons-small/24'
import Icon25 from 'components/NFT/shared/icons-small/25'
import Icon26 from 'components/NFT/shared/icons-small/26'
import Icon27 from 'components/NFT/shared/icons-small/27'
import Icon28 from 'components/NFT/shared/icons-small/28'
import Icon29 from 'components/NFT/shared/icons-small/29'
import Icon30 from 'components/NFT/shared/icons-small/30'
import Icon31 from 'components/NFT/shared/icons-small/31'
import Icon32 from 'components/NFT/shared/icons-small/32'
import Icon33 from 'components/NFT/shared/icons-small/33'
import Icon34 from 'components/NFT/shared/icons-small/34'
import Icon35 from 'components/NFT/shared/icons-small/35'
import Icon36 from 'components/NFT/shared/icons-small/36'
import Icon37 from 'components/NFT/shared/icons-small/37'
import Icon38 from 'components/NFT/shared/icons-small/38'
import Icon39 from 'components/NFT/shared/icons-small/39'
import Icon40 from 'components/NFT/shared/icons-small/40'
import Icon41 from 'components/NFT/shared/icons-small/41'
import Icon42 from 'components/NFT/shared/icons-small/42'
import Icon43 from 'components/NFT/shared/icons-small/43'
import Icon44 from 'components/NFT/shared/icons-small/44'
import Icon45 from 'components/NFT/shared/icons-small/45'
import Icon46 from 'components/NFT/shared/icons-small/46'
import Icon47 from 'components/NFT/shared/icons-small/47'
import Icon48 from 'components/NFT/shared/icons-small/48'
import Icon49 from 'components/NFT/shared/icons-small/49'

const compStyle = {
  position: 'absolute',
  width: '350px',
  height: '350px',
  padding: '35px',
  boxSizing: 'border-box',
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
    { id: '', Icon: Icon04 },
    { id: '', Icon: Icon05 },
    { id: '', Icon: Icon06 },
    { id: '', Icon: Icon07 },
  ],
  [
    { id: '', Icon: Icon08 },
    { id: '', Icon: Icon09 },
    { id: '', Icon: Icon10 },
    { id: '', Icon: Icon11 },
    { id: '', Icon: Icon12 },
    { id: '', Icon: Icon13 },
    { id: '', Icon: Icon14 },
  ],
  [
    { id: '', Icon: Icon15 },
    { id: '', Icon: Icon16 },
    { id: '', Icon: Icon17 },
    { id: '', Icon: Icon18 },
    { id: '', Icon: Icon19 },
    { id: '', Icon: Icon20 },
    { id: '', Icon: Icon21 },
  ],
  [
    { id: '', Icon: Icon22 },
    { id: '', Icon: Icon23 },
    { id: '', Icon: Icon24 },
    { id: '', Icon: Icon25 },
    { id: '', Icon: Icon26 },
    { id: '', Icon: Icon27 },
    { id: '', Icon: Icon28 },
  ],
  [
    { id: '', Icon: Icon29 },
    { id: '', Icon: Icon30 },
    { id: '', Icon: Icon31 },
    { id: '', Icon: Icon32 },
    { id: '', Icon: Icon33 },
    { id: '', Icon: Icon34 },
    { id: '', Icon: Icon35 },
  ],
  [
    { id: '', Icon: Icon36 },
    { id: '', Icon: Icon37 },
    { id: '', Icon: Icon38 },
    { id: '', Icon: Icon39 },
    { id: '', Icon: Icon40 },
    { id: '', Icon: Icon41 },
    { id: '', Icon: Icon42 },
  ],
  [
    { id: '', Icon: Icon43 },
    { id: '', Icon: Icon44 },
    { id: '', Icon: Icon45 },
    { id: '', Icon: Icon46 },
    { id: '', Icon: Icon47 },
    { id: '', Icon: Icon48 },
    { id: '', Icon: Icon49 },
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
