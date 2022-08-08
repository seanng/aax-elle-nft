import { useEffect, useRef } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { useForm } from 'react-hook-form'
import {
  DonationButton,
  TwSpcaButton,
  SecondaryButton,
  PrimaryButton,
  CaretDownGreenIcon,
} from 'components'

const EXCHANGE_RATE_REQUEST_INTERVAL = 5000
const ETH_DECIMAL_PLACES = 5

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
  const { handleSubmit, register, watch, setValue } = useForm({
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

  const balanceNum = Number(balance)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center font-noto pt-8 w-72 mx-auto">
        <h1 className="font-medium text-xl mb-3">你的告白能幫助小動物！</h1>
        <p className="mb-4 text-center">
          我們也非常關注浪浪議題，透過這份意義非凡的活動，讓ELLEverse 為你捐款
        </p>
        <TwSpcaButton className="mb-2" />
        <CaretDownGreenIcon className="mb-3" />
        <div className="flex border border-lime mb-3 w-full">
          {[1000, 5000, 10000].map((val, i) => (
            <DonationButton
              type="button"
              isActive={donationInput == val}
              onClick={() => setValue('donationInput', val)}
              key={val}
              className={i < 2 ? 'border-r border-lime' : ''}
            >
              {val}
            </DonationButton>
          ))}
        </div>

        <div className="w-full border border-lime text-lime">
          <div className="border-b border-lime flex justify-between p-2">
            <div
              className="text-black text-5xl leading-120%"
              style={{
                textShadow:
                  '-1px -1px 0 #55F263, 1px -1px 0 #55F263, -1px 1px 0 #55F263, 1px 1px 0 #55F263',
              }}
            >
              NT$
            </div>
            <div className="flex flex-col items-end">
              <input
                type="number"
                id="donationInput"
                className="w-40 text-5xl font-medium font-mono bg-transparent border-transparent focus:border-transparent focus:ring-0 p-0 text-right"
                min={0}
                placeholder="0"
                {...register('donationInput', { required: true })}
              />
              <p className="text-xs">
                (~ETH {donationInEth.toFixed(ETH_DECIMAL_PLACES)})
              </p>
            </div>
          </div>
          <div
            className={`text-right text-xs font-mono p-2 ${
              balanceNum < donationInEth ? 'text-tomato' : ''
            }`}
          >
            Your balance: ETH {balanceNum.toFixed(ETH_DECIMAL_PLACES)}
          </div>
        </div>
        <div className="flex space-x-8 mt-20">
          <SecondaryButton type="button" onClick={handleBackClick}>
            上一步
          </SecondaryButton>
          <PrimaryButton disabled={donationInput <= 0} type="submit">
            下一步
          </PrimaryButton>
        </div>
      </div>
    </form>
  )
}
