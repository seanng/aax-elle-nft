import Image from 'next/image'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { IGIcon, TwitterIcon, FBIcon } from 'components'

export function WelcomeNavigation() {
  return (
    <Popover as="header" className="fixed left-0 right-0 z-10 font-noto">
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
  <div className="flex justify-end md:justify-between items-center mx-auto px-8 py-6 md:px-10 bg-black-rgba-70">
    <div className="hidden md:block">
      <Logo />
    </div>
    <Hamburger />
  </div>
)

const Panel = () => (
  <Popover.Panel focus className="h-full z-30 bg-[#3D3D3D]">
    {/* Header */}
    <div className="flex items-center justify-between px-8 py-6 md:px-10">
      <Logo />
      <CloseButton />
    </div>
    {/* Body */}
    <div className="h-full flex flex-col justify-evenly">
      <div className="text-center text-white text-3xl md:text-6xl font-bold ">
        <div className="mb-7 md:mb-16">
          <Link href="/help">
            <a className="">MY SECRET</a>
          </Link>
        </div>
        <div className="mb-7 md:mb-16">
          <Link href="/help">
            <a className="text-white">新手教學</a>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FBIcon className="h-16 w-16 md:h-28 md:w-28" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <IGIcon className="h-16 w-16 md:h-28 md:w-28" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <TwitterIcon className="h-16 w-16 md:h-28 md:w-28" />
        </a>
      </div>
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
      <MenuIcon className="text-white h-10 w-20" aria-hidden="true" />
    </Popover.Button>
  </div>
)

const CloseButton = () => (
  <div className="mr-4">
    <Popover.Button className="bg-transparent p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none">
      <span className="sr-only">Close menu</span>
      <XIcon className="h-10 w-10 text-white" aria-hidden="true" />
    </Popover.Button>
  </div>
)

// see https://github.com/codeSTACKr/hamburger-animation if you want to make an animated hamburger
