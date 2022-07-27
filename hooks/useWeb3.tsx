import { useEffect, useReducer, useCallback, ReactDOM } from 'react'
import Web3Modal, { providers } from 'web3modal'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import WalletConnect from '@walletconnect/web3-provider'
import {
  Web3ProviderState,
  Web3Action,
  web3InitialState,
  web3Reducer,
} from 'reducers'
import { CORRECT_HEX_CHAIN, CORRECT_NETWORK } from 'shared/constants'

const providerOptions = {
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
    },
  },
  'custom-aax': {
    display: {
      logo: 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN2SURBVHgB1VZdSBRRFD6z7LaVUBFEQaVb2B+EEOr626pQsEJSD0FKVlREf0RgmOGuuqZIPUi/2x/4kBVBPZQI9RAhLbjuqrX70ENE0WThFpaIULvu3/Tdmaukru6Mb35w55xz55y555x7zr1DNM8hqFXMzc01gTRxMeTxeI6RBsB+C0itvKgg/Ojp6ame8v4MiJnxOp3ustvtfp/wQ3WSHc9NMr+QzutIBSwWy1qQLoxKNuLx+F7SAB78i3F7SZJ2JVDrxHwRf/+suLh42TQNu2QjJYmVJNFnsgkBVQGEw+EWEBPNHfeT2WNHRWT+AFj4L6WHQqGnkxRskgX1olSAQB3ULDgYmzQAZK+BlMwxfCCNyMnJaQSxcPH7bLooqzcgZ7m4A2srDjskEzx9KLsukEhROjluM2sAZrOZbbWD8ajbtmg0epe0OV8Ou3pu7wR5lMwGO3ED5AkX7VnbreVwuAM8K+O/8LiEWoRA0gBY3WJLnVwU4XwjaQCz507L9uibWrW2KJ/jIHITD6ZVPEDWM/iranII4v+6CQPIzMw0kNK0qRi/MUr6+vq+kUqUlpYuAXmFsRz1PMLsvV7vqFp7v98/EolE9gTSKkYG1x3Uy5MCXaMm4dZUXX2iDxgMhuvEmw6Zq+nt7RVJA4aHh68g++mMxy4eRm2LpBFvy/oFlI58zC/6I1KGe7/Bm0Bv2g7k5+efAznBxUY430YakJeXVw/njzAetAHOPyetaJbSKIYdFGjpgtBQZLOvCmz8FMqyimYLoLCwcD0yfonx2HqP1Wq9SBqAps+CXQ2374LzmuwnEEa58AoIp6ywGIOBTv6mFQnaRokCKCgoSEWjvialrL7q9fp9DocjTirBm56d3YsxRKPReIjmgjqpAZfUbi7Z0LSesbGxo+AH2AQS8xKn25pJAeDW08disXZSoo6wm7a7u3tA/apyrbIsmbDAKEpnp8vlUt30E6iXyogf2/iiE03LLlDy+XxDSA4LSsJYie+3TwogGAzWgRTxuQuo+37SAH5ZbZXXFQQ7SucTaQW7rCS6w6UvZJz475KBfyM/yGkulmDNq4zRo6ZWI+MpyFwrM8Rx55xpDTj3juuFxufwn7QBW7yYz3+E/b2Z7KHjIqVEf017GccFJdFjmdfTTfzn/JyqgkvuNvyNwd+NTM7Ozl5F8x3/ABS/TQlEiw9sAAAAAElFTkSuQmCC',
      name: 'Get 50 USDT',
      description: '享定期理財60%年化率最高50USDT獎勵',
    },
    package: {},
    connector: async () => {
      window.open('https://aax.com/download')
    },
  },
}

const web3ModalNetwork =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'mainnet'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? 'rinkeby'
    : 'localhost'

let web3Modal: Web3Modal | null
let modalHeader: HTMLDivElement
let modalFooter: HTMLDivElement

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    network: web3ModalNetwork,
    providerOptions, // required
  })

  // Inject the DIVs to the modal.

  modalHeader = document.createElement('div')
  modalHeader.innerHTML = `
  <div id="web3modal-header">
    <h4>
      你即將開始鑄造流程
    </h4>
    <p>
      即將開始鑄造流程，首先連接你的錢包吧！
    </p>
  </div>
  `

  modalFooter = document.createElement('div')
  modalFooter.innerHTML = `
  <div id="web3modal-footer">
    <p>
      我還沒有錢包
      <span>
        <a href="https://www.aax.com" target="_blank">
          為什麼需要虛擬錢包？
        </a>
      </span>
    </p>
  </div>
  `
}

export function useWeb3() {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState)
  const { provider, web3Provider, address, network } = state

  const connect = useCallback(async (): Promise<boolean> => {
    if (!web3Modal) {
      console.error('No Web3Modal')
      return false
    }
    try {
      const provider = await web3Modal.connect()
      const web3Provider = new ethers.providers.Web3Provider(provider)
      const signer = web3Provider.getSigner()
      const address = await signer.getAddress()
      const network = await web3Provider.getNetwork()
      // If network is not Mainnet (prod), localhost (dev), Rinkeby (preview), prompt user to swap to correct network

      if (window.ethereum && network.name !== CORRECT_NETWORK) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CORRECT_HEX_CHAIN }],
        })
      }

      toast.success('Connected to Web3')

      dispatch({
        type: 'SET_WEB3_PROVIDER',
        provider,
        web3Provider,
        address,
        network,
      } as Web3Action)

      return true
    } catch (e) {
      toast.error(e)
      disconnect()
      return false
    }
  }, [])

  const disconnect = useCallback(async () => {
    if (!web3Modal) return console.error('No Web3Modal')
    web3Modal.clearCachedProvider()
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect()
    }
    toast.error('Disconnected from Web3')
    dispatch({
      type: 'RESET_WEB3_PROVIDER',
    } as Web3Action)
  }, [provider])

  useEffect(() => {
    if (web3Modal) {
      // Inject new div with css stuff into web3 modal
      if (!document.querySelector('#web3modal-header')) {
        document.querySelector('.web3modal-modal-card')?.prepend(modalHeader)
      }

      if (!document.querySelector('#web3modal-footer')) {
        document.querySelector('.web3modal-modal-card')?.append(modalFooter)
      }

      // Auto connect to the cached provider
      if (web3Modal.cachedProvider) {
        connect()
      }
    }
  }, [connect])

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        toast.info('Changed Web3 Account')
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        } as Web3Action)
      }

      // // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      // const handleChainChanged = (_hexChainId: string) => {
      //   if (typeof window !== 'undefined') {
      //     console.log('switched to chain...', _hexChainId)
      //     toast.info(`Web3 Network Changed to: ${_hexChainId}`)
      //     // window.location.reload()
      //   } else {
      //     console.log('window is undefined')
      //   }
      // }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  // Display "Install Metamask" for users without MetaMask installed
  useEffect(() => {
    if (!window.ethereum) {
      providerOptions['custom-metamask'] = {
        display: {
          logo: providers.METAMASK.logo,
          name: 'Install MetaMask',
          description: 'Connect using browser wallet',
        },
        package: {},
        connector: async () => {
          window.open('https://metamask.io/download')
          throw new Error('MetaMask not installed')
        },
      }

      web3Modal = new Web3Modal({
        cacheProvider: true,
        network: web3ModalNetwork,
        providerOptions, // required
      })
    }
  }, [])

  return {
    provider,
    web3Provider,
    address,
    network,
    connect,
    disconnect,
  } as Web3ProviderState
}
