import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import {
  FormErrorIcon,
  SecondaryButton,
  FormHeading,
  PrimaryButton,
  FormStamp,
} from 'components'

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Record<string, string>) => void
}

export function PasscodeStep({ updateForm, ...wizard }: Props) {
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
        <FormStamp className="mb-4 md:mb-7">2</FormStamp>
        <FormHeading className="mb-2 md:mb-6">自訂專屬你們的密碼</FormHeading>
        <div className="w-full mb-10 flex flex-col items-center">
          <p className="text-center text-white md:text-2xl leading-150% mb-10 md:mb-20">
            噓… 先幫這份愛加密上鎖，分享給對方
            <br />
            後，他可以決定是否透過專屬密碼來解密！
          </p>
          <div className="w-80 md:w-96 md:mb-20">
            <input
              id="passcode"
              type="text"
              placeholder="解鎖密碼"
              className="text-black md:text-2xl border-lime font-mono placeholder-slate-500 bg-lime border-transparent focus:border-transparent focus:ring-0 w-full mb-2"
              {...register('passcode', {
                required: true,
                pattern: {
                  value: /^[a-z0-9]+$/i,
                  message: '!',
                },
              })}
            />
            {errors?.passcode?.message ? (
              <div className="flex items-center">
                <FormErrorIcon />
                <span className="ml-2 text-sm md:text-base">
                  格式錯誤，請輸入英文字母和字數
                </span>
              </div>
            ) : (
              <span className="text-sm md:text-base">僅限英文字母和數字</span>
            )}
          </div>
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
