import { useEffect, useState } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { saleStatus } from 'utils/config'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import {
  DonationButton,
  MintConfirmationModal,
  TwSpcaButton,
  ResponsiveSecondaryButton,
  ResponsivePrimaryButton,
  FormHeading,
  CaretDownIcon,
} from 'components'
import {
  INCONSISTENT_CONTRACT_STATUS,
  INSUFFICIENT_WALLET_BALANCE,
  NO_ADDRESS_FOUND,
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
  address: string | null | undefined
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
  address,
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
      if (saleStatus === PRESALE) {
        mintResponseData = await preSaleMint()
      }
      if (saleStatus === PUBLIC_SALE) {
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
      if (error.code === -32603) {
        console.log('Do something to show that donation is required!!! ')
      }
    }
    setIsLoading(false)

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
    if (!address) return setErrorType(NO_ADDRESS_FOUND)
    setErrorType(
      Number(balance) < Number(form.donationInEth)
        ? INSUFFICIENT_WALLET_BALANCE
        : ''
    )
  }, [balance, form.donationInEth, address])

  const balanceNum = Number(balance)

  return (
    <>
      <div className="flex flex-col items-center font-noto mx-auto">
        <FormHeading className="mb-3 md:mb-5 mt-8 md:mt-12">
          你的愛能幫助受虐動物
        </FormHeading>
        <p className="text-center tracking-wide w-[300px] md:w-[672px] md:text-xl mb-4 md:mb-6 leading-150%">
          你的愛不只轉動元宇宙，為你獨特的Impact
          NFT定價，費用全額將捐助SPCA台灣防止虐待動物協會 一起關心受虐動物
        </p>
        <TwSpcaButton />
        <CaretDownIcon fill="#fff" className="my-3 md:my-6" />
        <div className="flex border border-lime mb-3 w-[300px] md:w-[408px]">
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

        <div className="w-[300px] md:w-[408px] border border-lime text-lime ">
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
              <p className="text-xs md:text-sm">
                (~ETH {donationInEth.toFixed(ETH_DECIMAL_PLACES)})
              </p>
            </div>
          </div>
          <div
            className={`text-right text-xs md:text-sm font-mono p-2 ${
              balanceNum < donationInEth || !address ? 'text-tomato' : ''
            }`}
          >
            {address
              ? `Your balance: ETH ${balanceNum.toFixed(ETH_DECIMAL_PLACES)}`
              : '尚未連結錢包'}
          </div>
        </div>
        <div className="flex mt-10">
          <ResponsiveSecondaryButton type="button" onClick={handleBackClick}>
            上一步
          </ResponsiveSecondaryButton>
          <ResponsivePrimaryButton
            disabled={donationInput <= 0}
            onClick={handleNextClick}
            className="ml-8"
          >
            下一步
          </ResponsivePrimaryButton>
        </div>
      </div>
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
                  <p>錢包資產不足 請購買以太幣</p>
                  <a
                    href="https://www.aax.com/zh-TW/newbie/"
                    target="_blank"
                    className="underline"
                    rel="noreferrer"
                  >
                    如何買幣？
                  </a>
                </div>
              </div>
            ),
            [NO_ADDRESS_FOUND]: (
              <div className="bg-tomato flex px-4 py-4 space-x-4 mb-2">
                <WarningStamp />
                <div className="text-white">
                  <p>尚未連結錢包</p>
                  <p>請先連結錢包以繼續鑄造</p>
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
