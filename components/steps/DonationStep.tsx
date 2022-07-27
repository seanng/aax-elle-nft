import { useEffect } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import { DonationButton, SecondaryButton, PrimaryButton } from 'components'

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Record<string, string>) => void
  getEstGasFee: () => void
  estGasFee: string | null
  getBalance: () => Promise<string | undefined>
}

export function DonationStep({
  updateForm,
  getEstGasFee,
  estGasFee,
  getBalance,
  ...wizard
}: Props) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { isDirty, isValid },
  } = useForm({ mode: 'onChange', defaultValues: { donation: 500 } })

  const handleFormSubmit = (data) => {
    updateForm(data)
  }

  const handleBackClick = () => {
    wizard.previousStep && wizard.previousStep()
  }

  useEffect(() => {
    if (wizard.isActive) getEstGasFee()
    getBalance()
  }, [wizard.isActive])

  const donationValue = watch('donation')

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col items-center font-noto">
        <h1 className="font-medium text-xl mb-3">你的告白能幫助小動物！</h1>
        <p className="text-gray-500 mb-4">
          我們也非常關注浪浪議題，透過這份意義非凡的活動，讓ELLEverse 為你捐款
        </p>
        <div className="bg-[#FBAEAE] rounded-full px-4 py-2 flex space-x-2 mb-12">
          <img src="/images/lil-cat.png" height={23} width={25} />
          <span>毛小孩之家官網</span>
        </div>
        <div className="flex font-mono mb-2 ml-10">
          <span className="text-sm mr-1">NT$</span>
          <input
            type="number"
            id="donation"
            className="w-36 font-medium text-4xl caret-cucumber text-black bg-transparent border-transparent focus:border-transparent focus:ring-0 p-0"
            min={0}
            {...register('donation', { required: true })}
          />
        </div>
        <div className="font-mono text-sm text-gray-500 mb-6">
          (+ ETH $0.002 Gas fee)
        </div>
        <div className="flex space-x-2">
          <DonationButton
            isActive={donationValue == 100}
            onClick={() => setValue('donation', 100)}
          >
            $100
          </DonationButton>
          <DonationButton
            isActive={donationValue == 500}
            onClick={() => setValue('donation', 500)}
          >
            $500
          </DonationButton>
          <DonationButton
            isActive={donationValue == 1000}
            onClick={() => setValue('donation', 1000)}
          >
            $1000
          </DonationButton>
        </div>
        <div className="flex space-x-6 w-80 mt-20">
          <SecondaryButton onClick={handleBackClick}>上一步</SecondaryButton>
          <PrimaryButton disabled={donationValue < 10} type="submit">
            下一步
          </PrimaryButton>
        </div>
      </div>
      <div>
        <h2 className="py-4">Gas Fee Estimate</h2>
        <p>{estGasFee !== '0' && estGasFee}</p>
      </div>
      <div>
        <h2 className="py-4">Wallet Address Balance</h2>
        <p>{estGasFee !== '0' && estGasFee}</p>
      </div>
    </form>
  )
}
