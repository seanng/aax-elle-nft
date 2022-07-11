import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import { EMAIL_REGEX } from 'shared/constants'

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Record<string, string>) => void
}

export function EmailStep({ updateForm, ...wizard }: Props) {
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
        <input
          id="email"
          type="text"
          placeholder="Enter e-mail"
          className="text-black"
          {...register('email', {
            required: true,
            pattern: {
              value: EMAIL_REGEX,
              message: 'Enter a valid email address',
            },
          })}
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
