import { NextApiHandler } from 'next'
import { updateImage } from 'backend/image'

import { prisma as prismaClient } from 'lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  // checks re. methods, etc..

  if (req.method === 'PUT') {
    const imageId = req.query.id as string
    const image = await updateImage(imageId, req.body, prismaClient)
    res.json(image)
    return
  }
}

export default handler
