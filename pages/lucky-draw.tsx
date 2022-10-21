import { PrizeToken } from '@prisma/client'
import {
  MintLayout,
  NotConnectedView,
  OutlinedHeading,
  PrimaryButton,
  TokenInfoBox,
} from 'components'
import { useWeb3Context } from 'context'
import { shuffle } from 'utils/helpers'
import axios from 'lib/axios'
import { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { FINISHED, PUBLIC_SALE } from 'shared/constants'
import { luckyDrawable, salePhase, prizeNames } from 'utils/config'

const FETCHING = 'LOADING'
const NOT_CONNECTED = 'NOT_CONNECTED'
const READY = 'READY'
const FULL_ROTATIONS = 3

const reelItemsLength = prizeNames.length * FULL_ROTATIONS + FULL_ROTATIONS

const keyframes = [
  { transform: 'none', filter: 'blur(0)' },
  { filter: 'blur(1px)', offset: 0.5 },
  // "(Number of item - 1) * height of reel item" of wheel is the amount of pixel to move up
  {
    transform: `translateY(-${(reelItemsLength - 1) * (4 * 10)}px)`,
    filter: 'blur(0)',
  },
]

const transition = {
  duration: reelItemsLength * 100, // 100ms for 1 item
  easing: 'ease-in-out',
  iterations: 1,
}

const LuckyDrawPage: NextPage = () => {
  const [pageDisplay, setPageDisplay] = useState(FETCHING)
  const { prizeTokens, setPrizeTokens } = usePrizeTokens(setPageDisplay)
  const { reelItems, arrangeReel, clearOutLosers } = useReel()

  const canDraw = true

  // const canDraw = useMemo(
  //   () => luckyDrawable && prizeTokens.length > 0,
  //   [luckyDrawable, prizeTokens.length]
  // )

  const handleSpinClick = async () => {
    if (!canDraw) return

    arrangeReel('German Shepherd')
    // arrangeReel(prizeTokens[0].prizeName)

    // Animate
    const container = document.querySelector('#reel')
    const animation = container?.animate(keyframes, transition)

    if (!animation) {
      console.error('Could not start animation.')
      return
    }

    const animationPromise = new Promise((resolve) => {
      animation.onfinish = resolve
    })

    animation.play()
    await animationPromise
    animation.finish()

    // Remove non-winning prizes
    clearOutLosers()

    // TODO: shift 1 from prize token array

    // TODO: display congratuations modal and throw confetti
  }

  return (
    <>
      <MintLayout className="flex flex-col items-center">
        {!luckyDrawable && (
          <div className="font-mono font-medium text-xl text-center text-black bg-guava py-2 w-full mb-6 md:mb-10">
            抽獎第一波將於 12/24開始！
          </div>
        )}
        <OutlinedHeading fontSizeClass="text-3xl md:text-6xl mb-10 md:mb-16">
          ELLEverse 抽獎
        </OutlinedHeading>
        {pageDisplay === NOT_CONNECTED ? (
          <NotConnectedView />
        ) : (
          <>
            <TokenInfoBox
              isLoading={pageDisplay === FETCHING}
              tokens={prizeTokens}
              showsPrizeTokens
            />

            {/* Slot */}
            <div className="mt-10 md:mt-20 relative">
              <div className="relative text-center">
                <div className="w-full relative z-reel bg-black p-3 mx-auto mb-10">
                  <div className="w-full h-full bg-white overflow-hidden relative">
                    <div id="reel" className="h-10">
                      {reelItems.map((prizeName, i) => (
                        <div
                          key={prizeName + i}
                          className="text-center leading-10 text-black font-bold overflow-hidden whitespace-nowrap transform-gpu text-ellipsis"
                        >
                          {prizeName}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <PrimaryButton disabled={!canDraw} onClick={handleSpinClick} wide>
                開始抽獎！
              </PrimaryButton>
            </div>
          </>
        )}
      </MintLayout>
      {/* Congratulations modal */}
    </>
  )
}

export default LuckyDrawPage

const INITIAL_REEL = ['Start Spinning!']

function useReel() {
  const [reelItems, setReelItems] = useState<string[]>(INITIAL_REEL)

  const arrangeReel = (winningPrizeName) => {
    let prizeList = shuffle(prizeNames).concat([winningPrizeName])
    while (prizeList.length && prizeList.length < reelItemsLength) {
      prizeList = [...prizeList, ...prizeList]
    }
    setReelItems(prizeList)
  }

  const clearOutLosers = () => {
    setReelItems((items) => items.slice(-1))
  }

  const resetReel = () => {
    setReelItems(INITIAL_REEL)
  }

  return { reelItems, setReelItems, arrangeReel, clearOutLosers, resetReel }
}

function usePrizeTokens(setPageDisplay) {
  const [prizeTokens, setPrizeTokens] = useState<PrizeToken[]>([])
  const { address } = useWeb3Context()

  useEffect(() => {
    async function getPrizeTokensFromWallet() {
      try {
        setPageDisplay(FETCHING)
        const { data } = await axios.get(`/api/prize-tokens?address=${address}`)
        const validPrizeTokens = (data.data as PrizeToken[]).filter(
          (t) => !t.isPrivateSale && !t.openedAt && t.prizeName
        )
        // const shuffledPrizeNames = shuffle(prizeNames).concat([data])
        setPrizeTokens(validPrizeTokens)
        setPageDisplay(READY)
      } catch (error) {
        console.log('error: ', error)
        setPrizeTokens([])
        setPageDisplay(READY)
      }
    }
    if (!address) {
      setPageDisplay(NOT_CONNECTED)
      return
    }
    if (![FINISHED, PUBLIC_SALE].includes(salePhase)) {
      setPageDisplay(READY)
      return
    }
    getPrizeTokensFromWallet()
  }, [address])

  return { prizeTokens, setPrizeTokens }
}
