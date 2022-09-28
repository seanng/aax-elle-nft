import { ethers, network } from 'hardhat'
import dotenv from 'dotenv'
import Airtable from 'airtable'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

const TABLE_NAME = '(Testing) - KOL NFT Generation'

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appEJkckJzqTTk6II'
)(TABLE_NAME)

const STARTING_ID = 0

// TODO: Test on LOCALHOST node, before Mainnet.
async function kolAirdrop() {
  if (!network.config.from)
    throw new Error(`no from address configured in ${network.name}!`)

  // const contract = (await ethers.getContractFactory('Elleverse')).attach(
  //   process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  // )

  // https://airtable.com/appEJkckJzqTTk6II/api/docs#javascript/table:issue%20tracking%20list:list
  const data = await airtable
    .select({
      fields: [
        'KOL Name',
        'NFT Message',
        'Frame Text',
        'Wallet Address',
        'Email',
      ],
    })
    .firstPage()

  const records = data
    .map(({ fields }) => fields)
    .filter((field) => field['KOL Name'] && field['Wallet Address']) // remove blank rows

  console.log('records: ', records)

  /**
   * Outside loop block
   * contract.airdropBothTokens(addressList)
   *
   * For each Airtable Row,
   *   Post /mint - Body Deets:
   *     minterEmail: airtable['Email']
   *     minterWallet: airtable['Wallet Address]
   *     message: airtable['NFT Message']
   *     passcode: randomstring.generate({ length: 6 })
   *     ethDonated: 0
   *     messageTokenId = STARTING_ID + (i * 2)
   *     isPrivateSale: true
   *
   */
}

kolAirdrop()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
