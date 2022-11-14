import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { s3BaseUrl } from 'utils/config'
import { whitelistTokenNames } from 'data'
import * as service from 'backend/services/prize-tokens'

// const PUBLIC_SALE_FIRST_TOKEN_ID = 3113

const WLT_DEFAULT_NAME = 'Can you feel the love tonight'

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  let { id } = req.query as { id: string }
  const isMessageToken = Number(id) % 2 === 0

  if (isMessageToken) {
    res.json({
      name: `Love Message #${id}`,
      image: `${s3BaseUrl}/public/${id}.png`,
      animation_url: `${s3BaseUrl}/public/${id}.html`,
    })
    return
  }

  const prizeTokenList = await service.findMany({
    tokenId: Number(id),
  })

  let { tokenName, isPrivateSale } = prizeTokenList[0]

  if (!tokenName) {
    tokenName = isPrivateSale
      ? whitelistTokenNames[Math.floor(Number(id) / 2)] ?? WLT_DEFAULT_NAME
      : 'Prize Token'
  }

  res.json({
    name: tokenName,
    image: `${s3BaseUrl}/public/${isPrivateSale ? 'whitelist' : 'prize'}.svg`,
  })
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
