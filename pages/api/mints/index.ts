import * as service from 'backend/services/mints'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { validate } from 'lib/middlewares'
import { check } from 'express-validator'

interface PostHandlerRequest extends NextApiRequest {
  body: {
    message: string
    minterEmail: string
    minterWallet: string
    ethDonated: string
    passcode: string
    messageTokenId: number
  }
}

async function postHandler(req: PostHandlerRequest, res: NextApiResponse) {
  if (
    !(await validate([
      check('message').exists(),
      check('minterEmail').isEmail(),
      check('minterWallet').exists(),
      check('ethDonated').exists(),
      check('passcode').exists(),
      check('messageTokenId').exists().isNumeric(),
    ])(req, res))
  )
    return

  const mint = await service.create({
    message: req.body.message,
    minterEmail: req.body.minterEmail,
    minterWallet: req.body.minterWallet,
    ethDonated: req.body.ethDonated,
    passcode: req.body.passcode,
    messageTokenId: req.body.messageTokenId,
  })

  res.json(mint)
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { mw: minterWallet, id } = req.query
  const where = {
    ...(typeof minterWallet === 'string' && { minterWallet }),
    ...(typeof id === 'string' && { id }),
  }
  const mints = await service.findAll(where)
  res.json(mints)
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') return postHandler(req, res)
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
