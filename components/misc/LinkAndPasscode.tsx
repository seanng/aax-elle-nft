import { CopyToClipboard } from 'react-copy-to-clipboard'
import { GreenLockIcon } from 'components'
import clsx from 'clsx'

export function LinkAndPasscode({ link = '', passcode = '', className = '' }) {
  return (
    <div className={clsx('w-full', className)}>
      <div className="flex w-full mb-2">
        <input
          readOnly
          className="border border-lime flex-1 text-white font-mono py-2 px-3 bg-transparent focus:ring-0 focus:border-lime"
          value={link}
        />
        <CopyToClipboard text={link}>
          <a href="#" className="flex-none bg-lime text-blue-600 px-4 py-2 ">
            複製
          </a>
        </CopyToClipboard>
      </div>
      {passcode && (
        <div className={clsx('flex items-center text-lime', className)}>
          <GreenLockIcon />
          <span className="ml-2">解鎖密碼：</span>
          <span className="underline">{passcode}</span>
        </div>
      )}
    </div>
  )
}
