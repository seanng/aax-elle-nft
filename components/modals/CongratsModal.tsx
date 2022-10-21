import { BaseModal } from './BaseModal'
import { WarningIcon } from 'components'

export function CongratsModal({ onClose, isOpen, prizeName }) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showsCloseIcon>
      <div className="px-4 md:px-24 pt-6 md:pt-10 pb-20 md:pb-10 text-center">
        <WarningIcon className="mx-auto mb-6" />
        <h4 className="font-medium text-2xl mb-2 md:mb-3 leading-150%">
          恭喜抽中
        </h4>
        <p className="mb-4 md:mb-8 md:text-lg">{prizeName}</p>
      </div>
    </BaseModal>
  )
}
