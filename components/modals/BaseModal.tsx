import { ModalCloseButton } from 'components'
import { Container } from './Container'

export function BaseModal({
  isOpen,
  children,
  onClose,
  showsCloseIcon = false,
}) {
  return (
    <Container onClose={onClose} isOpen={isOpen}>
      {showsCloseIcon && (
        <ModalCloseButton
          onClick={onClose}
          className="absolute right-5 -top-10"
        />
      )}
      <div className="h-4 w-mobile-modal-top md:w-desktop-modal-top bg-white" />
      <div className="w-mobile-modal-body md:w-desktop-modal-body bg-white">
        {children}
      </div>
      <div className="h-4 w-mobile-modal-top md:w-desktop-modal-top bg-white" />
    </Container>
  )
}
