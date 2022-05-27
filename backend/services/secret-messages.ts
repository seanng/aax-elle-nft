import { Prisma, SecretMessage } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const create = async (
  input: Prisma.SecretMessageCreateInput
): Promise<Partial<SecretMessage>> => {
  return prisma.secretMessage.create({
    data: Prisma.validator<Prisma.SecretMessageCreateInput>()(input),
  })
}
