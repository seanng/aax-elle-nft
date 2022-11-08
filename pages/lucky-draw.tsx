import {
  MintLayout,
  NotConnectedView,
  OutlinedHeading,
  CongratsModal,
  PrimaryButton,
  HeartIcon,
  FormErrorIcon,
} from 'components'
import { useForm } from 'react-hook-form'
import { NextPage } from 'next'
import { useMemo, useState } from 'react'
import { EMAIL_REGEX, FETCHING, NOT_CONNECTED } from 'shared/constants'
import confetti from 'canvas-confetti'
import { useIsMobile, usePrizeTokens } from 'hooks'
import { emailTemplateIds, luckyDrawable, reelRotations } from 'utils/config'
import { prizeList } from 'data'
import { theme } from '../tailwind.config'
import { useReel } from 'hooks/useReel'
import Image from 'next/image'
import { isBrowser } from 'utils/helpers'
import axios from 'lib/axios'

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

const EMAIL_MODE = 'email_mode'
const STORING_MODE = 'storing_mode'
const REEL_MODE = 'reel_mode'

const initialBoxState = luckyDrawable ? EMAIL_MODE : REEL_MODE

const LuckyDrawPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [pageDisplay, setPageDisplay] = useState(FETCHING)
  const [boxState, setBoxState] = useState(initialBoxState)
  const [winningPrizeName, setWinningPrizeName] = useState('')

  const { prizeTokens, consumePrizeToken } = usePrizeTokens(setPageDisplay)
  const { reelItems, arrangeReel, clearOutLosers, resetReel } = useReel()
  const isMobile = useIsMobile()

  const {
    handleSubmit,
    register,
    getValues,
    formState: { isDirty, isValid, errors },
  } = useForm({ mode: 'onChange' })

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

    customConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      scalar: Math.max(0.5, Math.min(1, windowWidth / 1100)),
    })
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

  const spin = async () => {
    const { email } = getValues()
    if (!email) throw new Error('No Email Stored')
    if (!canDraw)
      throw new Error(
        'Cannot spin. There are either no prize tokens left or the reel is already spinning.'
      )
    const prizeToken = prizeTokens[0]
    if (!prizeToken.prizeName)
      throw new Error('Cannot spin due to Error Code 9669')
    setIsSpinning(true)
    setWinningPrizeName(prizeToken.prizeName)
    arrangeReel(prizeToken.prizeName)
    consumePrizeToken()
    await _animateSpin()
    clearOutLosers()
    await axios.post(`/api/prize-tokens/${prizeToken.id}`, {
      email,
      templateId: emailTemplateIds['PRIZE_WON'],
    })
    setIsSpinning(false)
    setIsModalOpen(true)
    confettiAnimation()
  }

  const onEmailAddressSave = async ({ email }) => {
    setBoxState(STORING_MODE)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setBoxState(REEL_MODE)
  }

  const handleModalClose = () => {
    resetReel()
    setIsModalOpen(false)
  }

  return (
    <>
      <MintLayout className="flex flex-col items-center">
        {/* {!luckyDrawable && (
          <div className="font-mono font-medium text-xl text-center text-black bg-guava py-2 w-full mb-6 md:mb-10">
            抽獎第一波將於 12/24開始！
          </div>
        )} */}
        {pageDisplay === NOT_CONNECTED ? (
          <NotConnectedView />
        ) : (
          <form onSubmit={handleSubmit(onEmailAddressSave)}>
            <div className="relative w-[300px] md:w-[600px] lg:w-[960px] border-x-2 border-guava border-dashed flex flex-col items-center mt-20">
              {/* TOP */}
              <div className="flex pb-2">
                <div className="absolute top-0 left-0 w-8 md:w-24 lg:w-72 border-t-2 border-dashed border-guava" />
                <OutlinedHeading className="tracking-wider -mt-6 md:-mt-7">
                  ELLEverse 抽獎
                </OutlinedHeading>
                <div className="absolute top-0 right-0 w-8 md:w-24 lg:w-72 border-t-2 border-dashed border-guava" />
              </div>

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
              {
                {
                  [EMAIL_MODE]: (
                    <div className="w-80 md:w-96">
                      <input
                        id="email"
                        type="text"
                        placeholder="Your email"
                        className="text-black md:text-2xl border-lime font-mono placeholder-slate-500 bg-lime border-transparent focus:border-transparent focus:ring-0 w-full mb-2"
                        {...register('email', {
                          required: true,
                          pattern: {
                            value: EMAIL_REGEX,
                            message: '!',
                          },
                        })}
                      />
                      {errors?.email?.message && (
                        <div className="flex items-center">
                          <FormErrorIcon />
                          <span className="ml-2 text-sm md:text-base">
                            Email 格式不正確
                          </span>
                        </div>
                      )}
                    </div>
                  ),
                  [STORING_MODE]: (
                    <Image
                      src="/images/loading-icon.gif"
                      layout="fixed"
                      height={104}
                      width={104}
                    />
                  ),
                  [REEL_MODE]: (
                    <div className="flex justify-between w-full items-center">
                      <div className="flex items-center -ml-4 md:-ml-9">
                        <HeartIcon
                          width={isMobile ? 30 : 74}
                          height={isMobile ? 30 : 74}
                          color="#55F263"
                        />
                        <div className="h-1 w-7 md:h-2 md:w-12 lg:w-24 -ml-1 bg-lime" />
                      </div>

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

                      <div className="flex items-center -mr-4 md:-mr-9">
                        <div className="h-1 w-7 md:h-2 md:w-12 lg:w-24 -mr-1 bg-lime" />
                        <HeartIcon
                          width={isMobile ? 30 : 74}
                          height={isMobile ? 30 : 74}
                          color="#55F263"
                        />
                      </div>
                    </div>
                  ),
                }[boxState || EMAIL_MODE]
              }

              {/* BOTTOM */}
              <div className="flex mt-16 md:mt-24">
                <div className="absolute bottom-0 left-0 w-5 md:w-36 lg:w-80 border-t-2 border-dashed border-guava" />
                <div className="-mb-5 md:-mb-8">
                  {boxState === REEL_MODE ? (
                    <PrimaryButton
                      type="button"
                      disabled={!canDraw}
                      onClick={spin}
                      wide
                    >
                      開始抽獎！
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      type="submit"
                      disabled={!isValid || !isDirty || boxState !== EMAIL_MODE}
                      wide
                    >
                      送出
                    </PrimaryButton>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-5 md:w-36 lg:w-80 border-t-2 border-dashed border-guava" />
              </div>
            </div>
          </form>
        )}
      </MintLayout>
      <CongratsModal
        prizeName={winningPrizeName}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
      <canvas
        id="confetti-canvas"
        className="fixed w-full h-full top-0 left-0 z-confetti pointer-events-none"
      />
    </>
  )
}

export default LuckyDrawPage
