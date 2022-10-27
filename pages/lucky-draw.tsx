import {
  MintLayout,
  NotConnectedView,
  OutlinedHeading,
  CongratsModal,
  PrimaryButton,
} from 'components'
import { NextPage } from 'next'
import { useMemo, useState } from 'react'
import { FETCHING, NOT_CONNECTED } from 'shared/constants'
import confetti from 'canvas-confetti'
import { useIsMobile, usePrizeTokens } from 'hooks'
import { luckyDrawable, reelRotations } from 'utils/config'
import { prizeList } from 'data'
import { theme } from '../tailwind.config'
import { useReel } from 'hooks/useReel'
import Image from 'next/image'
import { isBrowser } from 'utils/helpers'

const [reelHeightMobile, reelHeightDesktop] = [
  theme.extend.spacing['reel-height-mobile'],
  theme.extend.spacing['reel-height-desktop'],
]

// Add another x rotations to account for the winning prize
const reelItemsLength = prizeList.length * reelRotations + reelRotations

const getKeyFrames = (reelHeight: number) => [
  { transform: 'none', filter: 'blur(0)' },
  { filter: 'blur(1px)', offset: 0.5 },
  // "(Number of item - 1) * height of reel item" of wheel is the amount of pixel to move up
  {
    transform: `translateY(-${reelItemsLength * reelHeight}px)`,
    filter: 'blur(0)',
  },
]

const transition = {
  duration: reelItemsLength * 100, // 100ms for 1 item
  easing: 'ease-in-out',
  iterations: 1,
}

const CONFETTI_COLORS = [
  '#26ccff',
  '#a25afd',
  '#ff5e7e',
  '#88ff5a',
  '#fcff42',
  '#ffa62d',
  '#ff36ff',
]

const LuckyDrawPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [isSpinning, setIsSpinning] = useState(false)
  const [pageDisplay, setPageDisplay] = useState(FETCHING)
  const [confettiAnimationId, setConfettiAnimationId] = useState<any>(null)
  const { prizeTokens, consumePrizeToken } = usePrizeTokens(setPageDisplay)
  const { reelItems, arrangeReel, clearOutLosers, resetReel } = useReel()
  const isMobile = useIsMobile()

  const canDraw = useMemo(
    () => luckyDrawable && !isSpinning && prizeTokens.length > 0,
    [luckyDrawable, isSpinning, prizeTokens.length]
  )

  const confettiAnimation = () => {
    if (!isBrowser) throw new Error('Window object not detected.')

    const confettiCanvas = document.getElementById(
      'confetti-canvas'
    ) as HTMLCanvasElement | null

    if (!(confettiCanvas instanceof HTMLCanvasElement)) {
      throw new Error(
        'Confetti canvas is not an instance of Canvas. This is possibly a bug.'
      )
    }

    const customConfetti = confetti.create(confettiCanvas, {
      resize: true,
      useWorker: true,
    })

    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName('body')[0].clientWidth

    const confettiScale = Math.max(0.5, Math.min(1, windowWidth / 1100))

    customConfetti({
      particleCount: 1,
      gravity: 0.8,
      spread: 90,
      origin: { y: 0.6 },
      colors: [
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      ],
      scalar: confettiScale,
    })

    setConfettiAnimationId(window.requestAnimationFrame(confettiAnimation))
  }

  const _animateSpin = async () => {
    const container = document.querySelector('#reel')
    const reelHeightPx = isMobile ? reelHeightMobile : reelHeightDesktop
    const reelHeightNum = Number(reelHeightPx.slice(0, -2))

    const animation = container?.animate(
      getKeyFrames(reelHeightNum),
      transition
    )

    if (!animation) {
      throw new Error('Could not start animation.')
    }

    const animationPromise = new Promise((resolve) => {
      animation.onfinish = resolve
    })

    animation.play()
    await animationPromise
    animation.finish()
  }

  const handleSpinClick = async () => {
    if (!canDraw) return
    setIsSpinning(true)
    const winningPrize = prizeTokens[0].prizeName
    arrangeReel(winningPrize)
    consumePrizeToken()
    await _animateSpin()
    clearOutLosers()
    confettiAnimation()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSpinning(false)
    // display modal
    setIsModalOpen(true)
    // send email to inputted email
  }

  const handleModalClose = () => {
    if (confettiAnimationId) window.cancelAnimationFrame(confettiAnimationId)
    resetReel()
    setIsModalOpen(false)
  }

  return (
    <>
      <MintLayout className="flex flex-col items-center">
        {!luckyDrawable && (
          <div className="font-mono font-medium text-xl text-center text-black bg-guava py-2 w-full mb-6 md:mb-10">
            抽獎第一波將於 12/24開始！
          </div>
        )}
        {pageDisplay === NOT_CONNECTED ? (
          <NotConnectedView />
        ) : (
          <>
            {/* Slot */}
            <div className="relative w-[300px] md:w-[600px] lg:w-[960px] border-x-2 border-guava border-dashed flex flex-col items-center mt-20">
              {/* TOP */}
              <div className="flex pb-2">
                <div className="absolute top-0 left-0 w-8 md:w-24 lg:w-72 border-t-2 border-dashed border-guava" />
                <OutlinedHeading className="tracking-wider -mt-6 md:-mt-7">
                  ELLEverse 抽獎
                </OutlinedHeading>
                <div className="absolute top-0 right-0 w-8 md:w-24 lg:w-72 border-t-2 border-dashed border-guava" />
              </div>
              {/* BODY */}

              {/* Token Info Box */}
              <div className="md:flex text-center items-center py-14 md:py-24">
                <Image
                  height={isMobile ? 55 : 98}
                  width={isMobile ? 55 : 98}
                  src="/images/prize-token.svg"
                />
                <p className="font-cubic text-2xl mt-2 md:mt-0 md:text-4xl md:ml-7 text-white">
                  {pageDisplay === FETCHING ? (
                    '正在檢查抽獎卷......'
                  ) : (
                    <span>
                      你有{' '}
                      <span className="text-guava">{prizeTokens.length}</span>{' '}
                      張抽獎卷
                    </span>
                  )}
                </p>
              </div>

              {/* REEL */}
              <div className="flex justify-center items-center">
                <div className="border-4 border-lime w-[220px] md:w-[440px] lg:w-[715px] p-1 md:p-3">
                  <div className="w-full relative overflow-hidden border-2 border-dashed border-lime">
                    <div
                      id="reel"
                      className="h-reel-height-mobile md:h-reel-height-desktop relative"
                    >
                      {reelItems}
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="flex mt-16 md:mt-24">
                <div className="absolute bottom-0 left-0 w-5 md:w-36 lg:w-80 border-t-2 border-dashed border-guava" />
                <div className="-mb-5 md:-mb-8">
                  <PrimaryButton
                    disabled={!canDraw}
                    onClick={handleSpinClick}
                    wide
                  >
                    開始抽獎！
                  </PrimaryButton>
                </div>
                <div className="absolute bottom-0 right-0 w-5 md:w-36 lg:w-80 border-t-2 border-dashed border-guava" />
              </div>
            </div>
          </>
        )}
      </MintLayout>
      <CongratsModal
        prizeName="German Shepherd"
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
      {/* Congratulations modal */}
      <canvas
        id="confetti-canvas"
        className="fixed w-full h-full top-0 left-0 z-confetti pointer-events-none"
      />
    </>
  )
}

export default LuckyDrawPage
