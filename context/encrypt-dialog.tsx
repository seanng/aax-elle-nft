import { ReactNode, useState, createContext, useContext } from 'react'
import { EncryptDialog } from 'components'

interface EncryptDialogState {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

interface Props {
  children: ReactNode
}

const EncryptDialogContext = createContext({} as EncryptDialogState)

export function useEncryptDialog() {
  return useContext(EncryptDialogContext)
}

export function EncryptDialogProvider({ children, ...props }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <EncryptDialogContext.Provider
      value={{ isOpen, openModal, closeModal }}
      {...props}
    >
      {children}
      <EncryptDialog />
    </EncryptDialogContext.Provider>
  )
}
