import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Web3Button } from './Web3Button'

const Logo = () => (
  <Link href="/">
    <a className="text-xl">ELLE NFT</a>
  </Link>
)

export function LayoutHeader() {
  return (
    <Popover as="header" className="absolute left-0 right-0">
      <div className="flex justify-between items-center mx-auto px-4 py-6 sm:px-6 lg:px-8 md:justify-start md:space-x-10 ">
        <Logo />
        {/* Mobile Hamburger Button */}
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        {/* Desktop Nav Center */}
        <nav className="hidden md:flex space-x-10 pl-7">
          <Link href="https://help.com">
            <a target="">Help</a>
          </Link>
          <Link href="/collection">
            <a>Collection</a>
          </Link>
        </nav>
        {/* Desktop Nav Right */}
        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <Web3Button />
        </div>
        {/* Mobile Nav Dropdown */}
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                {/* Mobile Nav Dropdown Header */}
                <div className="flex items-center justify-between">
                  <Logo />
                  {/* Close Button */}
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                {/* Mobile Nav Dropdown Body */}
                <nav className="grid grid-cols-1 gap-7 mt-6">
                  <Link href="/help">
                    <a>Help</a>
                  </Link>
                  <Link href="/collection">
                    <a>Collection</a>
                  </Link>
                </nav>
              </div>
              {/* Mobile Nav Dropdown Footer */}
              <div className="pt-5 pb-6 px-5">
                <Web3Button />
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  )
}
