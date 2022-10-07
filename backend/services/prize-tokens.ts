import { Prisma, PrizeToken } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const create = async (
  input: Prisma.PrizeTokenCreateInput
): Promise<Partial<PrizeToken>> =>
  prisma.prizeToken.create({
    data: Prisma.validator<Prisma.PrizeTokenCreateInput>()(input),
  })

export const findMany = async (where: Prisma.PrizeTokenWhereInput) =>
  prisma.prizeToken.findMany({ where })

export const findUnique = async (where: Prisma.PrizeTokenWhereUniqueInput) =>
  prisma.prizeToken.findUnique({ where })

export const update = async (
  where: Prisma.PrizeTokenWhereUniqueInput,
  data: Prisma.PrizeTokenUpdateInput
) => prisma.prizeToken.update({ where, data })
