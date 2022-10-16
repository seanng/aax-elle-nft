import Airtable from 'airtable'
import { useWeb3Context } from 'context'
import { ethers } from 'ethers'
import { NextPage } from 'next'
import {
  AFTER,
  AIRTABLE_BASE_ID,
  AUTONUMBER_FIELD,
  BEFORE,
  BG_COLOR_FIELD,
  ELLEMOJI_FIELD,
  FRAME_COLOR_FIELD,
  FRAME_PHRASE_FIELD,
  FRAME_SENDER_FIELD,
  NEVER,
  NFT_MESSAGE_FIELD,
  PUBLIC,
  SIGNATURE_FIELD,
  NAME_FIELD,
} from 'shared/constants'
import { contractAddress, s3BaseUrl } from 'utils/config'
import contractABI from 'artifacts/contracts/Elleverse.sol/Elleverse.json'
import { genNftFrameTextMsg, getAssets, KOL_GI_TEMPLATES } from 'utils/nft'
import { uploadOneFile } from 'utils/helpers'

const airtable = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE_ID)

const validateAirtableRecords = (records) => {
  const errors = [] as string[]
  const requiredFields = [
    NFT_MESSAGE_FIELD,
    FRAME_PHRASE_FIELD,
    FRAME_SENDER_FIELD,
    AUTONUMBER_FIELD,
    ELLEMOJI_FIELD,
    SIGNATURE_FIELD,
  ]
  for (let i = 0; i < records.length; i++) {
    const rec = records[i]
    for (let j = 0; j < requiredFields.length; j++) {
      if (!rec[requiredFields[j]]) {
        errors.push(
          `- ${requiredFields[j]} on Row #${i + 1} for ${rec[NAME_FIELD]}.`
        )
      }
    }
  }
  return errors
}

const GenWinnerNFTsPage: NextPage = () => {
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
    const TABLE_NAME = '(Testing) - Winners Airdrop'
    const data = await airtable(TABLE_NAME)
      .select({ sort: [{ field: AUTONUMBER_FIELD, direction: 'asc' }] })
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
    for (let i = 0; i < records.length; i++) {
      const rec = records[i]
      const signature = `${s3BaseUrl}/assets/${rec[SIGNATURE_FIELD]}`
      const asset = await getAssets({
        isKol: true,
        signature,
        gridIconTemplate: KOL_GI_TEMPLATES[rec[ELLEMOJI_FIELD] as string],
        message: rec[NFT_MESSAGE_FIELD] as string,
        aroundText: genNftFrameTextMsg(
          rec[FRAME_SENDER_FIELD],
          rec[NAME_FIELD],
          false,
          rec[FRAME_PHRASE_FIELD] as string
        ),
        neverOpenedAroundText: genNftFrameTextMsg(
          rec[FRAME_SENDER_FIELD],
          rec[NAME_FIELD],
          true,
          rec[FRAME_PHRASE_FIELD] as string
        ),
        backgroundStyle: rec[BG_COLOR_FIELD] as string,
        aroundTextColor: rec[FRAME_COLOR_FIELD] as string,
        gridStyle: rec[FRAME_COLOR_FIELD] as string,
      })

      // * Upload to S3.
      const tokenId = i * 2 + startingTokenId
      console.log('uploading ', tokenId)
      await uploadOneFile(PUBLIC, `${tokenId}.png`, asset.afterOpenImage)
      await uploadOneFile(PUBLIC, `${tokenId}.html`, asset.afterOpenHtml)
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
      <button onClick={handleGenKolNftClick}>
        Gen and Upload Winners Assets
      </button>
    </div>
  )
}

export default GenWinnerNFTsPage
