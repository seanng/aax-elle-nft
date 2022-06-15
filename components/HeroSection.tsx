import {
  Cactus,
  PoopFlower,
  HushHandSign,
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
  LayoutHeader,
  GreenBeard,
} from 'components'
import { HERO_CANVAS_HEIGHT, HERO_CANVAS_WIDTH } from 'shared/constants'

export function HeroSection(): JSX.Element {
  return (
    <>
      {/* <LayoutHeader /> */}
      <div className="section h-full w-full bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className={`w-full h-full relative`}
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
        </div>
      </div>
    </>
  )
}
