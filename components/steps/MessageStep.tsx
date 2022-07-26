import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import { useWeb3Context } from 'context'
import { PrimaryButton, SecondaryButton } from 'components'

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Record<string, string>) => void
  openSharingModal: () => void
}

export function MessageStep({
  updateForm,
  openSharingModal,
  ...wizard
}: Props) {
  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm({ mode: 'onChange' })

  const { address, connect } = useWeb3Context()

  const handleConfideClick = handleSubmit(async (data) => {
    updateForm(data)
    let connected = true
    if (!address) connected = await connect()
    if (connected) wizard.nextStep && wizard.nextStep()
  })

  const handleAnnounceClick = handleSubmit(async (data) => {
    // Generate animation HTML out of message.
    // Open social media sharing modal and show the image, with buttons.
    openSharingModal()
  })

  // https://stackoverflow.com/a/46118025/6007700
  // https://stackoverflow.com/a/65893635/6007700

  return (
    <div className="flex flex-col items-center font-noto">
      <h1 className="font-medium text-xl mb-7">選擇偷偷告白或大方告白</h1>
      <textarea
        id="message"
        rows={5}
        className="shadow-sm block w-48 text-4xl border border-gray-300 rounded-md text-black p-4 mb-6"
        maxLength={49}
        {...register('messsage', { required: true })}
      />
      <div className="w-64 space-y-6">
        <PrimaryButton
          disabled={!isValid || !isDirty}
          onClick={handleConfideClick}
        >
          偷偷告白
        </PrimaryButton>
        <SecondaryButton
          disabled={!isValid || !isDirty}
          onClick={handleAnnounceClick}
        >
          大方告白
        </SecondaryButton>
      </div>
    </div>
  )
}
