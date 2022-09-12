import {
  OutlinedHeading,
  ActiveLeftIcon,
  ActiveRightIcon,
  HowToHeartIcon,
} from 'components'
import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from 'hooks'
import { classNames } from 'utils/helpers'

const steps = [
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
    threshold: 1,
    rootMargin: '0px 0px -250px 0px',
  })
  const isVisible = !!entry?.isIntersecting
  const isHighlighted = highlightedStepIdx === idx

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
          <OutlinedHeading
            fontSizeClass="text-[22px] md:text-3xl md:mb-2"
            color={isHighlighted ? 'white' : '#7D7676'}
          >
            {heading}
          </OutlinedHeading>
          <p
            className={classNames(
              isHighlighted ? 'text-white' : 'text-dark-gray',
              'leading-150% md:text-lg'
            )}
          >
            {body}
          </p>
        </div>
      </div>
      <ActiveRightIcon className={isHighlighted ? '' : 'hidden'} />
    </div>
  )
}
