import * as messageTokensService from 'backend/services/message-tokens'
import { sendMail } from 'lib/sendgrid'
import contract from 'lib/contract'
import randomstring from 'randomstring'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { MessageToken } from '@prisma/client'
import { validate } from 'lib/middlewares'
import { s3BaseUrl, openseaBaseUrl, contractAddress } from 'utils/config'
import { check } from 'express-validator'

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
    isSlugUnique = !(await messageTokensService.findUnique({ slug }))
  }

  console.log('Storing MessageToken in DB.')

  const mint = await messageTokensService.create({
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

    await sendMail({
      templateId: req.body.emailTemplateId,
      dynamicTemplateData: {
        unlock_url: `${
          process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
            ? 'https://elleverse.io'
            : 'https://aax-elle-nft-git-dev-seanng.vercel.app'
        }/open/${slug}`,
        passcode: req.body.passcode,
        opensea_url: `${openseaBaseUrl}/${contractAddress}/${req.body.tokenId}`,
        KOL_name: req.body.kolName ?? '你喜歡的藝人',
        image_url: imgUrl,
        image2_url: req.body.isPrivateSale
          ? `${s3BaseUrl}/public/whitelist.png`
          : `${s3BaseUrl}/public/prize.png`,
      },
      to: req.body.minterEmail,
    })
  }
  console.log('Email sent.')

  res.json(mint)
}

// getOneMint (based on slug). /open?slug=abc
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { slug, address } = req.query

  if (!slug && !address) {
    res.status(400).send('No slug or address provided')
    return
  }

  if (slug) {
    const where = {
      ...(typeof slug === 'string' && { slug }),
    }
    const mints = await messageTokensService.findMany(where)
    res.json(mints)
    return
  }

  if (address) {
    if (typeof address !== 'string' || Array.isArray(address)) {
      res.status(422).send('Single address not provided')
      return
    }
    try {
      const tokenIdBnList = await contract.callStatic.tokensOfOwner(address)
      const tokenIdList = tokenIdBnList.map((bn) => bn.toNumber())
      const messageTokenIdList = tokenIdList.filter((id) => id % 2 === 0)

      if (messageTokenIdList.length === 0) {
        return res.status(200).json({ data: [] })
      }

      const data = await messageTokensService.findMany({
        OR: messageTokenIdList.map((id) => ({ tokenId: id })),
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
