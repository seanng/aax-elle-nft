import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react'
import { useWeb3 } from 'hooks'
import { Web3ProviderState, web3InitialState } from 'reducers'
import { correctHexChain } from 'utils/config'
import { NetworkChangeModal, ConnectModal } from 'components'

const Web3Context = createContext<
  Web3ProviderState & {
    openConnectModal: () => void
    isConnectModalOpen: boolean
  }
>({
  openConnectModal: () => {},
  isConnectModalOpen: false,
  ...web3InitialState,
})

interface Props {
  children: ReactNode
}

export const Web3ContextProvider = ({ children }: Props) => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false)
  const [isNetworkChangeModalOpen, setIsNetworkChangeModalOpen] =
    useState(false)
  const web3ProviderState = useWeb3()
  const { provider, address, connect } = web3ProviderState

  // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
  const handleChainChanged = async (_hexChainId: string) => {
    setIsNetworkChangeModalOpen(_hexChainId !== correctHexChain)
  }

  const handleModalConnect = async () => {
    let connected = true
    if (!address) connected = await connect()
    if (connected) setIsConnectModalOpen(false)
  }

  const onChangeNetwork = async () => {
    if (window.ethereum) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: correctHexChain }],
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
          openConnectModal: () => setIsConnectModalOpen(true),
          isConnectModalOpen,
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
        closeModal={() => setIsConnectModalOpen(false)}
      />
    </>
  )
}

export function useWeb3Context() {
  return useContext(Web3Context)
}
