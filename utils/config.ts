import { NOT_STARTED, PUBLIC_SALE, PRESALE, FINISHED } from 'shared/constants'

export const config = {
  siteUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://nft.elle.com'
      : 'http://localhost:3001',
  siteTitle: 'NFT Mintverse',
  siteDesc: 'Enter the stylish metaverse to shill you love.',
  // saleStatus: PUBLIC_SALE,
  saleStatus: NOT_STARTED,
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
