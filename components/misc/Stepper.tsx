import { StepWizardChildProps } from 'react-step-wizard'
import {
  OutlinedHeading,
  Marquee,
  StepperArrowRight,
  PinkLockIcon,
} from 'components'
import { salePhase } from 'utils/config'
import { FINISHED } from 'shared/constants'

const steps = [
  {
    step: 1,
    name: '告白',
  },
  {
    step: 2,
    name: '上鎖',
  },
  {
    step: 4,
    name: '鑄造',
  },
  {
    step: 5,
    name: '完成',
  },
]

export function Stepper({
  currentStep = 0,
}: Partial<StepWizardChildProps>): JSX.Element {
  if (salePhase === FINISHED) {
    return (
      <div
        className="relative text-center h-11 bg-tomato text-tomato font-mono font-medium italic text-4xl w-full leading-120% overflow-hidden px-6 "
        style={{
          textShadow:
            '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black',
        }}
      >
        告白活動已結束！
      </div>
    )
  }

  if (currentStep === 5) return <></>

  return (
    <>
      <Marquee>
        <div
          className="h-11 bg-guava text-guava font-mono font-medium italic text-4xl leading-120%"
          style={{
            textShadow:
              '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black',
          }}
        >
          Ready to tell your Secret?&nbsp;&nbsp;&nbsp;Ready to tell your
          Secret?&nbsp;&nbsp;&nbsp;Ready to tell your Secret?&nbsp;&nbsp;&nbsp;
        </div>
      </Marquee>

      <nav
        className="flex items-center justify-center h-10 md:h-14 md:mt-8"
        aria-label="Progress"
      >
        <div className="hidden xs:flex h-full w-11 bg-black justify-center items-center">
          <PinkLockIcon />
        </div>
        <ol
          role="list"
          className="flex items-center space-x-3 md:space-x-6 bg-lime px-4 md:px-6 md:mx-5 h-full"
        >
          {steps.map(({ name, step }, i) => (
            <li key={name} className="flex items-center space-x-3 md:space-x-6">
              <span
                className={`leading-150% text-lg md:text-2xl font-noto ${
                  currentStep >= step ? 'text-black' : 'text-white'
                }`}
              >
                {name}
              </span>
              {i < steps.length - 1 && (
                <StepperArrowRight
                  fill={currentStep < step ? 'white' : 'black'}
                />
              )}
            </li>
          ))}
        </ol>
        <div className="hidden xs:flex h-full w-11 bg-black justify-center items-center">
          <PinkLockIcon />
        </div>
      </nav>
    </>
  )
}
