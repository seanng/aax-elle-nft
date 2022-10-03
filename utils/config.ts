import {
  NOT_STARTED,
  HOMESTEAD,
  RINKEBY,
  LOCALHOST,
  PRIVATE_SALE,
  FINISHED,
} from 'shared/constants'
import { KolDropdownListItem } from 'shared/types'

export const salePhase = PRIVATE_SALE
// export const salePhase = FINISHED
// export const salePhase = process.env.NEXT_PUBLIC_SALE_PHASE ?? NOT_STARTED

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

export const kolDropdownList = [
  {
    id: 1,
    name: '鄧紫棋',
    frameText: '我的每一次心跳 你是否听见',
  },
  {
    id: 2,
    name: 'WeiBird',
    frameText:
      '妳的聲音 解開了故事的謎語 落下一萬年的約定 大樹下的妳 紅色圍巾 手心裡捧的雨 哭了笑了 除了妳還是妳',
  },
  {
    id: 3,
    name: 'EggPlantEgg',
    frameText:
      '倒佇故鄉街市的中央 笑看世界咧轉踅 你是我 烏暗的心唯一的光 親像是眼前的燈火',
  },
  {
    id: 4,
    name: '動力火車',
    frameText: '難以置信 我沒被放棄 還有個妳 等在結局',
  },
  {
    id: 5,
    name: '黃明志',
    frameText:
      '對不起是我太任性 講真話總讓人傷心 或許不該太直白 超直白 I’m So Sorry 又讓你森七七',
  },
  {
    id: 6,
    name: '許光漢',
    frameText: '還記得嗎 那場煙火 它見證我們倒數愛情時 特別冷漠',
  },
  {
    id: 7,
    name: '蔡健雅',
    frameText: '傷口 都平復 只是不確定 敢不敢再投入   才逞強說 習慣獨立自主',
  },
  {
    id: 8,
    name: '盧廣仲',
    frameText:
      '今天 又是雨時多雲偶陣晴 潮濕的風景 愛情不合時宜 我想 我能夠為你淋一場雨 慶祝 哪一天 我擁抱著你',
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
    frameText: '寂寞的太空人，當你回到陸地，回到平凡而不凡的生活裡',
  },
] as KolDropdownListItem[]
