import { Prisma, MessageToken } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const create = async (
  input: Prisma.MessageTokenCreateInput
): Promise<Partial<MessageToken>> =>
  prisma.messageToken.create({
    data: Prisma.validator<Prisma.MessageTokenCreateInput>()(input),
  })

export const findMany = async (where: Prisma.MessageTokenWhereInput) =>
  prisma.messageToken.findMany({ where })

export const findUnique = async (where: Prisma.MessageTokenWhereUniqueInput) =>
  prisma.messageToken.findUnique({ where })

export const update = async (
  where: Prisma.MessageTokenWhereUniqueInput,
  data: Prisma.MessageTokenUpdateInput
) => prisma.messageToken.update({ where, data })
