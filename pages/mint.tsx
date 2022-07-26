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
} from 'components'
import Animate from 'styles/animate.module.css'
import { useContract } from 'hooks'
import axios from 'lib/axios'
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
  const [form, setForm] = useState({
    email: '',
    message: '',
    passcode: '',
    donation: '',
  })
  const [estGasFee, setEstGasFee] = useState<string | null>(null)
  const contract = useContract()
  const { address, web3Provider } = useWeb3Context()

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
      const mintOpts = { value: ethers.utils.parseEther(form.donation) }
      const payload = {
        messageTokenId: null as number | null,
        isPresale: saleStatus === PRESALE,
        message: form.message,
        minterEmail: form.email,
        minterWallet: address,
        ethDonated: form.donation,
        passcode: form.passcode,
      }

      if (saleStatus === PRESALE) {
        // check if user has whitelist token.
        const hasWhitelistToken = await contract.ownsWhitelistToken(address)
        if (!hasWhitelistToken) throw new Error(NO_WHITELIST_TOKEN)
        const tokenIdBN = await contract.preSaleMint(mintOpts)
        payload.messageTokenId = Number(tokenIdBN.toString())
      } else if (saleStatus === PUBLIC_SALE) {
        const tokenIdBN = await contract.publicSaleMint(mintOpts)
        payload.messageTokenId = Number(tokenIdBN.toString())
      }
      // TODO: Upload images & HTMLs to S3
      //  TODO: Convert message to image (NFT Image Service) OR a frontend function.
      // axios.post(`/api/image`, { id: messageTokenId, message })

      // If frontend function, upload file(s) onto S3

      // Save Mint in DB.
      const { data: mintData } = await axios.post(`/api/mints`, payload)

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
          <CoverStep />
          <MessageStep
            updateForm={updateForm}
            openSharingModal={() => setIsSharingModalOpen(true)}
          />
          <EmailStep updateForm={updateForm} />
          <PasscodeStep updateForm={updateForm} />
          <DonationStep
            updateForm={updateForm}
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
    </>
  )
}

export default MintPage
