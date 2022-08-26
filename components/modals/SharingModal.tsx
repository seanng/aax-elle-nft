import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import {
  SocialButtons,
  ToastMessage,
  ModalCloseButton,
  WarningIcon,
} from 'components'
import { Files } from 'shared/types'
import { toast } from 'react-toastify'

interface Props {
  isOpen: boolean
  closeModal: () => void
  files: Files
}

export function SharingModal({ isOpen, closeModal, files }: Props) {
  const [preview, setPreview] = useState<string | ArrayBuffer>('') // eslint-disable-line

  useEffect(() => {
    if (files.beforeOpenHtml) {
      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => setPreview(reader.result ?? ''),
        false
      )

      reader.readAsText(files.beforeOpenHtml)
    }
  }, [files.beforeOpenHtml])

  const handleDLClick = () => {
    if (!files.beforeOpenImage) return

    const reader = new FileReader()

    reader.addEventListener(
      'load',
      () => {
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.href = reader.result as string
        a.download = 'My_Secret.png'
        a.click()
        toast.success(
          <ToastMessage heading="成功下載告白圖片" body="請至手機相簿瀏覽" />
        )
        document.body.removeChild(a)
      },
      false
    )

    reader.readAsDataURL(files.beforeOpenImage)
  }

  const handleIGClick = () => {
    // TODO: change beforeOpenImage to igStoryImage
    if (!files.beforeOpenImage) return

    // Open a new NextJS Page (_target=blank) that renders the IG image + instructions.

    // Page must instruct the user how to save the image to his/her phone.
    // For instance on iOS, user must hold down the image in order to save photo to phone.
    // Page can have a button that directs the user to instagram://story-camera (see: https://stackoverflow.com/a/65893635) photo is saved.
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild>
          <div className="fixed inset-0 bg-black-rgba-70 backdrop-blur-3xl transition-opacity" />
        </TransitionChild>
        <div className="fixed z-10 inset-0 overflow-y-auto font-noto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 sm:p-0">
            <TransitionChild>
              <Dialog.Panel className="relative transition-all flex flex-col items-center">
                <div className="h-4 w-mobile-modal-top md:w-desktop-modal-top bg-white" />
                <div className="w-mobile-modal-body md:w-desktop-modal-body bg-white pt-7 flex flex-col items-center">
                  <ModalCloseButton
                    onClick={closeModal}
                    className="absolute right-5 -top-10"
                  />
                  <div className="flex flex-col w-full max-w-[350px]">
                    <h1 className="text-xl md:text-3xl mb-4 text-center">
                      分享告白
                    </h1>
                    <div className="flex mb-6 px-3">
                      <WarningIcon width={36} height={36} />
                      <p className="text-orange text-lg text-left pl-2">
                        鑄造告白才能得到彩色版 Impact NFT 並參加抽獎喔！
                      </p>
                    </div>

                    <div
                      dangerouslySetInnerHTML={{ __html: preview as string }}
                    />
                    <SocialButtons
                      className="my-4"
                      onDLClick={handleDLClick}
                      onIGClick={handleIGClick}
                    />
                  </div>
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
