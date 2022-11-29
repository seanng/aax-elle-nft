import Image from 'next/image'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { BaseModal } from './BaseModal'

export function ConnectModal({ isOpen, closeModal, connect }) {
  const [hasMetaMask, setHasMetaMask] = useState(false)

  const handleMetaMaskButtonClick = () => {
    hasMetaMask ? connect() : window.open('https://metamask.io/download')
  }

  useEffect(() => {
    if (window.ethereum) {
      setHasMetaMask(true)
    }
  }, [])

  return (
    <BaseModal onClose={closeModal} isOpen={isOpen} showsCloseIcon>
      <div className="px-4 pt-6 md:pt-8 pb-20 text-center md:text-lg">
        <h4 className="text-2xl md:text-3xl mb-8">連結錢包</h4>
        <div className="mb-4">
          我還沒有錢包
          <a
            className="ml-2 underline text-cyan-600"
            target="_blank"
            href="https://www.accucrazy.com/category/crzy-newbie/"
            rel="noreferrer"
          >
            為什麼需要虛擬錢包？
          </a>
        </div>
        <MetaMaskButton
          hasMetaMask={hasMetaMask}
          className="mb-8"
          onClick={handleMetaMaskButtonClick}
        />
        {/* <p className="mb-4">下載AAX錢包獲得 50 USDT</p>
        <a target="__blank" href="https://aax.com">
          <Image
            alt="aax promotion"
            src="/images/aax-modal-promotion.jpg"
            layout="fixed"
            objectFit="contain"
            width="288px"
            height="97px"
          />
        </a> */}
      </div>
    </BaseModal>
  )
}

const MetaMaskButton = ({ onClick, hasMetaMask = false, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx('relative ', className)}
  >
    <svg
      height={106}
      width={284}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 284 106"
    >
      <path fill="#EDFA00" d="M0 0h279v101H0z" />
      <path
        fill="#3563E9"
        d="M278 5h6v101h-6zM5 100h273v6H5zM278 2h3v1h-3zM278 3h4v1h-4zM278 4h5v1h-5zM278 0h1v1h-1zM278 1h2v1h-2zM5 103H2v-1h3zM5 102H1v-1h4zM5 101H0v-1h5zM5 105H4v-1h1zM5 104H3v-1h2z"
      />
    </svg>
    <div className="absolute mx-auto font-noto top-4 w-full flex flex-col items-center">
      <div className="flex space-x-2 mb-3 items-center mr-2">
        <Image
          alt="Metamask"
          src="/images/MetaMask-Emblem 1.png"
          layout="fixed"
          objectFit="contain"
          width="40px"
          height="32px"
        />
        <span className="font-mono">MetaMask</span>
      </div>
      <span>
        {' '}
        {hasMetaMask ? '連結你的 MetaMask 錢包' : 'Install MetaMask'}
      </span>
    </div>
  </button>
)
