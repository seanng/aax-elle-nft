import { WarningIcon } from 'components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useDetectionContext } from 'context'
import { useEffect, useState } from 'react'
import { ANDROID, CHROME, DESKTOP, IOS, SAFARI } from 'shared/constants'

const DESKTOP_BROWSER = 'Desktop'
const INCOMPATIBLE_MOBILE_BROWSER = 'Mobile Wrong'
const COMPATIBLE_MOBILE_BROWSER = 'Mobile Correct'

export function IgShareInstructions() {
  const [viewMode, setViewMode] = useState<string | null>(null)

  const { browser, device } = useDetectionContext()

  useEffect(() => {
    if (device === DESKTOP) return setViewMode(DESKTOP_BROWSER)
    const isAndroidAndChrome = browser === CHROME && device === ANDROID
    const isIosAndSafari = browser === SAFARI && device === IOS
    setViewMode(
      isAndroidAndChrome || isIosAndSafari
        ? COMPATIBLE_MOBILE_BROWSER
        : INCOMPATIBLE_MOBILE_BROWSER
    )
  }, [browser, device])

  if (!viewMode) return null

  if (viewMode === INCOMPATIBLE_MOBILE_BROWSER) {
    return (
      <>
        <div className="bg-orange flex px-4 py-4 space-x-4 w-[355px] md:w-auto mb-4">
          <WarningIcon height={32} width={32} color="white" />
          <div className="text-white">
            <p className="font-medium">請複製連結至其他瀏覽器</p>
            <p>請將以下連結複製到其他瀏覽器以下載或分享圖片</p>
          </div>
        </div>
        <div className="w-80 md:w-[650px] text-left mb-8">
          <div className="flex w-full mb-2">
            <input
              readOnly
              className="border border-lime flex-1 text-white font-mono py-2 px-3 bg-transparent focus:ring-0 focus:border-lime"
              value={window?.location?.href ?? ''}
            />
            <CopyToClipboard text={window?.location?.href ?? ''}>
              <a
                href="#"
                className="flex-none bg-lime text-blue-600 px-4 py-2 "
              >
                複製
              </a>
            </CopyToClipboard>
          </div>
          <li className="pl-2">使用iOS 請貼連結至Safari</li>
          <li className="pl-2">使用Android 請貼連結至Chrome</li>
        </div>
      </>
    )
  }

  return (
    <div className="text-center py-4 mb-4">
      {viewMode === DESKTOP_BROWSER ? '點擊圖片儲存' : '長按圖片即可除存或分享'}
    </div>
  )
}
