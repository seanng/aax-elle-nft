import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { PrimaryButton } from 'components/buttons'
import { Fragment, useRef } from 'react'

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
  setOpen: (b: boolean) => void
  balance: string
}

export function MintConfirmationModal({
  isOpen,
  setOpen,
  balance = '',
  handleMintClick,
  form,
}: Props) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setOpen}
        initialFocus={cancelButtonRef}
      >
        <TransitionChild>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 sm:p-0">
            <TransitionChild>
              <Dialog.Panel className="relative rounded-lg bg-white overflow-hidden shadow-xl transition-all px-6 py-8 w-full sm:my-8 sm:max-w-lg">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <h1 className="text-2xl font-mono mb-6">Review and confirm</h1>
                <div className="rounded-lg border border-gray-200 p-4 font-noto">
                  <p className="font-bold mb-2">告白</p>
                  <p>{form.message}</p>
                  <hr className="text-gray-200 my-2" />
                  <p className="font-bold mb-2">Email</p>
                  <p>{form.email}</p>
                  <hr className="text-gray-200 my-2" />
                  <p className="font-bold mb-2">解鎖密碼</p>
                  <p>{form.passcode}</p>
                </div>
                <div className="py-6 px-4">
                  <p className="font-bold mb-2">捐款金額</p>
                  <div className="flex space-x-2 font-mono items-center">
                    <div className="text-[#2FB500] font-bold">
                      NTD {form.donationInput}
                    </div>
                    <div className="text-gray-400 text-xs">
                      (已包含 gas fee)
                    </div>
                  </div>
                </div>
                {Number(balance) < Number(form.donationInput) && (
                  <div>you have no money pls top up thx</div>
                )}
                <PrimaryButton onClick={handleMintClick}>
                  確定鑄造
                </PrimaryButton>
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
