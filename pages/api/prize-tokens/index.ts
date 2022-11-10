import { PrizeToken } from '@prisma/client'
import * as service from 'backend/services/prize-tokens'
import { check } from 'express-validator'
import contract from 'lib/contract'
import { validate } from 'lib/middlewares'
import { sendMail } from 'lib/sendgrid'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { fromEmail } from 'utils/config'
import { whitelistTokenNames } from 'data'

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

  const nameIdx = Math.floor(Number(req.body.tokenId) / 2)

  const prizeToken = await service.create({
    tokenId: req.body.tokenId,
    tokenName: req.body.tokenName ?? whitelistTokenNames[nameIdx],
    isPrivateSale: req.body.isPrivateSale ?? false,
    minterEmail: req.body.minterEmail,
    minterWallet: req.body.minterWallet,
  })

  console.log('Prize Token Create Success!')

  if (req.body.minterEmail && req.body.emailTemplateId) {
    // sendgrid do something. this is probably a WL/Prize Token-only airdrop.

    await sendMail({
      from: fromEmail,
      to: req.body.minterEmail,
      templateId: req.body.emailTemplateId,
      dynamicTemplateData: {},
    })
  }
  res.json(prizeToken)
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query

  if (address) {
    if (typeof address !== 'string' || Array.isArray(address)) {
      res.status(422).send('Single address not provided')
      return
    }
    try {
      const tokenIdBnList = await contract.callStatic.tokensOfOwner(address)
      const tokenIdList = tokenIdBnList.map((bn) => bn.toNumber())
      const prizeTokenIdList = tokenIdList.filter((id) => id % 2 === 1)

      if (prizeTokenIdList.length === 0)
        return res.status(404).send('No Message Tokens Found')

      const data = await service.findMany({
        OR: prizeTokenIdList.map((id) => ({ tokenId: id })),
      })
      res.status(200).json({ data })
    } catch (error) {
      console.log('error: ', error)
      if (error.code === 'INVALID_ARGUMENT')
        return res.status(422).send('Invalid Address')

      res.status(500).send(error.message)
    }
  }
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') return postHandler(req, res)
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
