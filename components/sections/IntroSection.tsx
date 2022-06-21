import {
  RedMouth,
  PacmanGhost,
  WhiteScreenSmall,
  IntroBlueFlower,
  IntroWhiteScreen,
  BlackShh,
  BLCursorButton,
  PinkPetals,
} from 'components'
import { getWidthHeightPercentages } from 'utils/helpers'

const text = {
  button: '我想說個祕密...',
  heading: '噓……跟你說個秘密？',
  body1:
    '祕密，可能是，一句始終猶豫說出口的告白；一段混雜著傷疤與淚水的傾訴；是慾望是愛意是告解是祝福，總之，是那個總在心底蠢蠢欲動的一段話。',
  body2:
    'ELLE懂啊，這些情感需要出口，The Secret 祕密NFT能把你和他和世界的一段段故事，恆久封存於區塊鍊世界裡，永不消逝。腦中浮現了他的模樣？鼓起勇氣，做個祕密給他吧！',
}

export function IntroSection(): JSX.Element {
  return (
    <div className="section h-full w-full bg-black">
      <Desktop />
      <Mobile />
    </div>
  )
}

const pClassesMobile =
  'text-center font-medium text-base leading-[25px] w-[244px] m-auto'

function Mobile() {
  const dimensions = (w: number, h: number) =>
    getWidthHeightPercentages(w, h, 414, 660)

  return (
    <div className="w-full h-full relative md:hidden overflow-clip">
      <div className={`absolute bg-[#55F263] w-full top-0 h-[84px]`} />
      <div className={`absolute bg-[#FF66FF] w-full bottom-0 h-[70px]`} />
      <WhiteScreenSmall className="absolute top-0 bottom-0 right-0 left-0 m-auto" />
      <PinkPetals
        className="absolute -rotate-[25deg] top-[10%] -left-[10%]"
        {...dimensions(171, 155)}
      />
      <RedMouth
        className="absolute right-[30%] -bottom-[10%] rotate-12"
        {...dimensions(467, 312)}
      />
      <BlackShh
        className="absolute left-[24%] bottom-0"
        {...dimensions(293, 111)}
      />
      <PacmanGhost
        className="absolute top-[14%] right-[2%] rotate-[25deg]"
        {...dimensions(92, 83)}
      />
      <IntroBlueFlower
        className="absolute rotate-12 bottom-[8%] -right-[32%]"
        {...dimensions(202, 275)}
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 m-auto h-[370px]">
        <h1 className="text-center font-bold text-2xl pt-8 pb-2">
          {text.heading}
        </h1>
        <p className={pClassesMobile}>{text.body1}</p>
        <p className={pClassesMobile}>{text.body2}</p>
      </div>
      <div className="absolute bottom-[19%] left-0 right-0 mx-auto text-center">
        <BLCursorButton>{text.button}</BLCursorButton>
      </div>
    </div>
  )
}

const pClassesDesktop =
  'text-center font-medium text-2xl leading-[56px] w-[650px] m-auto'

function Desktop() {
  return (
    <div className="relative h-full w-full overflow-clip hidden md:block ">
      <div className={`absolute bg-[#55F263] w-full top-0 h-[135px]`} />
      <div className={`absolute bg-[#FF66FF] w-full bottom-0 h-[125px]`} />
      <RedMouth
        className="absolute -left-[650px] top-[50px]"
        height={1030}
        width={1653}
      />
      <IntroWhiteScreen className="absolute left-0 right-0 top-0 bottom-0 m-auto" />
      <PacmanGhost className="absolute top-[8%] left-[27%]" />
      <IntroBlueFlower className="absolute bottom-0 left-[80%]" />
      <div className="absolute bottom-[20%] left-0 right-0 mx-auto text-center">
        <BLCursorButton>{text.button}</BLCursorButton>
      </div>
      <PinkPetals className="absolute top-[7px] left-[81%]" />
      <BlackShh className="absolute left-[8%] bottom-[2%]" />
      <div className="absolute top-[25%] left-0 right-0 mx-auto h-[400px]">
        <h1 className="text-center font-black text-5xl pt-8 pb-5">
          {text.heading}
        </h1>
        <p className={pClassesDesktop}>{text.body1}</p>
        <p className={pClassesDesktop}>{text.body2}</p>
      </div>
    </div>
  )
}