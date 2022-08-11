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
} from 'components'
import Animate from 'styles/animate.module.css'
import { useContract, useMint } from 'hooks'
import {
  NO_WHITELIST_TOKEN,
  FINISHED,
  NOT_STARTED,
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

  const { contract, mintGasFee, calcMintGasFee } = useContract()
  const { calcBalance, balance } = useWeb3Context()
  const {
    preSaleMint,
    publicSaleMint,
    calcEthToNtd,
    ethToNtd,
    form,
    setForm,
    setFiles,
  } = useMint(contract)

  const handleMint = async () => {
    if (!contract) {
      // Tell user their Wallet is not connected
      return
    }

    try {
      const { saleStatus } = config

      if (saleStatus === NOT_STARTED || saleStatus === FINISHED) {
        // Do something?
        // return
      }
      if (saleStatus === PRESALE) preSaleMint()
      if (saleStatus === PUBLIC_SALE) publicSaleMint()

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
        handleMintClick={handleMint}
      />
    </>
  )
}

export default MintPage
