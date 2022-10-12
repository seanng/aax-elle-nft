import { PrizeToken } from '@prisma/client'
import * as service from 'backend/services/prize-tokens'
import { check } from 'express-validator'
import { validate } from 'lib/middlewares'
import sendgrid from 'lib/sendgrid'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { fromEmail } from 'utils/config'

interface PostHandlerRequest extends NextApiRequest {
  body: PrizeToken & {
    emailTemplateId?: string
    isPrivateSale?: boolean
  }
}

async function postHandler(req: PostHandlerRequest, res: NextApiResponse) {
  console.log('Received PrizeToken POST request. Validating...')
  if (
    !(await validate([
      check('minterEmail').isEmail(),
      check('minterWallet').exists(),
      check('tokenId').exists().isNumeric(),
    ])(req, res))
  )
    return

  const prizeToken = await service.create({
    tokenId: req.body.tokenId,
    isPrivateSale: req.body.isPrivateSale ?? false,
    minterEmail: req.body.minterEmail,
    minterWallet: req.body.minterWallet,
  })

  if (req.body.minterEmail && req.body.emailTemplateId) {
    // sendgrid do something. this is probably a WL/Prize Token-only airdrop.
    await sendgrid.send({
      from: fromEmail,
      to: req.body.minterEmail,
      templateId: req.body.emailTemplateId,
      dynamicTemplateData: {},
    })
  }

  res.json(prizeToken)
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id || typeof id !== 'string' || Array.isArray(id)) {
    res.status(422).send('Single id not provided')
    return
  }

  const prizeTokens = await service.findMany(
    Array.isArray(id) ? { OR: { id } } : { id }
  )

  res.json(prizeTokens)
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') return postHandler(req, res)
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
