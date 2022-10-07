import * as service from 'backend/services/message-tokens'
import sendgrid from 'lib/sendgrid'
import randomstring from 'randomstring'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { MessageToken } from '@prisma/client'
import { validate } from 'lib/middlewares'
import { metadata, s3BaseUrl, fromEmail, openseaBaseUrl } from 'utils/config'
import { check } from 'express-validator'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

interface PostHandlerRequest extends NextApiRequest {
  body: MessageToken & {
    emailTemplateId?: string
    kolName?: string
  }
}

async function postHandler(req: PostHandlerRequest, res: NextApiResponse) {
  console.log('Received POST request. Validating...')
  if (
    !(await validate([
      check('message').exists(),
      check('minterEmail').isEmail(),
      check('minterWallet').exists(),
      check('ethDonated').exists(),
      check('passcode').exists(),
      check('tokenId').exists().isNumeric(),
    ])(req, res))
  )
    return

  console.log('Validation success! Processing the POST..')

  let isSlugUnique = false
  let slug = 'abcde'

  while (!isSlugUnique) {
    slug = randomstring.generate({
      capitalization: 'lowercase',
      length: 5,
    })
    isSlugUnique = !(await service.findUnique({ slug }))
  }

  console.log('Storing MessageToken in DB.')

  const mint = await service.create({
    slug,
    message: req.body.message,
    minterEmail: req.body.minterEmail,
    minterWallet: req.body.minterWallet,
    ethDonated: req.body.ethDonated,
    passcode: req.body.passcode,
    tokenId: req.body.tokenId,
  })
  console.log('Mint Create Success!')

  // Send Email
  if (req.body.minterEmail && req.body.emailTemplateId) {
    console.log(`Sending Email to ${req.body.minterEmail}`)
    const imgUrl = `${s3BaseUrl}/public/${req.body.tokenId}.png`

    await sendgrid.send({
      templateId: req.body.emailTemplateId,
      dynamicTemplateData: {
        unlock_url: `${metadata.siteUrl}/open/${slug}`,
        passcode: req.body.passcode,
        opensea_url: `${openseaBaseUrl}/${contractAddress}/${req.body.tokenId}`,
        KOL_name: req.body.kolName ?? '你喜歡的藝人',
        image_url: imgUrl,
        image2_url: req.body.isPrivateSale
          ? `${s3BaseUrl}/public/whitelist.png`
          : `${s3BaseUrl}/public/prize.png`,
      },
      from: fromEmail,
      to: req.body.minterEmail,
    })
  }
  console.log('Email sent.')

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