import { useState } from 'react'
import StepWizard from 'react-step-wizard'
import type { NextPage } from 'next'
import {
  EmailStep,
  PasscodeStep,
  MessageStep,
  DonationStep,
  SharingModal,
  SuccessStep,
  Stepper,
  SpinningOverlay,
  GreenLipsIcon,
  MintLayout,
} from 'components'
import Animate from 'styles/animate.module.css'
import { useMint } from 'hooks'
import { NOT_STARTED } from 'shared/constants'
import { useWeb3Context } from 'context'
import { saleStatus } from 'utils/config'
import { MintResponseData } from 'shared/types'

const transitions = {
  enterRight: `${Animate.animated} ${Animate.fadeInRight}`,
  enterLeft: `${Animate.animated} ${Animate.fadeInLeft}`,
  exitRight: `${Animate.animated} ${Animate.fadeOutRight}`,
  exitLeft: `${Animate.animated} ${Animate.fadeOutLeft}`,
}

const MintPage: NextPage = () => {
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mintResponseData, setMintResponseData] = useState<MintResponseData>()
  const { calcBalance, balance, openConnectModal, address } = useWeb3Context()
  const {
    preSaleMint,
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

  const updateForm = (formValues) => {
    setForm({ ...form, ...formValues })
  }

  const ownsWhitelistToken = async (address: string) => {
    setIsLoading(true)
    const hasToken = await contract?.callStatic.ownsWhitelistToken(address)
    setIsLoading(false)
    return hasToken
  }

  return (
    <>
      <MintLayout className="overflow-y-hidden">
        <StepWizard transitions={transitions} nav={<Stepper />}>
          <MessageStep
            {...{
              address,
              updateForm,
              openConnectModal,
              ownsWhitelistToken,
              setFiles,
              setIsLoading,
              openSharingModal: () => setIsSharingModalOpen(true),
            }}
          />
          <EmailStep updateForm={updateForm} />
          <PasscodeStep updateForm={updateForm} />
          <DonationStep
            {...{
              preSaleMint,
              publicSaleMint,
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
            }}
          />
          <SuccessStep data={mintResponseData} files={files} />
        </StepWizard>
      </MintLayout>
      <SharingModal
        isOpen={isSharingModalOpen}
        closeModal={() => setIsSharingModalOpen(false)}
        files={files}
      />
      <SpinningOverlay isLoading={isLoading} />
      {saleStatus === NOT_STARTED && (
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
