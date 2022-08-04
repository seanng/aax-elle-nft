import { useEffect, useRef } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import { DonationButton, SecondaryButton, PrimaryButton } from 'components'

const EXCHANGE_RATE_REQUEST_INTERVAL = 5000

interface FormData {
  donationInput: number
}

interface Props extends Partial<StepWizardChildProps> {
  calcMintGasFee: () => Promise<void>
  calcEthToNtd: () => Promise<void>
  mintGasFee: string | null
  ethToNtd: number | null
  calcBalance: () => void
  balance: string | null
  onSubmit: (data: FormData) => void
}

export function DonationStep({
  calcMintGasFee,
  calcEthToNtd,
  calcBalance,
  mintGasFee,
  ethToNtd,
  balance,
  onSubmit,
  ...wizard
}: Props) {
  const { handleSubmit, register, watch, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues: { donationInput: 5000, donationInEth: 0 },
  })

  const donationInput = watch('donationInput')
  const donationInEth = watch('donationInEth')

  const handleBackClick = () => {
    wizard.previousStep && wizard.previousStep()
  }

  useEffect(() => {
    if (wizard.isActive && typeof window !== 'undefined') {
      const interval = window.setInterval(
        () => calcEthToNtd(),
        EXCHANGE_RATE_REQUEST_INTERVAL
      )
      calcMintGasFee()
      calcEthToNtd()
      calcBalance()
      return () => window.clearInterval(interval)
    }
  }, [wizard.isActive])

  useEffect(() => {
    if (ethToNtd && ethToNtd > 0)
      setValue('donationInEth', donationInput / ethToNtd)
  }, [donationInput, ethToNtd])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            id="donationInput"
            className="w-36 font-medium text-4xl caret-cucumber text-black bg-transparent border-transparent focus:border-transparent focus:ring-0 p-0"
            min={0}
            placeholder="0"
            {...register('donationInput', { required: true })}
          />
        </div>
        <div className="font-mono text-sm text-gray-400 mb-2">
          (~ETH {donationInEth.toFixed(4)})
        </div>
        <div className="font-mono text-sm text-gray-400">
          Your balance: ETH {Number(balance).toFixed(4)}
        </div>
        <div className="flex space-x-2">
          {[1000, 5000, 10000].map((val) => (
            <DonationButton
              type="button"
              isActive={donationInput == val}
              onClick={() => setValue('donationInput', val)}
              key={val}
            >
              ${val}
            </DonationButton>
          ))}
        </div>
        <div className="flex space-x-6 w-80 mt-20">
          <SecondaryButton onClick={handleBackClick}>上一步</SecondaryButton>
          <PrimaryButton disabled={donationInput < 0} type="submit">
            下一步
          </PrimaryButton>
        </div>
      </div>
    </form>
  )
}
