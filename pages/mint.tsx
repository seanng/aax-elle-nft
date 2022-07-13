import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import StepWizard from 'react-step-wizard'
import type { NextPage } from 'next'
import {
  EmailStep,
  Navigation,
  MessageStep,
  CoverStep,
  PasscodeStep,
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

const PROXY_URI = 'https://jsonkeeper.com/b/BTF9'

const MintPage: NextPage = () => {
  const [form, setForm] = useState({
    email: '',
    message: '',
    code: '',
    donation: null,
  })

  const contract = useContract()
  const { address } = useWeb3Context()

  const handleMint = async () => {
    if (!contract) {
      // Tell user their Wallet is not connected
      return
    }

    try {
      // Get the current MessageTokenID from callStatic
      const contractOpts = { value: ethers.utils.parseEther('0.0005') }
      const messageTokenIdBN = await contract.callStatic.mint(
        PROXY_URI,
        contractOpts
      )
      const messageTokenId = messageTokenIdBN.toString()

      //  TODO: Convert message to image (NFT Image Service)
      // axios.post(`/api/image`, { id: messageTokenId, message })

      await contract.mint(
        `https://elleverse.com/api/metadata/${messageTokenId}`, // messageToken
        `https://elleverse.com/api/metadata/${messageTokenId + 1}` // prizeToken
      )

      // Save Mint in DB.
      const { data: mintData } = await axios.post(`/api/mints`, {
        messageTokenId: Number(messageTokenId),
        message: 'abc',
        minterEmail: 'email@address.com',
        minterWallet: address,
        ethDonated: '0.0005',
        passcode: '',
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

  // useEffect(() => {
  //   // open modal
  //   if (form.donation) {
  //     console.log('in the mintpage useeffect.')
  //   }
  // }, [form.donation])

  return (
    <>
      <Navigation />
      <div className="bg-black min-h-screen pt-28 text-white">
        <StepWizard transitions={transitions}>
          <CoverStep />
          <MessageStep updateForm={updateForm} />
          <EmailStep updateForm={updateForm} />
          <PasscodeStep updateForm={updateForm} />
          <DonationStep updateForm={updateForm} />
        </StepWizard>
      </div>
    </>
  )
}

export default MintPage
