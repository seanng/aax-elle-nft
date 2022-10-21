import { CopyToClipboard } from 'react-copy-to-clipboard'
import clsx from 'clsx'

export function LinkAndPasscode({
  link = '',
  passcode = '',
  mobileOnly = false,
}) {
  const clipboardText = `
趕快解鎖 ELLEverse Impact NFT 看看對方想對你說的話吧！
解鎖連結：${link}
解鎖密碼：${passcode}

=====================
新手輸入邀請碼註冊 AAX 現賺 5 USDT！
ELLEverse 專屬邀請碼: ELLE3113
www.aax.com/zh-TW/invite/sign-up?inviteCode=ELLE3113`

  return (
    <div
      className={clsx(
        'border-2 border-dashed border-lime pt-4 pb-2 px-6 text-left w-[350px] mx-auto',
        !mobileOnly && 'md:w-[500px]'
      )}
    >
      <h4
        className={clsx(
          'text-lime font-cubic leading-150% mb-2',
          !mobileOnly && 'md:text-xl md:mb-3'
        )}
      >
        複製解鎖密碼傳給愛人
      </h4>
      {/* warning text */}
      <div
        className={clsx(
          'flex items-start mb-1',
          !mobileOnly && 'md:items-center md:mb-2'
        )}
      >
        <StampSvg />
        <div
          className={clsx(
            'text-cement ml-1 text-xs',
            !mobileOnly && 'md:text-sm'
          )}
        >
          解鎖動作僅有一次喔，解鎖後NFT圖像會變成你的告白文字
        </div>
      </div>
      {/* link and passcode */}
      <div
        className={clsx(
          'flex justify-between items-center space-x-2',
          !mobileOnly && 'md:space-x-4'
        )}
      >
        <div
          className={clsx(
            'leading-150% font-noto text-white text-sm break-all',
            !mobileOnly && 'md:text-base'
          )}
        >
          {`解鎖連結：${link}`}
          <br />
          {`解鎖密碼：${passcode}`}
        </div>
        <CopyToClipboard text={clipboardText}>
          <a href="#">
            <CopySvg />
          </a>
        </CopyToClipboard>
      </div>
    </div>
  )
}

const StampSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      y="2.375"
      width="1.96809"
      height="11.25"
      fill="white"
      fillOpacity="0.5"
    />
    <rect
      x="13.7766"
      y="2.375"
      width="1.96809"
      height="11.25"
      fill="white"
      fillOpacity="0.5"
    />
    <rect
      x="6.88867"
      y="4.25"
      width="1.96809"
      height="4.6875"
      fill="white"
      fillOpacity="0.5"
    />
    <rect
      x="6.88867"
      y="9.875"
      width="1.96809"
      height="1.875"
      fill="white"
      fillOpacity="0.5"
    />
    <rect
      x="1.96777"
      y="0.5"
      width="11.8085"
      height="1.875"
      fill="white"
      fillOpacity="0.5"
    />
    <rect
      x="1.96777"
      y="13.625"
      width="11.8085"
      height="1.875"
      fill="white"
      fillOpacity="0.5"
    />
  </svg>
)

const CopySvg = () => (
  <svg
    width="32"
    height="72"
    viewBox="0 0 32 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="21.332" width="18.6667" height="2.66667" fill="white" />
    <rect x="4" y="42.6641" width="4" height="2.66667" fill="white" />
    <rect
      x="1.33301"
      y="22.6641"
      width="2.66667"
      height="21.3333"
      fill="white"
    />
    <rect
      x="22.666"
      y="22.6641"
      width="2.66667"
      height="5.33333"
      fill="white"
    />
    <rect
      x="9.33398"
      y="26.668"
      width="18.6667"
      height="2.66667"
      fill="white"
    />
    <rect x="9.33398" y="48" width="18.6667" height="2.66667" fill="white" />
    <rect x="6.66699" y="28" width="2.66667" height="21.3333" fill="white" />
    <rect x="28" y="28" width="2.66667" height="21.3333" fill="white" />
  </svg>
)
