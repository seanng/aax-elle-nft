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
  const [values, setValues] = useState({
    message: '',
    senderName: '',
    receiverName: '',
  })
  const { openConnectModal, address } = useWeb3Context()

  const handleMintClick = async () => {
    updateForm(values)
    if (address) {
      wizard.nextStep && wizard.nextStep()
    } else {
      openConnectModal(wizard.nextStep)
    }
  }

  const handleShareClick = async () => {
    // Generate animation HTML out of message.
    // Open social media sharing modal and show the image, with buttons.
    openSharingModal()
  }

  const handleTextareaChange = (e) => {
    if (e.target.scrollHeight <= TEXTAREA_HEIGHT) {
      setValues((prev) => ({
        ...prev,
        message: e.target.value,
      }))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // https://stackoverflow.com/a/46118025/6007700
  // https://stackoverflow.com/a/65893635/6007700

  return (
    <div className="flex flex-col items-center font-noto h-full pt-16">
      <div className="flex w-80 mb-4">
        <div className="flex-none bg-lime text-black font-mono p-2">寄件人</div>
        <input
          id="senderName"
          name="senderName"
          type="text"
          className="flex-auto border-lime text-white bg-transparent focus:border-lime focus:ring-0 font-mono"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex w-80 mb-6">
        <div className="flex-none bg-lime text-black font-mono p-2">收件人</div>
        <input
          id="receiverName"
          name="receiverName"
          type="text"
          className="flex-auto border-lime text-white bg-transparent focus:border-lime focus:ring-0 font-mono"
          onChange={handleInputChange}
        />
      </div>
      {/* <input
        id="receiverName"
        name="receiverName"
        type="text"
        className="border-lime text-white bg-transparent"
        onChange={handleInputChange}
      /> */}

      <textarea
        id="message"
        rows={5}
        className="shadow-sm block w-56 text-3xl border border-gray-300 rounded-md text-black p-4 mb-6 resize-none overflow-hidden"
        onInput={handleTextareaChange}
        placeholder="寫下你的告白"
        // value={message}
      />
      <div className="flex space-x-8">
        <SecondaryButton
          disabled={values.message === ''}
          onClick={handleShareClick}
        >
          分享告白
        </SecondaryButton>
        <PrimaryButton
          disabled={values.message === ''}
          onClick={handleMintClick}
        >
          鑄造告白
        </PrimaryButton>
      </div>
    </div>
  )
}
