import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { FINISHED, PUBLIC_SALE, S3_BASE_URL } from 'shared/constants'
import { salePhase } from 'utils/config'

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

  const prizeTokenName = [PUBLIC_SALE, FINISHED].includes(salePhase)
    ? 'Prize Token'
    : 'Whitelist Token'

  res.json({
    name: Number(id) % 2 === 0 ? 'Message Token' : prizeTokenName,
    image: `${S3_BASE_URL}/public/${id}.png`,
    animation_url: `${S3_BASE_URL}/public/${id}.html`,
  })
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
