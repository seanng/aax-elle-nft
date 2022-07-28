import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import { EMAIL_REGEX } from 'shared/constants'
import { FormErrorIcon, SecondaryButton, PrimaryButton } from 'components'

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Record<string, string>) => void
}

export function EmailStep({ updateForm, ...wizard }: Props) {
  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid, errors },
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
      <div className="flex flex-col items-center font-noto">
        <div className="flex items-center mb-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm">
            1
          </div>
          <h1 className="ml-2 text-xl">輸入你的 Email</h1>
        </div>
        <div className="w-80 mb-10">
          <p className="text-gray-500 mb-10 text-center">
            噓...
            為你的秘密加密上鎖，輸入他/她的email後，對方將會收到通知和你設定的專屬密碼，決定是否揭曉秘密。
          </p>
          <input
            id="email"
            type="text"
            placeholder="Your email"
            className="text-black border-gray-300 rounded-md w-full mb-2"
            {...register('email', {
              required: true,
              pattern: {
                value: EMAIL_REGEX,
                message: '!',
              },
            })}
          />
          {errors?.email?.message && (
            <div className="flex items-center">
              <FormErrorIcon />
              <span className="ml-2">Email 格式不正確</span>
            </div>
          )}
        </div>
        <div className="flex space-x-6 w-80">
          <SecondaryButton onClick={handleBackClick}>上一步</SecondaryButton>
          <PrimaryButton disabled={!isValid || !isDirty} type="submit">
            下一步
          </PrimaryButton>
        </div>
      </div>
    </form>
  )
}
