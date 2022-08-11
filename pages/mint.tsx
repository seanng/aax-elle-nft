import { useState } from 'react'
import StepWizard from 'react-step-wizard'
import type { NextPage } from 'next'
import {
  EmailStep,
  PasscodeStep,
  MintNavigation,
  MessageStep,
  DonationStep,
  SharingModal,
  Stepper,
  MintConfirmationModal,
  SpinningOverlay,
  GreenLipsIcon,
} from 'components'
import Animate from 'styles/animate.module.css'
import { useContract, useMint } from 'hooks'
import {
  NOT_STARTED,
  NO_WHITELIST_TOKEN,
  PRESALE,
  PUBLIC_SALE,
} from 'shared/constants'
import { useWeb3Context } from 'context'
import { config } from 'utils/config'

const transitions = {
  enterRight: `${Animate.animated} ${Animate.fadeInRight}`,
  enterLeft: `${Animate.animated} ${Animate.fadeInLeft}`,
  exitRight: `${Animate.animated} ${Animate.fadeOutRight}`,
  exitLeft: `${Animate.animated} ${Animate.fadeOutLeft}`,
}

const MintPage: NextPage = () => {
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { contract, mintGasFee, calcMintGasFee } = useContract()
  const { calcBalance, balance, openConnectModal, address } = useWeb3Context()
  const {
    preSaleMint,
    publicSaleMint,
    calcEthToNtd,
    ethToNtd,
    form,
    setForm,
    setFiles,
  } = useMint(contract)

  const handleMintClick = async () => {
    if (!contract) {
      // Tell user their Wallet is not connected
      return
    }

    try {
      if (config.saleStatus === PRESALE) preSaleMint()
      if (config.saleStatus === PUBLIC_SALE) publicSaleMint()
      // Do something on success? Here or in Donation Step.
    } catch (error) {
      if (error.message === NO_WHITELIST_TOKEN) {
        // Show error message toast?
        return
      }
      if (error?.code === -32603) {
        console.log('Do something to show that donation is required!!! ')
      }
      if (error?.code === -32000) {
        console.log('You do not have enough funds in your wallet.')
      }
    }
  }

  const updateForm = (formValues) => {
    setForm({ ...form, ...formValues })
  }

  const handleDonateClick = (data) => {
    updateForm(data)
    setIsConfirmModalOpen(true)
  }

  const ownsWhitelistToken = async (address: string) => {
    setIsLoading(true)
    const hasToken = await contract?.callStatic.ownsWhitelistToken(address)
    setIsLoading(false)
    return hasToken
  }

  return (
    <>
      <MintNavigation />
      <div
        className="bg-black min-h-screen pt-navbar-height text-white bg-repeat overflow-y-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px), linear-gradient(to bottom, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        <StepWizard transitions={transitions} nav={<Stepper />}>
          <MessageStep
            updateForm={updateForm}
            updateFiles={setFiles}
            openSharingModal={() => setIsSharingModalOpen(true)}
            openConnectModal={openConnectModal}
            ownsWhitelistToken={ownsWhitelistToken}
            address={address}
          />
          <EmailStep updateForm={updateForm} />
          <PasscodeStep updateForm={updateForm} />
          <DonationStep
            onSubmit={handleDonateClick}
            calcMintGasFee={calcMintGasFee}
            calcEthToNtd={calcEthToNtd}
            ethToNtd={ethToNtd}
            mintGasFee={mintGasFee}
            calcBalance={calcBalance}
            balance={balance}
          />
        </StepWizard>
      </div>
      <SharingModal
        isOpen={isSharingModalOpen}
        closeModal={() => setIsSharingModalOpen(false)}
      />
      <MintConfirmationModal
        balance={balance}
        form={form}
        isOpen={isConfirmModalOpen}
        closeModal={() => setIsConfirmModalOpen(false)}
        onMintClick={handleMintClick}
      />
      <SpinningOverlay isLoading={isLoading} />
      {config.saleStatus === NOT_STARTED && (
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
