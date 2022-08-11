import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react'
import { useWeb3 } from 'hooks'
import { Web3ProviderState, web3InitialState } from 'reducers'
import { CORRECT_HEX_CHAIN } from 'shared/constants'
import { NetworkChangeModal, ConnectModal } from 'components'

const Web3Context = createContext<
  Web3ProviderState & { openConnectModal: (cb?: () => void) => void }
>({
  openConnectModal: () => {},
  ...web3InitialState,
})

interface Props {
  children: ReactNode
}

export const Web3ContextProvider = ({ children }: Props) => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false)
  const [isNetworkChangeModalOpen, setIsNetworkChangeModalOpen] =
    useState(false)
  const [onConnect, setOnConnect] = useState<() => {}>(() => () => {})
  const web3ProviderState = useWeb3()
  const { provider } = web3ProviderState

  // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
  const handleChainChanged = async (_hexChainId: string) => {
    setIsNetworkChangeModalOpen(_hexChainId !== CORRECT_HEX_CHAIN)
  }

  const openConnectModal = (cb = () => {}) => {
    setIsConnectModalOpen(true)
    setOnConnect(() => () => {
      setIsConnectModalOpen(false)
      cb()
    })
  }

  const closeConnectModal = () => {
    setOnConnect(() => () => {})
    setIsConnectModalOpen(false)
  }

  const handleModalConnect = async () => {
    const { connect, address } = web3ProviderState
    let connected = true
    if (!address) connected = await connect()
    if (connected) onConnect()
  }

  const onChangeNetwork = async () => {
    if (window.ethereum) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CORRECT_HEX_CHAIN }],
      })
    }
  }

  useEffect(() => {
    if (provider?.on) {
      provider?.on('chainChanged', handleChainChanged)
      return () => {
        if (provider.removeListener)
          provider.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [provider])

  return (
    <>
      <Web3Context.Provider
        value={{
          openConnectModal,
          ...web3ProviderState,
        }}
      >
        {children}
      </Web3Context.Provider>
      {/* Add Modal here. */}
      <NetworkChangeModal
        isOpen={isNetworkChangeModalOpen}
        handleChangeNetwork={onChangeNetwork}
      />
      <ConnectModal
        isOpen={isConnectModalOpen}
        connect={handleModalConnect}
        closeModal={closeConnectModal}
      />
    </>
  )
}

export function useWeb3Context() {
  return useContext(Web3Context)
}
