import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'

interface Props {
  form: {
    email: string
    message: string
    passcode: string
    donation: string
  }
  isOpen: boolean
  closeModal: (b: boolean) => void
}

export function MintConfirmationModal({ isOpen, closeModal, form }: Props) {
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
                  <h1 className="text-2xl mb-9">Confirm your stuff!!!</h1>
                  <div>{JSON.stringify(form.donation)}</div>
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
