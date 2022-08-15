import { NOT_STARTED, PUBLIC_SALE, PRESALE, FINISHED } from 'shared/constants'

export const config = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://elleverse.io',
  siteTitle: 'NFT Mintverse',
  siteDesc: 'Enter the stylish metaverse to shill you love.',
  saleStatus:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? NOT_STARTED
      : PUBLIC_SALE,
}

export const navigation = [
  {
    title: 'Help',
    route: 'help',
  },
  {
    title: 'Collection',
    route: 'collection',
  },
]
