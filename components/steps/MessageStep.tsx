import { StepWizardChildProps } from 'react-step-wizard'
import { useWeb3Context } from 'context'
import { PrimaryButton, SecondaryButton } from 'components'
import { useState } from 'react'

const TEXTAREA_HEIGHT = 232

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Record<string, string>) => void
  openSharingModal: () => void
}

export function MessageStep({
  updateForm,
  openSharingModal,
  ...wizard
}: Props) {
  const [val, setVal] = useState('')
  const { address, connect } = useWeb3Context()

  const handleConfideClick = async () => {
    updateForm({ message: val })
    let connected = true
    if (!address) connected = await connect()
    if (connected) wizard.nextStep && wizard.nextStep()
  }

  const handleAnnounceClick = async () => {
    // Generate animation HTML out of message.
    // Open social media sharing modal and show the image, with buttons.
    openSharingModal()
  }

  const handleMessageInput = (e) => {
    if (e.target.scrollHeight <= TEXTAREA_HEIGHT) {
      setVal(e.target.value)
    }
  }

  // https://stackoverflow.com/a/46118025/6007700
  // https://stackoverflow.com/a/65893635/6007700

  return (
    <div className="flex flex-col items-center font-noto h-full pt-16">
      <textarea
        id="message"
        rows={5}
        className="shadow-sm block w-56 text-3xl border border-gray-300 rounded-md text-black p-4 mb-6 resize-none overflow-hidden"
        onInput={handleMessageInput}
        placeholder="寫下你的告白"
        value={val}
      />
      <div className="w-64 space-y-6">
        <PrimaryButton disabled={val === ''} onClick={handleConfideClick}>
          偷偷告白
        </PrimaryButton>
        <SecondaryButton disabled={val === ''} onClick={handleAnnounceClick}>
          大方告白
        </SecondaryButton>
      </div>
    </div>
  )
}
