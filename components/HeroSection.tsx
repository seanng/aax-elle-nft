import { useEffect } from 'react'
import { RedLips, PinkSunFlower } from 'components'
import { motion, useAnimation } from 'framer-motion'

interface Props {
  activeIndex: number
  previousIndex: number
}

// motion variants
const container = {
  visible: {},
  hidden: {},
}

export function HeroSection({
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
    <div className="relative flex h-full w-full items-center justify-center">
      <PinkSunFlower
        className="w-12 h-12 absolute top-[40%] left-[40%]"
        animate={control2}
        initial="hidden"
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
      />
      <RedLips
        className="w-36 h-36"
        animate={control1}
        initial="hidden"
        variants={{
          visible: { scale: 1, x: 0 },
          hidden: { scale: 0.5, x: -25 },
        }}
        transition={{ type: 'spring', duration: 0.5 }}
      />
    </div>
  )
}
