import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { salePhase } from 'utils/config'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import {
  DonationButton,
  WarningStamp,
  MintConfirmationModal,
  TwSpcaButton,
  SecondaryButton,
  PrimaryButton,
  OutlinedHeading,
  CaretDownIcon,
} from 'components'
import {
  INCONSISTENT_CONTRACT_STATUS,
  INSUFFICIENT_WALLET_BALANCE,
  NO_ADDRESS_FOUND,
  NO_WHITELIST_TOKEN,
  PRIVATE_SALE,
  PUBLIC_SALE,
  REACHED_MESSAGE_LIMIT,
} from 'shared/constants'
import { MintForm, MintResponseData } from 'shared/types'
import { MessageToken } from '@prisma/client'

const EXCHANGE_RATE_REQUEST_INTERVAL = 5000
const ETH_DECIMAL_PLACES = 5

interface Props extends Partial<StepWizardChildProps> {
  address: string | null | undefined
  updateForm: (formValues: {
    donationInput: number
    donationInEth: number
  }) => void
  privateSaleMint: () => Promise<Partial<MessageToken> | undefined>
  publicSaleMint: () => Promise<Partial<MessageToken> | undefined>
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
  setSpinnerText: Dispatch<SetStateAction<string>>
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
  privateSaleMint,
  publicSaleMint,
  setMintResponseData,
  updateForm,
  setSpinnerText,
  ...wizard
}: Props) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [errorType, setErrorType] = useState('')
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
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
    setSpinnerText('請在MetaMask裡確認鑄造')
    let mintResponseData: MintResponseData
    try {
      if (salePhase === PRIVATE_SALE) {
        mintResponseData = await privateSaleMint()
      }
      if (salePhase === PUBLIC_SALE) {
        mintResponseData = await publicSaleMint()
      }
      // Do something on success? Here or in Donation Step.
    } catch (error) {
      if (error.message === REACHED_MESSAGE_LIMIT) {
        setErrorType(REACHED_MESSAGE_LIMIT)
      }
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
      return () => window.clearInterval(interval)
    }
  }, [wizard.isActive])

  useEffect(() => {
    if (wizard.isActive) calcBalance()
  }, [wizard.isActive, address])

  useEffect(() => {
    if (wizard.isActive) calcMintGasFee()
  }, [wizard.isActive, balance])

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
        <OutlinedHeading className="mb-3 md:mb-5 mt-8 md:mt-12">
          你的愛能幫助受虐動物
        </OutlinedHeading>
        <p className="text-center tracking-wide w-[300px] md:w-[672px] md:text-xl mb-4 md:mb-6 leading-150%">
          你的愛不只轉動元宇宙，為你獨特的Impact
          NFT定價，費用全額將捐助SPCA台灣防止虐待動物協會 一起關心受虐動物
        </p>
        <TwSpcaButton />
        <CaretDownIcon fill="#fff" className="my-3 md:my-6" />
        <div className="w-[300px] md:w-[408px] mb-3">
          <div className="flex items-center">
            <StampSvg />
            <span className="ml-2">愛的捐款最低從500元開始</span>
          </div>
        </div>
        <div className="flex border border-lime mb-3 w-[300px] md:w-[408px]">
          {[500, 1000, 1500].map((val, i) => (
            <DonationButton
              type="button"
              isActive={donationInput == val}
              onClick={() => {
                setValue('donationInput', val)
                clearErrors()
              }}
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
                className={`w-40 text-5xl font-medium font-mono bg-transparent border-transparent focus:border-transparent focus:ring-0 p-0 text-right ${
                  errors?.donationInput ? 'text-red-500' : 'text-lime'
                }`}
                min={500}
                placeholder="500"
                {...register('donationInput', { required: true, min: 500 })}
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
        <div className="flex space-x-8 mt-10">
          <SecondaryButton type="button" onClick={handleBackClick}>
            上一步
          </SecondaryButton>
          <PrimaryButton
            type="button"
            disabled={donationInput < 500}
            onClick={handleNextClick}
          >
            下一步
          </PrimaryButton>
        </div>
      </div>
      {wizard.isActive && (
        <MintConfirmationModal
          form={form}
          isOpen={isConfirmModalOpen}
          closeModal={() => setIsConfirmModalOpen(false)}
          onMintClick={handleModalConfirmClick}
          mintGasFee={mintGasFee ?? '0.0002'}
          errorComponent={
            {
              [NO_WHITELIST_TOKEN]: (
                <div className="bg-tomato flex px-4 py-4 space-x-4 mb-2">
                  <WarningStamp />
                  <div className="text-white">
                    <p>你的錢包內沒有白名單NFT</p>
                    <p>公開鑄造時間會在12/16開始</p>
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
              [REACHED_MESSAGE_LIMIT]: (
                <div className="bg-tomato flex px-4 py-4 space-x-4 mb-2">
                  <WarningStamp />
                  <div className="text-white">
                    <p>鑄造已達3113上限</p>
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
              '': null,
            }[errorType]
          }
        />
      )}
    </>
  )
}

const StampSvg = () => (
  <svg
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="2.375" width="1.875" height="11.25" fill="#D9D9D9" />
    <rect x="13.125" y="2.375" width="1.875" height="11.25" fill="#D9D9D9" />
    <rect x="6.5625" y="4.25" width="1.875" height="4.6875" fill="#D9D9D9" />
    <rect x="6.5625" y="9.875" width="1.875" height="1.875" fill="#D9D9D9" />
    <rect x="1.875" y="0.5" width="11.25" height="1.875" fill="#D9D9D9" />
    <rect x="1.875" y="13.625" width="11.25" height="1.875" fill="#D9D9D9" />
  </svg>
)
