/**
 * This file contains app-wide configuration options.
 */

import { HOMESTEAD, LOCALHOST, NOT_STARTED, RINKEBY } from 'shared/constants'
import { KolDropdownListItem } from 'shared/types'

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
  siteTitle: 'NFT Mintverse',
  siteDesc: 'Enter the stylish metaverse to shill you love.',
}

export const kolDropdownList = [
  {
    id: 1,
    name: '鄧紫棋',
    frameText:
      'A long, long time ago... I can still remember How that music used to make me smile.',
  },
  {
    id: 2,
    name: 'WeiBird',
    frameText:
      "And I knew if I had my chance That I could make those people dance And, maybe, they'd be happy for a while.",
  },
  {
    id: 3,
    name: 'EggPlantEgg',
    frameText: "But february made me shiver With every paper I'd deliver.",
  },
  {
    id: 4,
    name: '動力火車',
    frameText: "Bad news on the doorstep; I couldn't take one more step.",
  },
  {
    id: 5,
    name: '黃明志',
    frameText:
      "I can't remember if I cried When I read about his widowed bride,",
  },
  {
    id: 6,
    name: '許光漢',
    frameText: 'But something touched me deep inside The day the music died.',
  },
  {
    id: 7,
    name: '蔡健雅',
    frameText:
      'So bye-bye, miss american pie. Drove my chevy to the levee, But the levee was dry.',
  },
  {
    id: 8,
    name: '盧廣仲',
    frameText: `And them good old boys were drinkin' whiskey and rye Singin', "this'll be the day that I die. "this'll be the day that I die."`,
  },
  {
    id: 9,
    name: 'ØZI',
    frameText:
      "Cruising down the streets in my 6-4 I’m about to get lit with my 6 hoes I mean 6 bros But haha probably both, I mean god knows who we're gonna see in the clubs tonight",
  },
  {
    id: 10,
    name: '吳青峰',
    frameText: `If the Bible tells you so? Do you believe in rock 'n roll, Can music save your mortal soul, And can you teach me how to dance real slow?`,
  },
] as KolDropdownListItem[]

export const s3BaseUrl =
  process.env.NEXT_PUBLIC_S3_BASE_URL ??
  'https://elle-nft-dev.s3.ap-southeast-1.amazonaws.com'

export const openseaBaseUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://opensea.io/assets/ethereum'
    : 'https://testnets.opensea.io/assets/rinkeby'

export const correctHexChain =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? '0x1' // homestead
    : process.env.NEXT_PUBLIC_VERCEL_ENV
    ? '0x4' // rinkeby
    : process.env.NEXT_PUBLIC_USES_LOCALHOST_NETWORK
    ? '0x539' // localhost
    : '0x4' // rinkeby

export const correctNetwork =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? HOMESTEAD
    : process.env.NEXT_PUBLIC_VERCEL_ENV
    ? RINKEBY
    : process.env.NEXT_PUBLIC_USES_LOCALHOST_NETWORK
    ? LOCALHOST
    : RINKEBY

export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export const fromEmail = 'notify@elleverse.io'

export const s3Bucket = process.env.S3_BUCKET ?? 'elle-nft-dev'
