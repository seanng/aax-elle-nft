import { ReactNode, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
  isOpen: boolean
  children: ReactNode
  onClose: () => {}
}

export function Container({ isOpen, children, onClose }: Props) {
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
                {children}
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export const TransitionChild = (props) => (
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
