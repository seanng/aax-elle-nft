import type { Donation } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const create = async (
  data: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>
) => {
  await prisma.donation.create({ data })
}
