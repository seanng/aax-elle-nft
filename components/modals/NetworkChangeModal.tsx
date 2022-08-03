import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export function NetworkChangeModal({
  isOpen,
  handleChangeNetwork,
  closeModal,
}) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full text-center">
            <TransitionChild>
              <Dialog.Panel className="flex rounded-lg overflow-hidden shadow-xl transition-all">
                <div className="flex items-center px-4 border-l-4 border-pomegranate bg-[#FFF2F2]">
                  error
                </div>
                <div className="py-4 bg-white text-left px-4 text-base">
                  <h4 className="text-base font-semibold">切換 Network</h4>
                  <p>請到手機App或網頁版錢包切換</p>
                  <p>至 Ethereum Main Network</p>
                  <div className="flex justify-end w-full">
                    <button
                      type="button"
                      className="mt-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:text-sm"
                      onClick={handleChangeNetwork}
                    >
                      Switch Network
                    </button>
                  </div>
                </div>
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
