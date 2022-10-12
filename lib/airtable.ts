import Airtable from 'airtable'
import dotenv from 'dotenv'
import { AIRTABLE_BASE_ID } from '../shared/constants'

if (typeof window == 'undefined' && !process.env.VERCEL)
  dotenv.config({ path: __dirname + '/.env.local' })

export default new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE_ID)
