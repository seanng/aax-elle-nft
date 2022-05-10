import type { Donation } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const create = async (
  data: Pick<
    Donation,
    'email' | 'message' | 'donationAmount' | 'contractAddress' | 'imageId'
  >
) => {
  await prisma.donation.create({ data })
}
