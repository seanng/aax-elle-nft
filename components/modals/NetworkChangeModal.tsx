import { PrimaryButton, WarningIcon } from 'components'
import { BaseModal } from './BaseModal'

export function NetworkChangeModal({ isOpen, handleChangeNetwork }) {
  return (
    <BaseModal isOpen={isOpen} onClose={() => {}}>
      <div className="px-4 md:px-24 pt-6 md:pt-10 pb-5 md:pb-10 text-center">
        <WarningIcon className="mx-auto mb-6" />
        <h4 className="font-medium text-2xl mb-2 md:mb-3 leading-150%">
          切換 Network
        </h4>
        <p className="mb-4 md:mb-8 md:text-lg">
          請到手機App或網頁版錢包切換至 Ethereum Main Network
        </p>
        <PrimaryButton onClick={handleChangeNetwork}>
          切換 Network
        </PrimaryButton>
      </div>
    </BaseModal>
  )
}
