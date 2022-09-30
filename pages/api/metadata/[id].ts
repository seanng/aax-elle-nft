import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { NOT_STARTED, PRIVATE_SALE, S3_BASE_URL } from 'shared/constants'
import { salePhase } from 'utils/config'

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  let { id: fileName } = req.query as { id: string }
  const isIdEven = Number(fileName) % 2 === 0
  const isWhitelistPhase = [NOT_STARTED, PRIVATE_SALE].includes(salePhase)

  const prizeTokenName = isWhitelistPhase ? 'Whitelist Token' : 'Prize Token'

  if (!isIdEven) {
    fileName = isWhitelistPhase ? 'whitelist' : 'prize'
  }

  res.json({
    name: isIdEven ? 'Message Token' : prizeTokenName,
    image: `${S3_BASE_URL}/public/${fileName}.png`,
    animation_url: `${S3_BASE_URL}/public/${fileName}.html`,
  })
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
