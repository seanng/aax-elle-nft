import { StepWizardChildProps } from 'react-step-wizard'
import {
  PrimaryButton,
  SecondaryButton,
  ToastMessage,
  GreenLipsIcon,
  WarningIcon,
  OutlinedHeading,
  KolSelectDropdown,
} from 'components'
import AroundText2 from 'components/NFT/shared/AroundText2'
import { useCallback, useEffect, useState } from 'react'
import { Files, KolDropdownListItem, MintForm } from 'shared/types'
import {
  FINISHED,
  NOT_STARTED,
  PRIVATE_SALE,
  REACHED_MESSAGE_LIMIT,
} from 'shared/constants'
import { publicFrameText, salePhase } from 'utils/config'
import { kolDropdownList } from 'data'
import { genNftFrameTextMsg, getAssets } from 'utils/nft'
import { toast } from 'react-toastify'

const TEXTAREA_HEIGHT = 280

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Partial<MintForm>) => void
  setFiles: (files: Files) => void
  openConnectModal: () => void
  address?: string | null
  setIsLoading: (b: boolean) => void
  setShowsSpinner: (b: boolean) => void
  ownsWhitelistToken: (a?: string | null) => Promise<boolean>
  isConnectModalOpen: boolean
}

export function MessageStep({
  updateForm,
  setFiles,
  ownsWhitelistToken,
  openConnectModal,
  setIsLoading,
  setShowsSpinner,
  isConnectModalOpen,
  address,
  ...wizard
}: Props) {
  const [values, setValues] = useState({
    message: '',
    minterName: '',
    receiverName: '',
  })
  const [showMessageOverlay, setShowMessageOverlay] = useState(false)
  const [isProcessingMint, setIsProcessingMint] = useState(false)
  const [selectedKol, setSelectedKol] = useState<KolDropdownListItem>(
    kolDropdownList[0]
  )
  const [frameText, setFrameText] = useState(publicFrameText)

  useEffect(() => {
    if (selectedKol.frameText) {
      setFrameText(selectedKol?.frameText)
    }
  }, [selectedKol])

  const onWalletConnect = useCallback(
    async (address: string) => {
      setShowsSpinner(true)
      setIsLoading(true)
      // @ts-ignore
      if (salePhase === PRIVATE_SALE) {
        const hasWhitelistToken = await ownsWhitelistToken(address)
        if (!hasWhitelistToken) {
          // If address does not contain whitelist token, display Sorry modal. Do not proceed.
          toast.warn(
            <ToastMessage
              heading="你的錢包內沒有白名單NFT"
              body="公開鑄造時間將會在12/13開始"
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
        aroundText: genNftFrameTextMsg({
          sender: minterName,
          receiver: receiverName,
        }),
        neverOpenedAroundText: genNftFrameTextMsg({
          sender: minterName,
          receiver: receiverName,
          neverOpened: true,
        }),
      })
      setFiles(files)
      updateForm(values)
      wizard.nextStep && wizard.nextStep()
      setShowsSpinner(false)
      setIsLoading(false)
    },
    [
      ownsWhitelistToken,
      setFiles,
      setIsLoading,
      setShowsSpinner,
      updateForm,
      values,
      wizard,
    ]
  )

  const handleMintClick = async () => {
    if ([NOT_STARTED, FINISHED, REACHED_MESSAGE_LIMIT].includes(salePhase)) {
      setShowMessageOverlay(true)
      return
    }
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
  }, [address, isProcessingMint, isConnectModalOpen, onWalletConnect])

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

  const shouldDisableIgShare =
    values.message === '' ||
    [FINISHED, REACHED_MESSAGE_LIMIT].includes(salePhase)

  // https://stackoverflow.com/a/46118025/6007700
  // https://stackoverflow.com/a/65893635/6007700

  return (
    <>
      <div className="flex flex-col items-center font-noto h-full">
        <OutlinedHeading className="mt-6 mb-6 md:mb-10">
          寫下你的告白秘密吧
        </OutlinedHeading>
        <div className="flex w-80 md:w-[642px] mb-4">
          <KolSelectDropdown
            selectedPerson={selectedKol}
            setSelectedPerson={setSelectedKol}
          />
        </div>
        <div className="flex w-80 md:w-[642px] mb-4">
          <div className="flex-none bg-lime text-black font-mono p-2 md:text-2xl">
            寄件人
          </div>
          <input
            id="minterName"
            name="minterName"
            type="text"
            className="flex-auto border-lime text-white bg-transparent focus:border-lime focus:ring-0 font-mono md:text-2xl"
            placeholder="你的名字"
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
            placeholder="對方的名字"
            className="flex-auto border-lime text-white bg-transparent focus:border-lime focus:ring-0 font-mono md:text-2xl"
            onChange={handleInputChange}
          />
        </div>

        <div className="w-80 h-[320px] md:w-[642px] md:h-[642px] mb-6 flex justify-center items-center">
          <AroundText2
            aroundText={frameText}
            optClass="md:scale-[2] md:hover:scale-[2]"
          />
          <textarea
            id="message"
            style={{
              WebkitFilter: 'blur(0px)',
            }}
            className="
            relative
            shadow-sm
            block
            overflow-hidden
            md:scale-[2]
            w-[280px]
            h-[280px]
            px-[5.5px]
            py-0
            tracking-[0.01em]
            text-[26px]
            leading-[150%]
            bg-black
            border-0
            rounded-none
            resize-none
            text-white
            font-cubic
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
            target="_blank"
            {...(!shouldDisableIgShare && {
              href: `/ig-share?at=yes&m=${encodeURI(values.message)}`,
            })}
            className="mr-8"
          >
            <SecondaryButton type="button" disabled={shouldDisableIgShare}>
              分享告白
            </SecondaryButton>
          </a>
          <PrimaryButton
            type="button"
            disabled={salePhase === NOT_STARTED || values.message === ''}
            onClick={handleMintClick}
          >
            鑄造告白
          </PrimaryButton>
        </div>
      </div>
      {showMessageOverlay && (
        <div className="fixed top-0 right-0 left-0 bottom-0 z-30 bg-black-rgba-70 backdrop-blur-sm text-center">
          <GreenLipsIcon className="mt-40 mb-10 mx-auto" />
          <OutlinedHeading>
            {salePhase === NOT_STARTED
              ? '活動尚未開始 請於12/10再來告白！'
              : salePhase === REACHED_MESSAGE_LIMIT
              ? '鑄造已達 3113 上限'
              : '活動已結束了'}
          </OutlinedHeading>
        </div>
      )}
    </>
  )
}
