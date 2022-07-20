import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import StepWizard from 'react-step-wizard'
import type { NextPage } from 'next'
import {
  EmailStep,
  MintNavigation,
  MessageStep,
  CoverStep,
  DonationStep,
} from 'components'
import Animate from 'styles/animate.module.css'
import { useContract } from 'hooks'
import axios from 'lib/axios'
import { useWeb3Context } from 'context'

// TODO: change to Tailwind animation classes?
const transitions = {
  enterRight: `${Animate.animated} ${Animate.fadeInDown}`,
  enterLeft: `${Animate.animated} ${Animate.fadeInUp}`,
  exitRight: `${Animate.animated} ${Animate.fadeOutDown}`,
  exitLeft: `${Animate.animated} ${Animate.fadeOutUp}`,
}

const PROXY_METADATA_URI = 'https://jsonkeeper.com/b/BTF9'

const MintPage: NextPage = () => {
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
      // Get the current MessageTokenID from callStatic
      const messageTokenIdBN = await contract.callStatic.mint(
        PROXY_METADATA_URI,
        PROXY_METADATA_URI, // proxy prizeToken URI
        { value: ethers.utils.parseEther(form.donation) }
      )
      const messageTokenId = messageTokenIdBN.toString()

      //  TODO: Convert message to image (NFT Image Service) OR a frontend function.
      // axios.post(`/api/image`, { id: messageTokenId, message })

      // If frontend function, upload file(s) onto S3

      await contract.mint(
        `https://elleverse.com/api/metadata/${messageTokenId}`, // messageToken
        `https://elleverse.com/api/metadata/${messageTokenId + 1}`, // WLToken / prizeToken
        { value: ethers.utils.parseEther(form.donation) }
      )

      // Save Mint in DB.
      const { data: mintData } = await axios.post(`/api/mints`, {
        messageTokenId: Number(messageTokenId),
        message: form.message,
        minterEmail: form.email,
        minterWallet: address,
        ethDonated: form.donation,
        passcode: form.passcode,
        isPresale: false,
      })

      // Do something on success? Here or in Donation Step.
    } catch (error) {
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
      <div className="bg-black min-h-screen pt-28 text-white">
        <StepWizard transitions={transitions}>
          <CoverStep />
          <MessageStep updateForm={updateForm} />
          <EmailStep updateForm={updateForm} />
          <DonationStep
            updateForm={updateForm}
            getEstGasFee={getEstGasFee}
            estGasFee={estGasFee}
            getBalance={getBalance}
          />
        </StepWizard>
      </div>
    </>
  )
}

export default MintPage
