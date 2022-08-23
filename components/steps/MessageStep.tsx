import { StepWizardChildProps } from 'react-step-wizard'
import { PrimaryButton, FormHeading, SecondaryButton } from 'components'
import { useState } from 'react'
import { Files, MintForm } from 'shared/types'
import { FINISHED, NOT_STARTED, PRESALE } from 'shared/constants'
import { saleStatus } from 'utils/config'
import { getAssets } from 'utils/nft'

const TEXTAREA_HEIGHT = 232

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Partial<MintForm>) => void
  setFiles: (files: Files) => void
  openSharingModal: () => void
  openConnectModal: (cb: () => {}) => void
  address?: string | null
  setIsLoading: (b: boolean) => void
  ownsWhitelistToken: (address: string) => Promise<boolean>
}

export function MessageStep({
  updateForm,
  setFiles,
  openSharingModal,
  ownsWhitelistToken,
  openConnectModal,
  setIsLoading,
  address,
  ...wizard
}: Props) {
  const [values, setValues] = useState({
    message: '',
    senderName: '',
    receiverName: '',
  })

  const onWalletConnect = async () => {
    if (!address) return console.error('No Address Found...')
    if (saleStatus === PRESALE) {
      const hasWhitelistToken = await ownsWhitelistToken(address)
      if (!hasWhitelistToken) {
        // If address does not contain whitelist token, display Sorry modal.
        console.log('User does not have whitelist token')
        return
      }
    }
    wizard.nextStep && wizard.nextStep()
  }

  const handleMintClick = async () => {
    const { message, senderName, receiverName } = values
    setIsLoading(true)
    // TODO: Change after designs are confirmed.
    const files = await getAssets({
      message: message,
      aroundText: `${senderName} wants to give you something, ${receiverName}!`,
      aroundTextColor: 'blue',
      gridIconColor: 'blue',
    })
    setFiles(files)
    updateForm({ ...values, mintedAt: new Date() })
    setIsLoading(false)
    address ? onWalletConnect() : openConnectModal(onWalletConnect)
  }

  const handleShareClick = async () => {
    const { message, senderName, receiverName } = values
    setIsLoading(true)
    // TODO: Change config after designs are confirmed.
    const files = await getAssets({
      message: message,
      aroundText: `${senderName} wants to give you something, ${receiverName}!`,
      aroundTextColor: 'black',
      gridIconColor: 'blue',
    })
    setFiles(files)
    setIsLoading(false)
    // Open social media sharing modal and show the image, with buttons.
    openSharingModal()
  }

  const handleTextareaChange = (e) => {
    if (e.target.scrollHeight <= TEXTAREA_HEIGHT) {
      setValues((prev) => ({
        ...prev,
        message: e.target.value,
      }))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const shouldDisableButtons =
    values.message === '' ||
    saleStatus === NOT_STARTED ||
    saleStatus === FINISHED

  // https://stackoverflow.com/a/46118025/6007700
  // https://stackoverflow.com/a/65893635/6007700

  return (
    <>
      <div className="flex flex-col items-center font-noto h-full pt-4">
        <FormHeading className="italic mb-6 tracking-wide w-72 text-center font-mono">
          Ready to share your Love?
        </FormHeading>
        <div className="flex w-80 mb-4">
          <div className="flex-none bg-lime text-black font-mono p-2">
            寄件人
          </div>
          <input
            id="senderName"
            name="senderName"
            type="text"
            className="flex-auto border-lime text-white bg-transparent focus:border-lime focus:ring-0 font-mono"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-80 mb-6">
          <div className="flex-none bg-lime text-black font-mono p-2">
            收件人
          </div>
          <input
            id="receiverName"
            name="receiverName"
            type="text"
            className="flex-auto border-lime text-white bg-transparent focus:border-lime focus:ring-0 font-mono"
            onChange={handleInputChange}
          />
        </div>
        <textarea
          id="message"
          rows={5}
          className="shadow-sm block w-56 text-3xl border border-gray-300 rounded-md text-black p-4 mb-6 resize-none overflow-hidden"
          onInput={handleTextareaChange}
          placeholder="寫下你的告白"
        />
        <div className="flex space-x-8">
          <SecondaryButton
            disabled={shouldDisableButtons}
            onClick={handleShareClick}
          >
            分享告白
          </SecondaryButton>
          <PrimaryButton
            disabled={shouldDisableButtons}
            onClick={handleMintClick}
          >
            鑄造告白
          </PrimaryButton>
        </div>
      </div>
    </>
  )
}
