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
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: '0.8.4',
  networks: {
    localhost: {
      from: process.env.METAMASK_ACCOUNT_ADDRESS, // owner address
      accounts: [
        process.env.METAMASK_ACCOUNT_PRIVATE_KEY, // owner private key
      ],
    },
    rinkeby: {
      url: process.env.ALCHEMY_API_URL,
      from: process.env.METAMASK_ACCOUNT_ADDRESS, // owner address
      accounts: [
        process.env.METAMASK_ACCOUNT_PRIVATE_KEY, // owner private key
      ],
    },
  },
}
