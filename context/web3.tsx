import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react'
import { useWeb3 } from 'hooks'
import { Web3ProviderState, web3InitialState } from 'reducers'
import { CORRECT_HEX_CHAIN, CORRECT_NETWORK } from 'shared/constants'
import { NetworkChangeModal } from 'components'

const Web3Context = createContext<Web3ProviderState>(web3InitialState)

interface Props {
  children: ReactNode
}

export const Web3ContextProvider = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const web3ProviderState = useWeb3()
  const { provider, web3Provider } = web3ProviderState

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
  const handleChainChanged = async (_hexChainId: string) => {
    if (isMinting) {
      // Do something to stop the transaction? Refresh page?
    }
    setIsModalOpen(_hexChainId !== CORRECT_HEX_CHAIN)
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
      <Web3Context.Provider value={web3ProviderState}>
        {children}
      </Web3Context.Provider>
      {/* Add Modal here. */}
      <NetworkChangeModal
        isOpen={isModalOpen}
        closeModal={toggleModal}
        handleChangeNetwork={onChangeNetwork}
      />
    </>
  )
}

export function useWeb3Context() {
  return useContext(Web3Context)
}
