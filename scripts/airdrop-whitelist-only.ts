import { ethers, network } from 'hardhat'
import axios from '../lib/axios'
import dotenv from 'dotenv'
import { CONTRACT_NAME, WALLET_FIELD, EMAIL_FIELD } from '../shared/constants'
import { emailTemplateIds } from '../utils/config'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

const records = [
  {
    [WALLET_FIELD]: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
    [EMAIL_FIELD]: 'sean.ng@aax.com',
  },
]

async function airdropWhitelistOnly() {
  if (!network.config.from)
    throw new Error(`no from address configured in ${network.name}!`)

  const contract = (await ethers.getContractFactory(CONTRACT_NAME)).attach(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  )

  const nextTokenId = (await contract.callStatic.getNextTokenId()).toNumber()

  await contract.airdropWhitelistTokens(
    records.map((record) => record[WALLET_FIELD])
  )

  console.log('AIRDROP SUCCESS! Storing to DB.')

  for (let i = 0; i < records.length; i++) {
    const record = records[i]
    await axios.post('/api/prize-tokens', {
      emailTemplateId: emailTemplateIds.PARTICIPANT_AIRDROP,
      isPrivateSale: true,
      tokenId: nextTokenId + i * 2 + 1,
      minterEmail: record[EMAIL_FIELD],
      minterWallet: record[WALLET_FIELD],
    })
  }
}

airdropWhitelistOnly()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
