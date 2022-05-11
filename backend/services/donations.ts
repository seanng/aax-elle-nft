import { Prisma, Donation } from '@prisma/client'
import { prisma } from 'lib/prisma'

type CreateDonationInput = Omit<
  Prisma.DonationCreateInput,
  'encryptedImage'
> & {
  encryptedImageId: string
}

export const create = async (
  input: CreateDonationInput
): Promise<Partial<Donation>> => {
  return prisma.donation.create({
    data: Prisma.validator<Prisma.DonationCreateInput>()({
      donationAmount: input.donationAmount,
      email: input.email,
      message: input.message,
      contractAddress: input.contractAddress,
      encryptedImage: {
        connect: { id: input.encryptedImageId },
      },
    }),
  })
}
