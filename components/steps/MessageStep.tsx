import { StepWizardChildProps } from 'react-step-wizard'
import {
  ResponsivePrimaryButton,
  ToastMessage,
  WarningIcon,
  OutlinedHeading,
  ResponsiveSecondaryButton,
} from 'components'
import AroundText2 from 'components/NFT/shared/AroundText2'
import { useEffect, useState } from 'react'
import { encrypt } from 'lib/crypto'
import { Files, MintForm } from 'shared/types'
import { FINISHED, NOT_STARTED, PRIVATE_SALE } from 'shared/constants'
import { salePhase } from 'utils/config'
import { getAssets } from 'utils/nft'
import { toast } from 'react-toastify'

const TEXTAREA_HEIGHT = 276

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Partial<MintForm>) => void
  setFiles: (files: Files) => void
  openConnectModal: () => void
  address?: string | null
  setIsLoading: (b: boolean) => void
  ownsWhitelistToken: (a?: string | null) => Promise<boolean>
  isConnectModalOpen: boolean
}

export function MessageStep({
  updateForm,
  setFiles,
  ownsWhitelistToken,
  openConnectModal,
  setIsLoading,
  isConnectModalOpen,
  address,
  ...wizard
}: Props) {
  const [values, setValues] = useState({
    message: '',
    minterName: '',
    receiverName: '',
  })
  const [isProcessingMint, setIsProcessingMint] = useState(false)

  const onWalletConnect = async (address: string) => {
    setIsLoading(true)
    if (salePhase === PRIVATE_SALE) {
      const hasWhitelistToken = await ownsWhitelistToken(address)
      if (!hasWhitelistToken) {
        // If address does not contain whitelist token, display Sorry modal. Do not proceed.
        toast.warn(
          <ToastMessage
            heading="你的錢包內沒有白名單NFT"
            body="公開鑄造時間將會在11/20開始"
          />,
          {
            icon: <WarningIcon height={32} width={32} color="white" />,
          }
        )
        setIsLoading(false)
        return
      }
    }

    // Set Data
    const { message, minterName, receiverName } = values
    const files = await getAssets({
      message: message,
      aroundText: `${minterName} wants to give you something, ${receiverName}!`,
    })
    setFiles(files)
    updateForm({ ...values, mintedAt: new Date() })
    wizard.nextStep && wizard.nextStep()
    setIsLoading(false)
  }

  const handleMintClick = async () => {
    // If no address, connect to wallet and call onWalletConnect when address is updated (in useEffect)
    setIsProcessingMint(true)
    if (!address) openConnectModal()
  }

  // On modal connect.
  useEffect(() => {
    if (isProcessingMint && address) {
      setIsProcessingMint(false)
      onWalletConnect(address)
    }
    // stop process when user closes modal
    if (isProcessingMint && !isConnectModalOpen) {
      setIsProcessingMint(false)
    }
  }, [address, isProcessingMint, isConnectModalOpen])

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
    values.message === '' || [NOT_STARTED, FINISHED].includes(salePhase)

  // https://stackoverflow.com/a/46118025/6007700
  // https://stackoverflow.com/a/65893635/6007700

  const aroundText = encrypt(
    `Hi ${values.receiverName}, ${values.minterName} wants to give you this...`
  )

  return (
    <div className="flex flex-col items-center font-noto h-full">
      <OutlinedHeading className="mt-6 mb-6 md:mb-10">
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
          optClass="md:scale-[2] md:hover:scale-[2]"
        />
        <textarea
          id="message"
          rows={7}
          style={{
            WebkitFilter: 'blur(0px)',
          }}
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
            focus:border-transparent 
            focus:ring-0
          "
          onInput={handleTextareaChange}
          value={values.message}
          placeholder="寫下你的告白"
        />
      </div>
      <div className="flex">
        <a
          className="leading-0"
          target="__blank"
          href={`/ig-share?at=${aroundText}`}
        >
          <ResponsiveSecondaryButton disabled={shouldDisableButtons}>
            分享告白
          </ResponsiveSecondaryButton>
        </a>
        <ResponsivePrimaryButton
          type="button"
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
