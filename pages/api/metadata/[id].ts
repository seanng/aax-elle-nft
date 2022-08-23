import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { S3_BASE_URL } from 'shared/constants'

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

  // TODO: After presale, change Whitelist Token to Prize Token (if id is a certain amount.)
  res.json({
    name: Number(id) % 2 === 1 ? 'Message Token' : 'Whitelist Token',
    image: `${S3_BASE_URL}/public/${id}.png`,
    animation_url: `${S3_BASE_URL}/public/${id}.html`,
  })
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
