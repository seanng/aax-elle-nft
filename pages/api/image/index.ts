import { Image, PrismaClient } from '@prisma/client'
import { NextApiHandler } from 'next'

const prisma = new PrismaClient()

const getRandomUnclaimedImage = async (): Promise<Image> => {
  try {
    const unclaimedCondition = { contractAddress: undefined }
    const count = await prisma.image.count({ where: unclaimedCondition })
    const rand = Math.random()
    let image = null
    while (!image) {
      image = await prisma.image.findFirst({
        where: unclaimedCondition,
        skip: Math.floor(rand * count),
      })
    }
    return image
  } catch (e) {
    console.log('error: ', e)
  }
}

const handler: NextApiHandler = async (req, res) => {
  // checks re. methods, etc..

  if (req.method === 'GET') {
    const image = await getRandomUnclaimedImage()
    res.json(image)
    return
  }
}

export default handler
