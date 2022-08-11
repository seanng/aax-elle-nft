import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import { EMAIL_REGEX } from 'shared/constants'
import {
  FormErrorIcon,
  SecondaryButton,
  PrimaryButton,
  FormStamp,
} from 'components'

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
      <div className="flex flex-col items-center font-noto pt-16">
        <FormStamp className="mb-4">1</FormStamp>
        <h2 className="font-medium text-2xl mb-2">輸入你的 Email</h2>
        <div className="w-80 mb-10">
          <p className="text-white mb-10 text-center">
            噓...
            為你的秘密加密上鎖，輸入他/她的email後，對方將會收到通知和你設定的專屬密碼，決定是否揭曉秘密。
          </p>
          <input
            id="email"
            type="text"
            placeholder="Your email"
            className="text-black border-lime w-full mb-2 font-mono placeholder-slate-500 bg-lime border-transparent focus:border-transparent focus:ring-0"
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
              <span className="ml-2 text-sm">Email 格式不正確</span>
            </div>
          )}
        </div>
        <div className="flex space-x-8">
          <SecondaryButton type="button" onClick={handleBackClick}>
            上一步
          </SecondaryButton>
          <PrimaryButton disabled={!isValid || !isDirty} type="submit">
            下一步
          </PrimaryButton>
        </div>
      </div>
    </form>
  )
}
