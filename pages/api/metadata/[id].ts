import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

  // TODO: After presale, change Whitelist Token to Prize Token (if id is a certain amount.)
  res.json({
    name: Number(id) % 2 === 1 ? 'Message Token' : 'Whitelist Token',
    image: `https://s3blablabla.amazonaws.com/images/${id}.png`,
    animation_url: `https://s3blablabla.amazonaws.com/display/${id}.html`,
  })
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
