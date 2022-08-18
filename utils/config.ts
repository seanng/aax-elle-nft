import { NOT_STARTED } from 'shared/constants'

// Manually update.
export const saleStatus = process.env.NEXT_PUBLIC_SALE_STATUS || NOT_STARTED

export const metadata = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://elleverse.io',
  siteTitle: 'NFT Mintverse',
  siteDesc: 'Enter the stylish metaverse to shill you love.',
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
