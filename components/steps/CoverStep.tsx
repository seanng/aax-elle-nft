import { useState, useEffect } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'

interface Props extends Partial<StepWizardChildProps> {}

const TUTORIAL_SEEN = 'tutorial-seen'

/**
 * @description Includes Impact NFT Perks Banner & How to win a prize & Onboarding & Start Journey.
 */
export function CoverStep({ ...wizard }: Props) {
  const [seenTutorial, setSeenTutorial] = useState(false)

  useEffect(() => {
    if (!!window?.localStorage.getItem(TUTORIAL_SEEN)) {
      setSeenTutorial(true)
    }
  }, [])

  // Done after user has swiped through instructions or clicked "I understand."
  const completeOnboarding = () => {
    setSeenTutorial(true)
    window.localStorage.setItem(TUTORIAL_SEEN, 'true')
  }

  const handleStartJourneyClick = () => {
    if (wizard.nextStep) wizard.nextStep()
  }

  return (
    <div className="relative">
      <div>Impact NFT Perks Banner</div>
      <div>How to win a prize?</div>
      <div className={seenTutorial ? 'hidden' : 'block'}>
        TUTORIAL VIDS OVER HEREEEE
      </div>
      <button
        type="button"
        // disabled={!hasWatched}
        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:text-sm disabled:bg-indigo-300"
        onClick={handleStartJourneyClick}
      >
        Start Journey
      </button>
    </div>
  )
}
