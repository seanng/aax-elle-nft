import { PoopFlower, HushHandSign, PinkSunflower, RedMouth } from 'components'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'shared/constants'
// import { classNames } from 'utils/helpers'

export function HeroSection(): JSX.Element {
  return (
    <div className="section h-full w-full bg-black flex items-center justify-center">
      <div
        style={{ aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}
        className={`w-full relative max-w-[${CANVAS_WIDTH}px]`}
      >
        <RedMouth className="absolute m-auto left-0 right-0 top-0 bottom-0" />
        <HushHandSign className="absolute top-[55%] left-[48%]" />
        <PinkSunflower className="absolute left-[15%] bottom-0" />
        <PoopFlower className="absolute left-0 bottom-0" />
      </div>
    </div>
  )
}
