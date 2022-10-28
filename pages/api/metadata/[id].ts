import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { s3BaseUrl } from 'utils/config'
import * as service from 'backend/services/prize-tokens'

// const PUBLIC_SALE_FIRST_TOKEN_ID = 3113

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  let { id: fileName } = req.query as { id: string }
  const isIdEven = Number(fileName) % 2 === 0
  let isPrivateSale = false

  if (!isIdEven) {
    const prizeTokenList = await service.findMany({
      tokenId: Number(fileName),
    })
    isPrivateSale = prizeTokenList[0].isPrivateSale
    fileName = isPrivateSale ? 'whitelist' : 'prize'
  }

  const prizeTokenName = isPrivateSale ? 'Whitelist Token' : 'Prize Token'

  res.json({
    name: isIdEven ? 'Message Token' : prizeTokenName,
    image: `${s3BaseUrl}/public/${fileName}.png`,
    ...(isIdEven && { animation_url: `${s3BaseUrl}/public/${fileName}.html` }),
  })
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
