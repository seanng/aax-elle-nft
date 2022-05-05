import type { Image } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const uploadNewImages = async (images: Pick<Image, 'previewUrl'>[]) => {
  try {
    await prisma.image.createMany({
      data: images,
    })
  } catch (e) {
    console.log('error in uploadNewImage: ', e)
  }
}

export const getRandomImage = async (): Promise<Image | null> => {
  const count = await prisma.image.count()
  return prisma.image.findFirst({ skip: Math.floor(Math.random() * count) })
}
