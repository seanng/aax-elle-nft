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
                <div className="h-4 w-72 bg-white" />
                <div className="w-80 bg-white px-4 pt-6 pb-5 text-center">
                  <WarningIcon className="mx-auto mb-6" />
                  <h4 className="font-medium text-2xl mb-2 leading-150%">
                    切換 Network
                  </h4>
                  <p className="mb-4">
                    請到手機App或網頁版錢包切換至 Ethereum Main Network
                  </p>
                  <PrimaryButton onClick={handleChangeNetwork}>
                    切換 Network
                  </PrimaryButton>
                  <div className="block mt-3">
                    <a className="text-blue-500 underline font-mono">
                      Learn More
                    </a>
                  </div>
                </div>
                <div className="h-4 w-72 bg-white" />
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
