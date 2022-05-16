import { useState } from 'react'
import { ExitSvg, HamburgerSvg } from 'components'
import Link from 'next/link'
import { Web3Button } from './Web3Button'

export function LayoutHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="flex flex-row justify-between px-4 py-2 ">
      {/* Logo */}
      <Link href="/">
        <a className="text-xl">ELLE NFT</a>
      </Link>

      {/* Desktop */}
      <nav>
        <ul className="hidden md:flex justify-between w-full text-black">
          <li className="mx-2">
            <Link href="/collection">
              <a>Collection</a>
            </Link>
          </li>
          <li className="mx-2 ">
            <Link href="/help">
              <a>Help</a>
            </Link>
          </li>
          <li className="mx-2 ">
            <Web3Button />
          </li>
        </ul>
      </nav>

      <div className="md:hidden">
        {/* Mobile Button */}
        <div className="flex items-center h-12 text-gray-700 dark:text-white">
          <button
            className="px-4 h-full text-black"
            aria-label="Toggle Mobile Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <ExitSvg /> : <HamburgerSvg />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="absolute z-50 bottom-0 left-0 right-0 top-12 px-16 dark:bg-black bg-white border-t border-gray-200 dark:border-gray-800">
            <ul className="text-white">
              <li className="pt-8">
                <Link href="/collection">
                  <a>Collection</a>
                </Link>
              </li>
              <li className="pt-8">
                <Link href="/help">
                  <a>Help</a>
                </Link>
              </li>
              <li className="pt-8">
                <Web3Button />
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
