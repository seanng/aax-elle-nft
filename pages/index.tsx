import type { NextPage } from 'next'
import {
  FaqSection,
  EncryptDialog,
  LayoutHeader,
  // HeroSectionOld,
  HeroSection,
  IntroSection,
  FeaturesSection,
} from 'components'
import { useState } from 'react'
import { useContract } from 'hooks'
import { ethers } from 'ethers'
import axios from 'lib/axios'
import { useWeb3Context } from 'context'
import { toast, ToastContainer } from 'react-toastify'
import ReactFullpage from '@fullpage/react-fullpage'

// const GIFT_TOKEN_URI = 'https://jsonkeeper.com/b/SFRG'
const PROXY_URI = 'https://jsonkeeper.com/b/BTF9'
const RECEIPT_TOKEN_URI = 'https://jsonkeeper.com/b/G7TR'
const RECEIVER_ADDRESS = '0xCD1E014Eee1c8E7FcB49eB1AaAeA58154004E554'

const HomePage: NextPage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState(0)

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex)
    setPreviousIndex(swiper.previousIndex)
  }

  return (
    <>
      <LayoutHeader />
      <ReactFullpage
        navigation
        render={(comp) => (
          <ReactFullpage.Wrapper>
            <HeroSection />
            <IntroSection />
            {/* ExplainerSection */}
            <FeaturesSection />
            <FaqSection />
          </ReactFullpage.Wrapper>
        )}
      />
      <ToastContainer
        hideProgressBar
        position="bottom-right"
        autoClose={2000}
      />
    </>
  )
}

function Old() {
  const [isOpen, setIsOpen] = useState(false)
  const { address } = useWeb3Context()
  const contract = useContract()

  const handleMint = async () => {
    if (!contract) {
      // Tell user their Wallet is not connected
      return
    }
    let filename = ''
    try {
      // TODO: change donation amount
      const contractOpts = { value: ethers.utils.parseEther('0.0005') }
      const tokenIdBN = await contract.callStatic.mint(PROXY_URI, contractOpts)
      const tokenId = tokenIdBN.toString()
      // upload json metadata to s3
      const {
        data: { url: tokenURI },
      } = await axios.get(`/api/upload-metadata`)
      filename = tokenURI.split('/')[tokenURI.split('/').length - 1]
      await contract.mint(tokenURI, contractOpts)

      // create SecretMessage on DB.
      const { data: secretMessage } = await axios.post(`/api/secret-messages`, {
        message: 'abc',
        senderEmail: 'email@address.com',
        senderWallet: address,
        ethDonated: '0.0005',
        isPrivateOnly: true,
        password: '',
        tokenURI,
        nftTokenId: Number(tokenId),
      })
      // Do something on success.
      toast.success('Successfully minted NFT with token ID: ', tokenId)
    } catch (error) {
      if (error.code) {
        // This means there was a transaction related error, so we delete the uploaded json
        await axios.delete(`/api/upload-metadata?filename=${filename}`)
      }
    }
  }
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-24 bg-gray-100 min-h-screen">
      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
        onClick={handleMint}
      >
        donate 0.0005 eth & mint
      </button>
      <FaqSection />

      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
        onClick={() => setIsOpen(true)}
      >
        open modal
      </button>
      <EncryptDialog setOpen={setIsOpen} open={isOpen} />
    </div>
  )
}

export default HomePage
