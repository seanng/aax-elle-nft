import { useEffect, useState } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { config } from 'utils/config'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import {
  DonationButton,
  MintConfirmationModal,
  TwSpcaButton,
  SecondaryButton,
  PrimaryButton,
  FormHeading,
  CaretDownGreenIcon,
} from 'components'
import {
  INCONSISTENT_CONTRACT_STATUS,
  INSUFFICIENT_WALLET_BALANCE,
  NO_WHITELIST_TOKEN,
  PRESALE,
  PUBLIC_SALE,
} from 'shared/constants'
import { MintForm, MintResponseData } from 'shared/types'
import { classNames } from 'utils/helpers'
import { Mint } from '@prisma/client'

const EXCHANGE_RATE_REQUEST_INTERVAL = 5000
const ETH_DECIMAL_PLACES = 5

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: {
    donationInput: number
    donationInEth: number
  }) => void
  preSaleMint: () => Promise<Partial<Mint> | undefined>
  publicSaleMint: () => Promise<Partial<Mint> | undefined>
  calcMintGasFee: () => Promise<void>
  contract: ethers.Contract | null
  calcEthToNtd: () => Promise<void>
  mintGasFee: string | null
  ethToNtd: number | null
  calcBalance: () => void
  balance: string | null
  form: MintForm
  setIsLoading: (b: boolean) => void
  setMintResponseData: (data: MintResponseData) => void
}

export function DonationStep({
  calcMintGasFee,
  calcEthToNtd,
  calcBalance,
  mintGasFee,
  form,
  setIsLoading,
  ethToNtd,
  contract,
  balance,
  preSaleMint,
  publicSaleMint,
  setMintResponseData,
  updateForm,
  ...wizard
}: Props) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [errorType, setErrorType] = useState('')
  const { handleSubmit, register, watch, setValue } = useForm({
    mode: 'onChange',
    defaultValues: { donationInput: 5000, donationInEth: 0 },
  })

  const donationInput = watch('donationInput')
  const donationInEth = watch('donationInEth')

  const handleNextClick = handleSubmit(async (data) => {
    updateForm(data)
    setIsConfirmModalOpen(true)
  })

  const handleBackClick = () => {
    wizard.previousStep && wizard.previousStep()
  }

  const handleModalConfirmClick = async () => {
    if (!contract) {
      // Tell user their Wallet is not connected
      return
    }

    setIsLoading(true)
    let mintResponseData: MintResponseData
    try {
      if (config.saleStatus === PRESALE) {
        mintResponseData = await preSaleMint()
      }
      if (config.saleStatus === PUBLIC_SALE) {
        mintResponseData = await publicSaleMint()
      }
      // Do something on success? Here or in Donation Step.
    } catch (error) {
      if (error.message === INCONSISTENT_CONTRACT_STATUS) {
        setErrorType(INCONSISTENT_CONTRACT_STATUS)
      }
      if (error.message === NO_WHITELIST_TOKEN) {
        setErrorType(NO_WHITELIST_TOKEN)
      }
      if (error?.code === -32603) {
        console.log('Do something to show that donation is required!!! ')
      }
    }
    setIsLoading(false)

    console.log('mintResponseData: ', mintResponseData)
    if (mintResponseData) {
      setIsConfirmModalOpen(false)
      setMintResponseData(mintResponseData)
      wizard.nextStep && wizard.nextStep()
    }
  }

  useEffect(() => {
    if (wizard.isActive && typeof window !== 'undefined') {
      const interval = window.setInterval(
        () => calcEthToNtd(),
        EXCHANGE_RATE_REQUEST_INTERVAL
      )
      calcEthToNtd()
      calcBalance()
      calcMintGasFee()
      return () => window.clearInterval(interval)
    }
  }, [wizard.isActive])

  useEffect(() => {
    if (ethToNtd && ethToNtd > 0)
      setValue('donationInEth', donationInput / ethToNtd)
  }, [donationInput, ethToNtd])

  useEffect(() => {
    if (Number(balance) < Number(form.donationInEth))
      setErrorType(INSUFFICIENT_WALLET_BALANCE)
  }, [balance, form.donationInEth])

  const balanceNum = Number(balance)

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <div className="flex flex-col items-center font-noto pt-8 w-72 mx-auto">
        <FormHeading className="mb-3">
          輸入你的 你的告白能幫助小動物！
        </FormHeading>
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
          <PrimaryButton
            disabled={donationInput <= 0}
            onClick={handleNextClick}
          >
            下一步
          </PrimaryButton>
        </div>
      </div>
      {/* </form> */}
      <MintConfirmationModal
        form={form}
        isOpen={isConfirmModalOpen}
        closeModal={() => setIsConfirmModalOpen(false)}
        onMintClick={handleModalConfirmClick}
        errorComponent={
          {
            [NO_WHITELIST_TOKEN]: (
              <div className="bg-tomato flex px-4 py-4 space-x-4 mb-2">
                <WarningStamp />
                <div className="text-white">
                  <p>你的錢包內沒有 white list token</p>
                  <p>公開鑄造時間將會在10/15開始</p>
                </div>
              </div>
            ),
            [INSUFFICIENT_WALLET_BALANCE]: (
              <div className="bg-tomato flex px-4 py-4 space-x-4 mb-2">
                <WarningStamp />
                <div className="text-white">
                  <p>錢包資產不足</p>
                  <p>請到錢包購買以太幣</p>
                  <a href="#" target="_blank" className="underline">
                    如何買幣？
                  </a>
                </div>
              </div>
            ),
            [INCONSISTENT_CONTRACT_STATUS]: (
              <div className="bg-tomato flex px-4 py-4 space-x-4 mb-2">
                <WarningStamp />
                <div className="text-white">
                  <p>Unable to mint.</p>
                  <p>Please contact AAX quoting Error 96.</p>
                </div>
              </div>
            ),
            '': <div />,
          }[errorType]
        }
      />
    </>
  )
}

const WarningStamp = ({ className = '', ...props }) => (
  <div
    className={classNames(
      'relative flex flex-col justify-between items-center h-8 w-8 flex-none',
      className
    )}
    {...props}
  >
    <div className="w-6 h-1 bg-white" />
    <div className="flex justify-between items-center w-full">
      <div className="w-1 h-6 bg-white" />
      <div className="text-white font-mono font-bold text-md">!</div>
      <div className="w-1 h-6 bg-white" />
    </div>
    <div className="w-6 h-1 bg-white" />
  </div>
)
