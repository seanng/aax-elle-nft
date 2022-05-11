import * as donations from 'backend/services/donations'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { validate } from 'lib/middlewares'
import { check } from 'express-validator'

interface PostHandlerRequest extends NextApiRequest {
  body: {
    email: string
    message: string
    donationAmount: string
    contractAddress: string
    encryptedImageId: string
  }
}

async function postHandler(req: PostHandlerRequest, res: NextApiResponse) {
  const errors = await validate([
    check('email').isEmail(),
    check('message').exists(),
    check('donationAmount').exists().isInt(),
    check('contractAddress').exists(),
    check('encryptedImageId').exists(),
  ])(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  const donation = await donations.create({
    email: req.body.email,
    message: req.body.message,
    donationAmount: req.body.donationAmount,
    contractAddress: req.body.contractAddress,
    encryptedImageId: req.body.encryptedImageId,
  })
  res.json(donation)
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') return postHandler(req, res)
}

export default handler
