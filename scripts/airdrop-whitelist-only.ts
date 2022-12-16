import { ethers } from 'hardhat'
import axios from '../lib/axios'
import dotenv from 'dotenv'
import { CONTRACT_NAME, WALLET_FIELD, EMAIL_FIELD } from '../shared/constants'
import { emailTemplateIds } from '../utils/config'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

const records = [
  {
    [WALLET_FIELD]: '0x0aCe6F6D284FDaac3E49044670b7e3D5D0f18bf2',
    [EMAIL_FIELD]: 'sean.ng@aax.com',
  },
  {
    [WALLET_FIELD]: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    [EMAIL_FIELD]: 'shonum2@gmail.com',
  },
  {
    [WALLET_FIELD]: '0xCD1E014Eee1c8E7FcB49eB1AaAeA58154004E554',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
  {
    [WALLET_FIELD]: '0x0aCe6F6D284FDaac3E49044670b7e3D5D0f18bf2',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
  {
    [WALLET_FIELD]: '0xED0c97593061d95E278B2ACA9D6DBda866706e4D',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
  {
    [WALLET_FIELD]: '0x0aCe6F6D284FDaac3E49044670b7e3D5D0f18bf2',
    [EMAIL_FIELD]: 'sean.ng@aax.com',
  },
  {
    [WALLET_FIELD]: '0xB9ed526A5A6e6CE6Daac4006a6338431e0132B9A',
    [EMAIL_FIELD]: 'shonum2@gmail.com',
  },
  {
    [WALLET_FIELD]: '0xCD1E014Eee1c8E7FcB49eB1AaAeA58154004E554',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
  {
    [WALLET_FIELD]: '0x0aCe6F6D284FDaac3E49044670b7e3D5D0f18bf2',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
  {
    [WALLET_FIELD]: '0x51b22f7c87aFeaB4D038Ec7D5C550Ff71665E64D',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
  {
    [WALLET_FIELD]: '0x0aCe6F6D284FDaac3E49044670b7e3D5D0f18bf2',
    [EMAIL_FIELD]: 'sean.ng@aax.com',
  },
  {
    [WALLET_FIELD]: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    [EMAIL_FIELD]: 'shonum2@gmail.com',
  },
  {
    [WALLET_FIELD]: '0xCD1E014Eee1c8E7FcB49eB1AaAeA58154004E554',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
  {
    [WALLET_FIELD]: '0x0aCe6F6D284FDaac3E49044670b7e3D5D0f18bf2',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
  {
    [WALLET_FIELD]: '0xED0c97593061d95E278B2ACA9D6DBda866706e4D',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
  {
    [WALLET_FIELD]: '0x061bdce9E0B5df0d8a67d5ca2540f7fc911F0c2e',
    [EMAIL_FIELD]: 'sean.ng@aax.com',
  },
  {
    [WALLET_FIELD]: '0xD04f58F68325430eAF6d9EBf71dA466f8bD4c60F',
    [EMAIL_FIELD]: 'shonum2@gmail.com',
  },
  {
    [WALLET_FIELD]: '0xCD1E014Eee1c8E7FcB49eB1AaAeA58154004E554',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
  {
    [WALLET_FIELD]: '0x0aCe6F6D284FDaac3E49044670b7e3D5D0f18bf2',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
  {
    [WALLET_FIELD]: '0x1A6B6D2BfED6c25439FD07D97f2868bAcc383B36',
    [EMAIL_FIELD]: 'shonum4@gmail.com',
  },
]

async function airdropWhitelistOnly() {
  const contract = (await ethers.getContractFactory(CONTRACT_NAME)).attach(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  )

  // const nextTokenId = (await contract.callStatic.getNextTokenId()).toNumber()

  const functionFee = await contract.estimateGas.airdropWhitelistTokens(
    records.map((record) => record[WALLET_FIELD])
  )
  console.log(
    '🚀 ~ file: airdrop-whitelist-only.ts ~ line 99 ~ airdropWhitelistOnly ~ functionFee',
    functionFee
  )

  // await contract.airdropWhitelistTokens(
  //   records.map((record) => record[WALLET_FIELD])
  // )

  // console.log('AIRDROP SUCCESS! Storing to DB.')

  // for (let i = 0; i < records.length; i++) {
  //   const record = records[i]
  //   await axios.post('/api/prize-tokens', {
  //     // emailTemplateId: emailTemplateIds.PARTICIPANT_AIRDROP,
  //     isPrivateSale: true,
  //     tokenId: nextTokenId + i * 2 + 1,
  //     minterEmail: record[EMAIL_FIELD],
  //     minterWallet: record[WALLET_FIELD],
  //   })
  // }
}

airdropWhitelistOnly()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
