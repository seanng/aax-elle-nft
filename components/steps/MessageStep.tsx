import { StepWizardChildProps } from 'react-step-wizard'
import {
  ResponsivePrimaryButton,
  OutlinedHeading,
  ResponsiveSecondaryButton,
} from 'components'
import AroundText2 from 'components/NFT/shared/AroundText2'
import { useEffect, useState } from 'react'
import { Files, MintForm } from 'shared/types'
import { FINISHED, NOT_STARTED, PRIVATE_SALE } from 'shared/constants'
import { salePhase } from 'utils/config'
import { getAssets } from 'utils/nft'

const TEXTAREA_HEIGHT = 276

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Partial<MintForm>) => void
  setFiles: (files: Files) => void
  openSharingModal: () => void
  openConnectModal: () => void
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
    minterName: '',
    receiverName: '',
  })

  const [isMinting, setIsMinting] = useState(false)

  const onWalletConnect = async () => {
    if (!address) return console.error('No Address Found...')
    if (salePhase === PRIVATE_SALE) {
      const hasWhitelistToken = await ownsWhitelistToken(address)
      if (!hasWhitelistToken) {
        // If address does not contain whitelist token, display Sorry modal.
        console.log('User does not have whitelist token')
        return
      }
    }
  }

  const handleMintClick = async () => {
    const { message, minterName, receiverName } = values
    setIsLoading(true)
    const files = await getAssets({
      message: message,
      aroundText: `${minterName} wants to give you something, ${receiverName}!`,
    })
    setFiles(files)
    updateForm({ ...values, mintedAt: new Date() })
    setIsLoading(false)
    setIsMinting(true)
    address ? onWalletConnect() : openConnectModal()
  }

  const handleShareClick = async () => {
    const { message, minterName, receiverName } = values
    setIsLoading(true)
    // TODO: Change config after designs are confirmed.
    const files = await getAssets({
      message: message,
      aroundText: `${minterName} wants to give you something, ${receiverName}!`,
    })
    setFiles(files)
    setIsLoading(false)
    // Open social media sharing modal and show the image, with buttons.
    openSharingModal()
  }

  const handleTextareaChange = (e) => {
    console.log(e.target.scrollHeight)
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

  // isMinting is only called if wallet is not connected
  useEffect(() => {
    if (isMinting && address) {
      setIsMinting(false)
      wizard.nextStep && wizard.nextStep()
    }
  }, [address, isMinting])

  const shouldDisableButtons =
    values.message === '' || salePhase === NOT_STARTED || salePhase === FINISHED

  // https://stackoverflow.com/a/46118025/6007700
  // https://stackoverflow.com/a/65893635/6007700

  return (
    <div className="flex flex-col items-center font-noto h-full">
      <OutlinedHeading className="mt-4 mb-6 md:mb-10">
        寫下你的告白秘密吧
      </OutlinedHeading>
      <div className="flex w-80 md:w-[642px] mb-4">
        <div className="flex-none bg-lime text-black font-mono p-2 md:text-2xl">
          寄件人
        </div>
        <input
          id="minterName"
          name="minterName"
          type="text"
          className="flex-auto border-lime text-white bg-transparent focus:border-lime focus:ring-0 font-mono md:text-2xl"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex w-80 md:w-[642px] mb-6">
        <div className="flex-none bg-lime text-black font-mono p-2 md:text-2xl">
          收件人
        </div>
        <input
          id="receiverName"
          name="receiverName"
          type="text"
          className="flex-auto border-lime text-white bg-transparent focus:border-lime focus:ring-0 font-mono md:text-2xl"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-80 h-[320px] md:w-[642px] md:h-[642px] mb-6 flex justify-center items-center">
        <AroundText2
          aroundText="Write down your secret..."
          optClass="md:scale-[2]"
        />
        <textarea
          id="message"
          rows={7}
          className="
            relative
            shadow-sm
            block
            md:scale-[2]
            w-[275px]
            h-[275px]
            pt-[9px]
            pb-[12px]
            px-[12px]
            text-[26px]
            leading-[140%]
            bg-transparent
            border-0
            rounded-none
            resize-none
            text-white
          "
          onInput={handleTextareaChange}
          value={values.message}
          placeholder="寫下你的告白"
        />
      </div>
      <div className="flex">
        <ResponsiveSecondaryButton
          disabled={shouldDisableButtons}
          onClick={handleShareClick}
        >
          分享告白
        </ResponsiveSecondaryButton>
        <ResponsivePrimaryButton
          disabled={shouldDisableButtons}
          onClick={handleMintClick}
          className="ml-8"
        >
          鑄造告白
        </ResponsivePrimaryButton>
      </div>
    </div>
  )
}
