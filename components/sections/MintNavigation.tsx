import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import {
  HamburgerIcon,
  ModalCloseButton,
  AddressOKButton,
  DisconnectIcon,
  MobilePrimaryButton,
  AddressErrorButton,
} from 'components'
import { useDetectionContext, useWeb3Context } from 'context'
import { CORRECT_HEX_CHAIN } from 'utils/config'
import { SAFARI } from 'shared/constants'

export function MintNavigation() {
  return (
    <Popover as="header" className="fixed left-0 right-0 z-10">
      <div className="flex justify-between items-center px-4 h-navbar-height bg-black">
        <Logo />
        <div className="flex items-center space-x-4">
          <Web3Button />
          <Hamburger />
        </div>
      </div>
      <Transition
        className="absolute top-0 h-screen w-full"
        enter="transition-all duration-1000 ease-out"
        enterFrom="transform max-h-0"
        enterTo="transform max-h-[2000px]"
        leave="transition-all duration-300"
        leaveFrom="transform max-h-[2000px]"
        leaveTo="transform max-h-0 opacity-0"
      >
        <Panel />
      </Transition>
    </Popover>
  )
}

const Panel = () => (
  <Popover.Panel
    focus
    className="h-full z-30 bg-black-rgba-70 backdrop-blur-3xl flex flex-col"
  >
    {/* mobile */}
    <div
      className="md:hidden bg-repeat h-full w-full"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(85, 242, 99, 0.5) 0.1px, transparent 1px), linear-gradient(to bottom, rgba(85, 242, 99, 0.5) 0.1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    >
      <CloseButton />
      <Nav />
    </div>
    {/* desktop */}
    <div className="hidden md:flex flex-col h-[797px] self-end pr-10 w-[321px]">
      <CloseButton />
      <div
        className="bg-repeat h-full"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(85, 242, 99, 0.5) 0.1px, transparent 1px), linear-gradient(to bottom, rgba(85, 242, 99, 0.5) 0.1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        <Nav />
      </div>
    </div>
  </Popover.Panel>
)

const CloseButton = () => (
  <div className="flex justify-end items-center px-4 h-navbar-height">
    <Popover.Button
      className="p-2"
      width={25}
      height={25}
      as={ModalCloseButton}
    />
  </div>
)

const Nav = () => (
  <div className="h-full flex flex-col bg-repeat py-2 pl-6 text-4xl text-lime font-bold font-mono leading-150% space-y-4 md:space-y-7 md:pt-8">
    <Link href="/welcome">
      <a>ELLEverse</a>
    </Link>
    <a href="https://www.aax.com/zh-TW/newbie/">新手指南</a>
    <Link href="/collection">
      <a>我的秘密告白</a>
    </Link>
    <Link href="/">
      <a>Instagram</a>
    </Link>
    <Link href="/">
      <a>Facebook</a>
    </Link>
  </div>
)

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Image
          priority
          src="/logos/elle-white.png"
          alt="ELLE"
          height={46}
          width={112}
        />
      </a>
    </Link>
  )
}

const Hamburger = () => (
  <div className="-mr-2">
    <Popover.Button className="bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none">
      <span className="sr-only">Open menu</span>
      <HamburgerIcon />
    </Popover.Button>
  </div>
)

const Web3Button = () => {
  const { web3Provider, address, openConnectModal, disconnect, provider } =
    useWeb3Context()
  const [walletHasError, setWalletHasError] = useState(false)
  const {
    browser,
    setIsWrongBrowserModalOpen,
    isProcessingCloseClick,
    setIsProcessingCloseClick,
  } = useDetectionContext()

  const handleConnectClick = () => {
    if (browser === SAFARI) {
      setIsWrongBrowserModalOpen(true)
      return
    }
    openConnectModal()
  }

  useEffect(() => {
    if (isProcessingCloseClick) {
      setIsProcessingCloseClick(false)
      setIsWrongBrowserModalOpen(false)
    }
  }, [isProcessingCloseClick])

  useEffect(() => {
    if (provider?.on) {
      provider?.on('chainChanged', (_hexChainId: string) => {
        setWalletHasError(_hexChainId !== CORRECT_HEX_CHAIN)
      })
    }
  }, [provider])

  return web3Provider ? (
    <Popover className="flex flex-col justify-center">
      <Popover.Button className="relative">
        {walletHasError ? <AddressErrorButton /> : <AddressOKButton />}
        <div className="absolute top-2 right-2 text-black font-mono text-sm ">
          {`${address?.slice(0, 4)}...${address?.slice(-2)}`}
        </div>
      </Popover.Button>
      <Popover.Panel className="absolute z-10 top-navbar-height -mt-3 right-4 bg-white p-6 ">
        <button
          className="flex space-x-2"
          onClick={disconnect ? disconnect : () => {}}
        >
          <DisconnectIcon />
          <span className="text-lg">退出錢包連結</span>
        </button>
      </Popover.Panel>
    </Popover>
  ) : (
    <MobilePrimaryButton type="button" onClick={handleConnectClick}>
      連結錢包
    </MobilePrimaryButton>
  )
}
// see https://github.com/codeSTACKr/hamburger-animation if you want to make an animated hamburger
