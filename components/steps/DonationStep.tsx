import { useEffect } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'

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
    formState: { isDirty, isValid },
  } = useForm({ mode: 'onChange' })

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
        <input
          type="number"
          id="donation"
          className="text-black"
          placeholder="Enter donation"
          min={0}
          {...register('donation', { required: true })}
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
        鑄造
      </button>
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
