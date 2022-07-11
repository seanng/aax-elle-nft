import { useEffect, useReducer, useCallback } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import WalletConnect from '@walletconnect/web3-provider'

import {
  Web3ProviderState,
  Web3Action,
  web3InitialState,
  web3Reducer,
} from 'reducers'

const providerOptions = {
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
    },
  },
}

const web3Network =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'mainnet' : 'rinkeby'

let web3Modal: Web3Modal | null
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    network: web3Network,
    providerOptions, // required
  })
}

export function useWeb3() {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState)
  const { provider, web3Provider, address, network } = state

  const connect = useCallback(async () => {
    if (!web3Modal) return console.error('No Web3Modal')
    const provider = await web3Modal.connect()
    const web3Provider = new ethers.providers.Web3Provider(provider)
    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()
    const network = await web3Provider.getNetwork()
    toast.success('Connected to Web3')

    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      address,
      network,
    } as Web3Action)
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

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect()
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

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== 'undefined') {
          console.log('switched to chain...', _hexChainId)
          toast.info(`Web3 Network Changed to: ${_hexChainId}`)
          window.location.reload()
        } else {
          console.log('window is undefined')
        }
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
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
  } as Web3ProviderState
}
