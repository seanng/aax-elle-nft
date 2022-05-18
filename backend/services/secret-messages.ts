import { Prisma, SecretMessage } from '@prisma/client'
import { prisma } from 'lib/prisma'

type CreateSecretMessageInput = Omit<
  Prisma.SecretMessageCreateInput,
  'encryptedImage'
> & {
  encryptedImageUrl: string
}

export const create = async (
  input: CreateSecretMessageInput
): Promise<Partial<SecretMessage>> => {
  return prisma.secretMessage.create({
    data: Prisma.validator<Prisma.SecretMessageCreateInput>()({
      donationAmount: input.donationAmount,
      senderEmail: input.senderEmail,
      message: input.message,
      contractAddress: input.contractAddress,
      encryptedImage: {
        connect: {
          url: input.encryptedImageUrl,
        },
      },
    }),
  })
}
