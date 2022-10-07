import { ethers, network } from 'hardhat'
import airtable from '../lib/airtable'
import dotenv from 'dotenv'
import { CONTRACT_NAME, WALLET_FIELD, EMAIL_FIELD } from '../shared/constants'
import { emailTemplateIds } from '../utils/config'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

const PARTICIPANT_TABLE = '(Testing) - Participants NFT Generation' // TODO: CHANGEME
const STARTING_ID = 0

async function airdropParticipants() {
  if (!network.config.from)
    throw new Error(`no from address configured in ${network.name}!`)

  const contract = (await ethers.getContractFactory(CONTRACT_NAME)).attach(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  )

  const data = await airtable(PARTICIPANT_TABLE).select().firstPage()

  const records = data
    .map(({ fields }) => fields)
    .filter((field) => field[WALLET_FIELD] && field[EMAIL_FIELD]) // remove blank rows

  await contract.airdropWhitelistTokens(
    records.map((record) => record[WALLET_FIELD])
  )

  console.log('AIRDROP SUCCESS! Sending emails.')

  // TODO: Uncomment if WLT change into Prize Tokens.
  // records.forEach((rec, i) => {
  //   await axios.post('/api/prize-tokens', {
  //     emailTemplateId: emailTemplateIds.PARTICIPANT_AIRDROP,
  //     tokenId: STARTING_ID + i * 2 + 1,
  //     minterEmail: record[EMAIL_FIELD],
  //     minterWallet: record[WALLET_FIELD],
  //   })
  // })

  console.log('Email send success.')
}

airdropParticipants()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
