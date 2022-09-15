import { LinkAndPasscode, WarningIcon } from 'components'
import { useEffect, useState } from 'react'

const DESKTOP_BROWSER = 'Desktop'
const INCOMPATIBLE_MOBILE_BROWSER = 'Mobile Wrong'
const COMPATIBLE_MOBILE_BROWSER = 'Mobile Correct'

export function IgShareInstructions() {
  const [viewMode, setViewMode] = useState<string | null>(null)

  useEffect(() => {
    const ua = navigator.userAgent

    const isDesktop = !/iPhone|iPad|Android/i.test(ua)
    if (isDesktop) return setViewMode(DESKTOP_BROWSER)

    const isAndroidAndChrome = /Android/i.test(ua) && /Chrome/i.test(ua)
    const isIosAndSafari =
      /iPhone|iPad/i.test(ua) && !!ua.match(/WebKit/i) && !ua.match(/CriOS/i)

    setViewMode(
      isAndroidAndChrome || isIosAndSafari
        ? COMPATIBLE_MOBILE_BROWSER
        : INCOMPATIBLE_MOBILE_BROWSER
    )
  }, [])

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
          <LinkAndPasscode link={window?.location?.href ?? ''} />
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
