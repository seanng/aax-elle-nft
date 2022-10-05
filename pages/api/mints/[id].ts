import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import sendgrid from 'lib/sendgrid'
import * as service from 'backend/services/mints'
import { makeS3 } from 'lib/aws'
import { emailTemplateIds, s3BaseUrl, s3Bucket, fromEmail } from 'utils/config'

async function putHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

  try {
    await service.update({ id }, req.body)
    // send opened email to minterEmail.
    // sendgrid.send()
    res.json({ success: true })
  } catch (error) {
    console.log('mint update error: ', error)
    res.json({ success: false })
  }
}

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

    const mint = await service.update({ id }, { openedAt: new Date() })

    // Update public NFT image
    const s3 = await makeS3()
    await s3
      .copyObject({
        Bucket: `${s3Bucket}/public`,
        Key: `${data.messageTokenId}.html`,
        CopySource: `${s3Bucket}/after/${data.messageTokenId}.html`,
      })
      .promise()

    await s3
      .copyObject({
        Bucket: `${s3Bucket}/public`,
        Key: `${data.messageTokenId}.png`,
        CopySource: `${s3Bucket}/after/${data.messageTokenId}.png`,
      })
      .promise()

    if (mint.minterEmail) {
      await sendgrid.send({
        templateId: emailTemplateIds.RECEIVER_OPEN,
        dynamicTemplateData: {
          image_url: `${s3BaseUrl}/public/${mint.messageTokenId}.png?ello`,
        },
        to: mint.minterEmail,
        from: fromEmail,
      })
    }

    res.status(200).send({ success: 'ok' })
  } catch (error) {
    console.log('error in unlockSecret: ', error)
    res.status(500).send('Server error')
  }
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'PUT') return putHandler(req, res)
  if (req.method === 'POST') return unlockSecret(req, res)
}

export default handler
