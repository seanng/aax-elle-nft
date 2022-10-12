import Airtable from 'airtable'
import { useWeb3Context } from 'context'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import {
  AFTER,
  AIRTABLE_BASE_ID,
  AUTONUMBER,
  BEFORE,
  FRAME_PHRASE,
  KOL_NAME_FIELD,
  NEVER,
  NFT_MESSAGE_FIELD,
  PUBLIC,
} from 'shared/constants'
import { contractAddress } from 'utils/config'
import { genKolAssets } from 'utils/nft'
import { uploadOneFile } from 'utils/helpers'
import contractABI from 'artifacts/contracts/Elleverse.sol/Elleverse.json'

const airtable = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE_ID)

const validateAirtableRecords = (records) => {
  const errors = [] as string[]
  const requiredFields = [NFT_MESSAGE_FIELD, FRAME_PHRASE, AUTONUMBER]
  for (let i = 0; i < records.length; i++) {
    const rec = records[i]
    for (let j = 0; j < requiredFields.length; j++) {
      if (!rec[requiredFields[j]]) {
        errors.push(
          `- ${requiredFields[j]} on Row #${i + 1} for ${rec[KOL_NAME_FIELD]}.`
        )
      }
    }
  }
  return errors
}

const GenKolNFTsPage: NextPage = () => {
  const { web3Provider } = useWeb3Context()

  const handleGenKolNftClick = async () => {
    let startingTokenId: number

    // Get Starting Token ID.
    const contract = new ethers.Contract(
      contractAddress as string,
      contractABI.abi,
      web3Provider?.getSigner()
    )
    try {
      const nextTokenIdBn = await contract.callStatic.getNextTokenId()
      startingTokenId = nextTokenIdBn.toNumber()
    } catch (error) {
      console.log(
        'Owner is not the owner. Make sure you are connecting from Owner Wallet.',
        error
      )
      return
    }

    // Get Airtable Records
    const TABLE_NAME = '(Testing) - KOL Airdrop'
    const data = await airtable(TABLE_NAME)
      .select({ sort: [{ field: AUTONUMBER, direction: 'asc' }] })
      .firstPage()
    const records = data.map(({ fields }) => fields)

    // Validate Airtable Records Fields.
    const errors = validateAirtableRecords(records)
    if (errors.length > 0) {
      console.log(
        'ERROR: Cannot generate KOL Assets. The following fields are missing:\n',
        errors.join('\n ')
      )
      return
    }

    // Generate KOL Assets.
    const assets = await genKolAssets(records)
    console.log('assets: ', assets)

    // Upload to S3.
    for (let i = 0; i < assets.length; i++) {
      const tokenId = i * 2 + startingTokenId
      const asset = assets[i]
      await uploadOneFile(PUBLIC, `${tokenId}.png`, asset.beforeOpenImage)
      await uploadOneFile(PUBLIC, `${tokenId}.html`, asset.beforeOpenHtml)
      await uploadOneFile(BEFORE, `${tokenId}.png`, asset.beforeOpenImage)
      await uploadOneFile(BEFORE, `${tokenId}.html`, asset.beforeOpenHtml)
      await uploadOneFile(AFTER, `${tokenId}.png`, asset.afterOpenImage)
      await uploadOneFile(AFTER, `${tokenId}.html`, asset.afterOpenHtml)
      await uploadOneFile(NEVER, `${tokenId}.png`, asset.neverOpenedImage)
      await uploadOneFile(NEVER, `${tokenId}.html`, asset.neverOpenedHtml)
    }
  }

  return (
    <div>
      <button onClick={handleGenKolNftClick}>Gen and Upload KOL Assets</button>
    </div>
  )
}

export default GenKolNFTsPage
