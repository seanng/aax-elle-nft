import { ReactNode, useState } from 'react'
import { shuffle } from 'utils/helpers'
import { reelRotations } from 'utils/config'
import { ReelItem, ReelCover } from 'components'
import { prizeList } from 'data'

const INITIAL_REEL = [<ReelCover key="initial" />]

const reelItemsLength = prizeList.length * reelRotations + reelRotations

export function useReel() {
  const [reelItems, setReelItems] = useState<ReactNode[]>(INITIAL_REEL)

  const arrangeReel = (winningPrizeName) => {
    let prizes = shuffle(prizeList).concat([winningPrizeName])
    while (prizes.length && prizes.length < reelItemsLength) {
      prizes = [...prizes, ...prizes]
    }
    setReelItems(
      INITIAL_REEL.concat(
        prizes.map((prizeName, i) => <ReelItem key={i}>{prizeName}</ReelItem>)
      )
    )
  }

  const clearOutLosers = () => {
    setReelItems((items) => items.slice(-1))
  }

  const resetReel = () => {
    setReelItems(INITIAL_REEL)
  }

  return { reelItems, setReelItems, arrangeReel, clearOutLosers, resetReel }
}
