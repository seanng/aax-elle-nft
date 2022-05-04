import { NextApiHandler } from 'next'
import { getRandomUnclaimedImage, uploadNewImages } from 'backend/image'

import { prisma as prismaClient } from 'lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  // checks re. methods, etc..

  if (req.method === 'GET') {
    const image = await getRandomUnclaimedImage(prismaClient)
    res.json(image)
    return
  }

  if (req.method === 'POST') {
    const { images } = req.body
    await uploadNewImages(images, prismaClient)
  }
}

export default handler
