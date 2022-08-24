import * as service from 'backend/services/mints'
import sendgrid from 'lib/sendgrid'
import randomstring from 'randomstring'
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
    mintedAt: string
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
      check('mintedAt').exists(),
      check('messageTokenId').exists().isNumeric(),
    ])(req, res))
  )
    return

  let isSlugUnique = false
  let slug = 'abcde'

  while (!isSlugUnique) {
    slug = randomstring.generate({
      capitalization: 'lowercase',
      length: 5,
    })
    isSlugUnique = !(await service.findUnique({ slug }))
  }

  const mint = await service.create({
    slug,
    message: req.body.message,
    minterEmail: req.body.minterEmail,
    minterWallet: req.body.minterWallet,
    ethDonated: req.body.ethDonated,
    passcode: req.body.passcode,
    mintedAt: req.body.mintedAt,
    messageTokenId: req.body.messageTokenId,
  })

  // send success email to minterEmail.
  // sendgrid.send()

  res.json(mint)
}

// getOneMint (based on slug). /open?slug=abc
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  const where = {
    ...(typeof slug === 'string' && { slug }),
  }
  const mints = await service.findMany(where)
  res.json(mints)
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') return postHandler(req, res)
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
