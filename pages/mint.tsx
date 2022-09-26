import { useEffect, useState } from 'react'
import StepWizard from 'react-step-wizard'
import type { NextPage } from 'next'
import {
  EmailStep,
  PasscodeStep,
  MessageStep,
  DonationStep,
  SuccessStep,
  Stepper,
  SpinningOverlay,
  GreenLipsIcon,
  MintLayout,
} from 'components'
import Animate from 'styles/animate.module.css'
import { useMint } from 'hooks'
import { NOT_STARTED, SAFARI } from 'shared/constants'
import { useDetectionContext, useWeb3Context } from 'context'
import { salePhase } from 'utils/config'
import { MintResponseData } from 'shared/types'
import { useRouter } from 'next/router'

const transitions = {
  enterRight: `${Animate.animated} ${Animate.fadeInRight}`,
  enterLeft: `${Animate.animated} ${Animate.fadeInLeft}`,
  exitRight: `${Animate.animated} ${Animate.fadeOutRight}`,
  exitLeft: `${Animate.animated} ${Animate.fadeOutLeft}`,
}

const MintPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showsSpinner, setShowsSpinner] = useState(false)
  const [spinnerText, setSpinnerText] = useState('')
  const [mintResponseData, setMintResponseData] = useState<MintResponseData>()
  const router = useRouter()
  const {
    calcBalance,
    balance,
    openConnectModal,
    isConnectModalOpen,
    address,
  } = useWeb3Context()
  const {
    privateSaleMint,
    publicSaleMint,
    calcEthToNtd,
    ethToNtd,
    form,
    files,
    setForm,
    setFiles,
    contract,
    calcMintGasFee,
    mintGasFee,
  } = useMint()

  const {
    browser,
    setIsWrongBrowserModalOpen,
    setIsProcessingCloseClick,
    isProcessingCloseClick,
  } = useDetectionContext()

  const updateForm = (formValues) => {
    setForm({ ...form, ...formValues })
  }

  const ownsWhitelistToken = async (address: string) =>
    contract?.callStatic.ownsWhitelistToken(address)

  const onMetamaskConfirm = () => {
    setShowsSpinner(true)
    setSpinnerText('')
  }

  useEffect(() => {
    return () => setShowsSpinner(false)
  }, [])

  useEffect(() => {
    if (browser === SAFARI) {
      setIsWrongBrowserModalOpen(true)
    }
  }, [browser])

  useEffect(() => {
    if (isProcessingCloseClick) {
      setIsProcessingCloseClick(false)
      router.replace('/')
    }
  }, [isProcessingCloseClick])

  return (
    <>
      <MintLayout className="overflow-y-hidden">
        <StepWizard transitions={transitions} nav={<Stepper />}>
          <MessageStep
            {...{
              address,
              updateForm,
              openConnectModal,
              isConnectModalOpen,
              ownsWhitelistToken,
              setFiles,
              setIsLoading,
            }}
          />
          <EmailStep updateForm={updateForm} />
          <PasscodeStep updateForm={updateForm} />
          <DonationStep
            {...{
              privateSaleMint: () => privateSaleMint(onMetamaskConfirm),
              publicSaleMint: () => publicSaleMint(onMetamaskConfirm),
              ethToNtd,
              calcEthToNtd,
              calcMintGasFee,
              form,
              setIsLoading,
              balance,
              updateForm,
              calcBalance,
              address,
              mintGasFee,
              contract,
              setMintResponseData,
              setSpinnerText,
            }}
          />
          <SuccessStep data={mintResponseData} files={files} />
        </StepWizard>
      </MintLayout>
      {isLoading && (
        <SpinningOverlay showsSpinner={showsSpinner} text={spinnerText} />
      )}
      {salePhase === NOT_STARTED && (
        <div className="fixed top-0 right-0 left-0 bottom-0 z-30 bg-black-rgba-70 backdrop-blur-sm text-center">
          <GreenLipsIcon className="mt-40 mb-10 mx-auto" />
          <div
            className="leading-150% text-3xl"
            style={{
              textShadow:
                '-1.5px -1.5px 0 #55F263, 1.5px -1.5px 0 #55F263, -1.5px 1.5px 0 #55F263, 1.5px 1.5px 0 #55F263',
            }}
          >
            活動尚未開始 請於10/1再來告白！
          </div>
        </div>
      )}
    </>
  )
}

export default MintPage
