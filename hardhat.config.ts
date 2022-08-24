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
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // owner address from npx hardhat node
    },
    rinkeby: {
      url: process.env.ALCHEMY_API_URL,
      from: process.env.WALLET_ADDRESS, // "owner" address
      accounts: [
        process.env.WALLET_PRIVATE_KEY, // "owner" private key
      ],
    },
  },
  paths: {
    tests: './__tests__',
  },
}
