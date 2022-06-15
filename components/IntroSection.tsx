import {
  RedMouth,
  PacmanGhost,
  IntroBlueFlower,
  IntroWhiteScreen,
} from 'components'
import { INTRO_CANVAS_WIDTH, INTRO_CANVAS_HEIGHT } from 'shared/constants'
import { getWidthHeightPercentages } from 'utils/helpers'

const GREEN_TOP_MAX_HEIGHT = 135
const PINK_BOT_MAX_HEIGHT = 125

const greenTopHeight = `${(GREEN_TOP_MAX_HEIGHT / INTRO_CANVAS_HEIGHT) * 100}%`
const pinkBotHeight = `${(PINK_BOT_MAX_HEIGHT / INTRO_CANVAS_HEIGHT) * 100}%`

export function IntroSection(): JSX.Element {
  return (
    <div className="section h-full w-full bg-black relative overflow-hidden">
      <div
        // style={{ height: greenTopHeight, maxHeight: GREEN_TOP_MAX_HEIGHT }}
        className={`absolute bg-[#55F263] w-full top-0 h-[135px]`}
      />
      <div
        // style={{ height: pinkBotHeight, maxHeight: PINK_BOT_MAX_HEIGHT }}
        className={`absolute bg-[#FF66FF] w-full bottom-0 h-[125px]`}
      />
      <RedMouth
        className="absolute right-[43%] top-[7%]"
        {...getWidthHeightPercentages(
          1653,
          1030,
          INTRO_CANVAS_WIDTH,
          INTRO_CANVAS_HEIGHT
        )}
      />
      <IntroWhiteScreen className="absolute left-0 right-0 top-0 bottom-0 m-auto" />
      <PacmanGhost className="absolute top-[15%] left-[27%]" />
      <IntroBlueFlower
        className="absolute bottom-0 right-[2%]"
        {...getWidthHeightPercentages(
          550,
          504,
          INTRO_CANVAS_WIDTH,
          INTRO_CANVAS_HEIGHT
        )}
      />
      {/* shhh what secret? */}
    </div>
  )
}
