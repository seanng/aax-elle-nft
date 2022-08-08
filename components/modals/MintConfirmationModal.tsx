import { Dialog, Transition } from '@headlessui/react'
import { CloseIcon, PrimaryButton } from 'components'
import Image from 'next/image'
import { Fragment } from 'react'
import { classNames } from 'utils/helpers'

interface Props {
  form: {
    email: string
    message: string
    passcode: string
    donationInput: number
    donationInEth: number
  }
  isOpen: boolean
  handleMintClick: () => Promise<void>
  closeModal: () => void
  balance: string
}

export function MintConfirmationModal({
  isOpen,
  closeModal,
  balance = '',
  handleMintClick,
  form,
}: Props) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild>
          <div className="fixed inset-0 bg-black-rgba backdrop-blur-3xl transition-opacity" />
        </TransitionChild>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 sm:p-0">
            <TransitionChild>
              <Dialog.Panel className="relative transition-all flex flex-col items-center">
                <div className="h-4 w-[300px] bg-white" />
                <div className="w-[330px] bg-white px-5 pt-9 text-left">
                  <button
                    type="button"
                    className="absolute right-5 -top-10 focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <CloseIcon width={20} height={20} />
                  </button>
                  <h1 className="text-2xl font-mono mb-5 text-center">
                    Review and confirm
                  </h1>
                  {Number(balance) < Number(form.donationInEth) && (
                    <div className="bg-tomato flex px-4 py-4 space-x-4 mb-2">
                      <WarningStamp />
                      <div className="text-white">
                        <p>錢包資產不足</p>
                        <p>請到錢包購買以太幣</p>
                        <a href="#" target="_blank" className="underline">
                          如何買幣？
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="px-4 py-3 border border-lime font-mono mb-3">
                    <p className="font-bold mb-2">告白</p>
                    <p>{form.message}</p>
                    <hr className="my-2 border-lime" />
                    <p className="font-bold mb-2">Email</p>
                    <p>{form.email}</p>
                    <hr className="my-2 border-lime" />
                    <p className="font-bold mb-2">解鎖密碼</p>
                    <p>{form.passcode}</p>
                  </div>
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
                      ETH已包含 gas fee of
                      ~0.00023ETH，台幣金額會依據ETH的浮動匯率而改變
                    </p>
                  </div>
                  <div className="text-center mb-5">
                    <PrimaryButton onClick={handleMintClick}>
                      確定鑄造
                    </PrimaryButton>
                  </div>
                </div>
                <div className="h-4 w-[300px] bg-white" />
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const WarningStamp = ({ className = '', ...props }) => (
  <div
    className={classNames(
      'relative flex flex-col justify-between items-center h-8 w-8 flex-none',
      className
    )}
    {...props}
  >
    <div className="w-6 h-1 bg-white" />
    <div className="flex justify-between items-center w-full">
      <div className="w-1 h-6 bg-white" />
      <div className="text-white font-mono font-bold text-md">!</div>
      <div className="w-1 h-6 bg-white" />
    </div>
    <div className="w-6 h-1 bg-white" />
  </div>
)

const TransitionChild = (props) => (
  <Transition.Child
    as={Fragment}
    enter="ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    {...props}
  />
)
