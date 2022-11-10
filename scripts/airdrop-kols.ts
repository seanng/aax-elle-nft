import { ethers, network } from 'hardhat'
import randomstring from 'randomstring'
import axios from '../lib/axios'
import { getAirtableRecords } from '../lib/airtable'
import dotenv from 'dotenv'
import { emailTemplateIds } from '../utils/config'
import {
  CONTRACT_NAME,
  NFT_MESSAGE_FIELD,
  WALLET_FIELD,
  WLT_NAME_FIELD,
  EMAIL_FIELD,
} from '../shared/constants'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

const KOL_TABLE = '(Testing) - KOL Airdrop' // TODO: CHANGEME

async function airdropKols() {
  const contract = (await ethers.getContractFactory(CONTRACT_NAME)).attach(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  )

  const nextTokenId = (await contract.callStatic.getNextTokenId()).toNumber()

  const records = await getAirtableRecords(KOL_TABLE)

  await contract.airdropBothTokens(
    records.map((record) => record[WALLET_FIELD])
  )

  console.log('AIRDROP SUCCESS! Making POST request...')

  for (let i = 0; i < records.length; i++) {
    const record = records[i]
    await axios.post('/api/message-tokens', {
      message: record[NFT_MESSAGE_FIELD] ?? 'N/A',
      minterEmail: record[EMAIL_FIELD],
      minterWallet: record[WALLET_FIELD],
      emailTemplateId: emailTemplateIds.KOL_AIRDROP,
      passcode: randomstring.generate({ length: 6 }),
      ethDonated: '0',
      tokenId: nextTokenId + i * 2,
      isPrivateSale: true,
    })

    await axios.post('/api/prize-tokens', {
      tokenId: nextTokenId + i * 2 + 1,
      tokenName: record[WLT_NAME_FIELD],
      isPrivateSale: true,
      minterEmail: record[EMAIL_FIELD],
      minterWallet: record[WALLET_FIELD],
    })
  }

  console.log('POST success')
}

airdropKols()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
