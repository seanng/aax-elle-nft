import { BaseModal } from './BaseModal'
import { WarningIcon } from 'components'

export function WrongBrowserModal({ onClose, isOpen }) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showsCloseIcon>
      <div className="px-4 md:px-24 pt-6 md:pt-10 pb-20 md:pb-10 text-center">
        <WarningIcon className="mx-auto mb-6" />
        <h4 className="font-medium text-2xl mb-2 md:mb-3 leading-150%">
          請使用Chrome瀏覽器
        </h4>
        <p className="mb-4 md:mb-8 md:text-lg">MetaMask 不支援Safari 瀏覽器</p>
      </div>
    </BaseModal>
  )
}
