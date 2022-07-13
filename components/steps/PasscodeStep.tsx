import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Record<string, string>) => void
}

export function PasscodeStep({ updateForm, ...wizard }: Props) {
  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm({ mode: 'onChange' })

  const handleFormSubmit = (data) => {
    updateForm(data)
    if (wizard.nextStep) wizard.nextStep()
  }

  const handleBackClick = () => {
    wizard.previousStep && wizard.previousStep()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <h2>Enter unique code</h2>
        <input
          type="text"
          className="text-black"
          id="passcode"
          {...register('passcode', { required: true })}
        />
      </div>
      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:text-sm"
        onClick={handleBackClick}
      >
        Back
      </button>
      <button
        type="submit"
        disabled={!isValid || !isDirty}
        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-300 focus:outline-none sm:text-sm"
      >
        Next
      </button>
    </form>
  )
}
