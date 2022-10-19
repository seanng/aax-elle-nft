import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { PrimaryButton, WarningIcon } from 'components'

export function NetworkChangeModal({ isOpen, handleChangeNetwork }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <TransitionChild>
          <div className="fixed inset-0 bg-black-rgba-70 backdrop-blur-3xl transition-opacity" />
        </TransitionChild>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full text-center">
            <TransitionChild>
              <Dialog.Panel className="transition-all relative flex flex-col items-center">
                <div className="h-4 w-mobile-modal-top md:w-desktop-modal-top bg-white" />
                <div className="w-mobile-modal-body md:w-desktop-modal-body bg-white px-4 md:px-24 pt-6 md:pt-10 pb-5 md:pb-10 text-center">
                  <WarningIcon className="mx-auto mb-6" />
                  <h4 className="font-medium text-2xl mb-2 md:mb-3 leading-150%">
                    切換 Network
                  </h4>
                  <p className="mb-4 md:mb-8 md:text-lg">
                    請到手機App或網頁版錢包切換至 Ethereum Main Network
                  </p>
                  <PrimaryButton onClick={handleChangeNetwork}>
                    切換 Network
                  </PrimaryButton>
                </div>
                <div className="h-4 w-mobile-modal-top md:w-desktop-modal-top bg-white" />
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

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
