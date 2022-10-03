import { useEffect, useReducer, useCallback, ReactDOM } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import {
  Web3ProviderState,
  Web3Action,
  web3InitialState,
  web3Reducer,
} from 'reducers'
import { correctHexChain, correctNetwork } from 'utils/config'
import { HOMESTEAD } from 'shared/constants'

const web3ModalNetwork =
  correctNetwork === HOMESTEAD ? 'mainnet' : correctNetwork

let web3Modal: Web3Modal | null

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    network: web3ModalNetwork,
    providerOptions: {}, // required
  })
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

      if (window.ethereum && network.name !== correctNetwork) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: correctHexChain }],
        })
      }

      const bal = await web3Provider.getBalance(address)
      dispatch({
        type: 'SET_BALANCE',
        balance: ethers.utils.formatEther(bal),
      } as Web3Action)

      dispatch({
        type: 'SET_WEB3_PROVIDER',
        provider,
        web3Provider,
        address,
        network,
      } as Web3Action)

      return true
    } catch (e) {
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
    dispatch({
      type: 'RESET_WEB3_PROVIDER',
    } as Web3Action)
  }, [provider])

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
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

  useEffect(() => {
    if (web3Modal?.cachedProvider) connect()
  }, [connect])

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
