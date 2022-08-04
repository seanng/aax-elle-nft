import { StepWizardChildProps } from 'react-step-wizard'
import { StepperArrowRight, PinkLockIcon } from 'components'

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
  return (
    <nav
      className="flex items-center justify-center h-10"
      aria-label="Progress"
    >
      <div className="h-full w-11 bg-black flex justify-center items-center">
        <PinkLockIcon />
      </div>
      <ol
        role="list"
        className="flex items-center space-x-3 bg-lime px-4 h-full"
      >
        {steps.map(({ name, step }, i) => (
          <li key={name} className="flex items-center space-x-3">
            <span
              className={`leading-[150%] text-lg font-noto ${
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
      <div className="h-full w-11 bg-black flex justify-center items-center">
        <PinkLockIcon />
      </div>
    </nav>
  )
}
