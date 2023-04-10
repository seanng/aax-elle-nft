import { Dialog, Transition } from '@headlessui/react'
import { ModalCloseButton, PrimaryButton } from 'components'
import Image from 'next/image'
import { ReactNode, Fragment } from 'react'
import { BaseModal } from './BaseModal'

interface Props {
  form: {
    email: string
    message: string
    passcode: string
    donationInput: number
    donationInEth: number
  }
  isOpen: boolean
  onMintClick: () => Promise<void>
  closeModal: () => void
  errorComponent?: ReactNode | null
  mintGasFee: string
}

export function MintConfirmationModal({
  isOpen,
  closeModal,
  onMintClick,
  mintGasFee,
  errorComponent = null,
  form,
}: Props) {
  return (
    <BaseModal isOpen={isOpen} onClose={closeModal} showsCloseIcon>
      <div className="px-5 md:px-20 pt-9 text-left">
        <h1 className="text-[22px] font-mono mb-5 text-center">
          Review and confirm
        </h1>
        {errorComponent}
        <div className="px-4 py-3 border border-lime font-mono mt-2 mb-3">
          <p className="font-bold mb-2">告白</p>
          <p>{form.message}</p>
          <hr className="my-2 border-lime" />
          <p className="font-bold mb-2">Email</p>
          <p>{form.email}</p>
          <hr className="my-2 border-lime" />
          <p className="font-bold mb-2">解鎖密碼</p>
          <p>{form.passcode}</p>
        </div>
        {process.env.NEXT_PUBLIC_AIRDROP ? null : (
          <>
            <p className="font-medium px-4">捐款金額</p>
            <div className="flex pl-4 space-x-1 font-mono items-end mb-2">
              <div className="font-medium underline text-2xl tracking-wide">
                ~ETH {Number(form.donationInEth).toFixed(5)}
              </div>
              <div className="text-gray-400 text-xs mb-1">
                {`(NTD${form.donationInput})`}
              </div>
            </div>
            <div className="flex mb-5 space-x-1 px-4">
              <Image
                src="/images/tiny-gray-error-icon.png"
                layout="fixed"
                objectFit="contain"
                height="15px"
                width="15px"
                className="flex-none"
              />
              <p className="text-gray-400 font-mono text-xs leading-150%">
                ETH已包含 gas fee of ~ETH {Number(mintGasFee).toFixed(5)}
                ，台幣金額會依據ETH的浮動匯率而改變
              </p>
            </div>
          </>
        )}
        <div className="text-center mb-5">
          <PrimaryButton
            onClick={onMintClick}
            type="button"
            disabled={!!errorComponent}
          >
            確定鑄造
          </PrimaryButton>
        </div>
      </div>
    </BaseModal>
  )
}
