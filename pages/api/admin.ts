import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  // checks re. methods, etc..
  if (req.method === 'POST') {
    if (req.body.password !== 'metaverse')
      return res.status(400).send('Invalid password')

    return res.status(200).send('ok')
  }
}

export default handler
