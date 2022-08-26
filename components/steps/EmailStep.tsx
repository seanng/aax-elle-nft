import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import { EMAIL_REGEX } from 'shared/constants'
import {
  FormErrorIcon,
  ResponsiveSecondaryButton,
  ResponsivePrimaryButton,
  FormHeading,
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
      <div className="flex flex-col items-center font-noto mt-12">
        <FormStamp className="mb-4 md:mb-7">1</FormStamp>
        <FormHeading className="mb-2 md:mb-6">輸入你的 Email</FormHeading>
        <div className="w-full mb-10 flex flex-col items-center">
          <p className="text-center text-white md:text-2xl leading-150% mb-10 md:mb-20">
            鑄造完畢後你會收到專屬Love Message
            <br /> 也會不定時空投賦能資訊喔
          </p>
          <div className="w-80 md:w-96 md:mb-20">
            <input
              id="email"
              type="text"
              placeholder="Your email"
              className="text-black md:text-2xl border-lime font-mono placeholder-slate-500 bg-lime border-transparent focus:border-transparent focus:ring-0 w-full mb-2"
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
                <span className="ml-2 text-sm md:text-base">
                  Email 格式不正確
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-8">
          <ResponsiveSecondaryButton type="button" onClick={handleBackClick}>
            上一步
          </ResponsiveSecondaryButton>
          <ResponsivePrimaryButton
            disabled={!isValid || !isDirty}
            type="submit"
          >
            下一步
          </ResponsivePrimaryButton>
        </div>
      </div>
    </form>
  )
}
