import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import * as service from 'backend/services/mints'

async function putHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

  try {
    await service.update({ id }, req.body)
    // send opened email to minterEmail.
    res.json({ success: true })
  } catch (error) {
    console.log('mint update error: ', error)
    res.json({ success: false })
  }
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'PUT') return putHandler(req, res)
}

export default handler
