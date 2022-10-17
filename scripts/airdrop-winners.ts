import { ethers, network } from 'hardhat'
import randomstring from 'randomstring'
import axios from '../lib/axios'
import { getAirtableRecords } from '../lib/airtable'
import dotenv from 'dotenv'
import {
  CONTRACT_NAME,
  NFT_MESSAGE_FIELD,
  WALLET_FIELD,
  EMAIL_FIELD,
  WINNER,
  KOL_NAME_FIELD,
} from '../shared/constants'
import { emailTemplateIds } from '../utils/config'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

const WINNERS_TABLE = '(Testing) - Winners Airdrop' // TODO: CHANGEME

async function airdropWinners() {
  if (!network.config.from)
    throw new Error(`no from address configured in ${network.name}!`)

  const contract = (await ethers.getContractFactory(CONTRACT_NAME)).attach(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  )

  const nextTokenId = (await contract.callStatic.getNextTokenId()).toNumber()

  const records = await getAirtableRecords(WINNERS_TABLE)

  await contract.airdropBothTokens(
    records.map((record) => record[WALLET_FIELD])
  )

  console.log('AIRDROP SUCCESS! Making POST request...')

  for (let i = 0; i < records.length; i++) {
    const record = records[i]
    await axios.post('/api/message-tokens', {
      airdropReceiver: WINNER,
      message: record[NFT_MESSAGE_FIELD] ?? 'N/A',
      minterEmail: record[EMAIL_FIELD],
      [KOL_NAME_FIELD]: record[KOL_NAME_FIELD],
      emailTemplateId: emailTemplateIds.WINNER_AIRDROP,
      minterWallet: record[WALLET_FIELD],
      passcode: randomstring.generate({ length: 6 }),
      ethDonated: '0',
      tokenId: nextTokenId + i * 2,
      isPrivateSale: true,
    })

    await axios.post('/api/prize-tokens', {
      tokenId: nextTokenId + i * 2 + 1,
      minterEmail: record[EMAIL_FIELD],
      minterWallet: record[WALLET_FIELD],
      isPrivateSale: true,
    })
  }

  console.log('POST success')
}

airdropWinners()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
