import { useState } from 'react'
import StepWizard from 'react-step-wizard'
import type { NextPage } from 'next'
import {
  EmailStep,
  PasscodeStep,
  MintNavigation,
  MessageStep,
  CoverStep,
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
  const { getBalance, balance } = useWeb3Context()
  const { preSaleMint, publicSaleMint, calcEthToNtd, ethToNtd, form, setForm } =
    useMint(contract)

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

  const handleDonateClick = ({ donation }) => {
    updateForm({ donation })
    setIsConfirmModalOpen(true)
  }

  return (
    <>
      <MintNavigation />
      <div className="bg-white min-h-screen pt-32 text-black">
        <StepWizard transitions={transitions} nav={<Stepper />}>
          <CoverStep handleMintClick={handleMint} />
          <MessageStep
            updateForm={updateForm}
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
            getBalance={getBalance}
            balance={balance}
          />
        </StepWizard>
      </div>
      <SharingModal
        isOpen={isSharingModalOpen}
        closeModal={setIsSharingModalOpen}
      />
      <MintConfirmationModal
        balance={balance}
        form={form}
        isOpen={isConfirmModalOpen}
        setOpen={setIsConfirmModalOpen}
        handleMintClick={handleMint}
      />
    </>
  )
}

export default MintPage
