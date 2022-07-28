import { useState } from 'react'
import { ethers } from 'ethers'
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

const PROXY_METADATA_URI = 'https://jsonkeeper.com/b/BTF9'

const MintPage: NextPage = () => {
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [form, setForm] = useState({
    email: '',
    message: '',
    passcode: '',
    donation: '',
  })
  const [estGasFee, setEstGasFee] = useState<string | null>(null)
  const contract = useContract()
  const { address, web3Provider } = useWeb3Context()
  const { publicSaleMint, preSaleMint } = useMint(contract)

  const getBalance = async (): Promise<string | undefined> => {
    if (web3Provider && address) {
      const balance = await web3Provider.getBalance(address)
      return ethers.utils.formatEther(balance)
    }
  }

  const getEstGasFee = async () => {
    if (contract && web3Provider) {
      try {
        const functionFee = await contract.estimateGas.mint(
          PROXY_METADATA_URI,
          PROXY_METADATA_URI,
          { value: ethers.utils.parseEther('0.0001') }
        )
        const feeData = await web3Provider.getFeeData()
        const estGasFeeBN = feeData.maxFeePerGas?.mul(functionFee)
        estGasFeeBN && setEstGasFee(ethers.utils.formatEther(estGasFeeBN))
      } catch (error) {
        console.log('error calculating gas fee: ', error)
        setEstGasFee(null)
      }
    }
  }

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

  // TODO: Uncomment if we are using the "confirm?" modal
  // useEffect(() => {
  //   // open modal
  //   if (form.donation) {
  //     console.log('in the mintpage useeffect.')
  //   }
  // }, [form.donation])

  return (
    <>
      <MintNavigation />
      <div className="bg-white min-h-screen pt-16 text-black">
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
            getEstGasFee={getEstGasFee}
            estGasFee={estGasFee}
            getBalance={getBalance}
          />
        </StepWizard>
      </div>
      <SharingModal
        isOpen={isSharingModalOpen}
        closeModal={setIsSharingModalOpen}
      />
      <MintConfirmationModal
        form={form}
        isOpen={isConfirmModalOpen}
        closeModal={setIsConfirmModalOpen}
      />
    </>
  )
}

export default MintPage
