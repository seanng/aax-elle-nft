import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { ErrorIcon } from 'components'

export function SharingModal({ isOpen, closeModal }) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeModal}
        initialFocus={cancelButtonRef}
      >
        <TransitionChild>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full text-center">
            <TransitionChild>
              <Dialog.Panel className="rounded-lg overflow-hidden transition-all">
                <div className="flex flex-col bg-white items-center p-10">
                  <h1 className="text-2xl mb-9">鑄造秘密告白NFT才能抽獎唷！</h1>
                  <div>animation HTML goes here?</div>
                  <div className="inline-grid grid-cols-4 gap-4">
                    <div>btn1</div>
                    <div>btn2</div>
                    <div>btn3</div>
                    <div>btn3</div>
                    <div>btn3</div>
                    <div>btn3</div>
                    <div>btn3</div>
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
