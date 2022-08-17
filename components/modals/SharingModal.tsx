import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { SocialButtons, ModalCloseButton } from 'components'

export function SharingModal({ isOpen, closeModal }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild>
          <div className="fixed inset-0 bg-black-rgba-70 backdrop-blur-3xl transition-opacity" />
        </TransitionChild>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 sm:p-0">
            <TransitionChild>
              <Dialog.Panel className="relative transition-all flex flex-col items-center">
                <div className="h-4 w-[300px] bg-white" />
                <div className="w-[330px] bg-white pt-7 text-center">
                  <ModalCloseButton
                    onClick={closeModal}
                    className="absolute right-5 -top-10"
                  />
                  <h1 className="text-xl mb-2">愛要告訴全世界</h1>
                  {/* Animated NFT Image Component @denis */}
                  <SocialButtons className="mb-2" />
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
