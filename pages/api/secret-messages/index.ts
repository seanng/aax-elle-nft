import * as service from 'backend/services/secret-messages'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { validate } from 'lib/middlewares'
import { check } from 'express-validator'

interface PostHandlerRequest extends NextApiRequest {
  body: {
    message: string
    senderEmail: string
    senderWallet: string
    ethDonated: string
    isPrivateOnly: boolean
    password: string
    tokenURI: string
    nftTokenId: number
  }
}

async function postHandler(req: PostHandlerRequest, res: NextApiResponse) {
  if (
    !(await validate([
      check('message').exists(),
      check('senderEmail').isEmail(),
      check('senderWallet').exists(),
      check('ethDonated').exists(),
      check('isPrivateOnly').exists().isBoolean(),
      check('password').exists(),
      check('tokenURI').exists(),
      check('nftTokenId').exists().isNumeric(),
    ])(req, res))
  )
    return

  const secretMessage = await service.create({
    message: req.body.message,
    senderEmail: req.body.senderEmail,
    senderWallet: req.body.senderWallet,
    ethDonated: req.body.ethDonated,
    isPrivateOnly: req.body.isPrivateOnly,
    password: req.body.password,
    tokenURI: req.body.tokenURI,
    nftTokenId: req.body.nftTokenId,
  })

  res.json(secretMessage)
}

async function getHandler(req: PostHandlerRequest, res: NextApiResponse) {
  const { sw: senderWallet, id } = req.query
  const where = {
    ...(typeof senderWallet === 'string' && { senderWallet }),
    ...(typeof id === 'string' && { id }),
  }
  const secretMessages = await service.findAll(where)
  res.json(secretMessages)
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') return postHandler(req, res)
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
