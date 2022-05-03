import type { Image, PrismaClient } from '@prisma/client'
import { NextApiHandler } from 'next'

import { prisma as prismaClient } from 'lib/prisma'

const getRandomUnclaimedImage = async (
  prisma: PrismaClient
): Promise<Image | undefined> => {
  try {
    const unclaimedCondition = { contractAddress: undefined }
    const count = await prisma.image.count({ where: unclaimedCondition })
    const rand = Math.random()
    let image: Image | undefined
    while (!image) {
      try {
        image = await prisma.image.findFirst({
          where: unclaimedCondition,
          skip: Math.floor(rand * count),
          rejectOnNotFound: true,
        })
      } catch (error) {
        return undefined
      }
    }
    return image
  } catch (e) {
    console.log('error: ', e)
  }
}

const handler: NextApiHandler = async (req, res) => {
  // checks re. methods, etc..

  if (req.method === 'GET') {
    const image = await getRandomUnclaimedImage(prismaClient)
    res.json(image)
    return
  }
}

export default handler
