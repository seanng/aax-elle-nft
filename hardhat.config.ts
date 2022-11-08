import { task } from 'hardhat/config'
import dotenv from 'dotenv'

import '@nomiclabs/hardhat-waffle'

if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()
  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more!

const GOERLI_PRIVATE_KEY =
  process.env.GOERLI_PRIVATE_KEY ?? 'YOUR GOERLI PRIVATE KEY'

const MAINNET_PRIVATE_KEY =
  process.env.MAINNET_PRIVATE_KEY ?? 'YOUR MAINNET PRIVATE KEY'

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [
        GOERLI_PRIVATE_KEY, // "owner" private key
      ],
      gasPrice: 'auto',
    },
  },
  paths: {
    tests: './__tests__',
  },
}
