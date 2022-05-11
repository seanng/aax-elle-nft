import type { EncryptedImage } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const createEncryptedImages = async (
  images: Pick<EncryptedImage, 'previewUrl'>[]
) => {
  try {
    await prisma.encryptedImage.createMany({
      data: images,
    })
  } catch (e) {
    console.log('error in uploadNewImage: ', e)
  }
}

export const getRandomEncryptedImage =
  async (): Promise<EncryptedImage | null> => {
    const count = await prisma.encryptedImage.count()
    return prisma.encryptedImage.findFirst({
      skip: Math.floor(Math.random() * count),
    })
  }
