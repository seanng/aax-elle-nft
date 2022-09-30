import { NOT_STARTED, HOMESTEAD, RINKEBY, LOCALHOST } from 'shared/constants'

export const salePhase = process.env.NEXT_PUBLIC_SALE_PHASE ?? NOT_STARTED

export const emailTemplateIds = {
  PRIVATE_SALE_MINT: 'd-0ba6a6e9fcfc428f85116aee8a0eb368',
  PUBLIC_SALE_MINT: 'd-91315285b60d4a7384adb1857f932686',
  PRIZE_WON: 'd-04e31399e877454d8e1d6469f2fd4027',
  RECEIVER_OPEN: 'd-73314fc931784c18b5d8284516df36b2',
  KOL_AIRDROP: 'd-f21965c03fb64a63935c5ee27782fae3',
  WINNER_AIRDROP: 'd-b6df97a6ee784247a44696397a241819',
  PARTICIPANT_AIRDROP: 'd-66474640aefe443cb56a2d0076b769ec',
}

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
