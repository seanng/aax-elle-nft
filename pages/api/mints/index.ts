import * as service from 'backend/services/mints'
import sendgrid from 'lib/sendgrid'
import randomstring from 'randomstring'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { validate } from 'lib/middlewares'
import { CONTRACT_ADDRESS, metadata, emailTemplateIds } from 'utils/config'
import { check } from 'express-validator'
import { KOL, WINNER, S3_BASE_URL, FROM_EMAIL } from 'shared/constants'

const openseaBaseUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://opensea.io/assets/ethereum'
    : 'https://testnets.opensea.io/assets/rinkeby'

interface PostHandlerRequest extends NextApiRequest {
  body: {
    message: string
    minterEmail: string
    minterWallet: string
    ethDonated: string
    passcode: string
    messageTokenId: number
    isPrivateSale?: string
    airdropReceiver?: string
    kolName?: string
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
    messageTokenId: req.body.messageTokenId,
  })

  // Send Email
  if (req.body.minterEmail) {
    const imgUrl = `${S3_BASE_URL}/public/${req.body.messageTokenId}.png`
    const { PRIVATE_SALE_MINT, PUBLIC_SALE_MINT, KOL_AIRDROP, WINNER_AIRDROP } =
      emailTemplateIds

    let templateId = req.body.isPrivateSale
      ? PRIVATE_SALE_MINT
      : PUBLIC_SALE_MINT

    if (req.body.airdropReceiver) {
      templateId =
        {
          [KOL]: KOL_AIRDROP,
          [WINNER]: WINNER_AIRDROP,
        }[req.body.airdropReceiver] ?? templateId
    }

    await sendgrid.send({
      templateId,
      dynamicTemplateData: {
        unlock_url: `${metadata.siteUrl}/open/${slug}`,
        passcode: req.body.passcode,
        opensea_url: `${openseaBaseUrl}/${CONTRACT_ADDRESS}/${req.body.messageTokenId}`,
        KOL_name: req.body.kolName ?? '你喜歡的藝人',
        image_url: imgUrl,
        image2_url: req.body.isPrivateSale
          ? `${S3_BASE_URL}/public/whitelist.png`
          : `${S3_BASE_URL}/public/prize.png`,
      },
      from: FROM_EMAIL,
      to: req.body.minterEmail,
    })
  }

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
