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
  METAMASK_MOBILE,
} from 'shared/constants'

const DetectionContext = createContext<{
  setIsProcessingCloseClick: Dispatch<SetStateAction<boolean>>
  isProcessingCloseClick: boolean
  device: string
  browser: string
}>({
  setIsProcessingCloseClick: () => {},
  isProcessingCloseClick: false,
  device: DESKTOP,
  browser: OTHER_BROWSER,
})

interface Props {
  children: ReactNode
}

export const DetectionContextProvider = ({ children }: Props) => {
  const [isProcessingCloseClick, setIsProcessingCloseClick] = useState(false)
  const [device, setDevice] = useState(DESKTOP)
  const [browser, setBrowser] = useState(OTHER_BROWSER)

  useEffect(() => {
    if (!window || !window.navigator?.userAgent) return

    const ua = navigator.userAgent
    let newDevice = device

    if (/Android/i.test(ua)) {
      newDevice = ANDROID
    } else if (/iPhone|iPad/i.test(ua)) {
      newDevice = IOS
    }

    setDevice(newDevice)

    if (/Chrome/i.test(ua) || ua.match(/CriOS/i)) {
      setBrowser(CHROME)
    } else if (window?.ethereum && [IOS, ANDROID].includes(newDevice)) {
      setBrowser(METAMASK_MOBILE)
    } else if (!!ua.match(/WebKit/i) && !ua.match(/CriOS/i)) {
      setBrowser(SAFARI)
    }
  }, [])

  return (
    <DetectionContext.Provider
      value={{
        setIsProcessingCloseClick,
        isProcessingCloseClick,
        browser,
        device,
      }}
    >
      {children}
    </DetectionContext.Provider>
  )
}

export function useDetectionContext() {
  return useContext(DetectionContext)
}
