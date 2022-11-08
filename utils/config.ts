/**
 * This file contains app-wide configuration options.
 */

import { GOERLI, HOMESTEAD, LOCALHOST, NOT_STARTED } from '../shared/constants'

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
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elleverse.io',
  siteTitle: 'ELLEverse Impact NFT：寄一封「告白信」給Web3.0世界裡的他',
  siteDesc:
    'ELLEverse的Impact NFT很不一樣，是寄給另一位玩家的「情書NFT」，還可以共同鑄造和持有！和ELLEverse一起用最具風格、最有溫度的方式，進入Web3.0的世界吧！',
  siteKeywords:
    'NFT,元宇宙,ELLE,ELLEverse,Web3.0,ELLE NFT,NFT是什麼,NFT白名單,NFT怎麼玩,元宇宙是什麼,ELLE元宇宙,Metaverse,NFT平台,NFT遊戲,賦能',
}

export const s3BaseUrl =
  process.env.NEXT_PUBLIC_S3_BASE_URL ??
  'https://elle-nft-dev.s3.ap-southeast-1.amazonaws.com'

export const openseaBaseUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://opensea.io/assets/ethereum'
    : 'https://testnets.opensea.io/assets/goerli'

export const correctHexChain =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? '0x1' // homestead
    : process.env.NEXT_PUBLIC_VERCEL_ENV
    ? '0x5' // goerli
    : process.env.NEXT_PUBLIC_USES_LOCALHOST_NETWORK
    ? '0x539' // localhost
    : '0x5' // goerli

export const correctNetwork =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? HOMESTEAD
    : process.env.NEXT_PUBLIC_VERCEL_ENV
    ? GOERLI
    : process.env.NEXT_PUBLIC_USES_LOCALHOST_NETWORK
    ? LOCALHOST
    : GOERLI

export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export const fromEmail = 'notify@elleverse.io'

export const s3Bucket = process.env.S3_BUCKET ?? 'elle-nft-dev'

// lucky draw
export const luckyDrawable = process.env.NEXT_PUBLIC_LUCKY_DRAWABLE ?? false
export const reelRotations = 12

export const publicFrameText = 'In ELLEverse, you are special & stylish.'
