import { Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import {
  HamburgerIcon,
  CloseIcon,
  ConnectButton,
  AddressOKButton,
  AddressErrorButton,
} from 'components'
import { useWeb3Context } from 'context'
import { CORRECT_HEX_CHAIN } from 'shared/constants'

export function MintNavigation() {
  return (
    <Popover as="header" className="fixed left-0 right-0 z-10">
      <Navbar />
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

const Navbar = () => (
  <div className="flex justify-between items-center px-4 h-navbar-height bg-black">
    <Logo />
    <div className="flex items-center space-x-4">
      <Web3Button />
      <Hamburger />
    </div>
  </div>
)

const Panel = () => (
  <Popover.Panel focus className="h-full z-30 bg-black-rgba backdrop-blur-3xl">
    <div className="flex justify-between items-center px-4 py-4">
      <Logo />
      <CloseButton />
    </div>
    <div
      className="h-full flex flex-col bg-repeat py-2 pl-6 text-4xl text-lime font-bold font-noto leading-[150%] space-y-4"
      style={{
        backgroundImage: `linear-gradient(to right, #55F263 0.1px, transparent 1px), linear-gradient(to bottom, #55F263 0.1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    >
      <Link href="/mint">
        <a className="font-noto">鑄造首頁</a>
      </Link>
      <Link href="/">
        <a className="font-noto">新手指南</a>
      </Link>
      <Link href="/">
        <a className="font-mono">My Collection</a>
      </Link>
      <Link href="/">
        <a className="font-mono">Instagram</a>
      </Link>
      <Link href="/">
        <a className="font-mono">Facebook</a>
      </Link>
    </div>
  </Popover.Panel>
)

const Logo = () => (
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

const Hamburger = () => (
  <div className="-mr-2">
    <Popover.Button className="bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none">
      <span className="sr-only">Open menu</span>
      <HamburgerIcon />
    </Popover.Button>
  </div>
)

const CloseButton = () => (
  <Popover.Button className="bg-transparent p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none">
    <span className="sr-only">Close menu</span>
    <CloseIcon />
  </Popover.Button>
)

const Web3Button = () => {
  const { web3Provider, address, connect, disconnect, provider } =
    useWeb3Context()
  const [walletHasError, setWalletHasError] = useState(false)

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
      <Popover.Panel className="absolute z-10 mt-2 right-16 rounded-lg shadow-lg bg-white p-6 font-noto text-sm">
        <button onClick={disconnect ? disconnect : () => {}}>Disconnect</button>
      </Popover.Panel>
    </Popover>
  ) : (
    <button type="button" onClick={connect}>
      <ConnectButton />
    </button>
  )
}
// see https://github.com/codeSTACKr/hamburger-animation if you want to make an animated hamburger
