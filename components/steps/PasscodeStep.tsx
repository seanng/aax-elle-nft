import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import {
  FormErrorIcon,
  SecondaryButton,
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
      <div className="flex flex-col items-center font-noto pt-16">
        <FormStamp className="mb-4">2</FormStamp>
        <h2 className="font-medium text-2xl mb-2">設定專屬於你們的密碼</h2>
        <div className="w-80 mb-10">
          <p className="text-white mb-10 text-center">
            噓...
            為你的秘密加密上鎖，輸入他/她的email後，對方將會收到通知和你設定的專屬密碼，決定是否揭曉秘密。
          </p>
          <input
            id="passcode"
            type="text"
            placeholder="解鎖密碼"
            className="text-black border-lime w-full mb-2 font-mono placeholder-slate-500 bg-lime border-transparent focus:border-transparent focus:ring-0"
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
              <span className="ml-2 text-sm">
                格式錯誤，請輸入英文字母和字數
              </span>
            </div>
          ) : (
            <span className="text-sm">僅限英文字母和數字</span>
          )}
        </div>
        <div className="flex space-x-8">
          <SecondaryButton onClick={handleBackClick}>上一步</SecondaryButton>
          <PrimaryButton disabled={!isValid || !isDirty} type="submit">
            下一步
          </PrimaryButton>
        </div>
      </div>
    </form>
  )
}
