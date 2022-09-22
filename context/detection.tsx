import { WrongBrowserModal } from 'components'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  ANDROID,
  CHROME,
  DESKTOP,
  IOS,
  OTHER_BROWSER,
  SAFARI,
} from 'shared/constants'

const DetectionContext = createContext<{
  setIsWrongBrowserModalOpen: Dispatch<SetStateAction<boolean>>
  setIsProcessingCloseClick: Dispatch<SetStateAction<boolean>>
  isProcessingCloseClick: boolean
  device: string
  browser: string
}>({
  setIsWrongBrowserModalOpen: () => {},
  setIsProcessingCloseClick: () => {},
  isProcessingCloseClick: false,
  device: DESKTOP,
  browser: OTHER_BROWSER,
})

interface Props {
  children: ReactNode
}

export const DetectionContextProvider = ({ children }: Props) => {
  const [isWrongBrowserModalOpen, setIsWrongBrowserModalOpen] = useState(false)
  const [isProcessingCloseClick, setIsProcessingCloseClick] = useState(false)
  const [device, setDevice] = useState(DESKTOP)
  const [browser, setBrowser] = useState(OTHER_BROWSER)

  useEffect(() => {
    const ua = navigator.userAgent

    if (/Android/i.test(ua)) setDevice(ANDROID)
    else if (/iPhone|iPad/i.test(ua)) setDevice(IOS)

    if (/Chrome/i.test(ua) || ua.match(/CriOS/i)) {
      setBrowser(CHROME)
    } else if (!!ua.match(/WebKit/i) && !ua.match(/CriOS/i)) {
      setBrowser(SAFARI)
    }
  }, [])

  return (
    <>
      <DetectionContext.Provider
        value={{
          setIsWrongBrowserModalOpen,
          setIsProcessingCloseClick,
          isProcessingCloseClick,
          browser,
          device,
        }}
      >
        {children}
      </DetectionContext.Provider>
      <WrongBrowserModal
        isOpen={isWrongBrowserModalOpen}
        onClose={() => setIsProcessingCloseClick(true)}
      />
    </>
  )
}

export function useDetectionContext() {
  return useContext(DetectionContext)
}