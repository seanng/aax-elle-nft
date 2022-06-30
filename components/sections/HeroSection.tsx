import {
  Cactus,
  PacManSmall,
  PoopFlower,
  BLCursorButton,
  HushHandSign,
  PoopSmall,
  PinkSunflower,
  RedMouth,
  ElleFanned,
  YellowSunflower,
  YellowShh,
  BowlingStick,
  Lolipop,
  RocketShoot,
  Hearts,
  Telephone,
  TellYou,
  ASecret,
  PinkSunflowerSmall,
  GiftboxSmall,
  GreenBeard,
  TRCursorButton,
} from 'components'
import { HERO_CANVAS_HEIGHT, HERO_CANVAS_WIDTH } from 'shared/constants'
import Image from 'next/image'
import { getWidthHeightPercentages } from 'utils/helpers'

export function HeroSection(): JSX.Element {
  return (
    <>
      <div className="section h-full w-full bg-black flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <Desktop />
        <Mobile />
      </div>
    </>
  )
}

// 660

const MOBILE_WIDTH = 414
const MOBILE_HEIGHT = 660
const MOBILE_CANVAS1_HEIGHT = 359
const MOBILE_CANVAS2_HEIGHT = 174

function Mobile() {
  const dimensions = (w: number, h: number, ch: number) =>
    getWidthHeightPercentages(w, h, MOBILE_WIDTH, ch)

  return (
    <div className="flex flex-col items-center w-full h-full pt-[142px] md:hidden">
      <div
        style={{ height: `${(82 / MOBILE_HEIGHT) * 100}%` }}
        className="relative w-[206px]"
      >
        <Image
          priority
          src="/logos/elle-white.png"
          layout="fill"
          alt="ELLE"
          objectFit="contain"
        />
      </div>
      <div
        style={{ height: `${(MOBILE_CANVAS1_HEIGHT / MOBILE_HEIGHT) * 100}%` }}
        className="relative w-full mt-10"
      >
        <RocketShoot
          className="absolute top-[3%] left-[46%]"
          {...dimensions(170, 181, MOBILE_CANVAS1_HEIGHT)}
        />
        <Telephone
          className="absolute left-[68%] bottom-[9%]"
          {...dimensions(178, 65, MOBILE_CANVAS1_HEIGHT)}
        />
        <Lolipop
          className="absolute left-[30%] bottom-[4%]"
          {...dimensions(318, 87, MOBILE_CANVAS1_HEIGHT)}
        />
        <GiftboxSmall
          className="absolute left-[18%] top-[60%]"
          {...dimensions(53, 57, MOBILE_CANVAS1_HEIGHT)}
        />
        <GreenBeard
          className="absolute top-[17%] left-[15%]"
          {...dimensions(51, 46, MOBILE_CANVAS1_HEIGHT)}
        />
        <YellowSunflower
          className="absolute top-[15%] left-[29%]"
          {...dimensions(57, 52, MOBILE_CANVAS1_HEIGHT)}
        />
        <Hearts
          className="absolute left-[10%] top-[55%]"
          {...dimensions(45, 50, MOBILE_CANVAS1_HEIGHT)}
        />
        <Cactus
          className="absolute top-[17%] right-[13%]"
          {...dimensions(125, 127, MOBILE_CANVAS1_HEIGHT)}
        />
        <RedMouth
          className="absolute m-auto left-0 right-0 top-0 bottom-0"
          {...dimensions(246, 154, MOBILE_CANVAS1_HEIGHT)}
        />
        <YellowShh
          className="absolute left-[63%] top-[45%]"
          {...dimensions(192, 183, MOBILE_CANVAS1_HEIGHT)}
        />
        <HushHandSign
          className="absolute left-[48%] top-[55%]"
          {...dimensions(95, 141, MOBILE_CANVAS1_HEIGHT)}
        />
        <BowlingStick
          className="absolute right-[1%] top-[52%]"
          {...dimensions(52, 64, MOBILE_CANVAS1_HEIGHT)}
        />
      </div>
      <div
        style={{ height: `${(MOBILE_CANVAS2_HEIGHT / MOBILE_HEIGHT) * 100}%` }}
        className="relative w-full overflow-clip"
      >
        <PinkSunflowerSmall className="absolute top-0 left-[2%]" />
        <PoopSmall className="absolute bottom-1 right-0" />
        <PacManSmall className="absolute bottom-1 right-[27%]" />
        <div className="absolute top-[30%] left-0 right-0 mx-auto text-center">
          <TRCursorButton>我想說個祕密...</TRCursorButton>
        </div>
      </div>
    </div>
  )
}

function Desktop() {
  return (
    <div
      className={`w-full h-full relative hidden md:block`}
      style={{
        maxHeight: `calc(${HERO_CANVAS_HEIGHT} / ${HERO_CANVAS_WIDTH} * 100vw)`,
        maxWidth: `calc(${HERO_CANVAS_WIDTH} / ${HERO_CANVAS_HEIGHT} * 100vh)`,
      }}
    >
      <RocketShoot className="absolute top-[3%] left-[46%]" />
      <ElleFanned className="absolute top-[7%]" />
      <GreenBeard className="absolute top-[17%] left-[22%]" />
      <Cactus className="absolute top-[15%] right-[23%]" />
      <RedMouth className="absolute m-auto left-0 right-0 top-0 bottom-0" />
      <Lolipop className="absolute right-[3%] bottom-[7%]" />
      <HushHandSign className="absolute top-[55%] left-[48%]" />
      <PinkSunflower className="absolute left-[12%] bottom-0" />
      <PoopFlower className="absolute left-[9%] bottom-0" />
      <YellowSunflower className="absolute top-[16%] left-[33%]" />
      <BowlingStick className="absolute top-[52%] right-[7%]" />
      <Hearts className="absolute right-[4%] bottom-[23%]" />
      <Telephone className="absolute right-[1%] bottom-[12%]" />
      <YellowShh className="absolute top-[44%] right-[2%]" />
      <TellYou className="absolute left-[80%] top-[10%]" />
      <ASecret className="absolute left-[80%] top-[17%]" />
      <div className="absolute right-[53%] top-[52%] mx-auto text-center">
        <TRCursorButton>我想說個祕密...</TRCursorButton>
      </div>
    </div>
  )
}
