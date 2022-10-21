import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ModalCloseButton } from 'components'

export function BaseModal({
  isOpen,
  children,
  onClose,
  showsCloseIcon = false,
}) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-modal" onClose={onClose}>
        <TransitionChild>
          <div className="fixed inset-0 bg-black-rgba-70 backdrop-blur-3xl transition-opacity" />
        </TransitionChild>
        <div className="fixed z-modal inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 sm:p-0">
            <TransitionChild>
              <Dialog.Panel className="transition-all relative flex flex-col items-center">
                {showsCloseIcon && (
                  <ModalCloseButton
                    onClick={onClose}
                    className="absolute right-5 -top-10"
                  />
                )}
                <div className="h-4 w-mobile-modal-top md:w-desktop-modal-top bg-white" />
                <div className="w-mobile-modal-body md:w-desktop-modal-body bg-white">
                  {children}
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
