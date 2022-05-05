export const config = {
  siteUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://nft.elle.com'
      : 'http://localhost:3001',
  siteTitle: 'NFT Mintverse',
  siteDesc: 'Enter the stylish metaverse to shill you love.',
}
