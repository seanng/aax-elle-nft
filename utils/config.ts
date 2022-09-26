import { NOT_STARTED, HOMESTEAD, RINKEBY, LOCALHOST } from 'shared/constants'

export const salePhase = process.env.NEXT_PUBLIC_SALE_PHASE ?? NOT_STARTED

export const metadata = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://elleverse.io',
  siteTitle: 'NFT Mintverse',
  siteDesc: 'Enter the stylish metaverse to shill you love.',
}

export const CORRECT_HEX_CHAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? '0x1' // homestead
    : process.env.NEXT_PUBLIC_VERCEL_ENV
    ? '0x4' // rinkeby
    : process.env.NEXT_PUBLIC_USES_LOCALHOST_NETWORK
    ? '0x539' // localhost
    : '0x4' // rinkeby

export const CORRECT_NETWORK =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? HOMESTEAD
    : process.env.NEXT_PUBLIC_VERCEL_ENV
    ? RINKEBY
    : process.env.NEXT_PUBLIC_USES_LOCALHOST_NETWORK
    ? LOCALHOST
    : RINKEBY

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
