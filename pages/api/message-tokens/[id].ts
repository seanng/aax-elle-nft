import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { sendMail } from 'lib/sendgrid'
import * as service from 'backend/services/message-tokens'
import { makeS3 } from 'lib/aws'
import { emailTemplateIds, s3BaseUrl, s3Bucket } from 'utils/config'

async function unlockSecret(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }
  try {
    const data = await service.findUnique({ id })
    if (!data) {
      return res.status(404).send('Secret Not Found')
    }

    if (data.passcode !== req.body.passcode) {
      return res.status(401).send('Invalid Passcode')
    }

    await service.update({ id }, { openedAt: new Date() })

    // Update public NFT image
    const s3 = await makeS3()
    await s3
      .copyObject({
        Bucket: `${s3Bucket}/public`,
        Key: `${data.tokenId}.html`,
        CopySource: `${s3Bucket}/after/${data.tokenId}.html`,
      })
      .promise()

    await s3
      .copyObject({
        Bucket: `${s3Bucket}/public`,
        Key: `${data.tokenId}.png`,
        CopySource: `${s3Bucket}/after/${data.tokenId}.png`,
      })
      .promise()

    if (data.minterEmail) {
      await sendMail({
        templateId: emailTemplateIds.RECEIVER_OPEN,
        to: data.minterEmail,
        dynamicTemplateData: {
          image_url: `${s3BaseUrl}/public/${data.tokenId}.png?ello`,
        },
      })
    }

    res.status(200).send({ success: 'ok' })
  } catch (error) {
    console.log('error in unlockSecret: ', error)
    res.status(500).send('Server error')
  }
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') return unlockSecret(req, res)
}

export default handler
