import { Prisma, Mint } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const create = async (
  input: Prisma.MintCreateInput
): Promise<Partial<Mint>> =>
  prisma.mint.create({
    data: Prisma.validator<Prisma.MintCreateInput>()(input),
  })

export const findAll = async (where: Prisma.MintWhereInput) =>
  prisma.mint.findMany({ where })

export const findUnique = async (where: Prisma.MintWhereUniqueInput) =>
  prisma.mint.findUnique({ where })

export const update = async (
  where: Prisma.MintWhereUniqueInput,
  data: Prisma.MintUpdateInput
) => prisma.mint.update({ where, data })
