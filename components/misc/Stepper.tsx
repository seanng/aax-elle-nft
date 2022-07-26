import { CheckIcon } from '@heroicons/react/solid'
import { StepWizardChildProps } from 'react-step-wizard'

const steps = [
  {
    step: 2,
    name: '告白',
  },
  {
    step: 3,
    name: '上鎖',
  },
  {
    step: 5,
    name: '鑄造',
  },
  {
    step: 6,
    name: '完成',
  },
]

export function Stepper({
  currentStep = 0,
}: Partial<StepWizardChildProps>): JSX.Element {
  if (currentStep === 1) return <></>
  return (
    <nav
      className="flex items-center justify-center mb-14"
      aria-label="Progress"
    >
      <ol role="list" className="ml-8 flex items-center space-x-3">
        {steps.map(({ name, step }, i) => (
          <li
            key={name}
            className={`flex items-center text-black space-x-1 ${
              currentStep >= step ? '' : ' opacity-30'
            }`}
          >
            {currentStep < step ? (
              <span className="block w-2.5 h-2.5 bg-black rounded-full mr-1" />
            ) : currentStep == step || (currentStep == 4 && step == 3) ? (
              <div className="relative flex items-center justify-center mr-1.5">
                <span className="absolute w-5 h-5 p-px flex" aria-hidden="true">
                  <span className="w-full h-full rounded-full bg-gray-300" />
                </span>
                <span
                  className="relative block w-2.5 h-2.5 bg-black rounded-full"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-black text-white rounded-full p-1 mr-0.5">
                <CheckIcon />
              </span>
            )}
            <span>{name}</span>
            {i < steps.length - 1 && (
              <hr
                className={`w-3 border-black ${
                  currentStep <= step || (currentStep === 4 && step === 3)
                    ? 'opacity-20'
                    : ''
                }`}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
