import { ethers, network } from 'hardhat'
import randomstring from 'randomstring'
import axios from '../lib/axios'
import dotenv from 'dotenv'
import Airtable from 'airtable'
import { emailTemplateIds } from '../utils/config'
import {
  CONTRACT_NAME,
  AIRTABLE_BASE_ID,
  NFT_MESSAGE_FIELD,
  WALLET_FIELD,
  EMAIL_FIELD,
  KOL_NAME_FIELD,
} from '../shared/constants'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

const KOL_TABLE_NAME = '(Testing) - KOL NFT Generation' // TODO: CHANGEME
const STARTING_ID = 0

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  AIRTABLE_BASE_ID
)(KOL_TABLE_NAME)

async function kolAirdrop() {
  if (!network.config.from)
    throw new Error(`no from address configured in ${network.name}!`)

  const contract = (await ethers.getContractFactory(CONTRACT_NAME)).attach(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  )

  // https://airtable.com/appEJkckJzqTTk6II/api/docs#javascript/table:issue%20tracking%20list:list
  const data = await airtable
    .select({
      fields: [KOL_NAME_FIELD, NFT_MESSAGE_FIELD, WALLET_FIELD, EMAIL_FIELD],
    })
    .firstPage()

  const records = data
    .map(({ fields }) => fields)
    .filter(
      (field) =>
        field[KOL_NAME_FIELD] && field[WALLET_FIELD] && field[EMAIL_FIELD]
    ) // remove blank rows

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
      tokenId: STARTING_ID + i * 2,
      isPrivateSale: true,
    })

    // TODO: Uncomment if WLT change into Prize Tokens.
    // await axios.post('/api/prize-tokens', {
    //   tokenId: STARTING_ID + i * 2 + 1,
    //   minterEmail: record[EMAIL_FIELD],
    //   minterWallet: record[WALLET_FIELD],
    // })
  }

  console.log('POST success')
}

kolAirdrop()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
