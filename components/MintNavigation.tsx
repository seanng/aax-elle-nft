import Image from 'next/image'
import { Popover } from '@headlessui/react'
import Link from 'next/link'
import { HamburgerIcon, WalletIcon, ErrorIcon } from 'components'
import { useWeb3Context } from 'context'
import { useEffect, useState } from 'react'
import { CORRECT_HEX_CHAIN } from 'shared/constants'

export function MintNavigation() {
  return (
    <Popover as="header" className="block left-0 right-0 z-10">
      <Navbar />
      <Panel />
    </Popover>
  )
}

const Navbar = () => (
  <div className="flex justify-between items-center px-4 py-3 bg-black">
    <Logo />
    <div className="flex items-center">
      <Web3Button />
      <Hamburger />
    </div>
  </div>
)

const Panel = () => (
  <Popover.Panel className="absolute z-10 right-4 rounded-lg shadow-lg bg-white p-6 space-y-6 font-noto text-sm">
    <div>新手指南</div>
    <div>My collection</div>
  </Popover.Panel>
)

const Logo = () => (
  <Link href="/">
    <a>
      <Image
        priority
        src="/logos/elle-white.png"
        alt="ELLE"
        height={24}
        width={64}
      />
    </a>
  </Link>
)

const Hamburger = () => (
  <div>
    <Popover.Button className="bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none">
      <span className="sr-only">Open menu</span>
      <HamburgerIcon />
    </Popover.Button>
  </div>
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
    <Popover>
      <Popover.Button className="border-white pr-2 flex rounded-full mr-4 border items-center">
        <div
          className={`rounded-full ${
            walletHasError ? 'bg-pomegranate' : 'bg-white'
          }`}
        >
          {walletHasError ? <ErrorIcon /> : <WalletIcon />}
        </div>
        <div className="text-white font-mono font-medium text-xs ml-2">
          {`${address?.slice(0, 4)}...${address?.slice(-3)}`}
        </div>
      </Popover.Button>
      <Popover.Panel className="absolute z-10 mt-2 right-16 rounded-lg shadow-lg bg-white p-6 font-noto text-sm">
        <button onClick={disconnect ? disconnect : () => {}}>Disconnect</button>
      </Popover.Panel>
    </Popover>
  ) : (
    <button
      onClick={connect}
      className="bg-white px-2 rounded-full font-mono font-medium text-xs mr-4 py-1"
    >
      Connect
    </button>
  )
}

// see https://github.com/codeSTACKr/hamburger-animation if you want to make an animated hamburger
