import type { EncryptedImage } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const createEncryptedImages = async (
  data: Pick<EncryptedImage, 'url'>[]
) => {
  return prisma.encryptedImage.createMany({ data })
}

export const getRandomEncryptedImage =
  async (): Promise<EncryptedImage | null> => {
    const count = await prisma.encryptedImage.count()
    return prisma.encryptedImage.findFirst({
      skip: Math.floor(Math.random() * count),
    })
  }
