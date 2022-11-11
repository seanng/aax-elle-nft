import { ethers } from 'hardhat'
import { getAirtableRecords } from '../lib/airtable'
import axios from '../lib/axios'
import dotenv from 'dotenv'
import {
  CONTRACT_NAME,
  WALLET_FIELD,
  EMAIL_FIELD,
  WLT_NAME_FIELD,
} from '../shared/constants'
import { emailTemplateIds } from '../utils/config'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

const PARTICIPANT_TABLE = '(Testing) - Participants Airdrop' // TODO: CHANGEME

async function airdropParticipants() {
  const contract = (await ethers.getContractFactory(CONTRACT_NAME)).attach(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  )

  const nextTokenId = (await contract.callStatic.getNextTokenId()).toNumber()

  const records = await getAirtableRecords(PARTICIPANT_TABLE)

  await contract.airdropWhitelistTokens(
    records.map((record) => record[WALLET_FIELD])
  )

  console.log('AIRDROP SUCCESS! Storing to DB...')

  for (let i = 0; i < records.length; i++) {
    const record = records[i]
    await axios.post('/api/prize-tokens', {
      emailTemplateId: emailTemplateIds.PARTICIPANT_AIRDROP,
      tokenName: record[WLT_NAME_FIELD],
      isPrivateSale: true,
      tokenId: nextTokenId + i * 2 + 1,
      minterEmail: record[EMAIL_FIELD],
      minterWallet: record[WALLET_FIELD],
    })
  }
}

airdropParticipants()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
