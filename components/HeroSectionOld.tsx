import { useEffect } from 'react'
import {
  Raindrops,
  HushHandSign,
  RedMouth,
  PinkSunflower,
  PoopFlower,
} from 'components'
import { motion, useAnimation } from 'framer-motion'
import { classNames } from 'utils/helpers'

interface Props {
  activeIndex: number
  previousIndex: number
}

// motion variants
const container = {
  visible: {},
  hidden: {},
}

const scales = 'scale-50 sm:scale-75 md:scale-90 lg:transform-none absolute'

export function HeroSectionOld({
  activeIndex,
  previousIndex,
}: Props): JSX.Element {
  const control1 = useAnimation()
  const control2 = useAnimation()

  const animateAll = async () => {
    await control1.start('visible')
    await control2.start('visible')
  }
  const hideAll = () => {
    control1.start('hidden')
    control2.start('hidden')
  }

  useEffect(() => {
    if (activeIndex === 0) animateAll()
    else hideAll()
  }, [activeIndex])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex items-center justify-center w-full h-full max-w-[1287px] max-h-[897px]">
        <RedMouth
          className={scales}
          animate={control1}
          initial="hidden"
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          transition={{ type: 'spring', duration: 0.5 }}
        />
        <Raindrops className={classNames(scales, 'left-[25%] top-[30%]')} />
        <PinkSunflower
          className={classNames(scales, 'left-0 bottom-0 md:left-[10%]')}
          animate={control2}
          initial="hidden"
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        />
        <HushHandSign
          className={classNames(
            scales,
            'top-[43%] ml-[100px] sm:top-[50%] sm:ml-[120px] md:top-[55%] md:ml-[150px]'
          )}
        />
        <PoopFlower
          className={classNames(
            scales,
            'left-0 bottom-24 sm:bottom-16 md:bottom-0'
          )}
        />
      </div>
    </div>
  )
}
