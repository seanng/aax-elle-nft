import { useEffect, useReducer, useCallback, ReactDOM } from 'react'
import Web3Modal, { providers } from 'web3modal'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import {
  Web3ProviderState,
  Web3Action,
  web3InitialState,
  web3Reducer,
} from 'reducers'
import { CORRECT_HEX_CHAIN, CORRECT_NETWORK } from 'shared/constants'

const providerOptions = {
  // walletconnect: {
  //   package: WalletConnect,
  //   options: {
  //     infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
  //   },
  // },
  // 'custom-aax': {
  //   display: {
  //     logo: 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN2SURBVHgB1VZdSBRRFD6z7LaVUBFEQaVb2B+EEOr626pQsEJSD0FKVlREf0RgmOGuuqZIPUi/2x/4kBVBPZQI9RAhLbjuqrX70ENE0WThFpaIULvu3/Tdmaukru6Mb35w55xz55y555x7zr1DNM8hqFXMzc01gTRxMeTxeI6RBsB+C0itvKgg/Ojp6ame8v4MiJnxOp3ustvtfp/wQ3WSHc9NMr+QzutIBSwWy1qQLoxKNuLx+F7SAB78i3F7SZJ2JVDrxHwRf/+suLh42TQNu2QjJYmVJNFnsgkBVQGEw+EWEBPNHfeT2WNHRWT+AFj4L6WHQqGnkxRskgX1olSAQB3ULDgYmzQAZK+BlMwxfCCNyMnJaQSxcPH7bLooqzcgZ7m4A2srDjskEzx9KLsukEhROjluM2sAZrOZbbWD8ajbtmg0epe0OV8Ou3pu7wR5lMwGO3ED5AkX7VnbreVwuAM8K+O/8LiEWoRA0gBY3WJLnVwU4XwjaQCz507L9uibWrW2KJ/jIHITD6ZVPEDWM/iranII4v+6CQPIzMw0kNK0qRi/MUr6+vq+kUqUlpYuAXmFsRz1PMLsvV7vqFp7v98/EolE9gTSKkYG1x3Uy5MCXaMm4dZUXX2iDxgMhuvEmw6Zq+nt7RVJA4aHh68g++mMxy4eRm2LpBFvy/oFlI58zC/6I1KGe7/Bm0Bv2g7k5+efAznBxUY430YakJeXVw/njzAetAHOPyetaJbSKIYdFGjpgtBQZLOvCmz8FMqyimYLoLCwcD0yfonx2HqP1Wq9SBqAps+CXQ2374LzmuwnEEa58AoIp6ywGIOBTv6mFQnaRokCKCgoSEWjvialrL7q9fp9DocjTirBm56d3YsxRKPReIjmgjqpAZfUbi7Z0LSesbGxo+AH2AQS8xKn25pJAeDW08disXZSoo6wm7a7u3tA/apyrbIsmbDAKEpnp8vlUt30E6iXyogf2/iiE03LLlDy+XxDSA4LSsJYie+3TwogGAzWgRTxuQuo+37SAH5ZbZXXFQQ7SucTaQW7rCS6w6UvZJz475KBfyM/yGkulmDNq4zRo6ZWI+MpyFwrM8Rx55xpDTj3juuFxufwn7QBW7yYz3+E/b2Z7KHjIqVEf017GccFJdFjmdfTTfzn/JyqgkvuNvyNwd+NTM7Ozl5F8x3/ABS/TQlEiw9sAAAAAElFTkSuQmCC',
  //     name: 'Get 50 USDT',
  //     description: '享定期理財60%年化率最高50USDT獎勵',
  //   },
  //   package: {},
  //   connector: async () => {
  //     window.open('https://aax.com/download')
  //   },
  // },
}

const web3ModalNetwork =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'mainnet'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? 'rinkeby'
    : 'localhost'

let web3Modal: Web3Modal | null
// let modalDangleTop: HTMLDivElement
// let modalDangleBot: HTMLDivElement
// let modalHeader: HTMLDivElement
// let modalAaxBanner: HTMLDivElement

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    network: web3ModalNetwork,
    providerOptions, // required
  })

  // Inject the DIVs to the modal.
  // modalHeader = document.createElement('div')
  // modalHeader.setAttribute('id', 'web3modal-header')
  // modalHeader.innerHTML = `
  // <h4 className="font-noto font-medium">
  //   連結錢包
  // </h4>
  // <p className="font-noto">
  //   我還沒有錢包
  //   <span>
  //     <a href="https://www.aax.com" target="_blank">
  //       為什麼需要虛擬錢包？
  //     </a>
  //   </span>
  // </p>
  // `

  // modalAaxBanner = document.createElement('div')
  // modalAaxBanner.setAttribute('id', 'web3modal-aax')
  // modalAaxBanner.innerHTML = `
  //   <p>
  //     我還沒有錢包
  //     <span>
  //       <a href="https://www.aax.com" target="_blank">
  //         為什麼需要虛擬錢包？
  //       </a>
  //     </span>
  //   </p>
  // `

  // modalDangleTop = document.createElement('div')
  // modalDangleTop.setAttribute('class', 'web3modal-dangle')
  // modalDangleBot = document.createElement('div')
  // modalDangleBot.setAttribute('class', 'web3modal-dangle')
}

function useCustomModal(connect) {
  // Inject custom header, help info & autoconnect in modal
  useEffect(() => {
    // let modalCard = document.querySelector('.web3modal-modal-card')
    if (web3Modal) {
      // if (!document.querySelector('#web3modal-header')) {
      //   modalCard.prepend(modalHeader)
      // }

      // if (!document.querySelector('.web3modal-dangle')) {
      //   document
      //     .querySelector('.web3modal-modal-container')
      //     ?.append(modalDangleBot)
      //   modalCard.parentNode?.insertBefore(modalDangleTop, modalCard)
      // }

      // if (!document.querySelector('#web3modal-card-layer')) {
      //   document.querySelector('.web3modal-modal-card')?.prepend(modalCardLayer)
      // }

      // if (!document.querySelector('#web3modal-aax')) {
      //   modalCard.append(modalAaxBanner)
      // }
      // Auto connect to the cached provider
      if (web3Modal?.cachedProvider) {
        connect()
      }
    }
  }, [connect])

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
}

export function useWeb3() {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState)
  const { provider, web3Provider, address, network, balance } = state

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

  const calcBalance = useCallback(async () => {
    if (web3Provider && address) {
      const bal = await web3Provider.getBalance(address)
      dispatch({
        type: 'SET_BALANCE',
        balance: ethers.utils.formatEther(bal),
      } as Web3Action)
    }
  }, [web3Provider, address])

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

  // Modify original web3 modal
  useCustomModal(connect)

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

  return {
    provider,
    web3Provider,
    address,
    network,
    connect,
    disconnect,
    balance,
    calcBalance,
  } as Web3ProviderState
}
