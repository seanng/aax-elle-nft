import {
  OutlinedHeading,
  ActiveLeftIcon,
  MobilePrimaryButton,
  ActiveRightIcon,
  HowToHeartIcon,
} from 'components'
import { useEffect, useRef, useState } from 'react'
import { salePhase } from 'utils/config'
import { useIntersectionObserver } from 'hooks'
import { classNames } from 'utils/helpers'
import { NOT_STARTED, PRIVATE_SALE } from 'shared/constants'
import Link from 'next/link'

// const salePhase = PRIVATE_SALE

const privateSaleSteps = [
  {
    body: '從偶像的Instagram找到或由此連結進入填寫愛的訊息',
  },
  {
    body: '填寫訊息後將獲得白名單NFT',
  },
  {
    body: '將白名單NFT鑄造成Impact NFT會再獲得一張白名單NFT',
  },
  {
    body: '白名單NFT可以分享給朋友，讓他們鑄造屬於自己的Impact NFT',
  },
  {
    body: '分享Impact NFT的畫面至社群',
  },
]

const defaultSteps = [
  {
    heading: '寫下告白',
    body: '寫下愛並決定愛的價值，連結電子錢包，透過公益捐款救助受虐毛小孩',
  },
  {
    heading: '寫下告白',
    body: '寫下愛並決定愛的價值，連結電子錢包，透過公益捐款救助受虐毛小孩',
  },
  {
    heading: '寫下告白',
    body: '寫下愛並決定愛的價值，連結電子錢包，透過公益捐款救助受虐毛小孩',
  },
  {
    heading: '寫下告白',
    body: '寫下愛並決定愛的價值，連結電子錢包，透過公益捐款救助受虐毛小孩',
  },
]

export function HowToSection() {
  const [highlightedStepIdx, setHighlightedStepIdx] = useState(-1)

  const steps = [PRIVATE_SALE, NOT_STARTED].includes(salePhase)
    ? privateSaleSteps
    : defaultSteps

  return (
    <>
      <OutlinedHeading className="mb-10 md:mb-16" color="#FF66FF">
        具體來說怎麼玩？
      </OutlinedHeading>
      <div className="relative w-[340px] md:w-[700px] flex flex-col items-center border-x-2 border-dashed border-guava pb-12">
        {/* TOP */}
        <div className="flex pb-2">
          <div className="absolute w-20 md:w-60 border-t-2 border-dashed border-guava top-0 left-0" />
          <OutlinedHeading
            className="-mt-10 font-mono"
            fontSizeClass="text-5xl italic"
          >
            Start!
          </OutlinedHeading>
          <div className="absolute w-20 md:w-60 border-t-2 border-dashed border-guava top-0 right-0" />
        </div>
        {/* BODY */}
        {steps.map((props, i) => (
          <Step
            key={i}
            {...props}
            idx={i}
            highlightedStepIdx={highlightedStepIdx}
            setHighlightedStepIdx={setHighlightedStepIdx}
          />
        ))}
      </div>
      {/* BOTTOM */}
      <div className="relative flex justify-center w-[340px] md:w-[700px] mb-10 md:mb-20">
        <div className="absolute w-36 md:w-72 border-t-2 border-dashed border-guava top-0 left-0" />
        <HowToHeartIcon className="-mt-6" />
        <div className="absolute w-36 md:w-72 border-t-2 border-dashed border-guava top-0 right-0" />
      </div>
    </>
  )
}

function Step({
  idx = 0,
  heading = '',
  body = '',
  highlightedStepIdx,
  setHighlightedStepIdx,
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {
    threshold: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    rootMargin: '0px 0px -250px 0px',
  })
  const isVisible = !!entry?.isIntersecting
  const isHighlighted = highlightedStepIdx === idx
  const shouldShowCta = idx === 0 && salePhase === PRIVATE_SALE

  useEffect(() => {
    // scroll down
    if (isVisible && idx - highlightedStepIdx === 1) {
      setHighlightedStepIdx(idx)
    }

    // scroll up
    if (!isVisible && highlightedStepIdx === idx) {
      setHighlightedStepIdx(idx - 1)
    }
  }, [isVisible, highlightedStepIdx])

  return (
    <div ref={ref} className="flex justify-center items-center mb-4 md:-mr-2">
      <ActiveLeftIcon className={isHighlighted ? '' : 'hidden'} />
      <div
        className={classNames(
          'flex w-[270px] md:w-[630px]',
          isHighlighted ? 'border-2 border-lime' : 'border border-dark-gray'
        )}
      >
        <div
          className={classNames(
            'flex flex-none items-center justify-center border-r w-16 text-[28px] font-mono italic',
            isHighlighted
              ? 'border-lime bg-lime'
              : 'border-dark-gray text-dark-gray'
          )}
        >
          {`0${idx + 1}`}
        </div>
        <div className="block p-2 md:p-4">
          {heading && (
            <OutlinedHeading
              className="md:mb-2"
              fontSizeClass="text-[22px] md:text-3xl"
              color={isHighlighted ? 'white' : '#7D7676'}
            >
              {heading}
            </OutlinedHeading>
          )}
          <p
            className={classNames(
              isHighlighted ? 'text-white' : 'text-dark-gray',
              'leading-150% md:text-lg'
            )}
          >
            {body}
          </p>
          {shouldShowCta && (
            <div className="mt-2 md:mt-4 w-full text-center">
              <Link href="/mint">
                <MobilePrimaryButton>填寫表單</MobilePrimaryButton>
              </Link>
            </div>
          )}
        </div>
      </div>
      <ActiveRightIcon className={isHighlighted ? '' : 'hidden'} />
    </div>
  )
}
