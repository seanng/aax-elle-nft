import * as secretMessages from 'backend/services/secret-messages'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { validate } from 'lib/middlewares'
import { check } from 'express-validator'

interface PostHandlerRequest extends NextApiRequest {
  body: {
    senderEmail: string
    message: string
    donationAmount: string
    contractAddress: string
    encryptedImageUrl: string
  }
}

async function postHandler(req: PostHandlerRequest, res: NextApiResponse) {
  if (
    !(await validate([
      check('senderEmail').isEmail(),
      check('message').exists(),
      check('donationAmount').exists().isInt(),
      check('contractAddress').exists(),
      check('encryptedImageId').exists(),
    ])(req, res))
  )
    return

  const secretMessage = await secretMessages.create({
    senderEmail: req.body.senderEmail,
    message: req.body.message,
    donationAmount: req.body.donationAmount,
    contractAddress: req.body.contractAddress,
    encryptedImageUrl: req.body.encryptedImageUrl,
  })

  // TODO: Generate and upload NFT json to s3. Get back tokenURI.

  // TODO: Update Secret with tokenURI.

  res.json(secretMessage)
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') return postHandler(req, res)
}

export default handler
