import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import { useWeb3Context } from 'context'
import { Web3Button } from 'components'

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Record<string, string>) => void
}

export function MessageStep({ updateForm, ...wizard }: Props) {
  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm({ mode: 'onChange' })

  const { address, connect } = useWeb3Context()

  const handleConfideClick = handleSubmit(async (data) => {
    try {
      if (!address) await connect()
      updateForm(data)
      wizard.nextStep && wizard.nextStep()
    } catch (error) {
      console.log(error)
    }
  })

  const handleAnnounceClick = handleSubmit(async (data) => {
    // Open social media sharing modal.
  })

  return (
    <form>
      <div className="relative">
        <textarea
          id="message"
          rows={5}
          className="shadow-sm block w-96 sm:text-sm border border-gray-300 rounded-md text-black"
          maxLength={49}
          {...register('messsage', { required: true })}
        />
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-300 focus:outline-none sm:text-sm"
          disabled={!isValid || !isDirty}
          onClick={handleConfideClick}
        >
          偷偷告白...
        </button>
        <button
          type="button"
          disabled={!isValid || !isDirty}
          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-300 focus:outline-none sm:text-sm"
          onClick={handleAnnounceClick}
        >
          大方告白
        </button>
        <Web3Button />
      </div>
    </form>
  )
}
