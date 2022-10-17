import Airtable from 'airtable'
import dotenv from 'dotenv'
import {
  AIRTABLE_BASE_ID,
  AUTONUMBER_FIELD,
  EMAIL_FIELD,
  WALLET_FIELD,
} from '../shared/constants'

if (typeof window == 'undefined' && !process.env.VERCEL)
  dotenv.config({ path: __dirname + '/.env.local' })

const airtable = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE_ID)

export default airtable

export async function getAirtableRecords(tableName) {
  const data = await airtable(tableName)
    .select({
      sort: [{ field: AUTONUMBER_FIELD, direction: 'asc' }],
    })
    .firstPage()

  const records = data
    .map(({ fields }) => fields)
    .filter((field) => field[WALLET_FIELD] && field[EMAIL_FIELD]) // remove blank rows

  return records
}
